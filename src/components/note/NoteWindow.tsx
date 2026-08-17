"use client";

import { useTilt } from "@/lib/motion";
import { NoteMark } from "@/components/marks/NoteMark";
import {
  IconBullets,
  IconChevronLeft,
  IconChevronRight,
  IconClose,
  IconGear,
  IconGrid,
  IconHighlighter,
  IconHistory,
  IconImage,
  IconOrdered,
  IconPage,
  IconPlusPage,
  IconShare,
  IconSidebar,
  IconStar,
  IconTasks,
  IconTheme,
  IconDots,
} from "./NoteIcons";

/**
 * PalmaNote's hero: the window itself, rebuilt in markup.
 *
 * There is no installer to screenshot yet, so this stands in for one — and it
 * is a better stand-in than a screenshot would be. It is real DOM, so it stays
 * sharp at any zoom, restyles with the tokens, reflows on a phone instead of
 * becoming a 400px-wide picture of a desktop app, and adds nothing to the
 * page's image weight.
 *
 * The content is a writer mid-chapter rather than lorem: the highlight, the
 * two unresolved tasks and the sticky asking about a word are the argument for
 * the app. Placeholder text would have shown the layout and none of the point.
 *
 * The same pointer tilt as the Canvas shot, for the same reason — the two
 * heroes have to feel like the same object at rest.
 */
