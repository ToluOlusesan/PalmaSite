import Link from "next/link";
import { products } from "@/lib/content";
import { ProductTile } from "@/components/marks/ProductTile";
import { ArrowGlyph } from "@/components/ui/Action";
import { Reveal } from "@/components/ui/Reveal";
import { Shell } from "@/components/ui/SectionHead";

export function CompareBand() {
  return (
    <section id="compare" className="scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-[76rem] overflow-hidden rounded-[14px] bg-ink text-white">
        <Shell wide className="grid gap-14 py-16 sm:py-24 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <Reveal>
            <h2 className="display max-w-[10em] text-[clamp(2.7rem,4.7vw,4.35rem)] font-semibold leading-[1.02] tracking-[-0.05em] text-white">
              Two different apps for whatever your needs might be.
            </h2>
            <p className="mt-7 max-w-[29rem] text-[1.05rem] leading-[1.6] text-white/70">
              Sometimes you need to spread the references out and look. Sometimes you need a page and a little time to think. There is a Palma app for each part.
            </p>
          </Reveal>

          <div className="grid content-center gap-3">
            <Reveal delay={60}>
              <WorkCard id="canvas" title="When you need to see it" body="Collect images, video and links. Move them around, find the pattern, and take a clear direction into the next conversation." />
            </Reveal>
            <Reveal delay={130}>
              <WorkCard id="note" title="When you need to write it through" body="Put the note down, build out a plan, or keep going on a draft. Reorder it when the thought changes." />
            </Reveal>
          </div>
        </Shell>
      </div>
    </section>
  );
}

function WorkCard({ id, title, body }: { id: "canvas" | "note"; title: string; body: string }) {
  const product = products[id];
  return (
    <Link href={product.href} transitionTypes={["nav-forward"]} className="group pressable flex gap-4 rounded-[10px] border border-white/15 bg-white/[0.055] p-5 transition-colors hover:bg-white/[0.10] sm:gap-5 sm:p-6">
      <ProductTile id={id} size={44} className="shrink-0" />
      <div className="min-w-0 flex-1">
        <h3 className="mt-1 text-[1.3rem] font-semibold tracking-[-0.03em] text-white">{title}</h3>
        <p className="mt-2 max-w-[29rem] text-[14px] leading-[1.55] text-white/70">{body}</p>
      </div>
      <ArrowGlyph className="mt-1 shrink-0 text-white/70 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
    </Link>
  );
}
