import type { Stat } from "@/data/record/stats";

const tag = (locale: string) => (locale === "sw" ? "sw-KE" : "en-KE");

export function formatInt(n: number, locale: string) {
  return new Intl.NumberFormat(tag(locale), { maximumFractionDigits: 0 }).format(n);
}

/** KSh with thousands separators: "KSh 138,215,033". */
export function formatKsh(n: number, locale: string) {
  return `KSh ${formatInt(Math.round(n), locale)}`;
}

/** KSh millions to one decimal: "KSh 658.3M" / "KSh milioni 658.3". */
export function formatKshM(n: number, locale: string) {
  const m = new Intl.NumberFormat(tag(locale), { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(n / 1e6);
  return locale === "sw" ? `KSh milioni ${m}` : `KSh ${m}M`;
}

export function formatPct(n: number, locale: string) {
  return `${new Intl.NumberFormat(tag(locale), { maximumFractionDigits: 1, minimumFractionDigits: 1 }).format(n)}%`;
}

/** Display parts for a Stat: the big figure plus an optional unit for typographic treatment. */
export function formatStat(s: Stat, locale: string): { value: string; numeric: number; decimals: number; prefix?: string; suffix?: string } {
  switch (s.format) {
    case "int":
      return { value: formatInt(s.value, locale), numeric: s.value, decimals: 0 };
    case "pct":
      return { value: formatPct(s.value, locale), numeric: Math.round(s.value * 10) / 10, decimals: 1, suffix: "%" };
    case "ksh":
      return { value: formatKsh(s.value, locale), numeric: s.value, decimals: 0, prefix: "KSh " };
    case "kshM":
      return { value: formatKshM(s.value, locale), numeric: Math.round(s.value / 1e5) / 10, decimals: 1, prefix: "KSh ", suffix: locale === "sw" ? "M" : "M" };
    case "fraction":
      return { value: `${s.value}/${s.of}`, numeric: s.value, decimals: 0, suffix: `/${s.of}` };
  }
}
