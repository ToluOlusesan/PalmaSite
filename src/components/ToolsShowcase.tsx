"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Camera, MessageSquareText, NotebookPen, type LucideIcon } from "lucide-react";
import { tools, type ToolId } from "@/lib/content";
import { Reveal } from "./Reveal";
import { ToolCaricature } from "./ToolCaricatures";
import { useTilt } from "@/lib/motion";

/** One icon per tool, shown as a badge beside the heading. Partial — only the
 *  three tools that appear in this showcase need an entry. */
const toolIcons: Partial<Record<ToolId, LucideIcon>> = {
  comments: MessageSquareText,
  "video-to-shot": Camera,
  scratchpad: NotebookPen,
};

/**
 * The tools, told as one large framed "screen" driven by a vertical tab list —
 * not a stack of repeated feature rows (which read flat next to the rest of the
 * page). Selecting a tool spring-crossfades the screen; it also auto-advances
 * while the section is in view and pauses the instant the pointer enters, with
 * a thin dwell line under the active tab. The screen tilts toward the pointer
 * (see `useTilt`). Stays monochrome: a lit light screen on grain-textured black.
 */
export function ToolsShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const screenRef = useTilt<HTMLDivElement>(3);

  // Only auto-advance while the showcase is actually on screen.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.35 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const advance = () => setActive((a) => (a + 1) % tools.length);
  const showTimer = inView && !reduced;

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      setActive((a) => (a + 1) % tools.length);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      setActive((a) => (a - 1 + tools.length) % tools.length);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(tools.length - 1);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="tools"
      className="section-invert relative overflow-hidden py-16 sm:py-28"
    >
      <div className="grain-invert" aria-hidden />

      <div className="relative z-[1] mx-auto max-w-[1120px] px-6 sm:px-10">
        <Reveal className="mx-auto max-w-[680px] text-center">
          <span className="text-[11.5px] font-medium uppercase tracking-[0.16em] text-faint">
            The tools
          </span>
          <h2 className="mt-4 font-serif text-[clamp(2.1rem,5vw,3.5rem)] leading-[1.04] tracking-[-0.5px] text-ink">
            Curate your references.
          </h2>
          <p className="mx-auto mt-5 max-w-[560px] text-pretty text-[1.02rem] leading-[1.65] text-muted">
            Everything you need to turn a scattered pile of references into a
            clear creative direction. Arrange on an infinite canvas, mark refs
            up where it matters, pull clean stills from video, and draft the
            brief right beside the board.
          </p>
        </Reveal>

        <Reveal className="mt-14 lg:mt-16">
         <div
          className="grid gap-8 lg:grid-cols-[minmax(0,0.68fr)_minmax(0,1.32fr)] lg:items-center lg:gap-16 xl:gap-20"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
         >
          {/* the tab list */}
          <div
            role="tablist"
            aria-label="Palma tools"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="order-2 flex flex-col gap-1.5 lg:order-1"
          >
            {tools.map((tool, i) => {
              const Icon = toolIcons[tool.id];
              const isActive = i === active;
              return (
                <button
                  key={tool.id}
                  role="tab"
                  id={`tool-tab-${tool.id}`}
                  aria-selected={isActive}
                  aria-controls="tool-screen"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActive(i)}
                  className="group relative rounded-2xl px-5 py-5 text-left focus-visible:outline-none sm:px-6"
                >
                  {/* active panel fill — crossfades, no layout shift */}
                  <span
                    aria-hidden
                    className={`absolute inset-0 rounded-2xl border transition-colors duration-300 ease-[var(--ease-out)] ${
                      isActive
                        ? "border-line bg-panel"
                        : "border-transparent bg-transparent group-hover:bg-panel/50"
                    }`}
                  />

                  <span
                    className={`relative flex flex-col gap-2 transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-55 group-hover:opacity-80"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      {Icon && (
                        <span
                          className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border transition-colors duration-300 ${
                            isActive ? "border-ink text-ink" : "border-line-2 text-muted"
                          }`}
                        >
                          <Icon className="h-[19px] w-[19px]" strokeWidth={1.5} aria-hidden />
                        </span>
                      )}
                      <span className="font-serif text-[15px] text-faint tabular-nums">
                        {tool.index}
                      </span>
                      <h3 className="font-serif text-[1.35rem] leading-none tracking-[-0.3px] text-ink">
                        {tool.name}
                      </h3>
                    </span>
                    <p className="max-w-[46ch] text-pretty text-[0.95rem] leading-[1.6] text-muted">
                      {tool.blurb}
                    </p>
                  </span>

                  {/* dwell indicator — only under the active tab, only while the
                      section is on screen and motion is allowed */}
                  {isActive && showTimer && (
                    <span
                      aria-hidden
                      className="absolute inset-x-5 bottom-[7px] block h-px overflow-hidden rounded bg-line sm:inset-x-6"
                    >
                      <span
                        key={active}
                        onAnimationEnd={advance}
                        className={`tools-progress block h-full w-full bg-ink ${
                          paused ? "is-paused" : ""
                        }`}
                      />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* the framed screen — one wide focal window that swaps content. It
              takes the larger share of the row so the app still reads clearly,
              sitting at its true 16:9 (never cropped) and centred against the
              tab stack. */}
          <div className="order-1 [perspective:1600px] lg:order-2">
            <div
              ref={screenRef}
              id="tool-screen"
              role="tabpanel"
              aria-labelledby={`tool-tab-${tools[active].id}`}
              className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-line bg-paper shadow-lift will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              {tools.map((tool, i) => (
                <div
                  key={tool.id}
                  aria-hidden={i !== active}
                  className={`absolute inset-0 transition-[opacity,filter] duration-500 ease-[var(--ease-out)] ${
                    i === active
                      ? "opacity-100 blur-0"
                      : "pointer-events-none opacity-0 blur-[6px]"
                  }`}
                >
                  <ToolCaricature id={tool.id} />
                </div>
              ))}
            </div>
          </div>
         </div>
        </Reveal>
      </div>
    </section>
  );
}
