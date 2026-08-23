import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const role = url.searchParams.get('role');
    
    // In a real app, you would check session/JWT here to ensure admin access.
    
    const users = await prisma.user.findMany({
      where: role ? { role } : undefined,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        phone: true,
        village: true,
        role: true,
        isBlocked: true,
        createdAt: true
      }
    });
    
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { userId, isBlocked } = body;
    
    const user = await prisma.user.update({
      where: { id: userId },
      data: { isBlocked }
    });
    
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error updating user block status:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}
