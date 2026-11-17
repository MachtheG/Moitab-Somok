"use client";

import { useEffect, useRef, useState } from "react";

/** A half tile: clips a full-height glyph to the top or bottom half. */
function Half({ char, side, className = "" }: { char: string; side: "top" | "bottom"; className?: string }) {
  return (
    <span className={`absolute inset-x-0 h-1/2 overflow-hidden bg-black ${side === "top" ? "top-0 rounded-t-[6px]" : "bottom-0 rounded-b-[6px]"} ${className}`}>
      <span className={`absolute inset-x-0 flex h-[200%] items-center justify-center ${side === "top" ? "top-0" : "-top-full"}`}>{char}</span>
    </span>
  );
}

/**
 * One split-flap tile. On change, the old top half folds down over 260 ms
 * (transform only). Reduced motion / Lite mode: instant swap.
 */
export function FlapDigit({ char, onFlip }: { char: string; onFlip?: () => void }) {
  const [shown, setShown] = useState(char);
  const [prev, setPrev] = useState<string | null>(null);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) { mounted.current = true; setShown(char); return; }
    if (char === shown) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.classList.contains("lite");
    setPrev(still ? null : shown);
    setShown(char);
    if (still) return;
    onFlip?.();
    const id = setTimeout(() => setPrev(null), 280);
    return () => clearTimeout(id);
  }, [char]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span className="relative inline-block h-[1.35em] w-[0.8em] font-mono font-bold text-white [perspective:300px]" aria-hidden>
      <Half char={shown} side="top" />
      {/* New bottom half waits under the falling flap. */}
      <Half char={shown} side="bottom" />
      {prev && <Half char={prev} side="top" className="z-10 origin-bottom animate-flap" />}
      <span className="absolute inset-x-0 top-1/2 z-20 h-px bg-white/25" />
    </span>
  );
}
