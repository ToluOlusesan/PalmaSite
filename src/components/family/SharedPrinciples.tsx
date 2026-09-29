import { principles } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead, Shell } from "@/components/ui/SectionHead";

export function SharedPrinciples() {
  return (
    <section id="why" className="scroll-mt-24 py-16 sm:py-24">
      <Shell>
        <SectionHead eyebrow="The practical bits" title="Useful without the extra steps.">
          You should be able to open a tool, do the work, and know where it went.
        </SectionHead>

        <div className="mt-11 grid gap-3 sm:mt-14 sm:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 70} className="flex min-h-[215px] flex-col rounded-[10px] border border-line bg-panel/40 p-7 sm:p-8">
              <span className="text-[12px] font-medium tabular-nums text-faint">0{i + 1}</span>
              <h3 className="mt-7 text-[1.35rem] font-semibold tracking-[-0.03em] text-ink">{p.title}</h3>
              <p className="mt-2.5 max-w-[27rem] text-pretty text-[0.97rem] leading-[1.6] text-muted">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </Shell>
    </section>
  );
}
