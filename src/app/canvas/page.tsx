import type { Metadata } from "next";
import { canvasReleases, products } from "@/lib/content";
import { ProductHero } from "@/components/product/ProductHero";
import { CaptionBand } from "@/components/product/CaptionBand";
import { ProductGet, SiblingBand } from "@/components/product/ProductGet";
import { SharedPrinciples } from "@/components/family/SharedPrinciples";
import { CanvasShot } from "@/components/canvas/CanvasShot";
import { CaricatureDefs } from "@/components/canvas/ToolCaricatures";
import { StepBand } from "@/components/canvas/StepBand";
import { IntroducingStoryboard } from "@/components/canvas/IntroducingStoryboard";
import { CloseUpBand } from "@/components/canvas/CloseUpBand";
import { WhatsNew } from "@/components/product/WhatsNew";

const p = products.canvas;

export const metadata: Metadata = {
  title: `${p.name} — Free offline reference board for designers`,
  description: p.lede,
  openGraph: {
    title: `${p.name} — Free offline reference board for designers`,
    description: p.lede,
  },
  twitter: {
    title: `${p.name} — Free offline reference board for designers`,
    description: p.lede,
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: p.name,
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Windows",
  description: p.lede,
  url: "https://palmaboard.com/canvas",
  downloadUrl: p.downloadUrl,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

/** Three details visible in the hero shot, named so the screenshot becomes
 *  evidence rather than decoration. */
const captions = [
  {
    n: "01",
    title: "One surface, no filing system",
    blurb:
      "Images, video and screenshots can land wherever the thought makes sense. Pan, zoom and rearrange as the direction emerges.",
  },
  {
    n: "02",
    title: "Video stays useful",
    blurb:
      "Play reference footage on the board, stop on the frame you need, and lift that moment out as a still.",
  },
  {
    n: "03",
    title: "Notes stay in context",
    blurb:
      "Write the thought where the reference is, instead of moving to a document that has lost the visual context.",
  },
];

export default function CanvasPage() {
  return (
    // The product scope. Everything below reads `var(--accent)` rather than
    // naming a colour, so this one attribute decides the page's identity —
    // Canvas resolves it to ink, because the colour on this page belongs to
    // the references, not to the tool holding them.
    <div data-product="canvas">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <CaricatureDefs />
      <ProductHero product={p}>
        <CanvasShot />
      </ProductHero>
      <CaptionBand items={captions} />
      <IntroducingStoryboard />
      <StepBand />
      <CloseUpBand />
      <SharedPrinciples />
      <WhatsNew release={canvasReleases[0]} />
      <ProductGet product={p} />
      <SiblingBand current="canvas" />
    </div>
  );
}
