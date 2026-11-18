"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { kerichoConstituencies, LOCATOR_VIEWBOX, WARD_VIEWBOX, wardShapes } from "@/data/wards/geometry";
import { cn } from "@/lib/utils";
import { WardPanel, type WardView } from "./ward-panel";

/** Real IEBC ward boundaries, tap/keyboard selectable, with a county locator inset. */
export function WardMap({ wards }: { wards: WardView[] }) {
  const t = useTranslations("wards");
  const [active, setActive] = useState(wards[0]!.slug);
  const current = wards.find((w) => w.slug === active)!;
  const choose = (slug: string) => {
    setActive(slug);
    if (matchMedia("(max-width: 1023px)").matches) {
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      requestAnimationFrame(() => document.getElementById("ward-panel")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }));
    }
  };
  return (
    <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
      <figure className="relative rounded-3xl bg-onyx-900 p-2 sm:p-4">
        <svg viewBox={WARD_VIEWBOX} className="h-auto w-full" role="group" aria-label={t("select")}>
          {wardShapes.map((s) => {
            const w = wards.find((x) => x.slug === s.slug)!;
            return (
              <path
                key={s.slug}
                d={s.d}
                role="button"
                tabIndex={0}
                aria-pressed={s.slug === active}
                aria-label={t("open", { name: w.name })}
                onClick={() => choose(s.slug)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(s.slug); } }}
                fill={w.color}
                stroke="#FFFFFF"
                strokeWidth={2}
                strokeLinejoin="round"
                className="cursor-pointer outline-none focus-visible:[stroke:#000000] focus-visible:[stroke-width:4]"
              />
            );
          })}
          {wardShapes.filter((s) => s.slug === active).map((s) => (
            <path key="active" d={s.d} fill="none" stroke="#FFC700" strokeWidth={5} strokeLinejoin="round" className="pointer-events-none" />
          ))}
          {wardShapes.map((s) => {
            const w = wards.find((x) => x.slug === s.slug)!;
            const dark = s.slug !== "kipkelion";
            return (
              <g key={`l-${s.slug}`} className="pointer-events-none" textAnchor="middle">
                <text x={s.cx} y={s.cy} className="font-display text-[28px] font-bold" fill={dark ? "#FFFFFF" : "#000000"} stroke={dark ? "#000000" : "#FFFFFF"} strokeWidth={4} strokeLinejoin="round" paintOrder="stroke">{w.name}</text>
                <text x={s.cx} y={s.cy + 24} className="font-mono text-[18px]" fill={dark ? "#FFFFFF" : "#000000"} stroke={dark ? "#000000" : "#FFFFFF"} strokeWidth={3} paintOrder="stroke">{w.registered}</text>
              </g>
            );
          })}
        </svg>
        <div className="absolute right-3 top-3 w-20 rounded-xl border border-black/10 bg-white p-1 sm:w-28" aria-label={t("locator")} role="img">
          <svg viewBox={LOCATOR_VIEWBOX} className="h-auto w-full" aria-hidden>
            {kerichoConstituencies.map((c) => (
              <path key={c.slug} d={c.d} fill={c.slug === "kipkelion-west" ? "#008000" : "#E2E2DF"} stroke="#FFFFFF" strokeWidth={2} />
            ))}
          </svg>
          <p className="text-center font-mono text-[9px] leading-tight text-black/70">Kericho</p>
        </div>
        <figcaption className="mt-2 px-2 font-mono text-xs text-black/70">{t("schematic")}</figcaption>
      </figure>
      <div className="grid content-start gap-3">
        <ul className="grid grid-cols-2 gap-2">
          {wards.map((w) => (
            <li key={w.slug}>
              <button type="button" onClick={() => choose(w.slug)} aria-pressed={w.slug === active} className={cn("flex min-h-14 w-full items-center gap-2 rounded-xl border-2 px-3 text-left", w.slug === active ? "border-black bg-black text-white" : "border-black/15 hover:border-black")}>
                <span className="size-3.5 shrink-0 rounded-full border border-white" style={{ backgroundColor: w.color }} />
                <span className="leading-tight"><span className="block font-semibold">{w.name}</span><span className="font-mono text-xs opacity-80">{w.registered} · {w.share}</span></span>
              </button>
            </li>
          ))}
        </ul>
        <WardPanel ward={current} />
      </div>
    </div>
  );
}
