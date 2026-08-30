import type { Metadata, Viewport } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
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
  "Free, local-first tools for designers: Palma Canvas turns references into visual direction; PalmaNote keeps notes, plans and drafts in one place. No account or subscription.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    // The family page says the family's name; every product page appends it,
    // so a shared tab or search result always shows which house it belongs to.
    default: `${family.name}: Free local-first tools for designers`,
    template: `%s · ${family.name}`,
  },
  description: DESCRIPTION,
  applicationName: family.name,
  keywords: [
    "Palmaboard",
    "Palma Canvas",
    "PalmaNote",
    "offline moodboard app",
    "storyboard app",
    "moodboard",
    "reference board",
    "visual direction",
    "designers",
    "graphic design",
    "product design",
    "interior design",
    "UI design",
    "note taking",
    "motion design",
    "3D design",
    "local-first",
    "creative workspace",
    "Tolu Olusesan",
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
      className={`${inter.variable} ${dmSerif.variable}`}
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
