import type { NextConfig } from "next";

/**
 * Where the PalmaNote browser build actually lives.
 *
 * It is published by that app's own repository, on its own workflow, at a
 * stable permalink with no version in it — the same arrangement as Canvas's
 * installer. This site proxies it rather than hosting a copy, so shipping a
 * new build never touches the website, and the website never carries two and a
 * half megabytes of somebody else's bundle.
 */
const NOTE_APP = "https://toluolusesan.github.io/palmanote";

const nextConfig: NextConfig = {
  // Pin the workspace root — a stray lockfile in a parent dir otherwise
  // makes Next.js guess wrong.
  turbopack: { root: __dirname },

  /**
   * The app is served from *this* origin, at /note/app/, and that matters for
   * more than the look of the URL: a browser's storage belongs to an origin,
   * so pages written at one address do not follow you to another. Choosing the
   * address people are given is therefore a one-time decision, and this is it.
   *
   * The trailing slash is load-bearing. Every path inside the app is relative
   * (`./assets/…`), which is what lets the identical build run over file:// in
   * the desktop shell — so at /note/app those paths resolve against /note/ and
   * the page comes up blank.
   *
   * Adding the slash back is `middleware.ts` rather than a `redirects()` entry,
   * because a redirect's matcher treats /note/app and /note/app/ as the same
   * path and sends the slashed form to itself forever. Middleware is the only
   * layer that can see which of the two was actually asked for.
   *
   * `skipTrailingSlashRedirect` then stops Next helpfully stripping the slash
   * straight back off again.
   */
  skipTrailingSlashRedirect: true,

  async rewrites() {
    return [
      { source: "/note/app/", destination: `${NOTE_APP}/` },
      { source: "/note/app/:path*", destination: `${NOTE_APP}/:path*` },
    ];
  },

  experimental: {
    // The family page hands off to a product page by *morphing* the chosen
    // product tile into that product's hero, rather than cutting between two
    // unrelated screens. That continuity is the whole point of a chooser, and
    // React's <ViewTransition> needs this flag to fire on route navigation.
    viewTransition: true,
  },
};

export default nextConfig;
