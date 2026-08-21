import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    let complaints;
    if (userId) {
      complaints = await prisma.complaint.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
      });
    } else {
      complaints = await prisma.complaint.findMany({
        orderBy: { createdAt: 'desc' }
      });
    }

    return NextResponse.json(complaints, { status: 200 });
  } catch (error) {
    console.error('Fetch complaints error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, category, description, userId } = body;

    const complaint = await prisma.complaint.create({
      data: {
        title,
        category,
        description,
        userId
      }
    });

    return NextResponse.json(complaint, { status: 201 });
  } catch (error) {
    console.error('Create complaint error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
