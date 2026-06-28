import { Reveal } from "./Reveal";
import { ToolCaricature } from "./ToolCaricatures";

export function Spotlight() {
  return (
    <section id="focus" className="relative bg-panel py-24 sm:py-32">
      <Reveal className="mx-auto max-w-[640px] px-6 text-center sm:px-10">
        <h2 className="font-serif text-[clamp(2.1rem,5vw,3.5rem)] leading-[1.04] tracking-[-0.5px] text-ink">
          Find the direction in the noise.
        </h2>
        <p className="mx-auto mt-5 max-w-[500px] text-pretty text-[1.02rem] leading-[1.65] text-muted">
          Send the keepers to Focus and drop them into named zones: colour,
          texture, motion. What lands there becomes the project&apos;s
          direction, ready to export as a one-click brief, straight to your
          clients.
        </p>
      </Reveal>

      {/* Placeholder: the Focus caricature stands in until a real screenshot of
          Focus mode is dropped in (swap this block for an <Image>). Sized to the
          hero screenshot's width. */}
      <Reveal delay={120} className="mx-auto mt-14 max-w-[1440px] px-6 sm:px-10">
        <div className="overflow-hidden rounded-xl border border-line-2 bg-paper shadow-lift sm:rounded-2xl">
          <div className="relative aspect-[16/9]">
            <ToolCaricature id="focus" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
