import { openai } from './openai';
import { DIAGNOSIS_SYSTEM_PROMPT, buildDiagnosisPrompt } from './prompts/diagnosis';
import { TREATMENT_PLAN_SYSTEM_PROMPT, buildTreatmentPlanUserPrompt } from './prompts/treatment-plan';
import { COMPARISON_SYSTEM_PROMPT, buildComparisonPrompt } from './prompts/comparison';
import { EDUCATION_SYSTEM_PROMPT, buildEducationPrompt } from './prompts/education';
import {
  CEPH_ANALYSIS_PROMPT,
  PANORAMIC_ANALYSIS_PROMPT,
  PHOTO_ANALYSIS_PROMPT
} from './prompts/image-analysis';

export async function generateDiagnosis(patientData: any, cephAnalysis: any = {}) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: DIAGNOSIS_SYSTEM_PROMPT },
        { role: 'user', content: buildDiagnosisPrompt(patientData, cephAnalysis) }
      ],
      response_format: { type: 'json_object' }
    });
    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    console.error('Error generating diagnosis:', error);
    throw error;
  }
}

export async function generateTreatmentPlan(patientData: any, diagnosis: any, options: any = {}) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: TREATMENT_PLAN_SYSTEM_PROMPT },
        { role: 'user', content: buildTreatmentPlanUserPrompt({ patientData, diagnosis, ...options }, options.experienceLevel) }
      ],
      response_format: { type: 'json_object' }
    });
    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    console.error('Error generating treatment plan:', error);
    throw error;
  }
}

export async function analyzeCephalometric(imageBase64: string) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: CEPH_ANALYSIS_PROMPT },
        { 
          role: 'user', 
          content: [
            { type: 'text', text: 'Analyze this lateral cephalometric radiograph.' },
            { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${imageBase64}` } }
          ]
        }
      ],
      response_format: { type: 'json_object' }
    });
    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    console.error('Error analyzing cephalometric image:', error);
    throw error;
  }
}

export async function analyzePanoramic(imageBase64: string) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: PANORAMIC_ANALYSIS_PROMPT },
        { 
          role: 'user', 
          content: [
            { type: 'text', text: 'Analyze this panoramic radiograph.' },
            { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${imageBase64}` } }
          ]
        }
      ],
      response_format: { type: 'json_object' }
    });
    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    console.error('Error analyzing panoramic image:', error);
    throw error;
  }
}

export async function analyzePhoto(imageBase64: string, photoType: 'extraoral' | 'intraoral' = 'extraoral') {
  try {
    const systemPrompt = photoType === 'extraoral' ? PHOTO_ANALYSIS_PROMPT : PHOTO_ANALYSIS_PROMPT;
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { 
          role: 'user', 
          content: [
            { type: 'text', text: `Analyze this ${photoType} photo.` },
            { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${imageBase64}` } }
          ]
        }
      ],
      response_format: { type: 'json_object' }
    });
    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    console.error(`Error analyzing ${photoType} photo:`, error);
    throw error;
  }
}

export async function compareTreatments(options: any[]) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: COMPARISON_SYSTEM_PROMPT },
        { role: 'user', content: buildComparisonPrompt(options) }
      ],
      response_format: { type: 'json_object' }
    });
    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    console.error('Error comparing treatments:', error);
    throw error;
  }
}

export async function explainDecision(decision: any, context: any) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: EDUCATION_SYSTEM_PROMPT },
        { role: 'user', content: buildEducationPrompt(decision, context) }
      ]
    });
    return response.choices[0].message.content || '';
  } catch (error) {
    console.error('Error explaining decision:', error);
    throw error;
  }
}

export async function clinicalChat(messages: any[], patientContext: any) {
  try {
    const stream = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a helpful clinical assistant. Use the following patient context: ' + JSON.stringify(patientContext) },
        ...messages
      ],
      stream: true,
    });
    return stream;
  } catch (error) {
    console.error('Error in clinical chat:', error);
    throw error;
  }
}
