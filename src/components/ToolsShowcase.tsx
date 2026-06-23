import { tools } from "@/lib/content";
import { Reveal } from "./Reveal";
import { ToolCaricature } from "./ToolCaricatures";

export function ToolsShowcase() {
  return (
    <section id="tools" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
        <Reveal className="mx-auto max-w-[680px] text-center">
          <h2 className="font-serif text-[clamp(2rem,5vw,3.4rem)] leading-[1.04] tracking-[-0.5px] text-ink">
            Curate your references.
          </h2>
          <p className="mx-auto mt-5 max-w-[460px] text-pretty text-[1.02rem] leading-[1.65] text-muted">
            Everything the work needs to go from a pile of references to a clear
            direction — and not one feature more.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {tools.map((tool, i) => (
            <Reveal
              key={tool.id}
              delay={(i % 2) * 80}
              className="group flex flex-col overflow-hidden rounded-[22px] border border-line bg-panel transition-colors hover:border-line-2"
            >
              {/* animated caricature screen */}
              <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-paper">
                <ToolCaricature id={tool.id} />
              </div>

              {/* label */}
              <div className="flex items-start gap-4 p-7">
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
