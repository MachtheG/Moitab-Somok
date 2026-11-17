import { getLocale, getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/shared/section-heading";
import { SourceBadge } from "@/components/shared/source-badge";
import { sectorTotals, TERM_YEARS, termTotals } from "@/data/record/ngcdf-derived";
import { Link } from "@/i18n/navigation";
import { formatKshM } from "@/lib/format";

const RAMP = ["#4D3D00", "#7A6100", "#A07E00", "#C29A00", "#D4B054"];
const ROW = 52; // min row height (≥ 44px tap target)
const GAP = 6;

/**
 * "Where the money went": total → sectors, as a Sankey-style flow.
 * Each sector row is a link that filters the project explorer. Ward layer waits
 * for school→ward data (DECISIONS D-007).
 */
export async function SectorFlow() {
  const t = await getTranslations("record");
  const locale = await getLocale();
  const rows = sectorTotals(TERM_YEARS);
  const total = termTotals.total;
  const H = rows.length * (ROW + GAP);
  let leftY = 0;
  let rowY = 0;
  const bands = rows.map((r, i) => {
    const thick = Math.max(2, (r.amount / total) * H);
    const y0 = leftY + thick / 2;
    const y1 = rowY + ROW / 2;
    leftY += thick;
    rowY += ROW + GAP;
    return { ...r, thick, y0, y1, color: RAMP[Math.min(i, RAMP.length - 1)]! };
  });
  return (
    <section className="shell scroll-mt-32 py-14" id="flow">
      <SectionHeading kicker={t("sankey.kicker")} title={t("sankey.title")} lede={t("sankey.body")} filled={2} />
      <div className="mt-8 grid grid-cols-[minmax(4.5rem,22%)_1fr] gap-0">
        <div className="relative">
          <div className="night absolute inset-y-0 left-0 w-3 rounded-full" aria-hidden />
          <svg viewBox={`0 0 100 ${H}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
            {bands.map((b) => (
              <path key={b.sector} d={`M3 ${b.y0} C55 ${b.y0} 45 ${b.y1} 100 ${b.y1}`} fill="none" stroke={b.color} strokeOpacity="0.85" strokeWidth={b.thick} vectorEffect="non-scaling-stroke" />
            ))}
          </svg>
          <p className="sr-only">{t("sankey.total")}: {formatKshM(total, locale)}</p>
        </div>
        <ul style={{ height: H }} className="flex flex-col">
          {bands.map((b) => (
            <li key={b.sector} style={{ height: ROW, marginBottom: GAP }}>
              <Link href={`/record?sector=${b.sector}#projects`} className="flex h-full items-center justify-between gap-3 rounded-r-xl border-l-[6px] bg-onyx-900 px-3 hover:bg-uda-50" style={{ borderLeftColor: b.color }}>
                <span className="text-sm font-semibold leading-tight sm:text-base">{t(`sectors.${b.sector}`)}</span>
                <span className="shrink-0 font-mono text-xs sm:text-sm">{formatKshM(b.amount, locale)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm">
        <p><strong>{t("sankey.total")}:</strong> {formatKshM(total, locale)} · {t("sankey.years")}</p>
        <SourceBadge ids={TERM_YEARS.map((y) => `ngcdf-${y.replace("/", "-")}` as "ngcdf-2020-21")} />
      </div>
      <p className="mt-3 text-sm text-black/70">{t("sankey.wardsPending")}</p>
    </section>
  );
}
