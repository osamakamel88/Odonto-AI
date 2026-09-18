/**
 * Cervical Vertebral Maturation (CVM) Assessment Engine
 * Based on Baccetti, Franchi, and McNamara (AJO-DO 2002, 2005)
 * 
 * Assesses biological maturity and the mandibular skeletal growth spurt 
 * by evaluating the morphology of C2, C3, and C4 cervical vertebrae.
 */

export type CVMStage = 'CS1' | 'CS2' | 'CS3' | 'CS4' | 'CS5' | 'CS6';

export interface VertebralCharacteristics {
  c2Concavity: boolean; // Concavity at the inferior border of C2
  c3Concavity: boolean; // Concavity at the inferior border of C3
  c4Concavity: boolean; // Concavity at the inferior border of C4
  c3Shape: 'trapezoid' | 'horizontal_rectangular' | 'square' | 'vertical_rectangular';
  c4Shape: 'trapezoid' | 'horizontal_rectangular' | 'square' | 'vertical_rectangular';
}

export interface CVMAnalysisResult {
  stage: CVMStage;
  stageName: string;
  growthStatus: 'pre-peak' | 'peak-velocity' | 'decelerating' | 'post-peak-completed';
  peakMandibularGrowthWindow: string;
  skeletalGrowthPercentageRemaining: number;
  clinicalImplications: {
    maxillaryProtractionFacemask: 'Optimal' | 'Favorable' | 'Guarded' | 'Contraindicated (Surgical)';
    functionalAppliancesTwinBlock: 'Early (Consider Phase 1)' | 'Peak Ideal Window' | 'Declining Response' | 'Ineffective Skeletally (Camouflage or Surgery)';
    rapidPalatalExpansionRPE: 'Skeletal Suture Patent' | 'Suture Partially Interdigitated' | 'Heavy Interdigitation (Consider MSE/SARPE)';
    orthognathicSurgeryTiming: 'Premature - High Relapse Risk' | 'Growing - Defer Final Osteotomies' | 'Mature - Safe for Orthognathic Surgery';
  };
  evidenceCitation: string;
  recommendationSummary: string;
}

export const CVM_STAGE_DETAILS: Record<CVMStage, {
  name: string;
  growthStatus: CVMAnalysisResult['growthStatus'];
  description: string;
  peakTiming: string;
  growthRemainingPct: number;
  rpeResponse: CVMAnalysisResult['clinicalImplications']['rapidPalatalExpansionRPE'];
  facemaskResponse: CVMAnalysisResult['clinicalImplications']['maxillaryProtractionFacemask'];
  functionalResponse: CVMAnalysisResult['clinicalImplications']['functionalAppliancesTwinBlock'];
  surgerySafety: CVMAnalysisResult['clinicalImplications']['orthognathicSurgeryTiming'];
}> = {
  CS1: {
    name: 'CS1 (Initiation Stage)',
    growthStatus: 'pre-peak',
    description: 'Inferior borders of C2, C3, and C4 are flat. Vertebral bodies of C3 and C4 are trapezoid in shape.',
    peakTiming: 'Peak mandibular growth will occur at least 1 to 2 years after this stage.',
    growthRemainingPct: 85,
    rpeResponse: 'Skeletal Suture Patent',
    facemaskResponse: 'Optimal',
    functionalResponse: 'Early (Consider Phase 1)',
    surgerySafety: 'Premature - High Relapse Risk'
  },
  CS2: {
    name: 'CS2 (Acceleration Stage)',
    growthStatus: 'pre-peak',
    description: 'Concavity present at inferior border of C2. C3 and C4 are flat inferiorly and trapezoid in shape.',
    peakTiming: 'Peak mandibular growth will occur approximately 1 year after this stage.',
    growthRemainingPct: 70,
    rpeResponse: 'Skeletal Suture Patent',
    facemaskResponse: 'Favorable',
    functionalResponse: 'Early (Consider Phase 1)',
    surgerySafety: 'Premature - High Relapse Risk'
  },
  CS3: {
    name: 'CS3 (Transition Stage)',
    growthStatus: 'peak-velocity',
    description: 'Concavities present at inferior borders of both C2 and C3. C3 and C4 bodies are trapezoid or horizontally rectangular.',
    peakTiming: 'Mandibular growth spurt is beginning and will accelerate sharply over the next 12 months.',
    growthRemainingPct: 55,
    rpeResponse: 'Suture Partially Interdigitated',
    facemaskResponse: 'Guarded',
    functionalResponse: 'Peak Ideal Window',
    surgerySafety: 'Growing - Defer Final Osteotomies'
  },
  CS4: {
    name: 'CS4 (Deceleration Stage)',
    growthStatus: 'peak-velocity',
    description: 'Concavities present at inferior borders of C2, C3, and C4. Both C3 and C4 are horizontally rectangular.',
    peakTiming: 'Peak velocity has occurred within the past 12 months; active pubertal elongation is decelerating.',
    growthRemainingPct: 35,
    rpeResponse: 'Suture Partially Interdigitated',
    facemaskResponse: 'Contraindicated (Surgical)',
    functionalResponse: 'Peak Ideal Window',
    surgerySafety: 'Growing - Defer Final Osteotomies'
  },
  CS5: {
    name: 'CS5 (Maturation Stage)',
    growthStatus: 'decelerating',
    description: 'Concavities prominent at C2, C3, and C4. At least one of C3 or C4 vertebral bodies is square in shape.',
    peakTiming: 'Peak mandibular growth ended at least 1 year prior to this stage.',
    growthRemainingPct: 15,
    rpeResponse: 'Heavy Interdigitation (Consider MSE/SARPE)',
    facemaskResponse: 'Contraindicated (Surgical)',
    functionalResponse: 'Declining Response',
    surgerySafety: 'Growing - Defer Final Osteotomies'
  },
  CS6: {
    name: 'CS6 (Completion Stage)',
    growthStatus: 'post-peak-completed',
    description: 'Deep concavities at C2, C3, and C4. At least one of C3 or C4 vertebral bodies is vertically rectangular.',
    peakTiming: 'Mandibular and skeletal growth is complete.',
    growthRemainingPct: 2,
    rpeResponse: 'Heavy Interdigitation (Consider MSE/SARPE)',
    facemaskResponse: 'Contraindicated (Surgical)',
    functionalResponse: 'Ineffective Skeletally (Camouflage or Surgery)',
    surgerySafety: 'Mature - Safe for Orthognathic Surgery'
  }
};

