/**
 * Anterior Open Bite & Molar Intrusion Biomechanics Module
 * 
 * Based on:
 * - Sugawara J, Baik UB, Umemori M, et al. Treatment and posttreatment dentoalveolar changes following intrusion of mandibular molars with application of a skeletal anchorage system (SAS) for open bite correction. Int J Adult Orthodon Orthognath Surg. 2002;17(4):243-253. (PMID: 12592994)
 * - Deguchi T, Kurosaka H, Oikawa H, et al. Comparison of orthodontic and orthopedic effects of open-bite treatment with mini-screws versus mini-plates. Am J Orthod Dentofacial Orthop. 2011;139(4 Suppl):S68-76. (PMID: 21435541)
 * - Sherwood KH, Burch JG, Thompson WJ. Closing anterior open bites by intruding molars with titanium miniplate anchorage--results in two adult patients. Am J Orthod Dentofacial Orthop. 2002;122(6):593-600. (PMID: 12490869)
 */

export interface OpenBiteInput {
  overbiteMm: number; // Negative value in open bite (e.g. -3.0mm)
  fmaDegrees: number; // Frankfort-Mandibular Plane Angle (norm 25°)
  anteriorLowerFacialHeightRatio: number; // ANS-Me / N-Me (norm 55%)
  patientAge: number;
  hasTongueThrustHabit: boolean;
  hasMouthBreathing: boolean;
  molarExtrusionSuspected: boolean;
}

export interface OpenBiteProtocolResult {
  etiology: 'Dental / Habitual Open Bite' | 'Skeletal Hyperdivergent Open Bite' | 'Combined Complex Skeletal-Habitual Open Bite';
  targetMolarIntrusionMm: number;
  predictedAnteriorClosureMm: number;
  predictedMandibularAutorotation: {
    degreesCounterClockwise: number;
    pogonionAdvancementMm: number;
    facialHeightReductionMm: number;
  };
  tadIntrusionMechanics: {
    maxillaryTadSites: string;
    palatalCounterbalancing: string;
    forceLevelsGrams: string;
    expectedIntrusionVelocity: string;
    buccalCrownFlaringPrevention: string;
  };
  habitInterception: {
    indicated: boolean;
    appliance: string;
    myofunctionalTherapy: string;
  };
  retentionAndRelapsePrevention: {
    protocol: string;
    relapseRiskRating: 'Moderate' | 'High' | 'Extremely High';
    nightlyAppliance: string;
  };
  citations: {
    citation: string;
    pmid?: string;
    doi?: string;
  }[];
}

/**
 * Calculates molar intrusion requirements, mandibular autorotation geometry, and TAD mechanics for open bites.
 */
