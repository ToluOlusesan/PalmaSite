import type { CSSProperties } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead, Shell } from "@/components/ui/SectionHead";
import {
  IconBullets,
  IconChevronDown,
  IconHighlighter,
  IconImage,
  IconOrdered,
  IconTasks,
} from "./NoteIcons";

/**
 * The two things a writer actually touches all day: the insert menu that `/`
 * opens, and the bar that comes to a selection.
 *
 * Both arrive exactly the way they do in the app — four pixels of rise while
 * they fade, ease-out, no spring — fired once when the section scrolls into
 * view rather than on a loop. The point is to show what using it feels like,
 * and a loop would turn a piece of interface into a screensaver.
 *
 * The selection bar's controls arrive **in sequence**, which is the app's one
 * documented exception to everything-together, and the reason it reads as a
 * bar that came to your words rather than one that was always sitting there.
 */

/** The control's place in the arrival order, read by `.nw-seq` in globals.css. */
const step = (i: number) => ({ "--i": i }) as CSSProperties;

const blocks = [
  { glyph: <span className="text-[0.8125rem]">Aa</span>, label: "Text", hint: "Ctrl+Alt+0", on: true },
  { glyph: <span className="text-[0.8125rem]">H<sub>1</sub></span>, label: "Heading", hint: "Ctrl+Alt+1" },
  { glyph: <IconBullets size={14} />, label: "Bulleted list", hint: "-" },
  { glyph: <IconOrdered size={14} />, label: "Numbered list", hint: "1." },
  { glyph: <IconTasks size={14} />, label: "To-do list", hint: "[]" },
  { glyph: <IconImage size={14} />, label: "Image", hint: "" },
];

export function InsertDemo() {
  return (
    <section className="border-y border-line bg-panel/60 py-16 sm:py-24">
      <Shell>
        <SectionHead title="Everything is one key away.">
          <strong className="font-medium text-ink">/</strong> opens every block.{" "}
          <strong className="font-medium text-ink">@</strong> finds a page — or
          makes one that doesn&rsquo;t exist yet, without moving your caret.
          Hold a selection and the bar comes to the words.
        </SectionHead>

        <div className="mt-12 grid gap-5 sm:mt-14 lg:grid-cols-2">
          <Reveal>
            <h3 className="text-[0.9375rem] font-semibold text-ink">The insert menu</h3>
            <div className="relative mt-3.5 overflow-hidden rounded-[1rem] border border-line bg-paper p-6 pb-0">
              <p className="text-[0.9375rem] leading-[1.6] text-strong">
                It was interesting, how different our lives were.
              </p>
              <p className="mt-1 text-[0.9375rem] leading-[1.6] text-strong">
                /
                <span className="mini-caret ml-px inline-block h-[1.05em] w-[1.5px] translate-y-[0.2em] bg-[var(--accent)] align-baseline" />
              </p>

              <div className="nw-unfold mt-3 rounded-t-xl border border-b-0 border-line bg-paper p-1.5 shadow-lift">
                <div className="px-2.5 py-1.5 text-[0.6875rem] uppercase tracking-[0.09em] text-faint">
                  Blocks
                </div>
                {blocks.map((b) => (
                  <div
                    key={b.label}
                    className={`flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[0.8125rem] ${
                      b.on ? "bg-[var(--accent-soft)] text-[var(--accent)]" : "text-strong"
                    }`}
                  >
                    <span className="grid h-5 w-5 place-items-center">{b.glyph}</span>
                    {b.label}
                    {b.hint ? (
                      <span className="ml-auto font-mono text-[0.6875rem] text-faint">
                        {b.hint}
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>
              {/* The menu runs off the bottom edge because it is longer than
                  the frame — a fade says "there is more" without faking a
                  scrollbar that cannot scroll. */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-paper to-transparent"
              />
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h3 className="text-[0.9375rem] font-semibold text-ink">The selection bar</h3>
            <div className="mt-3.5 rounded-[1rem] border border-line bg-paper p-6">
              {/* `--i` on each control drives its own delay from CSS, so the
                  sequence is one transition rule rather than ten keyframes —
                  and the controls stay direct flex children, which the rules
                  and toggles depend on for their alignment. */}
              <div className="nw-unfold nw-seq mb-5 inline-flex items-center gap-0.5 rounded-xl border border-line bg-paper p-1 shadow-lift">
                <span className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[0.8125rem] text-strong" style={step(0)}>
                  Text
                  <IconChevronDown size={11} />
                </span>
                <span className="nw-rule" style={step(1)} />
                <span className="nw-tool font-semibold" style={step(2)}>B</span>
                <span className="nw-tool italic" style={step(3)}>I</span>
                <span className="nw-tool line-through" style={step(4)}>S</span>
                <span className="nw-rule" style={step(5)} />
                <span className="nw-tool" style={step(6)}>
                  <IconBullets size={14} />
                </span>
                <span className="nw-tool" style={step(7)}>
                  <IconTasks size={14} />
                </span>
                <span className="nw-rule" style={step(8)} />
                <span className="nw-tool" data-on="" style={step(9)}>
                  <IconHighlighter size={14} />
                </span>
              </div>

              <p className="text-[0.9375rem] leading-[1.65] text-strong">
                It had been seven years since I saw my eldest brother last.{" "}
                <span className="rounded-[0.2rem] bg-[var(--accent)]/20 box-decoration-clone px-0.5">
                  So when we finally got to see each other again, it was prime
                  time to do some long overdue bonding
                </span>
                , as now I too was an adult. A big boy.
              </p>
              <p className="mt-3 text-[0.9375rem] leading-[1.65] text-strong">
                He looked at me bewildered and was like &ldquo;What am I looking
                for outside.&rdquo; And immediately memories of me shouting at
                raves by 2am flashed behind my eyes.
              </p>
            </div>
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}
