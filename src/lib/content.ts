/**
 * Single source of truth for site copy. Components stay about layout;
 * the marketing lives here.
 *
 * The shape mirrors the brand: one `family` (Palmaboard) with two `products`
 * hanging off it. Anything true of both apps lives at the family level and is
 * written once — the local-first promise, the maker, the socials — so the two
 * product pages can never drift into telling different stories about the same
 * thing.
 */

export type ProductId = "canvas" | "note";

/* ------------------------------------------------------------------ family */

export const family = {
  name: "Palmaboard",
  domain: "palma.design",
  maker: "Spatial Foundry",
  /** Said in the nav, the OG card and the hero. Keep them agreeing. */
  tagline: "Two apps. One way of working.",
  year: new Date().getFullYear(),
  /** Feedback lands straight in the maker's inbox — no support desk, no form. */
  feedbackEmail: "olusesantolu@gmail.com",
  /** The maker's portfolio. */
  portfolioUrl: "https://olusesantolu.com",
};

/**
 * Kept as `site` because a dozen call sites already read `site.feedbackEmail`
 * and `site.portfolioUrl`, and the family *is* the site.
 */
export const site = family;

/* ---------------------------------------------------------------- products */

export type ProductStatus = "available" | "coming-soon";

/**
 * A display headline, rendered `lead` → `accent` → `tail`. `accent` is set in
 * the script face — one flourished word per headline, and it has to be short,
 * because Pinyon Script stops being readable past about six letters at display
 * size.
 *
 * `typed` is the same sentence cut into segments, for the product whose
 * headline writes itself in. `"\n"` is a line break. Only PalmaNote sets it:
 * a typing animation is an argument about the product, and on an app for
 * looking at pictures it would just be decoration.
 */
export type Headline = {
  lead: string;
  accent: string;
  tail: string;
  typed?: { text: string; script?: boolean }[];
};

export type Product = {
  id: ProductId;
  /** Full name, as written in prose and titles. */
  name: string;
  /** What the nav switcher says — the name minus the family prefix. */
  short: string;
  href: string;
  /** One line, sentence case, no full stop. Shown under the name on a tile. */
  kicker: string;
  /** The product page's display headline. */
  headline: Headline;
  /** The paragraph under the headline. */
  lede: string;
  /** One sentence for the family tile. Shorter than the lede. */
  blurb: string;
  status: ProductStatus;
  /** Shown as the version label next to the download. */
  version?: string;
  /** A stable "latest release" permalink, so it never needs touching. */
  downloadUrl?: string;
  /** A PDF guide served straight from /public. */
  guideUrl?: string;
  /** What the status chip says. */
  chip: string;
};

export const products: Record<ProductId, Product> = {
  canvas: {
    id: "canvas",
    name: "Palma Canvas",
    short: "Canvas",
    href: "/canvas",
    kicker: "For looking",
    headline: { lead: "Your reference board, finally", accent: "alive", tail: "." },
    lede:
      "Fling every image, clip and screenshot onto an infinite board. Mark them up, sort the keepers into focus zones, and hand a client a finished moodboard. All of it on your own machine.",
    blurb:
      "An infinite board for references — images, video, screenshots — that ends in a moodboard you can hand over.",
    status: "available",
    version: "1.1.6",
    downloadUrl:
      "https://github.com/ToluOlusesan/PalmaStudio/releases/latest/download/Palma-Setup.exe",
    guideUrl: "/Palma-User-Guide.pdf",
    chip: "Windows · Free, forever",
  },
  note: {
    id: "note",
    name: "PalmaNote",
    short: "Note",
    href: "/note",
    kicker: "For writing",
    headline: {
      lead: "Write it down. That's the",
      accent: "whole",
      tail: " app.",
      typed: [
        { text: "Write it down." },
        { text: "\n" },
        { text: "That's the " },
        { text: "whole" },
        { text: " app." },
      ],
    },
    lede:
      "A small, local place to keep pages, notes and lists. Blocks you can move, pages that link to each other, and stickies that live beside the writing instead of in it. One file, on your own disk.",
    blurb:
      "A quiet writing app for pages, notes and lists — one file on your disk, and nothing else.",
    status: "coming-soon",
    chip: "Windows · Coming soon",
  },
};

export const productList: Product[] = [products.canvas, products.note];