export function NoteWindow() {
  const ref = useTilt<HTMLDivElement>(3.2);

  return (
    <div className="[perspective:1600px]">
      <div
        ref={ref}
        className="nw overflow-hidden rounded-xl border border-line-2 bg-paper text-left shadow-float will-change-transform sm:rounded-2xl"
        style={{ transformStyle: "preserve-3d" }}
        role="img"
        aria-label="The PalmaNote window: a page called Chapter One, with a highlighted sentence, two open tasks, and sticky notes in the rail beside it"
      >
        {/* ── title bar ─────────────────────────────────────────────────── */}
        <div className="nw-bar">
          <span className="nw-icon text-ink">
            <NoteMark className="h-[17px] w-[17px]" title="" />
          </span>
          <span className="hidden text-[0.8125rem] text-[color:var(--nw-muted)] sm:inline">
            Import
          </span>
          <span className="nw-icon">
            <IconSidebar />
          </span>

          <div className="nw-tabs ml-1">
            <span className="nw-tab" data-active="">
              <IconPage size={14} />
              Chapter One
              <IconClose size={11} />
            </span>
            <span className="nw-tab hidden sm:flex">
              <IconPage size={14} />
              Groceries
            </span>
          </div>

          <div className="nw-toolbar hidden sm:flex">
            <span className="nw-icon">
              <IconHistory />
            </span>
            <span className="nw-icon">
              <IconGrid />
            </span>
            <span className="nw-icon">
              <IconGear />
            </span>
            <span className="nw-icon">
              <IconShare />
            </span>
            <span className="nw-icon">
              <IconTheme />
            </span>
          </div>
        </div>

        {/* ── page bar ──────────────────────────────────────────────────── */}
        <div className="nw-bar">
          <span className="nw-icon">
            <IconChevronLeft size={15} />
          </span>
          <span className="nw-icon">
            <IconChevronRight size={15} />
          </span>
          <span className="ml-1 text-[0.8125rem] text-[color:var(--nw-muted)]">
            Chapter One
          </span>

          <div className="nw-toolbar">
            <span className="nw-tool font-semibold">B</span>
            <span className="nw-tool italic">I</span>
            <span className="nw-tool line-through">S</span>
            <span className="nw-tool">
              <IconHighlighter size={15} />
            </span>
            <span className="nw-rule" />
            <span className="nw-tool hidden sm:grid">
              H<sub>1</sub>
            </span>
            <span className="nw-tool hidden sm:grid">
              H<sub>2</sub>
            </span>
            <span className="nw-rule hidden sm:block" />
            <span className="nw-tool">
              <IconBullets size={15} />
            </span>
            <span className="nw-tool hidden sm:grid">
              <IconOrdered size={15} />
            </span>
            <span className="nw-tool" data-on="">
              <IconTasks size={15} />
            </span>
          </div>
        </div>

        {/* ── body ──────────────────────────────────────────────────────── */}
        <div className="nw-body">
          <aside className="nw-side">
            <span className="nw-side-label">Pages</span>
            <span className="nw-row" data-active="">
              <IconPage size={14} />
              <span className="truncate">Chapter One</span>
              <span className="ml-auto flex items-center gap-1 opacity-60">
                <IconStar size={12} />
                <IconDots size={12} />
              </span>
            </span>
            {["Reading list", "Kitchen rebuild", "Allotment", "Groceries"].map((p) => (
              <span key={p} className="nw-row">
                <IconPage size={14} />
                <span className="truncate">{p}</span>
              </span>
            ))}
            <span className="nw-row mt-1 text-[color:var(--nw-faint)]">
              <IconPlusPage size={15} />
              Add page
            </span>
            {/* The word count used to live here too. Two different word counts
                in one window read as two different numbers — the status bar is
                where it belongs, so this says how many pages instead. */}
            <span className="mt-auto flex items-center justify-between px-1.5 pt-4 text-[0.6875rem] text-[color:var(--nw-faint)]">
              <span>Archive</span>
              <span>5 pages</span>
            </span>
          </aside>

          <div className="nw-doc">
            <span className="mb-3 inline-flex items-center gap-1.5 text-[0.75rem] text-[color:var(--nw-faint)]">
              <IconImage size={14} />
              Add cover
            </span>
            <div className="nw-doc-title">Chapter One</div>

            <p>
              The tide went out further than anyone could remember, and the
              boats leaned over in the mud like animals asleep.{" "}
              <span className="nw-mark">Check the tide tables for October</span>{" "}
              — it matters more than it sounds, because everything after this
              depends on how long the flats stayed dry.
            </p>
            <p>
              Ada had walked out there twice before, once as a child with her
              father and once alone. Both times are written down in{" "}
              <span className="nw-link">The harbour</span>, which is where the
              names of the boats are kept.
            </p>
            <p>
              She went back for the tide tables and found them where she had
              left them, under the tin on the second shelf, still folded to the
              page her father had marked.
            </p>

            <div className="mt-4">
              <div className="nw-task">
                <span className="nw-box" />
                <span>Name the second boat</span>
              </div>
              <div className="nw-task">
                <span className="nw-box" />
                <span>Decide whether the father is alive in chapter four</span>
              </div>
            </div>
          </div>

          {/* The rail. Deliberately outside the document column — a sticky is
              a thing you put *next to* the writing, and the layout has to say
              so before the copy does. */}
          <aside className="nw-rail">
            <div className="nw-sticky bg-[#d8f533]" style={{ rotate: "-1.2deg" }}>
              Is &ldquo;flats&rdquo; the right word here, or is that only an
              estuary thing?
            </div>
            <div className="nw-sticky bg-[#ffa32e]" style={{ rotate: "1deg" }}>
              Ada&rsquo;s mother hasn&rsquo;t been mentioned once. Deliberate?
            </div>
            <div className="nw-sticky bg-[#9ec8ff]" style={{ rotate: "-0.6deg" }}>
              Check the boat names against the harbour page before the next
              pass.
            </div>
          </aside>
        </div>

        {/* Full width, outside the body grid. Under the document column alone
            it stopped short of the rail and left a ragged bottom edge. */}
        <div className="nw-status">
          <span>1,284 words</span>
          <span aria-hidden>·</span>
          <span className="hidden sm:inline">7,041 chars</span>
          <span className="hidden sm:inline" aria-hidden>
            ·
          </span>
          <span>+312 this session</span>
        </div>
      </div>
    </div>
  );
}
