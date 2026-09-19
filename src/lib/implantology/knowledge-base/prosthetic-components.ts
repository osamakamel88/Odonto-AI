export type AbutmentType = 'stock-straight' | 'stock-angled-15' | 'stock-angled-25' | 'stock-angled-30' | 'custom-titanium' | 'custom-zirconia' | 'multi-unit' | 'UCLA' | 'temporary' | 'ball-attachment' | 'locator';
export type RetentionType = 'screw-retained' | 'cement-retained' | 'hybrid';
export type ProsthesisType = 'single-crown' | 'FDP-bridge' | 'cantilever-bridge' | 'overdenture-locator' | 'overdenture-bar' | 'all-on-4' | 'all-on-6' | 'hybrid-prosthesis' | 'full-arch-zirconia';
export type CrownMaterial = 'zirconia-monolithic' | 'zirconia-layered' | 'PFM' | 'lithium-disilicate' | 'PMMA-provisional' | 'composite-provisional' | 'titanium-framework';

export interface AbutmentSpec {
  id: string;
  type: AbutmentType;
  name: string;
  material: string;
  angulationOptions: number[];  // degrees
  gingivalHeightOptions: number[];  // mm
  compatibleSystems: string[];
  indications: string[];
  contraindications: string[];
  torqueValue: number;  // Ncm
  clinicalNotes: string;
}

export interface ScrewSpec {
  id: string;
  name: string;
  system: string;
  type: 'abutment-screw' | 'prosthetic-screw' | 'multi-unit-screw' | 'cover-screw' | 'healing-abutment';
  material: string;
  torqueValue: number;  // Ncm
  preloadForce: string;
  antiRotation: string;
  retighteningProtocol: string;
}

export interface ProsthesisOption {
  id: string;
  type: ProsthesisType;
  name: string;
  description: string;
  minImplants: number;
  maxSpan: number;  // teeth
  cantileverLimit: string;
  materials: CrownMaterial[];
  retentionOptions: RetentionType[];
  indications: string[];
  contraindications: string[];
  maintenanceSchedule: string;
  expectedLongevity: string;
  costLevel: 'low' | 'medium' | 'high' | 'premium';
  clinicalConsiderations: string[];
}

export interface CementVsScrewDecision {
  factor: string;
  cementRetained: { value: string; score: number };
  screwRetained: { value: string; score: number };
}

export const abutments: Record<string, AbutmentSpec> = {
  'stock-straight-ti': {
    id: 'stock-straight-ti',
    type: 'stock-straight',
    name: 'Stock Straight Titanium Abutment',
    material: 'Titanium Grade 4/5',
    angulationOptions: [0],
    gingivalHeightOptions: [1, 2, 3, 4, 5],
    compatibleSystems: ['Straumann', 'Nobel', 'Zimmer', 'Dentsply'],
    indications: ['Posterior single crowns', 'Cement-retained restorations where implant is placed ideally'],
    contraindications: ['High aesthetic demands', 'Deeply subgingival margins', 'Highly angled implants'],
    torqueValue: 35,
    clinicalNotes: 'Easy to use but limited customization for emergence profile.'
  },
  'stock-angled-15': {
    id: 'stock-angled-15',
    type: 'stock-angled-15',
    name: '15-Degree Angled Abutment',
    material: 'Titanium Grade 4/5',
    angulationOptions: [15],
    gingivalHeightOptions: [1, 2, 3, 4],
    compatibleSystems: ['Straumann', 'Nobel', 'Zimmer', 'Dentsply'],
    indications: ['Implants placed with slight angulation (up to 15 degrees)'],
    contraindications: ['Angulation > 15 degrees'],
    torqueValue: 35,
    clinicalNotes: 'Useful for correcting minor axis deviations in the anterior maxilla.'
  },
  'custom-zirconia': {
    id: 'custom-zirconia',
    type: 'custom-zirconia',
    name: 'Custom Zirconia Abutment (Ti-base)',
    material: 'Zirconia bonded to Titanium Base',
    angulationOptions: [0, 5, 10, 15, 20, 25],
    gingivalHeightOptions: [0.5, 1, 1.5, 2, 3],
    compatibleSystems: ['All major CAD/CAM systems'],
    indications: ['High aesthetic zones', 'Thin biotype', 'Custom emergence profile needed'],
    contraindications: ['Limited interarch space', 'Posterior high-stress areas (bruxism)'],
    torqueValue: 35,
    clinicalNotes: 'Offers optimal aesthetics and soft tissue response. Must use a Ti-base for connection strength.'
  },
  'multi-unit': {
    id: 'multi-unit',
    type: 'multi-unit',
    name: 'Multi-Unit Abutment (MUA)',
    material: 'Titanium Grade 4/5',
    angulationOptions: [0, 17, 30],
    gingivalHeightOptions: [1, 2, 3, 4, 5],
    compatibleSystems: ['Nobel', 'Straumann', 'Zimmer', 'Dentsply'],
    indications: ['Full arch restorations', 'All-on-4', 'Multiple unit bridges', 'Correcting severe divergence'],
    contraindications: ['Single unit restorations'],
    torqueValue: 15, // MUA to implant often 35, but prosthetic screw is usually 15
    clinicalNotes: 'Raises the restorative platform to tissue level. Essential for passive fit in full arch cases.'
  },
  'locator': {
    id: 'locator',
    type: 'locator',
    name: 'Locator Attachment',
    material: 'Titanium with TiN coating',
    angulationOptions: [0, 10, 20],
    gingivalHeightOptions: [1, 2, 3, 4, 5, 6],
    compatibleSystems: ['Zest Anchors', 'Straumann', 'Nobel'],
    indications: ['Implant overdentures (tissue supported, implant retained)'],
    contraindications: ['V-shaped high palatal vaults', 'Severe ridge resorption requiring rigid support'],
    torqueValue: 30,
    clinicalNotes: 'Low profile attachment. Requires minimum of 2 implants in mandible, 4 in maxilla.'
  }
};

