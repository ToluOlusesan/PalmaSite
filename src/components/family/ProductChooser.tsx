import Link from "next/link";
import { ViewTransition } from "react";
import { productList, type Product } from "@/lib/content";
import { ProductTile } from "@/components/marks/ProductTile";
import { ArrowGlyph } from "@/components/ui/Action";
import { Reveal } from "@/components/ui/Reveal";
import { CanvasMini } from "./CanvasMini";
import { NoteMini } from "./NoteMini";

const minis = {
  canvas: CanvasMini,
  note: NoteMini,
} as const;

/**
 * The choice. Two cards, each a window onto the app behind it.
 *
 * Three things make this a chooser rather than a pair of banners:
 *
 * 1. The *whole* card is the target, not a "Learn more" link buried in it.
 *    A choice this size should not require aiming.
 * 2. The card presses. Feedback lands on pointer-down (`.pressable`), so the
 *    interface has answered before the navigation starts — which is what makes
 *    a slow page load feel like a considered pause rather than a dead click.
 * 3. The app icon carries a view-transition name, so pressing a card *sends
 *    that icon* to the product page's hero instead of cutting to a new screen.
 *    An object that survives a cut says "same thing, going deeper"; two
 *    unrelated screens say "you are somewhere else now".
 */
export function ProductChooser() {
  return (
    <div className="mt-14 grid gap-5 lg:mt-16 lg:grid-cols-2 lg:gap-6">
      {productList.map((p, i) => (
        <Reveal key={p.id} delay={i * 90} className="flex">
          <ProductCard product={p} />
        </Reveal>
      ))}
    </div>
  );
}

function ProductCard({ product: p }: { product: Product }) {
  const Mini = minis[p.id];

  return (
    <Link
      href={p.href}
      transitionTypes={["nav-forward"]}
      data-product={p.id}
      aria-label={`${p.name} — ${p.blurb}`}
      className="group pressable flex w-full flex-col overflow-hidden rounded-[1.5rem] border border-line bg-paper shadow-soft hover:-translate-y-1 hover:border-[var(--accent-line)] hover:shadow-float motion-reduce:hover:translate-y-0"
    >
      {/* The window onto the app. `aspect` rather than a fixed height so the
          two cards stay the same shape at every width. */}
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden border-b border-line">
        <Mini />
        {/* A wash that deepens on hover — the card lighting up under the
            pointer, rather than a border colour blinking on. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-[var(--ease-out)] group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 110%, var(--accent-glow), transparent 62%)",
          }}
        />
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-center gap-3.5">
          <ViewTransition name={`tile-${p.id}`} share="morph">
            <ProductTile id={p.id} size={44} className="shadow-soft" />
          </ViewTransition>
          <div className="min-w-0">
            <h3 className="display-sm text-[1.375rem] text-ink">{p.name}</h3>
            <p className="text-[13px] text-faint">{p.kicker}</p>
          </div>
        </div>

        <p className="mt-5 flex-1 text-pretty text-[0.975rem] leading-[1.6] text-muted">
          {p.blurb}
        </p>

        <div className="mt-7 flex items-center justify-between gap-4 border-t border-line pt-5">
          <span className="text-[12.5px] text-faint">{p.chip}</span>
          <span className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-[var(--accent)]">
            Open
            {/* The arrow leans the way the card is about to take you. */}
            <ArrowGlyph className="transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
          </span>
        </div>
      </div>
    </Link>
  );
}
