export type FlapDesign = 'mid-crestal' | 'papilla-sparing' | 'flapless' | 'envelope' | 'trapezoidal';
export type GraftMaterial = 'autograft' | 'allograft-FDBA' | 'allograft-DFDBA' | 'xenograft-BioOss' | 'alloplast-TCP' | 'alloplast-HA' | 'composite';
export type MembraneType = 'resorbable-collagen' | 'non-resorbable-dPTFE' | 'non-resorbable-ePTFE' | 'titanium-reinforced' | 'PRF-membrane';

/**
 * Represents a sequence of drilling steps for a specific bone density.
 */
export interface DrillingSequence {
  boneDensity: string;
  steps: { drill: string; diameter: string; speed: string; irrigation: string; notes: string }[];
  totalEstimatedTime: string;
  specialConsiderations: string[];
}

/**
 * Protocol for sinus lift procedures (OSFE or lateral window).
 */
export interface SinusLiftProtocol {
  id: string;
  name: string;
  technique: 'lateral-window' | 'crestal-OSFE' | 'balloon-lift';
  indications: string[];
  contraindications: string[];
  minResidualBoneHeight: string;
  expectedGainedHeight: string;
  graftMaterials: string[];
  membraneUse: string;
  healingTime: string;
  implantPlacementTiming: 'simultaneous' | 'staged';
  complications: string[];
  successRate: string;
  stepByStep: string[];
}

/**
 * Guided Bone Regeneration (GBR) protocol.
 */
export interface GBRProtocol {
  id: string;
  name: string;
  indication: string;
  graftMaterial: GraftMaterial;
  membrane: MembraneType;
  fixation: string;
  healingPeriod: string;
  simultaneousImplant: boolean;
  expectedBoneGain: string;
  stepByStep: string[];
}

/**
 * Immediate implant placement protocols based on Elian classification.
 */
export interface ImmediatePlacementProtocol {
  socketType: 'Type-1' | 'Type-2' | 'Type-3';  // Elian classification
  description: string;
  buccalBoneStatus: string;
  softTissueStatus: string;
  gapManagement: string;
  graftingRequired: boolean;
  provisionalProtocol: string;
  prognosis: string;
}

export const drillingSequences: Record<string, DrillingSequence> = {
  D1: {
    boneDensity: 'D1',
    steps: [
      { drill: 'Round bur', diameter: '1.8mm', speed: '1200 rpm', irrigation: 'profuse', notes: 'Cortical marking' },
      { drill: 'Pilot drill', diameter: '2.0mm', speed: '1200 rpm', irrigation: 'profuse', notes: 'Full depth' },
      { drill: 'Twist drill', diameter: '2.8mm', speed: '800-1000 rpm', irrigation: 'profuse', notes: 'Full depth' },
      { drill: 'Twist drill', diameter: '3.2mm', speed: '800 rpm', irrigation: 'profuse', notes: 'Full depth' },
      { drill: 'Cortical tap/countersink', diameter: 'system specific', speed: '30 rpm', irrigation: 'yes', notes: 'Required for D1 to prevent pressure necrosis' }
    ],
    totalEstimatedTime: '10-15 mins',
    specialConsiderations: ['High risk of overheating bone', 'Profuse cooling essential', 'Do not force insertion torque > 50Ncm']
  },
  D2: {
    boneDensity: 'D2',
    steps: [
      { drill: 'Round bur', diameter: '1.8mm', speed: '1200 rpm', irrigation: 'profuse', notes: 'Cortical marking' },
      { drill: 'Pilot drill', diameter: '2.0mm', speed: '1200 rpm', irrigation: 'profuse', notes: 'Full depth' },
      { drill: 'Twist drill', diameter: '2.8mm', speed: '800 rpm', irrigation: 'profuse', notes: 'Full depth' },
      { drill: 'Twist drill', diameter: '3.2mm', speed: '800 rpm', irrigation: 'profuse', notes: 'Full depth, depending on implant size' }
    ],
    totalEstimatedTime: '10 mins',
    specialConsiderations: ['Standard preparation protocol', 'Excellent primary stability expected']
  },
  D3: {
    boneDensity: 'D3',
    steps: [
      { drill: 'Round bur', diameter: '1.8mm', speed: '1200 rpm', irrigation: 'yes', notes: 'Cortical marking' },
      { drill: 'Pilot drill', diameter: '2.0mm', speed: '1000 rpm', irrigation: 'yes', notes: 'Full depth' },
      { drill: 'Twist drill', diameter: '2.5-2.8mm', speed: '800 rpm', irrigation: 'yes', notes: 'Under-preparation to enhance primary stability' }
    ],
    totalEstimatedTime: '8 mins',
    specialConsiderations: ['Under-preparation is key', 'Consider osteotomes instead of final drills']
  },
  D4: {
    boneDensity: 'D4',
    steps: [
      { drill: 'Pilot drill', diameter: '2.0mm', speed: '800 rpm', irrigation: 'yes', notes: 'Cortical penetration only' },
      { drill: 'Osteotome', diameter: '2.5mm', speed: 'manual', irrigation: 'none', notes: 'Bone compression, no drilling' },
      { drill: 'Osteotome', diameter: '3.0mm', speed: 'manual', irrigation: 'none', notes: 'Bone compression to final depth' }
    ],
    totalEstimatedTime: '10 mins',
    specialConsiderations: ['Avoid all drills after pilot if possible', 'Osseodensification highly recommended', 'Risk of implant displacement into sinus or nasal floor']
  }
};

