import type { CSSProperties, SVGProps } from "react";
import type { ToolId } from "@/lib/content";

/* High-fidelity, monochrome caricatures of the Palma Dump Board performing each
   tool's action. Rendered as SVG so they scale crisply and respect
   prefers-reduced-motion (motion lives in the tc-* classes in globals.css).
   Flat neutral greys only — no gradients, no warm tint, no blur filters (those
   rasterised and softened the icons). Each scene is authored in its REST state. */

const INK = "#f5f5f5";
const CARD = "#1a1a1a";
const CANVAS = "#0d0d0d";

export function CaricatureDefs() {
  return (
    <svg width="0" height="0" aria-hidden style={{ position: "absolute" }}>
      <defs>
        <pattern id="tc-dots" width="17" height="17" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill={INK} fillOpacity="0.05" />
        </pattern>
        <marker id="tc-arrow" markerWidth="7" markerHeight="7" refX="5.4" refY="3" orient="auto-start-reverse">
          <path d="M0 0 L6 3 L0 6 z" fill={INK} fillOpacity="0.4" />
        </marker>
      </defs>
    </svg>
  );
}

const svgProps = {
  viewBox: "0 0 480 300",
  className: "text-ink",
  role: "img" as const,
} satisfies SVGProps<SVGSVGElement>;

/* ----------------------------------------------------------------- building blocks */
function Canvas() {
  return (
    <>
      <rect x="0" y="0" width="480" height="300" fill={CANVAS} />
      <rect x="0" y="24" width="480" height="276" fill="url(#tc-dots)" />
    </>
  );
}

type GProps = SVGProps<SVGGElement> & { style?: CSSProperties };

/** A flat image tile — solid neutral grey with a little inner content. */
function Thumb({
  x,
  y,
  w,
  h,
  fill = "#262626",
  ...g
}: { x: number; y: number; w: number; h: number; fill?: string } & GProps) {
  return (
    <g {...g}>
      <rect x={x} y={y} width={w} height={h} rx="9" fill={fill} stroke={INK} strokeOpacity="0.12" />
      <circle cx={x + w * 0.64} cy={y + h * 0.4} r={Math.min(w, h) * 0.19} fill="#000" fillOpacity="0.22" />
      <rect x={x + w * 0.14} y={y + h * 0.62} width={w * 0.4} height={Math.max(4, h * 0.11)} rx="3" fill="#fff" fillOpacity="0.09" />
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
      <rect x={x} y={y} width={w} height={h} rx="9" fill={CARD} stroke={INK} strokeOpacity="0.12" />
      {fracs.map((f, i) => (
        <rect
          key={i}
          x={x + 14}
          y={y + 16 + i * 12}
          width={(w - 28) * f}
          height="5"
          rx="2.5"
          fill={INK}
          fillOpacity={0.5 - i * 0.07}
        />
      ))}
    </g>
  );
}

function Arrow({ d }: { d: string }) {
  return <path d={d} fill="none" stroke={INK} strokeOpacity="0.26" strokeWidth="1.4" markerEnd="url(#tc-arrow)" />;
}

function Check({ cx, cy, ...g }: { cx: number; cy: number } & GProps) {
  return (
    <g {...g}>
      <circle cx={cx} cy={cy} r="9" fill={INK} />
      <path d={`M${cx - 4} ${cy} l3 3 l5.5 -6`} fill="none" stroke={CANVAS} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

/** Toolbar — tiny labels; the tool buttons are empty squircles (no glyphs). */
function Toolbar({ tidy = false }: { tidy?: boolean }) {
  return (
    <g>
      <rect x="0" y="0" width="480" height="24" fill="#131313" />
      <line x1="0" y1="24" x2="480" y2="24" stroke={INK} strokeOpacity="0.08" />
      <text x="14" y="14.5" fontSize="7" fontWeight="600" fill={INK}>Dump Board</text>
      <text x="64" y="14.5" fontSize="7" fill={INK} fillOpacity="0.4">Focus</text>
      <text x="89" y="14.5" fontSize="7" fill={INK} fillOpacity="0.4">Scratchpad</text>

      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={150 + i * 18}
          y="6"
          width="13"
          height="13"
          rx="4"
          fill={INK}
          fillOpacity="0.05"
          stroke={INK}
          strokeOpacity="0.1"
          strokeWidth="0.8"
        />
      ))}

      <g className={tidy ? "tc-pulse" : undefined}>
        <rect x="398" y="6.5" width="32" height="12" rx="6" fill={INK} fillOpacity="0.1" stroke={INK} strokeOpacity="0.14" strokeWidth="0.8" />
        <text x="414" y="14.5" fontSize="6.5" fontWeight="500" textAnchor="middle" fill={INK}>Tidy</text>
      </g>
      <text x="466" y="14.5" fontSize="6.5" textAnchor="end" fill={INK} fillOpacity="0.4">16 items</text>
    </g>
  );
}

function ZoomPill() {
  return (
    <g>
      <rect x="206" y="278" width="68" height="16" rx="8" fill={CARD} stroke={INK} strokeOpacity="0.12" />
      <text x="218" y="289.5" fontSize="8.5" textAnchor="middle" fill={INK} fillOpacity="0.5">−</text>
      <text x="240" y="289" fontSize="7.5" textAnchor="middle" fill={INK} fillOpacity="0.75">61%</text>
      <text x="262" y="289" fontSize="8.5" textAnchor="middle" fill={INK} fillOpacity="0.5">+</text>
    </g>
  );
}

