/**
 * Prosthetic Planning & Biomechanics Calculator
 * Computes Crown-to-Implant (C/I) ratios, abutment selections, screw torque specs,
 * cement vs. screw retention decision scoring, and cantilever limits.
 */

import {
  AbutmentType,
  RetentionType,
  CrownMaterial,
  abutments,
  cementVsScrewMatrix,
  getScrewTorque
} from './knowledge-base/prosthetic-components';

export interface ProstheticCalculationInput {
  fdiPosition: number;
  implantLength: number; // mm in bone
  implantDiameter: number; // mm
  implantSystem: string; // e.g., 'Straumann', 'Nobel Biocare', 'Zimmer Biomet'
  interarchSpace: number; // mm (restorative space from platform to opposing tooth)
  gingivalThickness: number; // mm (soft tissue height above platform)
  implantAngulationOffset?: number; // degrees off vertical axis (0-45)
  isAestheticZone?: boolean;
  parafunction?: boolean; // bruxism / clenching
  opposingDentition?: 'natural-teeth' | 'implant-crown' | 'denture';
  isMultiUnitOrBridge?: boolean;
  apSpread?: number; // mm (Antero-Posterior spread for full arch / All-on-4)
}

export interface CrownToImplantAnalysis {
  crownHeight: number; // mm (interarch space - 2mm occlusal clearance approx)
  implantLength: number; // mm
  ratio: number; // crownHeight / implantLength
  status: 'favorable' | 'acceptable' | 'unfavorable' | 'biomechanically-compromised';
  clinicalImplications: string;
}

export interface AbutmentRecommendation {
  type: AbutmentType;
  name: string;
  material: string;
  recommendedCuffHeight: number; // mm
  angulationDegrees: number;
  rationale: string;
}

export interface RetentionDecision {
  recommendedType: RetentionType;
  screwScore: number;
  cementScore: number;
  summary: string;
  keyDrivers: string[];
}

export interface ScrewTorqueSpecification {
  system: string;
  abutmentScrewTorqueNcm: number;
  prostheticScrewTorqueNcm: number;
  protocolNotes: string;
}

export interface ProstheticCalculationResult {
  fdiPosition: number;
  crownToImplant: CrownToImplantAnalysis;
  retention: RetentionDecision;
  abutment: AbutmentRecommendation;
  screwTorque: ScrewTorqueSpecification;
  material: {
    recommendedMaterial: CrownMaterial;
    alternativeMaterial: CrownMaterial;
    rationale: string;
  };
  cantileverGuidelines?: {
    apSpread: number;
    maxRecommendedDistalCantilever: number; // mm
    formula: string;
  };
  clinicalChecklist: string[];
}

function determineAestheticZone(fdi: number): boolean {
  const quadrant = Math.floor(fdi / 10);
  const tooth = fdi % 10;
  const isMaxilla = quadrant === 1 || quadrant === 2;
  return isMaxilla && tooth >= 1 && tooth <= 5;
}

/**
 * Calculates crown to implant ratio and biomechanical stability
 */
export function calculateCrownToImplant(
  interarchSpace: number,
  implantLength: number
): CrownToImplantAnalysis {
  const crownHeight = Math.max(interarchSpace, 4.0);
  const ratio = Number((crownHeight / implantLength).toFixed(2));

  let status: CrownToImplantAnalysis['status'] = 'favorable';
  let clinicalImplications = 'Normal biomechanical lever arm. Standard occlusal scheme recommended.';

  if (ratio <= 1.0) {
    status = 'favorable';
    clinicalImplications = 'Ideal C/I ratio (< 1.0). Minimal bending moments on crestal bone and abutment screw.';
  } else if (ratio <= 1.5) {
    status = 'acceptable';
    clinicalImplications = 'Acceptable C/I ratio (1.0 - 1.5). Long-term clinical survival is well-supported if lateral forces are minimized.';
  } else if (ratio <= 2.0) {
    status = 'unfavorable';
    clinicalImplications = 'Unfavorable C/I ratio (> 1.5). Higher risk of prosthetic screw loosening and crestal micro-strain. Narrow occlusal table and mutually protected occlusion required.';
  } else {
    status = 'biomechanically-compromised';
    clinicalImplications = 'Severely compromised C/I ratio (> 2.0). High risk of mechanical failure. Consider splinting to adjacent implants, using wider platform fixtures, or vertical ridge augmentation.';
  }

  return {
    crownHeight,
    implantLength,
    ratio,
    status,
    clinicalImplications
  };
}

