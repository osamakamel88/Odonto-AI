import { analyzeCephalometric } from '../orchestrator';

// Define a type for cephalometric analysis (matching orthodontics module if it exists)
export interface CephAnalysis {
  landmarks?: Record<string, { x: number; y: number }>;
  measurements?: Record<string, number>;
  classification?: string;
  interpretation?: string;
}

export async function detectLandmarks(imageBase64: string): Promise<Record<string, { x: number; y: number }>> {
  // Mocking coordinate detection or assuming the orchestrator handles it
  const result = await analyzeCephalometric(imageBase64);
  return result.landmarks || {};
}

export async function traceCephalometric(imageBase64: string): Promise<CephAnalysis> {
  // Call full pipeline via orchestrator
  const result = await analyzeCephalometric(imageBase64);
  return result as CephAnalysis;
}
