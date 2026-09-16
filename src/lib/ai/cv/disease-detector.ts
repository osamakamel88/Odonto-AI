import { openai } from '../openai';

export interface DentalFinding {
  disease: string;
  location: string;
  severity: 'mild' | 'moderate' | 'severe';
  confidence: number;
}

export interface DiseaseDetectionResult {
  findings: DentalFinding[];
  contraindications: string[];
  preOrthoNeeded: string[];
}

export async function detectDiseases(imageBase64: string, imageType: 'panoramic' | 'periapical' | 'bitewing'): Promise<DiseaseDetectionResult> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are an expert oral pathologist. Detect any dental diseases (caries, periodontitis, apical lesions, etc.) in the provided radiograph. Assess if these present contraindications for orthodontic treatment or require pre-orthodontic interventions.' },
        { 
          role: 'user', 
          content: [
            { type: 'text', text: `Analyze this ${imageType} radiograph for dental diseases.` },
            { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${imageBase64}` } }
          ]
        }
      ],
      response_format: { type: 'json_object' }
    });
    
    const parsed = JSON.parse(response.choices[0].message.content || '{}');
    return {
      findings: parsed.findings || [],
      contraindications: parsed.contraindications || [],
      preOrthoNeeded: parsed.preOrthoNeeded || []
    };
  } catch (error) {
    console.error('Error detecting diseases:', error);
    throw error;
  }
}
