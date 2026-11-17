import { cn } from "@/lib/utils";

/** Deterministic, abstract "hills" contour texture (not survey data). Pure SVG, ~3 KB. */
function paths(count: number, seed: number) {
  const out: string[] = [];
  for (let i = 0; i < count; i++) {
    const y0 = 40 + i * (520 / count);
    const a = 18 + ((i * 37 + seed) % 23);
    const f = 0.004 + (((i * 13 + seed) % 7) * 0.0009);
    const ph = (i * 1.7 + seed) % 6.28;
    let d = `M0 ${y0.toFixed(1)}`;
    for (let x = 20; x <= 1200; x += 20) {
      const y = y0 + Math.sin(x * f + ph) * a + Math.sin(x * f * 2.3 + ph * 2) * (a / 3);
      d += ` L${x} ${y.toFixed(1)}`;
    }
    out.push(d);
  }
  return out;
}

const CACHE = new Map<string, string[]>();

export function ContourLines({ tone = "night", count = 14, seed = 3, className }: { tone?: "night" | "day"; count?: number; seed?: number; className?: string }) {
  const key = `${count}-${seed}`;
  if (!CACHE.has(key)) CACHE.set(key, paths(count, seed));
  return (
    <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" aria-hidden className={cn("contour pointer-events-none absolute inset-0 h-full w-full", className)}>
      <g fill="none" strokeWidth="1" className={tone === "night" ? "stroke-uda-500/20" : "stroke-black/[0.07]"}>
        {CACHE.get(key)!.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    </svg>
  );
}
