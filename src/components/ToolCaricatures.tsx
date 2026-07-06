import type { CSSProperties, SVGProps } from "react";
import type { ToolId } from "@/lib/content";
import { PalmaMarkPaths } from "./PalmaMark";
import { ScratchpadDoc } from "./ScratchpadDoc";
import { VideoShot } from "./VideoShot";

/* High-fidelity, monochrome caricatures of the Palma app performing each tool's
   action — each framed as a miniature of the real window (sidebar, breadcrumb
   bar, tabs, toolbar) at the app's natural 16:9 proportions, so the chrome stays
   small and the canvas fills. Iconography is the real Phosphor set (paths
   inlined). Motion lives in the tc-* classes in globals.css. */

const INK = "#0a0a0a";
const CARD = "#e5e5e5";
const CANVAS = "#f2f2f2";
const SIDEBAR = "#f7f7f7";
const BAR = "#ffffff";

const W = 480;
const H = 270; // 16:9
const SBW = 60; // sidebar width
const CX0 = SBW; // content left edge
const CW = W - SBW; // content width

const SERIF = { fontFamily: "var(--font-serif)" } as CSSProperties;

/* Insert-tool accent colours, matching the app toolbar. */
const TOOL = {
  image: "#f97316",
  video: "#ef4444",
  pencil: "#ec4899",
  comment: "#8b5cf6",
} as const;