/**
 * Evaluates cement vs screw retained prosthesis
 */
export function evaluateRetentionType(
  interarchSpace: number,
  angulationOffset: number,
  isAesthetic: boolean,
  parafunction: boolean
): RetentionDecision {
  let screwScore = 0;
  let cementScore = 0;
  const keyDrivers: string[] = [];

  // Interarch space
  if (interarchSpace < 6.0) {
    screwScore += 4;
    keyDrivers.push(`Limited vertical space (${interarchSpace}mm): Screw retention strongly indicated to avoid inadequate cement abutment height.`);
  } else if (interarchSpace >= 8.0) {
    cementScore += 2;
    screwScore += 2;
  }

  // Angulation
  if (angulationOffset > 20) {
    if (isAesthetic) {
      cementScore += 3;
      keyDrivers.push(`High labial tilt (${angulationOffset}°): Screw access hole would exit through facial surface. Cement retention or angled screw channel (ASC) needed.`);
    } else {
      screwScore += 2;
    }
  } else {
    screwScore += 3;
    keyDrivers.push('Direct vertical alignment favors screw retention for 100% retrievability.');
  }

  // Biological safety
  screwScore += 3;
  keyDrivers.push('Zero risk of subgingival cement-induced peri-implantitis with screw retention.');

  // Parafunction / Bruxism
  if (parafunction) {
    screwScore += 3;
    keyDrivers.push('Parafunctional loading requires easy retrievability in case of screw loosening or ceramic chipping.');
  }

  const recommendedType: RetentionType = screwScore >= cementScore ? 'screw-retained' : 'cement-retained';
  const summary = recommendedType === 'screw-retained'
    ? 'Screw-retained prosthesis recommended for biological safety, retrievability, and predictable maintenance.'
    : 'Cement-retained restoration recommended to compensate for facial angulation and optimize cosmetic emergence.';

  return {
    recommendedType,
    screwScore,
    cementScore,
    summary,
    keyDrivers
  };
}

/**
 * Selects optimal abutment type and specifications
 */
export function selectAbutment(
  angulationOffset: number,
  gingivalThickness: number,
  isAesthetic: boolean,
  isMultiUnit: boolean,
  parafunction: boolean
): AbutmentRecommendation {
  const recommendedCuffHeight = Math.max(1.0, Math.round(gingivalThickness));

  if (isMultiUnit) {
    const ang = angulationOffset > 20 ? 30 : angulationOffset > 10 ? 17 : 0;
    return {
      type: 'multi-unit',
      name: `Multi-Unit Abutment (${ang}° Angulation)`,
      material: 'Titanium Grade 5',
      recommendedCuffHeight,
      angulationDegrees: ang,
      rationale: 'Multi-Unit Abutments (MUA) standardize divergence across multiple implants and bring the restorative interface to mucosal level for passive full-arch seating.'
    };
  }

  if (isAesthetic && !parafunction) {
    return {
      type: 'custom-zirconia',
      name: 'Custom Zirconia Abutment on Titanium Base (Ti-Base)',
      material: 'Y-TZP Zirconia with Grade 5 Titanium Base',
      recommendedCuffHeight,
      angulationDegrees: angulationOffset,
      rationale: 'Custom CAD/CAM Ti-Base provides individualized emergence profile matching the anatomical tooth cross-section and prevents grayish gingival shadowing in the aesthetic zone.'
    };
  }

  if (angulationOffset <= 5) {
    return {
      type: 'stock-straight',
      name: 'Stock Straight Titanium Abutment',
      material: 'Titanium Grade 4/5',
      recommendedCuffHeight,
      angulationDegrees: 0,
      rationale: 'Implant is placed with near-ideal axial alignment. A straight stock abutment offers reliable strength and cost-efficiency.'
    };
  }

  if (angulationOffset <= 17) {
    return {
      type: 'stock-angled-15',
      name: '15° Angled Titanium Abutment',
      material: 'Titanium Grade 5',
      recommendedCuffHeight,
      angulationDegrees: 15,
      rationale: '15° angled stock abutment compensates for minor crestal angulation, directing the access trajectory toward the cingulum/occlusal groove.'
    };
  }

  return {
    type: 'custom-titanium',
    name: `Custom Milled Titanium Abutment (${angulationOffset}° Corrected)`,
    material: 'Milled Medical Grade Titanium',
    recommendedCuffHeight,
    angulationDegrees: angulationOffset,
    rationale: `Angulation offset (${angulationOffset}°) exceeds stock limits. Custom CAD/CAM milling ensures accurate alignment, ideal margin depth, and uniform ceramic support.`
  };
}

