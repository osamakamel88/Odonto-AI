export type PlatformType = 'internal-hex' | 'conical-morse-taper' | 'tri-channel' | 'external-hex' | 'conical-connection';
export type SurfaceTreatment = 'SLA' | 'SLActive' | 'TiUnite' | 'OsseoSpeed' | 'Laser-Lok' | 'RBM' | 'SA' | 'HA-coated';
export type ImplantShape = 'parallel' | 'tapered' | 'hybrid';

export interface ImplantFixture {
  id: string;
  brand: string;
  system: string;
  name: string;
  shape: ImplantShape;
  availableDiameters: number[];       // mm e.g. [3.3, 3.75, 4.1, 4.8]
  availableLengths: number[];         // mm e.g. [6, 8, 10, 12, 14, 16]
  platformType: PlatformType;
  platformDiameter: number;           // mm — the prosthetic platform width
  connection: string;                 // e.g. 'CrossFit', 'Conical Morse Taper 1.5°'
  material: string;                   // e.g. 'Grade 4 Titanium', 'Roxolid (Ti-Zr)'
  surface: SurfaceTreatment;
  threadDesign: string;               // e.g. 'Buttress', 'V-thread', 'Progressive'
  primaryStabilityISQ: { min: number; max: number }; // Typical ISQ range
  insertionTorqueRange: string;       // e.g. '25-45 Ncm'
  indications: string[];
  contraindications: string[];
  clinicalNotes: string;
}

