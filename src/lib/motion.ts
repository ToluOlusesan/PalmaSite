import { useEffect, useRef } from "react";

/**
 * Tiny spring motion primitive — no library, one rAF loop per active element.
 *
 * `useTilt` embodies the Apple "fluid interfaces" idea: motion starts from the
 * element's *current* on-screen value, is interruptible at any frame (a new
 * pointer target just re-points the spring — no restart, no jump), and settles
 * with real physics instead of a fixed-duration curve. It no-ops under
 * `prefers-reduced-motion` and on coarse (touch) pointers, where a hover-driven
 * effect has no meaning.
 */

type Cleanup = () => void;

function inert() {
  if (typeof window === "undefined") return true;
  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !window.matchMedia("(pointer: fine)").matches
  );
}

/** Semi-implicit Euler spring step for one scalar channel. */
function step(
  x: number,
  v: number,
  target: number,
  dt: number,
  k: number,
  d: number,
) {
  const a = -k * (x - target) - d * v;
  v += a * dt;
  x += v * dt;
  return [x, v] as const;
}

/**
 * Pointer tilt: the element rotates a few degrees toward the pointer, springing
 * back on leave. Perspective lives on the parent (set a `[perspective:*]` class
 * there); this only writes rotateX/rotateY so it composes with an outer
 * entrance transform. `max` caps the tilt in degrees.
 */
export function useTilt<T extends HTMLElement>(max = 4) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || inert()) return;

    let raf = 0;
    let rx = 0,
      ry = 0,
      vrx = 0,
      vry = 0,
      trx = 0,
      try_ = 0,
      last = 0,
      running = false;

    // Critically-damped-ish: no bounce on a large surface reads calmer.
    const K = 170;
    const D = 26;

    const frame = (t: number) => {
      const dt = Math.min((t - last) / 1000, 1 / 30) || 1 / 60;
      last = t;
      [rx, vrx] = step(rx, vrx, trx, dt, K, D);
      [ry, vry] = step(ry, vry, try_, dt, K, D);
      el.style.transform = `rotateX(${rx.toFixed(3)}deg) rotateY(${ry.toFixed(3)}deg)`;

      const atRest =
        Math.abs(rx - trx) < 0.01 &&
        Math.abs(ry - try_) < 0.01 &&
        Math.abs(vrx) < 0.02 &&
        Math.abs(vry) < 0.02;
      if (atRest && trx === 0 && try_ === 0) {
        rx = ry = vrx = vry = 0;
        el.style.transform = "rotateX(0deg) rotateY(0deg)";
        running = false;
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const ny = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      // Pointer right → tilt right edge back (negative rotateY); pointer down →
      // tilt bottom back (positive rotateX). Clamp to keep it gentle.
      try_ = Math.max(-1, Math.min(1, nx)) * max;
      trx = Math.max(-1, Math.min(1, -ny)) * max;
      start();
    };
    const onLeave = () => {
      trx = 0;
      try_ = 0;
      start();
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    const cleanup: Cleanup = () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
    return cleanup;
  }, [max]);

  return ref;
}
