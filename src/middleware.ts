
import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Routes that need Supabase session protection
  const protectedRoutes = ['/profile'];
  
  let response: NextResponse;
  
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    // Only run Supabase session update for protected routes
    response = await updateSession(request);
  } else {
    // For all other routes, just continue without Supabase checks
    response = NextResponse.next();
  }
  
  // Add headers for all routes (for layout switching)
  response.headers.set('x-pathname', pathname);
  response.headers.set('x-url', request.url);
  
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};