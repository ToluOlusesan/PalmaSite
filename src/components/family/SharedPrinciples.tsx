import { CloudOff, HardDrive, Infinity, User, type LucideIcon } from "lucide-react";
import { principles, type PrincipleIcon } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead, Shell } from "@/components/ui/SectionHead";

const icons: Record<PrincipleIcon, LucideIcon> = {
  "hard-drive": HardDrive,
  "cloud-off": CloudOff,
  infinity: Infinity,
  user: User,
};

export function SharedPrinciples() {
  return (
    <section id="why" className="scroll-mt-24 py-16 sm:py-24">
      <Shell>
        <SectionHead title="Useful without the extra steps.">
          You should be able to open a tool, do the work, and know where it went.
        </SectionHead>

        <div className="mt-11 grid gap-3 sm:mt-14 sm:grid-cols-2">
          {principles.map((p, i) => {
            const Icon = icons[p.icon];
            return (
              <Reveal key={p.title} delay={(i % 2) * 70} className="flex min-h-[215px] flex-col rounded-[10px] border border-line bg-panel/40 p-7 sm:p-8">
                <span className="grid h-11 w-11 place-items-center rounded-[9px] border border-line bg-paper text-ink">
                  <Icon className="h-[21px] w-[21px]" strokeWidth={1.5} aria-hidden />
                </span>
                <h3 className="mt-6 text-[1.15rem] font-semibold tracking-[-0.025em] text-ink">{p.title}</h3>
                <p className="mt-2.5 max-w-[27rem] text-pretty text-[0.97rem] leading-[1.6] text-muted">{p.body}</p>
              </Reveal>
            );
          })}
        </div>
      </Shell>
    </section>
  );
}