export const flapDesigns: Record<FlapDesign, any> = {
  'mid-crestal': {
    indications: ['Standard implant placement', 'Sufficient keratinized tissue present'],
    description: 'Incision exactly in the middle of the edentulous crest',
    advantages: ['Easy access', 'Symmetrical flap reflection'],
    disadvantages: ['May position scar over the implant', 'Requires sufficient attached gingiva']
  },
  'papilla-sparing': {
    indications: ['Esthetic zone', 'Multiple adjacent implants'],
    description: 'Incision leaves at least 2mm of adjacent papillae intact',
    advantages: ['Preserves papillae height', 'Excellent esthetics'],
    disadvantages: ['Technically demanding', 'Limited access for bone grafting']
  },
  'flapless': {
    indications: ['Excellent bone volume', 'Wide zone of keratinized tissue', 'Guided surgery'],
    description: 'Tissue punch or minimal crestal slit without flap reflection',
    advantages: ['Minimal pain', 'No suturing', 'Preserves blood supply'],
    disadvantages: ['Blind procedure without guides', 'Cannot perform simultaneous bone grafting']
  },
  'envelope': {
    indications: ['Single implant', 'No vertical release needed'],
    description: 'Sulcular incisions on adjacent teeth connecting a crestal incision',
    advantages: ['No vertical scarring', 'Maintains blood supply'],
    disadvantages: ['High tissue tension during reflection', 'Limited apical access']
  },
  'trapezoidal': {
    indications: ['Extensive bone grafting', 'Multiple implants'],
    description: 'Crestal/sulcular incision with two divergent vertical releasing incisions',
    advantages: ['Excellent access and visibility', 'Tension-free closure possible for grafting'],
    disadvantages: ['Risk of scarring', 'Compromised blood supply if base is too narrow']
  }
};

export const sinusLiftProtocols: SinusLiftProtocol[] = [
  {
    id: 'lateral-window',
    name: 'Lateral Window Technique (Caldwell-Luc modified)',
    technique: 'lateral-window',
    indications: ['Residual bone height < 4mm', 'Multiple implants in posterior maxilla'],
    contraindications: ['Acute sinusitis', 'Severe allergic rhinitis', 'Previous sinus surgery (relative)'],
    minResidualBoneHeight: '< 4mm',
    expectedGainedHeight: '5-12mm',
    graftMaterials: ['xenograft-BioOss', 'allograft-FDBA', 'composite'],
    membraneUse: 'Recommended over the lateral window',
    healingTime: '6-9 months',
    implantPlacementTiming: 'staged',
    complications: ['Schneiderian membrane perforation', 'Infection', 'Bleeding'],
    successRate: '95%',
    stepByStep: [
      'Full thickness mucoperiosteal flap reflection',
      'Preparation of lateral bony window',
      'Careful elevation of Schneiderian membrane',
      'Placement of graft material into the created space',
      'Placement of resorbable membrane over the window',
      'Primary closure'
    ]
  },
  {
    id: 'crestal-osfe',
    name: 'Crestal Approach (Summers technique OSFE)',
    technique: 'crestal-OSFE',
    indications: ['Residual bone height 4-6mm', 'Single implant site', 'Flat sinus floor'],
    contraindications: ['Irregular sinus floor', 'Septa present', 'Acute sinus infection'],
    minResidualBoneHeight: '4-6mm',
    expectedGainedHeight: '2-4mm',
    graftMaterials: ['xenograft-BioOss', 'alloplast-TCP', 'none (tenting only)'],
    membraneUse: 'Not applicable',
    healingTime: '4-6 months',
    implantPlacementTiming: 'simultaneous',
    complications: ['Membrane perforation (blind)', 'BPPV (vertigo) from malleting'],
    successRate: '92-96%',
    stepByStep: [
      'Initial drilling to 1mm below sinus floor',
      'Use of osteotomes of increasing diameter',
      'Fracture of sinus floor with mallet',
      'Introduction of graft material via osteotomy',
      'Simultaneous implant placement'
    ]
  }
];

