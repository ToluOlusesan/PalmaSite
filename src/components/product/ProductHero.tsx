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
    <header id="top" className="pb-12 pt-28 sm:pt-32">
      <Shell wide>
        <div className="grid gap-8 lg:min-h-[570px] lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] lg:gap-10">
          <div className="flex flex-col items-start justify-center py-10 lg:py-12">
            <Reveal>
              <div className="inline-flex items-center gap-2.5 rounded-md border border-line bg-panel px-2 py-1.5">
                <ViewTransition name={`tile-${p.id}`} share="morph">
                  <ProductTile id={p.id} size={27} />
                </ViewTransition>
                <span className="text-[12.5px] font-medium text-ink">{p.name}</span>
                <span className="text-[11.5px] text-faint">{available ? `v${p.version}` : "Coming soon"}</span>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="display mt-7 max-w-[9.7em] text-[clamp(3rem,5.25vw,5.25rem)] font-semibold leading-[1] tracking-[-0.052em] text-ink">
                {p.headline.lead} <span className="text-[var(--accent)]">{p.headline.accent}</span>{p.headline.tail}
              </h1>
            </Reveal>

            <Reveal delay={150}>
              <p className="mt-7 max-w-[31rem] text-pretty text-[1.05rem] leading-[1.55] text-muted sm:text-[1.125rem]">{p.lede}</p>
            </Reveal>

            <Reveal delay={210}>
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

          <Reveal delay={130} className="min-h-[400px] lg:min-h-[570px]">
            <div className={`flex h-full min-h-[400px] items-center justify-center overflow-hidden rounded-[12px] border border-line p-5 sm:p-8 lg:min-h-[570px] ${p.id === "note" ? "bg-[#f2f5fa]" : "bg-panel"}`}>
              <div className="w-full max-w-[580px]">{children}</div>
            </div>
          </Reveal>
        </div>
      </Shell>
    </header>
  );
}
