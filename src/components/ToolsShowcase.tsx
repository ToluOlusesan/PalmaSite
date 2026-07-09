import { Camera, MessageSquareText, NotebookPen, type LucideIcon } from "lucide-react";
import { tools, type ToolId } from "@/lib/content";
import { Reveal } from "./Reveal";
import { ToolCaricature } from "./ToolCaricatures";

/** One icon per tool, shown as a badge beside the heading. Partial — only the
 *  three tools that appear in this rail need an entry. */
const toolIcons: Partial<Record<ToolId, LucideIcon>> = {
  comments: MessageSquareText,
  "video-to-shot": Camera,
  scratchpad: NotebookPen,
};

/**
 * The tools, told as a stack of full-width feature rows on plain vertical scroll
 * — copy on one side, an animated caricature screen on the other, sides
 * alternating down the page. (Replaces the old pinned/scroll-jacked rail, which
 * hijacked the scroll; this reads at the reader's own pace.) Stays monochrome:
 * charcoal cards on a grain-textured black, each framing a light app still like
 * a lit screen that pushes and tilts toward you on hover.
 */
export function ToolsShowcase() {
  return (
    <section
      id="tools"
      className="section-invert relative overflow-hidden py-16 sm:py-28"
    >
      <div className="grain-invert" aria-hidden />

      <div className="relative z-[1] mx-auto max-w-[1120px] px-6 sm:px-10">
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

        <div className="mt-16 flex flex-col gap-6 sm:gap-8">
          {tools.map((tool, i) => {
            // Alternate which side the screen sits on, row by row — and tilt it
            // the opposite way on hover so the two rows mirror each other.
            const flip = i % 2 === 1;
            const Icon = toolIcons[tool.id];
            return (
              <Reveal key={tool.id}>
                <article className="group grid items-center gap-8 rounded-[28px] border border-line bg-panel p-6 transition-[border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-line-2 hover:shadow-lift sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-12">
                  {/* animated caricature screen — kept at its true 16:10 frame so
                      the scene is never stretched, and pushed + tilted on hover */}
                  <div
                    className={`relative aspect-[16/10] self-center overflow-hidden rounded-2xl border border-line bg-paper shadow-soft transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:-translate-y-2 group-hover:scale-[1.03] group-hover:shadow-lift ${
                      flip
                        ? "lg:order-2 group-hover:rotate-[1.6deg]"
                        : "group-hover:-rotate-[1.6deg]"
                    }`}
                  >
                    <ToolCaricature id={tool.id} />
                  </div>

                  {/* copy */}
                  <div className="flex flex-col justify-center gap-4 lg:px-2">
                    <div className="flex items-center gap-3">
                      {Icon && (
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line-2 text-ink transition-colors group-hover:border-ink">
                          <Icon className="h-[22px] w-[22px]" strokeWidth={1.5} aria-hidden />
                        </span>
                      )}
                      <span className="font-serif text-[15px] text-faint tabular-nums">
                        {tool.index}
                      </span>
                    </div>
                    <h3 className="font-serif text-[clamp(1.6rem,2.6vw,2.15rem)] leading-[1.1] tracking-[-0.4px] text-ink">
                      {tool.name}
                    </h3>
                    <p className="max-w-[46ch] text-pretty text-[1rem] leading-[1.65] text-muted">
                      {tool.blurb}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
