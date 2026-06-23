import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root — a stray lockfile in a parent dir otherwise
  // makes Next.js guess wrong.
  turbopack: { root: __dirname },
};

export default nextConfig;
