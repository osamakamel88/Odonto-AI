export type InterceptiveCategory = 'Space Management' | 'Habit Control' | 'Crossbite' | 'Growth Modification';

export interface InterceptiveTreatment {
  id: string;
  name: string;
  category: InterceptiveCategory;
  description: string;
  idealAge: string;
  indication: string;
  duration: string;
  followUp: string;
}

export const interceptiveTreatments: Record<string, InterceptiveTreatment> = {
  bandAndLoop: {
    id: 'band-and-loop',
    name: 'Band and Loop Space Maintainer',
    category: 'Space Management',
    description: 'Unilateral fixed appliance with a band on the abutment tooth and a wire loop bridging the edentulous space.',
    idealAge: 'Primary/Early Mixed (4-8 yrs)',
    indication: 'Premature loss of a single primary molar (usually first primary molar).',
    duration: 'Until eruption of the permanent successor.',
    followUp: 'Every 6 months to check cement seal and eruption status.'
  },
  serialExtraction: {
    id: 'serial-extraction',
    name: 'Serial Extraction Protocol',
    category: 'Space Management',
    description: 'Sequential extraction of primary and permanent teeth to intercept severe crowding (C-D-4 sequence).',
    idealAge: 'Mixed Dentition (8-10 yrs)',
    indication: 'Severe arch length discrepancy (>10mm crowding), Class I skeletal pattern, normal overbite.',
    duration: 'Extends over several years corresponding to tooth eruption timing.',
    followUp: 'Close monitoring every 3-6 months to time extractions correctly and monitor eruption paths.'
  },
  tongueCrib: {
    id: 'tongue-crib',
    name: 'Tongue Crib / Habit Appliance',
    category: 'Habit Control',
    description: 'Fixed appliance with a wire fence positioned behind the upper incisors to block thumb sucking or tongue thrusting.',
    idealAge: 'Mixed Dentition (6-9 yrs)',
    indication: 'Prolonged non-nutritive sucking habit or severe tongue thrust causing anterior open bite.',
    duration: '6-12 months (leave in 3-6 months after habit ceases).',
    followUp: 'Monitor for habit cessation and spontaneous closure of open bite.'
  },
  anteriorCrossbiteWhip: {
    id: 'anterior-crossbite-whip',
    name: 'Anterior Crossbite Correction (2x4 / Whip Spring)',
    category: 'Crossbite',
    description: 'Partial fixed appliance or removable appliance to proclinate one or more maxillary incisors locked behind mandibular incisors.',
    idealAge: 'Early Mixed Dentition (7-9 yrs)',
    indication: 'Dental anterior crossbite causing functional shift or trauma to opposing lower incisor.',
    duration: '3-6 months.',
    followUp: 'Check for trauma elimination and create overjet to self-retain.'
  },
  facemask: {
    id: 'facemask',
    name: 'Facemask (Reverse Pull Headgear)',
    category: 'Growth Modification',
    description: 'Extraoral device resting on forehead and chin, pulling maxilla forward via elastics attached to an intraoral splint.',
    idealAge: 'Early to Mid Mixed Dentition (7-10 yrs)',
    indication: 'Skeletal Class III due to maxillary hypoplasia.',
    duration: '9-12 months.',
    followUp: 'Monitor compliance (12-14 hours/day), soft tissue health, and forward movement of maxilla.'
  }
};
