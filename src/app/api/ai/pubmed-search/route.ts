import { NextResponse } from 'next/server';
import { searchPubMedOrthodontics } from '@/lib/orthodontics/pubmed-client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || 'orthodontic clinical trials';
    const limit = Math.min(20, Math.max(1, parseInt(searchParams.get('limit') || '8', 10)));

    const result = await searchPubMedOrthodontics(query, limit);

    return NextResponse.json({
      success: true,
      query,
      ...result
    });
  } catch (error: any) {
    console.error('PubMed search route error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to query biomedical literature' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const query = body?.query || 'orthodontic clinical trials';
    const limit = Math.min(20, Math.max(1, body?.limit || 8));

    const result = await searchPubMedOrthodontics(query, limit);

    return NextResponse.json({
      success: true,
      query,
      ...result
    });
  } catch (error: any) {
    console.error('PubMed search route error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to query biomedical literature' },
      { status: 500 }
    );
  }
}
