/**
 * Single source of truth for site copy. Components stay about layout;
 * the marketing lives here.
 */

export const site = {
  name: "Palma",
  domain: "palma.design",
  maker: "Spatial Foundry",
  tagline: "Your creative process. Contained.",
  year: new Date().getFullYear(),
  /** Current Windows release. Shown as the version label; the download URL below
   *  is a stable "latest release" permalink, so it never needs touching. */
  version: "1.1.3",
  /** GitHub redirects this to the newest release's `Palma-Setup.exe` asset, so
   *  each new release is picked up automatically — no per-version edits. */
  downloadUrl:
    "https://github.com/ToluOlusesan/PalmaStudio/releases/latest/download/Palma-Setup.exe",
  /** The user guide PDF, served straight from /public. */
  guideUrl: "/Palma-User-Guide.pdf",
};

/** The four essential tools, each shown with an animated caricature screen. */
export type ToolId = "dump" | "comments" | "video-to-shot" | "focus" | "scratchpad";

export type Tool = {
  id: ToolId;
  index: string;
  name: string;
  blurb: string;
};

export const tools: Tool[] = [
  {
    id: "dump",
    index: "01",
    name: "Dump",
    blurb:
      "Your good old moodboard. Fling images, video and screenshots onto an infinite canvas, then arrange them once the idea's ready.",
  },
  {
    id: "comments",
    index: "02",
    name: "Comments",
    blurb:
      "Pin a note to anything. Mark references up with comments that live right on the board, exactly where they matter.",
  },
  {
    id: "video-to-shot",
    index: "03",
    name: "Video to Screenshot",
    blurb:
      "Find the moment you want in any video reference and lift it out as a clean still. One click, right on the board, with no separate player or export step.",
  },
  {
    id: "scratchpad",
    index: "04",
    name: "Scratchpad",
    blurb:
      "A writing space that lives beside the board. Draft briefs, treatments and shot notes in proper rich text: headings, lists, quotes, code.",
  },
];

/** Icon keys map to lucide-react icons in Principles.tsx. */
export type PrincipleIcon =
  | "hard-drive"
  | "cloud-off"
  | "infinity"
  | "zap"
  | "camera";

export type Principle = {
  icon: PrincipleIcon;
  title: string;
  body: string;
};

/** Five cards, arranged into a bento layout. */
export const principles: Principle[] = [
  {
    icon: "hard-drive",
    title: "Local-first, by design",
    body: "Everything lives on your machine. On a plane, in a basement, offline for a week. Palma doesn't notice and doesn't care. It just opens.",
  },
  {
    icon: "cloud-off",
    title: "No cloud, no account",
    body: "Nothing to sign up for. Nothing uploaded. Your unreleased work and half-formed ideas never leave your disk, because there's nowhere for them to go.",
  },
  {
    icon: "infinity",
    title: "Free, forever",
    body: "Not a subscription waiting to happen. No seats, no tiers, no upsell. It's a tool. You own it. That's the whole deal.",
  },
  {
    icon: "zap",
    title: "Native-speed canvas",
    body: "Thousands of assets, scrub-smooth video, zero spinners. It keeps up with the part of you that's already three ideas ahead.",
  },
  {
    icon: "camera",
    title: "Video to screenshot",
    body: "Reference footage stays playable on the board. Park it on the right frame, grab the still, and it drops in place. The player and the canvas are the same surface.",
  },
];
