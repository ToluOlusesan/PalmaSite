import { Reveal } from "./Reveal";
import { PalmaMark } from "./PalmaMark";
import { CanvasBoard } from "./CanvasBoard";

/** Windows-style window controls — minimize, maximize, close — on the right. */
function WindowControls() {
  const stroke = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.2,
    strokeLinecap: "round" as const,
  };
  return (
    <div className="flex items-center text-muted" aria-hidden>
      <span className="grid h-7 w-10 place-items-center transition-colors hover:bg-line">
        <svg viewBox="0 0 12 12" className="h-3 w-3">
          <path d="M2.5 6 H9.5" {...stroke} />
        </svg>
      </span>
      <span className="grid h-7 w-10 place-items-center transition-colors hover:bg-line">
        <svg viewBox="0 0 12 12" className="h-3 w-3">
          <rect x="2.2" y="2.2" width="7.6" height="7.6" rx="1" {...stroke} />
        </svg>
      </span>
      <span className="grid h-7 w-10 place-items-center transition-colors hover:bg-red-500/80 hover:text-white">
        <svg viewBox="0 0 12 12" className="h-3 w-3">
          <path d="M3 3 L9 9 M9 3 L3 9" {...stroke} />
        </svg>
      </span>
    </div>
  );
}

export function Spotlight() {
  return (
    <section id="canvas" className="relative bg-panel py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
        <Reveal className="mx-auto max-w-[620px] text-center">
          <h2 className="font-serif text-[clamp(2.2rem,5.5vw,3.6rem)] leading-[1.02] tracking-[-0.5px] text-ink">
            One surface for everything.
          </h2>
          <p className="mx-auto mt-5 max-w-[460px] text-pretty text-[1.02rem] leading-[1.65] text-muted">
            Every reference stays sharp, movable and exactly where you left it —
            an infinite board that holds the whole idea at once.
          </p>
        </Reveal>

        {/* app window */}
        <Reveal delay={120} className="mt-14">
          <div className="mx-auto max-w-[960px] overflow-hidden rounded-xl border border-line-2 bg-paper shadow-lift">
            {/* title bar — Windows: controls on the right */}
            <div className="flex items-stretch justify-between border-b border-line bg-panel">
              <div className="flex items-center gap-2 pl-4 text-muted">
                <PalmaMark className="h-3.5 w-[18px] text-ink" />
                <span className="text-[12.5px]">Palma</span>
              </div>
              <WindowControls />
            </div>

            {/* toolbar */}
            <div className="flex items-center gap-4 border-b border-line bg-paper px-4 py-2.5 text-[12px]">
              <div className="flex items-center gap-1.5">
                <span className="text-faint">Projects</span>
                <span className="text-faint">›</span>
                <span className="font-medium text-ink">Project Oasis</span>
              </div>
              <div className="ml-2 hidden items-center gap-3 sm:flex">
                <span className="font-medium text-ink">Dump Board</span>
                <span className="text-faint">Focus</span>
                <span className="text-faint">Scratchpad</span>
              </div>
              <span className="ml-auto text-[11.5px] text-faint">16 items</span>
              <span className="text-[11.5px] text-faint">✓ Saved</span>
            </div>

            {/* board */}
            <div className="relative aspect-[16/10]">
              <CanvasBoard />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
