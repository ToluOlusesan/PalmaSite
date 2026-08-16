/**
 * PalmaNote, in miniature: a page mid-sentence, with a highlight the writer
 * left themselves, tasks half-ticked, and stickies parked in the rail beside
 * the writing rather than inside it.
 *
 * Built from type rather than grey placeholder bars, because the whole claim
 * of the app is that it is a nice place to put words — a mock made of skeleton
 * lines would be arguing the opposite.
 *
 * It has to hold its own next to the Canvas tile, which is full of other
 * people's photographs. That means filling the frame: a short paragraph
 * floating in white space reads as an empty app, however accurate it is.
 */

const pages = ["Chapter One", "The harbour", "Reading list", "Allotment", "Groceries"];

const tasks: [string, boolean][] = [
  ["Name the second boat", true],
  ["Is the father alive in chapter four?", false],
  ["Cut the second tide paragraph", false],
];

export function NoteMini() {
  return (
    <div className="absolute inset-0 flex bg-paper text-[8.5px] leading-[1.55]">
      {/* the page tree */}
      <div className="hidden w-[23%] shrink-0 flex-col gap-[2px] border-r border-line bg-panel/70 p-2.5 sm:flex">
        <span className="px-1 pb-1 text-[7px] uppercase tracking-[0.1em] text-faint">
          Pages
        </span>
        {pages.map((p, i) => (
          <span
            key={p}
            className={`truncate rounded-[4px] px-1.5 py-[3px] ${
              i === 0
                ? "bg-[var(--accent-soft)] font-medium text-[var(--accent)]"
                : "text-muted"
            }`}
          >
            {p}
          </span>
        ))}
        <span className="mt-auto flex justify-between px-1 pt-2 text-[7px] text-faint">
          <span>Archive</span>
          <span>1,284</span>
        </span>
      </div>

      {/* the page */}
      <div className="relative flex min-w-0 flex-1 flex-col px-3.5 py-3">
        <div className="text-[13px] font-semibold leading-tight tracking-[-0.02em] text-ink">
          Chapter One
        </div>

        <p className="mt-2 text-strong">
          The tide went out further than anyone could remember, and the boats
          leaned over in the mud like animals asleep.{" "}
          <span className="nw-mark">Check the tide tables for October</span> — it
          matters more than it sounds, because everything after this depends on
          how long the flats stayed dry.
        </p>
        <p className="mt-1.5 text-strong">
          Ada had walked out there twice before, once as a child with her father
          and once alone. Both are written down in{" "}
          <span className="text-[var(--accent)] underline decoration-[var(--accent-line)] underline-offset-2">
            The harbour
          </span>
          , which is where the names of the boats are kept.
          <span className="mini-caret ml-px inline-block h-[1em] w-[1.5px] translate-y-[0.15em] bg-[var(--accent)] align-baseline" />
        </p>

        <div className="mt-2.5 space-y-[5px]">
          {tasks.map(([t, done]) => (
            <div key={t} className="flex items-center gap-1.5">
              <span
                aria-hidden
                className={`grid h-[9px] w-[9px] shrink-0 place-items-center rounded-[2px] border ${
                  done
                    ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                    : "border-line-2"
                }`}
              >
                {done ? (
                  <svg viewBox="0 0 10 10" className="h-[7px] w-[7px]" fill="none">
                    <path
                      d="M2 5.2 4 7.2 8 2.8"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : null}
              </span>
              <span className={`truncate ${done ? "text-faint line-through" : "text-strong"}`}>
                {t}
              </span>
            </div>
          ))}
        </div>

        <span className="mt-auto pt-2 text-[7px] text-faint">
          1,284 words · +312 this session
        </span>
      </div>

      {/* the rail — outside the page, which is the point */}
      <div className="hidden w-[22%] shrink-0 flex-col gap-1.5 border-l border-line bg-panel/70 p-2 sm:flex">
        <div
          className="rounded-[3px] bg-[#d8f533] p-1.5 text-[7px] leading-[1.4] text-[#1a1a14] shadow-sm transition-transform duration-500 ease-[var(--ease-out)] group-hover:-rotate-2 motion-reduce:transition-none motion-reduce:group-hover:rotate-0"
          style={{ rotate: "1.5deg" }}
        >
          Is &ldquo;flats&rdquo; the right word, or is that only an estuary
          thing?
        </div>
        <div
          className="rounded-[3px] bg-[#ffa32e] p-1.5 text-[7px] leading-[1.4] text-[#1a1a14] shadow-sm transition-transform duration-500 ease-[var(--ease-out)] group-hover:rotate-1 motion-reduce:transition-none motion-reduce:group-hover:rotate-0"
          style={{ rotate: "-1deg" }}
        >
          Ada&rsquo;s mother hasn&rsquo;t been mentioned once. Deliberate?
        </div>
      </div>
    </div>
  );
}