export const FIXTURE_CATALOG: Record<string, ImplantFixture> = {
  'straumann-bl-roxolid-slactive': {
    id: 'straumann-bl-roxolid-slactive',
    brand: 'Straumann',
    system: 'Bone Level',
    name: 'Straumann BL Roxolid SLActive',
    shape: 'parallel',
    availableDiameters: [3.3, 4.1, 4.8],
    availableLengths: [6, 8, 10, 12, 14],
    platformType: 'conical-connection',
    platformDiameter: 3.3, // NC/RC varies
    connection: 'CrossFit',
    material: 'Roxolid (Ti-Zr)',
    surface: 'SLActive',
    threadDesign: 'V-thread',
    primaryStabilityISQ: { min: 65, max: 80 },
    insertionTorqueRange: '35-50 Ncm',
    indications: ['Single crowns', 'Bridges', 'Full arch'],
    contraindications: ['Severe bruxism', 'Untreated periodontitis'],
    clinicalNotes: 'Excellent for immediate loading in high primary stability situations.'
  },
  'straumann-blt-roxolid-slactive': {
    id: 'straumann-blt-roxolid-slactive',
    brand: 'Straumann',
    system: 'Bone Level Tapered',
    name: 'Straumann BLT Roxolid SLActive',
    shape: 'tapered',
    availableDiameters: [3.3, 4.1, 4.8],
    availableLengths: [6, 8, 10, 12, 14],
    platformType: 'conical-connection',
    platformDiameter: 3.3,
    connection: 'CrossFit',
    material: 'Roxolid (Ti-Zr)',
    surface: 'SLActive',
    threadDesign: 'Progressive',
    primaryStabilityISQ: { min: 70, max: 85 },
    insertionTorqueRange: '35-50 Ncm',
    indications: ['Immediate placement', 'Soft bone situations'],
    contraindications: ['Untreated periodontitis'],
    clinicalNotes: 'High primary stability even in D3/D4 bone.'
  },
  'straumann-tl-splus': {
    id: 'straumann-tl-splus',
    brand: 'Straumann',
    system: 'Tissue Level',
    name: 'Standard Plus',
    shape: 'parallel',
    availableDiameters: [3.3, 4.1, 4.8],
    availableLengths: [6, 8, 10, 12, 14],
    platformType: 'internal-hex', // It's actually a SynOcta internal connection
    platformDiameter: 4.8,
    connection: 'SynOcta',
    material: 'Roxolid (Ti-Zr)',
    surface: 'SLA',
    threadDesign: 'V-thread',
    primaryStabilityISQ: { min: 60, max: 75 },
    insertionTorqueRange: '35-50 Ncm',
    indications: ['Posterior single tooth', 'Bridges'],
    contraindications: ['High esthetic zone'],
    clinicalNotes: 'Ideal for posterior zones where one stage surgery is preferred.'
  },
  'nobel-active': {
    id: 'nobel-active',
    brand: 'Nobel Biocare',
    system: 'NobelActive',
    name: 'NobelActive',
    shape: 'tapered',
    availableDiameters: [3.0, 3.5, 4.3, 5.0, 6.0],
    availableLengths: [7, 8.5, 10, 11.5, 13, 15],
    platformType: 'conical-connection',
    platformDiameter: 3.5,
    connection: 'Internal Conical Connection',
    material: 'Grade 4 Titanium',
    surface: 'TiUnite',
    threadDesign: 'Expanding tapered',
    primaryStabilityISQ: { min: 70, max: 85 },
    insertionTorqueRange: '35-70 Ncm',
    indications: ['High esthetic demand', 'Immediate extraction sockets', 'Soft bone'],
    contraindications: [],
    clinicalNotes: 'Allows for redirection during insertion.'
  },
  'nobel-replace-cc': {
    id: 'nobel-replace-cc',
    brand: 'Nobel Biocare',
    system: 'NobelReplace',
    name: 'NobelReplace Conical Connection',
    shape: 'tapered',
    availableDiameters: [3.5, 4.3, 5.0, 6.0],
    availableLengths: [8, 10, 11.5, 13, 16],
    platformType: 'conical-connection',
    platformDiameter: 3.5,
    connection: 'Internal Conical Connection',
    material: 'Grade 4 Titanium',
    surface: 'TiUnite',
    threadDesign: 'V-thread',
    primaryStabilityISQ: { min: 65, max: 80 },
    insertionTorqueRange: '35-45 Ncm',
    indications: ['All bone types'],
    contraindications: [],
    clinicalNotes: 'Original tapered implant with secure internal conical connection.'
  },
  'nobel-parallel': {
    id: 'nobel-parallel',
    brand: 'Nobel Biocare',
    system: 'NobelParallel',
    name: 'NobelParallel Conical Connection',
    shape: 'parallel',
    availableDiameters: [3.75, 4.3, 5.0],
    availableLengths: [7, 8.5, 10, 11.5, 13, 15],
    platformType: 'conical-connection',
    platformDiameter: 3.75,
    connection: 'Internal Conical Connection',
    material: 'Grade 4 Titanium',
    surface: 'TiUnite',
    threadDesign: 'Parallel walled',
    primaryStabilityISQ: { min: 65, max: 80 },
    insertionTorqueRange: '35-45 Ncm',
    indications: ['Universal use'],
    contraindications: [],
    clinicalNotes: 'Straightforward protocol.'
  },
  'zimmer-tsv': {
    id: 'zimmer-tsv',
    brand: 'Zimmer Biomet',
    system: 'TSV',
    name: 'Tapered Screw-Vent',
    shape: 'tapered',
    availableDiameters: [3.7, 4.0, 4.7, 5.7],
    availableLengths: [8, 10, 11.5, 13, 16],
    platformType: 'internal-hex',
    platformDiameter: 3.5,
    connection: 'Friction-Fit Internal Hex',
    material: 'Grade 5 Titanium Alloy (Ti-6Al-4V)',
    surface: 'HA-coated', // or MTX
    threadDesign: 'Triple lead threads',
    primaryStabilityISQ: { min: 65, max: 80 },
    insertionTorqueRange: '30-40 Ncm',
    indications: ['All indications'],
    contraindications: [],
    clinicalNotes: 'Friction-fit connection minimizes micromovement.'
  },
  'zimmer-t3': {
    id: 'zimmer-t3',
    brand: 'Zimmer Biomet',
    system: 'T3',
    name: 'T3 Tapered Implant',
    shape: 'hybrid',
    availableDiameters: [3.25, 4.0, 4.7, 5.0],
    availableLengths: [8.5, 10, 11.5, 13, 15],
    platformType: 'internal-hex',
    platformDiameter: 3.4,
    connection: 'Certain Internal Connection',
    material: 'Grade 4 Titanium',
    surface: 'OsseoSpeed', // T3 surface
    threadDesign: 'Fine coronal threads, macro body threads',
    primaryStabilityISQ: { min: 65, max: 80 },
    insertionTorqueRange: '30-40 Ncm',
    indications: ['High esthetic risk'],
    contraindications: [],
    clinicalNotes: 'Designed for crestal bone preservation.'
  },
  'astra-ev': {
    id: 'astra-ev',
    brand: 'Dentsply Sirona',
    system: 'Astra Tech Implant System',
    name: 'Astra EV',
    shape: 'parallel', // Has a slight taper at apex
    availableDiameters: [3.0, 3.6, 4.2, 4.8],
    availableLengths: [6, 8, 9, 11, 13, 15],
    platformType: 'conical-connection',
    platformDiameter: 3.6,
    connection: 'Conical Seal Design',
    material: 'Grade 4 Titanium',
    surface: 'OsseoSpeed',
    threadDesign: 'MicroThread',
    primaryStabilityISQ: { min: 65, max: 80 },
    insertionTorqueRange: '25-45 Ncm',
    indications: ['All bone qualities'],
    contraindications: [],
    clinicalNotes: 'Fluoride-modified nanostructure surface.'
  },
  'xive': {
    id: 'xive',
    brand: 'Dentsply Sirona',
    system: 'Xive',
    name: 'Xive S',
    shape: 'parallel',
    availableDiameters: [3.0, 3.4, 3.8, 4.5, 5.5],
    availableLengths: [8, 9.5, 11, 13, 15],
    platformType: 'internal-hex',
    platformDiameter: 3.4,
    connection: 'Deep Internal Hex',
    material: 'Grade 2 Titanium',
    surface: 'SLA',
    threadDesign: 'Condensing thread design',
    primaryStabilityISQ: { min: 60, max: 75 },
    insertionTorqueRange: '30-50 Ncm',
    indications: ['Immediate loading', 'Poor bone quality'],
    contraindications: [],
    clinicalNotes: 'Excellent primary stability in D3/D4 bone.'
  },
  'biohorizons-tapered-internal': {
    id: 'biohorizons-tapered-internal',
    brand: 'BioHorizons',
    system: 'Tapered Internal',
    name: 'Tapered Internal Laser-Lok',
    shape: 'tapered',
    availableDiameters: [3.5, 4.0, 4.5, 5.0, 5.8, 6.0],
    availableLengths: [7.5, 9, 10.5, 12, 15],
    platformType: 'internal-hex',
    platformDiameter: 3.5,
    connection: 'Internal Hex',
    material: 'Grade 5 Titanium Alloy (Ti-6Al-4V)',
    surface: 'Laser-Lok',
    threadDesign: 'Reverse buttress thread',
    primaryStabilityISQ: { min: 65, max: 80 },
    insertionTorqueRange: '35-50 Ncm',
    indications: ['All indications'],
    contraindications: [],
    clinicalNotes: 'Laser-Lok microchannels on the collar for crestal bone and soft tissue attachment.'
  },
  'osstem-ts3': {
    id: 'osstem-ts3',
    brand: 'Osstem',
    system: 'TS System',
    name: 'TS III SA',
    shape: 'tapered',
    availableDiameters: [3.5, 4.0, 4.5, 5.0],
    availableLengths: [7, 8.5, 10, 11.5, 13],
    platformType: 'conical-connection',
    platformDiameter: 3.5,
    connection: '11° Morse Taper',
    material: 'Grade 4 Titanium',
    surface: 'SA',
    threadDesign: 'Corkscrew thread',
    primaryStabilityISQ: { min: 65, max: 80 },
    insertionTorqueRange: '30-40 Ncm',
    indications: ['Universal use'],
    contraindications: [],
    clinicalNotes: 'Sand-blasted and acid-etched surface for rapid osseointegration.'
  },
  'osstem-ss3': {
    id: 'osstem-ss3',
    brand: 'Osstem',
    system: 'SS System',
    name: 'SS III SA',
    shape: 'parallel', // Straight body
    availableDiameters: [3.5, 4.0, 5.0],
    availableLengths: [8, 10, 11.5, 13],
    platformType: 'internal-hex', // Octa
    platformDiameter: 4.8,
    connection: 'Internal Octa & 8° Morse Taper',
    material: 'Grade 4 Titanium',
    surface: 'SA',
    threadDesign: 'Synchronized thread',
    primaryStabilityISQ: { min: 60, max: 75 },
    insertionTorqueRange: '30-40 Ncm',
    indications: ['One-stage surgery'],
    contraindications: ['High esthetic demand'],
    clinicalNotes: 'Non-submerged type implant.'
  },
  'megagen-anyridge': {
    id: 'megagen-anyridge',
    brand: 'MegaGen',
    system: 'AnyRidge',
    name: 'AnyRidge Xpeed',
    shape: 'tapered',
    availableDiameters: [3.5, 4.0, 4.5, 5.0, 5.5],
    availableLengths: [7, 8.5, 10, 11.5, 13, 15],
    platformType: 'conical-connection',
    platformDiameter: 3.5,
    connection: '5° Morse Taper',
    material: 'Grade 4 Titanium',
    surface: 'SLA', // Xpeed
    threadDesign: 'KnifeThread',
    primaryStabilityISQ: { min: 70, max: 85 },
    insertionTorqueRange: '40-60 Ncm',
    indications: ['Poor bone quality', 'Immediate loading'],
    contraindications: [],
    clinicalNotes: 'Unique KnifeThread design expands bone during insertion, maximizing primary stability.'
  }
};

/**
 * Returns all fixtures by a specific brand.
 */
export function getFixturesByBrand(brand: string): ImplantFixture[] {
  return Object.values(FIXTURE_CATALOG).filter(
    (fixture) => fixture.brand.toLowerCase() === brand.toLowerCase()
  );
}

/**
 * Returns fixtures compatible with given dimensional constraints.
 */
export function getCompatibleFixtures(minDiameter: number, maxDiameter: number, minLength: number): ImplantFixture[] {
  return Object.values(FIXTURE_CATALOG).filter((fixture) => {
    const hasCompatibleDiameter = fixture.availableDiameters.some(
      (d) => d >= minDiameter && d <= maxDiameter
    );
    const hasCompatibleLength = fixture.availableLengths.some((l) => l >= minLength);
    return hasCompatibleDiameter && hasCompatibleLength;
  });
}
