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
    kicker: "For looking",
    headline: { lead: "Your reference board, finally", accent: "alive", tail: "." },
    lede:
      "Drop every image, clip and screenshot onto an infinite board. Mark them up, sort them into focus zones, cut them into a storyboard, and export a moodboard to send. It runs on your own machine.",
    blurb:
      "An infinite board for references — images, video, screenshots — that ends in a moodboard or a storyboard you can send.",
    status: "available",
    version: "1.3.0",
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
      lead: "A simple app to write",
      accent: "freely",
      tail: ".",
      typed: [
        { text: "A simple app" },
        { text: "\n" },
        // No `script: true` anywhere in here. The Note page's display voice is
        // size and weight, never a fetched face — see globals.css.
        { text: "to write " },
        { text: "freely" },
        { text: "." },
      ],
    },
    lede:
      "Pages, notes and lists, kept on your own machine. Blocks you can move, pages that link to each other, and stickies that sit beside the writing instead of inside it. Install it for Windows, or open it in a tab — either one is the whole app.",
    blurb:
      "A writing app for pages, notes and lists. Install it for Windows, or open it in your browser.",
    status: "available",
    version: "0.2.1",
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
    chip: "Windows or your browser · Free, forever",
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
    canvas: "You're collecting the look of something before you make it",
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
    body: "Everything is stored on your machine. Offline on a plane or off the grid for a week, both apps open exactly the same as they did yesterday.",
  },
  {
    icon: "cloud-off",
    title: "No cloud, no account, no AI",
    body: "Nothing to sign up for and nothing uploaded. There's no server on the other end, so your work stays where you put it.",
  },
  {
    icon: "infinity",
    title: "Free, forever",
    body: "No subscription, no seats, no tiers, no paid version coming later. You download them once and they're yours.",
  },
  {
    icon: "user",
    title: "Built for one person first",
    body: "I made both of these for my own work, and I use them every week. Things get added when I need them, not to reach more people.",
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
    title: "Gather your references",
    blurb:
      "Drop images, video and screenshots onto an infinite board. Files already on your disk are referenced where they sit, not copied into a library.",
  },
  {
    id: "focus",
    n: "02",
    title: "Sort what matters into Focus",
    blurb:
      "Send the ones worth keeping into named zones — colour, texture, motion. Each zone packs its own grid, and a reference leaves the queue once you place it.",
  },
  {
    id: "storyboard",
    n: "03",
    title: "Sequence it in the Storyboard",
    blurb:
      "Send shots over and they land in order. One frame shape for the whole board, numbered, each with its action, camera move and duration.",
  },
  {
    id: "export",
    n: "04",
    title: "Export it for a client",
    blurb:
      "PNG or PDF, light or dark — the board as it stands, or a process brief carrying your notes and comments. No account, nothing uploaded.",
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
    version: "1.3.0",
    date: "August 2026",
    headline: "A storyboard, GIFs you can pause, and images that save at full size.",
    groups: [
      {
        kind: "new",
        items: [
          "Storyboard: a new board where references become an ordered sequence of shots. Send them over with Ctrl B and each one lands as the next panel.",
          "GIFs play on the board with a real transport — pause holds the exact frame you were looking at, and you can scrub to a frame and drop it onto the board as a still.",
        ],
      },
      {
        kind: "refined",
        items: [
          "Drag a corner to scale a reference (never stretched), Ctrl-drag to crop it, and Ctrl-drag the picture to choose what stays in frame.",
          "Six resize handles — four corners and both sides — each holding the opposite edge still, so you can size a card against its neighbour in one move.",
          "Zoom now runs 10% to 800%, with a menu for Zoom to fit and Zoom to selection, and Ctrl 0 / 1 / 2 to go there instantly.",
        ],
      },
      {
        kind: "fixed",
        items: [
          "Images saved from Pinterest and the rest of the web now arrive at full resolution instead of the small version the page happened to be showing — and clips that used to fail outright now save.",
          "Ctrl 0 and Ctrl +/− zoom the board, not the whole app. An accidental Ctrl-scroll can no longer leave the interface stuck at the wrong size.",
        ],
      },
    ],
  },
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

export const noteReleases: ReleaseNote[] = [
  {
    version: "0.2.1",
    date: "August 2026",
    headline: "A title bar you can take hold of.",
    groups: [
      {
        kind: "fixed",
        items: [
          "The window drags by its whole top edge — the strip across the top and the sidebar's head, everywhere they are not a button.",
          "With a few pages open, the one part that used to move the window had been squeezed to a sliver between two icons. It is held clear now, however many tabs are up.",
          "The first launch no longer pins the window in place while it is showing you around.",
        ],
      },
    ],
  },
  {
    version: "0.2.0",
    date: "August 2026",
    headline:
      "The Windows app, a first launch that shows you around, and comments that mark the words.",
    groups: [
      {
        kind: "new",
        items: [
          "PalmaNote for Windows: a 2.8 MB installer, and your whole library in one file on your own disk.",
          "A first launch walks you round the real window — the sidebar, the tabs, the page, the notes rail — then hands you the guide.",
          "Comment on a selection: the bar that comes to your words now marks them instead of replacing them.",
          "Put the notes rail away with Ctrl+Shift+Space, and bring it back from the page bar — which says how many notes are waiting.",
        ],
      },
      {
        kind: "refined",
        items: [
          "The launch field says what it is for: type a name for your project and start there.",
          "A Word export is named after the page you are on, in a field you can correct before it saves.",
          "The notes switch moved into the page bar, beside bold and the headings, where the page's own controls live.",
        ],
      },
      {
        kind: "fixed",
        items: [
          "Exporting a Word document from the browser now works — it asked for something only the desktop had.",
          "Right-clicking words you selected with the keyboard offers cut and copy instead of greying them out.",
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
