export type BoneDensity = 'D1' | 'D2' | 'D3' | 'D4';
export type LekholmZarbQuality = 'Type-I' | 'Type-II' | 'Type-III' | 'Type-IV';
export type LekholmZarbQuantity = 'A' | 'B' | 'C' | 'D' | 'E';
export type SeibertClass = 'Class-I' | 'Class-II' | 'Class-III';

export interface BoneDensityProfile {
  grade: BoneDensity;
  name: string;
  description: string;
  corticalThickness: string;
  trabecularDensity: string;
  hounsfieldUnits: { min: number; max: number };
  typicalLocations: string[];
  drillingProtocol: string;
  expectedISQ: { min: number; max: number };
  implantSurvivalRate: string;
  clinicalConsiderations: string[];
}

export const MISCH_BONE_DENSITY: Record<BoneDensity, BoneDensityProfile> = {
  'D1': {
    grade: 'D1',
    name: 'Dense Cortical',
    description: 'Dense cortical bone, similar to oak wood.',
    corticalThickness: '> 2mm',
    trabecularDensity: 'Dense, virtually no trabecular core',
    hounsfieldUnits: { min: 1250, max: 2000 },
    typicalLocations: ['Anterior mandible'],
    drillingProtocol: 'Extensive irrigation required. Slower drill speeds. Tapping of the osteotomy may be necessary. Drill to full length and full diameter.',
    expectedISQ: { min: 70, max: 85 },
    implantSurvivalRate: '97-99%',
    clinicalConsiderations: [
      'High risk of thermal necrosis during drilling.',
      'Excellent primary stability.',
      'Blood supply may be compromised due to lack of trabecular bone.',
      'Allow extra time for healing before loading if thermal damage is suspected.'
    ]
  },
  'D2': {
    grade: 'D2',
    name: 'Porous Cortical / Coarse Trabecular',
    description: 'Thick porous cortical bone on crest and coarse trabecular bone within, similar to pine wood.',
    corticalThickness: '1-2mm',
    trabecularDensity: 'Coarse trabecular bone',
    hounsfieldUnits: { min: 850, max: 1250 },
    typicalLocations: ['Anterior mandible', 'Posterior mandible', 'Anterior maxilla'],
    drillingProtocol: 'Standard protocol. Good tactile feedback during drilling.',
    expectedISQ: { min: 65, max: 80 },
    implantSurvivalRate: '96-98%',
    clinicalConsiderations: [
      'Ideal bone type for implant placement.',
      'Excellent blood supply.',
      'Predictable primary stability suitable for immediate loading.'
    ]
  },
  'D3': {
    grade: 'D3',
    name: 'Porous Cortical / Fine Trabecular',
    description: 'Thin porous cortical bone on crest and fine trabecular bone within, similar to balsa wood.',
    corticalThickness: '0.5-1mm',
    trabecularDensity: 'Fine trabecular bone',
    hounsfieldUnits: { min: 350, max: 850 },
    typicalLocations: ['Anterior maxilla', 'Posterior maxilla', 'Posterior mandible'],
    drillingProtocol: 'Undersized osteotomy preparation recommended. Consider osteotomes instead of drills.',
    expectedISQ: { min: 55, max: 70 },
    implantSurvivalRate: '90-95%',
    clinicalConsiderations: [
      'Primary stability relies on engaging the thin cortical plates.',
      'Avoid countersinking.',
      'Longer healing time recommended (4-6 months).'
    ]
  },
  'D4': {
    grade: 'D4',
    name: 'Fine Trabecular',
    description: 'Fine trabecular bone with very thin or no cortical crest, similar to styrofoam.',
    corticalThickness: '< 0.5mm',
    trabecularDensity: 'Sparse, loose fine trabecular bone',
    hounsfieldUnits: { min: 150, max: 350 },
    typicalLocations: ['Posterior maxilla'],
    drillingProtocol: 'Drill only the pilot hole. Use osteotomes to condense bone. Undersize the final osteotomy significantly.',
    expectedISQ: { min: 40, max: 60 },
    implantSurvivalRate: '85-90%',
    clinicalConsiderations: [
      'Very difficult to achieve primary stability.',
      'High risk of implant displacement into the sinus.',
      'Consider using tapered or specialized thread designs.',
      'Delayed loading is mandatory (6+ months).'
    ]
  }
};

