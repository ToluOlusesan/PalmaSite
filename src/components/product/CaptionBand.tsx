import { Reveal } from "@/components/ui/Reveal";
import { Shell } from "@/components/ui/SectionHead";

export type Caption = { n: string; title: string; blurb: string };

/**
 * Three captions immediately under the hero shot, pointing at things already
 * visible in it.
 *
 * This band exists because a screenshot alone is a picture of an app, not an
 * argument for it. Naming three details the reader has just looked at turns
 * the shot into evidence — and it does it before asking anyone to scroll
 * through a feature list.
 */
export function CaptionBand({ items }: { items: Caption[] }) {
  return (
    <section className="pb-4 pt-10 sm:pb-8 sm:pt-14">
      <Shell wide>
        <div className="grid gap-x-10 gap-y-9 sm:grid-cols-3">
          {items.map((c, i) => (
            <Reveal key={c.title} delay={i * 70}>
              <span className="text-[13px] tabular-nums text-[var(--accent)]">{c.n}</span>
              {/* h2 despite the small type. This band sits directly under the
                  page's h1 with no heading of its own above it, so h3 would
                  skip a level; the size here is a matter of emphasis, not of
                  rank. */}
              <h2 className="mt-2.5 text-[1.0125rem] font-semibold leading-[1.3] tracking-[-0.012em] text-ink">
                {c.title}
              </h2>
              <p className="mt-2 text-pretty text-[0.925rem] leading-[1.6] text-muted">
                {c.blurb}
              </p>
            </Reveal>
          ))}
        </div>
      </Shell>
    </section>
  );
}
