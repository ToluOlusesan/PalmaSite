import { Reveal } from "./Reveal";
import { NotifyForm } from "./NotifyForm";

export function CTA() {
  return (
    <section id="request" className="relative overflow-hidden py-28 text-center sm:py-36">
      <div
        className="bloom left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2"
        aria-hidden
      />

      <div className="relative z-[1] mx-auto max-w-[760px] px-6 sm:px-10">
        <Reveal>
          <span className="inline-flex items-center gap-2.5 text-[13px] font-medium uppercase tracking-[0.16em] text-muted">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            Coming soon
          </span>
          <p className="mx-auto mt-6 max-w-[600px] text-balance font-serif text-[clamp(1.6rem,3.6vw,2.4rem)] leading-[1.18] tracking-[-0.3px] text-ink">
            Be the first to know when Palma lands.
          </p>
        </Reveal>

        <Reveal delay={140}>
          <NotifyForm />
          <p className="mt-8 text-[13px] text-faint">
            Windows only for now · No account required · Runs entirely on your machine.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
