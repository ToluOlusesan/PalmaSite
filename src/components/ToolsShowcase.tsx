import { tools } from "@/lib/content";
import { Reveal } from "./Reveal";
import { ToolCaricature } from "./ToolCaricatures";

/**
 * The essential tools, laid out as a plain white 2×2 grid — each cell a framed
 * caricature "screen" of the app performing the action, with the heading and
 * blurb sitting directly beneath it (the reference feature-grid layout).
 *
 * No inverted background, no vertical tab-list, no pointer-driven 3D tilt: the
 * caricatures used to sit on a GPU-composited, `will-change`-promoted, tilted
 * surface, which softened their crisp SVG line-work. Rendered flat on paper they
 * stay sharp.
 */
export function ToolsShowcase() {
  return (
    <section id="tools" className="relative py-16 sm:py-28">
      <div className="mx-auto max-w-[1120px] px-6 sm:px-10">
        <Reveal className="mx-auto max-w-[680px] text-center">
          <span className="text-[11.5px] font-medium uppercase tracking-[0.16em] text-faint">
            The tools
          </span>
          <h2 className="mt-4 font-serif text-[clamp(2.1rem,5vw,3.5rem)] leading-[1.04] tracking-[-0.5px] text-ink">
            Curate your references.
          </h2>
          <p className="mx-auto mt-5 max-w-[560px] text-pretty text-[1.02rem] leading-[1.65] text-muted">
            Everything you need to turn a scattered pile of references into a
            clear creative direction. Arrange on an infinite canvas, mark refs
            up where it matters, pull clean stills from video, and draft the
            brief right beside the board.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:mt-16 lg:gap-x-16 lg:gap-y-16">
          {tools.map((tool, i) => {
            // A trailing odd card would sit alone in the left column; span it
            // across both and pin it to one-column width, centred (the column
            // width is 50% minus half the current column-gap).
            const orphan = i === tools.length - 1 && tools.length % 2 === 1;
            return (
            // Reveal owns the entrance; the inner group owns the hover-lift —
            // separate elements so the two transforms don't clobber each other.
            <Reveal
              key={tool.id}
              delay={(i % 2) * 100}
              className={
                orphan
                  ? "sm:col-span-2 sm:mx-auto sm:w-[calc(50%-1.25rem)] lg:w-[calc(50%-2rem)]"
                  : undefined
              }
            >
              <article className="group">
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-line bg-panel shadow-soft transition-[transform,box-shadow] duration-500 ease-[var(--ease-out)] group-hover:-translate-y-1 group-hover:shadow-lift">
                  <ToolCaricature id={tool.id} />
                </div>

                <div className="mt-6 flex items-baseline gap-3">
                  <span className="font-serif text-[15px] text-faint tabular-nums">
                    {tool.index}
                  </span>
                  <h3 className="font-serif text-[1.55rem] leading-[1.1] tracking-[-0.3px] text-ink">
                    {tool.name}
                  </h3>
                </div>
                <p className="mt-3 max-w-[48ch] text-pretty text-[1rem] leading-[1.65] text-muted">
                  {tool.blurb}
                </p>
              </article>
            </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
