import type { SVGProps } from "react";

/**
 * The chrome glyphs the PalmaNote mockup is drawn with, matched to the
 * Phosphor-adjacent set the app itself uses.
 *
 * Inlined at a 16×16 grid rather than pulled from an icon package: these only
 * ever appear inside one mockup, at one size, and shipping a dependency for
 * fifteen paths that are never reused would cost more than it saves.
 */

type Props = SVGProps<SVGSVGElement> & { size?: number };

function Glyph({ size = 16, children, ...rest }: Props) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      fill="none"
      aria-hidden
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconPage(p: Props) {
  return (
    <Glyph {...p}>
      <path d="M9.5 1.5H4a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V5l-3.5-3.5Z" {...stroke} />
      <path d="M9.5 1.5V5H13" {...stroke} />
      <path d="M5.5 8h5M5.5 10.5h3" {...stroke} />
    </Glyph>
  );
}

export function IconSidebar(p: Props) {
  return (
    <Glyph {...p}>
      <rect x="1.8" y="3" width="12.4" height="10" rx="1.6" {...stroke} />
      <path d="M6.2 3v10" {...stroke} />
    </Glyph>
  );
}

export function IconHistory(p: Props) {
  return (
    <Glyph {...p}>
      <path d="M2.6 8a5.4 5.4 0 1 0 1.6-3.8" {...stroke} strokeWidth={1.3} />
      <path d="M2.2 2.6v3.2h3.2" {...stroke} strokeWidth={1.3} />
      <path d="M8 5.4V8l1.9 1.2" {...stroke} strokeWidth={1.3} />
    </Glyph>
  );
}

export function IconGrid(p: Props) {
  return (
    <Glyph {...p}>
      <rect x="2.2" y="2.8" width="11.6" height="10.4" rx="1.4" {...stroke} />
      <path d="M2.2 6.2h11.6M6.4 6.2v7" {...stroke} />
    </Glyph>
  );
}

export function IconGear(p: Props) {
  return (
    <Glyph {...p}>
      <circle cx="8" cy="8" r="2.2" {...stroke} />
      <path
        d="M12.9 9.8a1.1 1.1 0 0 0 .22 1.21l.04.04a1.33 1.33 0 1 1-1.88 1.88l-.04-.04a1.1 1.1 0 0 0-1.21-.22 1.1 1.1 0 0 0-.67 1v.11a1.33 1.33 0 1 1-2.66 0v-.06a1.1 1.1 0 0 0-.72-1 1.1 1.1 0 0 0-1.21.22l-.04.04a1.33 1.33 0 1 1-1.88-1.88l.04-.04a1.1 1.1 0 0 0 .22-1.21 1.1 1.1 0 0 0-1-.67h-.11a1.33 1.33 0 1 1 0-2.66h.06a1.1 1.1 0 0 0 1-.72 1.1 1.1 0 0 0-.22-1.21l-.04-.04a1.33 1.33 0 1 1 1.88-1.88l.04.04a1.1 1.1 0 0 0 1.21.22h.05a1.1 1.1 0 0 0 .67-1v-.11a1.33 1.33 0 1 1 2.66 0v.06a1.1 1.1 0 0 0 .67 1 1.1 1.1 0 0 0 1.21-.22l.04-.04a1.33 1.33 0 1 1 1.88 1.88l-.04.04a1.1 1.1 0 0 0-.22 1.21v.05a1.1 1.1 0 0 0 1 .67h.11a1.33 1.33 0 1 1 0 2.66h-.06a1.1 1.1 0 0 0-1 .67Z"
        {...stroke}
        strokeWidth={1.1}
      />
    </Glyph>
  );
}

export function IconShare(p: Props) {
  return (
    <Glyph {...p}>
      <path d="M8 10.4V2.4M5.2 5.2 8 2.4l2.8 2.8" {...stroke} strokeWidth={1.3} />
      <path d="M3 9.6v3a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-3" {...stroke} strokeWidth={1.3} />
    </Glyph>
  );
}

export function IconTheme(p: Props) {
  return (
    <Glyph {...p}>
      <circle cx="8" cy="8" r="5.6" {...stroke} />
      <path d="M8 2.4a5.6 5.6 0 0 1 0 11.2Z" fill="currentColor" />
    </Glyph>
  );
}

export function IconChevronLeft(p: Props) {
  return (
    <Glyph {...p}>
      <path d="M9.8 3.6 5.4 8l4.4 4.4" {...stroke} strokeWidth={1.4} />
    </Glyph>
  );
}

export function IconChevronRight(p: Props) {
  return (
    <Glyph {...p}>
      <path d="M6.2 3.6 10.6 8l-4.4 4.4" {...stroke} strokeWidth={1.4} />
    </Glyph>
  );
}

export function IconChevronDown(p: Props) {
  return (
    <Glyph {...p}>
      <path d="M3.8 6.2 8 10.4l4.2-4.2" {...stroke} strokeWidth={1.4} />
    </Glyph>
  );
}

