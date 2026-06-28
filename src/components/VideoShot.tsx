"use client";

import { useEffect, useRef, useState } from "react";

/* The Video → Screenshot scene's live part: the real reference video plays in
   the card, and exactly one second in the shutter flashes and a clean still
   pops out. Rendered as SVG (foreignObject for the <video>/<img>) so it sits
   inside the caricature scene. Coordinates match the surrounding chrome. */

const INK = "#0a0a0a";
const CANVAS = "#f2f2f2";

const CARD = { x: 88, y: 62, w: 188, h: 128 };
const STILL = { x: 330, y: 86, w: 120, h: 86 };
const TRACK = { x1: 102, x2: 262, y: 176 };

export function VideoShot() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState(0);
  const [flash, setFlash] = useState(false);
  const [captured, setCaptured] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      const t = setTimeout(() => {
        setProgress(0.18);
        setCaptured(true);
      }, 0);
      return () => clearTimeout(t);
    }

    let fired = false;
    const onTime = () => {
      const d = v.duration || 1;
      setProgress(v.currentTime / d);
      setTime(v.currentTime);
      if (v.currentTime >= 1 && !fired) {
        fired = true;
        setFlash(true);
        setCaptured(true);
        window.setTimeout(() => setFlash(false), 170);
      }
      if (v.currentTime < 0.5) {
        fired = false;
        setCaptured(false);
      }
    };
    v.addEventListener("timeupdate", onTime);
    v.play?.().catch(() => {});
    return () => v.removeEventListener("timeupdate", onTime);
  }, []);

  const playheadX = TRACK.x1 + (TRACK.x2 - TRACK.x1) * Math.min(1, progress);
  const ss = Math.floor(time % 60).toString().padStart(2, "0");

  return (
    <g>
      <foreignObject x={CARD.x} y={CARD.y} width={CARD.w} height={CARD.h}>
        <video
          ref={videoRef}
          src="/site/videoscreenshot.mp4"
          poster="/site/videoscreenshot.png"
          autoPlay
          muted
          loop
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 7, display: "block" }}
        />
      </foreignObject>

      {/* scrubber */}
      <line x1={TRACK.x1} y1={TRACK.y} x2={TRACK.x2} y2={TRACK.y} stroke="#fff" strokeOpacity="0.5" strokeWidth="2.6" strokeLinecap="round" />
      <line x1={TRACK.x1} y1={TRACK.y} x2={playheadX} y2={TRACK.y} stroke="#fff" strokeOpacity="0.95" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx={playheadX} cy={TRACK.y} r="3.5" fill="#fff" />
      <text x={TRACK.x2} y={TRACK.y - 7} fontSize="6.6" textAnchor="end" fill="#fff" fillOpacity="0.9">{`0:${ss}`}</text>

      {/* shutter flash */}
      <rect x={CARD.x} y={CARD.y} width={CARD.w} height={CARD.h} rx="7" fill="#fff" style={{ opacity: flash ? 0.9 : 0, transition: "opacity 120ms ease-out" }} />

      {/* captured still pops out */}
      <g style={{ opacity: captured ? 1 : 0, transition: "opacity 260ms ease-out" }}>
        <foreignObject x={STILL.x} y={STILL.y} width={STILL.w} height={STILL.h}>
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 7,
              border: "1px solid rgba(0,0,0,0.12)",
              backgroundImage: "url(/site/videoscreenshot.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </foreignObject>
        <circle cx={STILL.x + 10} cy={STILL.y + 10} r="7" fill={INK} />
        <path d={`M${STILL.x + 7} ${STILL.y + 10} l2.2 2.2 l4.3 -4.6`} fill="none" stroke={CANVAS} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
  );
}
