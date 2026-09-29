import type { Metadata } from "next";
import { noteReleases } from "@/lib/content";
import { ReleaseHistory } from "@/components/product/WhatsNew";
import { Shell } from "@/components/ui/SectionHead";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Every published PalmaNote release, from the newest writing improvements back through the first Windows app.",
  alternates: { canonical: "/note/changes" },
};

export default function PalmaNoteChangesPage() {
  return (
    <div data-product="note" id="top" className="pt-28 pb-20 sm:pt-36 sm:pb-28">
      <Shell>
        <header className="mx-auto max-w-[44rem] text-center">
          <h1 className="display text-[clamp(2.35rem,5.2vw,4rem)] text-ink">Release notes</h1>
          <p className="mx-auto mt-5 max-w-[36rem] text-pretty text-[1.02rem] leading-[1.65] text-muted">
            The full record of what has changed, written for people using the app rather than for a commit log.
          </p>
        </header>
        <div className="mt-16 border-t border-line pt-16 sm:mt-20 sm:pt-20">
          <ReleaseHistory releases={noteReleases} />
        </div>
      </Shell>
    </div>
  );
}
