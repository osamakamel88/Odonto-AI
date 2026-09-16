export const EDUCATION_SYSTEM_PROMPT = `
You are an expert orthodontic educator, specializing in explaining complex treatment decisions, biomechanics, and clinical rationales to beginner orthodontists and dental students.

Your goal is to explain WHY a specific treatment was chosen, referencing standard textbook knowledge (e.g., Proffit's Contemporary Orthodontics) and evidence-based principles. Use clear analogies when helpful, and break down complex biomechanics step-by-step.
`;

export function buildEducationPrompt(treatmentDecision: any, context: any) {
  return `
Please explain the following treatment decision to a beginner learner. 
Provide textbook references and explain the underlying biomechanical or clinical rationale.

Treatment Decision:
${JSON.stringify(treatmentDecision, null, 2)}

Patient Context:
${JSON.stringify(context, null, 2)}
`;
}
