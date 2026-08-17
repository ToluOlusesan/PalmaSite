import Link from "next/link";
import { products, type Product, type ProductId } from "@/lib/content";
import { ProductTile } from "@/components/marks/ProductTile";
import { ActionLink, ArrowGlyph, DownloadGlyph } from "@/components/ui/Action";
import { Reveal } from "@/components/ui/Reveal";
import { Shell } from "@/components/ui/SectionHead";

/** The download band that closes a product page. */
export function ProductGet({ product: p }: { product: Product }) {
  const available = p.status === "available";

  return (
    <section id="get" className="relative scroll-mt-24 overflow-hidden py-16 text-center sm:py-24">
      <div
        className="bloom left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2"
        aria-hidden
      />

      <Shell className="relative z-[1]">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-line-2 px-3 py-1 text-[11.5px] font-medium uppercase tracking-[0.14em] text-muted">
            {available ? `Windows · v${p.version}` : "Windows · coming soon"}
          </span>
          {/* This line *is* the band's heading — it was a <p> carrying display
              type, which looks right and outlines wrong: the download section
              then had no name at all for anyone navigating by heading. */}
          <h2 className="display-sm mx-auto mt-6 max-w-[36rem] text-balance text-[clamp(1.6rem,3.6vw,2.4rem)] text-ink">
            {available
              ? `Download ${p.name}. It's free, forever.`
              : `${p.name} isn't finished. It will also be free, forever.`}
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {available ? (
              <>
                <ActionLink href={p.downloadUrl} variant="solid">
                  <DownloadGlyph />
                  Download for Windows
                </ActionLink>
                {p.guideUrl ? (
                  <ActionLink href={p.guideUrl} target="_blank" rel="noopener" variant="outline">
                    Read the guide
                  </ActionLink>
                ) : null}
              </>
            ) : (
              <span className="inline-flex h-12 cursor-default items-center justify-center rounded-full border border-dashed border-line-2 px-6 text-[15px] font-medium text-faint">
                No installer yet
              </span>
            )}
          </div>
          <p className="mt-6 text-[13px] text-faint">
            No account required · Nothing uploaded · Runs entirely on your machine.
          </p>
        </Reveal>
      </Shell>
    </section>
  );
}

/**
 * The door back out. Every product page ends by naming the other one, so the
 * family is reachable from the bottom of a page as well as the top — a reader
 * who has just decided this isn't their app should not have to scroll back up
 * to find out what else there is.
 */
export function SiblingBand({ current }: { current: ProductId }) {
  const other = current === "canvas" ? products.note : products.canvas;

  return (
    <section className="border-t border-line bg-panel/60 py-14 sm:py-16">
      <Shell>
        <Reveal>
          <Link
            href={other.href}
            transitionTypes={["nav-forward"]}
            data-product={other.id}
            className="group pressable flex flex-col gap-5 rounded-[1.25rem] border border-line bg-paper p-6 hover:border-[var(--accent-line)] hover:shadow-soft sm:flex-row sm:items-center sm:gap-6 sm:p-7"
          >
            <ProductTile id={other.id} size={56} className="shadow-soft" />
            <div className="min-w-0 flex-1">
              <span className="eyebrow">The other one</span>
              {/* A top-level band, so a top-level heading — the eyebrow above
                  it is decoration, not the rank. */}
              <h2 className="display-sm mt-2 text-[1.375rem] text-ink">{other.name}</h2>
              <p className="mt-1.5 text-pretty text-[0.95rem] leading-[1.55] text-muted">
                {other.blurb}
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 text-[13.5px] font-medium text-[var(--accent)]">
              Open
              <ArrowGlyph className="transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
            </span>
          </Link>
        </Reveal>
      </Shell>
    </section>
  );
}
