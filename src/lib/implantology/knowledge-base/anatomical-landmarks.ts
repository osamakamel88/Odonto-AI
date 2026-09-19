export type JawRegion = 'anterior-maxilla' | 'premolar-maxilla' | 'molar-maxilla' | 'anterior-mandible' | 'premolar-mandible' | 'molar-mandible';

export interface AnatomicalLandmark {
  id: string;
  name: string;
  jaw: 'maxilla' | 'mandible';
  region: JawRegion;
  description: string;
  clinicalSignificance: string;
  safetyDistance: number;  // mm
  injuryConsequences: string[];
  identificationMethod: string[];
  fdiToothRange: string;
}

export interface SafetyZone {
  region: JawRegion;
  landmarks: string[];
  minBuccalBone: number;  // mm
  minLingualBone: number; // mm
  minInterimplantDistance: number; // mm
  minToothImplantDistance: number; // mm
  minApicalClearance: number; // mm
  maxDrillDepth: string;
  specialConsiderations: string[];
}

export const landmarks: Record<string, AnatomicalLandmark> = {
  'ian-canal': {
    id: 'ian-canal',
    name: 'Inferior Alveolar Nerve Canal',
    jaw: 'mandible',
    region: 'molar-mandible',
    description: 'Mandibular canal containing the inferior alveolar nerve, artery, and vein.',
    clinicalSignificance: 'Critical landmark in the posterior mandible. Determines maximum vertical depth of implant preparation.',
    safetyDistance: 2.0,
    injuryConsequences: ['Altered sensation (paresthesia/anesthesia) of lower lip and chin', 'Hemorrhage', 'Pain'],
    identificationMethod: ['CBCT cross-sectional view', 'Panoramic radiograph (less accurate)'],
    fdiToothRange: '35-38, 45-48'
  },
  'mental-foramen': {
    id: 'mental-foramen',
    name: 'Mental Foramen & Anterior Loop',
    jaw: 'mandible',
    region: 'premolar-mandible',
    description: 'Exit point of the mental nerve. May have an anterior loop that extends mesially before exiting.',
    clinicalSignificance: 'High risk area during implant placement in the premolar region. Anterior loop can extend 1-5mm anteriorly.',
    safetyDistance: 2.0, // Should be 2mm plus consideration for the loop
    injuryConsequences: ['Paresthesia of the lower lip/chin', 'Neuroma formation'],
    identificationMethod: ['CBCT continuous slices', 'Probe exploration if flap is raised'],
    fdiToothRange: '34-35, 44-45'
  },
  'sublingual-artery': {
    id: 'sublingual-artery',
    name: 'Sublingual Artery / Lingual Fossa',
    jaw: 'mandible',
    region: 'anterior-mandible',
    description: 'Artery running in the floor of the mouth, near the lingual cortex of the anterior mandible.',
    clinicalSignificance: 'Risk of lingual plate perforation. Lingual concavity is common.',
    safetyDistance: 2.0,
    injuryConsequences: ['Life-threatening hemorrhage', 'Airway compromise due to hematoma'],
    identificationMethod: ['CBCT cross-sectional', 'Careful digital palpation of lingual plate'],
    fdiToothRange: '33-43'
  },
  'maxillary-sinus': {
    id: 'maxillary-sinus',
    name: 'Maxillary Sinus Floor',
    jaw: 'maxilla',
    region: 'molar-maxilla',
    description: 'Pneumatized cavity in the posterior maxilla.',
    clinicalSignificance: 'Limits vertical bone height. Often requires sinus lift/grafting procedures.',
    safetyDistance: 1.0, // Often 1mm or purposeful penetration for grafting
    injuryConsequences: ['Sinus membrane perforation', 'Implant migration into sinus', 'Sinusitis'],
    identificationMethod: ['CBCT', 'Panoramic X-ray'],
    fdiToothRange: '14-18, 24-28'
  },
  'nasopalatine-canal': {
    id: 'nasopalatine-canal',
    name: 'Nasopalatine Canal / Incisive Foramen',
    jaw: 'maxilla',
    region: 'anterior-maxilla',
    description: 'Canal containing nasopalatine nerve and sphenopalatine artery. Diameter varies 2-5mm.',
    clinicalSignificance: 'Proximity when placing implants in central incisor positions (11, 21).',
    safetyDistance: 1.0,
    injuryConsequences: ['Hemorrhage', 'Transient loss of sensation in anterior palate', 'Non-integration if implant is in fibrous tissue'],
    identificationMethod: ['CBCT sagittal and axial views'],
    fdiToothRange: '11-21'
  }
};

