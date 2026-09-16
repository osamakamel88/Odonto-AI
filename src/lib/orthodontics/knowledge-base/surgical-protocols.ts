export type SurgeryType = 'Maxillary' | 'Mandibular' | 'Bimaxillary' | 'Ancillary';

export interface SurgicalProtocol {
  id: string;
  name: string;
  surgeryType: SurgeryType;
  description: string;
  indications: string[];
  preOpOrthoGoals: string[];
  typicalPreOpDuration: string;
  postOpOrthoGoals: string[];
  typicalPostOpDuration: string;
  risks: string[];
}

export const surgicalProtocols: Record<string, SurgicalProtocol> = {
  leFort1: {
    id: 'le-fort-1',
    name: 'Le Fort I Osteotomy',
    surgeryType: 'Maxillary',
    description: 'Complete separation of the maxilla from the skull base, allowing movement in 3 planes (advancement, impaction, downgraft).',
    indications: ['Maxillary hypoplasia (Class III)', 'Vertical maxillary excess (Gummy smile, Open bite)', 'Transverse discrepancy'],
    preOpOrthoGoals: ['Level and align arches independently', 'Remove dental compensations', 'Coordinate arch widths'],
    typicalPreOpDuration: '12-18 months',
    postOpOrthoGoals: ['Final detailing', 'Intercuspation with elastics', 'Root parallelism'],
    typicalPostOpDuration: '6-9 months',
    risks: ['Bleeding', 'Nerve injury (infraorbital)', 'Devitalization of teeth', 'Relapse (especially downgrafts)']
  },
  bsso: {
    id: 'bsso',
    name: 'BSSO (Bilateral Sagittal Split Osteotomy)',
    surgeryType: 'Mandibular',
    description: 'Sagittal splitting of the mandibular rami to advance or set back the mandible.',
    indications: ['Mandibular retrognathia (Class II)', 'Mandibular prognathism (Class III)', 'Asymmetry'],
    preOpOrthoGoals: ['Incisor decompensation (e.g., proclining lower incisors in Class III)', 'Leveling curve of Spee'],
    typicalPreOpDuration: '12-18 months',
    postOpOrthoGoals: ['Elastic guidance to seat occlusion', 'Final alignment'],
    typicalPostOpDuration: '6-9 months',
    risks: ['Inferior alveolar nerve injury (paresthesia)', 'Condylar resorption', 'Bad split', 'Relapse']
  },
  genioplasty: {
    id: 'genioplasty',
    name: 'Genioplasty (Sliding)',
    surgeryType: 'Ancillary',
    description: 'Osteotomy of the anterior mandible (chin) to alter shape, vertical height, or anteroposterior projection.',
    indications: ['Macrogenia', 'Microgenia', 'Facial asymmetry', 'Obstructive sleep apnea'],
    preOpOrthoGoals: ['Routine alignment; often done concurrently with BSSO'],
    typicalPreOpDuration: 'N/A (Dictated by concurrent procedures)',
    postOpOrthoGoals: ['Routine finishing'],
    typicalPostOpDuration: 'N/A',
    risks: ['Mental nerve paresthesia', 'Soft tissue ptosis']
  },
  surgeryFirst: {
    id: 'surgery-first',
    name: 'Surgery-First Approach (SFA)',
    surgeryType: 'Bimaxillary',
    description: 'Orthognathic surgery performed before orthodontic decompensation, relying on regional acceleratory phenomenon (RAP).',
    indications: ['No severe crowding', 'Mild to no transverse discrepancy', 'Highly motivated patients desiring immediate facial profile improvement'],
    preOpOrthoGoals: ['Bracket placement only (no active tooth movement)'],
    typicalPreOpDuration: '1-4 weeks',
    postOpOrthoGoals: ['Rapid leveling and aligning utilizing RAP', 'Decompensation and intercuspation simultaneously'],
    typicalPostOpDuration: '9-15 months',
    risks: ['Occlusal instability post-op', 'Difficulty in precise surgical prediction due to compensations']
  }
};
