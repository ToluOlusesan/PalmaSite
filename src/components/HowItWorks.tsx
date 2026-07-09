import { steps } from "@/lib/content";
import { Reveal } from "./Reveal";
import { ToolCaricature } from "./ToolCaricatures";

/**
 * The three-step story (Gather, Curate, Export), each an animated caricature
 * card. Additive band that sits between the hero and the Focus spotlight; the
 * caricatures are reused (not duplicated) from the tools rail + the new Export
 * scene. The "01 / 02 / 03" numbering carries the sequence, so no connector art.
 */
export function HowItWorks() {
  return (
    <section id="how" className="relative py-14 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
        <Reveal className="mx-auto max-w-[680px] text-center">
          <span className="text-[11.5px] font-medium uppercase tracking-[0.16em] text-faint">
            How it works
          </span>
          <h2 className="mt-4 font-serif text-[clamp(2.1rem,5vw,3.5rem)] leading-[1.04] tracking-[-0.5px] text-ink">
            Gather, curate, hand off.
          </h2>
          <p className="mx-auto mt-5 max-w-[520px] text-pretty text-[1.02rem] leading-[1.65] text-muted">
            A scattered pile of references becomes a clear direction, and a
            polished moodboard your clients can actually read, in three moves.
          </p>
        </Reveal>

        <div className="mt-14 flex flex-col gap-6 lg:flex-row lg:items-stretch">
          {steps.map((step, i) => (
            // Reveal owns the entrance transform; the inner article owns the
            // hover-lift — kept on separate elements so the two transforms
            // don't clobber each other.
            <Reveal key={step.id} delay={i * 120} className="flex flex-1">
              <article className="group flex w-full flex-col overflow-hidden rounded-[22px] border border-line bg-panel transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-line-2 hover:shadow-lift">
                {/* animated caricature screen — true 16:9, never stretched */}
                <div className="relative aspect-[16/9] shrink-0 overflow-hidden border-b border-line bg-paper">
                  <ToolCaricature id={step.id} />
                </div>

                <div className="flex flex-1 items-start gap-4 p-7">
                  <span className="mt-0.5 font-serif text-[15px] text-faint tabular-nums">
                    {step.n}
                  </span>
                  <div>
                    <h3 className="font-serif text-[1.4rem] leading-[1.12] tracking-[-0.3px] text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-pretty text-[0.95rem] leading-[1.6] text-muted">
                      {step.blurb}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
