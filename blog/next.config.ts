import type { NextConfig } from "next";
import { withContentlayer } from "next-contentlayer2";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    mdxRs: true,
  },
};

export default withContentlayer(nextConfig);
