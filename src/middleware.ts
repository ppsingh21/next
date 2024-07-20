// src/middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Check if the user is trying to access admin routes
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const isAuthenticated = req.cookies.get('admin-auth');

    // Redirect to login page if not authenticated
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  // Allow request to continue
  return NextResponse.next();
}

// Configure paths to apply the middleware
export const config = {
  matcher: ['/admin/:path*'],
};
