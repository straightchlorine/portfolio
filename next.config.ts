import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // Required for Docker deployment

  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Content Security Policy
          // Prevents XSS, clickjacking, and code injection attacks
          {
            key: 'Content-Security-Policy',
            value: [
              // Default source - restrict everything to self unless explicitly allowed
              "default-src 'self'",

              // Scripts: self + trusted analytics (Rybbit)
              // Note: Next.js inlines critical CSS and uses nonces for other inline scripts
              "script-src 'self' https://app.rybbit.io/api/script.js 'unsafe-inline'",

              // Styles: self + Google Fonts + inline (required for Tailwind)
              "style-src 'self' https://fonts.googleapis.com 'unsafe-inline'",

              // Fonts: self + Google Fonts
              "font-src 'self' https://fonts.gstatic.com",

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

              // Prevent prefetching to external sites
              "prefetch-src 'self'",

              // Require HTTPS for upgradeable requests
              "upgrade-insecure-requests",

              // Report violations (comment out if you don't have a report endpoint)
              // "report-uri https://your-domain.com/api/csp-report",
            ].join('; '),
          },

          // X-Content-Type-Options: Prevent MIME type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },

          // X-Frame-Options: Prevent clickjacking by disallowing embedding in frames
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },

          // X-XSS-Protection: Legacy browser XSS protection (redundant with CSP, but good for older browsers)
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },

          // Referrer-Policy: Control how much referrer information is shared
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },

          // Permissions-Policy (formerly Feature-Policy): Restrict browser features
          {
            key: 'Permissions-Policy',
            value: [
              'geolocation=()',
              'microphone=()',
              'camera=()',
              'payment=()',
              'usb=()',
              'accelerometer=()',
              'gyroscope=()',
              'magnetometer=()',
            ].join(', '),
          },

          // HSTS: Force HTTPS (only enable in production)
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
