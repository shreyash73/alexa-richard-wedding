import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/alexa-richard-wedding',
  assetPrefix: '/alexa-richard-wedding/',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
