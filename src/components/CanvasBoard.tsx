"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/* The interior of the "One surface for everything" window: real reference
   images scattered on the dump board, one card being dragged by the cursor,
   and a notes card that types itself out. */

type Card = {
  src: string;
  alt: string;
  /** position + size as % of the board */
  left: number;
  top: number;
  width: number;
  height: number;
  /** the one the cursor drags around */
  dragged?: boolean;
};

// Straight, evenly-scaled cards: notes + dragged card stacked on the left,
// a tidy 2×2 of reference images on the right.
const cards: Card[] = [
  { src: "/site/Spline2.png", alt: "3D gradient render", left: 35, top: 11, width: 29, height: 39 },
  { src: "/site/Shot3.png", alt: "Design shot", left: 67, top: 11, width: 29, height: 39 },
  { src: "/site/1_175.png", alt: "Reference still", left: 35, top: 54, width: 29, height: 39 },
  { src: "/site/AnimLoader.png", alt: "Animation frame", left: 67, top: 54, width: 29, height: 39 },
  { src: "/site/1.png", alt: "Hero render", left: 5, top: 52, width: 25, height: 38, dragged: true },
];

const NOTES = [
  "Direction: editorial, generous negative space, warm grain over flat black. Serif display against mono captions.",
  "Refs leaning kinetic — slow parallax, type that settles into place, one accent colour at most.",
  "Mood: nocturnal, premium, unhurried. Less interface, more surface.",
];

function useTypewriter(items: string[]) {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced.current) setText(items[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (reduced.current) return;
    const full = items[idx];
    if (text.length < full.length) {
      const t = setTimeout(() => setText(full.slice(0, text.length + 1)), 34);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setText("");
      setIdx((i) => (i + 1) % items.length);
    }, 2600);
    return () => clearTimeout(t);
  }, [text, idx, items]);

  return text;
}

export function CanvasBoard() {
  const typed = useTypewriter(NOTES);

  return (
    <div className="dotgrid @container relative h-full w-full overflow-hidden bg-paper">
      {/* notes card — types itself out. Typography is sized in container-query
          units (cqw) so the card stays a faithful miniature at every width and
          the copy never overflows on small screens. */}
      <div
        className="absolute flex flex-col overflow-hidden rounded-lg border border-line-2 bg-panel p-[1.6cqw] shadow-soft"
        style={{ left: "5%", top: "9%", width: "25%", height: "36%" }}
      >
        <p className="text-[1.05cqw] font-semibold uppercase tracking-[0.16cqw] text-faint">
          Notes
        </p>
        <p className="mt-[0.85cqw] text-[1.25cqw] leading-[1.55] text-ink/85">
          {typed}
          <span className="spot-caret" />
        </p>
      </div>

      {/* reference image cards (straight — Palma aligns everything) */}
      {cards.map((c) => (
        <div
          key={c.src}
          className={`absolute overflow-hidden rounded-lg border border-line-2 bg-panel shadow-soft ${c.dragged ? "spot-card z-20" : ""}`}
          style={{
            left: `${c.left}%`,
            top: `${c.top}%`,
            width: `${c.width}%`,
            height: `${c.height}%`,
          }}
        >
          <Image
            src={c.src}
            alt={c.alt}
            fill
            sizes="(max-width: 1024px) 45vw, 30vw"
            className="object-cover"
          />
        </div>
      ))}

      {/* cursor that drags the bottom-left card */}
      <svg
        className="spot-cursor absolute z-30 h-7 w-7"
        style={{ left: "16%", top: "70%" }}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
      >
        <path
          d="M5 3 L5 19 L9 15 L12 21 L14.5 20 L11.5 14 L17 14 Z"
          fill="#ffffff"
          stroke="#0a0a0a"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
