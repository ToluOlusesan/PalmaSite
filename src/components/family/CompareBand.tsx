import { compare, productList } from "@/lib/content";
import { ProductTile } from "@/components/marks/ProductTile";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead, Shell } from "@/components/ui/SectionHead";

/**
 * The one question a family page has to answer, answered in a table.
 *
 * Rows are written so the two columns give genuinely different answers. A
 * comparison where both sides say "fast, local, yours" teaches nobody
 * anything and quietly admits the split was arbitrary — the point of these
 * rows is that after reading five of them you know which app you came for.
 *
 * One DOM, two layouts: at `md` and up each row's wrapper becomes
 * `display: contents` so its three cells drop into the parent grid as a real
 * table row. Below that the wrapper stays a card and the cells stack, each
 * naming its own product. Nothing is duplicated to make the small screen work.
 */
export function CompareBand() {
  return (
    <section id="compare" className="scroll-mt-24 py-16 sm:py-24">
      <Shell>
        <SectionHead title="You probably came for one of them.">
          They overlap less than the shared name suggests. One is where a
          project&rsquo;s look gets decided; the other is where its words do.
        </SectionHead>

        <Reveal className="mt-12 overflow-hidden rounded-[1.25rem] border border-line sm:mt-14">
          <div className="md:grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)_minmax(0,1fr)]">
            {/* Column heads — desktop only; on mobile each cell names itself. */}
            <div className="hidden md:contents">
              <div className="border-b border-line bg-panel px-6 py-5" />
              {productList.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-2.5 border-b border-l border-line bg-panel px-6 py-5"
                >
                  <ProductTile id={p.id} size={28} />
                  <span className="text-[14.5px] font-medium text-ink">{p.name}</span>
                </div>
              ))}
            </div>

            {compare.map((row, i) => (
              <div
                key={row.label}
                className={`border-line max-md:border-b max-md:p-6 md:contents ${
                  i === compare.length - 1 ? "max-md:border-b-0" : ""
                }`}
              >
                <div
                  className={`text-[13px] text-faint max-md:mb-3 md:flex md:items-start md:bg-panel/50 md:px-6 md:py-5 md:text-[14px] md:text-muted ${
                    i > 0 ? "md:border-t md:border-line" : ""
                  }`}
                >
                  {row.label}
                </div>

                {productList.map((p) => (
                  <div
                    key={p.id}
                    data-product={p.id}
                    className={`text-[0.95rem] leading-[1.55] text-strong max-md:mt-2.5 md:border-l md:border-line md:px-6 md:py-5 ${
                      i > 0 ? "md:border-t" : ""
                    }`}
                  >
                    <span className="mb-0.5 flex items-center gap-1.5 text-[12px] font-medium text-[var(--accent)] md:hidden">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: "var(--accent-grad)" }}
                        aria-hidden
                      />
                      {p.short}
                    </span>
                    <span className="text-pretty">{row[p.id]}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Reveal>
      </Shell>
    </section>
  );
}