/* Phosphor (regular, plus two fill) icon paths, 256×256, inlined. */
const IC = {
  cursor:
    "M168,132.69,214.08,115l.33-.13A16,16,0,0,0,213,85.07L52.92,32.8A15.95,15.95,0,0,0,32.8,52.92L85.07,213a15.82,15.82,0,0,0,14.41,11l.78,0a15.84,15.84,0,0,0,14.61-9.59l.13-.33L132.69,168,184,219.31a16,16,0,0,0,22.63,0l12.68-12.68a16,16,0,0,0,0-22.63ZM195.31,208,144,156.69a16,16,0,0,0-26,4.93c0,.11-.09.22-.13.32l-17.65,46L48,48l159.85,52.2-45.95,17.64-.32.13a16,16,0,0,0-4.93,26h0L208,195.31Z",
  hand:
    "M188,48a27.75,27.75,0,0,0-12,2.71V44a28,28,0,0,0-54.65-8.6A28,28,0,0,0,80,60v64l-3.82-6.13a28,28,0,0,0-48.6,27.82c16,33.77,28.93,57.72,43.72,72.69C86.24,233.54,103.2,240,128,240a88.1,88.1,0,0,0,88-88V76A28,28,0,0,0,188,48Zm12,104a72.08,72.08,0,0,1-72,72c-20.38,0-33.51-4.88-45.33-16.85C69.44,193.74,57.26,171,41.9,138.58a6.36,6.36,0,0,0-.3-.58,12,12,0,0,1,20.79-12,1.76,1.76,0,0,0,.14.23l18.67,30A8,8,0,0,0,96,152V60a12,12,0,0,1,24,0v60a8,8,0,0,0,16,0V44a12,12,0,0,1,24,0v76a8,8,0,0,0,16,0V76a12,12,0,0,1,24,0Z",
  image:
    "M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V158.75l-26.07-26.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L40,149.37V56ZM40,172l52-52,80,80H40Zm176,28H194.63l-36-36,20-20L216,181.38V200ZM144,100a12,12,0,1,1,12,12A12,12,0,0,1,144,100Z",
  video:
    "M251.77,73a8,8,0,0,0-8.21.39L208,97.05V72a16,16,0,0,0-16-16H32A16,16,0,0,0,16,72V184a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V159l35.56,23.71A8,8,0,0,0,248,184a8,8,0,0,0,8-8V80A8,8,0,0,0,251.77,73ZM192,184H32V72H192V184Zm48-22.95-32-21.33V116.28L240,95Z",
  pencil:
    "M229.66,58.34l-32-32a8,8,0,0,0-11.32,0l-96,96A8,8,0,0,0,88,128v32a8,8,0,0,0,8,8h32a8,8,0,0,0,5.66-2.34l96-96A8,8,0,0,0,229.66,58.34ZM124.69,152H104V131.31l64-64L188.69,88ZM200,76.69,179.31,56,192,43.31,212.69,64ZM224,128v80a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h80a8,8,0,0,1,0,16H48V208H208V128a8,8,0,0,1,16,0Z",
  chat:
    "M128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z",
  chatFill:
    "M232,128A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Z",
  playFill:
    "M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z",
  code:
    "M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29l-48-40a8,8,0,0,1,0-12.29l48-40a8,8,0,0,1,10.24,12.3Zm176,27.7-48-40a8,8,0,1,0-10.24,12.3L227.5,128l-40.62,33.85a8,8,0,1,0,10.24,12.29l48-40a8,8,0,0,0,0-12.29ZM162.73,32.48a8,8,0,0,0-10.25,4.79l-64,176a8,8,0,0,0,4.79,10.26A8.14,8.14,0,0,0,96,224a8,8,0,0,0,7.52-5.27l64-176A8,8,0,0,0,162.73,32.48Z",
  quotes:
    "M100,56H40A16,16,0,0,0,24,72v64a16,16,0,0,0,16,16h60v8a32,32,0,0,1-32,32,8,8,0,0,0,0,16,48.05,48.05,0,0,0,48-48V72A16,16,0,0,0,100,56Zm0,80H40V72h60ZM216,56H156a16,16,0,0,0-16,16v64a16,16,0,0,0,16,16h60v8a32,32,0,0,1-32,32,8,8,0,0,0,0,16,48.05,48.05,0,0,0,48-48V72A16,16,0,0,0,216,56Zm0,80H156V72h60Z",
  list:
    "M80,64a8,8,0,0,1,8-8H216a8,8,0,0,1,0,16H88A8,8,0,0,1,80,64Zm136,56H88a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Zm0,64H88a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16ZM44,52A12,12,0,1,0,56,64,12,12,0,0,0,44,52Zm0,64a12,12,0,1,0,12,12A12,12,0,0,0,44,116Zm0,64a12,12,0,1,0,12,12A12,12,0,0,0,44,180Z",
  h1:
    "M152,56V176a8,8,0,0,1-16,0V124H48v52a8,8,0,0,1-16,0V56a8,8,0,0,1,16,0v52h88V56a8,8,0,0,1,16,0Zm75.77,49a8,8,0,0,0-8.21.39l-24,16a8,8,0,1,0,8.88,13.32L216,127V208a8,8,0,0,0,16,0V112A8,8,0,0,0,227.77,105Z",
  h2:
    "M152,56V176a8,8,0,0,1-16,0V124H48v52a8,8,0,0,1-16,0V56a8,8,0,0,1,16,0v52h88V56a8,8,0,0,1,16,0Zm88,144H208l33.55-44.74a32,32,0,1,0-55.73-29.93,8,8,0,1,0,15.08,5.34,16.28,16.28,0,0,1,2.32-4.3,16,16,0,1,1,25.54,19.27L185.6,203.2A8,8,0,0,0,192,216h48a8,8,0,0,0,0-16Z",
  bold:
    "M178.48,115.7A44,44,0,0,0,148,40H80a8,8,0,0,0-8,8V200a8,8,0,0,0,8,8h80a48,48,0,0,0,18.48-92.3ZM88,56h60a28,28,0,0,1,0,56H88Zm72,136H88V128h72a32,32,0,0,1,0,64Z",
  italic:
    "M200,56a8,8,0,0,1-8,8H157.77L115.1,192H144a8,8,0,0,1,0,16H64a8,8,0,0,1,0-16H98.23L140.9,64H112a8,8,0,0,1,0-16h80A8,8,0,0,1,200,56Z",
  strike:
    "M224,128a8,8,0,0,1-8,8H175.93c9.19,7.11,16.07,17.2,16.07,32,0,13.34-7,25.7-19.75,34.79C160.33,211.31,144.61,216,128,216s-32.33-4.69-44.25-13.21C71,193.7,64,181.34,64,168a8,8,0,0,1,16,0c0,17.35,22,32,48,32s48-14.65,48-32c0-14.85-10.54-23.58-38.77-32H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM76.33,104a8,8,0,0,0,7.61-10.49A17.3,17.3,0,0,1,83.11,88c0-18.24,19.3-32,44.89-32,18.84,0,34.16,7.42,41,19.85a8,8,0,0,0,14-7.7C173.33,50.52,152.77,40,128,40,93.29,40,67.11,60.63,67.11,88a33.73,33.73,0,0,0,1.62,10.49A8,8,0,0,0,76.33,104Z",
  squares:
    "M104,40H56A16,16,0,0,0,40,56v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,104,40Zm0,64H56V56h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,64H152V56h48v48Zm-96,32H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm0,64H56V152h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,200,136Zm0,64H152V152h48v48Z",
  stack:
    "M230.91,172A8,8,0,0,1,228,182.91l-96,56a8,8,0,0,1-8.06,0l-96-56A8,8,0,0,1,36,169.09l92,53.65,92-53.65A8,8,0,0,1,230.91,172ZM220,121.09l-92,53.65L36,121.09A8,8,0,0,0,28,134.91l96,56a8,8,0,0,0,8.06,0l96-56A8,8,0,1,0,220,121.09ZM24,80a8,8,0,0,1,4-6.91l96-56a8,8,0,0,1,8.06,0l96,56a8,8,0,0,1,0,13.82l-96,56a8,8,0,0,1-8.06,0l-96-56A8,8,0,0,1,24,80Zm23.88,0L128,126.74,208.12,80,128,33.26Z",
} as const;

