"use client";

import { useEffect, useState } from "react";
import { PalmaMark } from "./PalmaMark";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background,backdrop-filter,border-color] duration-300 ${
        scrolled
          ? "border-line bg-paper/75 backdrop-blur-md backdrop-saturate-150"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 sm:px-10">
        <a
          href="#top"
          aria-label="Palma — home"
          className="flex items-center gap-2.5 text-ink"
        >
          <PalmaMark className="h-[22px] w-7" />
          <span className="font-serif text-[21px] leading-none tracking-[0.1px]">Palma</span>
        </a>

        <div className="flex items-center gap-1 sm:gap-2">
          <a
            href="#tools"
            className="hidden rounded-full px-3.5 py-2 text-[13.5px] text-muted transition-colors hover:text-ink sm:inline-block"
          >
            Tools
          </a>
          <a
            href="#why"
            className="hidden rounded-full px-3.5 py-2 text-[13.5px] text-muted transition-colors hover:text-ink sm:inline-block"
          >
            Why Palma
          </a>
          <a
            href="#request"
            className="rounded-full bg-ink px-4 py-2 text-[13.5px] font-medium text-paper transition-opacity hover:opacity-85"
          >
            Request access
          </a>
        </div>
      </div>
    </nav>
  );
}