export const gbrProtocols: GBRProtocol[] = [
  {
    id: 'horizontal-aug',
    name: 'Horizontal Ridge Augmentation',
    indication: 'Ridge width < 5mm',
    graftMaterial: 'composite',
    membrane: 'non-resorbable-dPTFE',
    fixation: 'Titanium pins or tacks',
    healingPeriod: '6-9 months',
    simultaneousImplant: false,
    expectedBoneGain: '3-5mm',
    stepByStep: ['Flap reflection', 'Cortical decortication', 'Graft application', 'Membrane fixation', 'Periosteal release', 'Tension-free primary closure']
  },
  {
    id: 'vertical-aug',
    name: 'Vertical Ridge Augmentation',
    indication: 'Loss of vertical ridge height, esthetic or functional deficit',
    graftMaterial: 'autograft',
    membrane: 'titanium-reinforced',
    fixation: 'Screws and pins',
    healingPeriod: '9-12 months',
    simultaneousImplant: false,
    expectedBoneGain: '4-8mm',
    stepByStep: ['Passivation of flaps', 'Block or particulate autograft placement', 'Rigid fixation of membrane', 'Complete tension-free closure']
  },
  {
    id: 'socket-preservation',
    name: 'Alveolar Ridge Preservation',
    indication: 'Extraction socket to prevent ridge collapse',
    graftMaterial: 'xenograft-BioOss',
    membrane: 'resorbable-collagen',
    fixation: 'Sutures (cross-stitch or hidden X)',
    healingPeriod: '4-6 months',
    simultaneousImplant: false,
    expectedBoneGain: 'Maintains >80% of original ridge dimensions',
    stepByStep: ['Atraumatic extraction', 'Thorough debridement of socket', 'Graft placement', 'Membrane adaptation over graft', 'Suturing']
  },
  {
    id: 'ridge-splitting',
    name: 'Ridge Splitting / Expansion',
    indication: 'Narrow ridge (3-5mm) with adequate medullary space and vertical height',
    graftMaterial: 'allograft-FDBA',
    membrane: 'resorbable-collagen',
    fixation: 'Implants act as tenting screws',
    healingPeriod: '4-6 months',
    simultaneousImplant: true,
    expectedBoneGain: '2-4mm horizontal',
    stepByStep: ['Crestal incision', 'Cortical osteotomy with piezosurgery or burs', 'Gradual expansion with chisels/spreaders', 'Implant placement', 'Grafting of gaps', 'Closure']
  }
];

export const immediatePlacementProtocols: Record<string, ImmediatePlacementProtocol> = {
  'Type-1': {
    socketType: 'Type-1',
    description: 'Facial bone and soft tissue are at normal levels',
    buccalBoneStatus: 'Intact',
    softTissueStatus: 'Intact',
    gapManagement: 'Graft gap if > 1.5mm',
    graftingRequired: true,
    provisionalProtocol: 'Immediate non-functional provisional to seal socket',
    prognosis: 'Excellent predictability for esthetics'
  },
  'Type-2': {
    socketType: 'Type-2',
    description: 'Facial soft tissue is at normal level, but facial bone is reduced',
    buccalBoneStatus: 'Dehisced or fenestrated',
    softTissueStatus: 'Intact',
    gapManagement: 'GBR required',
    graftingRequired: true,
    provisionalProtocol: 'Custom healing abutment or delayed provisional',
    prognosis: 'Moderate to high risk of soft tissue recession'
  },
  'Type-3': {
    socketType: 'Type-3',
    description: 'Facial bone and soft tissue are both reduced',
    buccalBoneStatus: 'Deficient',
    softTissueStatus: 'Deficient',
    gapManagement: 'Extensive GBR and soft tissue grafting required',
    graftingRequired: true,
    provisionalProtocol: 'Delayed loading only',
    prognosis: 'Unpredictable for immediate placement; staged approach recommended'
  }
};

/**
 * Retrieves the recommended drilling sequence based on bone density.
 * @param boneDensity 'D1', 'D2', 'D3', or 'D4'
 * @param fixtureSystem Specific implant system (can be expanded later)
 * @returns DrillingSequence object
 */
export function getDrillingSequence(boneDensity: string, fixtureSystem: string): DrillingSequence {
  return drillingSequences[boneDensity] || drillingSequences['D2'];
}
