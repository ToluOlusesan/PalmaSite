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
  version: "1.1.6",
  /** GitHub redirects this to the newest release's `Palma-Setup.exe` asset, so
   *  each new release is picked up automatically — no per-version edits. */
  downloadUrl:
    "https://github.com/ToluOlusesan/PalmaStudio/releases/latest/download/Palma-Setup.exe",
  /** The user guide PDF, served straight from /public. */
  guideUrl: "/Palma-User-Guide.pdf",
};

/** The four essential tools, each shown with an animated caricature screen.
 *  `export` is caricature-only (no tool-rail card) — it powers the third step
 *  of the "How it works" band below. */
export type ToolId =
  | "dump"
  | "comments"
  | "video-to-shot"
  | "focus"
  | "scratchpad"
  | "export";

export type Tool = {
  id: ToolId;
  index: string;
  name: string;
  blurb: string;
};

export const tools: Tool[] = [
  {
    id: "comments",
    index: "01",
    name: "Comments",
    blurb:
      "Pin a note to anything. Mark references up with comments that live right on the board.",
  },
  {
    id: "video-to-shot",
    index: "02",
    name: "Video to Screenshot",
    blurb:
      "Find the moment you want in any video reference and lift it out as a clean still.",
  },
  {
    id: "scratchpad",
    index: "03",
    name: "Notes",
    blurb:
      "A writing space that lives beside the board. Draft briefs and treatments right where the references are.",
  },
];

/** The three-step story shown in the "How it works" band. Each step reuses one
 *  of the animated caricatures (gather → the Dump board, curate → Focus,
 *  export → the Export dialog), so there's one set of art, not two. */
export type StepId = Extract<ToolId, "dump" | "focus" | "export">;

export type Step = {
  id: StepId;
  n: string;
  title: string;
  blurb: string;
};

export const steps: Step[] = [
  {
    id: "dump",
    n: "01",
    title: "Gather your references",
    blurb:
      "Fling images, video and screenshots onto an infinite Dump Board. Hover any image and send the keepers straight to Focus.",
  },
  {
    id: "focus",
    n: "02",
    title: "Curate in Focus mode",
    blurb:
      "Sort the keepers into named zones: colour, texture, motion. Zones tidy themselves, and placed refs leave the queue. What survives is the direction.",
  },
  {
    id: "export",
    n: "03",
    title: "Export a moodboard for your clients",
    blurb:
      "One dropdown, one click: a polished board or a full process brief, light or dark, ready to hand off. No account, nothing uploaded.",
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

/** Release notes shown in the "What's new" band. Newest first; the section
 *  features the top entry. Keep items short and human — this is a changelog a
 *  designer reads, not a commit log. */
export type ReleaseGroupKind = "new" | "refined" | "fixed";

export type ReleaseNote = {
  version: string;
  date: string;
  headline: string;
  groups: { kind: ReleaseGroupKind; items: string[] }[];
};

export const releases: ReleaseNote[] = [
  {
    version: "1.1.6",
    date: "July 2026",
    headline: "Sharper Focus, tidier Notes, and references that stay put.",
    groups: [
      {
        kind: "new",
        items: [
          "Notes now do checklists — tick tasks off as you go.",
          "Pick exactly which Focus zones go into an export, instead of the whole board.",
          "The Focus board PDF is now a polished, one-zone-per-page document — with your pinned notes and comments — in light or dark.",
          "Pin notes to a Focus zone: a per-zone button, or drag any note onto a zone to attach it.",
          "Preview a project's images right from the Trash before you restore or purge it.",
          "Copy and paste on the canvas right-click menu — including screenshots from the clipboard.",
        ],
      },
      {
        kind: "refined",
        items: [
          "Sending a reference to Focus now sweeps a rainbow rim around the card.",
          "Connectors between references are curved, and read clearly in dark mode.",
          "Focus zone comments can be recoloured and resized.",
        ],
      },
      {
        kind: "fixed",
        items: [
          "Images dragged in from a browser are now saved into the project, not a temporary folder that later clears.",
          "On-canvas controls stay crisp and correctly sized at every zoom level.",
          "Long notes scroll with the wheel, and the Library stays light no matter how much you've loaded.",
        ],
      },
    ],
  },
];

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
