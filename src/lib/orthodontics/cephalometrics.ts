export type CephLandmarkName = 
  | 'S' // Sella
  | 'N' // Nasion
  | 'A' // A-point
  | 'B' // B-point
  | 'Pog' // Pogonion
  | 'Me' // Menton
  | 'Go' // Gonion
  | 'Gn' // Gnathion
  | 'Or' // Orbitale
  | 'Po' // Porion
  | 'ANS' // Anterior Nasal Spine
  | 'PNS' // Posterior Nasal Spine
  | 'U1A' // Upper incisor apex
  | 'U1T' // Upper incisor tip
  | 'L1A' // Lower incisor apex
  | 'L1T' // Lower incisor tip
  | 'Sn' // Subnasale
  | 'Ls' // Labrale superius
  | 'Li' // Labrale inferius
  | 'Pg' // Soft tissue pogonion
  | 'Pn' // Pronasale
  | 'Cm' // Columella
  | 'Ba' // Basion
  | 'Ptm'; // Pterygomaxillary fissure

export interface CephLandmark {
  name: CephLandmarkName;
  abbreviation: string;
  x: number;
  y: number;
  description?: string;
}

export interface CephAnalysis {
  sna: number;
  snb: number;
  anb: number;
  wits: number;
  fma: number;
  snGoGn: number;
  yAxis: number;
  impa: number;
  u1Sn: number;
  u1NaAngle: number;
  u1NaLinear: number;
  l1NbAngle: number;
  l1NbLinear: number;
  interincisalAngle: number;
  nasolabialAngle: number;
  upperLipEPlane: number;
  lowerLipEPlane: number;
  zAngle: number;
  jarabakRatio: number;
  facialAxis: number;
  maxillaryMandibularPlaneAngle: number;
}

export const CEPH_NORMS = {
  caucasian: {
    male: {
      sna: { mean: 82.0, sd: 2.0 },
      snb: { mean: 80.0, sd: 2.0 },
      anb: { mean: 2.0, sd: 2.0 },
      wits: { mean: -1.0, sd: 1.0 },
      fma: { mean: 25.0, sd: 3.0 },
      snGoGn: { mean: 32.0, sd: 2.0 },
      yAxis: { mean: 59.0, sd: 2.0 },
      impa: { mean: 90.0, sd: 4.0 },
      u1Sn: { mean: 104.0, sd: 5.0 },
      u1NaAngle: { mean: 22.0, sd: 2.0 },
      u1NaLinear: { mean: 4.0, sd: 1.0 },
      l1NbAngle: { mean: 25.0, sd: 2.0 },
      l1NbLinear: { mean: 4.0, sd: 1.0 },
      interincisalAngle: { mean: 131.0, sd: 5.0 },
      nasolabialAngle: { mean: 102.0, sd: 8.0 },
      upperLipEPlane: { mean: -4.0, sd: 2.0 },
      lowerLipEPlane: { mean: -2.0, sd: 2.0 },
      zAngle: { mean: 78.0, sd: 5.0 },
      jarabakRatio: { mean: 63.0, sd: 3.0 },
      facialAxis: { mean: 90.0, sd: 3.0 },
      maxillaryMandibularPlaneAngle: { mean: 27.0, sd: 4.0 },
    },
    female: {
      sna: { mean: 82.0, sd: 2.0 },
      snb: { mean: 80.0, sd: 2.0 },
      anb: { mean: 2.0, sd: 2.0 },
      wits: { mean: 0.0, sd: 1.0 },
      fma: { mean: 25.0, sd: 3.0 },
      snGoGn: { mean: 32.0, sd: 2.0 },
      yAxis: { mean: 59.0, sd: 2.0 },
      impa: { mean: 90.0, sd: 4.0 },
      u1Sn: { mean: 104.0, sd: 5.0 },
      u1NaAngle: { mean: 22.0, sd: 2.0 },
      u1NaLinear: { mean: 4.0, sd: 1.0 },
      l1NbAngle: { mean: 25.0, sd: 2.0 },
      l1NbLinear: { mean: 4.0, sd: 1.0 },
      interincisalAngle: { mean: 131.0, sd: 5.0 },
      nasolabialAngle: { mean: 102.0, sd: 8.0 },
      upperLipEPlane: { mean: -4.0, sd: 2.0 },
      lowerLipEPlane: { mean: -2.0, sd: 2.0 },
      zAngle: { mean: 78.0, sd: 5.0 },
      jarabakRatio: { mean: 63.0, sd: 3.0 },
      facialAxis: { mean: 90.0, sd: 3.0 },
      maxillaryMandibularPlaneAngle: { mean: 27.0, sd: 4.0 },
    },
  },
  citations: [
    'Steiner CC. Cephalometrics for you and me. Am J Orthod. 1953;39(10):729-755.',
    'Downs WB. Variations in facial relationships: Their significance in treatment and prognosis. Am J Orthod. 1948;34(10):812-840.',
    'Tweed CH. The Frankfort-mandibular plane angle in orthodontic diagnosis, classification, treatment planning, and prognosis. Am J Orthod Oral Surg. 1946;32:175-230.'
  ]
};

