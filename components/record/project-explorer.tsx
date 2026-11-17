"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { formatKsh } from "@/lib/format";

export type ProjectRow = { id: string; fy: string; name: string; amount: number; sector: string };

const PAGE = 30;

/** Filterable list of every approved project line. Filters live in the URL (?fy=&sector=&q=). */
export function ProjectExplorer({ rows, years, sectors }: { rows: ProjectRow[]; years: string[]; sectors: string[] }) {
  const t = useTranslations("record");
  const locale = useLocale();
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [limit, setLimit] = useState(PAGE);
  const fy = params.get("fy") ?? "";
  const sector = params.get("sector") ?? "";
  const q = params.get("q") ?? "";

  const set = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value); else next.delete(key);
    setLimit(PAGE);
    router.replace(`${pathname}?${next.toString()}#projects`, { scroll: false });
  };

  const filtered = useMemo(
    () => rows.filter((r) => (!fy || r.fy === fy) && (!sector || r.sector === sector) && (!q || r.name.toLowerCase().includes(q.toLowerCase()))),
    [rows, fy, sector, q],
  );
  const sum = filtered.reduce((s, r) => s + r.amount, 0);
  const select = "min-h-11 rounded-lg border border-black/25 bg-white px-3 text-sm";

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="grid gap-1 text-sm font-semibold">{t("filters.year")}
          <select value={fy} onChange={(e) => set("fy", e.target.value)} className={select}>
            <option value="">{t("filters.all")}</option>
            {years.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </label>
        <label className="grid gap-1 text-sm font-semibold">{t("filters.sector")}
          <select value={sector} onChange={(e) => set("sector", e.target.value)} className={select}>
            <option value="">{t("filters.all")}</option>
            {sectors.map((s) => <option key={s} value={s}>{t(`sectors.${s}`)}</option>)}
          </select>
        </label>
        <label className="grid gap-1 text-sm font-semibold">{t("explorer.search")}
          <input type="search" defaultValue={q} onChange={(e) => set("q", e.target.value)} className={select} />
        </label>
      </div>
      <p className="mt-4 font-mono text-sm" aria-live="polite">{t("filters.results", { count: filtered.length, amount: formatKsh(sum, locale) })}</p>
      {filtered.length === 0 ? (
        <p className="mt-6">{t("explorer.noResults")} <button type="button" className="underline" onClick={() => router.replace(pathname)}>{t("explorer.clear")}</button></p>
      ) : (
        <ul className="mt-4 divide-y divide-black/10 border-y border-black/10">
          {filtered.slice(0, limit).map((r) => (
            <li key={r.id}>
              <Link href={`/record/${r.id}`} className="grid min-h-14 grid-cols-[1fr_auto] items-center gap-3 py-2 hover:bg-onyx-900">
                <span>
                  <span className="block font-semibold leading-snug">{r.name}</span>
                  <span className="font-mono text-xs text-black/70">{r.fy} · {t(`sectors.${r.sector}`)}</span>
                </span>
                <span className="font-mono text-sm">{formatKsh(r.amount, locale)}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {filtered.length > limit && (
        <button type="button" onClick={() => setLimit((l) => l + PAGE)} className="tap mt-4 rounded-full border border-black px-5 font-semibold">{t("explorer.showMore")}</button>
      )}
    </div>
  );
}