/** A Phosphor glyph placed with its top-left at (x, y), drawn at `size` px. */
function PIcon({
  d,
  x,
  y,
  size,
  op = 0.6,
  fill = INK,
}: {
  d: string;
  x: number;
  y: number;
  size: number;
  op?: number;
  fill?: string;
}) {
  return <path d={d} transform={`translate(${x} ${y}) scale(${size / 256})`} fill={fill} fillOpacity={op} />;
}

const svgProps = {
  viewBox: `0 0 ${W} ${H}`,
  className: "text-ink",
  role: "img" as const,
} satisfies SVGProps<SVGSVGElement>;

type GProps = SVGProps<SVGGElement> & { style?: CSSProperties };

/* =============================================================== app chrome */

function Sidebar() {
  return (
    <g>
      <rect x="0" y="0" width={SBW} height={H} fill={SIDEBAR} />
      <line x1={SBW} y1="0" x2={SBW} y2={H} stroke={INK} strokeOpacity="0.08" />

      {/* brand */}
      <g transform="translate(7 5) scale(0.0103)" fill={INK} aria-hidden>
        <PalmaMarkPaths />
      </g>
      <text x={21} y={13} fontSize="7.5" fill={INK} style={SERIF}>Palma</text>
      <path d="M55 7 l-2.4 3 l2.4 3" fill="none" stroke={INK} strokeOpacity="0.28" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />

      {/* nav */}
      <PIcon d={IC.squares} x={8} y={28} size={6.4} op={0.5} />
      <text x="18" y="33.2" fontSize="5.2" fill={INK} fillOpacity="0.62">Projects</text>
      <PIcon d={IC.stack} x={8} y={41} size={6.4} op={0.5} />
      <text x="18" y="46.2" fontSize="5.2" fill={INK} fillOpacity="0.62">Library</text>

      <text x="8" y="64" fontSize="4.3" fontWeight="600" letterSpacing="0.6" fill={INK} fillOpacity="0.38">RECENT</text>
      <rect x="4" y="69" width={SBW - 8} height="11" rx="3" fill={INK} fillOpacity="0.06" />
      <rect x="8" y="71.8" width="5" height="5" rx="1.8" fill="#f59e0b" />
      <text x="17" y="76.2" fontSize="5.2" fill={INK} fillOpacity="0.95">On my Way</text>
      <rect x="8" y="85" width="5" height="5" rx="1.8" fill="#dc2626" />
      <text x="17" y="89.4" fontSize="5.2" fill={INK} fillOpacity="0.62">Random 3D…</text>
      <rect x="8" y="98.2" width="5" height="5" rx="1.4" fill="none" stroke={INK} strokeOpacity="0.32" strokeWidth="0.8" />
      <text x="17" y="102.6" fontSize="5.2" fill={INK} fillOpacity="0.62">Inbox</text>

      {/* new project — centred both ways inside its pill (dominant-baseline
          keeps the label optically centred rather than sitting a hair high) */}
      <rect x="6" y="247" width={SBW - 12} height="15" rx="4" fill={INK} />
      <text x={6 + (SBW - 12) / 2} y="254.5" fontSize="5" fontWeight="500" textAnchor="middle" dominantBaseline="central" fill={CANVAS}>+ New project</text>
    </g>
  );
}

