import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    const notices = await prisma.notice.findMany({
      orderBy: { date: 'desc' }
    });
    return NextResponse.json(notices, { status: 200 });
  } catch (error) {
    console.error('Fetch notices error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, content, type, date } = body;
    const notice = await prisma.notice.create({
      data: {
        title,
        content,
        type,
        date: new Date(date)
      }
    });
    return NextResponse.json(notice, { status: 201 });
  } catch (error) {
    console.error('Create notice error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
