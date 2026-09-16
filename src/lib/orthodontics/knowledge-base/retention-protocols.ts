export type RetainerType = 'Fixed' | 'Removable';

export interface RetentionProtocol {
  id: string;
  name: string;
  type: RetainerType;
  description: string;
  wearSchedule: string;
  durability: string;
  maintenance: string;
  costLevel: 'Low' | 'Medium' | 'High';
  bestFor: string[];
}

export const retentionProtocols: Record<string, RetentionProtocol> = {
  fixedLingual: {
    id: 'fixed-lingual',
    name: 'Fixed Lingual Retainer (3-3)',
    type: 'Fixed',
    description: 'Braided or solid wire bonded to the lingual surfaces of anterior teeth (usually canine to canine).',
    wearSchedule: 'Permanent/Indefinite',
    durability: 'High, but composite pads can fracture or debond.',
    maintenance: 'Requires meticulous oral hygiene, floss threaders/interdental brushes.',
    costLevel: 'Medium',
    bestFor: ['Lower anterior crowding relapse prevention', 'Diastema closure cases', 'Non-compliant patients']
  },
  essix: {
    id: 'essix',
    name: 'Essix (Vacuum-Formed Retainer)',
    type: 'Removable',
    description: 'Clear thermoplastic retainer fully covering the clinical crowns.',
    wearSchedule: 'Full time (22h/day) for 3-6 months, then night-time only indefinitely.',
    durability: 'Moderate; prone to wear, cracking, and discoloration over 1-2 years.',
    maintenance: 'Clean with cold water, soap, and soft brush. Avoid heat.',
    costLevel: 'Low',
    bestFor: ['Aesthetic requirements', 'Holding incisor alignment', 'Bruxers (protects enamel, though retainer may wear fast)']
  },
  hawley: {
    id: 'hawley',
    name: 'Hawley Retainer',
    type: 'Removable',
    description: 'Acrylic palate/lingual horseshoe with Adams clasps and a labial bow.',
    wearSchedule: 'Full time for 3-6 months, then night-time only.',
    durability: 'Very High (can last 5-10+ years).',
    maintenance: 'Clean with toothbrush and non-abrasive cleaner. Can be adjusted by clinician.',
    costLevel: 'Medium',
    bestFor: ['Expansion retention', 'Allowing posterior settling/intercuspation', 'Cases requiring minor adjustments post-treatment']
  },
  vivera: {
    id: 'vivera',
    name: 'Vivera Retainers (Invisalign)',
    type: 'Removable',
    description: 'Premium clear retainers made from proprietary material, usually provided in sets of four.',
    wearSchedule: 'Full time for 3-6 months, then night-time only.',
    durability: 'High for clear retainers; slightly stronger than standard Essix.',
    maintenance: 'Standard clear aligner cleaning.',
    costLevel: 'High',
    bestFor: ['Post-Invisalign treatment', 'Patients wanting backup retainers immediately available']
  }
};
