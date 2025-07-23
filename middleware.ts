// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATHS = ['/login', '/signup', '/_next', '/favicon.ico'];

export function middleware(req: NextRequest) {
  if (PUBLIC_PATHS.some((p) => req.nextUrl.pathname.startsWith(p))) return NextResponse.next();

  const token = req.cookies.get('sb-access-token');
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
