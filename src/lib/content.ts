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
  domain: "palmaboard.com",
  maker: "Tolu Olusesan",
  /** Said in the nav, the OG card and the hero. Keep them agreeing. */
  tagline: "Two apps. One way of working.",
  year: new Date().getFullYear(),
  /** The maker's portfolio. */
  portfolioUrl: "https://olusesantolu.com",
};

/* ---------------------------------------------------------------- products */

export type ProductStatus = "available" | "coming-soon";

/**
 * A display headline, rendered `lead` → `accent` → `tail`. The three fields
 * keep the copy flexible without changing the product page's single serif
 * voice.
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
  typed?: { text: string }[];
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
  /** The *installer's* status. A product can have no installer and still be usable — see `webUrl`. */
  status: ProductStatus;
  /** Shown as the version label next to the download. */
  version?: string;
  /** A stable "latest release" permalink, so it never needs touching. */
  downloadUrl?: string;
  /**
   * The same app, built for a browser, at a permalink of its own.
   *
   * Not a demo and not a cut-down preview: it is the identical source with
   * IndexedDB where the desktop build has SQLite, so it is a real way to use
   * the thing rather than a way to look at it. Where a product has one it is
   * offered first, because an app you can be inside in one press beats an
   * installer you have to trust with an unsigned certificate.
   */
  webUrl?: string;
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
    kicker: "For visual thinking",
    headline: {
      lead: "From scattered references to a",
      accent: "clear",
      tail: " direction.",
    },
    lede:
      "Palma Canvas is a free, offline workspace for designers to collect references, find the thread between them, and shape that thinking into moodboards, storyboards and briefs. Add images, video and screenshots; nothing is uploaded.",
    blurb:
      "Collect the references, find the pattern, and shape a moodboard, storyboard or brief.",
    status: "available",
    version: "1.3.1",
    downloadUrl:
      "https://github.com/ToluOlusesan/PalmaStudio/releases/latest/download/Palma-Setup.exe",
    guideUrl: "/Palma-User-Guide.pdf",
    chip: "Windows · Free to use · No account",
  },
  note: {
    id: "note",
    name: "PalmaNote",
    short: "Note",
    href: "/note",
    kicker: "For thinking in words",
    headline: {
      lead: "A quieter place to",
      accent: "think",
      tail: ".",
      typed: [
        { text: "A quieter place" },
        { text: "\n" },
        { text: "to " },
        { text: "think" },
        { text: "." },
      ],
    },
    lede:
      "Write notes, plan projects, build linked pages and keep loose thoughts beside the work. Blocks move when the structure changes, and page history keeps earlier versions close. Install it on Windows or use the full app in your browser; either way, your writing stays on your machine.",
    blurb:
      "A calm writing space for notes, plans, lists and linked pages — on Windows or in your browser.",
    status: "available",
    version: "0.2.4",
    /**
     * The same shape as Canvas's, and stable for the same reason: the release
     * carries an asset under this exact name every time, so shipping a build
     * never means editing this file.
     */
    downloadUrl:
      "https://github.com/ToluOlusesan/palmanote/releases/latest/download/PalmaNote-Setup.exe",
    /**
     * This site's own address, not the one the build is published at — see the
     * proxy in next.config.ts. The trailing slash is required: the app's paths
     * are relative, so without it the assets resolve one directory too high.
     */
    webUrl: "https://palmaboard.com/note/app/",
    chip: "Windows or your browser · Free to use · No account",
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
    canvas: "You need to see what a project should look, feel or become",
    note: "You need to think through what it should say, do or become",
  },
  {
    label: "The unit of work",
    canvas: "A freeform board — infinite, zoomable and spatial",
    note: "A linked page — focused, structured and easy to rearrange",
  },
  {
    label: "What it holds",
    canvas: "Images, video, screenshots, comments, focus zones",
    note: "Text blocks, headings, tasks, stickies, links between pages",
  },
  {
    label: "You leave with",
    canvas: "A visual direction, moodboard, storyboard or process brief",
    note: "A clearer thought, plan, draft or list",
  },
  {
    label: "Where it keeps things",
    canvas: "A project folder on your disk that you can open and inspect",
    note: "A library file on your disk — or local browser storage on the web",
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
    title: "Your work stays with you",
    body: "Both apps are designed around local storage. You can work without a connection, and what you make stays on the machine in front of you.",
  },
  {
    icon: "cloud-off",
    title: "No account. No cloud. No AI.",
    body: "Open the app and begin. There is no login, sync service, user profile or AI layer between you and the work.",
  },
  {
    icon: "infinity",
    title: "Free because they stay small",
    body: "These apps began as tools for my own work. Without accounts or paid cloud infrastructure to run, there is no recurring service bill to turn into your subscription.",
  },
  {
    icon: "user",
    title: "Made by one designer",
    body: "I design, build and use both apps. That keeps the decisions practical, development direct and the product focused on real work.",
  },
];

