/**
 * Adult Skeletal Expansion & MARPE / MSE Protocol Engine
 * 
 * Based on:
 * - Angelieri F, Cevidanes LH, Franchi L, et al. Midpalatal suture maturation: classification method for individual assessment before rapid maxillary expansion. Am J Orthod Dentofacial Orthop. 2013;144(5):759-769. (PMID: 24182592)
 * - Moon W. Class III treatment by maxillary skeletal expander (MSE) and bone anchored maxillary protraction (BAMP). Semin Orthod. 2018;24(1):95-107.
 * - Cantarella D, Dominguez-Mompell R, Mallya SM, et al. Changes in the midpalatal and pterygopalatine sutures induced by micro-implant-supported skeletal expander. Prog Orthod. 2017;18(1):41.
 */

export type SutureMaturationStage = 'Stage A' | 'Stage B' | 'Stage C' | 'Stage D' | 'Stage E';

export interface MarpeAssessmentInput {
  patientAge: number;
  sutureStage?: SutureMaturationStage;
  transverseDeficiencyMm: number; // Discrepancy between maxilla and mandible
  palatalBoneThicknessMm?: number; // Measured on CBCT from palatal to nasal cortex
  unilateralCrossbite: boolean;
  posteriorTippingDegrees?: number; // Molar buccal inclination
  hasRespiratoryObstruction?: boolean;
}

export interface MarpeAssessmentResult {
  inferredSutureStage: SutureMaturationStage;
  recommendedModality: 'Conventional Tooth-Borne RPE (Hyrax)' | 'Hybrid Tooth-Bone Borne Expander' | 'Bicortical MARPE / MSE' | 'SARPE (Surgically Assisted RPE) or MARPE + Corticopuncture';
  bicorticalEngagementProtocol: {
    required: boolean;
    tadDimensions: string;
    tadSites: string;
    nasalFloorEngagement: string;
    safetyMargins: string;
  };
  activationSchedule: {
    protocolName: string;
    turnsPerDay: string;
    dailyExpansionRateMm: string;
    sutureSplitCheckPeriod: string;
    splitConfirmationSigns: string[];
  };
  retentionProtocol: {
    lockingProcedure: string;
    consolidationPeriodMonths: number;
    radiographicMineralizationCheck: string;
  };
  airwayBenefits: {
    expectedNasalCavityExpansionMm: string;
    expectedAirwayVolumeIncreasePercent: string;
    clinicalNote: string;
  };
  citations: {
    citation: string;
    pmid?: string;
    doi?: string;
  }[];
}

export const SUTURE_STAGES: Record<SutureMaturationStage, {
  name: string;
  description: string;
  ageWindow: string;
  conventionalRpeSuccess: string;
}> = {
  'Stage A': {
    name: 'Stage A: Uniform Radiolucent Line',
    description: 'Uniform high-density line of the suture with little or no interdigitation. Midpalatal suture has not begun fusion.',
    ageWindow: 'Chronological age up to 10-12 years',
    conventionalRpeSuccess: '100% predictable skeletal separation'
  },
  'Stage B': {
    name: 'Stage B: Scalloped Appearance',
    description: 'Interdigitated, scalloped high-density line. Increased structural interlocking but continuous radiolucent line.',
    ageWindow: 'Prepubertal / early pubertal (~11-14 years)',
    conventionalRpeSuccess: '90-95% skeletal separation'
  },
  'Stage C': {
    name: 'Stage C: Two Parallel Suture Lines',
    description: 'Two parallel, scalloped high-density lines separated by a narrow radiolucent space in the maxillary and palatine bones.',
    ageWindow: 'Pubertal spurt (~14-17 years)',
    conventionalRpeSuccess: '65-80% skeletal separation; dental tipping risk emerges'
  },
  'Stage D': {
    name: 'Stage D: Partial Palatine Fusion',
    description: 'Midpalatal suture is fused in the palatine bone (posterior sector) while patent in the anterior maxilla.',
    ageWindow: 'Late adolescence / young adults (~17-21 years)',
    conventionalRpeSuccess: 'Low (< 30%); conventional RPE causes buccal crown tipping and alveolar dehiscence'
  },
  'Stage E': {
    name: 'Stage E: Complete Suture Obliteration',
    description: 'Complete fusion and bony bridging across both palatine and maxillary components of the suture.',
    ageWindow: 'Adults (> 21-25 years)',
    conventionalRpeSuccess: 'Contraindicated (causes periodontal bone loss without skeletal split)'
  }
};

/**
 * Assesses midpalatal suture maturation and plans skeletal expansion protocol.
 */
