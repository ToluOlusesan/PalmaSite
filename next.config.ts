import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root — a stray lockfile in a parent dir otherwise
  // makes Next.js guess wrong.
  turbopack: { root: __dirname },

  experimental: {
    // The family page hands off to a product page by *morphing* the chosen
    // product tile into that product's hero, rather than cutting between two
    // unrelated screens. That continuity is the whole point of a chooser, and
    // React's <ViewTransition> needs this flag to fire on route navigation.
    viewTransition: true,
  },
};

export default nextConfig;
