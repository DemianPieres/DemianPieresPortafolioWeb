import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { qualities: [75, 95] },
  outputFileTracingIncludes: { "/cv": ["./docs/DemianPieres.pdf"] },
};
export default nextConfig;
