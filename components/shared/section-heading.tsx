import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { HatTrick } from "./hat-trick";

/** Kicker (with hat-trick marker) + headline + optional lede. `as` keeps heading order correct per page. */
export function SectionHeading({ kicker, title, lede, as: Tag = "h2", filled, tone = "day", className }: { kicker: string; title: ReactNode; lede?: ReactNode; as?: "h1" | "h2" | "h3"; filled?: number; tone?: "day" | "night"; className?: string }) {
  return (
    <div className={cn("max-w-3xl", className)} data-reveal>
      <p className="kicker flex items-center gap-3">
        {filled !== undefined && <HatTrick filled={filled} tone={tone} label="" />}
        {kicker}
      </p>
      <Tag className={cn("mt-3", Tag === "h1" ? "display-lg" : "display-md")}>{title}</Tag>
      {lede && <p className={cn("lede mt-4 max-w-2xl", tone === "night" ? "text-white/85" : "text-black/75")}>{lede}</p>}
    </div>
  );
}
