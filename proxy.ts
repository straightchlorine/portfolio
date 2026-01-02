import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  // Generate a random nonce for this request using crypto API
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  // Create the Content Security Policy header with nonce
  const cspHeader = [
    // Restrict everything to self unless explicitly allowed
    "default-src 'self'",

    // Scripts: self + trusted analytics (Rybbit) + Cloudflare email protection + nonce + specific script hashes
    // Note: strict-dynamic removed to allow Cloudflare's email-decode injection from same origin
    // Hashes allow specific inline scripts from Cloudflare while blocking malicious injections
    `script-src 'self' https://app.rybbit.io/api/script.js https://challenges.cloudflare.com 'nonce-${nonce}' 'sha256-YCEy2GvWrLoojmZohrvCK0TG2ozdHMebHaZ6/ZIRiLQ=' 'sha256-v5CTjXJARtV8VaFCdUh3dY9bknaW0zK+mX/3zniLiJU=' 'sha256-5KCKd3uVQRKzXXKOdxwhebtqwTeNbzlfnu/kdQYplYY='`,

    // Styles: self + nonce
    `style-src 'self' 'nonce-${nonce}'`,

    // Fonts: self
    "font-src 'self'",

    // Images: self + data URIs + https
    "img-src 'self' data: https:",

    // Media
    "media-src 'self'",

    // Objects
    "object-src 'none'",

    // Frames
    "frame-src 'none'",

    // Connections: allow XHR/fetch to self and analytics
    "connect-src 'self' https://app.rybbit.io",

    // Manifests and other special resources
    "manifest-src 'self'",

    // Missing directives for Mozilla Observatory compliance
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",

    // Require HTTPS for upgradeable requests
    "upgrade-insecure-requests",
  ].join('; ');

  // Clone the request headers
  const requestHeaders = new Headers(request.headers);

  // Set the nonce in a custom header for use in the app
  requestHeaders.set('x-nonce', nonce);

  // Create the response with updated headers
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Set the CSP header
  response.headers.set('Content-Security-Policy', cspHeader);

  return response;
}

// Configure which routes the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
