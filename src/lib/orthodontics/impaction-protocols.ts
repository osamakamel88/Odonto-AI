/**
 * Maxillary Canine Impaction & Eruption Biomechanics Module
 * 
 * Based on:
 * - Ericson S, Kurol J. Early treatment of palatally erupting maxillary canines by extraction of the primary canines. Eur J Orthod. 1988;10(4):283-295.
 * - Baccetti T, Leonardi M, Armi P. A randomized clinical study of two interceptive approaches to palatally displaced canines. Eur J Orthod. 2008;30(4):381-385.
 * - Kokich VG. Surgical and orthodontic management of impacted teeth. Quintessence. 2004.
 */

export type EricsonKurolSector = 1 | 2 | 3 | 4 | 5;

export interface CanineImpactionData {
  sector: EricsonKurolSector;
  alphaAngleDegrees: number; // Angle to mid-sagittal plane
  distanceToOcclusalPlaneMm: number;
  patientAge: number;
  isPalatal: boolean;
  deciduousCaninePresent: boolean;
  lateralRootResorptionSuspected: boolean;
}

export interface CanineAssessmentResult {
  prognosis: 'Favorable' | 'Moderate' | 'Guarded' | 'Poor / High Risk';
  difficultyIndex: number; // 1-10
  interceptiveRecommendation: {
    indicated: boolean;
    procedure: string;
    expectedSuccessRate: string;
    clinicalRule: string;
  };
  surgicalExposure: {
    method: 'Closed Eruption' | 'Apically Repositioned Flap (APF)' | 'Open Surgical Window' | 'Observation / Interceptive Only';
    rationale: string;
    keratinizedGingivaConsideration: string;
  };
  tractionMechanics: {
    primaryVector: string;
    recommendedAppliance: string;
    anchorageStrategy: string;
    contraindicatedMechanics: string;
  };
  rootResorptionRisk: {
    level: 'Low' | 'Moderate' | 'High';
    affectedTeeth: string[];
    monitoringInterval: string;
  };
  citations: {
    citation: string;
    pmid?: string;
    doi?: string;
  }[];
}

export const ERICSON_KUROL_SECTORS: Record<EricsonKurolSector, {
  name: string;
  description: string;
  difficultyScore: number;
}> = {
  1: {
    name: 'Sector 1 (Distal)',
    description: 'Canine crown is completely distal to the tangent of the lateral incisor crown and root.',
    difficultyScore: 2
  },
  2: {
    name: 'Sector 2 (Distal Half of Lateral Root)',
    description: 'Canine crown tip lies between the distal tangent and the long-axis midline of the lateral incisor root.',
    difficultyScore: 4
  },
  3: {
    name: 'Sector 3 (Mesial Half of Lateral Root)',
    description: 'Canine crown tip lies between the midline of the lateral incisor root and its mesial tangent.',
    difficultyScore: 6
  },
  4: {
    name: 'Sector 4 (Central Incisor Zone)',
    description: 'Canine crown tip lies between the mesial tangent of the lateral incisor and the mid-sagittal plane.',
    difficultyScore: 8
  },
  5: {
    name: 'Sector 5 (Contralateral Crossing)',
    description: 'Canine crown tip crosses the mid-sagittal plane into the contralateral quadrant.',
    difficultyScore: 10
  }
};

/**
 * Assesses Maxillary Canine Impaction severity and generates evidence-based mechanics.
 */
