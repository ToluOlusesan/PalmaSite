import type { ReactNode } from "react";
import { ViewTransition } from "react";
import type { Product } from "@/lib/content";
import { ProductTile } from "@/components/marks/ProductTile";
import { ActionLink, BrowserGlyph, DownloadGlyph } from "@/components/ui/Action";
import { Reveal } from "@/components/ui/Reveal";
import { Shell } from "@/components/ui/SectionHead";

export function ProductHero({ product: p, children }: { product: Product; children: ReactNode }) {
  const available = p.status === "available";

  return (
    <header id="top" className="pb-12 pt-32 sm:pb-16 sm:pt-40">
      <Shell wide>
        <div className="max-w-[58rem]">
          <Reveal>
            <ViewTransition name={`tile-${p.id}`} share="morph">
              <ProductTile id={p.id} size={48} />
            </ViewTransition>
          </Reveal>

          <Reveal delay={70}>
            <h1 className="display mt-6 text-[clamp(3rem,6.2vw,5.5rem)] font-semibold leading-[1] tracking-[-0.052em] text-ink">
              {p.headline.lead} <span className="text-[var(--accent)]">{p.headline.accent}</span>{p.headline.tail}
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-7 max-w-[42rem] text-pretty text-[1.05rem] leading-[1.6] text-muted sm:text-[1.125rem]">{p.lede}</p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-9 flex flex-wrap items-center gap-2.5">
              {available ? (
                <>
                  <ActionLink href={p.downloadUrl} variant="solid"><DownloadGlyph />Download for Windows</ActionLink>
                  {p.webUrl ? <ActionLink href={p.webUrl} target="_blank" rel="noopener" variant="outline"><BrowserGlyph />Open in browser</ActionLink> : null}
                  {p.guideUrl ? <ActionLink href={p.guideUrl} target="_blank" rel="noopener" variant="outline">Read the guide</ActionLink> : null}
                </>
              ) : p.webUrl ? (
                <ActionLink href={p.webUrl} target="_blank" rel="noopener" variant="solid"><BrowserGlyph />Open in browser</ActionLink>
              ) : (
                <span className="rounded-md border border-line px-4 py-3 text-[13px] text-faint">Still being built</span>
              )}
            </div>
            <p className="mt-5 text-[12.5px] text-faint">{p.chip} · Your work stays local</p>
          </Reveal>
        </div>

        <Reveal delay={270} className="mt-12 sm:mt-16">
          {children}
        </Reveal>
      </Shell>
    </header>
  );
}
