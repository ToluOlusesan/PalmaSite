import { site } from "@/lib/content";

/**
 * The primary call to action: a direct download of the current Windows
 * installer, no waitlist in between. The `shimmer-btn` class (see globals.css)
 * runs a light sweep across it on a loop; pointer-events stay on the anchor.
 */
export function DownloadButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={site.downloadUrl}
      className={`shimmer-btn group relative inline-flex h-12 items-center justify-center gap-2.5 overflow-hidden rounded-full bg-ink px-7 text-[15px] font-medium text-paper shadow-soft transition-transform duration-300 hover:-translate-y-0.5 ${className}`}
    >
      <svg viewBox="0 0 24 24" className="relative z-[1] h-[18px] w-[18px]" fill="none" aria-hidden>
        <path d="M12 3v11m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      <span className="relative z-[1]">Download for Windows</span>
    </a>
  );
}

/** Secondary, quiet link to the PDF user guide. Opens in a new tab. */
export function GuideLink({ className = "" }: { className?: string }) {
  return (
    <a
      href={site.guideUrl}
      target="_blank"
      rel="noopener"
      className={`inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line-2 px-6 text-[15px] font-medium text-ink transition-colors hover:border-ink ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-[17px] w-[17px]" fill="none" aria-hidden>
        <path d="M6 3h9l4 4v14a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M14 3v5h5M9 13h6M9 17h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      Read the guide
    </a>
  );
}
