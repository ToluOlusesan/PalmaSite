import { steps } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead, Shell } from "@/components/ui/SectionHead";
import { ToolCaricature } from "./ToolCaricatures";

/**
 * The three-step story (Gather, Curate, Export), each an animated caricature
 * card. The caricatures are reused rather than duplicated — the same art
 * powers the tools band below — and the "01 / 02 / 03" numbering carries the
 * sequence, so there is no connector art to break at a wrap.
 */
export function StepBand() {
  return (
    <section id="how" className="scroll-mt-24 py-16 sm:py-24">
      <Shell wide>
        <SectionHead title="Gather, curate, hand off.">
          A scattered pile of references becomes a clear direction, and a
          polished moodboard your clients can actually read, in three moves.
        </SectionHead>

        <div className="mt-12 flex flex-col gap-5 sm:mt-14 lg:flex-row lg:items-stretch">
          {steps.map((step, i) => (
            // Reveal owns the entrance transform; the inner article owns the
            // hover-lift — kept on separate elements so the two transforms
            // don't clobber each other.
            <Reveal key={step.id} delay={i * 100} className="flex flex-1">
              <article className="group flex w-full flex-col overflow-hidden rounded-[1.25rem] border border-line bg-panel transition-[transform,border-color,box-shadow] duration-500 ease-[var(--ease-out)] hover:-translate-y-1.5 hover:border-line-2 hover:shadow-lift motion-reduce:hover:translate-y-0">
                {/* animated caricature screen — true 16:9, never stretched */}
                <div className="relative aspect-[16/9] shrink-0 overflow-hidden border-b border-line bg-paper">
                  <ToolCaricature id={step.id} />
                </div>

                <div className="flex flex-1 items-start gap-4 p-7">
                  <span className="mt-0.5 font-serif text-[15px] tabular-nums text-faint">
                    {step.n}
                  </span>
                  <div>
                    <h3 className="display-sm text-[1.35rem] text-ink">{step.title}</h3>
                    <p className="mt-2 text-pretty text-[0.94rem] leading-[1.6] text-muted">
                      {step.blurb}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Shell>
    </section>
  );
}
