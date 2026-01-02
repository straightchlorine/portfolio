import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // Required for Docker deployment

  // Performance optimizations
  compress: true,
  poweredByHeader: false,

  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // 1 year cache for optimized images
  },

  // Experimental features
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react'],
  },

  // Security headers (CSP is now in middleware.ts for nonce support)
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
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
