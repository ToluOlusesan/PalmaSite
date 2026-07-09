"use client";

import Image from "next/image";
import { useTilt } from "@/lib/motion";

/**
 * The framed "floating window" hero screenshot, with a gentle pointer-driven
 * 3D tilt. Perspective sits on the outer wrapper; the tilt hook writes only
 * rotateX/rotateY on the inner frame, so it never fights the entrance transform
 * the parent <Reveal> owns. Falls back to a static frame under reduced-motion
 * or on touch (the hook no-ops there).
 */
export function HeroShot() {
  const ref = useTilt<HTMLDivElement>(3.2);
  return (
    <div className="[perspective:1600px]">
      <div
        ref={ref}
        className="overflow-hidden rounded-xl border border-line-2 bg-paper shadow-lift will-change-transform sm:rounded-2xl"
        style={{ transformStyle: "preserve-3d" }}
      >
        <Image
          src="/site/app-hero.png"
          alt="The Palma app: a project's references spread across an infinite Dump Board canvas"
          width={2550}
          height={1382}
          priority
          sizes="(max-width: 1480px) 100vw, 1440px"
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}
