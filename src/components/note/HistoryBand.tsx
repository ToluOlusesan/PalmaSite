import { Reveal } from "@/components/ui/Reveal";
import { SectionHead, Shell } from "@/components/ui/SectionHead";
import { IconHistory } from "./NoteIcons";

/**
 * What replaced the keyboard-shortcuts list.
 *
 * A shortcut table is reference material — useful once you already own the
 * app, and an odd thing to put in front of someone deciding whether to. This
 * says something about the product instead: that the app is built so you can't
 * lose work, and exactly how.
 *
 * Every claim here is drawn from the app's own spec (FEATURES.md §12 History,
 * §13 Durability) rather than written as marketing, which is why they carry
 * numbers.
 */

const points = [
  {
    title: "It saves as you type",
    body: "Half a second after you stop typing, and again when you navigate away, switch tabs or close the window. Saving never blocks a keystroke.",
  },
  {
    title: "Every page keeps its own history",
    body: "One snapshot per two minutes of actual writing, plus one each time you leave the page. Not one per keystroke, which would just fill your disk with hundreds of near-identical copies of the same chapter.",
  },
];

/** A plausible revision list — newest first, with the word delta each one
 *  carries against the version before it. */
const revisions = [
  { when: "12 minutes ago", words: "1,284 words", delta: "+312", now: true },
  { when: "1 hour ago", words: "972 words", delta: "−48" },
  { when: "Yesterday, 21:14", words: "1,020 words", delta: "+140" },
  { when: "Sunday, 09:02", words: "880 words", delta: "+880" },
];

export function HistoryBand() {
  return (
    <section className="py-16 sm:py-24">
      <Shell>
        <SectionHead title="Nothing you wrote is gone.">
          It&rsquo;s all in one file on your disk, and every page keeps its own
          revisions. There&rsquo;s no sync indicator because there&rsquo;s
          nothing to sync.
        </SectionHead>

        {/* `items-center`, so the two prose blocks sit against the middle of the
            history card rather than hanging off its top edge — the columns are
            different heights by nature and top-aligning them leaves the left
            one floating in the band. */}
        <div className="mt-12 grid gap-10 sm:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-center lg:gap-14">
          <div className="flex flex-col">
            {points.map((p, i) => (
              <Reveal
                key={p.title}
                delay={i * 60}
                className="border-b border-line py-5 first:pt-0 last:border-b-0 last:pb-0"
              >
                <h3 className="text-[1.0125rem] font-semibold tracking-[-0.012em] text-ink">
                  {p.title}
                </h3>
                <p className="mt-2 max-w-[46ch] text-pretty text-[0.94rem] leading-[1.6] text-muted">
                  {p.body}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="overflow-hidden rounded-[1.1rem] border border-line bg-paper shadow-lift">
              <div className="flex items-center gap-2.5 border-b border-line px-5 py-4">
                <span className="text-[var(--accent)]">
                  <IconHistory size={17} />
                </span>
                <div>
                  <h3 className="text-[0.9375rem] font-semibold tracking-[-0.012em] text-ink">
                    History
                  </h3>
                  <p className="text-[0.75rem] text-faint">Chapter One</p>
                </div>
              </div>

              <div className="p-2">
                {revisions.map((r) => (
                  <div
                    key={r.when}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 ${
                      r.now ? "bg-[var(--accent-soft)]" : ""
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                        r.now ? "bg-[var(--accent)]" : "bg-line-2"
                      }`}
                    />
                    <span className="min-w-0 flex-1">
                      <span
                        className={`block truncate text-[0.8125rem] ${
                          r.now ? "font-medium text-[var(--accent)]" : "text-strong"
                        }`}
                      >
                        {r.when}
                      </span>
                      <span className="block text-[0.6875rem] text-faint">
                        {r.words}
                      </span>
                    </span>
                    <span className="shrink-0 text-[0.6875rem] tabular-nums text-faint">
                      {r.delta}
                    </span>
                  </div>
                ))}
              </div>

              {/* The dialog is per page on purpose — a writer hunting a cut
                  paragraph already knows which chapter it came from, and a
                  library-wide timeline would bury it. */}
              <p className="border-t border-line px-5 py-3.5 text-[0.6875rem] text-faint">
                Kept: everything from the last day, hourly for a week, daily
                after that.
              </p>
            </div>
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}