/* ----------------------------------------------------------------- socials */

/** Icon keys map to the inline brand SVGs in SiteFooter.tsx. */
export type SocialId = "instagram" | "x" | "behance" | "linkedin";

export type Social = {
  id: SocialId;
  label: string;
  href: string;
};

export const socials: Social[] = [
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/sesan.3d/",
  },
  { id: "x", label: "X", href: "https://x.com/olusesan__tolu" },
  {
    id: "behance",
    label: "Behance",
    href: "https://www.behance.net/olusesanvictor",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/olusesan-tolulope-870203287/",
  },
];

/* ----------------------------------------------------------- the comparison
   The one question a family page has to answer. Rows are written so the two
   columns are genuinely different answers, never the same claim in two
   voices — a compare table where both columns say "fast and local" teaches
   nobody anything. */

export type CompareRow = {
  label: string;
  canvas: string;
  note: string;
};

export const compare: CompareRow[] = [
  {
    label: "Reach for it when",
    canvas: "You're gathering the look of a thing and don't know what it is yet",
    note: "You need the words, the plan or the list out of your head",
  },
  {
    label: "The unit of work",
    canvas: "A board — infinite, zoomable, spatial",
    note: "A page — nested, linkable, one thing at a time",
  },
  {
    label: "What it holds",
    canvas: "Images, video, screenshots, comments, focus zones",
    note: "Text blocks, headings, tasks, stickies, links between pages",
  },
  {
    label: "You leave with",
    canvas: "An exported moodboard or a full process brief, as a PDF",
    note: "A page you can read back, and a count of what you wrote",
  },
  {
    label: "Where it keeps things",
    canvas: "A project folder you can see, full of your actual files",
    note: "One file on your disk, and nothing else",
  },
];

/* -------------------------------------------------- what both apps promise */

export type PrincipleIcon = "hard-drive" | "cloud-off" | "infinity" | "user";

export type Principle = {
  icon: PrincipleIcon;
  title: string;
  body: string;
};

/** True of both apps, so it is stated once and shown on every page. */
export const principles: Principle[] = [
  {
    icon: "hard-drive",
    title: "Local-first, by design",
    body: "Everything lives on your machine. On a plane, in a basement, offline for a week — neither app notices, and neither cares. They just open.",
  },
  {
    icon: "cloud-off",
    title: "No cloud, no account, no AI",
    body: "Nothing to sign up for. Nothing uploaded. Your unreleased work and half-formed sentences never leave your disk, because there is nowhere for them to go.",
  },
  {
    icon: "infinity",
    title: "Free, forever",
    body: "Not a subscription waiting to happen. No seats, no tiers, no upsell. They're tools. You own them. That's the whole deal.",
  },
  {
    icon: "user",
    title: "Built for one person first",
    body: "Both apps started as something their maker needed on a Tuesday. Nothing is in here to widen a market — only because the work asked for it.",
  },
];

/* ------------------------------------------------------- Canvas: the story
   One band of animated caricatures, not two. A second grid of the same shape
   read as a repeat of the first, and it was drawings of an app that exists —
   CloseUpBand shows real crops of the real screenshot instead. */

/** Names a caricature scene in ToolCaricatures.tsx. */
export type ToolId = "dump" | "focus" | "export";

export type Step = {
  id: ToolId;
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

/* --------------------------------------------------------- Canvas: releases
   Newest first; the section features the top entry. Keep items short and
   human — this is a changelog a designer reads, not a commit log. */

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

/* ---------------------------------------------------------- Note: the story
   Three captions that sit under the window shot, then the deeper sections.
   Kept parallel in shape to Canvas's `steps` so the two product pages read as
   siblings rather than two eras of the same site. */

export type NoteFeature = {
  n: string;
  title: string;
  blurb: string;
};

export const noteCaptions: NoteFeature[] = [
  {
    n: "01",
    title: "Pages nest, and link to each other",
    blurb:
      "Type @ to mention another page. Rename it later and every mention follows.",
  },
  {
    n: "02",
    title: "Every block is an object",
    blurb:
      "Reach into the margin for a handle and a +, or move a block with Alt Shift ↑.",
  },
  {
    n: "03",
    title: "Stickies live beside the page, not in it",
    blurb:
      "Ctrl Space parks a note in the rail. It never exports and never counts toward your words.",
  },
];
