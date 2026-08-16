import { Sparkles, Wand2, Wrench, type LucideIcon } from "lucide-react";
import { releases, type ReleaseGroupKind } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead, Shell } from "@/components/ui/SectionHead";

const meta: Record<ReleaseGroupKind, { label: string; icon: LucideIcon }> = {
  new: { label: "New", icon: Sparkles },
  refined: { label: "Refined", icon: Wand2 },
  fixed: { label: "Fixed", icon: Wrench },
};

/**
 * The latest release, grouped into New / Refined / Fixed.
 *
 * The three groups used to be told apart by colour — a blue, a pink and a
 * green icon tile. They are told apart by icon and label now, because Canvas's
 * whole visual argument is that the app brings no colour of its own to a
 * screen full of somebody else's photographs, and a decorative hue in the
 * chrome quietly contradicts the screenshots two sections up.
 */
export function WhatsNew() {
  const r = releases[0];
  if (!r) return null;

  return (
    <section id="whats-new" className="scroll-mt-24 py-16 sm:py-24">
      <Shell>
        <SectionHead
          eyebrow={`v${r.version} · ${r.date}`}
          title={<>What&rsquo;s new</>}
        >
          {r.headline}
        </SectionHead>

        <div className="mt-12 grid gap-4 sm:mt-14 lg:grid-cols-3">
          {r.groups.map((g, gi) => {
            const m = meta[g.kind];
            const Icon = m.icon;
            return (
              <Reveal
                key={g.kind}
                delay={gi * 70}
                className="flex flex-col rounded-2xl border border-line bg-panel p-7 transition-colors duration-300 hover:border-line-2"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-paper text-ink">
                  <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                </span>
                <h3 className="mt-6 text-[1.075rem] font-semibold tracking-[-0.012em] text-ink">
                  {m.label}
                </h3>
                <ul className="mt-3.5 flex flex-col gap-2.5">
                  {g.items.map((it) => (
                    <li
                      key={it}
                      className="flex gap-2.5 text-[0.92rem] leading-[1.55] text-muted"
                    >
                      <span
                        className="mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full bg-line-2"
                        aria-hidden
                      />
                      <span className="text-pretty">{it}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </Shell>
    </section>
  );
}
