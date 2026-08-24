import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    const schemes = await prisma.scheme.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(schemes, { status: 200 });
  } catch (error) {
    console.error('Fetch schemes error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, category, description, eligibility, documentsRequired, deadline } = body;
    const scheme = await prisma.scheme.create({
      data: {
        title,
        category,
        description,
        eligibility,
        documentsRequired,
        deadline: new Date(deadline)
      }
    });
    return NextResponse.json(scheme, { status: 201 });
  } catch (error) {
    console.error('Create scheme error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
