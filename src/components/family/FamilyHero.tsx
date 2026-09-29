import Link from "next/link";
import { ArrowGlyph } from "@/components/ui/Action";
import { Reveal } from "@/components/ui/Reveal";
import { Shell } from "@/components/ui/SectionHead";
import { ProductChooser } from "./ProductChooser";
import { CanvasMini } from "./CanvasMini";
import { NoteMini } from "./NoteMini";

export function FamilyHero() {
  return (
    <header id="top" className="pt-28 sm:pt-32">
      <Shell wide>
        <div className="grid items-stretch gap-7 lg:min-h-[590px] lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] lg:gap-10">
          <div className="flex flex-col items-start justify-center py-10 sm:py-16 lg:py-14">
            <Reveal>
              <span className="inline-flex rounded-md border border-line bg-panel px-3 py-1.5 text-[12px] font-medium text-muted">
                Two tools made by one designer
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="display mt-7 max-w-[11em] text-[clamp(3.15rem,5vw,4.9rem)] font-semibold leading-[0.99] tracking-[-0.052em] text-ink">
                One for the eye.<br /> One for the page.
              </h1>
            </Reveal>
            <Reveal delay={150}>
              <p className="mt-7 max-w-[31rem] text-pretty text-[1.05rem] leading-[1.55] text-muted sm:text-[1.125rem]">
                Palma Canvas keeps your references together while you work out the visual direction. PalmaNote gives your notes, plans and drafts a place of their own. Both save your work locally.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link href="#apps" className="pressable inline-flex h-12 items-center gap-3 rounded-lg bg-ink px-5 text-[14px] font-medium text-white hover:opacity-90">
                  Explore Palma <ArrowGlyph />
                </Link>
                <span className="text-[13px] text-faint">Free to use · No account</span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} className="min-h-[440px] lg:min-h-[590px]">
            <div className="relative h-full min-h-[440px] overflow-hidden rounded-[12px] border border-line bg-panel lg:min-h-[590px]">
              <div className="absolute left-[5%] top-[10%] w-[82%] overflow-hidden rounded-[9px] border border-line bg-paper shadow-lift">
                <div className="flex h-9 items-center justify-between border-b border-line px-3.5 text-[11px] font-medium text-ink">
                  <span>Palma Canvas</span><span className="text-faint">References, all in view</span>
                </div>
                <div className="relative aspect-[16/9] overflow-hidden"><CanvasMini /></div>
              </div>
              <div className="absolute bottom-[8%] right-[5%] w-[76%] overflow-hidden rounded-[9px] border border-line bg-paper shadow-lift">
                <div className="flex h-9 items-center justify-between border-b border-line px-3.5 text-[11px] font-medium text-ink">
                  <span>PalmaNote</span><span className="text-faint">A page for the thought</span>
                </div>
                <div className="relative aspect-[16/9] overflow-hidden"><NoteMini /></div>
              </div>
            </div>
          </Reveal>
        </div>

        <ProductChooser />
      </Shell>
    </header>
  );
}
