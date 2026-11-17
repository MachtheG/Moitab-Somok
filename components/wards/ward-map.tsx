"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { WardPanel, type WardView } from "./ward-panel";

/** Abstract shapes, arranged roughly; this is a schematic, not survey geometry. */
const SHAPES: Record<string, { d: string; lx: number; ly: number }> = {
  chilchila: { d: "M40 60 L210 30 L250 150 L180 230 L60 210 Z", lx: 145, ly: 135 },
  kipkelion: { d: "M210 30 L380 50 L400 170 L290 210 L250 150 Z", lx: 315, ly: 120 },
  kamasian: { d: "M60 210 L180 230 L200 360 L70 380 L30 300 Z", lx: 118, ly: 300 },
  kunyak: { d: "M180 230 L250 150 L290 210 L400 170 L410 330 L300 380 L200 360 Z", lx: 300, ly: 280 },
};

export function WardMap({ wards }: { wards: WardView[] }) {
  const t = useTranslations("wards");
  const [active, setActive] = useState(wards[0]!.slug);
  const current = wards.find((w) => w.slug === active)!;
  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
      <figure>
        <svg viewBox="0 0 440 410" className="h-auto w-full" role="group" aria-label={t("select")}>
          {wards.map((w) => {
            const s = SHAPES[w.slug]!;
            const on = w.slug === active;
            return (
              <g key={w.slug}>
                <path
                  d={s.d}
                  role="button"
                  tabIndex={0}
                  aria-pressed={on}
                  aria-label={t("open", { name: w.name })}
                  onClick={() => setActive(w.slug)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive(w.slug); } }}
                  fill={w.color}
                  stroke="#000000"
                  strokeWidth={on ? 5 : 2}
                  strokeLinejoin="round"
                  className="cursor-pointer outline-none focus-visible:[stroke-width:6]"
                />
                <text x={s.lx} y={s.ly} textAnchor="middle" className="pointer-events-none font-display text-[17px] font-bold" fill={w.slug === "kipkelion" ? "#000000" : "#FFFFFF"} stroke={w.slug === "kipkelion" ? "none" : "#000000"} strokeWidth="0.6">{w.name}</text>
              </g>
            );
          })}
        </svg>
        <figcaption className="mt-2 font-mono text-xs text-black/70">{t("schematic")}</figcaption>
        <div className="mt-4 flex flex-wrap gap-2 lg:hidden">
          {wards.map((w) => (
            <button key={w.slug} type="button" onClick={() => setActive(w.slug)} aria-pressed={w.slug === active} className={cn("tap rounded-full border px-4 text-sm font-semibold", w.slug === active ? "border-black bg-black text-white" : "border-black/25")}>{w.name}</button>
          ))}
        </div>
      </figure>
      <WardPanel ward={current} />
    </div>
  );
}
