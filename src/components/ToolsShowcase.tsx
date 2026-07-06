"use client";

import { useEffect, useRef, useState } from "react";
import { tools } from "@/lib/content";
import { Reveal } from "./Reveal";
import { ToolCaricature } from "./ToolCaricatures";

/**
 * The tools rail behaves two different ways:
 *
 * - Mobile / reduced-motion: a plain horizontal swipe (native overflow scroll).
 * - Desktop: the section pins to the viewport and the cards translate sideways
 *   as you scroll. There's a lead-in dwell (it pins and holds before anything
 *   moves) and a settle at the end, so it doesn't grab the scroll instantly.
 */
export function ToolsShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  const [pinned, setPinned] = useState(false);
  const [sectionHeight, setSectionHeight] = useState<number>();
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // Decide which mode we're in (desktop + motion allowed → pinned).
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setPinned(desktop.matches && !reduce.matches);
    apply();
    desktop.addEventListener("change", apply);
    reduce.addEventListener("change", apply);
    return () => {
      desktop.removeEventListener("change", apply);
      reduce.removeEventListener("change", apply);
    };
  }, []);

  // Pinned mode: map vertical scroll → horizontal translate, with buffers.
  useEffect(() => {
    const section = sectionRef.current;
    const rail = railRef.current;
    if (!pinned || !section || !rail) {
      if (rail) rail.style.transform = "";
      setSectionHeight(undefined);
      return;
    }

    // How much vertical scroll it takes to advance the cards. >1 slows them
    // down so a single wheel/trackpad flick can't blow past everything before
    // you've read it. Bump it up for an even slower, more readable pace.
    const SPEED = 2.4;

    let move = 0; // horizontal distance the cards travel
    let travel = 0; // vertical scroll distance mapped onto that movement
    let lead = 0; // dwell before the cards start moving
    let tail = 0; // dwell after they finish, before releasing

    const onScroll = () => {
      if (travel <= 0) return;
      const { top } = section.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (-top - lead) / travel));
      rail.style.transform = `translate3d(${(-p * move).toFixed(2)}px, 0, 0)`;
      setAtStart(p <= 0.001);
      setAtEnd(p >= 0.999);
    };

    const measure = () => {
      rail.style.transform = "";
      move = Math.max(0, rail.scrollWidth - window.innerWidth);
      travel = move * SPEED;
      lead = move > 0 ? window.innerHeight * 0.5 : 0;
      tail = move > 0 ? window.innerHeight * 0.4 : 0;
      setSectionHeight(window.innerHeight + lead + travel + tail);
      if (move <= 0) {
        setAtStart(true);
        setAtEnd(true);
      }
      onScroll();
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, [pinned]);

  // Swipe mode: track scroll position for the edge fades.
  useEffect(() => {
    const rail = railRef.current;
    if (pinned || !rail) return;
    const update = () => {
      const max = rail.scrollWidth - rail.clientWidth;
      setAtStart(rail.scrollLeft <= 4);
      setAtEnd(rail.scrollLeft >= max - 4);
    };
    update();
    rail.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      rail.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pinned]);

  const heading = (
    <Reveal className="max-w-[680px]">
      <h2 className="font-serif text-[clamp(2.1rem,5vw,3.5rem)] leading-[1.04] tracking-[-0.5px] text-ink">
        Curate your references.
      </h2>
      <p className="mt-5 max-w-[520px] text-pretty text-[1.02rem] leading-[1.65] text-muted">
        Everything you need to turn a scattered pile of references into a clear
        creative direction. Arrange on an infinite canvas, mark refs up where it
        matters, pull clean stills from video, draft the brief right beside the
        board, and so much more.
      </p>
    </Reveal>
  );

  return (
    <section
      ref={sectionRef}
      id="tools"
      className="section-invert relative"
      style={pinned ? { height: sectionHeight } : undefined}
    >
      <div
        className={
          pinned
            ? "sticky top-0 flex h-screen flex-col overflow-hidden"
            : "py-14 sm:py-24"
        }
      >
        {/* heading — full-bleed gutter when pinned so the first card lines up */}
        <div
          className={
            pinned
              ? "w-full shrink-0 px-6 pb-2 pt-[3.5vh] sm:px-10 lg:px-[6vw]"
              : "mx-auto w-full max-w-[1200px] px-6 sm:px-10"
          }
        >
          {heading}
        </div>

        {/* rail region — generous top/bottom space so the cards sit in a band */}
        <div
          className={
            pinned
              ? "relative flex min-h-0 flex-1 items-center overflow-hidden py-[2vh]"
              : "relative mx-auto mt-8 w-full max-w-[1200px]"
          }
        >
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-paper to-transparent transition-opacity duration-300 ${atStart ? "opacity-0" : "opacity-100"}`}
          />
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-paper to-transparent transition-opacity duration-300 ${atEnd ? "opacity-0" : "opacity-100"}`}
          />

          <div
            ref={railRef}
            className={`flex gap-5 ${
              pinned
                ? "w-max items-center px-6 will-change-transform sm:px-10 lg:px-[6vw]"
                : "no-scrollbar snap-x snap-mandatory items-start overflow-x-auto scroll-smooth px-6 pb-2 sm:px-10"
            }`}
          >
            {tools.map((tool) => (
              <article
                key={tool.id}
                className="group flex w-[82vw] shrink-0 snap-start flex-col overflow-hidden rounded-[22px] border border-line bg-panel transition-colors hover:border-line-2 sm:w-[460px] lg:w-[40vw]"
              >
                {/* animated caricature screen — always its true 16:10 ratio so
                    the scene is never stretched, zoomed, or letterboxed */}
                <div className="relative aspect-[16/9] overflow-hidden border-b border-line bg-paper">
                  <ToolCaricature id={tool.id} />
                </div>

                {/* label */}
                <div className="flex shrink-0 items-start gap-4 p-7">
                  <span className="mt-0.5 font-serif text-[15px] text-faint tabular-nums">
                    {tool.index}
                  </span>
                  <div>
                    <h3 className="font-serif text-[1.5rem] leading-[1.1] tracking-[-0.3px] text-ink">
                      {tool.name}
                    </h3>
                    <p className="mt-2 text-pretty text-[0.95rem] leading-[1.6] text-muted">
                      {tool.blurb}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
