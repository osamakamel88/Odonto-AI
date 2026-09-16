export type WireMaterial = 'NiTi' | 'SS' | 'TMA' | 'CuNiTi' | 'Braided SS';
export type TreatmentPhase = 'Leveling & Aligning' | 'Working/Space Closure' | 'Finishing & Detailing';

export interface ArchwireStep {
  sequenceOrder: number;
  dimension: string; // e.g., "0.014", "0.018x0.025"
  material: WireMaterial;
  phase: TreatmentPhase;
  purpose: string;
  typicalDurationMonths: number;
}

export interface WireSequenceProtocol {
  id: string;
  name: string;
  description: string;
  slotSize: '0.018' | '0.022';
  steps: ArchwireStep[];
}

export const wireSequences: Record<string, WireSequenceProtocol> = {
  conventional022: {
    id: 'conventional-022',
    name: 'Conventional Sequence (0.022 slot)',
    description: 'Standard progression for moderate crowding without extractions in an 0.022 slot.',
    slotSize: '0.022',
    steps: [
      { sequenceOrder: 1, dimension: '0.014', material: 'NiTi', phase: 'Leveling & Aligning', purpose: 'Initial alignment, initiate unravelling', typicalDurationMonths: 2 },
      { sequenceOrder: 2, dimension: '0.018', material: 'NiTi', phase: 'Leveling & Aligning', purpose: 'Continue alignment, leveling of curve of Spee', typicalDurationMonths: 2 },
      { sequenceOrder: 3, dimension: '0.016x0.022', material: 'NiTi', phase: 'Leveling & Aligning', purpose: 'Initiate torque control, further leveling', typicalDurationMonths: 2 },
      { sequenceOrder: 4, dimension: '0.019x0.025', material: 'SS', phase: 'Working/Space Closure', purpose: 'Major mechanics, AP correction, space closure, complete leveling', typicalDurationMonths: 6 },
      { sequenceOrder: 5, dimension: '0.017x0.025', material: 'TMA', phase: 'Finishing & Detailing', purpose: 'Idealize root positions, custom bends, final settling', typicalDurationMonths: 3 }
    ]
  },
  extraction022: {
    id: 'extraction-022',
    name: 'Extraction Sequence (0.022 slot)',
    description: 'Progression for bicuspid extraction cases utilizing sliding mechanics.',
    slotSize: '0.022',
    steps: [
      { sequenceOrder: 1, dimension: '0.014', material: 'NiTi', phase: 'Leveling & Aligning', purpose: 'Initial alignment', typicalDurationMonths: 1 },
      { sequenceOrder: 2, dimension: '0.016', material: 'NiTi', phase: 'Leveling & Aligning', purpose: 'Continue alignment', typicalDurationMonths: 1 },
      { sequenceOrder: 3, dimension: '0.016x0.022', material: 'NiTi', phase: 'Leveling & Aligning', purpose: 'Initiate torque, prepare for SS', typicalDurationMonths: 2 },
      { sequenceOrder: 4, dimension: '0.019x0.025', material: 'SS', phase: 'Working/Space Closure', purpose: 'Retraction of anterior segment, space closure on stable archwire', typicalDurationMonths: 8 },
      { sequenceOrder: 5, dimension: '0.016x0.022', material: 'Braided SS', phase: 'Finishing & Detailing', purpose: 'Final settling, coordinate arches', typicalDurationMonths: 3 }
    ]
  },
  deepBite022: {
    id: 'deep-bite-022',
    name: 'Deep Bite Correction Sequence',
    description: 'Protocol emphasizing early leveling of the curve of Spee and incisor intrusion.',
    slotSize: '0.022',
    steps: [
      { sequenceOrder: 1, dimension: '0.014', material: 'CuNiTi', phase: 'Leveling & Aligning', purpose: 'Early engagement and alignment', typicalDurationMonths: 2 },
      { sequenceOrder: 2, dimension: '0.018', material: 'NiTi', phase: 'Leveling & Aligning', purpose: 'Begin bite opening', typicalDurationMonths: 2 },
      { sequenceOrder: 3, dimension: '0.017x0.025', material: 'NiTi', phase: 'Leveling & Aligning', purpose: 'Torque control during intrusion, reverse curve of Spee integration', typicalDurationMonths: 3 },
      { sequenceOrder: 4, dimension: '0.019x0.025', material: 'SS', phase: 'Working/Space Closure', purpose: 'Rigid base for mechanics, maintain bite opening', typicalDurationMonths: 6 },
      { sequenceOrder: 5, dimension: '0.017x0.025', material: 'TMA', phase: 'Finishing & Detailing', purpose: 'Detailing bends', typicalDurationMonths: 2 }
    ]
  }
};
