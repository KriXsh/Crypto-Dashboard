import { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@react-financial-charts/core",
    "@react-financial-charts/axes",
    "@react-financial-charts/series",
    "@react-financial-charts/tooltip",
    "@react-financial-charts/scales",
    "@react-financial-charts/coordinates",
  ],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        os: false,
      };
    }
    return config;
  },
};

export default nextConfig;
