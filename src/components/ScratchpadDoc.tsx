"use client";

import { useEffect, useState } from "react";

/* The Scratchpad document types itself out (real text, char by char) with a
   hard-blinking caret — rendered as SVG <text> inside the caricature scene. */

const TEXT =
  "For decades, brand design has been defined by flat artifacts: logos, colour palettes, typography, and static layouts. Even as digital products evolved, the foundations of branding stayed two-dimensional. 3D design changes that logic entirely.";

const MAX = 66; // characters per line

function wrap(s: string, max: number) {
  const lines: string[] = [];
  let cur = "";
  for (const word of s.split(" ")) {
    if (cur && (cur + " " + word).length > max) {
      lines.push(cur);
      cur = word;
    } else {
      cur = cur ? cur + " " + word : word;
    }
  }
  lines.push(cur);
  return lines;
}

export function ScratchpadDoc({
  x,
  y,
  lh,
  fontSize,
}: {
  x: number;
  y: number;
  lh: number;
  fontSize: number;
}) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      // show the whole document, no typing (deferred so it's not a sync setState)
      const t = setTimeout(() => setN(TEXT.length), 0);
      return () => clearTimeout(t);
    }
    // type to the end, hold for ~36 ticks, then restart
    const id = setInterval(() => {
      setN((p) => (p >= TEXT.length + 36 ? 0 : p + 1));
    }, 48);
    return () => clearInterval(id);
  }, []);

  const lines = wrap(TEXT.slice(0, Math.min(n, TEXT.length)), MAX);

  return (
    <g fill="#0a0a0a" fillOpacity="0.8">
      {lines.map((ln, i) => (
        <text key={i} x={x} y={y + i * lh} fontSize={fontSize}>
          {ln}
          {i === lines.length - 1 && (
            <tspan className="tc-caret" dx="0.5">
              |
            </tspan>
          )}
        </text>
      ))}
    </g>
  );
}
