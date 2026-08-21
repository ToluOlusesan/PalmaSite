import type { ReactNode } from "react";
import { ViewTransition } from "react";
import type { Product } from "@/lib/content";
import { ProductTile, outerRadius } from "@/components/marks/ProductTile";
import { ActionLink, BrowserGlyph, DownloadGlyph } from "@/components/ui/Action";
import { Reveal } from "@/components/ui/Reveal";
import { Shell } from "@/components/ui/SectionHead";
import { TypedHeadline } from "./TypedHeadline";

/** The badge's tile and the gap around it — `py-1.5 pl-1.5` is 6px. */
const BADGE_TILE = 32;
const BADGE_PAD = 6;

/** The "being worked on" dot: a ring that leaves, and a dot that stays. */
function Pulse() {
  return (
    <span className="relative flex h-1.5 w-1.5" aria-hidden>
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
    </span>
  );
}

/**
 * One hero shape, both products.
 *
 * The two apps have nothing in common visually — one is a board of other
 * people's photographs, the other is a page of type — so if the *pages* don't
 * agree on a shape, the family stops existing the moment you click. Same
 * badge, same headline scale, same CTA row, same drop into the shot below.
 *
 * The app icon carries the view-transition name it was given on the family
 * page's chooser card, which is what lets the tile you pressed fly here and
 * land as this page's badge.
 */
export function ProductHero({
  product: p,
  children,
}: {
  product: Product;
  children: ReactNode;
}) {
  const available = p.status === "available";

  return (
    // Left-aligned, both products. A centred hero has to be read from the
    // middle outward; a left one starts where the eye already is, and it gives
    // the typed headline a fixed origin to grow from instead of a midpoint
    // that shifts under every character.
    <header id="top" className="relative pb-14 pt-28 sm:pb-16 sm:pt-36">
      {/* Only the background is clipped — see FamilyHero. Clipping the header
          itself severs the hero shot's shadow along its bottom edge. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="dot-field" />
        <div className="bloom left-[18%] top-[22%] h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2" />
      </div>

      <Shell wide className="relative z-[2]">
        <div className="max-w-[46rem]">
          <Reveal delay={40}>
            {/* A rounded rectangle rather than a pill, and the radius is
                computed rather than picked: `outerRadius(32, 6)` is the only
                value at which the badge's corners and the icon's corners share
                a centre. A pill here forces a 22px outer against the icon's
                7px, and the mismatch is exactly the thing that makes a badge
                look subtly wrong. */}
            <div
              className="inline-flex items-center gap-2.5 border border-line bg-paper/70 py-1.5 pl-1.5 pr-4"
              style={{ borderRadius: outerRadius(BADGE_TILE, BADGE_PAD) }}
            >
              <ViewTransition name={`tile-${p.id}`} share="morph">
                <ProductTile id={p.id} size={BADGE_TILE} />
              </ViewTransition>
              <span className="text-[13.5px] font-medium text-ink">{p.name}</span>
              <span className="h-1 w-1 rounded-full bg-line-2" aria-hidden />
              <span className="text-[12.5px] text-faint">
                {available ? `v${p.version}` : p.webUrl ? "In your browser" : "Coming soon"}
              </span>
            </div>
          </Reveal>

          <Reveal delay={110} className="mt-7">
            {p.headline.typed ? (
              <TypedHeadline
                headline={p.headline}
                className="display text-[clamp(2.5rem,6.2vw,4.5rem)] text-ink"
              />
            ) : (
              <h1 className="display text-[clamp(2.5rem,6.2vw,4.5rem)] text-ink">
                {p.headline.lead}{" "}
                <span className="font-script text-[1.45em] leading-[0.6] tracking-normal">
                  {p.headline.accent}
                </span>
                {p.headline.tail}
              </h1>
            )}
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-7 max-w-[34rem] text-pretty text-[1.0625rem] leading-[1.65] text-muted">
              {p.lede}
            </p>
          </Reveal>

          <Reveal delay={250}>
            <div className="mt-9 flex flex-col items-start gap-4">
              <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                {available ? (
                  <>
                    <ActionLink href={p.downloadUrl} variant="solid">
                      <DownloadGlyph />
                      Download for Windows
                    </ActionLink>
                    {p.guideUrl ? (
                      <ActionLink
                        href={p.guideUrl}
                        target="_blank"
                        rel="noopener"
                        variant="outline"
                      >
                        Read the guide
                      </ActionLink>
                    ) : null}
                  </>
                ) : p.webUrl ? (
                  // No installer, but the app itself is one press away — so the
                  // press is the hero's action and the pulsing "still being
                  // built" chip steps down beside it. An app you can be inside
                  // immediately is a better first offer than a promise.
                  <>
                    <ActionLink href={p.webUrl} target="_blank" rel="noopener" variant="solid">
                      <BrowserGlyph />
                      Open in your browser
                    </ActionLink>
                    <span className="inline-flex h-12 cursor-default items-center gap-2.5 rounded-full border border-dashed border-line-2 px-6 text-[15px] font-medium text-faint">
                      <Pulse />
                      Windows app still being built
                    </span>
                  </>
                ) : (
                  <span className="inline-flex h-12 cursor-default items-center gap-2.5 rounded-full border border-dashed border-line-2 px-6 text-[15px] font-medium text-faint">
                    <Pulse />
                    Still being built
                  </span>
                )}
              </div>
              {/* True of both routes in, which is the point: the browser build
                  keeps its pages in the browser's own storage on this machine,
                  and posts none of it anywhere. */}
              <p className="text-[13px] text-faint">{p.chip} · Runs entirely on your machine</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={330} className="relative z-[2] mt-14 sm:mt-16">
          {children}
        </Reveal>
      </Shell>
    </header>
  );
}