/* ------------------------------------------------------- Canvas: the story
   One band of animated caricatures, not two. A second grid of the same shape
   read as a repeat of the first, and it was drawings of an app that exists —
   CloseUpBand shows real crops of the real screenshot instead. */

/** Names a caricature scene in ToolCaricatures.tsx. */
export type ToolId = "dump" | "focus" | "storyboard" | "export";

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
    title: "Collect without organising first",
    blurb:
      "Drop images, video and screenshots onto an infinite board. Start messy; give the project structure only when the pattern begins to appear.",
  },
  {
    id: "focus",
    n: "02",
    title: "Find the thread in Focus",
    blurb:
      "Move the strongest references into named zones — colour, type, material, motion, composition, or whatever the project needs.",
  },
  {
    id: "storyboard",
    n: "03",
    title: "Build the sequence",
    blurb:
      "When order matters, send references into Storyboard. Each panel can carry an action, camera move and duration.",
  },
  {
    id: "export",
    n: "04",
    title: "Share the thinking",
    blurb:
      "Export a PNG or PDF, light or dark — the board as it stands, or a process brief with your notes and comments.",
  },
];

/* ---------------------------------------------------------------- releases
   Newest first; the section features the top entry. Keep items short and
   human — this is a changelog a designer reads, not a commit log.

   Two products have one now, so neither gets the bare name: `WhatsNew` takes
   the entry it renders as a prop rather than reaching for a module-level
   `releases` that quietly means Canvas. */

export type ReleaseGroupKind = "new" | "refined" | "fixed";

export type ReleaseNote = {
  version: string;
  date: string;
  headline: string;
  groups: { kind: ReleaseGroupKind; items: string[] }[];
};

export const canvasReleases: ReleaseNote[] = [
  {
    version: "1.3.1",
    date: "September 2026",
    headline: "A quicker way to inspect the references on your board.",
    groups: [
      {
        kind: "new",
        items: [
          "Double-click any image on the Dump Board or inside a Focus zone to open it full-size.",
        ],
      },
      {
        kind: "refined",
        items: [
          "Canvas and Library previews now share the same quiet, view-only presentation.",
        ],
      },
      {
        kind: "fixed",
        items: [
          "Close a preview with its backdrop, the close button or Escape without disturbing the canvas beneath it.",
        ],
      },
    ],
  },
  {
    version: "1.3.0",
    date: "August 2026",
    headline: "Storyboards, frame-accurate GIFs and full-resolution saves.",
    groups: [
      {
        kind: "new",
        items: [
          "Storyboard turns references into an ordered sequence of panels. Press Ctrl B and each selected reference lands at the end.",
          "GIFs now play on the board with pause and scrubbing. Stop on the exact frame you need and place it back on the board as a still.",
        ],
      },
      {
        kind: "refined",
        items: [
          "Resize without distortion, Ctrl-drag to crop, then reposition the image inside its frame.",
          "Six resize handles keep the opposite edge fixed, making it easier to align one card with another.",
          "Zoom now runs from 10% to 800%, with shortcuts for fit, selection and actual size.",
        ],
      },
      {
        kind: "fixed",
        items: [
          "Images saved from Pinterest and other websites now arrive at full resolution, and previously unreliable clips save correctly.",
          "Ctrl 0 and Ctrl +/− now zoom the board instead of the interface. Ctrl-scroll can no longer leave the app at the wrong scale.",
        ],
      },
    ],
  },
  {
    version: "1.1.6",
    date: "July 2026",
    headline: "More control over Focus, notes and imported references.",
    groups: [
      {
        kind: "new",
        items: [
          "Notes can now hold checklists, so small tasks stay beside the work.",
          "Choose exactly which Focus zones appear in an export.",
          "Focus exports can use one zone per PDF page, including pinned notes and comments, in light or dark.",
          "Pin a note to a Focus zone from its button or by dragging the note onto it.",
          "Preview project images from the Trash before restoring or removing them.",
          "Copy and paste from the canvas menu, including screenshots from the clipboard.",
        ],
      },
      {
        kind: "refined",
        items: [
          "Sending a reference to Focus now gives the card a clearer visual confirmation.",
          "Connectors are curved and easier to read in dark mode.",
          "Focus-zone comments can be recoloured and resized.",
        ],
      },
      {
        kind: "fixed",
        items: [
          "Images dragged from a browser are now saved into the project instead of a temporary folder.",
          "On-canvas controls stay crisp and correctly sized at every zoom level.",
          "Long notes scroll correctly, and the Library remains responsive with larger projects.",
        ],
      },
    ],
  },
];

