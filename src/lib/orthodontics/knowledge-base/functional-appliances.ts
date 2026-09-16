export type ApplianceType = 'Fixed' | 'Removable';
export type MechanismType = 'Tooth-borne' | 'Tissue-borne' | 'Hybrid';

export interface FunctionalAppliance {
  id: string;
  name: string;
  applianceType: ApplianceType;
  mechanism: MechanismType;
  description: string;
  idealAge: string; // e.g., "Peak pubertal growth spurt (11-13)"
  mandibularAdvancement: string; // e.g., "6-8mm initial"
  expectedOverjetReduction: string;
  wearSchedule: string;
  adjustmentProtocol: string;
}

export const functionalAppliances: Record<string, FunctionalAppliance> = {
  twinBlock: {
    id: 'twin-block',
    name: 'Twin Block',
    applianceType: 'Removable',
    mechanism: 'Tooth-borne',
    description: 'Upper and lower acrylic bite blocks with inclined planes that interlock at 70 degrees to posture the mandible forward.',
    idealAge: 'Peak pubertal growth spurt (11-14 yrs)',
    mandibularAdvancement: 'Single step 7-8mm or multi-step if >10mm needed',
    expectedOverjetReduction: '4-6mm over 6-9 months',
    wearSchedule: 'Full time including eating (if possible), 24h/day',
    adjustmentProtocol: 'Trim upper block to allow lower molar eruption for deep bite correction; expand screw 1x/week if expansion needed.'
  },
  herbst: {
    id: 'herbst',
    name: 'Herbst Appliance',
    applianceType: 'Fixed',
    mechanism: 'Tooth-borne',
    description: 'Banded or cast-splint fixed appliance using a tube-and-plunger mechanism to hold the mandible forward continuously.',
    idealAge: 'Late mixed/early permanent dentition (12-15 yrs)',
    mandibularAdvancement: 'Edge-to-edge incisal position, usually 6-8mm',
    expectedOverjetReduction: '5-7mm over 9-12 months',
    wearSchedule: 'Fixed (100% compliance)',
    adjustmentProtocol: 'Adding crimpable shims to the plunger to sequentially advance the mandible if needed.'
  },
  forsus: {
    id: 'forsus',
    name: 'Forsus Fatigue Resistant Device',
    applianceType: 'Fixed',
    mechanism: 'Hybrid',
    description: 'Coaxial spring device attaching to the upper molar headgear tube and clipping to the lower archwire (distal to canine).',
    idealAge: 'Permanent dentition, active growth or late growth (13-16 yrs)',
    mandibularAdvancement: 'Constant light continuous force pushing mandible forward/maxilla backward',
    expectedOverjetReduction: '3-5mm over 4-6 months',
    wearSchedule: 'Fixed (100% compliance)',
    adjustmentProtocol: 'Add split crimps to the push rod to increase activation as overjet reduces.'
  },
  mara: {
    id: 'mara',
    name: 'MARA (Mandibular Anterior Repositioning Appliance)',
    applianceType: 'Fixed',
    mechanism: 'Tooth-borne',
    description: 'Crowns on first molars with heavy wire extensions that force the patient to posture the mandible forward to close their mouth.',
    idealAge: 'Peak pubertal growth spurt (11-14 yrs)',
    mandibularAdvancement: 'Edge-to-edge posture',
    expectedOverjetReduction: '4-6mm over 9-12 months',
    wearSchedule: 'Fixed (100% compliance)',
    adjustmentProtocol: 'Advance by adding shims to the upper elbow or advancing the lower arm.'
  }
};