function TopBar() {
  return (
    <g>
      <rect x={CX0} y="0" width={CW} height="18" fill={BAR} />
      <line x1={CX0} y1="18" x2={W} y2="18" stroke={INK} strokeOpacity="0.07" />
      <text x={CX0 + 10} y="11.8" fontSize="5.6" fill={INK} fillOpacity="0.4">Projects ›</text>
      <text x={CX0 + 38} y="12.1" fontSize="6.6" fill={INK} style={SERIF}>On my Way</text>
      <text x="440" y="11.8" fontSize="5" textAnchor="end" fill={INK} fillOpacity="0.42">✓ Saved</text>
      <rect x="446" y="4.2" width="28" height="9.6" rx="4.8" fill="none" stroke={INK} strokeOpacity="0.18" strokeWidth="0.8" />
      <text x="460" y="11" fontSize="5" textAnchor="middle" fill={INK} fillOpacity="0.7">Export</text>
    </g>
  );
}

const TAB_DEFS: Record<"dump" | "focus" | "scratchpad", { x: number; label: string; w: number }> = {
  dump: { x: CX0 + 10, label: "Dump Board", w: 36 },
  focus: { x: CX0 + 54, label: "Focus", w: 19 },
  scratchpad: { x: CX0 + 81, label: "Scratchpad", w: 35 },
};

function Tabs({ active }: { active: "dump" | "focus" | "scratchpad" }) {
  return (
    <g>
      <rect x={CX0} y="18" width={CW} height="15" fill={BAR} />
      <line x1={CX0} y1="33" x2={W} y2="33" stroke={INK} strokeOpacity="0.07" />
      {(Object.keys(TAB_DEFS) as Array<keyof typeof TAB_DEFS>).map((k) => {
        const t = TAB_DEFS[k];
        const on = k === active;
        return (
          <g key={k}>
            <text x={t.x} y="28.4" fontSize="5.6" fontWeight={on ? 600 : 400} fill={INK} fillOpacity={on ? 1 : 0.4}>
              {t.label}
            </text>
            {on && <rect x={t.x - 1} y="32" width={t.w} height="1.6" fill={INK} />}
          </g>
        );
      })}
    </g>
  );
}

/** A toolbar tool button — squircle + Phosphor glyph. `active` fills it dark;
    `color` tints the glyph (insert tools), otherwise it's neutral ink. */
function TBtn({ x, d, active = false, color = INK }: { x: number; d: string; active?: boolean; color?: string }) {
  return (
    <g>
      <rect x={x} y="35" width="11" height="11" rx="3.4" fill={INK} fillOpacity={active ? 1 : 0.04} stroke={INK} strokeOpacity={active ? 0 : 0.1} strokeWidth="0.7" />
      <PIcon d={d} x={x + 2.1} y={37.1} size={6.9} op={active ? 1 : color === INK ? 0.6 : 0.95} fill={active ? CANVAS : color} />
    </g>
  );
}