/* ------------------------------------------------------------------- 1 Dump */
function DumpScene() {
  return (
    <svg {...svgProps} aria-label="Images and notes dropped onto the Palma dump board">
      <Canvas />
      <Toolbar />
      <Arrow d="M150 120 C 180 120, 182 140, 206 142" />
      <Arrow d="M334 150 C 350 150, 352 120, 360 112" />
      <Thumb x={34} y={80} w={116} h={80} fill="#2a2a2a" />
      <NoteCard x={40} y={176} w={120} h={82} />
      <Thumb x={206} y={96} w={128} h={92} fill="#232323" />
      <Thumb x={360} y={78} w={96} h={70} fill="#2e2e2e" className="tc-fx tc-drop" style={{ "--r": "4deg" } as CSSProperties} />
      <NoteCard x={300} y={196} w={120} h={70} lines={3} className="tc-fx tc-drop" style={{ "--r": "-3deg", animationDelay: "2.4s" } as CSSProperties} />
      <ZoomPill />
    </svg>
  );
}

/* --------------------------------------------------------------- 2 Comments */
function CommentsScene() {
  return (
    <svg {...svgProps} aria-label="A comment pinned to an item on the board">
      <Canvas />
      <Toolbar />
      <Thumb x={110} y={56} w={210} h={150} fill="#262626" />

      {/* composer popover rising in */}
      <g className="tc-fx-b tc-rise">
        <rect x={118} y={222} width={244} height={58} rx="12" fill={CARD} stroke={INK} strokeOpacity="0.14" />
        <circle cx={140} cy={251} r="11" fill="#2e2e2e" stroke={INK} strokeOpacity="0.15" />
        <rect className="tc-fx-l tc-type" x={160} y={242} width={172} height={6} rx="3" fill={INK} fillOpacity="0.55" />
        <rect className="tc-fx-l tc-type" style={{ animationDelay: "0.18s" } as CSSProperties} x={160} y={256} width={120} height={6} rx="3" fill={INK} fillOpacity="0.32" />
      </g>

      {/* numbered pin on the item */}
      <g className="tc-fx tc-pop">
        <circle cx={312} cy={64} r="12" fill={INK} />
        <text x={312} y={68} fontSize="11" fontWeight="700" textAnchor="middle" fill={CANVAS}>1</text>
      </g>
    </svg>
  );
}

/* --------------------------------------------------------- 3 Video → Shot */
function VideoShotScene() {
  return (
    <svg {...svgProps} aria-label="A still captured from a video reference in one click">
      <Canvas />
      <Toolbar />
      <Arrow d="M252 132 C 276 134, 282 146, 298 148" />

      {/* video card */}
      <g>
        <rect x={36} y={56} width={216} height={150} rx="9" fill="#2a2a2a" stroke={INK} strokeOpacity="0.12" />
        <circle cx={144} cy={124} r="22" fill={CANVAS} fillOpacity="0.5" stroke={INK} strokeOpacity="0.35" />
        <path d="M138 114 L138 134 L157 124 Z" fill={INK} />
        {/* scrubber */}
        <line x1={52} y1={190} x2={236} y2={190} stroke={INK} strokeOpacity="0.25" strokeWidth="3" strokeLinecap="round" />
        <circle className="tc-fx tc-scrub" cx={52} cy={190} r="5" fill={INK} style={{ "--track": "184px" } as CSSProperties} />
        <text x={236} y={181} fontSize="8" textAnchor="end" fill={INK} fillOpacity="0.5">0:12</text>
        {/* shutter flash */}
        <rect className="tc-flash" x={36} y={56} width={216} height={150} rx="9" fill={INK} opacity="0" />
      </g>

      {/* extracted still pops out */}
      <g className="tc-fx tc-snap">
        <Thumb x={298} y={92} w={148} h={106} fill="#303030" />
        <Check cx={310} cy={104} />
      </g>
    </svg>
  );
}

/* ----------------------------------------------------------------- 4 Curate */
function CurateScene() {
  const keepers = [
    { x: 58, fill: "#2a2a2a", from: { fx: "-34px", fy: "-46px", fr: "-10deg" }, d: "0s" },
    { x: 196, fill: "#2e2e2e", from: { fx: "2px", fy: "52px", fr: "8deg" }, d: "0.12s" },
    { x: 334, fill: "#242424", from: { fx: "40px", fy: "-34px", fr: "12deg" }, d: "0.24s" },
  ];
  const y = 118;
  const w = 112;
  const h = 86;
  return (
    <svg {...svgProps} aria-label="Tidying the board down to the keepers">
      <Canvas />
      <Toolbar tidy />

      {/* culled items fade away */}
      <Thumb className="tc-fx tc-cull" style={{ "--cr": "-12deg" } as CSSProperties} x={42} y={48} w={82} h={58} fill="#232323" />
      <NoteCard className="tc-fx tc-cull" style={{ "--cr": "10deg", animationDelay: "0.2s" } as CSSProperties} x={368} y={214} w={94} h={62} lines={3} />

      {/* keepers gather into a tidy row, each checked */}
      {keepers.map((k, i) => (
        <g
          key={i}
          className="tc-fx tc-gather"
          style={{ "--fx": k.from.fx, "--fy": k.from.fy, "--fr": k.from.fr, animationDelay: k.d } as CSSProperties}
        >
          <Thumb x={k.x} y={y} w={w} h={h} fill={k.fill} />
          <Check className="tc-fx tc-check" style={{ animationDelay: `${0.3 + i * 0.1}s` } as CSSProperties} cx={k.x + w - 6} cy={y - 2} />
        </g>
      ))}
    </svg>
  );
}

const scenes: Record<ToolId, () => React.ReactElement> = {
  dump: DumpScene,
  comments: CommentsScene,
  "video-to-shot": VideoShotScene,
  curate: CurateScene,
};

export function ToolCaricature({ id }: { id: ToolId }) {
  const Scene = scenes[id];
  return (
    <div className="tc absolute inset-0">
      <Scene />
    </div>
  );
}
