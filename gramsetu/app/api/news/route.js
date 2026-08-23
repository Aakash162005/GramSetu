import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(request) {
  try {
    const news = await prisma.villageNews.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json(news);
  } catch (error) {
    console.error('Error fetching village news:', error);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, content, category } = body;
    
    // In a real app, verify user is an admin here before creating
    
    const newsPost = await prisma.villageNews.create({
      data: {
        title,
        content,
        category: category || 'News'
      }
    });
    
    return NextResponse.json(newsPost, { status: 201 });
  } catch (error) {
    console.error('Error creating village news:', error);
    return NextResponse.json({ error: 'Failed to create news post' }, { status: 500 });
  }
}
