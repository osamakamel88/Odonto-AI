/**
 * Class III Skeletal Protraction: Alt-RAMEC & BAMP Protocol Engine
 * 
 * Based on:
 * - Liou EJ, Tsai WC. A new protocol for maxillary protraction in cleft, and non-cleft patients: repetitive weekly protocol of alternate rapid maxillary expansions and constrictions. Cleft Palate Craniofac J. 2005;42(2):121-127. (PMID: 15748139)
 * - De Clerck HJ, Cornelis MA, Cevidanes LH, et al. Orthopedic traction of the maxilla with miniplates: a new approach for treatment of midfacial hypoplasia. J Oral Maxillofac Surg. 2009;67(10):2123-2129. (PMID: 19761904)
 * - Baccetti T, Franchi L, McNamara JA. Treatment and posttreatment effects of facemask therapy on Class III malocclusion. Am J Orthod Dentofacial Orthop. 2000;117(2):200-209. (PMID: 10672803)
 */

export interface ProtractionInput {
  patientAge: number;
  cvmStage?: string; // 'CS1' through 'CS6'
  anbDegrees: number; // typically negative in Class III (e.g. -2° to -6°)
  witsAppraisalMm: number; // e.g. -4mm to -8mm
  maxillaryHypoplasia: boolean;
  mandibularPrognathism: boolean;
  upperIncisorProclinationDegrees?: number; // U1-SN (norm 102°)
}

export interface ProtractionProtocolResult {
  orthopedicStrategy: 'Early Interceptive Facemask (Petit)' | 'Alt-RAMEC + Facemask Protocol (Liou)' | 'Bone-Anchored Maxillary Protraction (BAMP - De Clerck)' | 'Orthognathic Surgical Pathway (Le Fort I +/- BSSO)';
  timingCategory: 'Ideal Skeletal Timing' | 'Transitional Window' | 'Late Growth / Compromised Skeletal Response' | 'Post-Skeletal Growth (Surgical)';
  protocolDetails: {
    applianceSetup: string;
    activationRegimen: string;
    elasticForceVectors: string;
    wearSchedule: string;
    expectedPointAAdvancementMm: string;
    incisorCompensationRisk: string;
  };
  circummaxillarySutureDisarticulation: {
    targetSutures: string[];
    biologicalMechanism: string;
  };
  contraindications: string[];
  citations: {
    citation: string;
    pmid?: string;
    doi?: string;
  }[];
}

/**
 * Calculates optimal Class III orthopedic protraction protocol based on skeletal maturity.
 */
