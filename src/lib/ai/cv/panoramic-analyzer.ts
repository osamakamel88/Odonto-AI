import { analyzePanoramic } from '../orchestrator';

export interface TeethDetection {
  toothNumber: number;
  confidence: number;
  boundingBox: { x: number; y: number; width: number; height: number };
}

export interface Pathology {
  type: string;
  location: string;
  severity: string;
}

export interface BoneLevel {
  toothNumber: number;
  mesialLoss: number;
  distalLoss: number;
}

export interface PanoramicAnalysisResult {
  teeth: TeethDetection[];
  pathologies: Pathology[];
  missingTeeth: number[];
  boneLevels: BoneLevel[];
}

export async function analyzeOPG(imageBase64: string): Promise<PanoramicAnalysisResult> {
  const result = await analyzePanoramic(imageBase64);
  
  return {
    teeth: result.teeth || [],
    pathologies: result.pathologies || [],
    missingTeeth: result.missingTeeth || [],
    boneLevels: result.boneLevels || []
  };
}
