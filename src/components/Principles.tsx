import { Camera, CloudOff, HardDrive, Infinity, Zap, type LucideIcon } from "lucide-react";
import { principles, type PrincipleIcon } from "@/lib/content";
import { Reveal } from "./Reveal";

const icons: Record<PrincipleIcon, LucideIcon> = {
  "hard-drive": HardDrive,
  "cloud-off": CloudOff,
  infinity: Infinity,
  zap: Zap,
  camera: Camera,
};

// A sprinkle of colour — one vivid accent per principle, against the monochrome.
const accents: Record<PrincipleIcon, string> = {
  "hard-drive": "#f97316",
  "cloud-off": "#16a34a",
  infinity: "#ec4899",
  zap: "#2563eb",
  camera: "#14b8a6",
};

export function Principles() {
  return (
    <section id="why" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
        <Reveal className="mx-auto max-w-[680px] text-center">
          <h2 className="font-serif text-[clamp(2.1rem,5vw,3.5rem)] leading-[1.04] tracking-[-0.5px] text-ink">
            Built for how you actually work.
          </h2>
          <p className="mx-auto mt-5 max-w-[500px] text-pretty text-[1.02rem] leading-[1.65] text-muted">
            No accounts to manage, no servers to trust, no invoice next year.
            Palma runs where your work already lives.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {principles.map((p, i) => {
            const Icon = icons[p.icon];
            const accent = accents[p.icon];
            // First two cards span wide; last three split the bottom row.
            const span = i < 2 ? "lg:col-span-3" : "lg:col-span-2";
            return (
              <Reveal
                key={p.title}
                delay={(i % 3) * 60}
                className={`flex flex-col rounded-2xl border border-line bg-panel p-7 transition-colors hover:border-line-2 ${span}`}
              >
                <span
                  className="grid h-12 w-12 place-items-center rounded-xl border"
                  style={{
                    color: accent,
                    backgroundColor: `${accent}26`,
                    borderColor: `${accent}66`,
                  }}
                >
                  <Icon className="h-[22px] w-[22px]" strokeWidth={1.5} aria-hidden />
                </span>
                <h3 className="mt-6 text-[1.1rem] font-semibold tracking-[-0.1px] text-ink">
                  {p.title}
                </h3>
                <p className="mt-2.5 text-pretty text-[0.95rem] leading-[1.6] text-muted">
                  {p.body}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
