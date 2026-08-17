import { Reveal } from "@/components/ui/Reveal";
import { SectionHead, Shell } from "@/components/ui/SectionHead";
import { IconCalendar, IconChevronDown, IconPen, IconTrend } from "./NoteIcons";

/**
 * The writing stats dialog, shown as itself.
 *
 * The section exists to make one distinction the app cares about: it counts
 * words *touched*, so a day spent cutting forty words still reads as work. No
 * streak and no personal best, because the moment a chart can be broken it
 * starts deciding what you write.
 *
 * The four heat steps are the accent mixed toward the page. Step zero is a
 * neutral grey rather than the palest blue, because a day with no writing is
 * the absence of the scale, not its floor — tinting it would imply that not
 * writing is a small amount of writing.
 */

/** A plausible month: some good runs, some blank days, no streak.
 *  Days after TODAY haven't happened yet. */
const HEAT: Record<number, number> = {
  1: 2, 2: 1, 3: 3, 4: 4, 5: 0, 6: 2, 7: 3, 8: 0,
  9: 1, 10: 4, 11: 2, 12: 3, 13: 0, 14: 4, 15: 3,
  16: 0, 17: 2, 18: 4, 19: 1, 20: 0, 21: 3, 22: 2,
  23: 0, 24: 4,
};

/** Late in the month on purpose. At mid-month the grid is half empty, which
 *  reads as a chart with no data rather than as a month in progress. */
const TODAY = 24;
const DAYS = 31;
/** August 2026 opens on a Saturday, and the grid runs Monday-first. */
const LEADING_BLANKS = 5;

/** The five steps live in CSS (`--heat-*` in globals.css) alongside the rest
 *  of PalmaNote's palette, so the scale is re-tuned in one place rather than
 *  in this file. The top two are dark enough that their labels have to
 *  invert. */
const STEPS = [0, 1, 2, 3, 4].map((i) => ({
  bg: `var(--heat-${i})`,
  fg: i >= 3 ? "var(--heat-ink-hi)" : "var(--heat-ink-lo)",
}));

export function WritingChart() {
  const cells = [
    ...Array.from({ length: LEADING_BLANKS }, (_, i) => ({ blank: true, n: -i - 1 })),
    ...Array.from({ length: DAYS }, (_, i) => ({ blank: false, n: i + 1 })),
  ];

  return (
    <section className="py-16 sm:py-24">
      <Shell>
        <SectionHead title="It notices that you wrote.">
          A square is a day, and it counts the words you <em>touched</em>, so an
          afternoon spent cutting still shows up. There are no streaks to keep
          and nothing to lose by skipping a week.
        </SectionHead>

        <Reveal className="mt-12 sm:mt-14">
          <div className="mx-auto max-w-[38rem] overflow-hidden rounded-[1.1rem] border border-line bg-paper shadow-lift">
            {/* dialog head */}
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line px-6 py-5">
              <div className="flex gap-3">
                <span className="mt-0.5 text-[var(--accent)]">
                  <IconTrend size={19} />
                </span>
                <div>
                  <h3 className="text-[1rem] font-semibold tracking-[-0.012em] text-ink">
                    Your writing
                  </h3>
                  <p className="text-[0.8125rem] text-faint">
                    A quick look at your writing activity.
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 text-[0.8125rem] text-muted">
                <IconCalendar size={15} />
                August 2026
                <IconChevronDown size={13} />
              </span>
            </div>

            {/* the two figures that matter */}
            <div className="grid gap-3 px-6 pt-5 sm:grid-cols-2">
              {[
                { icon: <IconPen size={16} />, num: "31,204", label: "Words this month" },
                { icon: <IconCalendar size={16} />, num: "18", label: "Writing days" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-3 rounded-xl border border-line bg-panel/60 px-4 py-3.5"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent)]">
                    {s.icon}
                  </span>
                  <div>
                    <div className="text-[1.125rem] font-semibold tabular-nums tracking-[-0.02em] text-ink">
                      {s.num}
                    </div>
                    <div className="text-[0.75rem] text-faint">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* the month */}
            <div className="px-6 pt-6">
              <div className="grid grid-cols-7 gap-1.5 pb-2 text-center text-[0.6875rem] text-faint">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1.5">
                {cells.map((c) => {
                  if (c.blank) return <span key={c.n} aria-hidden />;
                  const future = c.n > TODAY;
                  const step = STEPS[HEAT[c.n] ?? 0];
                  return (
                    <span
                      key={c.n}
                      className={`grid aspect-square place-items-center rounded-[0.4rem] text-[0.6875rem] tabular-nums ${
                        c.n === TODAY ? "ring-2 ring-[var(--accent)] ring-offset-2" : ""
                      }`}
                      style={
                        future
                          ? // Days that haven't happened get almost no ink. A
                            // dashed outline reads as a control you could fill
                            // in, and pulls the eye to the emptiest part of
                            // the chart.
                            { color: "var(--color-line-2)" }
                          : { backgroundColor: step.bg, color: step.fg }
                      }
                    >
                      {c.n}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* legend */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-5 text-[0.75rem] text-faint">
              <span>Monday, August 24 · 1,284 words · 41 minutes</span>
              <span className="flex items-center gap-1.5">
                Less
                <span className="flex gap-1">
                  {STEPS.map((s, i) => (
                    <span
                      key={i}
                      className="h-2.5 w-2.5 rounded-[0.2rem]"
                      style={{ backgroundColor: s.bg }}
                      aria-hidden
                    />
                  ))}
                </span>
                More
              </span>
            </div>
          </div>
        </Reveal>
      </Shell>
    </section>
  );
}