export const noteReleases: ReleaseNote[] = [
  {
    version: "0.2.4",
    date: "September 2026",
    headline: "A semi-visual overhaul for a clearer, calmer writing window.",
    groups: [
      {
        kind: "new",
        items: [
          "Sticky notes now have a reserved rail beside the page. When it is hidden, the notes control restores what is already there instead of making another note.",
        ],
      },
      {
        kind: "refined",
        items: [
          "The writing window has a semi-visual overhaul: softer rounded controls, clearer hierarchy and stronger light-mode contrast across the sidebar, tabs, page controls and Settings.",
          "Formatting is cleaner at every width, with headings and list styles gathered into one compact menu and a clearer blue New Page action in the sidebar.",
        ],
      },
    ],
  },
  {
    version: "0.2.2",
    date: "September 2026",
    headline: "Lists that can hold the next layer of a thought.",
    groups: [
      {
        kind: "new",
        items: [
          "Nested lists let you group related items beneath a single list heading, then collapse the group when you only need its name.",
        ],
      },
      {
        kind: "refined",
        items: [
          "Reorder list blocks directly from their block handle.",
          "The tracker uses shorter, clearer labels, and the guide navigation follows the section you are reading.",
        ],
      },
      {
        kind: "fixed",
        items: [
          "The nested-list control now sits at the right edge instead of overlapping the block handle.",
        ],
      },
    ],
  },
  {
    version: "0.2.1",
    date: "August 2026",
    headline: "A title bar that is easier to grab.",
    groups: [
      {
        kind: "fixed",
        items: [
          "Drag the window from almost anywhere along its top edge, including the space above the sidebar.",
          "The draggable area stays clear even with several page tabs open.",
          "The first-run tour no longer prevents the window from moving.",
        ],
      },
    ],
  },
  {
    version: "0.2.0",
    date: "August 2026",
    headline:
      "The Windows app, a clearer first run and comments that stay with the words.",
    groups: [
      {
        kind: "new",
        items: [
          "PalmaNote for Windows arrives in a 2.8 MB installer and keeps the whole library in one file on disk.",
          "The first launch walks through the real window — sidebar, tabs, page and notes rail — before opening the guide.",
          "Comments now attach to selected words instead of replacing them.",
          "Hide the notes rail with Ctrl+Shift+Space and restore it from the page bar, which also shows the note count.",
        ],
      },
      {
        kind: "refined",
        items: [
          "The launch field now clearly asks for a project name.",
          "Word exports start with the current page name and can be renamed before saving.",
          "The notes switch now sits in the page bar beside the page’s other controls.",
        ],
      },
      {
        kind: "fixed",
        items: [
          "Word export now works correctly in the browser build.",
          "Keyboard-selected text now offers cut and copy in the context menu.",
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
    title: "Pages connect as your thinking grows",
    blurb:
      "Type @ to link another page. Rename it later and every reference follows.",
  },
  {
    n: "02",
    title: "Move the structure, not the sentence",
    blurb:
      "Drag a block from the margin or move it with the keyboard when the order changes.",
  },
  {
    n: "03",
    title: "Keep the side thought on the side",
    blurb:
      "Park a sticky in the notes rail. It stays beside the page without entering the export or word count.",
  },
];
