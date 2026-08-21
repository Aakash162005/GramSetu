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
