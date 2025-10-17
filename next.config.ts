import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // Required for Docker deployment

  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // Enable React Compiler (experimental)
  experimental: {
    reactCompiler: true,
  },
};

export default nextConfig;
