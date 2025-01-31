// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Configure which paths should be protected
const protectedPaths = ['/userCategory', '/userCart', '/userOrder','/catgegory','/order','/products','/userProduct']
const publicPaths = ['/login', '/signup']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Get auth token from cookies
  const authToken = request.cookies.get('userId')?.value
  const userRole = request.cookies.get('role')?.value
  
  // Check if path should be protected
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path))

  // If path is protected and user is not authenticated, redirect to login
  if (isProtectedPath && (!authToken || !userRole)) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // If user is authenticated and tries to access login page, redirect to dashboard
  if (isPublicPath && authToken && userRole) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

// Configure which paths middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}