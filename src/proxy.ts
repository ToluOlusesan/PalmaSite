import { NextResponse, type NextRequest } from "next/server";

/**
 * One job: put the trailing slash back on /note/app.
 *
 * The PalmaNote browser build is proxied in at /note/app/ (see the rewrites in
 * next.config.ts), and every path inside it is relative — `./assets/…` — which
 * is what lets one build run from a domain root, from a subdirectory, and over
 * file:// in the desktop shell. Asked for without the slash, those paths
 * resolve against /note/ and the app comes up as a blank page.
 *
 * This cannot be a `redirects()` entry: that matcher considers /note/app and
 * /note/app/ the same route, so the slashed form matches too and redirects to
 * itself until the browser gives up. The proxy sees the raw pathname, so it
 * can act on exactly one of the two.
 */
export default function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/note/app") {
    // An ordinary URL rather than `nextUrl.clone()`. A NextURL normalises
    // itself against the site's `trailingSlash` setting, which is false, so
    // cloning and adding the slash produces a redirect to the slashless path
    // we are standing on — a loop the browser follows twenty times before
    // giving up. A plain URL is left exactly as written.
    const url = new URL("/note/app/", request.url);
    url.search = request.nextUrl.search;
    // 308 rather than 307: permanent, and a GET, so it is worth caching.
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = { matcher: "/note/app" };
