import type { Metadata, Viewport } from "next";
import { Inter, DM_Serif_Display, Pinyon_Script } from "next/font/google";
import { SiteNav } from "@/components/shell/SiteNav";
import { SiteFooter } from "@/components/shell/SiteFooter";
import { family } from "@/lib/content";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-dm-serif",
  display: "swap",
});

const pinyon = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pinyon",
  display: "swap",
});

// Resolve the canonical site URL from the build environment so social
// previews resolve to the right domain (og:image must be absolute). Vercel
// exposes the production domain as `VERCEL_PROJECT_PRODUCTION_URL` and the
// per-deployment host as `VERCEL_URL`. Set `NEXT_PUBLIC_SITE_URL` to pin a
// custom domain (e.g. https://palmaboard.com) once it's live.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://palmaboard.com");

const DESCRIPTION =
  "Palmaboard is two local-first Windows apps: Palma Canvas for references, moodboards and video stills, and PalmaNote for pages, notes and lists. No cloud, no account, no AI. Free, forever.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    // The family page says the family's name; every product page appends it,
    // so a shared tab or search result always shows which house it belongs to.
    default: `${family.name}: ${family.tagline}`,
    template: `%s · ${family.name}`,
  },
  description: DESCRIPTION,
  applicationName: family.name,
  keywords: [
    "Palmaboard",
    "Palma Canvas",
    "PalmaNote",
    "moodboard",
    "reference board",
    "note taking",
    "motion design",
    "local-first",
    "creative workspace",
    "Spatial Foundry",
  ],
  authors: [{ name: family.maker }],
  creator: family.maker,
  // OG/Twitter images come from the file-convention `opengraph-image.png` /
  // `twitter-image.png` in this folder (with matching `.alt.txt`), so they stay
  // the single source of truth — no `images` array needed here.
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: family.name,
    title: `${family.name}: ${family.tagline}`,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${family.name}: ${family.tagline}`,
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmSerif.variable} ${pinyon.variable}`}
    >
      <body className="antialiased">
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-[14px] focus:text-paper"
        >
          Skip to content
        </a>
        <SiteNav />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
