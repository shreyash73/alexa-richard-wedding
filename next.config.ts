import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // Served at the root of the custom domain (bhumikavaidya.com), so no basePath.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
