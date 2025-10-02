import { NextResponse } from 'next/server';

export function middleware(request) {
    // Get the pathname of the request (e.g. /, /sign-in, /about-us)
    const { pathname } = request.nextUrl;

    // Debug logging
    console.log(`[Middleware] Processing: ${pathname}`);

    // Define paths that don't require authentication
    const publicPaths = [
        '/sign-in',
        '/create-account',
        '/api/auth/guest-login',
        '/favicon.ico',
        '/_next',
        '/img',
        '/fonts',
        '/sass',
        '/public'
    ];

    // All other API routes require authentication and should be handled by the API routes themselves
    // We'll let them through the middleware but they will handle their own auth checks

    // Check if the current path is public (doesn't require authentication)
    const isPublicPath = publicPaths.some(path =>
        pathname.startsWith(path) || pathname === path
    );

    // Allow all API routes to pass through (they handle their own auth)
    const isApiRoute = pathname.startsWith('/api/');

    // If it's a public path or API route, allow the request to continue
    if (isPublicPath || isApiRoute) {
        console.log(`[Middleware] Allowing public/API path: ${pathname}`);
        return NextResponse.next();
    }

    // Check for authentication cookie
    const accessToken = request.cookies.get('accesstoken');

    // If no access token is found, redirect to sign-in page
    if (!accessToken || !accessToken.value) {
        console.log(`[Middleware] No access token found for: ${pathname}`);
        // Avoid infinite redirects by checking if already on sign-in page
        if (pathname === '/sign-in') {
            return NextResponse.next();
        }

        console.log(`[Middleware] Redirecting to sign-in: ${pathname}`);
        const signInUrl = new URL('/sign-in', request.url);
        return NextResponse.redirect(signInUrl);
    }

    // If authenticated, allow the request to continue
    return NextResponse.next();
}

export const config = {
    // Match all paths except static files and specific API routes
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next (all Next.js internal files)
         * - favicon.ico (favicon file)
         * - public folder files (img, fonts, sass, public)
         * Note: API routes are handled within the middleware function
         */
        '/((?!_next|favicon.ico|img|fonts|sass|public).*)',
    ],
};
