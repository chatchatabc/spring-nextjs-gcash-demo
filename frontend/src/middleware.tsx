// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  let cookies = request.cookies.getAll();
  console.log(cookies);
  console.log('here', request.url);

  const isLoggedIn = !!request.cookies.get('token');

  // Redirect based on user's login status
  const authPages = ['/admin', '/profile'];
  const nonAuthPages = ['/login', '/register'];
  const isAuthPage = authPages.includes(request.nextUrl.pathname);
  if (isAuthPage && !isLoggedIn) {
    return NextResponse.rewrite(new URL('/login', request.url));
  } else if (nonAuthPages.includes(request.nextUrl.pathname) && isLoggedIn) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    // '/login',
    // '/register',
    // '/admin/:path*',
    // '/profile/:path*',
  ],
};
