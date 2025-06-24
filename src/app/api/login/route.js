// app/api/login/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
  const { email, password } = await request.json();

  // ✅ Validate credentials (e.g., check database)
  const isValidUser = email === 'eustacedyke@gmail.com' && password === 'pass123';

  if (!isValidUser) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  // 🔐 Create a fake JWT or session token (in real cases, get from your auth system)
  const token = 'mock-token';

  const response = NextResponse.json({ message: 'Login successful' });

  // 🍪 Set HTTP-only cookie
  response.cookies.set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24, // 1 day
  });

  return response;
}
