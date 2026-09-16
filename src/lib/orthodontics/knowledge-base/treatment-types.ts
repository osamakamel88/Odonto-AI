export type TreatmentCategory = 'fixed' | 'aligner' | 'removable' | 'expansion' | 'anchorage' | 'surgical' | 'interceptive' | 'retention' | 'adjunctive';

export interface TreatmentModality {
  id: string;
  name: string;
  category: TreatmentCategory;
  description: string;
  indications: string[];
  contraindications: string[];
  advantages: string[];
  disadvantages: string[];
  typicalDuration: string; // e.g., "18-24 months"
  ageRange: string; // e.g., "12+"
  complexityLevel: 1 | 2 | 3 | 4 | 5;
  evidenceLevel: 'high' | 'moderate' | 'low';
}

export const treatmentTypes: Record<string, TreatmentModality> = {
  fixedMetalMbt: {
    id: 'fixed-metal-mbt',
    name: 'Metal Brackets (MBT Prescription)',
    category: 'fixed',
    description: 'Conventional metal twin brackets using McLaughlin-Bennett-Trevisi prescription.',
    indications: ['Comprehensive orthodontics', 'Extraction cases', 'Surgical cases', 'Severe crowding'],
    contraindications: ['Nickel allergy', 'Poor oral hygiene', 'Active periodontal disease'],
    advantages: ['Highly predictable control', 'Cost-effective', 'Robust', 'Versatile mechanics'],
    disadvantages: ['Aesthetics', 'Oral hygiene challenge', 'Comfort issues initially'],
    typicalDuration: '18-24 months',
    ageRange: '11+',
    complexityLevel: 4,
    evidenceLevel: 'high'
  },
  clearAlignersComprehensive: {
    id: 'clear-aligners-comprehensive',
    name: 'Clear Aligners (Comprehensive)',
    category: 'aligner',
    description: 'Full-arch clear aligner therapy using staged tooth movement, attachments, and IPR.',
    indications: ['Mild to moderate crowding/spacing', 'Open bites', 'Aesthetic demands'],
    contraindications: ['Severe extrusion needs', 'Multiple impacted teeth', 'Poor compliance'],
    advantages: ['Aesthetics', 'Removable for eating/cleaning', 'Comfort', 'Digital planning'],
    disadvantages: ['Heavily compliance-dependent', 'Limited root control in some movements', 'Cost'],
    typicalDuration: '12-18 months',
    ageRange: '13+',
    complexityLevel: 3,
    evidenceLevel: 'high'
  },
  lingualIncognito: {
    id: 'lingual-incognito',
    name: 'Lingual Braces (Incognito/WIN)',
    category: 'fixed',
    description: 'Custom-milled bracket systems placed on the lingual surfaces of teeth.',
    indications: ['High aesthetic demands', 'Sports professionals', 'Comprehensive treatment needs'],
    contraindications: ['Short clinical crowns', 'Severe deep bites (without bite opening)', 'Poor periodontal health'],
    advantages: ['Completely invisible', 'Customized prescription', 'Reduced labial decalcification risk'],
    disadvantages: ['Speech impediments', 'Tongue discomfort', 'High cost', 'Chairside difficulty'],
    typicalDuration: '18-24 months',
    ageRange: '16+',
    complexityLevel: 5,
    evidenceLevel: 'moderate'
  },
  rpe: {
    id: 'rpe',
    name: 'Rapid Palatal Expander (RPE)',
    category: 'expansion',
    description: 'Tooth-borne or bone-borne appliance to orthopedically widen the maxilla.',
    indications: ['Posterior crossbite', 'Maxillary transverse deficiency', 'Arch length discrepancy'],
    contraindications: ['Fused midpalatal suture (adults)', 'Open bite tendency (if using certain designs)'],
    advantages: ['True skeletal expansion', 'Creates space rapidly', 'Improves nasal airflow'],
    disadvantages: ['Midline diastema creation', 'Discomfort during activation', 'Requires parent/patient cooperation for turning'],
    typicalDuration: '4-6 months (including retention)',
    ageRange: '7-15',
    complexityLevel: 2,
    evidenceLevel: 'high'
  },
  tads: {
    id: 'tads',
    name: 'Temporary Anchorage Devices (TADs)',
    category: 'anchorage',
    description: 'Mini-screws temporarily inserted into bone to provide absolute anchorage.',
    indications: ['Maximum anchorage needs', 'Molar intrusion', 'Space closure without anchorage loss', 'Gummy smile correction'],
    contraindications: ['Inadequate bone volume', 'Poor oral hygiene', 'Bleeding disorders'],
    advantages: ['Absolute anchorage', 'Reduces reliance on patient compliance', 'Expands envelope of discrepancy'],
    disadvantages: ['Invasive', 'Risk of root damage during placement', 'Potential for loosening/failure'],
    typicalDuration: '6-12 months',
    ageRange: '12+',
    complexityLevel: 4,
    evidenceLevel: 'high'
  }
  // This can be expanded with all other modalities
};
