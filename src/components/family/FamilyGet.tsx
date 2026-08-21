import Link from "next/link";
import { productList, type Product } from "@/lib/content";
import { ProductTile } from "@/components/marks/ProductTile";
import { ActionLink, ArrowGlyph, BrowserGlyph, DownloadGlyph } from "@/components/ui/Action";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead, Shell } from "@/components/ui/SectionHead";

/**
 * The get-it band, both apps side by side.
 *
 * PalmaNote has nothing to download yet, and this says so in the same shape as
 * the app that does — same card, same rhythm, a dashed outline where the
 * button will go. Hiding an unreleased app would make the family look like one
 * product with a marketing problem; showing it honestly makes the shape of the
 * family legible before it is finished.
 */
export function FamilyGet() {
  return (
    <section id="get" className="scroll-mt-24 py-16 sm:py-24">
      <Shell>
        <SectionHead title="Take whichever one you need.">
          One is a Windows app, the other opens in a tab. Both are free,
          forever. Neither will ask you for an email address.
        </SectionHead>

        <div className="mt-12 grid gap-4 sm:mt-14 lg:grid-cols-2">
          {productList.map((p, i) => (
            <Reveal key={p.id} delay={i * 80} className="flex">
              <GetCard product={p} />
            </Reveal>
          ))}
        </div>
      </Shell>
    </section>
  );
}

function GetCard({ product: p }: { product: Product }) {
  const available = p.status === "available";

  return (
    <div
      data-product={p.id}
      className="flex w-full flex-col rounded-[1.25rem] border border-line bg-paper p-7 sm:p-8"
    >
      <div className="flex items-center gap-3.5">
        <ProductTile id={p.id} size={48} className="shadow-soft" />
        <div>
          <h3 className="display-sm text-[1.3rem] text-ink">{p.name}</h3>
          <p className="text-[12.5px] text-faint">
            {available
              ? `Windows · v${p.version}`
              : p.webUrl
                ? "In your browser · Windows in the workshop"
                : "Windows · in the workshop"}
          </p>
        </div>
      </div>

      <p className="mt-6 flex-1 text-pretty text-[0.95rem] leading-[1.6] text-muted">
        {p.blurb}
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-3">
        {available ? (
          <ActionLink href={p.downloadUrl} variant="solid">
            <DownloadGlyph />
            Download
          </ActionLink>
        ) : p.webUrl ? (
          <ActionLink href={p.webUrl} target="_blank" rel="noopener" variant="solid">
            <BrowserGlyph />
            Open in your browser
          </ActionLink>
        ) : (
          <span className="inline-flex h-12 cursor-default items-center justify-center rounded-full border border-dashed border-line-2 px-6 text-[15px] font-medium text-faint">
            Not out yet
          </span>
        )}

        <Link
          href={p.href}
          transitionTypes={["nav-forward"]}
          className="pressable inline-flex h-12 items-center gap-2 rounded-full px-4 text-[15px] font-medium text-[var(--accent)] hover:bg-[var(--accent-soft)]"
        >
          {available || p.webUrl ? "See what it does" : "See what it will do"}
          <ArrowGlyph />
        </Link>
      </div>
    </div>
  );
}
