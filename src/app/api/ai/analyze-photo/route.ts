import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { imageBase64, photoType } = body;

    if (!imageBase64 || !photoType) {
      return NextResponse.json({ error: 'Image and photoType are required' }, { status: 400 });
    }

    // TODO: Integrate GPT-4o vision for clinical photo analysis based on photoType
    const mockAnalysis = {
      type: photoType,
      findings: ['Midline deviation 1mm to the right', 'Mild gingival inflammation']
    };

    return NextResponse.json({ success: true, analysis: mockAnalysis });
  } catch (error) {
    console.error('Photo analysis error:', error);
    return NextResponse.json({ success: false, error: 'Failed to analyze photo' }, { status: 500 });
  }
}
