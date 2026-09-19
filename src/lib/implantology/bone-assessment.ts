/**
 * Bone Assessment and Augmentation Planning Engine
 * Deterministic analyzer for available bone volume, density profiling,
 * defect classification (Seibert), sinus lift indications, and GBR requirements.
 */

import {
  BoneDensity,
  LekholmZarbQuality,
  LekholmZarbQuantity,
  SeibertClass,
  assessBoneDensity,
  getMinBoneRequirements,
  MISCH_BONE_DENSITY,
  SEIBERT_CLASSIFICATION,
  RegionRequirements
} from './knowledge-base/bone-classification';

import {
  SinusLiftProtocol,
  GBRProtocol,
  ImmediatePlacementProtocol,
  sinusLiftProtocols,
  gbrProtocols,
  immediatePlacementProtocols,
  GraftMaterial,
  MembraneType
} from './knowledge-base/surgical-protocols';

export interface BoneAssessmentInput {
  fdiPosition: number;
  boneWidth: number; // mm
  boneHeight: number; // mm
  boneDensity?: BoneDensity;
  hounsfieldUnits?: number;
  isImmediateSocket?: boolean;
  socketType?: 'Type-1' | 'Type-2' | 'Type-3'; // Elian classification
  sinusFloorDistance?: number; // mm (for upper molars/premolars)
  ianDistance?: number; // mm (for lower molars/premolars)
  keratinizedTissueWidth?: number; // mm
}

export type AugmentationType = 
  | 'none'
  | 'gbr-horizontal'
  | 'gbr-vertical'
  | 'gbr-combined'
  | 'sinus-lift-crestal'
  | 'sinus-lift-lateral'
  | 'ridge-split'
  | 'socket-preservation';

export interface AugmentationRecommendation {
  type: AugmentationType;
  primaryProcedure: string;
  timing: 'simultaneous' | 'staged' | 'not-applicable';
  graftMaterial: GraftMaterial | string;
  membrane: MembraneType | string;
  healingTimeMonths: number;
  rationale: string;
  stepByStepOverview: string[];
}

export interface BoneAssessmentResult {
  fdiPosition: number;
  region: 'anterior-max' | 'posterior-max' | 'anterior-mand' | 'posterior-mand';
  density: BoneDensity;
  densityProfile: typeof MISCH_BONE_DENSITY[BoneDensity];
  lekholmQuality: LekholmZarbQuality;
  lekholmQuantity: LekholmZarbQuantity;
  seibertClassification?: SeibertClass;
  seibertDetails?: { description: string; treatment: string };
  regionRequirements: RegionRequirements;
  boneVolumeStatus: 'sufficient' | 'borderline' | 'deficient' | 'critical';
  augmentationRequired: boolean;
  recommendedAugmentations: AugmentationRecommendation[];
  immediatePlacementFeasibility?: {
    feasible: boolean;
    protocol?: ImmediatePlacementProtocol;
    clinicalAdvisory: string;
  };
  safetyMargins: {
    buccalPlateExpected: number; // mm remaining after standard 4.0mm implant
    lingualPlateExpected: number; // mm remaining
    apicalClearance: number; // mm from anatomical hazard
  };
  clinicalAlerts: string[];
}

function getRegionFromFdi(fdi: number): 'anterior-max' | 'posterior-max' | 'anterior-mand' | 'posterior-mand' {
  const quadrant = Math.floor(fdi / 10);
  const tooth = fdi % 10;
  const isMaxilla = quadrant === 1 || quadrant === 2;
  const isAnterior = tooth >= 1 && tooth <= 3;

  if (isMaxilla) {
    return isAnterior ? 'anterior-max' : 'posterior-max';
  }
  return isAnterior ? 'anterior-mand' : 'posterior-mand';
}

function estimateLekholmQuantity(boneWidth: number, boneHeight: number): LekholmZarbQuantity {
  if (boneWidth >= 8 && boneHeight >= 12) return 'A';
  if (boneWidth >= 6 && boneHeight >= 10) return 'B';
  if (boneWidth >= 5 && boneHeight >= 8) return 'C';
  if (boneWidth >= 4 && boneHeight >= 6) return 'D';
  return 'E';
}

function estimateLekholmQuality(density: BoneDensity): LekholmZarbQuality {
  switch (density) {
    case 'D1': return 'Type-I';
    case 'D2': return 'Type-II';
    case 'D3': return 'Type-III';
    case 'D4': return 'Type-IV';
    default: return 'Type-II';
  }
}

/**
 * Evaluates bone volume, density, and surgical augmentation needs
 */
