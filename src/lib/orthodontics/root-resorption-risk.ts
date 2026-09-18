/**
 * External Apical Root Resorption (EARR) Risk Stratification Engine
 * Based on Levander & Malmgren (1988) and Brezniak & Wasserstein (1993, 2002)
 * 
 * Stratifies risk of apical root shortening prior to and during orthodontic mechanics.
 */

export type RootMorphology = 'normal' | 'blunt' | 'pipette_shaped' | 'dilacerated' | 'short_conical';

export interface RootResorptionRiskFactors {
  rootMorphology: RootMorphology;
  historyOfDentalTrauma: boolean;
  heavyContinuousIntrusionPlanned: boolean;
  prolongedTreatmentDurationMonths: number;
  systemicAllergiesAsthma: boolean;
  previousEndodonticTreatment: boolean;
  rootResorptionObservedOnProgressPan: boolean;
}

export interface RootResorptionRiskAssessment {
  riskScore: number;
  riskCategory: 'Low Risk' | 'Moderate Risk' | 'High Risk' | 'Critical / Active Resorption';
  levanderMalmgrenGrades: {
    grade0: string;
    grade1: string;
    grade2: string;
    grade3: string;
    grade4: string;
  };
  forceManagementProtocol: {
    forceLevelRecommended: string;
    activationIntervalWeeks: number;
    radiographicMonitoringProtocol: string;
    highRiskContraindicatedMechanics: string[];
  };
  mitigationStrategy: string;
  evidenceCitation: string;
}

export function assessRootResorptionRisk(factors: RootResorptionRiskFactors): RootResorptionRiskAssessment {
  let score = 0;

  if (factors.rootMorphology === 'pipette_shaped' || factors.rootMorphology === 'dilacerated') {
    score += 3;
  } else if (factors.rootMorphology === 'blunt' || factors.rootMorphology === 'short_conical') {
    score += 2;
  }

  if (factors.historyOfDentalTrauma) score += 2.5;
  if (factors.heavyContinuousIntrusionPlanned) score += 2;
  if (factors.prolongedTreatmentDurationMonths > 24) score += 1.5;
  if (factors.systemicAllergiesAsthma) score += 1;
  if (factors.rootResorptionObservedOnProgressPan) score += 4;

  let riskCategory: RootResorptionRiskAssessment['riskCategory'] = 'Low Risk';
  let mitigationStrategy = 'Standard orthodontic mechanics with light forces. Progress panoramic radiograph recommended at 6 to 9 months.';

  if (score >= 6 || factors.rootResorptionObservedOnProgressPan) {
    riskCategory = 'Critical / Active Resorption';
    mitigationStrategy = 'MANDATORY TREATMENT PAUSE: Remove active archwires or place passive round wire for 2 to 3 months to allow cementum and periodontal reparative healing. Eliminate all intrusive or torqueing mechanics. Transition to light intermittent forces.';
  } else if (score >= 4) {
    riskCategory = 'High Risk';
    mitigationStrategy = 'Use ultra-light continuous forces (e.g. 0.014" or 0.016" heat-activated CuNiTi). Avoid heavy rectangular archwire torque or continuous heavy intermaxillary elastics. Repeat periapical radiographs every 4 to 6 months.';
  } else if (score >= 2) {
    riskCategory = 'Moderate Risk';
    mitigationStrategy = 'Carefully control intrusive force vectors. Progress periapical radiograph of maxillary incisors at 6 months.';
  }

  return {
    riskScore: score,
    riskCategory,
    levanderMalmgrenGrades: {
      grade0: 'No apical root resorption (contour intact)',
      grade1: 'Mild resorption (root apex slightly rounded, < 2mm)',
      grade2: 'Moderate resorption (loss of root length up to 1/3 of original length)',
      grade3: 'Severe resorption (loss of root length greater than 1/3 of original length)',
      grade4: 'Extreme resorption (root length loss exceeding 50% with crown-to-root ratio inversion)'
    },
    forceManagementProtocol: {
      forceLevelRecommended: riskCategory === 'High Risk' || riskCategory === 'Critical / Active Resorption'
        ? 'Ultra-light intermittent forces (15 to 25 g per anterior tooth)'
        : 'Standard biological light continuous forces (30 to 50 g per anterior tooth)',
      activationIntervalWeeks: riskCategory === 'High Risk' ? 8 : 4,
      radiographicMonitoringProtocol: 'Progress periapical radiographs of upper incisors at 6 months post-bonding.',
      highRiskContraindicatedMechanics: [
        'Continuous intrusive utility arches with heavy forces (> 25g/tooth)',
        'Heavy Class II or Class III intermaxillary elastics (> 6 oz) with unsupported incisors',
        'Large progressive palatal root torque movements with rigid rectangular stainless steel wires'
      ]
    },
    mitigationStrategy,
    evidenceCitation: 'Levander E, Malmgren O. Evaluation of the risk of root resorption during orthodontic treatment: a study of upper incisors. Eur J Orthod. 1988;10(1):30-38. & Brezniak N, Wasserstein A. Orthodontically induced inflammatory root resorption. Angle Orthod. 2002;72(2):180-184.'
  };
}