/**
 * Main Prosthetic Planning Engine
 */
export function calculateProstheticPlan(input: ProstheticCalculationInput): ProstheticCalculationResult {
  const isAesthetic = input.isAestheticZone !== undefined 
    ? input.isAestheticZone 
    : determineAestheticZone(input.fdiPosition);

  const angulation = input.implantAngulationOffset || 0;
  const parafunction = !!input.parafunction;

  // 1. Crown to Implant ratio
  const crownToImplant = calculateCrownToImplant(input.interarchSpace, input.implantLength);

  // 2. Retention mode
  const retention = evaluateRetentionType(input.interarchSpace, angulation, isAesthetic, parafunction);

  // 3. Abutment selection
  const abutment = selectAbutment(
    angulation,
    input.gingivalThickness,
    isAesthetic,
    !!input.isMultiUnitOrBridge,
    parafunction
  );

  // 4. Screw torque specs
  const abutmentTorque = getScrewTorque(input.implantSystem, 'abutment-screw');
  const prostheticTorque = input.isMultiUnitOrBridge ? 15 : abutmentTorque;
  const screwTorque: ScrewTorqueSpecification = {
    system: input.implantSystem,
    abutmentScrewTorqueNcm: abutmentTorque,
    prostheticScrewTorqueNcm: prostheticTorque,
    protocolNotes: `Tighten to ${abutmentTorque} Ncm with calibrated torque wrench. Wait 10 minutes for settling, then re-torque to ${abutmentTorque} Ncm prior to sealing access channel.`
  };

  // 5. Crown material selection
  let recommendedMaterial: CrownMaterial = 'zirconia-monolithic';
  let alternativeMaterial: CrownMaterial = 'PFM';
  let materialRationale = 'Monolithic translucent zirconia provides exceptional chip resistance and biocompatibility for posterior high-stress zones.';

  if (isAesthetic) {
    recommendedMaterial = 'zirconia-layered';
    alternativeMaterial = 'lithium-disilicate';
    materialRationale = 'Micro-layered zirconia or lithium disilicate provides lifelike incisal translucency and light refraction in the aesthetic smile corridor.';
  } else if (parafunction) {
    recommendedMaterial = 'zirconia-monolithic';
    alternativeMaterial = 'titanium-framework';
    materialRationale = 'Patients with parafunction require high-strength monolithic zirconia (≥ 1000 MPa) without porcelain layering to prevent catastrophic fracture.';
  }

  // 6. Cantilever calculation (for bridges/All-on-4)
  let cantileverGuidelines: ProstheticCalculationResult['cantileverGuidelines'] = undefined;
  if (input.apSpread && input.apSpread > 0) {
    const maxCantilever = Number((input.apSpread * 1.5).toFixed(1));
    cantileverGuidelines = {
      apSpread: input.apSpread,
      maxRecommendedDistalCantilever: Math.min(maxCantilever, 15.0), // Cap at 15mm per English/Misch guidelines
      formula: 'Max Distal Cantilever = AP Spread × 1.5 (Safe upper threshold: ≤ 15mm)'
    };
  }

  // 7. Clinical checklist
  const clinicalChecklist: string[] = [
    `Verify radiographic seating with periapical X-ray after initial screw placement.`,
    `Check passive fit using the Sheffield test (one screw test) before final torque application.`,
    `Apply PTFE (Teflon) tape over the screw head before closing with composite resin.`,
    `Confirm light contact in centric occlusion and complete disclusion in lateral and protrusive excursions.`
  ];

  if (parafunction) {
    clinicalChecklist.push('Fabricate a hard occlusal nightguard to protect implants from nighttime bruxism peaks.');
  }

  return {
    fdiPosition: input.fdiPosition,
    crownToImplant,
    retention,
    abutment,
    screwTorque,
    material: {
      recommendedMaterial,
      alternativeMaterial,
      rationale: materialRationale
    },
    cantileverGuidelines,
    clinicalChecklist
  };
}
