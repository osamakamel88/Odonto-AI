export type ElasticDirection = 'Class II' | 'Class III' | 'Vertical' | 'Transverse' | 'Finishing';

export interface ElasticProtocol {
  id: string;
  name: string;
  direction: ElasticDirection;
  attachmentPoints: string; // e.g., "U3 to L6"
  forceOz: number; // in ounces, e.g., 4.5
  diameterInches: string; // e.g., "1/4", "3/16", "5/16"
  wearSchedule: 'Full time (22h/day)' | 'Night time only' | 'As needed';
  indication: string;
}

export const elasticProtocols: Record<string, ElasticProtocol> = {
  classIILight: {
    id: 'class-ii-light',
    name: 'Light Class II Elastics',
    direction: 'Class II',
    attachmentPoints: 'Maxillary Canine (U3) to Mandibular First Molar (L6)',
    forceOz: 3.5,
    diameterInches: '1/4',
    wearSchedule: 'Full time (22h/day)',
    indication: 'Mild Class II correction, initiating Class II mechanics, maintain anchorage'
  },
  classIIHeavy: {
    id: 'class-ii-heavy',
    name: 'Heavy Class II Elastics',
    direction: 'Class II',
    attachmentPoints: 'Maxillary Canine (U3) to Mandibular First/Second Molar (L6/L7)',
    forceOz: 6.0,
    diameterInches: '1/4',
    wearSchedule: 'Full time (22h/day)',
    indication: 'Moderate to severe Class II correction, retraction of maxillary anteriors'
  },
  classIIIShort: {
    id: 'class-iii-short',
    name: 'Short Class III Elastics',
    direction: 'Class III',
    attachmentPoints: 'Mandibular Canine (L3) to Maxillary First Molar (U6)',
    forceOz: 4.5,
    diameterInches: '1/4',
    wearSchedule: 'Full time (22h/day)',
    indication: 'Class III correction, protraction of maxilla, retraction of mandible'
  },
  triangleAnterior: {
    id: 'triangle-anterior',
    name: 'Anterior Triangle Elastics',
    direction: 'Vertical',
    attachmentPoints: 'U3 to L3 and L4',
    forceOz: 4.5,
    diameterInches: '3/16',
    wearSchedule: 'Full time (22h/day)',
    indication: 'Anterior open bite closure, canine seating'
  },
  boxPosterior: {
    id: 'box-posterior',
    name: 'Posterior Box Elastics',
    direction: 'Vertical',
    attachmentPoints: 'U4, U5 to L4, L5',
    forceOz: 4.5,
    diameterInches: '5/16',
    wearSchedule: 'Full time (22h/day)',
    indication: 'Posterior open bite closure, intercuspation during finishing'
  },
  crossbiteAnterior: {
    id: 'crossbite-anterior',
    name: 'Anterior Cross Elastics',
    direction: 'Transverse',
    attachmentPoints: 'Lingual button U2 to labial bracket L2',
    forceOz: 3.5,
    diameterInches: '3/16',
    wearSchedule: 'Full time (22h/day)',
    indication: 'Single tooth anterior crossbite correction'
  }
};
