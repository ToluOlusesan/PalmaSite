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
 * that note really is sitting between those two references, the board really
 * does hold 36 items at 40% zoom. Nothing here had to be drawn to be
 * convincing, because none of it is a drawing.
 *
 * The coordinates below are tied to that specific screenshot. Replace the hero
 * and these crops silently point at whatever now occupies those fractions of
 * the frame — so re-crop and re-caption whenever the source image changes.
 */

const SRC = "/site/app-hero-1.3.png";
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
    x: 0.098,
    y: 0.239,
    w: 0.243,
    title: "Keep the detail",
    blurb:
      "A card keeps the image behind it rather than shrinking it into a disposable thumbnail. Zoom in and the detail is still there.",
  },
  {
    x: 0.365,
    y: 0.239,
    w: 0.353,
    title: "Let the board grow",
    blurb:
      "Thirty-six items at 40% zoom are still readable. The surface grows with the project instead of forcing an organisation system too early.",
  },
  {
    x: 0.549,
    y: 0.405,
    w: 0.275,
    title: "Keep notes in context",
    blurb:
      "Write beside the reference that prompted the thought. The note moves, resizes and exports with the rest of the board.",
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
        <SectionHead title="Built for the messy middle.">
          Images, video, screenshots and notes can coexist while the project is
          still finding its shape. These details come from the real board above.
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
