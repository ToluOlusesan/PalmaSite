"use client";

import { Sparkles, Wand2, Wrench, type LucideIcon } from "lucide-react";
import { type PointerEvent } from "react";
import { type ReleaseGroupKind, type ReleaseNote } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead, Shell } from "@/components/ui/SectionHead";

const meta: Record<ReleaseGroupKind, { label: string; icon: LucideIcon }> = {
  new: { label: "New", icon: Sparkles },
  refined: { label: "Refined", icon: Wand2 },
  fixed: { label: "Fixed", icon: Wrench },
};

function followCardEdge(event: PointerEvent<HTMLElement>) {
  const box = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--release-edge-x", `${event.clientX - box.left}px`);
  event.currentTarget.style.setProperty("--release-edge-y", `${event.clientY - box.top}px`);
}

/**
 * One release, grouped into New / Refined / Fixed.
 *
 * The three groups used to be told apart by colour — a blue, a pink and a
 * green icon tile. They are told apart by icon and label now, because Canvas's
 * whole visual argument is that the app brings no colour of its own to a
 * screen full of somebody else's photographs, and a decorative hue in the
 * chrome quietly contradicts the screenshots two sections up.
 *
 * The entry arrives as a prop, and the component moved out of `canvas/` when
 * PalmaNote shipped an installer of its own: a band that reached for a
 * module-level `releases` would have meant one product's changelog wearing the
 * generic name, and the second product copying the component to get its own.
 */
export function WhatsNew({ release: r }: { release: ReleaseNote | undefined }) {
  if (!r) return null;

  return (
    <section id="whats-new" className="scroll-mt-24 py-16 sm:py-24">
      <Shell>
        <SectionHead
          eyebrow={`v${r.version} · ${r.date}`}
          title={<>Latest changes</>}
        >
          {r.headline}
        </SectionHead>

        <div
          className={`mx-auto mt-12 grid gap-4 sm:mt-14 ${
            r.groups.length === 2 ? "max-w-[44rem] lg:grid-cols-2" : "lg:grid-cols-3"
          }`}
        >
          {r.groups.map((g, gi) => {
            const m = meta[g.kind];
            const Icon = m.icon;
            return (
              <Reveal
                key={g.kind}
                delay={gi * 70}
                className="release-card flex flex-col rounded-2xl border border-line bg-panel p-7 transition-colors duration-300 hover:border-line-2"
                onPointerMove={followCardEdge}
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
        <p className="mx-auto mt-8 text-center text-[14px] text-muted">
          <a
            href="/note/changes"
            className="font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
          >
            Read the full PalmaNote changelog
          </a>
        </p>
      </Shell>
    </section>
  );
}

/** The complete release history, used by the dedicated changelog route. */
export function ReleaseHistory({ releases }: { releases: ReleaseNote[] }) {
  return (
    <div className="space-y-16 sm:space-y-20">
      {releases.map((r) => (
        <article key={r.version} aria-labelledby={`release-${r.version}`}>
          <div className="mx-auto max-w-[44rem] text-center">
            <span className="eyebrow">v{r.version} · {r.date}</span>
            <h2 id={`release-${r.version}`} className="mt-4 text-balance text-[clamp(1.5rem,3vw,2.1rem)] font-semibold tracking-[-0.03em] text-ink">
              {r.headline}
            </h2>
          </div>
          <div className={`mx-auto mt-8 grid gap-4 ${r.groups.length === 2 ? "max-w-[44rem] lg:grid-cols-2" : "lg:grid-cols-3"}`}>
            {r.groups.map((g, gi) => {
              const m = meta[g.kind];
              const Icon = m.icon;
              return (
                <Reveal
                  key={`${r.version}-${g.kind}`}
                  delay={gi * 70}
                  className="release-card flex flex-col rounded-2xl border border-line bg-panel p-7 transition-colors duration-300 hover:border-line-2"
                  onPointerMove={followCardEdge}
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-paper text-ink">
                    <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                  </span>
                  <h3 className="mt-6 text-[1.075rem] font-semibold tracking-[-0.012em] text-ink">
                    {m.label}
                  </h3>
                  <ul className="mt-3.5 flex flex-col gap-2.5">
                    {g.items.map((it) => (
                      <li key={it} className="flex gap-2.5 text-[0.92rem] leading-[1.55] text-muted">
                        <span className="mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full bg-line-2" aria-hidden />
                        <span className="text-pretty">{it}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              );
            })}
          </div>
        </article>
      ))}
    </div>
  );
}
