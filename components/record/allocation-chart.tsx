import { getLocale, getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/shared/section-heading";
import { SourceBadge } from "@/components/shared/source-badge";
import { ngcdfAllocations, ngcdfGaps } from "@/data/record/ngcdf-allocations";
import { formatKsh, formatKshM } from "@/lib/format";

/** Approved NG-CDF allocation by year: HTML bars (accessible, no chart lib). */
export async function AllocationChart() {
  const t = await getTranslations("record.allocations");
  const locale = await getLocale();
  const max = Math.max(...ngcdfAllocations.map((a) => a.amount));
  return (
    <section className="bg-onyx-900 py-14">
      <div className="shell">
        <SectionHeading kicker={t("kicker")} title={t("title")} lede={t("caption")} filled={2} />
        <ol className="mt-8 space-y-4" aria-label={t("title")}>
          {ngcdfAllocations.map((a, i) => (
            <li key={a.fy} className="grid grid-cols-[5.5rem_1fr] items-center gap-3" data-reveal>
              <span className="font-mono text-sm">{a.fy}</span>
              <div>
                <div className="h-10 rounded-r-lg border-2 border-black" style={{ width: `${(a.amount / max) * 100}%`, backgroundColor: i === ngcdfAllocations.length - 1 ? "#FFC700" : "#7A6100" }} />
                <p className="mt-1 font-mono text-sm"><strong className="font-display text-lg">{formatKshM(a.amount, locale)}</strong> · {formatKsh(a.amount, locale)}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-8 space-y-3">
          {ngcdfGaps.map((g) => (
            <p key={g.fy} className="rounded-xl border border-uda-700 bg-uda-50 p-4 text-sm">
              {t("gapNote", { fy: g.fy, codeList: formatKsh(g.codeList, locale), gap: formatKsh(g.approved - g.codeList, locale), approved: formatKsh(g.approved, locale) })}
            </p>
          ))}
        </div>
        <SourceBadge ids={["mzalendo-ngcdf", "ngcdf-2022-23", "ngcdf-2023-24"]} className="mt-6" />
      </div>
    </section>
  );
}
