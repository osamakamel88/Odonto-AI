import { NextResponse } from 'next/server';
import { getMockPatient } from '@/lib/db/mock-data';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const patient = getMockPatient(id);
    
    if (!patient) {
      return NextResponse.json({ success: false, error: 'Patient not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: patient });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch patient' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const updatedPatient = { id, ...body, updatedAt: new Date() };

    return NextResponse.json({ success: true, data: updatedPatient });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update patient' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    return NextResponse.json({ success: true, message: 'Patient archived successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete patient' }, { status: 500 });
  }
}
