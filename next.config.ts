import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: { "/cv": ["./docs/DemianPieres.pdf"] },
};
export default nextConfig;
