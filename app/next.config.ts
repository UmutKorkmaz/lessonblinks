import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/actions.json",
        destination: "/api/actions.json",
      },
    ];
  },
};

export default nextConfig;