export function IconClose(p: Props) {
  return (
    <Glyph {...p}>
      <path d="M4.2 4.2l7.6 7.6M11.8 4.2l-7.6 7.6" {...stroke} strokeWidth={1.4} />
    </Glyph>
  );
}

export function IconHighlighter(p: Props) {
  return (
    <Glyph {...p}>
      <path d="M11.2 2.6 13.4 4.8 7.6 10.6 5.4 8.4l5.8-5.8Z" {...stroke} strokeWidth={1.3} />
      <path d="M5.4 8.4 3.6 11.4l1.4 1.4 3-1.8" {...stroke} strokeWidth={1.3} />
      <path d="M2.4 14.2h5" {...stroke} strokeWidth={1.4} />
    </Glyph>
  );
}

export function IconBullets(p: Props) {
  return (
    <Glyph {...p}>
      <path d="M6 4.2h8M6 8h8M6 11.8h8" {...stroke} strokeWidth={1.3} />
      <circle cx="2.9" cy="4.2" r="1.05" fill="currentColor" />
      <circle cx="2.9" cy="8" r="1.05" fill="currentColor" />
      <circle cx="2.9" cy="11.8" r="1.05" fill="currentColor" />
    </Glyph>
  );
}

export function IconOrdered(p: Props) {
  return (
    <Glyph {...p}>
      <path d="M6.4 4.2h7.8M6.4 8h7.8M6.4 11.8h7.8" {...stroke} strokeWidth={1.3} />
      <path d="M1.6 2.9h.9v3.2M1.4 6.1h1.9" {...stroke} strokeWidth={1.1} />
      <path d="M1.4 8.4a1 1 0 0 1 1.9.5c0 .7-1.9 1.4-1.9 2h2" {...stroke} strokeWidth={1.1} />
      <path d="M1.5 11.1h1.8l-1 1.2a1 1 0 1 1-.8 1.6" {...stroke} strokeWidth={1.1} />
    </Glyph>
  );
}

export function IconTasks(p: Props) {
  return (
    <Glyph {...p}>
      <path d="M7.4 4.2h6.8M7.4 8h6.8M7.4 11.8h6.8" {...stroke} strokeWidth={1.3} />
      <path d="M1.4 4.2 2.6 5.4 5 3" {...stroke} strokeWidth={1.3} />
      <path d="M1.4 8l1.2 1.2L5 6.8" {...stroke} strokeWidth={1.3} />
      <path d="M1.4 11.8 2.6 13 5 10.6" {...stroke} strokeWidth={1.3} />
    </Glyph>
  );
}

export function IconImage(p: Props) {
  return (
    <Glyph {...p}>
      <rect x="2.2" y="3.2" width="11.6" height="9.6" rx="1.5" {...stroke} />
      <circle cx="5.8" cy="6.4" r="1" fill="currentColor" />
      <path d="M2.6 11 6 8.2l3 2.4 2.2-1.6 2.4 2" {...stroke} />
    </Glyph>
  );
}

export function IconPlusPage(p: Props) {
  return (
    <Glyph {...p}>
      <path
        d="M9.4 1.8H4.2a1 1 0 0 0-1 1v10.4a1 1 0 0 0 1 1h7.6a1 1 0 0 0 1-1V5.2L9.4 1.8Z"
        {...stroke}
      />
      <path d="M8 7.4v3.4M6.3 9.1h3.4" {...stroke} />
    </Glyph>
  );
}

export function IconStar(p: Props) {
  return (
    <Glyph {...p}>
      <path d="M8 2.2l1.8 3.7 4 .6-2.9 2.8.7 4L8 11.4l-3.6 1.9.7-4L2.2 6.5l4-.6L8 2.2Z" {...stroke} />
    </Glyph>
  );
}

export function IconDots(p: Props) {
  return (
    <Glyph {...p}>
      <circle cx="3.4" cy="8" r="1.05" fill="currentColor" />
      <circle cx="8" cy="8" r="1.05" fill="currentColor" />
      <circle cx="12.6" cy="8" r="1.05" fill="currentColor" />
    </Glyph>
  );
}

export function IconPen(p: Props) {
  return (
    <Glyph {...p}>
      <path d="M10.6 2.4 13.6 5.4 6 13H3v-3l7.6-7.6Z" {...stroke} strokeWidth={1.3} />
    </Glyph>
  );
}

export function IconCalendar(p: Props) {
  return (
    <Glyph {...p}>
      <rect x="2.2" y="3.2" width="11.6" height="10.6" rx="1.6" {...stroke} strokeWidth={1.3} />
      <path d="M2.2 6.4h11.6M5.4 1.8v2.6M10.6 1.8v2.6" {...stroke} strokeWidth={1.3} />
    </Glyph>
  );
}

export function IconTrend(p: Props) {
  return (
    <Glyph {...p}>
      <path d="M2 11.4 6 7l2.6 2.6L14 4.2" {...stroke} strokeWidth={1.5} />
      <path d="M10.2 4.2H14v3.8" {...stroke} strokeWidth={1.5} />
    </Glyph>
  );
}
