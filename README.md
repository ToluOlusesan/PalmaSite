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
    api/beta/route.ts   beta-access capture endpoint (validates; wire a provider here)
  components/           Nav, Hero, ToolsShowcase, Spotlight, Principles,
                        SocialProof, CTA, Footer, BetaInput, Reveal, PalmaMark
  lib/content.ts        all marketing copy in one place
_reference/             original single-file landing, kept for design reference
```

Section flow on the homepage: **Hero** (pill email input) → **ToolsShowcase**
(interactive tabbed feature carousel) → **Spotlight** (device-framed canvas
mock) → **Principles** (bento grid) → **SocialProof** (testimonial + personas)
→ **CTA** → **Footer**.

## Design language

Monochrome, light, editorial: black ink (`#0a0a0a`) on near-white paper, neutral
greys, no colour. DM Serif Display carries the big headings, Pinyon Script adds a
single calligraphic accent word per headline, and Inter handles UI/body. The
Palma island mark lives in `src/components/PalmaMark.tsx` and is reused across
nav and footer.

## Beta signup

`src/components/BetaInput.tsx` (used in the hero and final CTA) POSTs to
`/api/beta`, which validates the email and acknowledges it. There is no user
database (Palma is local-first); to actually collect addresses, forward the
email to a list/provider in `route.ts` where the `TODO` is marked.
