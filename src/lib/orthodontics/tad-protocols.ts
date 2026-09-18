/**
 * Temporary Anchorage Devices (TADs / Mini-screws) Protocol Engine
 * Based on Ravindra Nanda, Flavio Uribe, and Chris Chang (IAOI)
 * 
 * Provides anatomical safe zones, cortical bone density benchmarks, 
 * screw dimension selection, insertion angulation, and biomechanical vector planning.
 */

export type TADAnatomicalSite = 'IZC' | 'BUCCAL_SHELF' | 'PARAMEDIAN_PALATE' | 'INTERRADICULAR_MAX' | 'INTERRADICULAR_MAND' | 'RETROMOLAR';

export interface TADSpecification {
  site: TADAnatomicalSite;
  name: string;
  diameterMm: number;
  lengthMm: number;
  material: 'Titanium Grade 5 (Ti-6Al-4V)' | 'Stainless Steel';
  insertionAngleDegrees: string;
  anatomicalLandmarks: string;
  corticalBoneThickness: string;
  primaryBiomechanicalIndications: string[];
  safeZoneDepthLimits: string;
  insertionTorqueLimitNcm: string;
  immediateLoadingProtocol: string;
  complicationPrecautions: string;
}

export const TAD_SITE_PROTOCOLS: Record<TADAnatomicalSite, TADSpecification> = {
  IZC: {
    site: 'IZC',
    name: 'Infrazygomatic Crest (IZC)',
    diameterMm: 2.0,
    lengthMm: 12,
    material: 'Stainless Steel',
    insertionAngleDegrees: '45 to 60 degrees to the occlusal plane (directed apically and obliquely)',
    anatomicalLandmarks: 'Buccal alveolar process at the junction of the maxilla and zygomatic process, above maxillary 1st and 2nd molars, 2 mm above mucogingival junction',
    corticalBoneThickness: '1.5 to 2.5 mm of high-density cortical bone',
    primaryBiomechanicalIndications: [
      'Full arch maxillary distalization (Class II correction without premolar extractions)',
      'Intrusion of extruded maxillary molars (anterior open bite closure)',
      'Correction of severe gummy smile via whole maxillary arch intrusion',
      'Maxillary anterior en-masse retraction with absolute anchorage'
    ],
    safeZoneDepthLimits: 'Bone depth: 6 to 10 mm outside tooth roots. Zero risk of root contact when placed extra-alveolarly in buccal vestibule.',
    insertionTorqueLimitNcm: '15 to 20 N·cm (Avoid exceeding 25 N·cm to prevent screw fracture)',
    immediateLoadingProtocol: 'Immediate direct loading with 200 to 300 g force (NiTi closed coil springs or power chain).',
    complicationPrecautions: 'Ensure screw penetrates both buccal cortical plates of the sinus wall for bicortical stability. Maintain oral hygiene to avoid mucosal overgrowth.'
  },
  BUCCAL_SHELF: {
    site: 'BUCCAL_SHELF',
    name: 'Mandibular Buccal Shelf (MBS)',
    diameterMm: 2.0,
    lengthMm: 10,
    material: 'Stainless Steel',
    insertionAngleDegrees: '90 degrees (perpendicular) to buccal bone plate or angled 60 degrees downward',
    anatomicalLandmarks: 'Buccal bone ledge lateral to mandibular 2nd molar, external oblique ridge, 4 to 6 mm apical to gingival margin',
    corticalBoneThickness: '3.0 to 4.5 mm (Thickest cortical bone in the human oral cavity)',
    primaryBiomechanicalIndications: [
      'Full mandibular arch distalization (Class III non-surgical camouflage)',
      'Lower incisor retraction in severe anterior crossbite',
      'Correction of mandibular midline deviation'
    ],
    safeZoneDepthLimits: 'Extra-alveolar placement lateral to the molar roots. Complete safety margin from inferior alveolar nerve and molar roots.',
    insertionTorqueLimitNcm: '18 to 22 N·cm',
    immediateLoadingProtocol: 'Immediate direct loading with 250 to 350 g force.',
    complicationPrecautions: 'Use self-drilling screw. High cortical resistance may cause binding; back out 1/4 turn if torque exceeds 25 N·cm.'
  },
  PARAMEDIAN_PALATE: {
    site: 'PARAMEDIAN_PALATE',
    name: 'Paramedian Palate (T-Zone)',
    diameterMm: 2.0,
    lengthMm: 9,
    material: 'Titanium Grade 5 (Ti-6Al-4V)',
    insertionAngleDegrees: '70 to 90 degrees to palatal vault',
    anatomicalLandmarks: '2 to 3 mm lateral to the midpalatal suture, posterior to the 3rd palatal rugae (behind incisive foramen)',
    corticalBoneThickness: '2.5 to 4.0 mm, exceptional trabecular quality',
    primaryBiomechanicalIndications: [
      'Micro-implant Assisted Rapid Palatal Expansion (MARPE / MSE)',
      'Hybrid Hyrax bone-borne expander anchorage in late adolescents (CS4–CS5)',
      'Maxillary molar intrusion and molar distalization (Pendulum/Beneslider)'
    ],
    safeZoneDepthLimits: 'No tooth roots present in the midline/paramedian vault. Safe depth up to 10 mm without nasal floor perforation concerns.',
    insertionTorqueLimitNcm: '15 to 20 N·cm',
    immediateLoadingProtocol: 'Immediate activation with expansion jackscrew (1 to 2 turns per day).',
    complicationPrecautions: 'Thorough chlorhexidine irrigation prior to insertion. Palatal mucosa is kerantinized and resistant to inflammation.'
  },
  INTERRADICULAR_MAX: {
    site: 'INTERRADICULAR_MAX',
    name: 'Maxillary Interradicular (Between 2nd Premolar & 1st Molar)',
    diameterMm: 1.4,
    lengthMm: 8,
    material: 'Titanium Grade 5 (Ti-6Al-4V)',
    insertionAngleDegrees: '30 to 45 degrees to long axis of roots to maximize bone contact and avoid root collision',
    anatomicalLandmarks: 'Attached gingiva 3 to 4 mm apical to the alveolar crest between roots',
    corticalBoneThickness: '1.0 to 1.5 mm',
    primaryBiomechanicalIndications: [
      'Anterior segment retraction in premolar extraction cases (Maximum/Absolute anchorage)',
      'Canine retraction into extraction space',
      'Intrusion of anterior teeth'
    ],
    safeZoneDepthLimits: 'Root clearance must exceed 1.0 mm on each side. Pre-placement periapical X-ray mandatory.',
    insertionTorqueLimitNcm: '8 to 12 N·cm (Delicate sites; do not exceed 15 N·cm)',
    immediateLoadingProtocol: 'Immediate light loading (100 to 150 g).',
    complicationPrecautions: 'If patient feels sharp radicular sensation during insertion, immediately stop and reverse screw (root proximity).'
  },
  INTERRADICULAR_MAND: {
    site: 'INTERRADICULAR_MAND',
    name: 'Mandibular Interradicular (Between 1st & 2nd Premolars)',
    diameterMm: 1.6,
    lengthMm: 8,
    material: 'Titanium Grade 5 (Ti-6Al-4V)',
    insertionAngleDegrees: '45 to 60 degrees obliquely',
    anatomicalLandmarks: 'Attached gingiva between roots, well superior to mental foramen',
    corticalBoneThickness: '1.5 to 2.0 mm',
    primaryBiomechanicalIndications: [
      'Lower molar mesialization or uprighting',
      'Anterior segment retraction in lower extraction cases',
      'Lower arch intrusion'
    ],
    safeZoneDepthLimits: 'Ensure insertion point is at least 3 mm coronal to the mental foramen (between lower 1st and 2nd premolars).',
    insertionTorqueLimitNcm: '10 to 14 N·cm',
    immediateLoadingProtocol: 'Immediate loading with 150 g force.',
    complicationPrecautions: 'Identify mental foramen on panoramic OPG before pilot insertion.'
  },
  RETROMOLAR: {
    site: 'RETROMOLAR',
    name: 'Mandibular Retromolar Fossa',
    diameterMm: 2.0,
    lengthMm: 10,
    material: 'Stainless Steel',
    insertionAngleDegrees: '70 degrees to occlusal plane',
    anatomicalLandmarks: 'Retromolar triangle/pad behind mandibular 2nd or 3rd molar',
    corticalBoneThickness: '2.0 to 3.0 mm',
    primaryBiomechanicalIndications: [
      'Direct lower molar uprighting and distal tipping',
      'Mandibular canine/incisor retraction with cantilevers'
    ],
    safeZoneDepthLimits: 'Stay medial to the external oblique ridge and superior to the mandibular canal.',
    insertionTorqueLimitNcm: '15 to 18 N·cm',
    immediateLoadingProtocol: 'Direct cantilever traction (75 to 100 g).',
    complicationPrecautions: 'High mobility of retromolar soft tissue; chlorhexidine gel recommended to prevent tissue impingement.'
  }
};

export function selectOptimalTAD(indication: 'class2_distalization' | 'class3_retraction' | 'marpe_expansion' | 'extraction_anchorage' | 'molar_intrusion'): TADSpecification {
  switch (indication) {
    case 'class2_distalization':
      return TAD_SITE_PROTOCOLS.IZC;
    case 'class3_retraction':
      return TAD_SITE_PROTOCOLS.BUCCAL_SHELF;
    case 'marpe_expansion':
      return TAD_SITE_PROTOCOLS.PARAMEDIAN_PALATE;
    case 'extraction_anchorage':
      return TAD_SITE_PROTOCOLS.INTERRADICULAR_MAX;
    case 'molar_intrusion':
      return TAD_SITE_PROTOCOLS.IZC;
    default:
      return TAD_SITE_PROTOCOLS.IZC;
  }
}
