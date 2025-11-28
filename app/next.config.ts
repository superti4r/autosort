import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    'localhost',
    'localhost:3000',
    '192.168.1.29',
    '192.168.1.29:3000',
    '0.0.0.0',
    '0.0.0.0:3000',
  ]
};

export default nextConfig;
