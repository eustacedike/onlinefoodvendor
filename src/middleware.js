// middleware.js
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('auth_token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

// 👇 Protect only certain routes
export const config = {
  matcher: ['/pile'],
//   matcher: ['/profile/:path*'],
};
