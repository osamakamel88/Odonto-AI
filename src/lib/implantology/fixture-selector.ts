/**
 * Implant Fixture Selection Engine
 * Deterministic calculator that recommends optimal fixtures based on
 * available bone dimensions, density, tooth position, and clinical requirements.
 */

import { FIXTURE_CATALOG, ImplantFixture, getCompatibleFixtures } from './knowledge-base/fixture-catalog';
import { BoneDensity, assessBoneDensity, getMinBoneRequirements } from './knowledge-base/bone-classification';

export interface FixtureSelectorInput {
  /** FDI tooth number of the implant site */
  fdiPosition: number;
  /** Available bucco-lingual bone width in mm (measured from CBCT) */
  boneWidth: number;
  /** Available bone height in mm (crestal to vital structure) */
  boneHeight: number;
  /** Bone density classification */
  boneDensity: BoneDensity;
  /** Intended loading protocol */
  loadingIntent: 'immediate' | 'early' | 'conventional';
  /** Whether the site is in the aesthetic zone */
  aestheticZone?: boolean;
  /** Preferred implant brand (optional filter) */
  preferredBrand?: string;
}

export interface FixtureRecommendation {
  fixture: ImplantFixture;
  recommendedDiameter: number;
  recommendedLength: number;
  compatibilityScore: number; // 0-100
  rationale: string[];
  warnings: string[];
}

export interface FixtureSelectionResult {
  input: FixtureSelectorInput;
  feasible: boolean;
  insufficientBoneMessage?: string;
  augmentationRequired: boolean;
  augmentationNotes: string[];
  recommendations: FixtureRecommendation[];
  regionNotes: string;
}

/** Map FDI position to jaw region for bone requirements */
function fdiToRegion(fdi: number): 'anterior-max' | 'posterior-max' | 'anterior-mand' | 'posterior-mand' {
  const quadrant = Math.floor(fdi / 10);
  const tooth = fdi % 10;
  const isMaxilla = quadrant === 1 || quadrant === 2;
  const isAnterior = tooth >= 1 && tooth <= 3;

  if (isMaxilla) {
    return isAnterior ? 'anterior-max' : 'posterior-max';
  }
  return isAnterior ? 'anterior-mand' : 'posterior-mand';
}

/** Determine if the FDI position is in the aesthetic zone */
function isAestheticPosition(fdi: number): boolean {
  const quadrant = Math.floor(fdi / 10);
  const tooth = fdi % 10;
  const isMaxilla = quadrant === 1 || quadrant === 2;
  return isMaxilla && tooth >= 1 && tooth <= 5;
}

/** Get ideal fixture diameter range based on tooth position */
function getIdealDiameterRange(fdi: number): { min: number; ideal: number; max: number } {
  const tooth = fdi % 10;
  switch (tooth) {
    case 1: // Central incisor
      return { min: 3.3, ideal: 3.75, max: 4.3 };
    case 2: // Lateral incisor
      return { min: 3.0, ideal: 3.5, max: 3.75 };
    case 3: // Canine
      return { min: 3.5, ideal: 4.0, max: 4.3 };
    case 4: // First premolar
      return { min: 3.5, ideal: 4.0, max: 4.5 };
    case 5: // Second premolar
      return { min: 3.75, ideal: 4.1, max: 4.8 };
    case 6: // First molar
      return { min: 4.1, ideal: 4.8, max: 5.5 };
    case 7: // Second molar
      return { min: 4.0, ideal: 4.5, max: 5.5 };
    case 8: // Third molar (rare)
      return { min: 4.0, ideal: 4.5, max: 5.0 };
    default:
      return { min: 3.75, ideal: 4.1, max: 4.8 };
  }
}

