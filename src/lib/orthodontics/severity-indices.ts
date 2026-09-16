export interface IotnFindings {
  overjet?: number;
  reverseOverjet?: number;
  overbite?: number;
  openbite?: number;
  crossbite?: boolean;
  displacement?: number;
  impededEruption?: boolean;
  cleftLipPalate?: boolean;
  submergedDeciduous?: boolean;
  supernumerary?: boolean;
  hypodontia?: boolean;
  defectMasticatory?: boolean;
}

export function calculateIotnDhc(findings: IotnFindings): number {
  if (findings.cleftLipPalate || findings.submergedDeciduous || findings.impededEruption || findings.defectMasticatory) {
    return 5;
  }
  if ((findings.overjet && findings.overjet > 9) || (findings.reverseOverjet && findings.reverseOverjet > 3.5) || findings.supernumerary || findings.hypodontia) {
    return 5;
  }
  if ((findings.overjet && findings.overjet > 6 && findings.overjet <= 9) || (findings.reverseOverjet && findings.reverseOverjet > 1 && findings.reverseOverjet <= 3.5)) {
    return 4;
  }
  if (findings.crossbite && findings.displacement && findings.displacement > 2) {
    return 4;
  }
  if ((findings.openbite && findings.openbite > 4) || (findings.displacement && findings.displacement > 4)) {
    return 4;
  }
  if ((findings.overjet && findings.overjet > 3.5 && findings.overjet <= 6) || (findings.openbite && findings.openbite > 2 && findings.openbite <= 4)) {
    return 3;
  }
  if (findings.displacement && findings.displacement > 2 && findings.displacement <= 4) {
    return 3;
  }
  if (findings.overbite && findings.overbite > 3.5) {
    return 3;
  }
  if ((findings.overjet && findings.overjet <= 3.5) || (findings.displacement && findings.displacement <= 2)) {
    return 2;
  }
  return 1;
}

export interface ParComponents {
  upperAnteriorSegment: number;
  lowerAnteriorSegment: number;
  rightBuccalOcclusion: number;
  leftBuccalOcclusion: number;
  overjet: number;
  overbite: number;
  centreline: number;
}

export function calculateParScore(components: ParComponents): number {
  return Object.values(components).reduce((a, b) => a + b, 0);
}

export function calculateWeightedParScore(components: ParComponents): number {
  return (
    components.upperAnteriorSegment * 1 +
    components.lowerAnteriorSegment * 1 +
    components.leftBuccalOcclusion * 1 +
    components.rightBuccalOcclusion * 1 +
    components.overjet * 6 +
    components.overbite * 2 +
    components.centreline * 4
  );
}

export interface DiComponents {
  overjet: number; // score
  overbite: number; // score
  anteriorOpenBite: number; // score
  lateralOpenBite: number; // score
  crowding: number; // score
  occlusion: number; // score
  lingualPosteriorCrossbite: number; // score
  buccalPosteriorCrossbite: number; // score
  anb: number; // score
  impa: number; // score
  snGoGn: number; // score
  other: number; // score
}

export function calculateDiScore(components: DiComponents): number {
  return Object.values(components).reduce((sum, val) => sum + val, 0);
}