export function assessCanineImpaction(data: CanineImpactionData): CanineAssessmentResult {
  const { sector, alphaAngleDegrees, distanceToOcclusalPlaneMm, patientAge, isPalatal, deciduousCaninePresent, lateralRootResorptionSuspected } = data;

  // Calculate difficulty index (1 to 10 scale)
  let difficulty = ERICSON_KUROL_SECTORS[sector].difficultyScore * 0.4;
  
  if (alphaAngleDegrees > 35) difficulty += 3.0;
  else if (alphaAngleDegrees > 25) difficulty += 1.8;
  else difficulty += 0.8;

  if (distanceToOcclusalPlaneMm > 15) difficulty += 2.5;
  else if (distanceToOcclusalPlaneMm > 10) difficulty += 1.5;
  else difficulty += 0.7;

  if (patientAge > 18) difficulty += 1.2;
  if (lateralRootResorptionSuspected) difficulty += 1.0;

  const normalizedDifficulty = Math.min(10, Math.max(1, Math.round(difficulty * 10) / 10));

  let prognosis: CanineAssessmentResult['prognosis'] = 'Favorable';
  if (normalizedDifficulty >= 8.0) prognosis = 'Poor / High Risk';
  else if (normalizedDifficulty >= 6.0) prognosis = 'Guarded';
  else if (normalizedDifficulty >= 4.0) prognosis = 'Moderate';

  // Interceptive evaluation (Ericson & Kurol 1988)
  const isInterceptiveCandidate = patientAge >= 10 && patientAge <= 13 && deciduousCaninePresent && sector <= 3;
  const interceptiveSuccess = sector <= 2 ? '78% spontaneous normalization within 12 months' : '64% improvement (may still require secondary traction)';

  // Surgical exposure determination
  let exposureMethod: CanineAssessmentResult['surgicalExposure']['method'] = 'Closed Eruption';
  let exposureRationale = '';
  let gingivaNote = '';

  if (isInterceptiveCandidate && sector <= 2 && alphaAngleDegrees < 30) {
    exposureMethod = 'Observation / Interceptive Only';
    exposureRationale = 'Interceptive extraction of primary canine is indicated first; reassess eruption vector after 6-9 months via CBCT or panoramic.';
    gingivaNote = 'Surgical intervention deferred pending spontaneous eruption trajectory.';
  } else if (isPalatal) {
    exposureMethod = 'Closed Eruption';
    exposureRationale = 'Palatal impaction with closed eruption preserves maximum palatal keratinized tissue and physiological periodontal attachment.';
    gingivaNote = 'Thick palatal masticatory mucosa provides favorable post-eruption attached gingival architecture.';
  } else {
    // Labial / Buccal impaction
    if (distanceToOcclusalPlaneMm < 10) {
      exposureMethod = 'Apically Repositioned Flap (APF)';
      exposureRationale = 'Labial impaction coronal to mucogingival junction treated with APF to preserve and drag keratinized gingiva with the tooth.';
      gingivaNote = 'Critical to avoid simple excisional unroofing on the buccal surface to prevent mucogingival defect or gingival recession.';
    } else {
      exposureMethod = 'Closed Eruption';
      exposureRationale = 'High labial impaction apical to mucogingival junction requires closed eruption to prevent tooth erupting through alveolar mucosa.';
      gingivaNote = 'Tunnel traction approach through alveolar mucosa with tunnel directed toward attached crestal ridge.';
    }
  }

  // Biomechanical Traction Mechanics
  let primaryVector = 'Distal & occlusal traction away from lateral incisor root apex.';
  let appliance = '0.017" x 0.025" TMA Cantilever spring with auxiliary base archwire (0.019" x 0.025" SS).';
  let anchorage = 'Heavy rigid base archwire (0.019" x 0.025" SS) with transpalatal arch (TPA) or palatal TAD.';
  let contraindication = 'Never attach elastic thread or power chain directly from the impacted canine to flexible round archwires (e.g. 0.014 NiTi), as this creates reciprocal intrusion and root tipping of adjacent lateral incisors.';

  if (isPalatal && sector >= 3) {
    primaryVector = 'Posterior-lateral vector toward the premolar zone first, followed by extrusion once crown clears lateral root.';
    appliance = 'Ballista spring (0.016" x 0.022" TMA) or Paramedian Palatal TAD with power arm.';
    anchorage = 'Palatal TAD (2.0 x 9 mm) in anterior T-Zone providing absolute skeletal anchorage without tooth contact.';
  }

  // Root resorption assessment
  const resorptionLevel = (sector >= 3 || alphaAngleDegrees > 30 || lateralRootResorptionSuspected) 
    ? (sector >= 4 || alphaAngleDegrees > 35 ? 'High' : 'Moderate') 
    : 'Low';

  return {
    prognosis,
    difficultyIndex: normalizedDifficulty,
    interceptiveRecommendation: {
      indicated: isInterceptiveCandidate,
      procedure: isInterceptiveCandidate ? 'Extraction of primary deciduous canine (Tooth 53/63) +/- primary first molar' : 'Surgical-orthodontic alignment indicated (past interceptive window)',
      expectedSuccessRate: isInterceptiveCandidate ? interceptiveSuccess : 'N/A (Active traction required)',
      clinicalRule: 'Ericson & Kurol (1988) clinical trial: Extraction of primary canines before age 13 normalizes 78% of palatally displaced canines in Sector 1-2.'
    },
    surgicalExposure: {
      method: exposureMethod,
      rationale: exposureRationale,
      keratinizedGingivaConsideration: gingivaNote
    },
    tractionMechanics: {
      primaryVector,
      recommendedAppliance: appliance,
      anchorageStrategy: anchorage,
      contraindicatedMechanics: contraindication
    },
    rootResorptionRisk: {
      level: resorptionLevel,
      affectedTeeth: ['Maxillary Lateral Incisor (Root mid-to-apical third)', 'Maxillary Central Incisor (Distal root surface if Sector 4/5)'],
      monitoringInterval: resorptionLevel === 'High' ? 'CBCT evaluation every 6 months during active traction' : 'Periapical radiograph every 6 months'
    },
    citations: [
      {
        citation: 'Ericson S, Kurol J. Early treatment of palatally erupting maxillary canines by extraction of the primary canines. Eur J Orthod. 1988;10(4):283-295.',
        pmid: '3164998',
        doi: '10.1093/ejo/10.4.283'
      },
      {
        citation: 'Baccetti T, Leonardi M, Armi P. A randomized clinical study of two interceptive approaches to palatally displaced canines. Eur J Orthod. 2008;30(4):381-385.',
        pmid: '18635882',
        doi: '10.1093/ejo/cjn023'
      },
      {
        citation: 'Kokich VG. Preorthodontic uncover and eruption of impacted canines. Semin Orthod. 2010;16(3):205-211.',
        doi: '10.1053/j.sodo.2010.05.007'
      }
    ]
  };
}
