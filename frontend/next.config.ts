import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "cliakorea.kr",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.railway.app", // 실제 백엔드 도메인
        pathname: "/**",
      },
    ],
    qualities: [75, 100],
  },
};

export default nextConfig;
