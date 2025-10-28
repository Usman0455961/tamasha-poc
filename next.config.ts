import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable React Strict Mode (recommended)
  reactStrictMode: true,

  // Optional: Allow images from your IdP (if you serve logo from backend)
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/**',
      },
    ],
  },

  // Optional: Add CORS headers for /callback route (useful in dev)
  async headers() {
    return [
      {
        source: '/callback',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*', // In production, replace with your domains
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, OPTIONS',
          },
        ],
      },
    ];
  },

  // Optional: Custom webpack config (rarely needed)
  // webpack(config) {
  //   return config;
  // },
};

export default nextConfig;