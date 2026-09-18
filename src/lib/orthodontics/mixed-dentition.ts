/**
 * Mixed Dentition Space Analysis Engine
 * Implements:
 * 1. Tanaka-Johnston Non-Radiographic Prediction Equations
 * 2. Moyers 75th Percentile Probability Prediction Tables
 * 3. Leeway Space (Nance E-Space) Calculation and LLHA Preservation Protocol
 */

export interface IncisorWidths {
  tooth31: number; // Lower left central incisor (mm)
  tooth32: number; // Lower left lateral incisor (mm)
  tooth41: number; // Lower right central incisor (mm)
  tooth42: number; // Lower right lateral incisor (mm)
}

export interface MixedDentitionResult {
  lowerIncisorsSum: number;
  predictedMaxillaryCaninePremolarQuadrantWidth: number;
  predictedMandibularCaninePremolarQuadrantWidth: number;
  predictedMaxillaryTotalRequired: number;
  predictedMandibularTotalRequired: number;
  moyers75thPercentile: {
    maxillaryQuadrantWidth: number;
    mandibularQuadrantWidth: number;
  };
  leewaySpaceExpected: {
    maxillaryPerQuadrant: number;
    mandibularPerQuadrant: number;
    totalArchBudget: string;
  };
  clinicalRecommendation: string;
  spacePreservationStrategy: string;
  evidenceCitation: string;
}

export function calculateTanakaJohnston(lowerIncisorSum: number): { maxillaryQuad: number; mandibularQuad: number } {
  const halfSum = lowerIncisorSum / 2;
  const maxillaryQuad = Number((halfSum + 11.0).toFixed(2));
  const mandibularQuad = Number((halfSum + 10.5).toFixed(2));
  return { maxillaryQuad, mandibularQuad };
}

export function getMoyers75thPercentile(lowerIncisorSum: number): { maxQuad: number; mandQuad: number } {
  const roundedSum = Math.round(lowerIncisorSum * 2) / 2;
  
  const lookupTable: Record<number, { max: number; mand: number }> = {
    19.5: { max: 20.6, mand: 20.1 },
    20.0: { max: 20.9, mand: 20.4 },
    20.5: { max: 21.2, mand: 20.7 },
    21.0: { max: 21.5, mand: 21.0 },
    21.5: { max: 21.8, mand: 21.3 },
    22.0: { max: 22.0, mand: 21.6 },
    22.5: { max: 22.3, mand: 21.9 },
    23.0: { max: 22.6, mand: 22.2 },
    23.5: { max: 22.9, mand: 22.5 },
    24.0: { max: 23.1, mand: 22.8 },
    24.5: { max: 23.4, mand: 23.1 },
    25.0: { max: 23.7, mand: 23.4 },
    25.5: { max: 24.0, mand: 23.7 },
    26.0: { max: 24.2, mand: 24.0 }
  };

  const clamped = Math.max(19.5, Math.min(26.0, roundedSum));
  const entry = lookupTable[clamped] || { max: (lowerIncisorSum / 2) + 11.0, mand: (lowerIncisorSum / 2) + 10.5 };
  return { maxQuad: entry.max, mandQuad: entry.mand };
}

export function analyzeMixedDentition(
  incisors: IncisorWidths | number,
  archSpaceAvailableMaxillary?: number,
  archSpaceAvailableMandibular?: number
): MixedDentitionResult {
  const sum = typeof incisors === 'number' 
    ? incisors 
    : Number((incisors.tooth31 + incisors.tooth32 + incisors.tooth41 + incisors.tooth42).toFixed(2));

  const { maxillaryQuad, mandibularQuad } = calculateTanakaJohnston(sum);
  const moyers = getMoyers75thPercentile(sum);

  const predictedMaxTotal = Number((maxillaryQuad * 2).toFixed(2));
  const predictedMandTotal = Number((mandibularQuad * 2).toFixed(2));

  let spacePreservationStrategy = 'Placement of a passive Lower Lingual Holding Arch (LLHA) or Nance holding arch preserves the 1.7 to 2.5 mm leeway space per quadrant, which can naturally resolve 3 to 4 mm of mild incisor crowding without permanent extractions.';
  let clinicalRecommendation = '';

  if (archSpaceAvailableMandibular !== undefined) {
    const discrepancy = archSpaceAvailableMandibular - (predictedMandTotal + sum);
    if (discrepancy < -5) {
      clinicalRecommendation = 'Severe space deficit (' + discrepancy.toFixed(1) + ' mm). Serial extraction protocol (Deciduous canines -> Primary 1st molars -> Permanent 1st premolars) or comprehensive fixed appliance expansion indicated.';
      spacePreservationStrategy = 'Space maintenance alone will be insufficient. Prepare for planned serial extraction or arch expansion.';
    } else if (discrepancy < -2) {
      clinicalRecommendation = 'Moderate space deficit (' + discrepancy.toFixed(1) + ' mm). Leeway space preservation with LLHA is strongly indicated to prevent mesial drift of permanent first molars.';
    } else {
      clinicalRecommendation = 'Favorable space balance (' + (discrepancy >= 0 ? '+' : '') + discrepancy.toFixed(1) + ' mm). Mild crowding can be spontaneously resolved using natural leeway space.';
    }
  } else {
    clinicalRecommendation = 'Sum of lower incisors: ' + sum.toFixed(1) + ' mm. Predicted unerupted 3-4-5 segment: ' + maxillaryQuad + ' mm (upper quadrant), ' + mandibularQuad + ' mm (lower quadrant).';
  }

  return {
    lowerIncisorsSum: sum,
    predictedMaxillaryCaninePremolarQuadrantWidth: maxillaryQuad,
    predictedMandibularCaninePremolarQuadrantWidth: mandibularQuad,
    predictedMaxillaryTotalRequired: predictedMaxTotal,
    predictedMandibularTotalRequired: predictedMandTotal,
    moyers75thPercentile: {
      maxillaryQuadrantWidth: moyers.maxQuad,
      mandibularQuadrantWidth: moyers.mandQuad
    },
    leewaySpaceExpected: {
      maxillaryPerQuadrant: 1.0,
      mandibularPerQuadrant: 2.1,
      totalArchBudget: 'Upper arch: ~2.0 mm total leeway | Lower arch: ~4.2 mm total leeway (E-space).'
    },
    clinicalRecommendation,
    spacePreservationStrategy,
    evidenceCitation: 'Tanaka MM, Johnston LE. The prediction of the size of unerupted canines and premolars in a contemporary orthodontic population. J Am Dent Assoc. 1974;88(4):798-801.'
  };
}