function distance(p1: CephLandmark, p2: CephLandmark): number {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

function angleBetweenLines(p1: CephLandmark, p2: CephLandmark, p3: CephLandmark, p4: CephLandmark): number {
  const m1 = (p2.y - p1.y) / (p2.x - p1.x);
  const m2 = (p4.y - p3.y) / (p4.x - p3.x);
  const angleRad = Math.atan(Math.abs((m1 - m2) / (1 + m1 * m2)));
  return angleRad * (180 / Math.PI);
}

function pointToLineDistance(pt: CephLandmark, lineP1: CephLandmark, lineP2: CephLandmark): number {
  const numerator = Math.abs((lineP2.x - lineP1.x) * (lineP1.y - pt.y) - (lineP1.x - pt.x) * (lineP2.y - lineP1.y));
  const denominator = Math.sqrt(Math.pow(lineP2.x - lineP1.x, 2) + Math.pow(lineP2.y - lineP1.y, 2));
  return numerator / denominator;
}

export function calculateCephMeasurements(landmarks: CephLandmark[]): Partial<CephAnalysis> {
  const lm = landmarks.reduce((acc, curr) => {
    acc[curr.name] = curr;
    return acc;
  }, {} as Record<string, CephLandmark>);

  const analysis: Partial<CephAnalysis> = {};

  if (lm.S && lm.N && lm.A) {
    analysis.sna = angleBetweenLines(lm.S, lm.N, lm.N, lm.A);
  }
  if (lm.S && lm.N && lm.B) {
    analysis.snb = angleBetweenLines(lm.S, lm.N, lm.N, lm.B);
  }
  if (analysis.sna && analysis.snb) {
    analysis.anb = analysis.sna - analysis.snb;
  }
  
  if (lm.Po && lm.Or && lm.Go && lm.Me) {
    analysis.fma = angleBetweenLines(lm.Po, lm.Or, lm.Go, lm.Me);
  }

  if (lm.S && lm.N && lm.Go && lm.Gn) {
    analysis.snGoGn = angleBetweenLines(lm.S, lm.N, lm.Go, lm.Gn);
  }

  if (lm.S && lm.N && lm.S && lm.Gn) {
    analysis.yAxis = angleBetweenLines(lm.S, lm.N, lm.S, lm.Gn);
  }

  if (lm.L1A && lm.L1T && lm.Go && lm.Me) {
    analysis.impa = angleBetweenLines(lm.L1A, lm.L1T, lm.Go, lm.Me);
  }

  if (lm.U1A && lm.U1T && lm.S && lm.N) {
    analysis.u1Sn = angleBetweenLines(lm.U1A, lm.U1T, lm.S, lm.N);
  }

  if (lm.U1A && lm.U1T && lm.N && lm.A) {
    analysis.u1NaAngle = angleBetweenLines(lm.U1A, lm.U1T, lm.N, lm.A);
    analysis.u1NaLinear = pointToLineDistance(lm.U1T, lm.N, lm.A);
  }

  if (lm.L1A && lm.L1T && lm.N && lm.B) {
    analysis.l1NbAngle = angleBetweenLines(lm.L1A, lm.L1T, lm.N, lm.B);
    analysis.l1NbLinear = pointToLineDistance(lm.L1T, lm.N, lm.B);
  }

  if (lm.U1A && lm.U1T && lm.L1A && lm.L1T) {
    analysis.interincisalAngle = angleBetweenLines(lm.U1A, lm.U1T, lm.L1A, lm.L1T);
  }

  if (lm.S && lm.Go && lm.N && lm.Me) {
    const sGo = distance(lm.S, lm.Go);
    const nMe = distance(lm.N, lm.Me);
    analysis.jarabakRatio = (sGo / nMe) * 100;
  }

  if (lm.Pn && lm.Pg && lm.Ls && lm.Li) {
    analysis.upperLipEPlane = pointToLineDistance(lm.Ls, lm.Pn, lm.Pg);
    analysis.lowerLipEPlane = pointToLineDistance(lm.Li, lm.Pn, lm.Pg);
  }

  if (lm.Cm && lm.Sn && lm.Ls) {
    analysis.nasolabialAngle = angleBetweenLines(lm.Cm, lm.Sn, lm.Sn, lm.Ls);
  }

  return analysis;
}

export function classifySkeletalPattern(anb: number, wits: number): 'Class I' | 'Class II' | 'Class III' {
  if (anb > 4 || wits > 2) return 'Class II';
  if (anb < 0 || wits < -2) return 'Class III';
  return 'Class I';
}

export function classifyGrowthPattern(fma: number, snGoGn: number, jarabak: number): 'Hypodivergent' | 'Normodivergent' | 'Hyperdivergent' {
  if (fma > 28 || snGoGn > 36 || jarabak < 59) return 'Hyperdivergent';
  if (fma < 22 || snGoGn < 28 || jarabak > 65) return 'Hypodivergent';
  return 'Normodivergent';
}

export function classifyProfile(nasolabialAngle: number, upperLipEPlane: number, lowerLipEPlane: number): 'Concave' | 'Straight' | 'Convex' {
  if (upperLipEPlane < -6 && lowerLipEPlane < -4) return 'Concave';
  if (upperLipEPlane > -1 && lowerLipEPlane > 1) return 'Convex';
  return 'Straight';
}

export function interpretCephAnalysis(analysis: CephAnalysis) {
  const skeletalClass = classifySkeletalPattern(analysis.anb, analysis.wits);
  const growthPattern = classifyGrowthPattern(analysis.fma, analysis.snGoGn, analysis.jarabakRatio);
  const profile = classifyProfile(analysis.nasolabialAngle, analysis.upperLipEPlane, analysis.lowerLipEPlane);
  
  return {
    skeletalClass,
    growthPattern,
    profile,
    findings: {
      maxilla: analysis.sna > 84 ? 'Prognathic' : analysis.sna < 80 ? 'Retrognathic' : 'Orthognathic',
      mandible: analysis.snb > 82 ? 'Prognathic' : analysis.snb < 78 ? 'Retrognathic' : 'Orthognathic',
      upperIncisor: analysis.u1Sn > 109 ? 'Proclined' : analysis.u1Sn < 99 ? 'Retroclined' : 'Normal inclination',
      lowerIncisor: analysis.impa > 94 ? 'Proclined' : analysis.impa < 86 ? 'Retroclined' : 'Normal inclination'
    }
  };
}
