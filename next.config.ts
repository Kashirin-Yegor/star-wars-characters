import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
