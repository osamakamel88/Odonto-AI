export type ExpansionType = 'Skeletal' | 'Dental' | 'Hybrid';

export interface ExpansionDevice {
  id: string;
  name: string;
  type: ExpansionType;
  description: string;
  activationProtocol: string;
  expectedExpansion: string;
  retentionPeriod: string;
  ageLimit: string;
  skeletalVsDental: string; // Ratio or description
}

export const expansionDevices: Record<string, ExpansionDevice> = {
  rpeHyrax: {
    id: 'rpe-hyrax',
    name: 'RPE (Hyrax)',
    type: 'Skeletal',
    description: 'Tooth-borne, all-metal rapid palatal expander banded to molars and sometimes premolars.',
    activationProtocol: '1-2 turns per day (0.25mm - 0.5mm/day)',
    expectedExpansion: '7-10mm total (sutural opening + some dental tipping)',
    retentionPeriod: 'Leave in place 3-6 months post-expansion for sutural reorganization.',
    ageLimit: 'Generally effective up to 14-16 years (before sutural fusion).',
    skeletalVsDental: '50-60% skeletal, 40-50% dental in growing patients.'
  },
  rpeHaas: {
    id: 'rpe-haas',
    name: 'RPE (Haas)',
    type: 'Skeletal',
    description: 'Tooth- and tissue-borne expander with acrylic pads against the palatal vault.',
    activationProtocol: '1-2 turns per day (0.25mm - 0.5mm/day)',
    expectedExpansion: '7-10mm total',
    retentionPeriod: 'Leave in place 3-6 months post-expansion.',
    ageLimit: 'Up to 14-16 years.',
    skeletalVsDental: 'Higher skeletal ratio than Hyrax due to palatal vault pressure.'
  },
  sarpe: {
    id: 'sarpe',
    name: 'SARPE (Surgically Assisted RPE)',
    type: 'Skeletal',
    description: 'Surgical osteotomy of maxillary buttresses combined with a bone- or tooth-borne expander.',
    activationProtocol: 'Begin activation 5-7 days post-op; 1-2 turns/day.',
    expectedExpansion: '8-12mm+',
    retentionPeriod: '6 months post-expansion.',
    ageLimit: 'Adults (post-sutural fusion, typically 18+).',
    skeletalVsDental: 'Predominantly skeletal.'
  },
  mse: {
    id: 'mse',
    name: 'MSE (Maxillary Skeletal Expander)',
    type: 'Skeletal',
    description: 'Bone-borne expander utilizing 4 mini-implants engaging the palatal bone and bicortical engagement.',
    activationProtocol: '1-2 turns/day; adapted for older patients to overcome sutural resistance.',
    expectedExpansion: '5-10mm',
    retentionPeriod: '4-6 months.',
    ageLimit: 'Late teens to adults (even after complete sutural fusion in many cases).',
    skeletalVsDental: 'Nearly 100% skeletal, pure translation.'
  },
  quadHelix: {
    id: 'quad-helix',
    name: 'Quad Helix',
    type: 'Dental',
    description: 'Fixed W-arch with four helical loops made of heavy wire (.038), banded to upper first molars.',
    activationProtocol: 'Pre-activated prior to cementation; re-activated chairside every 6-8 weeks.',
    expectedExpansion: '4-6mm',
    retentionPeriod: 'Leave in place for 3 months post-expansion.',
    ageLimit: 'Primary and mixed dentition for sutural effect; adults for pure dental tipping.',
    skeletalVsDental: 'Mostly dental in older patients; mild skeletal in very young patients.'
  }
};
