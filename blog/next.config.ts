import type { NextConfig } from "next";
import { withContentlayer } from "next-contentlayer2";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  trailingSlash: true,
  assetPrefix: process.env.NODE_ENV === "production" ? "/TIL" : "",
  basePath: process.env.NODE_ENV === "production" ? "/TIL" : "",
  images: {
    unoptimized: true,
  },
  experimental: {
    mdxRs: true,
  },
};

export default withContentlayer(nextConfig);
