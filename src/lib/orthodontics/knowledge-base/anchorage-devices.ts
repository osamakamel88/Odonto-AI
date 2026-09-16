export type AnchorageType = 'Absolute' | 'Maximum' | 'Moderate' | 'Minimum';

export interface AnchorageDevice {
  id: string;
  name: string;
  anchorageType: AnchorageType;
  description: string;
  insertionSite: string; // or attachment site
  loadingProtocol: string;
  successRate: string;
  indications: string[];
}

export const anchorageDevices: Record<string, AnchorageDevice> = {
  tadsInterradicular: {
    id: 'tads-interradicular',
    name: 'TADs (Interradicular)',
    anchorageType: 'Absolute',
    description: 'Titanium alloy mini-screws placed between the roots of adjacent teeth.',
    insertionSite: 'Alveolar bone between roots (commonly max. premolar/molar region)',
    loadingProtocol: 'Immediate loading is acceptable (up to 200-300g force).',
    successRate: '80-90% (higher in maxilla than mandible)',
    indications: ['En-masse retraction', 'Molar intrusion', 'Asymmetric tooth movement']
  },
  tadsExtraAlveolar: {
    id: 'tads-extra-alveolar',
    name: 'TADs (Extra-alveolar: IZC / Buccal Shelf)',
    anchorageType: 'Absolute',
    description: 'Longer mini-screws placed outside the root zones, allowing uninterrupted entire-arch movement.',
    insertionSite: 'Infrazygomatic Crest (maxilla), Mandibular Buccal Shelf (mandible)',
    loadingProtocol: 'Immediate loading up to 300g.',
    successRate: '85-95% due to high cortical bone density',
    indications: ['Total arch distalization', 'Severe crowding without extractions', 'Class III camouflage (lower arch distalization)']
  },
  nance: {
    id: 'nance',
    name: 'Nance Holding Arch',
    anchorageType: 'Maximum',
    description: 'Heavy wire soldered to maxillary molar bands with an acrylic button resting on the anterior palatal vault.',
    insertionSite: 'Maxillary first molars and anterior hard palate',
    loadingProtocol: 'Passive holding appliance',
    successRate: 'High for mesial drift prevention, but can cause tissue irritation',
    indications: ['Maintain leeway space', 'Reinforce anchorage during anterior retraction']
  },
  tpa: {
    id: 'tpa',
    name: 'Transpalatal Arch (TPA)',
    anchorageType: 'Moderate',
    description: 'Wire crossing the palate connecting maxillary first molars.',
    insertionSite: 'Maxillary first molars (bands)',
    loadingProtocol: 'Can be passive for stabilization or active for derotation/expansion/torque.',
    successRate: 'High',
    indications: ['Molar rotation', 'Stabilization', 'Preventing molar tipping']
  },
  headgearCervical: {
    id: 'headgear-cervical',
    name: 'Cervical Pull Headgear',
    anchorageType: 'Maximum',
    description: 'Extraoral appliance using a neck strap to deliver distal and extrusive forces to the maxilla.',
    insertionSite: 'Headgear tubes on maxillary first molars',
    loadingProtocol: '350-500g per side, 12-14 hours per day (mainly evening/night).',
    successRate: 'Highly dependent on patient compliance',
    indications: ['Class II correction in deep bite cases', 'Maxillary molar distalization']
  }
};
