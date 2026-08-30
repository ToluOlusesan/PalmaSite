# Palmaboard — marketing site

The site for **Palmaboard**, built independently by Tolu Olusesan: two
local-first creative apps that share a spine.

- **Palma Canvas** — an infinite board for references, moodboards and video
  stills. Shipping; downloads from a stable GitHub permalink.
- **PalmaNote** — a small, local place for pages, notes and lists. Shipping
  too, from a permalink of its own; and it is the one product with two doors,
  because `products.note.webUrl` also points at the browser build, published
  from the app's own repository on every push.

Both are free to use with no account or subscription. Because they run locally
without a paid cloud service behind them, the site does not need commerce or
account pages.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (tokens in `src/app/globals.css` via `@theme`)
- Fonts: Inter (UI) and DM Serif Display (display) via `next/font`
- `experimental.viewTransition` — see [Route transitions](#route-transitions)

## Develop

```bash
npm run dev      # dev server at http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
```

## Routes

| Route     | What it is                                                        |
| --------- | ----------------------------------------------------------------- |
| `/`       | The family page: name the family, present the choice, compare them |
| `/canvas` | Palma Canvas                                                       |
| `/note`   | PalmaNote                                                          |

`/note` carries one band the Canvas page has no equivalent of — `WebBand`,
which explains the browser build: what it is, where it keeps your pages, and
the one thing worth knowing before you start (a browser's storage is yours, and
also something a browser is entitled to clear). It renders only when the
product has a `webUrl`, so Canvas gaining one later needs no new component.

`/api/notify` is an unused host-agnostic waitlist endpoint, kept for whenever
PalmaNote wants a launch list. Nothing on the site posts to it today.

## Structure

```
src/
  app/
    layout.tsx            fonts, family metadata, nav + footer shell
    page.tsx              the family page
    canvas/page.tsx       Palma Canvas
    note/page.tsx         PalmaNote
    globals.css           tokens, product accents, view transitions, mockup CSS
    icon.svg              favicon — the Palmaboard glyph on an ink tile
    **/opengraph-image.png  per-route social cards (see below)
  components/
    shell/                SiteNav (with the product switcher), SiteFooter
    family/               hero, chooser + the two miniatures, compare, get
    product/              hero, caption band, get band, what's new, sibling band
    canvas/               screenshot frame, step band, tools, close-ups
    note/                 window mockup, writing chart, insert demo, keys
    marks/                PalmaboardMark, CanvasMark, NoteMark, ProductTile
    ui/                   Action, Reveal, SectionHead + Shell
  lib/content.ts          all copy: family, products, compare rows, releases
  lib/motion.ts           the pointer-tilt spring used by both hero shots
```

## Design language

**Neutral shell, per-product accent.** The chrome — nav, footer, family page —
is monochrome ink on near-white, and never picks a colour. A product does, and
only inside its own scope: `<div data-product="note">` retints every
`var(--accent)` on the page.

- **Palma Canvas is monochrome.** The app is a place you look at *other
  people's* colour, so the tool brings none of its own; the colour on that page
  comes from the reference screenshots.
- **PalmaNote gets Cobalt → Violet.** The gradient the app already reserves for
  its identity layer (icon, installer, marketing) and nowhere else.

Add a product by extending `products` in `lib/content.ts` and adding a
`[data-product="…"]` block in `globals.css`. Components read `var(--accent)`,
so nothing else needs touching.

### The two product pages are the same page

`ProductHero` → `CaptionBand` → feature sections → `SharedPrinciples` →
`ProductGet` → `SiblingBand`. The apps look nothing alike, so if the *pages*
don't agree on a shape the family stops existing the moment you click.

### PalmaNote's hero is a mockup, not a screenshot

There's no installer to screenshot yet, so `note/NoteWindow.tsx` rebuilds the
window in markup, styled by the `.nw-*` block in `globals.css`. Real DOM, so it
stays sharp at any zoom, reflows on a phone, and adds nothing to image weight.

> **That CSS block lives inside `@layer components` on purpose.** Unlayered CSS
> beats *every* layered rule, so an unlayered `.nw-tool { display: grid }`
> silently overrides Tailwind's `hidden` and the desktop chrome leaks onto
> phones. Keep any new component CSS in the layer.

### Route transitions

Choosing a product is a hand-off, not a page swap. Each chooser card wraps its
app icon in `<ViewTransition name={`tile-${id}`} share="morph">`, and the
product hero wraps the same icon in the same name, so pressing a card *sends
that tile* to the page you land on. Links carry `transitionTypes` so everything
else slides in the direction you travelled, and the nav is pinned via
`viewTransitionName: "site-nav"` so it stays put.

**A name may appear only once per page.** The footer and compare table render
the same tiles deliberately unnamed; naming them would break the transition.

### Motion

Custom ease-out curves (`--ease-out` and friends in `globals.css`), never
`ease-in`. Anything pressable takes `.pressable`: feedback on pointer-*down*,
and the release faster than the press. Everything is gated behind
`prefers-reduced-motion`, and translucent chrome behind
`prefers-reduced-transparency`.

## Social cards

`opengraph-image.png` / `twitter-image.png` sit beside each route and are shot
from the pages themselves at 1200×630, so they can't drift from the headline
they advertise. To regenerate after a copy change: run the dev server, screenshot
each route at 1200×630 with the fixed nav and any `nextjs-portal` removed and
`.reveal` forced to `.is-visible`, then update the matching `.alt.txt`.

## Status

Both apps ship. Palma Canvas downloads from a stable `Palma-Setup.exe`
permalink; PalmaNote from `PalmaNote-Setup.exe`, and it **also** runs in a
browser — `webUrl` on `products.note` points at the build the app's own
repository publishes on every push to `main`. No permalink on this site
carries a version, so shipping a new build never touches these files.

`status` and `webUrl` are the whole switchboard, and the components read them
rather than a page-by-page condition:

| `status` | `webUrl` | What the site offers |
| --- | --- | --- |
| `available` | — | Download, and the guide beside it |
| `available` | set | Download, with **Open in your browser** kept beside it |
| `coming-soon` | set | **Open in your browser**, with "still being built" beside it |
| `coming-soon` | — | A dashed, inert "Still being built" |

The second row is what shipping an installer for a product that already had a
browser build looks like: set `status: "available"` plus `version` and
`downloadUrl`, and leave `webUrl` alone. The hero, the get band, the family
card and the nav action pick up the download; the hero and the get band keep
the browser as the quiet second door, and the family card names it in the line
under the product's name rather than growing a third button.

## What's new

Each product page ends with the newest entry from its own array in
`lib/content.ts` — `canvasReleases`, `noteReleases` — rendered by the shared
`product/WhatsNew` band. Newest first; the band shows `[0]` and nothing else,
so an old entry is history rather than clutter.
