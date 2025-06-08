  import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://challenge-java-fgyb.onrender.com/api/:path*' // Proxy to Backend
      }
    ];
  }
};

export default nextConfig;
