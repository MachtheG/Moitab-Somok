import { register } from "@/data/election";
import { ngcdfProjects } from "@/data/record/ngcdf-projects";
import { photoForSlot, type PhotoSlot } from "@/data/photos";
import { wardShapes } from "@/data/wards/geometry";
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
    code: wardShapes.find((s) => s.slug === w.slug)?.code ?? "",
    photo: (() => {
      const p = photoForSlot(`ward-${w.slug}` as PhotoSlot);
      return p?.license ? { src: p.src, credit: p.credit, source: p.license.source } : null;
    })(),
  }));
}
