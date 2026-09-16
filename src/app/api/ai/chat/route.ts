import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages, patientContext } = body;

    // TODO: Integrate Vercel AI SDK and OpenAI
    
    return NextResponse.json({ 
      success: true, 
      reply: "This is a mock chat response. In production, this will stream from the AI." 
    });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({ success: false, error: 'Chat failed' }, { status: 500 });
  }
}
