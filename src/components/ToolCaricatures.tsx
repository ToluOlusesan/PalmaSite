import type { CSSProperties, ReactNode, SVGProps } from "react";
import type { ToolId } from "@/lib/content";

/* High-fidelity, monochrome caricatures of the Palma app performing each tool's
   action — each one framed as a miniature of the real window (sidebar, breadcrumb
   bar, tabs, toolbar) so it reads as the actual product. Rendered as SVG so it
   scales crisply; motion lives in the tc-* classes in globals.css and pauses
   under prefers-reduced-motion. Each scene is authored in its REST state. */

const INK = "#0a0a0a";
const CARD = "#e5e5e5";
const CANVAS = "#f2f2f2";
const SIDEBAR = "#f7f7f7";
const BAR = "#ffffff";

const SBW = 80; // sidebar width
const CX0 = SBW; // content left edge
const CW = 480 - SBW; // content width
const CCX = CX0 + CW / 2; // content centre x

export function CaricatureDefs() {
  return (
    <svg width="0" height="0" aria-hidden style={{ position: "absolute" }}>
      <defs>
        <pattern id="tc-dots" width="17" height="17" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill={INK} fillOpacity="0.05" />
        </pattern>
        <marker id="tc-arrow" markerWidth="7" markerHeight="7" refX="0.4" refY="3" orient="auto-start-reverse">
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

type GProps = SVGProps<SVGGElement> & { style?: CSSProperties };

/* =============================================================== app chrome */

function Sidebar() {
  const item = (y: number, label: string, opts: { dot?: string; sq?: boolean; active?: boolean } = {}) => (
    <g>
      {opts.active && <rect x="5" y={y - 9} width={SBW - 10} height="14" rx="4" fill={INK} fillOpacity="0.06" />}
      {opts.dot ? (
        <rect x="10" y={y - 4} width="6.5" height="6.5" rx="2" fill={opts.dot} />
      ) : (
        <rect x="10" y={y - 4} width="6.5" height="6.5" rx="1.6" fill="none" stroke={INK} strokeOpacity="0.32" strokeWidth="0.9" />
      )}
      <text x="22" y={y + 1.4} fontSize="6.8" fill={INK} fillOpacity={opts.active ? 0.95 : 0.62}>
        {label}
      </text>
    </g>
  );
  return (
    <g>
      <rect x="0" y="0" width={SBW} height="300" fill={SIDEBAR} />
      <line x1={SBW} y1="0" x2={SBW} y2="300" stroke={INK} strokeOpacity="0.08" />

      {/* brand */}
      <text x="10" y="19" fontSize="9" fontWeight="600" fill={INK} fontStyle="italic">Palma</text>
      <path d="M71 13 l-3 3 l3 3" fill="none" stroke={INK} strokeOpacity="0.3" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />

      {item(42, "Projects")}
      {item(58, "Library")}

      <text x="10" y="82" fontSize="5.4" fontWeight="600" letterSpacing="0.7" fill={INK} fillOpacity="0.38">RECENT</text>
      {item(96, "On my Way", { dot: "#f59e0b", active: true })}
      {item(112, "Random 3D…", { dot: "#dc2626" })}
      {item(128, "Inbox", { sq: true })}

      {/* new project */}
      <rect x="8" y="272" width={SBW - 16} height="18" rx="5" fill={INK} />
      <text x={SBW / 2} y="284" fontSize="6.6" fontWeight="500" textAnchor="middle" fill={CANVAS}>+ New project</text>
    </g>
  );
}

function TopBar() {
  return (
    <g>
      <rect x={CX0} y="0" width={CW} height="22" fill={BAR} />
      <line x1={CX0} y1="22" x2="480" y2="22" stroke={INK} strokeOpacity="0.07" />
      <text x={CX0 + 12} y="14.6" fontSize="7" fill={INK} fillOpacity="0.4">Projects ›</text>
      <text x={CX0 + 46} y="14.6" fontSize="7" fontWeight="600" fill={INK}>On my Way</text>
      <text x="432" y="14.6" fontSize="6.2" textAnchor="end" fill={INK} fillOpacity="0.42">✓ Saved</text>
      <rect x="440" y="5.5" width="34" height="12" rx="6" fill="none" stroke={INK} strokeOpacity="0.18" strokeWidth="0.9" />
      <text x="457" y="13.8" fontSize="6.2" textAnchor="middle" fill={INK} fillOpacity="0.7">Export</text>
    </g>
  );
}

const TAB_DEFS: Record<"dump" | "focus" | "scratchpad", { x: number; label: string; w: number }> = {
  dump: { x: CX0 + 12, label: "Dump Board", w: 46 },
  focus: { x: CX0 + 70, label: "Focus", w: 24 },
  scratchpad: { x: CX0 + 104, label: "Scratchpad", w: 44 },
};

function Tabs({ active }: { active: "dump" | "focus" | "scratchpad" }) {
  return (
    <g>
      <rect x={CX0} y="22" width={CW} height="18" fill={BAR} />
      <line x1={CX0} y1="40" x2="480" y2="40" stroke={INK} strokeOpacity="0.07" />
      {(Object.keys(TAB_DEFS) as Array<keyof typeof TAB_DEFS>).map((k) => {
        const t = TAB_DEFS[k];
        const on = k === active;
        return (
          <g key={k}>
            <text x={t.x} y="34.6" fontSize="7" fontWeight={on ? 600 : 400} fill={INK} fillOpacity={on ? 1 : 0.4}>
              {t.label}
            </text>
            {on && <rect x={t.x - 1} y="39" width={t.w} height="2" fill={INK} />}
          </g>
        );
      })}
    </g>
  );
}

/** A single toolbar button — squircle plus a centred glyph. */
function TBtn({ x, children }: { x: number; children: ReactNode }) {
  return (
    <g>
      <rect x={x} y="43" width="13" height="13" rx="4" fill={INK} fillOpacity="0.04" stroke={INK} strokeOpacity="0.1" strokeWidth="0.8" />
      <g transform={`translate(${x + 6.5} 49.5)`} stroke={INK} strokeOpacity="0.6" strokeWidth="0.9" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </g>
    </g>
  );
}

/** The Dump-Board action toolbar — select/hand, insert tools, Tidy, item count. */
function BoardToolbar({ tidy = false }: { tidy?: boolean }) {
  return (
    <g>
      <rect x={CX0} y="40" width={CW} height="18" fill={BAR} />
      <line x1={CX0} y1="58" x2="480" y2="58" stroke={INK} strokeOpacity="0.07" />

      <TBtn x={CX0 + 12}><path d="M-2 -3 L-2 3 L0 1 L1.6 3.4 L2.4 2.8 L0.9 0.6 L3 0 Z" fill={INK} stroke="none" fillOpacity="0.6" /></TBtn>
      <TBtn x={CX0 + 28}><path d="M-2.4 0 q0 3 2.4 3 q2.4 0 2.4 -3 M-2.4 0 v-2 M0 0 v-3 M2.4 0 v-2" /></TBtn>

      <line x1={CX0 + 47} y1="44" x2={CX0 + 47} y2="55" stroke={INK} strokeOpacity="0.1" />
      <TBtn x={CX0 + 52}><rect x="-3" y="-2.4" width="6" height="5" rx="1" /><circle cx="-1" cy="-0.6" r="0.8" fill={INK} stroke="none" fillOpacity="0.6" /><path d="M-3 1.6 L-0.6 -0.4 L1 1" /></TBtn>
      <TBtn x={CX0 + 68}><rect x="-3" y="-2.2" width="4.4" height="4.4" rx="1" /><path d="M1.8 -1 L3 -1.8 L3 1.8 L1.8 1 Z" fill={INK} stroke="none" fillOpacity="0.55" /></TBtn>
      <TBtn x={CX0 + 84}><path d="M-2.4 2.4 L1.4 -1.4 L2.4 -2.4 L2.4 -1 L-1 2.6 Z" /></TBtn>
      <TBtn x={CX0 + 100}><path d="M-3 -2 h6 v4 h-3.2 l-1.8 1.8 v-1.8 h-1 Z" /></TBtn>

      {tidy && (
        <g className="tc-pulse">
          <rect x="378" y="42.5" width="34" height="13" rx="6.5" fill={INK} fillOpacity="0.08" stroke={INK} strokeOpacity="0.14" strokeWidth="0.8" />
          <path d="M385 49.5 h5 M385 47 h7 M385 52 h4" stroke={INK} strokeOpacity="0.6" strokeWidth="0.9" strokeLinecap="round" />
          <text x="399" y="51.6" fontSize="6.4" fontWeight="500" textAnchor="middle" fill={INK}>Tidy</text>
        </g>
      )}
      <path d="M455 47 v5 M452 49.5 h6 M455 45.5 l0 1.5 M453.5 47 l1.5 -1.5 l1.5 1.5" stroke={INK} strokeOpacity="0.42" strokeWidth="0.9" fill="none" strokeLinecap="round" strokeLinejoin="round" transform="translate(-2 0)" />
      <text x="472" y="51.6" fontSize="6.3" textAnchor="end" fill={INK} fillOpacity="0.42">32 items</text>
    </g>
  );
}

function ContentCanvas({ top }: { top: number }) {
  return (
    <>
      <rect x={CX0} y={top} width={CW} height={300 - top} fill={CANVAS} />
      <rect x={CX0} y={top} width={CW} height={300 - top} fill="url(#tc-dots)" />
    </>
  );
}

function ZoomPill() {
  return (
    <g>
      <rect x={CCX - 34} y="280" width="56" height="15" rx="7.5" fill={CARD} stroke={INK} strokeOpacity="0.12" />
      <text x={CCX - 22} y="290.5" fontSize="8" textAnchor="middle" fill={INK} fillOpacity="0.5">−</text>
      <text x={CCX} y="290" fontSize="7" textAnchor="middle" fill={INK} fillOpacity="0.75">41%</text>
      <text x={CCX + 22} y="290.5" fontSize="8" textAnchor="middle" fill={INK} fillOpacity="0.5">+</text>
    </g>
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
        <rect x={x} y={y} width={w} height={h} rx="8" fill={`url(#${pat})`} stroke={INK} strokeOpacity="0.12" />
      </g>
    );
  }
  return (
    <g {...g}>
      <rect x={x} y={y} width={w} height={h} rx="8" fill={fill} stroke={INK} strokeOpacity="0.12" />
      <circle cx={x + w * 0.64} cy={y + h * 0.4} r={Math.min(w, h) * 0.19} fill="#fff" fillOpacity="0.22" />
      <rect x={x + w * 0.14} y={y + h * 0.62} width={w * 0.4} height={Math.max(4, h * 0.11)} rx="3" fill="#000" fillOpacity="0.09" />
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
      <rect x={x} y={y} width={w} height={h} rx="8" fill={CARD} stroke={INK} strokeOpacity="0.12" />
      {fracs.map((f, i) => (
        <rect key={i} x={x + 12} y={y + 14 + i * 11} width={(w - 24) * f} height="4.5" rx="2.2" fill={INK} fillOpacity={0.5 - i * 0.07} />
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
      <circle cx={cx} cy={cy} r="8" fill={INK} />
      <path d={`M${cx - 3.5} ${cy} l2.6 2.6 l5 -5.4`} fill="none" stroke={CANVAS} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
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
      <rect x={x} y={y} width={w} height={h} rx="11" fill={accent} fillOpacity="0.05" stroke={accent} strokeOpacity="0.85" strokeWidth="1.1" />
      <circle cx={x + 12} cy={y + 13} r="2.6" fill={accent} />
      <text x={x + 19} y={y + 15.5} fontSize="6.3" fontWeight="700" letterSpacing="0.4" fill={accent}>
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
      <ContentCanvas top={58} />
      <TopBar />
      <Tabs active="dump" />
      <BoardToolbar tidy />

      <Arrow d="M196 150 C 222 150, 224 168, 246 170" />
      <Arrow d="M360 168 C 376 168, 378 140, 388 132" />
      <Thumb x={98} y={84} w={96} h={66} src="/site/Spline2.png" />
      <NoteCard x={102} y={166} w={104} h={74} />
      <Thumb x={246} y={96} w={112} h={82} src="/site/Shot3.png" />
      <Thumb x={372} y={80} w={86} h={62} src="/site/1_175.png" className="tc-fx tc-drop" />
      <NoteCard x={306} y={196} w={108} h={62} lines={3} className="tc-fx tc-drop" style={{ animationDelay: "2.4s" } as CSSProperties} />
      <ZoomPill />
    </svg>
  );
}

/* --------------------------------------------------------------- 2 Comments */
function CommentsScene() {
  return (
    <svg {...svgProps} aria-label="A comment pinned to an item on the board">
      <Sidebar />
      <ContentCanvas top={58} />
      <TopBar />
      <Tabs active="dump" />
      <BoardToolbar />

      <Thumb x={150} y={78} w={196} h={132} src="/site/1.png" />

      {/* composer popover rising in */}
      <g className="tc-fx-b tc-rise">
        <rect x={150} y={224} width={232} height={56} rx="11" fill={BAR} stroke={INK} strokeOpacity="0.14" />
        <circle cx={172} cy={252} r="10" fill="#d1d1d1" stroke={INK} strokeOpacity="0.15" />
        <rect className="tc-fx-l tc-type" x={190} y={243} width={166} height="6" rx="3" fill={INK} fillOpacity="0.55" />
        <rect className="tc-fx-l tc-type" style={{ animationDelay: "0.18s" } as CSSProperties} x={190} y={257} width={112} height="6" rx="3" fill={INK} fillOpacity="0.3" />
      </g>

      {/* comment pin on the item */}
      <g className="tc-fx tc-pop">
        <circle cx={338} cy={86} r="11" fill={INK} />
        <g transform="translate(330.5 78.5) scale(0.0586)">
          <path d="M128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Z" fill={CANVAS} />
        </g>
      </g>
    </svg>
  );
}

/* --------------------------------------------------------- 3 Video → Shot */
function VideoShotScene() {
  return (
    <svg {...svgProps} aria-label="A still captured from a video reference in one click">
      <Sidebar />
      <ContentCanvas top={58} />
      <TopBar />
      <Tabs active="dump" />
      <BoardToolbar />

      <Arrow d="M300 150 C 324 152, 330 162, 346 164" />

      {/* video card */}
      <g>
        <rect x={96} y={80} width={200} height={134} rx="8" fill="#d5d5d5" stroke={INK} strokeOpacity="0.12" />
        <circle cx={196} cy={140} r="20" fill={CANVAS} fillOpacity="0.5" stroke={INK} strokeOpacity="0.35" />
        <path d="M191 131 L191 149 L208 140 Z" fill={INK} />
        <line x1={110} y1={198} x2={282} y2={198} stroke={INK} strokeOpacity="0.25" strokeWidth="3" strokeLinecap="round" />
        <circle className="tc-fx tc-scrub" cx={110} cy={198} r="4.5" fill={INK} style={{ "--track": "172px" } as CSSProperties} />
        <text x={282} y={190} fontSize="7.5" textAnchor="end" fill={INK} fillOpacity="0.5">0:12</text>
        <rect className="tc-flash" x={96} y={80} width={200} height={134} rx="8" fill={INK} opacity="0" />
      </g>

      {/* extracted still pops out */}
      <g className="tc-fx tc-snap">
        <Thumb x={346} y={104} w={126} h={92} src="/site/AnimLoader.png" />
        <Check cx={357} cy={115} />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ 4 Focus */
function FocusScene() {
  return (
    <svg {...svgProps} aria-label="References sorted into colour, texture and motion zones on the Focus board">
      <Sidebar />
      <ContentCanvas top={40} />
      <TopBar />
      <Tabs active="focus" />

      <ZoneFrame x={88} y={54} w={100} h={150} label="Colour" accent="#f97316">
        <Thumb x={96} y={74} w={84} h={58} src="/site/Spline2.png" />
        <Thumb x={96} y={138} w={84} h={58} src="/site/Shot3.png" />
      </ZoneFrame>

      <ZoneFrame x={196} y={54} w={100} h={150} label="Texture" accent="#14b8a6">
        <Thumb x={204} y={74} w={84} h={58} src="/site/1.png" />
        <Thumb x={204} y={138} w={84} h={58} src="/site/1_175.png" />
      </ZoneFrame>

      <ZoneFrame x={304} y={54} w={100} h={150} label="Motion" accent="#8b5cf6">
        <Thumb x={312} y={74} w={84} h={58} src="/site/AnimLoader.png" />
        <Thumb x={312} y={138} w={84} h={58} fill="#dedede" />
        {/* a keeper slides in from the Queue into the empty Motion slot */}
        <Thumb
          className="tc-fx tc-gather"
          style={{ "--fx": "96px", "--fy": "-92px", "--fr": "-6deg" } as CSSProperties}
          x={312}
          y={138}
          w={84}
          h={58}
          src="/site/Shot3.png"
        />
      </ZoneFrame>

      {/* Queue rail */}
      <g>
        <rect x={410} y={40} width={70} height={260} fill="#ececec" />
        <line x1={410} y1={40} x2={410} y2={300} stroke={INK} strokeOpacity="0.08" />
        <text x={419} y={56} fontSize="5.6" fontWeight="700" letterSpacing="0.8" fill={INK} fillOpacity="0.45">QUEUE</text>
        <Thumb x={419} y={64} w={52} h={38} src="/site/AnimLoader.png" opacity={0.5} />
        <Thumb x={419} y={110} w={52} h={38} src="/site/Spline2.png" opacity={0.5} />
        <Thumb x={419} y={156} w={52} h={38} src="/site/1.png" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------- 5 Scratchpad */
/** A document line that types itself in (scaleX from the left). */
function TypeLine({ x, y, w, delay, op = 0.62, h = 5.5 }: { x: number; y: number; w: number; delay: number; op?: number; h?: number }) {
  return (
    <rect className="tc-fx-l tc-type" style={{ animationDelay: `${delay}s` } as CSSProperties} x={x} y={y} width={w} height={h} rx={h / 2} fill={INK} fillOpacity={op} />
  );
}

function ScratchpadScene() {
  return (
    <svg {...svgProps} aria-label="Writing a brief in the Scratchpad rich-text editor">
      <Sidebar />
      <rect x={CX0} y="40" width={CW} height="260" fill={BAR} />
      <TopBar />
      <Tabs active="scratchpad" />

      {/* formatting toolbar */}
      <g>
        <rect x={CX0} y="40" width={CW} height="20" fill={BAR} />
        <line x1={CX0} y1="60" x2="480" y2="60" stroke={INK} strokeOpacity="0.07" />
        <g fill={INK} fillOpacity="0.62">
          <text x={CX0 + 12} y="53.5" fontSize="7.5" fontWeight="700">H1</text>
          <text x={CX0 + 26} y="53.5" fontSize="6.5" fontWeight="700">H2</text>
          <text x={CX0 + 44} y="53.5" fontSize="8" fontWeight="700">B</text>
          <text x={CX0 + 54} y="53.5" fontSize="8" fontWeight="600" fontStyle="italic">I</text>
          <text x={CX0 + 62} y="53.5" fontSize="7.5" textDecoration="line-through">S</text>
        </g>
        <line x1={CX0 + 38} y1="44" x2={CX0 + 38} y2="56" stroke={INK} strokeOpacity="0.1" />
        <line x1={CX0 + 73} y1="44" x2={CX0 + 73} y2="56" stroke={INK} strokeOpacity="0.1" />
        <g stroke={INK} strokeOpacity="0.55" strokeWidth="0.9" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d={`M${CX0 + 80} 46 l-3 6 M${CX0 + 86} 46 l3 6 M${CX0 + 78} 52 l3 -2.5 M${CX0 + 86} 49.5 l3 2.5`} />
          <path d={`M${CX0 + 96} 46 q-2 0 -2 3 q0 2 2 2 M${CX0 + 100} 46 q-2 0 -2 3 q0 2 2 2`} />
          <path d={`M${CX0 + 110} 47 h8 M${CX0 + 110} 50 h8 M${CX0 + 110} 53 h5`} />
          <circle cx={CX0 + 107} cy="47" r="0.6" fill={INK} stroke="none" />
          <circle cx={CX0 + 107} cy="50" r="0.6" fill={INK} stroke="none" />
          <circle cx={CX0 + 107} cy="53" r="0.6" fill={INK} stroke="none" />
        </g>
      </g>

      {/* document */}
      <TypeLine x={CX0 + 24} y={86} w={150} delay={0} op={0.85} h={9} />
      <TypeLine x={CX0 + 24} y={112} w={CW - 60} delay={0.5} />
      <TypeLine x={CX0 + 24} y={126} w={CW - 48} delay={0.85} />
      <TypeLine x={CX0 + 24} y={140} w={CW - 96} delay={1.2} />

      {/* bulleted list */}
      <circle cx={CX0 + 28} cy="164" r="1.6" fill={INK} fillOpacity="0.55" />
      <TypeLine x={CX0 + 36} y={161} w={CW - 120} delay={1.7} op={0.5} />
      <circle cx={CX0 + 28} cy="178" r="1.6" fill={INK} fillOpacity="0.55" />
      <TypeLine x={CX0 + 36} y={175} w={CW - 150} delay={2.1} op={0.5} />

      {/* blinking caret at the end */}
      <rect className="tc-pulse" x={CX0 + 36 + (CW - 150) + 3} y="173" width="1.5" height="9" fill={INK} />

      {/* word count footer */}
      <line x1={CX0} y1="284" x2="480" y2="284" stroke={INK} strokeOpacity="0.06" />
      <text x={CX0 + 14} y="294" fontSize="6" fill={INK} fillOpacity="0.4">38 words · 214 chars</text>
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
