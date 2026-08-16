import { Reveal } from "@/components/ui/Reveal";
import { SectionHead, Shell } from "@/components/ui/SectionHead";

/**
 * What replaced the animated tool caricatures.
 *
 * Two problems with what was here. The page ran two near-identical bands of
 * three looping SVG cards back to back, so the second one read as a repeat of
 * the first. And the cards were *drawings* of an app that exists — an
 * illustration of a comment rather than a comment.
 *
 * These are crops of the real screenshot already at the top of this page. Same
 * file, no new bytes to download, and every pixel is the actual application:
 * the connector line really does run from that note to that reference, the
 * video really is sitting on the canvas at 41% zoom. Nothing here had to be
 * drawn to be convincing, because none of it is a drawing.
 */

const SRC = "/site/app-hero.png";
/** Source is 2550×1382. */
const SRC_RATIO = 2550 / 1382;
/** Every frame is 16:10, so a crop's height follows from its width. */
const FRAME = 16 / 10;

type Crop = {
  /** Top-left of the crop, as a fraction of the source image. */
  x: number;
  y: number;
  /** Crop width, as a fraction of the source. Height is derived. */
  w: number;
  title: string;
  blurb: string;
};

const crops: Crop[] = [
  {
    x: 0.088,
    y: 0.425,
    w: 0.255,
    title: "Comments, tied to what they're about",
    blurb:
      "Pin a note to anything on the board. A line runs from the note to the reference it belongs to, so a comment never drifts away from its subject.",
  },
  {
    x: 0.314,
    y: 0.48,
    w: 0.275,
    title: "Video stays video",
    blurb:
      "Reference footage doesn't collapse to a thumbnail the moment it lands. Park it on the frame you want and lift that frame out as a clean still.",
  },
  {
    x: 0.558,
    y: 0.10,
    w: 0.33,
    title: "As much as you can throw at it",
    blurb:
      "Thirty-two items on one surface, at 41% zoom, still readable. The board grows with the project instead of asking you to file things first.",
  },
];

/**
 * Position a crop using `background-position`, whose percentages align the
 * same point of the image with the same point of the box — so showing a crop
 * that starts at fraction `x` needs `x / (1 - cropWidth)`, not `x`. Getting
 * this wrong is off-by-a-little at the edges and off-by-a-lot in the middle.
 */
function frame(c: Crop) {
  // Visible height as a fraction of the source: the crop fills a 16:10 box,
  // so its height in source-space is its width scaled by the box ratio and
  // the source's own aspect.
  const h = (c.w / FRAME) * SRC_RATIO;
  return {
    backgroundImage: `url(${SRC})`,
    backgroundSize: `${100 / c.w}% auto`,
    backgroundPosition: `${(c.x / (1 - c.w)) * 100}% ${(c.y / (1 - h)) * 100}%`,
    backgroundRepeat: "no-repeat",
  };
}

export function CloseUpBand() {
  return (
    <section id="tools" className="scroll-mt-24 py-16 sm:py-24">
      <Shell wide>
        <SectionHead title="Everything lands on one surface.">
          Images, video, screenshots and notes share a single board — the same
          board at the top of this page. These three are cropped straight out
          of it.
        </SectionHead>

        <div className="mt-12 grid gap-x-8 gap-y-10 sm:mt-14 lg:grid-cols-3">
          {crops.map((c, i) => (
            <Reveal key={c.title} delay={i * 80}>
              <div
                // Decorative: the caption below says everything the crop does,
                // and the full screenshot above already carries a real alt.
                role="presentation"
                className="aspect-[16/10] w-full overflow-hidden rounded-2xl border border-line bg-panel shadow-soft"
                style={frame(c)}
              />
              <h3 className="mt-5 text-[1.0125rem] font-semibold tracking-[-0.012em] text-ink">
                {c.title}
              </h3>
              <p className="mt-2 max-w-[42ch] text-pretty text-[0.94rem] leading-[1.6] text-muted">
                {c.blurb}
              </p>
            </Reveal>
          ))}
        </div>
      </Shell>
    </section>
  );
}
