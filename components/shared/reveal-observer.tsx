"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Opts the page into reveal-on-scroll. Content is visible without JS. */
export function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("reveal-ready");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }),
      { rootMargin: "0px 0px -10% 0px" },
    );
    document.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el, i) => {
      (el as HTMLElement).style.transitionDelay = `${Math.min(i % 3, 2) * 60}ms`;
      io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
