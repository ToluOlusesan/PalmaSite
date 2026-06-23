import { Reveal } from "./Reveal";
import { BetaInput } from "./BetaInput";

export function CTA() {
  return (
    <section id="request" className="relative overflow-hidden py-28 text-center sm:py-36">
      <div className="relative z-[1] mx-auto max-w-[760px] px-6 sm:px-10">
        <Reveal>
          <p className="mx-auto max-w-[600px] text-balance font-serif text-[clamp(1.6rem,3.6vw,2.4rem)] leading-[1.18] tracking-[-0.3px] text-ink">
            Palma is invite-only during beta. Drop your email and we&apos;ll
            reach out when a seat opens.
          </p>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-10">
            <BetaInput
              variant="cta"
              hint="Windows only for now · No account required · Runs entirely on your machine."
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
