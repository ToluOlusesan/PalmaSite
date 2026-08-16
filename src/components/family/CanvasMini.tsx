import Image from "next/image";

/**
 * Palma Canvas, in miniature: real reference images scattered on a dot-grid
 * board, one of them carrying a pinned comment.
 *
 * The images are the app's own — an abstract arrangement of grey rectangles
 * would have shown the layout but not the point, which is that this is where
 * *other people's pictures* go. The tiles sit at slight angles because that is
 * how a board looks ten seconds after you start throwing things at it.
 *
 * At rest it is a still. Motion is gated on the parent card's hover so two
 * looping vignettes are never competing for attention on one screen.
 */

type Tile = {
  src: string;
  alt: string;
  /** Position and size in % of the board, so the whole scene scales. */
  x: number;
  y: number;
  w: number;
  rotate: number;
};

const tiles: Tile[] = [
  { src: "/site/Tenebris.png", alt: "", x: 5, y: 11, w: 29, rotate: -3.5 },
  { src: "/site/1.png", alt: "", x: 37, y: 5, w: 26, rotate: 2 },
  { src: "/site/Eve.jpg", alt: "", x: 66, y: 14, w: 24, rotate: 4 },
  { src: "/site/untitled.png", alt: "", x: 9, y: 54, w: 25, rotate: 3 },
  { src: "/site/4.png", alt: "", x: 37, y: 50, w: 27, rotate: -2 },
  { src: "/site/5.png", alt: "", x: 68, y: 58, w: 24, rotate: 2.5 },
];

export function CanvasMini() {
  return (
    <div className="dotgrid absolute inset-0 bg-panel">
      {tiles.map((t, i) => (
        <div
          key={t.src}
          className="absolute overflow-hidden rounded-[3px] bg-paper shadow-soft transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          style={{
            left: `${t.x}%`,
            top: `${t.y}%`,
            width: `${t.w}%`,
            rotate: `${t.rotate}deg`,
            // Each tile eases at its own pace so the board settles rather than
            // snapping as one rigid sheet.
            transitionDelay: `${i * 24}ms`,
          }}
        >
          <Image
            src={t.src}
            alt={t.alt}
            width={320}
            height={220}
            sizes="(max-width: 1024px) 45vw, 320px"
            // The first tile is the largest thing above the fold on the family
            // page, so it is the LCP element on most visits and must not wait
            // for the lazy-load observer.
            priority={i === 0}
            className="aspect-[4/3] h-auto w-full object-cover"
          />
        </div>
      ))}

      {/* A comment pinned to a reference. Anchored from the *right* so the
          bubble grows inward and never gets clipped by the card edge on a
          narrow column — the card is `overflow-hidden`, so an overhang here
          reads as a rendering fault rather than as depth. */}
      <div className="absolute right-[4%] top-[36%] flex items-start justify-end gap-1.5">
        <span
          className="mt-[3px] grid h-[15px] w-[15px] shrink-0 place-items-center rounded-full bg-ink text-[8px] font-semibold text-paper shadow-soft"
          aria-hidden
        >
          1
        </span>
        <span className="max-w-[8.5rem] rounded-[5px] rounded-tl-none bg-paper px-2 py-1.5 text-[8.5px] leading-[1.35] text-ink shadow-soft">
          This grade, but warmer
        </span>
      </div>
    </div>
  );
}