export const safetyZones: Record<JawRegion, SafetyZone> = {
  'anterior-maxilla': {
    region: 'anterior-maxilla',
    landmarks: ['nasopalatine-canal', 'nasal-floor'],
    minBuccalBone: 1.5, // Often 2mm preferred for aesthetics
    minLingualBone: 1.0,
    minInterimplantDistance: 3.0,
    minToothImplantDistance: 1.5,
    minApicalClearance: 1.0,
    maxDrillDepth: 'Cortical engagement of nasal floor permitted if controlled',
    specialConsiderations: ['Aesthetic zone: buccal bone thickness is critical (>2mm preferred)', 'Trajectory must accommodate screw access']
  },
  'premolar-maxilla': {
    region: 'premolar-maxilla',
    landmarks: ['maxillary-sinus'],
    minBuccalBone: 1.0,
    minLingualBone: 1.0,
    minInterimplantDistance: 3.0,
    minToothImplantDistance: 1.5,
    minApicalClearance: 1.0,
    maxDrillDepth: 'Dependent on sinus floor proximity',
    specialConsiderations: ['Canine fossa concavity risk for buccal fenestration']
  },
  'molar-maxilla': {
    region: 'molar-maxilla',
    landmarks: ['maxillary-sinus', 'greater-palatine-artery'],
    minBuccalBone: 1.0,
    minLingualBone: 1.0,
    minInterimplantDistance: 3.0,
    minToothImplantDistance: 1.5,
    minApicalClearance: 1.0, // Or sinus lift
    maxDrillDepth: 'Must not perforate Schneiderian membrane without grafting',
    specialConsiderations: ['Poor bone quality (Type 3/4) common', 'Sinus lift may be required']
  },
  'anterior-mandible': {
    region: 'anterior-mandible',
    landmarks: ['sublingual-artery', 'genial-tubercles'],
    minBuccalBone: 1.0,
    minLingualBone: 1.5,
    minInterimplantDistance: 3.0,
    minToothImplantDistance: 1.5,
    minApicalClearance: 1.0,
    maxDrillDepth: 'Must stay clear of inferior border',
    specialConsiderations: ['Lingual concavity risk', 'Dense cortical bone (Type 1)']
  },
  'premolar-mandible': {
    region: 'premolar-mandible',
    landmarks: ['mental-foramen', 'ian-canal'],
    minBuccalBone: 1.0,
    minLingualBone: 1.0,
    minInterimplantDistance: 3.0,
    minToothImplantDistance: 1.5,
    minApicalClearance: 2.0, // from nerve
    maxDrillDepth: 'Strictly 2mm superior to IAN canal/anterior loop',
    specialConsiderations: ['Mental loop must be accounted for (add 2-5mm anteriorly to foramen)']
  },
  'molar-mandible': {
    region: 'molar-mandible',
    landmarks: ['ian-canal', 'submandibular-fossa'],
    minBuccalBone: 1.0,
    minLingualBone: 1.5,
    minInterimplantDistance: 3.0,
    minToothImplantDistance: 1.5,
    minApicalClearance: 2.0, // from nerve
    maxDrillDepth: 'Strictly 2mm superior to IAN canal',
    specialConsiderations: ['Submandibular fossa creates lingual undercut', 'High occlusal forces']
  }
};

/**
 * Returns the safety zone guidelines for a specific jaw region.
 */
export function getSafetyZone(region: JawRegion): SafetyZone {
  return safetyZones[region];
}

/**
 * Gets anatomical risks and warnings associated with a specific FDI tooth number.
 */
export function getAnatomicalRisks(fdiTooth: number): { landmarks: AnatomicalLandmark[]; warnings: string[] } {
  const toothStr = fdiTooth.toString();
  const relevantLandmarks: AnatomicalLandmark[] = [];
  const warnings: string[] = [];

  for (const key in landmarks) {
    const lm = landmarks[key];
    const rangeStr = lm.fdiToothRange;
    
    // Parse '35-38, 45-48' or '11-21' etc.
    const parts = rangeStr.split(',').map(s => s.trim());
    let matches = false;
    
    for (const part of parts) {
      if (part.includes('-')) {
        const [start, end] = part.split('-').map(Number);
        if (fdiTooth >= start && fdiTooth <= end) {
          matches = true;
          break;
        }
      } else if (Number(part) === fdiTooth) {
        matches = true;
        break;
      }
    }
    
    if (matches) {
      relevantLandmarks.push(lm);
      warnings.push(`Proximity to ${lm.name}. Maintain ${lm.safetyDistance}mm safety distance.`);
    }
  }

  // Base general warnings
  warnings.push('Ensure 1.5mm distance to adjacent roots.');
  warnings.push('Ensure 3mm distance between adjacent implants.');

  return { landmarks: relevantLandmarks, warnings };
}