export const LEKHOLM_ZARB_QUALITY: Record<LekholmZarbQuality, string> = {
  'Type-I': 'Homogeneous compact bone forming the entire jaw.',
  'Type-II': 'A thick layer of compact bone surrounds a core of dense trabecular bone.',
  'Type-III': 'A thin layer of cortical bone surrounds a core of dense trabecular bone.',
  'Type-IV': 'A thin layer of cortical bone surrounds a core of low density trabecular bone.'
};

export const LEKHOLM_ZARB_QUANTITY: Record<LekholmZarbQuantity, string> = {
  'A': 'Most of the alveolar ridge is present.',
  'B': 'Moderate ridge resorption has occurred.',
  'C': 'Advanced ridge resorption has occurred and only basal bone remains.',
  'D': 'Some resorption of the basal bone has taken place.',
  'E': 'Extreme resorption of the basal bone has taken place.'
};

export const SEIBERT_CLASSIFICATION: Record<SeibertClass, { description: string, treatment: string }> = {
  'Class-I': {
    description: 'Buccolingual loss of tissue width with normal ridge height.',
    treatment: 'Horizontal bone augmentation (e.g., GBR with particulate graft and membrane, block graft, or ridge splitting).'
  },
  'Class-II': {
    description: 'Apicocoronal loss of tissue height with normal ridge width.',
    treatment: 'Vertical bone augmentation (e.g., GBR with titanium-reinforced membrane, distraction osteogenesis, or block graft).'
  },
  'Class-III': {
    description: 'Combination of buccolingual and apicocoronal loss of tissue (width and height).',
    treatment: 'Combined 3D bone augmentation. Often requires staged approach with block grafts, extensive GBR, or complex regenerative procedures.'
  }
};

export interface RegionRequirements {
  minWidth: number;
  minHeight: number;
  safetyMargin: number;
  notes: string[];
}

export const REGION_REQUIREMENTS: Record<string, RegionRequirements> = {
  'anterior-max': {
    minWidth: 6.0,
    minHeight: 10.0,
    safetyMargin: 2.0,
    notes: ['Ensure minimum 2mm buccal bone for esthetics.', 'Consider nasopalatine canal proximity.']
  },
  'posterior-max': {
    minWidth: 7.0,
    minHeight: 8.0,
    safetyMargin: 1.0,
    notes: ['Sinus floor is the primary limiting factor.', 'Sinus lift may be required if height < 8mm.']
  },
  'anterior-mand': {
    minWidth: 5.5,
    minHeight: 10.0,
    safetyMargin: 2.0,
    notes: ['Lingual concavity risk.', 'Mental foramen loop (anterior loop) must be identified.']
  },
  'posterior-mand': {
    minWidth: 7.0,
    minHeight: 10.0,
    safetyMargin: 2.0,
    notes: ['Inferior alveolar nerve (IAN) clearance is critical.', 'Minimum 2mm safety margin from IAN recommended.']
  }
};

/**
 * Assesses bone density profile based on Hounsfield Units (HU).
 */
export function assessBoneDensity(hounsfieldUnits: number): BoneDensityProfile {
  if (hounsfieldUnits >= 1250) return MISCH_BONE_DENSITY['D1'];
  if (hounsfieldUnits >= 850) return MISCH_BONE_DENSITY['D2'];
  if (hounsfieldUnits >= 350) return MISCH_BONE_DENSITY['D3'];
  return MISCH_BONE_DENSITY['D4'];
}

/**
 * Gets minimum bone dimension requirements for a specific region.
 */
export function getMinBoneRequirements(
  region: 'anterior-max' | 'posterior-max' | 'anterior-mand' | 'posterior-mand'
): RegionRequirements {
  return REGION_REQUIREMENTS[region];
}
