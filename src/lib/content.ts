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
};

/** The four essential tools, each shown with an animated caricature screen. */
export type ToolId = "dump" | "comments" | "video-to-shot" | "curate";

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
      "Your good old moodboard. Fling images, video and screenshots onto an infinite canvas — arrange them once the idea's ready.",
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
      "Pull a clean still from any video reference in one click — no scrubbing to the frame, no exporting, no detour.",
  },
  {
    id: "curate",
    index: "04",
    name: "Curate",
    blurb:
      "Cull the dump down to the keepers. Star what's working, let the rest fall away, until only the strong refs remain.",
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
    body: "Everything lives on your machine. On a plane, in a basement, offline for a week — Palma doesn't notice and doesn't care. It just opens.",
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
    body: "Pull a clean still from any video reference in one click — no scrubbing to the right frame, no exporting, no detour through another app.",
  },
];
