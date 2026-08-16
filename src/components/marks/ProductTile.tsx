import type { ProductId } from "@/lib/content";
import { CanvasMark } from "./CanvasMark";
import { NoteMark } from "./NoteMark";

const marks = {
  canvas: CanvasMark,
  note: NoteMark,
} as const;

/**
 * Optical sizing, per mark. The two artworks have very different proportions —
 * Canvas is a wide, low island (1073×861) and PalmaNote is a tall page
 * (1139×1183) — so one shared percentage makes the Canvas mark read as a
 * smudge at tile size while the Note mark reads fine. These are the values
 * where the two tiles look like the same weight of ink beside each other,
 * which is what "the same size" actually means here.
 */
const fill: Record<ProductId, string> = {
  canvas: "w-[68%]",
  note: "h-[56%]",
};

/**
 * The corner ratio both real app icons are cut at (the installer rasterises
 * `rx="248.47"` on a 1183px tile). Every tile on the site derives its radius
 * from its own size with this, rather than carrying a hand-picked `rounded-*`
 * that drifts the moment the size changes.
 */
export const ICON_RADIUS = 0.225;

/**
 * The radius a container needs so a tile nested inside it reads as concentric:
 * the two arcs share a centre only when the outer radius is the inner radius
 * plus the gap between them. Get this wrong and the corners visibly converge
 * or diverge, which is what makes a badge look slightly broken without anyone
 * being able to say why.
 */
export function outerRadius(tileSize: number, pad: number) {
  return Math.round(tileSize * ICON_RADIUS) + pad;
}

/**
 * A product's app icon — the mark knocked out of the tile the installer
 * rasterises from. This is the object a launcher shows you, so the site shows
 * the same one: recognising the icon on the page is what makes finding it in
 * the Start menu later feel like the same thing.
 *
 * It takes `--tile-grad`, not `--accent-grad`, so the identity stays put while
 * the accent is free to change.
 *
 * Deliberately a CSS gradient on a span rather than an SVG `<linearGradient>`:
 * a gradient def carries an id, and two tiles on one page would collide.
 */
export function ProductTile({
  id,
  size,
  className = "",
}: {
  id: ProductId;
  /** Edge length in px. Drives the corner radius, so pass the real number. */
  size: number;
  className?: string;
}) {
  const Mark = marks[id];
  return (
    // Decorative: the product's name is always right next to it, so announcing
    // the mark as well would read the same thing twice.
    <span
      aria-hidden
      data-product={id}
      className={`grid shrink-0 place-items-center overflow-hidden text-white ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: Math.round(size * ICON_RADIUS),
        background: "var(--tile-grad)",
      }}
    >
      <Mark className={fill[id]} />
    </span>
  );
}
