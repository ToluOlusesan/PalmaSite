import type { Metadata } from "next";
import { noteCaptions, noteReleases, products } from "@/lib/content";
import { ProductHero } from "@/components/product/ProductHero";
import { CaptionBand } from "@/components/product/CaptionBand";
import { ProductGet, SiblingBand } from "@/components/product/ProductGet";
import { WebBand } from "@/components/product/WebBand";
import { WhatsNew } from "@/components/product/WhatsNew";
import { SharedPrinciples } from "@/components/family/SharedPrinciples";
import { NoteWindow } from "@/components/note/NoteWindow";
import { WritingChart } from "@/components/note/WritingChart";
import { InsertDemo } from "@/components/note/InsertDemo";
import { HistoryBand } from "@/components/note/HistoryBand";

const p = products.note;

export const metadata: Metadata = {
  title: p.name,
  description: p.lede,
  openGraph: { title: `${p.name} — ${p.kicker}`, description: p.lede },
  twitter: { title: `${p.name} — ${p.kicker}`, description: p.lede },
};

export default function NotePage() {
  return (
    // The product scope. One attribute retints the whole page: every
    // `var(--accent)` below resolves to Cobalt, and the tiles and solid
    // buttons pick up the Cobalt→Violet run. This is the only place in the
    // family where that gradient is allowed to appear.
    <div data-product="note">
      <ProductHero product={p}>
        <NoteWindow />
      </ProductHero>
      <CaptionBand items={noteCaptions} />
      <InsertDemo />
      <WritingChart />
      <SharedPrinciples />
      <HistoryBand />
      {/* After the durability argument, not before it. "Open it in a tab" is
          an easier promise to believe once the page has explained that nothing
          you write can go missing. */}
      <WebBand product={p} />
      {/* Where Canvas keeps it: the last band before the download, so what
          changed lately is read on the way to the button rather than instead
          of it. */}
      <WhatsNew release={noteReleases[0]} />
      <ProductGet product={p} />
      <SiblingBand current="note" />
    </div>
  );
}
