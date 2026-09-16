export interface ToothPrescription {
  torque: number; // degrees
  tip: number; // degrees (angulation)
  inOut: number; // mm
  rotation?: number; // degrees
}

export interface BracketSystem {
  id: string;
  name: string;
  description: string;
  maxillary: Record<number, ToothPrescription>; // 1-7 (Central to Second Molar)
  mandibular: Record<number, ToothPrescription>; // 1-7
}

export const bracketSystems: Record<string, BracketSystem> = {
  mbt: {
    id: 'mbt',
    name: 'MBT (McLaughlin-Bennett-Trevisi)',
    description: 'Designed to reduce the need for wire bending, especially torque in the anterior region.',
    maxillary: {
      1: { torque: 17, tip: 4, inOut: 1.0 },
      2: { torque: 10, tip: 8, inOut: 1.3 },
      3: { torque: -7, tip: 8, inOut: 0.8 },
      4: { torque: -7, tip: 0, inOut: 0.8 },
      5: { torque: -7, tip: 0, inOut: 0.8 },
      6: { torque: -14, tip: 0, inOut: 0.8, rotation: 10 },
      7: { torque: -14, tip: 0, inOut: 0.8, rotation: 10 }
    },
    mandibular: {
      1: { torque: -6, tip: 0, inOut: 1.3 },
      2: { torque: -6, tip: 0, inOut: 1.3 },
      3: { torque: -6, tip: 3, inOut: 0.8 },
      4: { torque: -12, tip: 2, inOut: 0.8 },
      5: { torque: -17, tip: 2, inOut: 0.8 },
      6: { torque: -20, tip: 0, inOut: 0.8 },
      7: { torque: -10, tip: 0, inOut: 0.8 }
    }
  },
  roth: {
    id: 'roth',
    name: 'Roth Prescription',
    description: 'First comprehensive preadjusted appliance system, aiming to achieve ideal functional occlusion.',
    maxillary: {
      1: { torque: 12, tip: 5, inOut: 0.9 },
      2: { torque: 8, tip: 9, inOut: 1.2 },
      3: { torque: -2, tip: 13, inOut: 0.6, rotation: 4 },
      4: { torque: -7, tip: 0, inOut: 0.8 },
      5: { torque: -7, tip: 0, inOut: 0.8 },
      6: { torque: -14, tip: 0, inOut: 0.8, rotation: 14 },
      7: { torque: -14, tip: 0, inOut: 0.8, rotation: 14 }
    },
    mandibular: {
      1: { torque: -1, tip: 0, inOut: 1.3 },
      2: { torque: -1, tip: 0, inOut: 1.3 },
      3: { torque: -11, tip: 7, inOut: 0.6, rotation: 2 },
      4: { torque: -17, tip: -1, inOut: 0.8 },
      5: { torque: -22, tip: -2, inOut: 0.8 },
      6: { torque: -30, tip: -1, inOut: 0.8 },
      7: { torque: -30, tip: 1, inOut: 0.8 }
    }
  },
  damonStandard: {
    id: 'damon-standard',
    name: 'Damon System (Standard Torque)',
    description: 'Passive self-ligating system emphasizing low friction and arch expansion.',
    maxillary: {
      1: { torque: 15, tip: 5, inOut: 0 },
      2: { torque: 6, tip: 9, inOut: 0 },
      3: { torque: 7, tip: 5, inOut: 0 },
      4: { torque: -7, tip: 2, inOut: 0 },
      5: { torque: -7, tip: 2, inOut: 0 },
      6: { torque: -9, tip: 0, inOut: 0 },
      7: { torque: -9, tip: 0, inOut: 0 }
    },
    mandibular: {
      1: { torque: -3, tip: 2, inOut: 0 },
      2: { torque: -3, tip: 2, inOut: 0 },
      3: { torque: 7, tip: 5, inOut: 0 },
      4: { torque: -12, tip: 2, inOut: 0 },
      5: { torque: -17, tip: 2, inOut: 0 },
      6: { torque: -30, tip: 2, inOut: 0 },
      7: { torque: -10, tip: 2, inOut: 0 }
    }
  }
};
