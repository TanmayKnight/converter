import type { NextConfig } from "next";

import withPWA from "@ducanh2912/next-pwa";

const nextConfig: NextConfig = {
  transpilePackages: ['pdfjs-dist', 'react-pdf'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
      fs: false,
      path: false,
      punycode: false,
    };
    return config;
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
        ],
      },
    ];
  },
};

export default withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  // Exclude Google Ads and Analytics from Service Worker caching
  // Force Service Worker to update immediately
  workboxOptions: {
    skipWaiting: true,
    clientsClaim: true,
  },
})(nextConfig);
