import { NextResponse } from 'next/server';

export function middleware(request) {
  const token =  localStorage.getItem('token');
  const publicPaths = ['/login', '/signup'];

  if (!publicPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}