/** The Dump-Board action toolbar — select/hand, then the coloured insert tools. */
function BoardToolbar() {
  return (
    <g>
      <rect x={CX0} y="33" width={CW} height="15" fill={BAR} />
      <line x1={CX0} y1="48" x2={W} y2="48" stroke={INK} strokeOpacity="0.07" />
      <TBtn x={CX0 + 8} d={IC.cursor} active />
      <TBtn x={CX0 + 23} d={IC.hand} />
      <line x1={CX0 + 39} y1="36.5" x2={CX0 + 39} y2="44.5" stroke={INK} strokeOpacity="0.1" />
      <TBtn x={CX0 + 44} d={IC.image} color={TOOL.image} />
      <TBtn x={CX0 + 59} d={IC.video} color={TOOL.video} />
      <TBtn x={CX0 + 74} d={IC.pencil} color={TOOL.pencil} />
      <TBtn x={CX0 + 89} d={IC.chat} color={TOOL.comment} />
    </g>
  );
}

function ContentCanvas({ top }: { top: number }) {
  return (
    <>
      <rect x={CX0} y={top} width={CW} height={H - top} fill={CANVAS} />
      <rect x={CX0} y={top} width={CW} height={H - top} fill="url(#tc-dots)" />
    </>
  );
}

export function CaricatureDefs() {
  return (
    <svg width="0" height="0" aria-hidden style={{ position: "absolute" }}>
      <defs>
        <pattern id="tc-dots" width="15" height="15" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.9" fill={INK} fillOpacity="0.05" />
        </pattern>
      </defs>
    </svg>
  );
}

/* ----------------------------------------------------------------- pieces */

function Thumb({
  x,
  y,
  w,
  h,
  fill = "#d9d9d9",
  src,
  ...g
}: { x: number; y: number; w: number; h: number; fill?: string; src?: string } & GProps) {
  if (src) {
    const pat = `tc-img-${x}-${y}-${w}-${h}`;
    return (
      <g {...g}>
        <pattern id={pat} patternUnits="userSpaceOnUse" x={x} y={y} width={w} height={h}>
          <image href={src} x={0} y={0} width={w} height={h} preserveAspectRatio="xMidYMid slice" />
        </pattern>
        <rect x={x} y={y} width={w} height={h} rx="7" fill={`url(#${pat})`} stroke={INK} strokeOpacity="0.12" />
      </g>
    );
  }
  return (
    <g {...g}>
      <rect x={x} y={y} width={w} height={h} rx="7" fill={fill} stroke={INK} strokeOpacity="0.12" />
      <circle cx={x + w * 0.64} cy={y + h * 0.4} r={Math.min(w, h) * 0.18} fill="#fff" fillOpacity="0.22" />
      <rect x={x + w * 0.14} y={y + h * 0.62} width={w * 0.4} height={Math.max(3, h * 0.1)} rx="2" fill="#000" fillOpacity="0.09" />
    </g>
  );
}

function NoteCard({
  x,
  y,
  w,
  h,
  lines = 4,
  ...g
}: { x: number; y: number; w: number; h: number; lines?: number } & GProps) {
  const fracs = [0.82, 0.64, 0.9, 0.52, 0.7].slice(0, lines);
  return (
    <g {...g}>
      <rect x={x} y={y} width={w} height={h} rx="7" fill={CARD} stroke={INK} strokeOpacity="0.12" />
      {fracs.map((f, i) => (
        <rect key={i} x={x + 10} y={y + 12 + i * 9} width={(w - 20) * f} height="3.6" rx="1.8" fill={INK} fillOpacity={0.5 - i * 0.07} />
      ))}
    </g>
  );
}

/* Board connectors are drawn tip-less — just soft hairlines linking the cards.
   The arrowhead marker is intentionally dropped across every scene. */
function Arrow({ d }: { d: string }) {
  return <path d={d} fill="none" stroke={INK} strokeOpacity="0.24" strokeWidth="1.2" strokeLinecap="round" />;
}

/** A Focus zone — a labelled container with a coloured outline. */
function ZoneFrame({
  x,
  y,
  w,
  h,
  label,
  accent,
  children,
}: { x: number; y: number; w: number; h: number; label: string; accent: string } & GProps) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="9" fill={accent} fillOpacity="0.04" stroke={accent} strokeOpacity="0.55" strokeWidth="0.6" />
      <circle cx={x + 9} cy={y + 11} r="1.6" fill={accent} fillOpacity="0.9" />
      <text x={x + 14} y={y + 13} fontSize="5" fontWeight="500" letterSpacing="0.4" fill={accent} fillOpacity="0.85">
        {label.toUpperCase()}
      </text>
      {children}
    </g>
  );
}