export function calculateOpenBiteProtocol(input: OpenBiteInput): OpenBiteProtocolResult {
  const { overbiteMm, fmaDegrees, anteriorLowerFacialHeightRatio, patientAge, hasTongueThrustHabit, hasMouthBreathing } = input;

  const negativeOverbite = Math.abs(Math.min(0, overbiteMm));
  const isSkeletal = fmaDegrees > 28 || anteriorLowerFacialHeightRatio > 56;
  const isHabitual = hasTongueThrustHabit || hasMouthBreathing;

  let etiology: OpenBiteProtocolResult['etiology'] = 'Dental / Habitual Open Bite';
  if (isSkeletal && isHabitual) etiology = 'Combined Complex Skeletal-Habitual Open Bite';
  else if (isSkeletal) etiology = 'Skeletal Hyperdivergent Open Bite';

  // Biomechanical Autorotation Geometry:
  // 1.0 mm molar intrusion produces ~ 2.5 mm to 3.0 mm of anterior incisor bite closure (2.7:1 ratio)
  // Target overbite is +2.0 mm ideal. Total closure needed = negativeOverbite + 2.0 mm
  const totalClosureRequired = negativeOverbite + 2.0;
  const targetIntrusion = Math.round((totalClosureRequired / 2.7) * 10) / 10;

  // Mandibular counter-clockwise autorotation calculations
  const autorotationDegrees = Math.round((targetIntrusion * 1.3) * 10) / 10;
  const pogonionAdvancement = Math.round((targetIntrusion * 1.4) * 10) / 10;
  const facialHeightReduction = Math.round((targetIntrusion * 1.6) * 10) / 10;

  // TAD Intrusion Mechanics
  const tadMechanics = {
    maxillaryTadSites: '2x Buccal Interradicular TADs (1.6 x 8 mm) placed between maxillary 1st molar and 2nd premolar or 2nd molar, positioned 4-6mm apical to the mucogingival junction.',
    palatalCounterbalancing: 'Mandatory: 2x Paramedian Palatal TADs (2.0 x 9 mm) or a rigid Transpalatal Arch (TPA) with 5mm acrylic button/screw engagement. Single buccal traction causes uncontrollable buccal flaring of molar crowns and palatal cusp depression.',
    forceLevelsGrams: '150g to 200g per side (75-100g buccal + 75-100g palatal). Continuous light force prevents periodontal hyalinization and preserves root apices.',
    expectedIntrusionVelocity: '0.5 mm to 0.75 mm per month of genuine skeletal intrusion.',
    buccalCrownFlaringPrevention: 'True intrusive vector must pass through the center of resistance of the maxillary molar (near furcation). Bilateral buccal and lingual elastic power chains must be equally calibrated.'
  };

  // Habit Interception
  const habitInterception = {
    indicated: hasTongueThrustHabit || negativeOverbite > 3.0,
    appliance: patientAge <= 14 
      ? 'Bonded lingual tongue spurs / tongue crib attached to maxillary molars or bonded to lower incisors.'
      : 'Removable Hawley retainer with palatal tongue crib or Bluegrass habit roller.',
    myofunctionalTherapy: 'Referral for myofunctional speech pathology therapy: swallow pattern retraining (tip of tongue against incisive papilla) and lip seal training.'
  };

  // Retention & Relapse Prevention (Open bites exhibit highest relapse rates in orthodontics)
  const retentionProtocol = {
    protocol: 'Immediate post-intrusion retention requires posterior bite-blocks or vacuum-formed clear retainers with full posterior occlusal coverage to resist passive eruption forces.',
    relapseRiskRating: isSkeletal && hasTongueThrustHabit ? ('Extremely High' as const) : ('High' as const),
    nightlyAppliance: 'Essix vacuum-formed retainer with anterior tongue spurs or open bite positioner with light anterior vertical elastics for first 12 months.'
  };

  return {
    etiology,
    targetMolarIntrusionMm: targetIntrusion,
    predictedAnteriorClosureMm: totalClosureRequired,
    predictedMandibularAutorotation: {
      degreesCounterClockwise: autorotationDegrees,
      pogonionAdvancementMm: pogonionAdvancement,
      facialHeightReductionMm: facialHeightReduction
    },
    tadIntrusionMechanics: tadMechanics,
    habitInterception,
    retentionAndRelapsePrevention: retentionProtocol,
    citations: [
      {
        citation: 'Sugawara J, Baik UB, Umemori M, et al. Treatment and posttreatment dentoalveolar changes following intrusion of mandibular molars with application of a skeletal anchorage system (SAS) for open bite correction. Int J Adult Orthodon Orthognath Surg. 2002;17(4):243-253.',
        pmid: '12592994'
      },
      {
        citation: 'Deguchi T, Kurosaka H, Oikawa H, et al. Comparison of orthodontic and orthopedic effects of open-bite treatment with mini-screws versus mini-plates. Am J Orthod Dentofacial Orthop. 2011;139(4 Suppl):S68-76.',
        pmid: '21435541',
        doi: '10.1016/j.ajodo.2009.07.026'
      },
      {
        citation: 'Sherwood KH, Burch JG, Thompson WJ. Closing anterior open bites by intruding molars with titanium miniplate anchorage--results in two adult patients. Am J Orthod Dentofacial Orthop. 2002;122(6):593-600.',
        pmid: '12490869',
        doi: '10.1067/mod.2002.128646'
      }
    ]
  };
}
