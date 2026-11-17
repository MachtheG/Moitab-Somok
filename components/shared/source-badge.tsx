import { getTranslations } from "next-intl/server";
import { getSource, type SourceId } from "@/data/sources";
import { cn } from "@/lib/utils";

/** Visible source chip. One link per source; unconfirmed facts get a "To confirm" chip instead. */
export async function SourceBadge({ ids, confirmed = true, tone = "day", className }: { ids: readonly SourceId[]; confirmed?: boolean; tone?: "day" | "night"; className?: string }) {
  const t = await getTranslations("common.source");
  const chip = tone === "night" ? "border-white/40 text-white hover:border-uda-500" : "border-black/25 text-black hover:border-black";
  return (
    <span className={cn("inline-flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-wider", className)}>
      {!confirmed && <span className="rounded-2xl bg-uda-100 px-2.5 py-1.5 font-semibold text-uda-900">{t("toConfirm")}</span>}
      {ids.map((id) => {
        const s = getSource(id);
        // NG-CDF code lists share an outlet: label them by financial year instead.
        const short = id.startsWith("ngcdf-") ? `NG-CDF FY${id.slice(6).replace("-", "/")}` : id.startsWith("parliament") ? "Parliament" : id.startsWith("mzalendo") ? "Mzalendo" : s.outlet.replace(/ \(.*\)$/, "");
        return (
          <a key={id} href={s.url} target="_blank" rel="noopener noreferrer" className={cn("inline-flex min-h-11 items-center rounded-2xl border px-3 py-1.5 leading-tight transition-colors", chip)} title={s.title} aria-label={t("viewSource", { outlet: s.outlet })}>
            {t("badge")}: {short}
          </a>
        );
      })}
    </span>
  );
}
