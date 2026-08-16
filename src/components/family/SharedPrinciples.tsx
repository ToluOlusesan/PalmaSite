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

/**
 * What both apps promise. Stated once, at family level, and shown on every
 * page — a promise repeated in two slightly different wordings on two product
 * pages is a promise nobody quite believes.
 *
 * Deliberately monochrome even though the rest of the site has two accents
 * available: this band is the part that belongs to *neither* product, and
 * tinting it would quietly hand it to one of them.
 */
export function SharedPrinciples() {
  return (
    <section id="why" className="scroll-mt-24 border-y border-line bg-panel/60 py-16 sm:py-24">
      <Shell>
        <SectionHead title="The same spine, both times.">
          Two apps, one set of promises. Neither of them has an account screen,
          a sync indicator, or a plan to grow one.
        </SectionHead>

        <div className="mt-12 grid gap-4 sm:mt-14 sm:grid-cols-2">
          {principles.map((p, i) => {
            const Icon = icons[p.icon];
            return (
              <Reveal
                key={p.title}
                delay={(i % 2) * 70}
                className="flex flex-col rounded-2xl border border-line bg-paper p-7 transition-colors duration-300 hover:border-line-2"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-panel text-ink">
                  <Icon className="h-[21px] w-[21px]" strokeWidth={1.5} aria-hidden />
                </span>
                <h3 className="mt-6 text-[1.075rem] font-semibold tracking-[-0.012em] text-ink">
                  {p.title}
                </h3>
                <p className="mt-2.5 text-pretty text-[0.95rem] leading-[1.6] text-muted">
                  {p.body}
                </p>
              </Reveal>
            );
          })}
        </div>
      </Shell>
    </section>
  );
}
