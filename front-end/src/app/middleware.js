import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request) {
  // Check if the route is not signup and if token exists in the cookie (use cookie-based storage or headers)
  const token = request.cookies.get('auth_token'); // If token is stored in cookie
  const url = request.nextUrl.pathname;

  // Allow signup route to pass without token
  if (url === '/signup') {
    return NextResponse.next();
  }

  // If no token, redirect to signup
  if (!token) {
    return NextResponse.redirect(new URL('/signup', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/category', '/profile', '/settings', '/'], // Add other routes that should be protected
};
