import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    'localhost:3000',
    '192.168.1.29:3000',
    '192.168.1.29',
  ]
};

export default nextConfig;
