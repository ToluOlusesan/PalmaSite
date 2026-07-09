import type { Metadata, Viewport } from "next";
import { Inter, DM_Serif_Display, Pinyon_Script } from "next/font/google";
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
// custom domain (e.g. https://palma.design) once it's live.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://palma.design");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Palma: Your reference board, finally alive.",
    template: "%s · Palma",
  },
  description:
    "Palma is a local-first creative workspace for motion and 3D designers. Drop your references, mark them up, then sort them into focus zones and export a brief, all on your machine. No cloud. No account. Free, forever.",
  applicationName: "Palma",
  keywords: [
    "Palma",
    "moodboard",
    "reference board",
    "motion design",
    "3D design",
    "local-first",
    "creative workspace",
    "Spatial Foundry",
  ],
  authors: [{ name: "Spatial Foundry" }],
  creator: "Spatial Foundry",
  // OG/Twitter images come from the file-convention `opengraph-image.png` /
  // `twitter-image.png` in this folder (with matching `.alt.txt`), so they stay
  // the single source of truth — no `images` array needed here.
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Palma",
    title: "Palma: Your reference board, finally alive.",
    description:
      "A local-first creative workspace for motion and 3D designers. No cloud. No clutter. Just your work.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Palma: Your reference board, finally alive.",
    description:
      "A local-first creative workspace for motion and 3D designers. No cloud. No clutter. Just your work.",
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