export function calculateProtractionProtocol(input: ProtractionInput): ProtractionProtocolResult {
  const { patientAge, cvmStage, anbDegrees, witsAppraisalMm, maxillaryHypoplasia, mandibularPrognathism, upperIncisorProclinationDegrees = 104 } = input;

  const isSevere = anbDegrees <= -4 || witsAppraisalMm <= -6;
  const isUpperIncisorAlreadyProclined = upperIncisorProclinationDegrees > 110;

  let strategy: ProtractionProtocolResult['orthopedicStrategy'] = 'Alt-RAMEC + Facemask Protocol (Liou)';
  let timing: ProtractionProtocolResult['timingCategory'] = 'Ideal Skeletal Timing';

  if (patientAge > 15 || cvmStage === 'CS5' || cvmStage === 'CS6') {
    strategy = 'Orthognathic Surgical Pathway (Le Fort I +/- BSSO)';
    timing = 'Post-Skeletal Growth (Surgical)';
  } else if (patientAge >= 11 && patientAge <= 14) {
    // BAMP is ideal for late mixed/early permanent dentition with upper incisors already proclined
    strategy = isUpperIncisorAlreadyProclined || isSevere 
      ? 'Bone-Anchored Maxillary Protraction (BAMP - De Clerck)' 
      : 'Alt-RAMEC + Facemask Protocol (Liou)';
    timing = 'Transitional Window';
  } else if (patientAge >= 9 && patientAge <= 11) {
    strategy = 'Alt-RAMEC + Facemask Protocol (Liou)';
    timing = 'Ideal Skeletal Timing';
  } else {
    // Young children < 9 years
    strategy = 'Early Interceptive Facemask (Petit)';
    timing = 'Ideal Skeletal Timing';
  }

  // Strategy specific details
  let applianceSetup = '';
  let activationRegimen = '';
  let elasticForceVectors = '';
  let wearSchedule = '';
  let expectedPointA = '';
  let incisorRisk = '';

  if (strategy === 'Alt-RAMEC + Facemask Protocol (Liou)') {
    applianceSetup = 'Double-hinged bonded or banded maxillary expander with anterior protraction hooks soldered adjacent to primary canines/first premolars.';
    activationRegimen = 'Cyclic Alt-RAMEC: Week 1 Expansion (1 mm/day: 2 turns morning, 2 turns evening), Week 2 Constriction (1 mm/day: 4 turns reverse). Repeat cycle for 7 to 9 weeks total.';
    elasticForceVectors = 'Extraoral elastics: 400g to 500g per side directed 20°–30° downward and forward from the occlusal plane to pull through the maxillary center of resistance.';
    wearSchedule = '14–16 hours/day (nighttime wear plus late afternoons). Continuous until 2–3mm positive overjet overcorrection is achieved.';
    expectedPointA = '+4.0 mm to +5.8 mm forward displacement of Point A (double that of traditional single-course RPE).';
    incisorRisk = 'Moderate maxillary incisor proclination (~2°–4°); minimal counteracted by bodily skeletal pull.';
  } else if (strategy === 'Bone-Anchored Maxillary Protraction (BAMP - De Clerck)') {
    applianceSetup = '4 Bollard titanium miniplates: 2 placed on the infrazygomatic crests of the maxilla and 2 placed in the anterior mandible parasymphyseal region between canine and lateral incisor roots.';
    activationRegimen = 'Immediate loading with light elastics (100g/side) for 1 month, then increased to orthopedic force.';
    elasticForceVectors = 'Intermaxillary Class III elastics: 150g per side initial, increased to 250g per side after 1 month. Directly connecting maxillary to mandibular miniplates.';
    wearSchedule = '24 hours/day (elastics changed once daily, removed only during meals). Protocol duration 12–18 months.';
    expectedPointA = '+2.5 mm to +4.0 mm maxillary advancement with simultaneous restraint of mandibular forward translation.';
    incisorRisk = 'Zero dental compensation: No upper incisor proclination, no lower incisor retroclination. 100% pure skeletal orthopedic vector.';
  } else if (strategy === 'Early Interceptive Facemask (Petit)') {
    applianceSetup = 'Bonded occlusal acrylic splint expander (Haas-type) with protraction hooks at maxillary canines.';
    activationRegimen = '1-2 weeks of Hyrax expansion (0.5 mm/day) to initiate suture release, then immediate transition to facemask traction.';
    elasticForceVectors = '350g to 450g per side downward and forward (30° to occlusal plane).';
    wearSchedule = '14 hours/day for 6 to 9 months until 2mm positive overjet is established.';
    expectedPointA = '+2.0 mm to +3.0 mm skeletal advancement of maxilla.';
    incisorRisk = 'Mild to moderate incisor proclination (+3° to +5° U1-SN).';
  } else {
    // Surgical
    applianceSetup = 'Presurgical orthodontic decompensation with 0.022" MBT fixed appliances (procline lower incisors, retrocline upper incisors to true skeletal discrepancy).';
    activationRegimen = 'Rigid 0.019" x 0.025" Stainless Steel archwires with surgical brass hooks soldered prior to Le Fort I osteotomy.';
    elasticForceVectors = 'Intermaxillary fixation / guiding elastics post-surgery.';
    wearSchedule = 'Presurgical orthodontics: 12-18 months. Surgery followed by 4-6 months finishing.';
    expectedPointA = 'Surgical maxilla advancement: +4.0 mm to +8.0 mm via Le Fort I osteotomy, plus mandibular setback if needed.';
    incisorRisk = 'N/A (Decompensation deliberately eliminates dental camouflage to maximize surgical skeletal change).';
  }

  return {
    orthopedicStrategy: strategy,
    timingCategory: timing,
    protocolDetails: {
      applianceSetup,
      activationRegimen,
      elasticForceVectors,
      wearSchedule,
      expectedPointAAdvancementMm: expectedPointA,
      incisorCompensationRisk: incisorRisk
    },
    circummaxillarySutureDisarticulation: {
      targetSutures: [
        'Zygomaticomaxillary suture',
        'Zygomaticotemporal suture',
        'Zygomaticofrontal suture',
        'Pterygopalatine suture',
        'Frontomaxillary suture',
        'Nasomaxillary suture'
      ],
      biologicalMechanism: 'Repetitive alternating expansion and constriction micro-fractures the interdigitating bony spicules of the circummaxillary sutural network, stimulating osteoblast recruitment and enabling significant forward translation of the nasomaxillary complex.'
    },
    contraindications: [
      'Chronological age > 15 years with fused circummaxillary sutures (skeletal effect negligible)',
      'Severe hyperdivergent skeletal pattern with anterior open bite (standard facemask causes clockwise mandibular rotation and bite opening unless TAD-anchored)',
      'Severe vertical maxillary excess'
    ],
    citations: [
      {
        citation: 'Liou EJ, Tsai WC. A new protocol for maxillary protraction in cleft, and non-cleft patients: repetitive weekly protocol of alternate rapid maxillary expansions and constrictions. Cleft Palate Craniofac J. 2005;42(2):121-127.',
        pmid: '15748139',
        doi: '10.1597/03-143.1'
      },
      {
        citation: 'De Clerck HJ, Cornelis MA, Cevidanes LH, et al. Orthopedic traction of the maxilla with miniplates: a new approach for treatment of midfacial hypoplasia. J Oral Maxillofac Surg. 2009;67(10):2123-2129.',
        pmid: '19761904',
        doi: '10.1016/j.joms.2009.04.071'
      },
      {
        citation: 'Baccetti T, Franchi L, McNamara JA. Treatment and posttreatment effects of facemask therapy on Class III malocclusion. Am J Orthod Dentofacial Orthop. 2000;117(2):200-209.',
        pmid: '10672803',
        doi: '10.1016/S0889-5406(00)70232-1'
      }
    ]
  };
}