/* ------------------------------------------------------------------- 1 Dump */
function DumpScene() {
  return (
    <svg {...svgProps} aria-label="Images and notes dropped onto the Palma dump board">
      <Sidebar />
      <ContentCanvas top={48} />
      <TopBar />
      <Tabs active="dump" />
      <BoardToolbar />

      {/* connectors linking the cards, edge to edge */}
      <Arrow d="M172 96 C 192 98, 200 110, 217 112" />
      <Arrow d="M322 100 C 334 98, 340 95, 349 94" />
      <Arrow d="M306 196 C 324 196, 330 182, 343 180" />
      <Thumb x={80} y={66} w={92} h={60} src="/site/1.png" />
      <NoteCard x={84} y={142} w={94} h={62} />
      <Thumb x={218} y={78} w={104} h={74} src="/site/2.png" />
      <Thumb x={350} y={62} w={82} h={58} src="/site/3.png" className="tc-fx tc-drop" />
      <Thumb x={344} y={138} w={104} h={72} src="/site/4.png" />
      <NoteCard x={210} y={172} w={96} h={52} lines={3} className="tc-fx tc-drop" style={{ animationDelay: "2.4s" } as CSSProperties} />
    </svg>
  );
}

/* --------------------------------------------------------------- 2 Comments */
function CommentsScene() {
  return (
    <svg {...svgProps} aria-label="A comment pinned to an item on the board">
      <Sidebar />
      <ContentCanvas top={48} />
      <TopBar />
      <Tabs active="dump" />
      <BoardToolbar />

      <Thumb x={150} y={62} w={186} h={126} src="/site/5.png" />

      {/* composer popover rising in */}
      <g className="tc-fx-b tc-rise">
        <rect x={150} y={200} width={216} height={52} rx="9" fill={BAR} stroke={INK} strokeOpacity="0.14" />
        <circle cx={170} cy={226} r="9" fill="#d1d1d1" stroke={INK} strokeOpacity="0.15" />
        <rect className="tc-fx-l tc-type" x={186} y={218} width={158} height="5.4" rx="2.7" fill={INK} fillOpacity="0.55" />
        <rect className="tc-fx-l tc-type" style={{ animationDelay: "0.18s" } as CSSProperties} x={186} y={231} width={104} height="5.4" rx="2.7" fill={INK} fillOpacity="0.3" />
      </g>

      {/* comment pin — coloured disc, solid black chat glyph */}
      <g className="tc-fx tc-pop">
        <circle cx={328} cy={70} r="10" fill={TOOL.comment} />
        <PIcon d={IC.chatFill} x={321.5} y={63.5} size={13} op={1} fill={INK} />
      </g>
    </svg>
  );
}

/* --------------------------------------------------------- 3 Video → Shot */
function VideoShotScene() {
  return (
    <svg {...svgProps} aria-label="A still captured from a video reference in one click">
      <Sidebar />
      <ContentCanvas top={48} />
      <TopBar />
      <Tabs active="dump" />
      <BoardToolbar />

      <Arrow d="M276 126 C 296 126, 308 124, 329 124" />
      <VideoShot />
    </svg>
  );
}

