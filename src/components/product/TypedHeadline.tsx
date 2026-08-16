"use client";

import { useEffect, useRef, useState } from "react";
import type { Headline } from "@/lib/content";

/**
 * A headline that types itself in, with a caret that travels with it.
 *
 * Ported from PalmaNote's own landing page, including the details that make it
 * read as writing rather than as a loading bar:
 *
 * - **The caret is its own element**, positioned each keystroke from the delta
 *   between a zero-width mark at the end of the text and the heading box. A
 *   pseudo-element caret can only ever sit at the end of a line box; a real
 *   one *glides* down to the second line, which is the whole effect.
 * - **The rhythm is uneven.** ~34–68ms a character, a 260ms beat at a full
 *   stop, and 420ms at the line break — that last one exists so the caret's
 *   drop to line two is legible rather than incidental.
 *
 * One deliberate change from the original: it renders the **finished** text on
 * the server and only clears it on mount. The original starts from an empty
 * span, which means the `<h1>` isn't in the HTML at all — invisible to
 * crawlers and to anyone whose JS didn't run. Here the animation is an
 * enhancement of real markup, not a replacement for it.
 *
 * Only PalmaNote uses this. Canvas's headline is static, and that asymmetry is
 * the point: one app is for writing and the other isn't.
 */
export function TypedHeadline({
  headline,
  className = "",
}: {
  headline: Headline;
  className?: string;
}) {
  const segments = headline.typed ?? [];
  const total = segments.reduce((n, s) => n + s.text.length, 0);

  const rootRef = useRef<HTMLHeadingElement>(null);
  const markRef = useRef<HTMLSpanElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);

  // Starts finished, which is exactly what the server renders. The rewind and
  // replay happen inside a scheduled callback rather than in the effect body —
  // a synchronous setState there is a cascading render, and it would also mean
  // the heading flashing empty for one frame before the first character lands.
  const [shown, setShown] = useState(total);
  const [resting, setResting] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let i = 0;
    const flat = segments.flatMap((s) => [...s.text]);

    const step = () => {
      if (i >= flat.length) {
        setResting(true);
        return;
      }
      const ch = flat[i];
      i += 1;
      setShown(i);
      const wait = ch === "\n" ? 420 : ch === "." ? 260 : 34 + Math.random() * 34;
      timer = setTimeout(step, wait);
    };

    // A beat before the first keystroke, so the caret is visibly waiting
    // rather than already mid-sentence when the page settles.
    let timer = setTimeout(() => {
      setShown(0);
      setResting(false);
      step();
    }, 320);

    return () => clearTimeout(timer);
    // `segments` comes from a module constant; re-running would restart the
    // animation mid-sentence.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-place the caret after every committed character, and on resize — the
  // heading re-wraps at every breakpoint and the caret has to follow.
  useEffect(() => {
    const place = () => {
      const root = rootRef.current;
      const mark = markRef.current;
      const caret = caretRef.current;
      if (!root || !mark || !caret) return;
      const a = mark.getBoundingClientRect();
      const b = root.getBoundingClientRect();
      caret.style.translate = `${a.left - b.left}px ${a.top - b.top}px`;
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [shown]);

  // Where each segment begins in the flattened string. Computed rather than
  // accumulated in a mutable during render — the compiler can't reason about a
  // variable that changes while the tree is being built.
  const starts = segments.map((_, i) =>
    segments.slice(0, i).reduce((n, s) => n + s.text.length, 0),
  );

  return (
    <h1 ref={rootRef} className={`relative ${className}`}>
      {segments.map((seg, si) => {
        const visible = seg.text.slice(
          0,
          Math.max(0, Math.min(seg.text.length, shown - starts[si])),
        );
        if (seg.text === "\n") {
          // The break only exists once its "character" has been typed,
          // otherwise line two is reserved before anything is written on it.
          return visible ? <br key={si} /> : null;
        }
        return seg.script ? (
          <span
            key={si}
            className="font-script text-[1.45em] leading-[0.6] tracking-normal"
          >
            {visible}
          </span>
        ) : (
          <span key={si}>{visible}</span>
        );
      })}

      {/* Zero-*width*, so it never affects the line box it is measuring — but
          a full em tall, because an empty inline-block collapses to zero
          height and its rect then reports the baseline. Measuring that puts
          the caret a whole line low, hanging off the bottom of the text. */}
      <span ref={markRef} className="inline-block h-[1em] w-0 align-baseline" aria-hidden />

      <span
        ref={caretRef}
        aria-hidden
        className={`pointer-events-none absolute left-0 top-0 inline-block w-[0.055em] bg-[var(--accent)] ${resting ? "type-caret-resting" : ""}`}
        style={{ height: "1em", translate: "0 0" }}
      />
    </h1>
  );
}
