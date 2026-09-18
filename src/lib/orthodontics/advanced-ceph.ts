/**
 * Advanced Cephalometric & Airway Analysis Engine
 * Implements:
 * 1. McNamara Cephalometric Analysis (AJO-DO 1984)
 * 2. Tweed Diagnostic Facial Triangle (1946)
 * 3. Upper and Lower Pharyngeal Airway Dimensions
 */

export interface McNamaraMeasurements {
  effectiveMaxillaryLengthCoA: number;
  effectiveMandibularLengthCoGn: number;
  maxilloMandibularDifferential: number;
  pointAToNasionPerpendicular: number;
  pogonionToNasionPerpendicular: number;
  lowerAnteriorFacialHeightANSMe: number;
  mandibularPlaneAngleToFH: number;
  upperPharyngealAirwayWidth: number;
  lowerPharyngealAirwayWidth: number;
}

export interface TweedTriangleMeasurements {
  fma: number;
  impa: number;
  fmia: number;
}

export interface AdvancedCephResult {
  mcnamara: {
    measurements: McNamaraMeasurements;
    interpretations: {
      maxillarySkeletalPosition: string;
      mandibularSkeletalPosition: string;
      skeletalDiscrepancyClassification: string;
      effectiveLengthDifferentialSignificance: string;
      airwayAssessment: {
        upperAirwayStatus: 'Adequate' | 'Constricted (Possible Adenoid Hypertrophy)';
        lowerAirwayStatus: 'Adequate' | 'Constricted (Possible Glossoptosis / OSA Risk)';
        clinicalAirwayNote: string;
      };
    };
  };
  tweedTriangle: {
    measurements: TweedTriangleMeasurements;
    interpretation: {
      growthDirection: 'Horizontal / Hypodivergent' | 'Normodivergent' | 'Vertical / Hyperdivergent';
      incisorPositionOnBasalBone: 'Upright / Stable' | 'Proclined / Unstable' | 'Retroclined';
      targetIMPAToReachTweedNorm: number;
    };
  };
  evidenceCitation: string;
}

export function calculateTweedTriangle(fma: number, impa: number): TweedTriangleMeasurements {
  const fmia = Number((180 - fma - impa).toFixed(1));
  return { fma, impa, fmia };
}

export function analyzeAdvancedCeph(
  mcnamara: McNamaraMeasurements,
  tweed: TweedTriangleMeasurements
): AdvancedCephResult {
  const diff = mcnamara.effectiveMandibularLengthCoGn - mcnamara.effectiveMaxillaryLengthCoA;

  let maxPos = 'Normal Maxillary Position (0 to +1 mm to N-Perp)';
  if (mcnamara.pointAToNasionPerpendicular < -1.5) {
    maxPos = 'Maxillary Skeletal Retrusion (Point A posterior to N-Perp)';
  } else if (mcnamara.pointAToNasionPerpendicular > 2.5) {
    maxPos = 'Maxillary Skeletal Protrusion (Point A anterior to N-Perp)';
  }

  let mandPos = 'Orthognathic Mandible (-2 to 0 mm to N-Perp)';
  if (mcnamara.pogonionToNasionPerpendicular < -4) {
    mandPos = 'Mandibular Retrognathia (Pogonion significantly posterior to N-Perp)';
  } else if (mcnamara.pogonionToNasionPerpendicular > 1.5) {
    mandPos = 'Mandibular Prognathism (Pogonion anterior to N-Perp)';
  }

  let diffSignificance = 'Maxillo-Mandibular Differential is ' + diff.toFixed(1) + ' mm. ';
  if (diff < 20) {
    diffSignificance += 'Severe skeletal Class II pattern with deficient mandibular unit length relative to maxilla.';
  } else if (diff > 30) {
    diffSignificance += 'Skeletal Class III pattern with mandibular unit length disproportionately larger than maxilla.';
  } else {
    diffSignificance += 'Harmonious maxillomandibular skeletal unit proportions (Class I).';
  }

  const upperAirwayStatus = mcnamara.upperPharyngealAirwayWidth < 12 
    ? 'Constricted (Possible Adenoid Hypertrophy)' 
    : 'Adequate';
  const lowerAirwayStatus = mcnamara.lowerPharyngealAirwayWidth < 10 
    ? 'Constricted (Possible Glossoptosis / OSA Risk)' 
    : 'Adequate';

  let clinicalAirwayNote = 'Pharyngeal dimensions within normal anatomical limits.';
  if (upperAirwayStatus.includes('Constricted') || lowerAirwayStatus.includes('Constricted')) {
    clinicalAirwayNote = 'Constricted pharyngeal airway space detected. Screen for mouth breathing, daytime sleepiness, or sleep-disordered breathing. Expansion (RPE/MARPE) or mandibular advancement can widen the nasal and hypopharyngeal airway.';
  }

  let growthDirection: 'Horizontal / Hypodivergent' | 'Normodivergent' | 'Vertical / Hyperdivergent' = 'Normodivergent';
  if (tweed.fma < 20) {
    growthDirection = 'Horizontal / Hypodivergent';
  } else if (tweed.fma > 30) {
    growthDirection = 'Vertical / Hyperdivergent';
  }

  let incisorPosition = 'Upright / Stable';
  if (tweed.impa > 96) {
    incisorPosition = 'Proclined / Unstable (Risk of cortical bone dehiscence and gingival recession)';
  } else if (tweed.impa < 84) {
    incisorPosition = 'Retroclined';
  }

  const targetIMPA = tweed.fma > 30 ? 180 - 65 - tweed.fma : 90;

  return {
    mcnamara: {
      measurements: mcnamara,
      interpretations: {
        maxillarySkeletalPosition: maxPos,
        mandibularSkeletalPosition: mandPos,
        skeletalDiscrepancyClassification: diff < 20 ? 'Skeletal Class II' : diff > 30 ? 'Skeletal Class III' : 'Skeletal Class I',
        effectiveLengthDifferentialSignificance: diffSignificance,
        airwayAssessment: {
          upperAirwayStatus,
          lowerAirwayStatus,
          clinicalAirwayNote
        }
      }
    },
    tweedTriangle: {
      measurements: tweed,
      interpretation: {
        growthDirection,
        incisorPositionOnBasalBone: incisorPosition as any,
        targetIMPAToReachTweedNorm: targetIMPA
      }
    },
    evidenceCitation: 'McNamara JA Jr. A method of cephalometric evaluation. Am J Orthod. 1984;86(6):449-469. & Tweed CH. The Frankfort-mandibular incisor angle (FMIA) in orthodontic diagnosis, treatment planning and prognosis. Angle Orthod. 1954;24(3):121-169.'
  };
}
