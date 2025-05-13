// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isStatic = pathname.startsWith('/_next') || pathname === '/favicon.ico';
  const isHome = pathname === '/home';

  if (!isStatic && !isHome) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  return NextResponse.next();
}