/* ------------------------------------------------------------------ 4 Focus */
function FocusScene() {
  const zoneThumbs = (zx: number, srcs: string[]) =>
    srcs.map((src, i) => <Thumb key={i} x={zx + 8} y={62 + i * 63} w={92} h={56} src={src} />);
  return (
    <svg {...svgProps} aria-label="References sorted into colour, texture and motion zones on the Focus board">
      <Sidebar />
      <ContentCanvas top={33} />
      <TopBar />
      <Tabs active="focus" />

      <ZoneFrame x={72} y={44} w={108} h={212} label="Colour" accent="#f97316">
        {zoneThumbs(72, ["/site/1.png", "/site/2.png", "/site/3.png"])}
      </ZoneFrame>

      <ZoneFrame x={188} y={44} w={108} h={212} label="Texture" accent="#14b8a6">
        {zoneThumbs(188, ["/site/4.png", "/site/5.png", "/site/6.png"])}
      </ZoneFrame>

      <ZoneFrame x={304} y={44} w={108} h={212} label="Motion" accent="#8b5cf6">
        <Thumb x={312} y={62} w={92} h={56} src="/site/7.png" />
        <Thumb x={312} y={125} w={92} h={56} src="/site/8.png" />
        <Thumb x={312} y={188} w={92} h={56} fill="#dedede" />
        {/* the third queue item slides out of the Queue into the empty slot */}
        <Thumb
          className="tc-fx tc-gather"
          style={{ "--fx": "76px", "--fy": "-52px", "--fr": "4deg" } as CSSProperties}
          x={312}
          y={188}
          w={92}
          h={56}
          src="/site/untitled.png"
        />
      </ZoneFrame>

      {/* Queue rail */}
      <g>
        <rect x={416} y={33} width={64} height={H - 33} fill="#ececec" />
        <line x1={416} y1={33} x2={416} y2={H} stroke={INK} strokeOpacity="0.08" />
        <text x={424} y={48} fontSize="4.6" fontWeight="600" letterSpacing="0.7" fill={INK} fillOpacity="0.42">QUEUE</text>
        <Thumb x={424} y={54} w={48} h={36} src="/site/Tenebris.png" opacity={0.5} />
        <Thumb x={424} y={96} w={48} h={36} src="/site/Eve.jpg" opacity={0.5} />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------- 5 Scratchpad */
function ScratchpadScene() {
  const tools: Array<[keyof typeof IC, number] | "div"> = [
    ["h1", CX0 + 10],
    ["h2", CX0 + 24],
    "div",
    ["bold", CX0 + 44],
    ["italic", CX0 + 58],
    ["strike", CX0 + 72],
    "div",
    ["code", CX0 + 92],
    ["quotes", CX0 + 106],
    ["list", CX0 + 120],
  ];
  return (
    <svg {...svgProps} aria-label="Writing a brief in the Scratchpad rich-text editor">
      <Sidebar />
      <rect x={CX0} y="33" width={CW} height={H - 33} fill={BAR} />
      <TopBar />
      <Tabs active="scratchpad" />

      {/* formatting toolbar */}
      <rect x={CX0} y="33" width={CW} height="17" fill={BAR} />
      <line x1={CX0} y1="50" x2={W} y2="50" stroke={INK} strokeOpacity="0.07" />
      {tools.map((t, i) =>
        t === "div" ? (
          <line key={i} x1={(tools[i - 1] as [string, number])[1] + 11} y1="37" x2={(tools[i - 1] as [string, number])[1] + 11} y2="46" stroke={INK} strokeOpacity="0.1" />
        ) : (
          <PIcon key={i} d={IC[t[0]]} x={t[1]} y={37.5} size={9} op={0.6} />
        ),
      )}

      {/* document — a title and a body that types itself out */}
      <text x={CX0 + 18} y="66" fontSize="8" fontWeight="600" fill={INK}>On 3D and brand design</text>
      <ScratchpadDoc x={CX0 + 18} y={82} lh={9.5} fontSize={5.6} />

      {/* word count footer */}
      <line x1={CX0} y1="255" x2={W} y2="255" stroke={INK} strokeOpacity="0.06" />
      <text x={CX0 + 12} y="264" fontSize="5" fill={INK} fillOpacity="0.4">38 words · 240 chars</text>
    </svg>
  );
}

const scenes: Record<ToolId, () => React.ReactElement> = {
  dump: DumpScene,
  comments: CommentsScene,
  "video-to-shot": VideoShotScene,
  focus: FocusScene,
  scratchpad: ScratchpadScene,
};

export function ToolCaricature({ id }: { id: ToolId }) {
  const Scene = scenes[id];
  return (
    <div className="tc absolute inset-0">
      <Scene />
    </div>
  );
}
