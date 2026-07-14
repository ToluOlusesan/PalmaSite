import { Sparkles, Wand2, Wrench, type LucideIcon } from "lucide-react";
import { releases, type ReleaseGroupKind } from "@/lib/content";
import { Reveal } from "./Reveal";

// One accent + icon per change kind, echoing the colour treatment on Principles.
const meta: Record<ReleaseGroupKind, { label: string; icon: LucideIcon; accent: string }> = {
  new: { label: "New", icon: Sparkles, accent: "#2563eb" },
  refined: { label: "Refined", icon: Wand2, accent: "#ec4899" },
  fixed: { label: "Fixed", icon: Wrench, accent: "#16a34a" },
};

// The "What's new" band — features the latest release, grouped into New /
// Refined / Fixed. Copy lives in content.ts (site.releases).
export function WhatsNew() {
  const r = releases[0];
  if (!r) return null;

  return (
    <section id="whats-new" className="relative py-14 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
        <Reveal className="mx-auto max-w-[680px] text-center">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-line-2 px-3.5 py-1 text-[11.5px] font-medium uppercase tracking-[1.5px] text-muted">
            <span>v{r.version}</span>
            <span className="h-1 w-1 rounded-full bg-line-2" aria-hidden />
            <span>{r.date}</span>
          </div>
          <h2 className="mt-5 font-serif text-[clamp(2.1rem,5vw,3.5rem)] leading-[1.04] tracking-[-0.5px] text-ink">
            What&rsquo;s new
          </h2>
          <p className="mx-auto mt-5 max-w-[520px] text-pretty text-[1.02rem] leading-[1.65] text-muted">
            {r.headline}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {r.groups.map((g, gi) => {
            const m = meta[g.kind];
            const Icon = m.icon;
            return (
              <Reveal
                key={g.kind}
                delay={gi * 60}
                className="flex flex-col rounded-2xl border border-line bg-panel p-7 transition-colors hover:border-line-2"
              >
                <span
                  className="grid h-11 w-11 place-items-center rounded-xl border"
                  style={{ color: m.accent, backgroundColor: `${m.accent}26`, borderColor: `${m.accent}66` }}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                </span>
                <h3 className="mt-6 text-[1.1rem] font-semibold tracking-[-0.1px] text-ink">
                  {m.label}
                </h3>
                <ul className="mt-3.5 flex flex-col gap-2.5">
                  {g.items.map((it) => (
                    <li key={it} className="flex gap-2.5 text-[0.93rem] leading-[1.55] text-muted">
                      <span
                        className="mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full"
                        style={{ backgroundColor: m.accent }}
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
      </div>
    </section>
  );
}
