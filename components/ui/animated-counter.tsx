"use client";

import { useEffect, useRef } from "react";
import { animate as animateValue, useInView, useMotionValue } from "motion/react";

function format(value: number, decimals: number) {
  return value.toLocaleString("en-KE", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * A number that counts up from 0 when scrolled into view. The final value is
 * server-rendered, so it is correct with no JS, under reduced motion, and with
 * `animate={false}` (Lite mode, static share cards, screenshots).
 */
export function AnimatedCounter({
  value,
  decimals = 0,
  animate = true,
  className,
}: {
  value: number;
  decimals?: number;
  /** Set false to always show the final value (Lite mode, static renders). */
  animate?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!animate || !isInView) return;
    // Respect users who prefer reduced motion — leave the SSR value in place.
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    const controls = animateValue(motionValue, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        if (ref.current) ref.current.textContent = format(latest, decimals);
      },
    });
    return () => controls.stop();
  }, [animate, isInView, motionValue, value, decimals]);

  // The real, formatted value is rendered server-side and stays visible until
  // (and unless) JavaScript animates it — so slow/3G loads never show zero.
  return (
    <span ref={ref} className={className} suppressHydrationWarning>
      {format(value, decimals)}
    </span>
  );
}
