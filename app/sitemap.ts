import type { MetadataRoute } from "next";
import { wards } from "@/data/wards";
import { tabs } from "@/lib/nav";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...tabs.map((t) => t.href), ...wards.map((w) => `/wards/${w.slug}`)];
  return paths.map((p) => ({
    url: `${SITE_URL}${p === "/" ? "" : p}`,
    changeFrequency: "weekly",
    priority: p === "/" ? 1 : 0.7,
    alternates: { languages: { en: `${SITE_URL}${p === "/" ? "" : p}`, sw: `${SITE_URL}/sw${p === "/" ? "" : p}` } },
  }));
}