export const screws: Record<string, ScrewSpec> = {
  'straumann-abutment-screw': {
    id: 'straumann-abutment-screw',
    name: 'Straumann Bone Level Abutment Screw',
    system: 'Straumann',
    type: 'abutment-screw',
    material: 'Titanium alloy',
    torqueValue: 35,
    preloadForce: 'Optimal',
    antiRotation: 'CrossFit',
    retighteningProtocol: 'Retorque to 35 Ncm after 10 minutes'
  },
  'nobel-abutment-screw': {
    id: 'nobel-abutment-screw',
    name: 'Nobel Active Abutment Screw',
    system: 'Nobel Biocare',
    type: 'abutment-screw',
    material: 'Titanium alloy with low friction coating',
    torqueValue: 35,
    preloadForce: 'High',
    antiRotation: 'Conical connection with hex',
    retighteningProtocol: 'Retorque to 35 Ncm after 10 minutes'
  },
  'zimmer-abutment-screw': {
    id: 'zimmer-abutment-screw',
    name: 'Zimmer TSV Abutment Screw',
    system: 'Zimmer Biomet',
    type: 'abutment-screw',
    material: 'Titanium alloy',
    torqueValue: 30,
    preloadForce: 'Standard',
    antiRotation: 'Internal Hex',
    retighteningProtocol: 'Retorque to 30 Ncm after 10 minutes'
  },
  'dentsply-abutment-screw': {
    id: 'dentsply-abutment-screw',
    name: 'Dentsply Astra Tech Abutment Screw',
    system: 'Dentsply Sirona',
    type: 'abutment-screw',
    material: 'Titanium alloy',
    torqueValue: 25, // For Astra Tech EV it may be 25 depending on size
    preloadForce: 'Standard',
    antiRotation: 'Conical Seal Design',
    retighteningProtocol: 'Retorque to 25 Ncm after 10 minutes'
  }
};