export function assessMarpeProtocol(input: MarpeAssessmentInput): MarpeAssessmentResult {
  const { patientAge, sutureStage, transverseDeficiencyMm, palatalBoneThicknessMm = 6.5, unilateralCrossbite, posteriorTippingDegrees = 5 } = input;

  // Infer suture stage if not explicitly provided from CBCT
  let stage: SutureMaturationStage = sutureStage || 'Stage C';
  if (!sutureStage) {
    if (patientAge < 11) stage = 'Stage A';
    else if (patientAge <= 14) stage = 'Stage B';
    else if (patientAge <= 17) stage = 'Stage C';
    else if (patientAge <= 22) stage = 'Stage D';
    else stage = 'Stage E';
  }

  // Modality recommendation
  let modality: MarpeAssessmentResult['recommendedModality'] = 'Bicortical MARPE / MSE';
  if (stage === 'Stage A' || stage === 'Stage B') {
    modality = 'Conventional Tooth-Borne RPE (Hyrax)';
  } else if (stage === 'Stage C') {
    modality = patientAge < 16 ? 'Conventional Tooth-Borne RPE (Hyrax)' : 'Hybrid Tooth-Bone Borne Expander';
  } else if (stage === 'Stage D') {
    modality = 'Bicortical MARPE / MSE';
  } else {
    // Stage E
    modality = transverseDeficiencyMm > 7 
      ? 'SARPE (Surgically Assisted RPE) or MARPE + Corticopuncture'
      : 'Bicortical MARPE / MSE';
  }

  // Bicortical Engagement Protocol
  const isBicorticalRequired = stage === 'Stage C' || stage === 'Stage D' || stage === 'Stage E';
  const screwLength = palatalBoneThicknessMm > 7 ? '2.0 x 13 mm' : '1.8 x 11 mm';

  const bicorticalProtocol = {
    required: isBicorticalRequired,
    tadDimensions: isBicorticalRequired ? `4x Micro-implants: ${screwLength} (Grade 5 Titanium or Ti-Al-V)` : 'Not mandatory (Tooth-borne anchorage sufficient)',
    tadSites: 'Paramedian suture: 2 TADs between 1st premolar and 2nd premolar, 2 TADs between 2nd premolar and 1st molar, 2-3mm lateral to midpalatal suture.',
    nasalFloorEngagement: isBicorticalRequired ? 'CBCT planning to verify the screw tip anchors into the dense cortical bone of the nasal cavity floor for parallel skeletal expansion.' : 'Sub-cortical palatal seating.',
    safetyMargins: 'Maintain 1.5mm distance from greater palatine artery canal and dental roots.'
  };

  // Activation schedule
  let activationSchedule = {
    protocolName: 'Standard Rapid Maxillary Expansion (RPE)',
    turnsPerDay: '2 turns/day (morning and evening: 0.2mm per turn)',
    dailyExpansionRateMm: '0.4 mm/day',
    sutureSplitCheckPeriod: 'Evaluate at Day 5-7',
    splitConfirmationSigns: [
      'Appearance of midline diastema between central incisors (1.5–3.0 mm)',
      'Transient sensation of fullness or pressure across nasal bridge / zygomatic sutures',
      'No localized gingival ischemia around anchor teeth'
    ]
  };

  if (stage === 'Stage D' || stage === 'Stage E') {
    activationSchedule = {
      protocolName: 'Adult Maxillary Skeletal Expander (MSE) Slow-Activation Protocol',
      turnsPerDay: '1-2 turns/day until suture split confirmed, then 1 turn every 2 days',
      dailyExpansionRateMm: '0.2 mm to 0.4 mm/day initial, then 0.1 mm/day',
      sutureSplitCheckPeriod: 'Evaluate at Day 10-14 for central diastema emergence',
      splitConfirmationSigns: [
        'Central incisor diastema opening (1.0–2.5 mm indicates midpalatal suture release)',
        'CBCT or occlusal radiograph showing triangular or parallel radiolucency through suture',
        'Verification that expansion screw has not tilted relative to the palatal vault (> 15° tipping indicates TAD slippage)'
      ]
    };
  }

  // Retention
  const retentionProtocol = {
    lockingProcedure: 'Lock the expander screw with flowable composite or 0.012" stainless steel ligature tied through the activation hole.',
    consolidationPeriodMonths: stage === 'Stage D' || stage === 'Stage E' ? 6 : 4,
    radiographicMineralizationCheck: 'Occlusal radiograph or CBCT at 3 and 6 months to verify bone remineralization in the midpalatal distraction regenerate before debonding.'
  };

  // Airway
  const airwayBenefits = {
    expectedNasalCavityExpansionMm: isBicorticalRequired ? '2.0 to 4.5 mm wider pyriform aperture / nasal floor width' : '1.5 to 2.5 mm nasal floor widening',
    expectedAirwayVolumeIncreasePercent: isBicorticalRequired ? '18% to 32% increase in total nasal cavity volume' : '10% to 15% increase in nasal airway volume',
    clinicalNote: 'Skeletal expansion lowers nasal airway resistance and improves nocturnal nasal breathing, particularly beneficial for Class III or sleep-disordered breathing patients.'
  };

  return {
    inferredSutureStage: stage,
    recommendedModality: modality,
    bicorticalEngagementProtocol: bicorticalProtocol,
    activationSchedule,
    retentionProtocol,
    airwayBenefits,
    citations: [
      {
        citation: 'Angelieri F, Cevidanes LH, Franchi L, et al. Midpalatal suture maturation: classification method for individual assessment before rapid maxillary expansion. Am J Orthod Dentofacial Orthop. 2013;144(5):759-769.',
        pmid: '24182592',
        doi: '10.1016/j.ajodo.2013.04.022'
      },
      {
        citation: 'Moon W. Class III treatment by maxillary skeletal expander (MSE) and bone anchored maxillary protraction (BAMP). Semin Orthod. 2018;24(1):95-107.',
        doi: '10.1053/j.sodo.2018.01.009'
      },
      {
        citation: 'Cantarella D, Dominguez-Mompell R, Mallya SM, et al. Changes in the midpalatal and pterygopalatine sutures induced by micro-implant-supported skeletal expander. Prog Orthod. 2017;18(1):41.',
        pmid: '29235003',
        doi: '10.1186/s40510-017-0197-1'
      }
    ]
  };
}
