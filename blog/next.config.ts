import type { NextConfig } from "next";
import { withContentlayer } from "next-contentlayer2";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  trailingSlash: true,
  assetPrefix: "/TIL",
  basePath: "/TIL",
  images: {
    unoptimized: true,
  },
  experimental: {
    mdxRs: true,
  },
};

export default withContentlayer(nextConfig);
