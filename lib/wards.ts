import { register } from "@/data/election";
import { ngcdfProjects } from "@/data/record/ngcdf-projects";
import { wards } from "@/data/wards";
import { formatInt, formatPct } from "./format";

type T = (key: string, values?: Record<string, string | number>) => string;

/** Server-side view model for wards (formatted, translated). */
export function wardViews(t: T, locale: string) {
  return wards.map((w) => ({
    slug: w.slug,
    name: t(`${w.slug}.name`),
    color: w.color,
    registered: formatInt(w.registered2022, locale),
    share: formatPct((w.registered2022 / register[2022]) * 100, locale),
    entries: ngcdfProjects.filter((p) => p.ward === w.slug).length,
    intro: t(`${w.slug}.intro`),
  }));
}
