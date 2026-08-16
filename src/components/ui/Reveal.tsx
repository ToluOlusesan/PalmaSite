"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Stagger the reveal, in milliseconds. */
  delay?: number;
};

/**
 * Reveals its children when scrolled into view. Animation is pure CSS
 * (see `.reveal` in globals.css); this only toggles the class once.
 */
export function Reveal({ children, as: Tag = "div", className = "", delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      // `threshold: 0` on purpose. A ratio-based threshold silently never
      // fires for anything taller than the viewport — a tall table or a full
      // section can't be 15% visible and 15% of it can never be on screen at
      // once — leaving that block invisible forever. The delay comes from the
      // negative bottom margin instead, which is a distance and so is
      // height-independent.
      { threshold: 0, rootMargin: "0px 0px -12% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
