import type { Metadata } from "next";
import { noteCaptions, products } from "@/lib/content";
import { ProductHero } from "@/components/product/ProductHero";
import { CaptionBand } from "@/components/product/CaptionBand";
import { ProductGet, SiblingBand } from "@/components/product/ProductGet";
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
      <ProductGet product={p} />
      <SiblingBand current="note" />
    </div>
  );
}
