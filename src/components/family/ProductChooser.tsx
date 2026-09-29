import Link from "next/link";
import { ViewTransition } from "react";
import { productList, type Product } from "@/lib/content";
import { ProductTile } from "@/components/marks/ProductTile";
import { ArrowGlyph } from "@/components/ui/Action";
import { Reveal } from "@/components/ui/Reveal";
import { Shell } from "@/components/ui/SectionHead";
import { CanvasMini } from "./CanvasMini";
import { NoteMini } from "./NoteMini";

const minis = { canvas: CanvasMini, note: NoteMini } as const;

export function ProductChooser() {
  return (
    <section id="top" className="scroll-mt-28 pb-10 pt-32 sm:pb-16 sm:pt-40">
      <Shell wide>
        <div id="apps" className="scroll-mt-28">
          <Reveal className="mb-10 max-w-[56rem] sm:mb-12">
            <h1 className="display text-[clamp(3rem,6vw,5rem)] font-semibold leading-[1.02] tracking-[-0.05em] text-ink">
              One for the eye.<br className="hidden sm:block" /> One for the page.
            </h1>
            <p className="mt-6 max-w-[40rem] text-pretty text-[1.05rem] leading-[1.6] text-muted sm:text-[1.125rem]">
              One for the visual work. One for the words that go with it.
            </p>
          </Reveal>

          <div className="grid gap-4 lg:grid-cols-2">
            {productList.map((p, i) => (
              <Reveal key={p.id} delay={i * 80} className="flex">
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </Shell>
    </section>
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
      className="group pressable flex w-full flex-col overflow-hidden rounded-[12px] border border-line bg-paper transition-[border-color,box-shadow] hover:border-line-2 hover:shadow-lift"
    >
      <div className="flex min-h-[225px] flex-col p-7 sm:p-8">
        <div className="flex items-center gap-3">
          <ViewTransition name={`tile-${p.id}`} share="morph">
            <ProductTile id={p.id} size={40} />
          </ViewTransition>
          <div>
            <h2 className="text-[1.45rem] font-semibold tracking-[-0.035em] text-ink">{p.name}</h2>
          </div>
        </div>
        <p className="mt-5 max-w-[25rem] flex-1 text-pretty text-[1rem] leading-[1.55] text-muted">{p.blurb}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-[13.5px] font-medium text-[var(--accent)]">
          Explore {p.short} <ArrowGlyph className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
        </span>
      </div>
      <div className="relative aspect-[16/8.5] overflow-hidden border-t border-line bg-panel">
        <Mini />
      </div>
    </Link>
  );
}
