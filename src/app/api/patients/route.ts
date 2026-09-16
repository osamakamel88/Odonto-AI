import { NextResponse } from 'next/server';
import { getMockPatients } from '@/lib/db/mock-data';

export async function GET() {
  try {
    const patients = getMockPatients();
    return NextResponse.json({ success: true, data: patients });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch patients' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // In a real app, you would validate with Zod here
    
    const newPatient = {
      id: `p${Math.floor(Math.random() * 1000)}`,
      ...body,
      createdAt: new Date(),
    };

    return NextResponse.json({ success: true, data: newPatient }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create patient' }, { status: 500 });
  }
}
