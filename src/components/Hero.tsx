import { Reveal } from "./Reveal";
import { BetaInput } from "./BetaInput";

export function Hero() {
  return (
    <header
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-28 pt-32 text-center sm:px-10"
    >
      <div className="relative z-[2] max-w-[820px]">
        <Reveal delay={80}>
          <h1 className="font-serif text-[clamp(2.7rem,7vw,5.4rem)] font-normal leading-[1.04] tracking-[-1px] text-ink">
            Your reference board,
            <br className="hidden sm:block" /> finally{" "}
            <span className="font-script text-[1.5em] leading-[0.6] tracking-normal">
              alive
            </span>
            <span className="font-serif">.</span>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mx-auto mt-7 max-w-[520px] text-pretty text-[1.05rem] leading-[1.65] text-muted">
            Palma is a creative workspace and moodboarding tool for designers.
            Drop your references, make notes, curate the vibe — all local on
            your machine.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-10">
            <BetaInput
              variant="hero"
              hint="Windows only for now · Invite-only beta · Your first board in under 5 minutes."
            />
          </div>
        </Reveal>
      </div>

      <a
        href="#canvas"
        aria-label="Scroll to the canvas"
        className="absolute bottom-7 left-1/2 z-[2] -translate-x-1/2 text-faint transition-colors hover:text-ink"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </header>
  );
}
