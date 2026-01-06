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
    ],
    qualities: [75, 100],
  },
};

export default nextConfig;
