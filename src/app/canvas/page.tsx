import type { Metadata } from "next";
import { products } from "@/lib/content";
import { ProductHero } from "@/components/product/ProductHero";
import { CaptionBand } from "@/components/product/CaptionBand";
import { ProductGet, SiblingBand } from "@/components/product/ProductGet";
import { SharedPrinciples } from "@/components/family/SharedPrinciples";
import { CanvasShot } from "@/components/canvas/CanvasShot";
import { CaricatureDefs } from "@/components/canvas/ToolCaricatures";
import { StepBand } from "@/components/canvas/StepBand";
import { CloseUpBand } from "@/components/canvas/CloseUpBand";
import { WhatsNew } from "@/components/canvas/WhatsNew";

const p = products.canvas;

export const metadata: Metadata = {
  title: p.name,
  description: p.lede,
  openGraph: { title: `${p.name} — ${p.kicker}`, description: p.lede },
  twitter: { title: `${p.name} — ${p.kicker}`, description: p.lede },
};

/** Three details visible in the hero shot, named so the screenshot becomes
 *  evidence rather than decoration. */
const captions = [
  {
    n: "01",
    title: "One infinite surface",
    blurb:
      "Images, video and screenshots all live on the same board. Pan, zoom, and drop a new reference anywhere.",
  },
  {
    n: "02",
    title: "Video stays playable",
    blurb:
      "Reference footage doesn't become a thumbnail. Park it on the frame you want and lift the still out in place.",
  },
  {
    n: "03",
    title: "Notes sit beside the board",
    blurb:
      "Draft the brief where the references are, instead of in a document that forgets what it was about.",
  },
];

export default function CanvasPage() {
  return (
    // The product scope. Everything below reads `var(--accent)` rather than
    // naming a colour, so this one attribute decides the page's identity —
    // Canvas resolves it to ink, because the colour on this page belongs to
    // the references, not to the tool holding them.
    <div data-product="canvas">
      <CaricatureDefs />
      <ProductHero product={p}>
        <CanvasShot />
      </ProductHero>
      <CaptionBand items={captions} />
      <StepBand />
      <CloseUpBand />
      <SharedPrinciples />
      <WhatsNew />
      <ProductGet product={p} />
      <SiblingBand current="canvas" />
    </div>
  );
}