export function determineCVMStage(features: VertebralCharacteristics): CVMStage {
  const { c2Concavity, c3Concavity, c4Concavity, c3Shape, c4Shape } = features;

  const hasVertical = c3Shape === 'vertical_rectangular' || c4Shape === 'vertical_rectangular';
  const hasSquare = c3Shape === 'square' || c4Shape === 'square';
  const isHorizontal = c3Shape === 'horizontal_rectangular' && c4Shape === 'horizontal_rectangular';

  if (c2Concavity && c3Concavity && c4Concavity && hasVertical) {
    return 'CS6';
  }
  if (c2Concavity && c3Concavity && c4Concavity && (hasSquare || hasVertical)) {
    return 'CS5';
  }
  if (c2Concavity && c3Concavity && c4Concavity && isHorizontal) {
    return 'CS4';
  }
  if (c2Concavity && c3Concavity && !c4Concavity) {
    return 'CS3';
  }
  if (c2Concavity && !c3Concavity && !c4Concavity) {
    return 'CS2';
  }
  return 'CS1';
}

export function analyzeCVMGrowth(stage: CVMStage, chronologicalAge?: number, gender?: 'male' | 'female'): CVMAnalysisResult {
  const details = CVM_STAGE_DETAILS[stage];

  let recommendationSummary = '';
  if (stage === 'CS1' || stage === 'CS2') {
    recommendationSummary = 'Patient is in pre-peak pubertal development. High orthopedic responsiveness for maxillary expansion (RPE) and protraction facemask. Functional appliances (Twin Block) can be initiated or monitored until CS3 to minimize overall appliance duration.';
  } else if (stage === 'CS3' || stage === 'CS4') {
    recommendationSummary = 'PATIENT IS IN THE OPTIMAL PUBERTAL MANDIBULAR GROWTH WINDOW. This is the peak therapeutic timing for Class II functional orthopedics (Twin Block, Herbst, Forsus) to maximize skeletal elongation and minimize unwanted dentoalveolar tipping.';
  } else if (stage === 'CS5') {
    recommendationSummary = 'Patient has passed the mandibular peak. Response to functional orthopedics will be predominantly dentoalveolar tipping. Rapid palatal expansion will encounter heavy suture resistance; consider micro-implant assisted palatal expansion (MSE/MARPE).';
  } else {
    recommendationSummary = 'Skeletal growth is complete. Mandibular retrognathism or prognathism cannot be corrected with orthopedic appliances. Treatment options are limited to orthodontic camouflage or combined orthognathic surgery.';
  }

  return {
    stage,
    stageName: details.name,
    growthStatus: details.growthStatus,
    peakMandibularGrowthWindow: details.peakTiming,
    skeletalGrowthPercentageRemaining: details.growthRemainingPct,
    clinicalImplications: {
      maxillaryProtractionFacemask: details.facemaskResponse,
      functionalAppliancesTwinBlock: details.functionalResponse,
      rapidPalatalExpansionRPE: details.rpeResponse,
      orthognathicSurgeryTiming: details.surgerySafety
    },
    evidenceCitation: 'Baccetti T, Franchi L, McNamara JA Jr. The Cervical Vertebral Maturation (CVM) method for the assessment of optimal treatment timing in dentofacial orthopedics. Semin Orthod. 2005;11(3):119-129.',
    recommendationSummary
  };
}

export function estimateCVMFromAge(ageYears: number, gender: 'male' | 'female' = 'female'): CVMStage {
  const adjustedAge = gender === 'female' ? ageYears + 1 : ageYears;
  if (adjustedAge < 10) return 'CS1';
  if (adjustedAge < 11.5) return 'CS2';
  if (adjustedAge < 13) return 'CS3';
  if (adjustedAge < 14.5) return 'CS4';
  if (adjustedAge < 16) return 'CS5';
  return 'CS6';
}