export const prostheses: Record<string, ProsthesisOption> = {
  'single-crown-posterior': {
    id: 'single-crown-posterior',
    type: 'single-crown',
    name: 'Posterior Single Crown',
    description: 'Implant-supported single unit restoration for molar or premolar replacement.',
    minImplants: 1,
    maxSpan: 1,
    cantileverLimit: 'None recommended',
    materials: ['zirconia-monolithic', 'PFM'],
    retentionOptions: ['screw-retained', 'cement-retained'],
    indications: ['Single missing posterior tooth'],
    contraindications: ['Inadequate interarch space (< 5mm)'],
    maintenanceSchedule: '6-12 months',
    expectedLongevity: '10-15+ years',
    costLevel: 'medium',
    clinicalConsiderations: ['Screw retention preferred to avoid cement remnants.', 'Consider occlusal table width.']
  },
  '3-unit-fdp': {
    id: '3-unit-fdp',
    type: 'FDP-bridge',
    name: '3-Unit Fixed Dental Prosthesis (Bridge)',
    description: 'Bridge supported by 2 implants replacing 3 teeth.',
    minImplants: 2,
    maxSpan: 3,
    cantileverLimit: 'Max 1 pontic (mesial or distal)',
    materials: ['zirconia-layered', 'zirconia-monolithic', 'PFM'],
    retentionOptions: ['screw-retained', 'cement-retained'],
    indications: ['Short edentulous span (3 teeth)'],
    contraindications: ['Parafunctional habits (without protection)'],
    maintenanceSchedule: '6-12 months',
    expectedLongevity: '10-15+ years',
    costLevel: 'high',
    clinicalConsiderations: ['Requires passive fit.', 'Splinting implants distributes forces well.']
  },
  'all-on-4': {
    id: 'all-on-4',
    type: 'all-on-4',
    name: 'All-on-4 Concept',
    description: 'Full arch fixed rehabilitation on 4 implants (2 axial anterior, 2 tilted posterior).',
    minImplants: 4,
    maxSpan: 12,
    cantileverLimit: '1.5-2.0 x AP spread (typically max 10-15mm distal)',
    materials: ['PMMA-provisional', 'zirconia-monolithic', 'titanium-framework'],
    retentionOptions: ['screw-retained'],
    indications: ['Fully edentulous arch', 'Avoidance of sinus lift/nerve transposition'],
    contraindications: ['Severe parafunction', 'Inadequate AP spread', 'Lack of restorative space (< 12mm)'],
    maintenanceSchedule: '6 months for hygiene, 12 months for full assessment',
    expectedLongevity: '10+ years (acrylic may need replacement earlier)',
    costLevel: 'premium',
    clinicalConsiderations: ['Posterior implants tilted 30-45 degrees.', 'MUA essential for passivity.']
  }
};

export const cementVsScrewMatrix: CementVsScrewDecision[] = [
  {
    factor: 'Retrievability',
    cementRetained: { value: 'Poor (unless temporary cement used)', score: 2 },
    screwRetained: { value: 'Excellent (easy removal for maintenance)', score: 10 }
  },
  {
    factor: 'Aesthetics',
    cementRetained: { value: 'Excellent (no screw hole)', score: 9 },
    screwRetained: { value: 'Good (requires composite plug, may be visible)', score: 7 }
  },
  {
    factor: 'Passive Fit',
    cementRetained: { value: 'Forgiving (cement space compensates)', score: 8 },
    screwRetained: { value: 'Requires absolute precision', score: 5 }
  },
  {
    factor: 'Peri-implant Health',
    cementRetained: { value: 'Risk of cement remnants causing peri-implantitis', score: 3 },
    screwRetained: { value: 'No cement remnants, biologically safer', score: 9 }
  },
  {
    factor: 'Interarch Space',
    cementRetained: { value: 'Requires > 7mm space for abutment retention', score: 4 },
    screwRetained: { value: 'Feasible in limited space (4-5mm)', score: 8 }
  },
  {
    factor: 'Cost & Simplicity',
    cementRetained: { value: 'Similar to conventional C&B', score: 7 },
    screwRetained: { value: 'Can be more complex/costly with custom parts', score: 5 }
  }
];

/**
 * Recommends prosthesis options based on span, implants, and aesthetic zone.
 */
export function recommendProsthesis(edentulousSpan: number, implantCount: number, aestheticZone: boolean): ProsthesisOption[] {
  const recommendations: ProsthesisOption[] = [];
  
  const options = Object.values(prostheses);
  for (const option of options) {
    if (implantCount >= option.minImplants && edentulousSpan <= option.maxSpan) {
      if (aestheticZone) {
        // Recommend more aesthetic materials
        if (option.materials.includes('zirconia-layered') || option.materials.includes('lithium-disilicate')) {
          recommendations.push(option);
        } else if (option.type === 'single-crown' || option.type === 'FDP-bridge') {
           recommendations.push(option);
        }
      } else {
        recommendations.push(option);
      }
    }
  }
  
  // Remove duplicates
  return Array.from(new Set(recommendations));
}

/**
 * Gets the standard torque value for a given implant system and screw type.
 */
export function getScrewTorque(system: string, screwType: string): number {
  const normSystem = system.toLowerCase();
  
  if (normSystem.includes('straumann') || normSystem.includes('nobel')) {
    return 35;
  } else if (normSystem.includes('zimmer')) {
    return 30;
  } else if (normSystem.includes('dentsply') || normSystem.includes('astra')) {
    return 25;
  }
  
  // Default general baseline if unknown
  return 30;
}