/** Score a fixture against the clinical requirements */
function scoreFixture(
  fixture: ImplantFixture,
  input: FixtureSelectorInput,
  idealRange: { min: number; ideal: number; max: number }
): FixtureRecommendation | null {
  const safetyMarginBuccalLingual = 1.5; // mm on each side
  const safetyMarginApical = 2.0; // mm from vital structures

  const maxAllowedDiameter = input.boneWidth - (safetyMarginBuccalLingual * 2);
  const maxAllowedLength = input.boneHeight - safetyMarginApical;

  // Find the best diameter from available options
  const viableDiameters = fixture.availableDiameters.filter(d => d <= maxAllowedDiameter && d >= idealRange.min);
  if (viableDiameters.length === 0) return null;

  // Find the best length from available options
  const viableLengths = fixture.availableLengths.filter(l => l <= maxAllowedLength && l >= 6);
  if (viableLengths.length === 0) return null;

  // Pick the diameter closest to ideal
  const recommendedDiameter = viableDiameters.reduce((best, d) =>
    Math.abs(d - idealRange.ideal) < Math.abs(best - idealRange.ideal) ? d : best
  );

  // Prefer longer implants (more surface area) but within constraints
  const recommendedLength = viableLengths[viableLengths.length - 1];

  let score = 50; // base score
  const rationale: string[] = [];
  const warnings: string[] = [];

  // Diameter scoring (closer to ideal = higher score)
  const diamDelta = Math.abs(recommendedDiameter - idealRange.ideal);
  if (diamDelta < 0.3) {
    score += 15;
    rationale.push(`Optimal diameter ${recommendedDiameter}mm for this tooth position`);
  } else if (diamDelta < 0.6) {
    score += 10;
    rationale.push(`Acceptable diameter ${recommendedDiameter}mm`);
  } else {
    score += 5;
    warnings.push(`Diameter ${recommendedDiameter}mm is outside the ideal range (${idealRange.ideal}mm)`);
  }

  // Length scoring (longer is generally better for primary stability)
  if (recommendedLength >= 10) {
    score += 15;
    rationale.push(`Good fixture length ${recommendedLength}mm provides adequate surface area`);
  } else if (recommendedLength >= 8) {
    score += 10;
    rationale.push(`Moderate length ${recommendedLength}mm — consider primary stability`);
  } else {
    score += 5;
    warnings.push(`Short fixture (${recommendedLength}mm) — limited surface area for osseointegration`);
  }

  // Surface treatment bonus
  if (fixture.surface === 'SLActive' || fixture.surface === 'TiUnite') {
    score += 5;
    rationale.push(`${fixture.surface} surface promotes accelerated osseointegration`);
  }

  // Tapered fixtures score higher in soft bone
  if (input.boneDensity === 'D3' || input.boneDensity === 'D4') {
    if (fixture.shape === 'tapered') {
      score += 10;
      rationale.push('Tapered design improves primary stability in soft bone');
    }
  }

  // Material scoring
  if (fixture.material.includes('Roxolid') || fixture.material.includes('Ti-Zr')) {
    score += 5;
    rationale.push('Ti-Zr alloy provides higher fatigue resistance — ideal for narrow diameters');
  }

  // Immediate loading compatibility
  if (input.loadingIntent === 'immediate') {
    if (fixture.primaryStabilityISQ.min >= 65) {
      score += 5;
      rationale.push('High primary stability supports immediate loading protocol');
    } else {
      warnings.push('This fixture may not achieve sufficient ISQ for immediate loading');
    }
  }

  // Aesthetic zone considerations
  if (input.aestheticZone || isAestheticPosition(input.fdiPosition)) {
    if (fixture.platformType === 'conical-morse-taper' || fixture.platformType === 'conical-connection') {
      score += 5;
      rationale.push('Conical connection provides platform switching for better crestal bone preservation in aesthetic zone');
    }
  }

  // Cap at 100
  score = Math.min(score, 100);

  return {
    fixture,
    recommendedDiameter,
    recommendedLength,
    compatibilityScore: score,
    rationale,
    warnings
  };
}

/**
 * Main fixture selection function
 * Analyzes bone dimensions and clinical requirements, then ranks compatible fixtures
 */
export function selectFixtures(input: FixtureSelectorInput): FixtureSelectionResult {
  const region = fdiToRegion(input.fdiPosition);
  const boneReqs = getMinBoneRequirements(region);
  const idealRange = getIdealDiameterRange(input.fdiPosition);
  const augmentationNotes: string[] = [];
  let augmentationRequired = false;

  // Check if bone is sufficient
  if (input.boneWidth < boneReqs.minWidth) {
    augmentationRequired = true;
    augmentationNotes.push(
      `Bone width (${input.boneWidth}mm) is below minimum (${boneReqs.minWidth}mm) — GBR or ridge expansion recommended`
    );
  }

  if (input.boneHeight < boneReqs.minHeight) {
    augmentationRequired = true;
    if (region === 'posterior-max') {
      augmentationNotes.push(
        `Bone height (${input.boneHeight}mm) insufficient — sinus lift required (lateral window if <5mm, crestal OSFE if 5-8mm)`
      );
    } else if (region === 'posterior-mand') {
      augmentationNotes.push(
        `Bone height (${input.boneHeight}mm) insufficient — consider short implants (6-8mm) or nerve repositioning`
      );
    } else {
      augmentationNotes.push(
        `Bone height (${input.boneHeight}mm) below minimum (${boneReqs.minHeight}mm) — vertical augmentation may be needed`
      );
    }
  }

  // If bone is catastrophically insufficient, return early
  if (input.boneWidth < 4.5 && input.boneHeight < 6) {
    return {
      input,
      feasible: false,
      insufficientBoneMessage: 'Bone volume critically insufficient for any standard implant. Staged augmentation (GBR + bone block graft) required before implant placement.',
      augmentationRequired: true,
      augmentationNotes,
      recommendations: [],
      regionNotes: boneReqs.notes.join('; ')
    };
  }

  // Score all fixtures in catalog
  const allFixtures = Object.values(FIXTURE_CATALOG);
  const filtered = input.preferredBrand
    ? allFixtures.filter(f => f.brand.toLowerCase() === input.preferredBrand!.toLowerCase())
    : allFixtures;

  const scored = filtered
    .map(f => scoreFixture(f, input, idealRange))
    .filter((r): r is FixtureRecommendation => r !== null)
    .sort((a, b) => b.compatibilityScore - a.compatibilityScore);

  // Take top 5
  const top5 = scored.slice(0, 5);

  return {
    input,
    feasible: top5.length > 0,
    augmentationRequired,
    augmentationNotes,
    recommendations: top5,
    regionNotes: boneReqs.notes.join('; ')
  };
}
