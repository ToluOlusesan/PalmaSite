import { Reveal } from "./Reveal";

export function CTA() {
  return (
    <section id="request" className="relative overflow-hidden py-28 text-center sm:py-36">
      <div className="relative z-[1] mx-auto max-w-[760px] px-6 sm:px-10">
        <Reveal>
          <p className="mx-auto max-w-[600px] text-balance font-serif text-[clamp(1.6rem,3.6vw,2.4rem)] leading-[1.18] tracking-[-0.3px] text-ink">
            Palma is coming soon. We&apos;re putting the finishing touches on it —
            check back shortly.
          </p>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-10 flex flex-col items-center gap-4">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-line-2 bg-panel px-5 py-2.5 text-[14px] font-medium text-ink shadow-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-ink/55" aria-hidden />
              Coming soon
            </span>
            <p className="text-[13px] text-faint">
              Windows only for now · No account required · Runs entirely on your machine.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
