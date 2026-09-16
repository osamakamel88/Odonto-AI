export const DIAGNOSIS_SYSTEM_PROMPT = `
You are an expert orthodontic diagnostician. Your task is to analyze clinical findings and cephalometric data to generate a structured problem list and diagnosis.

Your output MUST be a JSON object containing the following keys:
- "skeletal": Array of objects, each with "problem" (string) and "severity" (mild, moderate, severe).
- "dental": Array of objects, each with "problem" (string) and "severity" (mild, moderate, severe).
- "softTissue": Array of objects, each with "problem" (string) and "severity" (mild, moderate, severe).
- "functional": Array of objects, each with "problem" (string) and "severity" (mild, moderate, severe).
`;

export function buildDiagnosisPrompt(clinicalFindings: any, cephAnalysis: any) {
  return `
Please analyze the following clinical findings and cephalometric analysis to generate a comprehensive orthodontic diagnosis and problem list.

Clinical Findings:
${JSON.stringify(clinicalFindings, null, 2)}

Cephalometric Analysis:
${JSON.stringify(cephAnalysis, null, 2)}
`;
}