export function assessBoneSite(input: BoneAssessmentInput): BoneAssessmentResult {
  const region = getRegionFromFdi(input.fdiPosition);
  const regionReqs = getMinBoneRequirements(region);

  // Determine bone density
  let density: BoneDensity = input.boneDensity || 'D2';
  if (input.hounsfieldUnits !== undefined) {
    density = assessBoneDensity(input.hounsfieldUnits).grade;
  }
  const densityProfile = MISCH_BONE_DENSITY[density];
  const lekholmQuality = estimateLekholmQuality(density);
  const lekholmQuantity = estimateLekholmQuantity(input.boneWidth, input.boneHeight);

  // Classify defect if present
  let seibertClassification: SeibertClass | undefined;
  const isWidthDeficient = input.boneWidth < regionReqs.minWidth;
  const isHeightDeficient = input.boneHeight < regionReqs.minHeight;

  if (isWidthDeficient && !isHeightDeficient) {
    seibertClassification = 'Class-I';
  } else if (!isWidthDeficient && isHeightDeficient) {
    seibertClassification = 'Class-II';
  } else if (isWidthDeficient && isHeightDeficient) {
    seibertClassification = 'Class-III';
  }

  const seibertDetails = seibertClassification ? SEIBERT_CLASSIFICATION[seibertClassification] : undefined;

  // Determine overall volume status
  let boneVolumeStatus: 'sufficient' | 'borderline' | 'deficient' | 'critical' = 'sufficient';
  if (input.boneWidth < 4.0 || input.boneHeight < 5.0) {
    boneVolumeStatus = 'critical';
  } else if (isWidthDeficient || isHeightDeficient) {
    boneVolumeStatus = 'deficient';
  } else if (input.boneWidth < regionReqs.minWidth + 1.0 || input.boneHeight < regionReqs.minHeight + 1.0) {
    boneVolumeStatus = 'borderline';
  }

  const clinicalAlerts: string[] = [];
  const recommendedAugmentations: AugmentationRecommendation[] = [];

  // Keratinized tissue alert
  if (input.keratinizedTissueWidth !== undefined && input.keratinizedTissueWidth < 2.0) {
    clinicalAlerts.push(
      `Inadequate keratinized tissue (${input.keratinizedTissueWidth}mm < 2mm). Free gingival graft (FGG) or connective tissue graft (CTG) strongly recommended before or during uncovery to prevent peri-implant mucositis.`
    );
  }

  // Safety distance calculations (assuming standard 4.0mm diameter and 10mm length implant)
  const remainingWidth = input.boneWidth - 4.0;
  const buccalPlate = Math.max(0, remainingWidth * 0.4); // typical 40/60 buccal/lingual distribution
  const lingualPlate = Math.max(0, remainingWidth * 0.6);
  
  let apicalClearance = input.boneHeight - 10.0;
  if (region === 'posterior-max' && input.sinusFloorDistance !== undefined) {
    apicalClearance = input.sinusFloorDistance - 10.0;
  } else if (region === 'posterior-mand' && input.ianDistance !== undefined) {
    apicalClearance = input.ianDistance - 10.0;
  }

  if (buccalPlate < 1.5) {
    clinicalAlerts.push(
      `Predicted buccal cortical plate is < 1.5mm (${buccalPlate.toFixed(1)}mm). High risk of long-term buccal dehiscence and gingival recession. Contour augmentation with xenograft (Bio-Oss) and collagen membrane indicated.`
    );
  }

  // Sinus Lift Assessment for posterior maxilla
  if (region === 'posterior-max') {
    const availableSubantralHeight = input.sinusFloorDistance !== undefined ? input.sinusFloorDistance : input.boneHeight;

    if (availableSubantralHeight < 4.0) {
      recommendedAugmentations.push({
        type: 'sinus-lift-lateral',
        primaryProcedure: 'Lateral Window Sinus Floor Elevation',
        timing: 'staged',
        graftMaterial: 'composite', // autograft + xenograft
        membrane: 'resorbable-collagen',
        healingTimeMonths: 6,
        rationale: `Subantral bone height is critically low (${availableSubantralHeight}mm < 4mm). Insufficient for primary stability of simultaneous implant. Staged lateral window sinus lift required.`,
        stepByStepOverview: sinusLiftProtocols[0]?.stepByStep || []
      });
      clinicalAlerts.push('Staged sinus augmentation required. Implant placement delayed by 6-9 months.');
    } else if (availableSubantralHeight < 8.0) {
      recommendedAugmentations.push({
        type: 'sinus-lift-crestal',
        primaryProcedure: 'Crestal Approach Sinus Elevation (Summers OSFE)',
        timing: 'simultaneous',
        graftMaterial: 'xenograft-BioOss',
        membrane: 'none (tenting only)',
        healingTimeMonths: 4,
        rationale: `Subantral bone height (${availableSubantralHeight}mm) allows simultaneous implant placement using crestal osteotome elevation with 2-4mm bone gain.`,
        stepByStepOverview: sinusLiftProtocols[1]?.stepByStep || []
      });
    }
  }

  // Horizontal Ridge Augmentation (GBR or Ridge Splitting)
  if (isWidthDeficient) {
    if (input.boneWidth >= 3.5 && input.boneWidth <= 5.0 && input.boneHeight >= 10.0 && region.includes('mand')) {
      recommendedAugmentations.push({
        type: 'ridge-split',
        primaryProcedure: 'Ridge Splitting & Expansion with Simultaneous Placement',
        timing: 'simultaneous',
        graftMaterial: 'allograft-FDBA',
        membrane: 'resorbable-collagen',
        healingTimeMonths: 4,
        rationale: `Ridge width of ${input.boneWidth}mm with adequate height allows crestal expansion and simultaneous implant stabilization acting as tenting pillars.`,
        stepByStepOverview: gbrProtocols.find(g => g.id === 'ridge-splitting')?.stepByStep || []
      });
    } else {
      const timing: 'simultaneous' | 'staged' = input.boneWidth >= 4.5 ? 'simultaneous' : 'staged';
      recommendedAugmentations.push({
        type: 'gbr-horizontal',
        primaryProcedure: 'Guided Bone Regeneration (Horizontal)',
        timing,
        graftMaterial: 'composite',
        membrane: timing === 'simultaneous' ? 'resorbable-collagen' : 'non-resorbable-dPTFE',
        healingTimeMonths: timing === 'simultaneous' ? 4 : 6,
        rationale: `Ridge width (${input.boneWidth}mm) requires ${timing === 'simultaneous' ? 'simultaneous contour' : 'staged horizontal'} GBR to establish ≥ 1.5mm buccal bone margin.`,
        stepByStepOverview: gbrProtocols.find(g => g.id === 'horizontal-aug')?.stepByStep || []
      });
    }
  }

  // Vertical Ridge Augmentation
  if (isHeightDeficient && region !== 'posterior-max') {
    recommendedAugmentations.push({
      type: 'gbr-vertical',
      primaryProcedure: 'Vertical Guided Bone Regeneration / Block Graft',
      timing: 'staged',
      graftMaterial: 'autograft',
      membrane: 'titanium-reinforced',
      healingTimeMonths: 9,
      rationale: `Severe vertical bone loss (available height ${input.boneHeight}mm < ${regionReqs.minHeight}mm). Requires rigid space maintenance with titanium reinforcement and 9-12 month healing.`,
      stepByStepOverview: gbrProtocols.find(g => g.id === 'vertical-aug')?.stepByStep || []
    });
    clinicalAlerts.push('Vertical augmentation carries higher complication rates. Consider short implants (6-8mm) if anatomy permits.');
  }

  // Immediate Extraction Socket Feasibility
  let immediatePlacementFeasibility: BoneAssessmentResult['immediatePlacementFeasibility'];
  if (input.isImmediateSocket) {
    const socketType = input.socketType || 'Type-1';
    const protocol = immediatePlacementProtocols[socketType];

    if (socketType === 'Type-1') {
      immediatePlacementFeasibility = {
        feasible: true,
        protocol,
        clinicalAdvisory: 'Type 1 Socket: Intact buccal plate and soft tissue. Ideal candidate for immediate implant placement with gap grafting (dual-zone technique).'
      };
    } else if (socketType === 'Type-2') {
      immediatePlacementFeasibility = {
        feasible: input.boneHeight >= 12.0, // needs apical anchorage
        protocol,
        clinicalAdvisory: 'Type 2 Socket: Buccal plate dehisced. Feasible only if ≥ 4mm apical bone exists beyond the socket apex for primary stability; simultaneous GBR mandatory.'
      };
    } else {
      immediatePlacementFeasibility = {
        feasible: false,
        protocol,
        clinicalAdvisory: 'Type 3 Socket: Severe buccal soft and hard tissue deficit. Immediate placement contraindicated. Ridge preservation or staged GBR recommended.'
      };
      recommendedAugmentations.push({
        type: 'socket-preservation',
        primaryProcedure: 'Alveolar Ridge Preservation',
        timing: 'staged',
        graftMaterial: 'xenograft-BioOss',
        membrane: 'resorbable-collagen',
        healingTimeMonths: 4,
        rationale: 'Socket preservation to rebuild lost architecture prior to delayed implant insertion.',
        stepByStepOverview: gbrProtocols.find(g => g.id === 'socket-preservation')?.stepByStep || []
      });
    }
  }

  const augmentationRequired = recommendedAugmentations.length > 0;

  return {
    fdiPosition: input.fdiPosition,
    region,
    density,
    densityProfile,
    lekholmQuality,
    lekholmQuantity,
    seibertClassification,
    seibertDetails,
    regionRequirements: regionReqs,
    boneVolumeStatus,
    augmentationRequired,
    recommendedAugmentations,
    immediatePlacementFeasibility,
    safetyMargins: {
      buccalPlateExpected: Math.max(0, buccalPlate),
      lingualPlateExpected: Math.max(0, lingualPlate),
      apicalClearance
    },
    clinicalAlerts
  };
}
