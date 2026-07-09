# Palma — marketing site

The landing site for **Palma**, a local-first creative workspace for motion
and 3D designers, by Spatial Foundry. Palma is free, forever — there is no
pricing, no accounts, no paid tier, so the site never needs commerce pages.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (tokens defined in `src/app/globals.css` via `@theme`)
- Fonts: Inter (UI), DM Serif Display (editorial headings), Pinyon Script
  (display accent) via `next/font`

## Develop

```bash
npm run dev      # dev server at http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
```

## Structure

```
src/
  app/
    layout.tsx          fonts + metadata (Open Graph, etc.)
    page.tsx            composes the homepage sections
    globals.css         design tokens, base styles, utilities (bloom/reveal/dotgrid)
    icon.svg            favicon — the Palma island mark on a dark tile
  components/           Nav, Hero, HowItWorks, ToolsShowcase, Principles,
                        SocialProof, CTA, Footer, Reveal, PalmaMark
  lib/content.ts        all marketing copy in one place
_reference/             original single-file landing, kept for design reference
```

Section flow on the homepage: **Hero** (coming-soon callout) → **HowItWorks**
(three-step story) → **ToolsShowcase** (pinned feature rail) → **Principles**
(bento grid) → **SocialProof** (testimonial + personas) → **CTA** → **Footer**.

## Design language

Monochrome, light, editorial: black ink (`#0a0a0a`) on near-white paper, neutral
greys, no colour. DM Serif Display carries the big headings, Pinyon Script adds a
single calligraphic accent word per headline, and Inter handles UI/body. The
Palma island mark lives in `src/components/PalmaMark.tsx` and is reused across
nav and footer.

## Status

Palma is pre-launch. The hero and final CTA show a **Coming soon** callout
rather than collecting emails — there is no signup form or capture endpoint.
When the app is ready, replace those callouts with whatever the launch needs
(download link, signup, etc.).
