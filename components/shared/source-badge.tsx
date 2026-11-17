import { getTranslations } from "next-intl/server";
import { getSource, type SourceId } from "@/data/sources";
import { cn } from "@/lib/utils";

/** Visible source chip. One link per source; unconfirmed facts get a "To confirm" chip instead. */
export async function SourceBadge({ ids, confirmed = true, tone = "day", className }: { ids: readonly SourceId[]; confirmed?: boolean; tone?: "day" | "night"; className?: string }) {
  const t = await getTranslations("common.source");
  const chip = tone === "night" ? "border-white/40 text-white hover:border-uda-500" : "border-black/25 text-black hover:border-black";
  return (
    <span className={cn("inline-flex flex-wrap items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider", className)}>
      {!confirmed && <span className="rounded-full bg-uda-100 px-2 py-1 text-uda-900">{t("toConfirm")}</span>}
      {ids.map((id) => {
        const s = getSource(id);
        // NG-CDF code lists share an outlet: label them by financial year instead.
        const short = id.startsWith("ngcdf-") ? `NG-CDF FY${id.slice(6).replace("-", "/")}` : s.outlet.replace(/ \(.*\)$/, "");
        return (
          <a key={id} href={s.url} target="_blank" rel="noopener noreferrer" className={cn("inline-flex min-h-8 items-center rounded-full border px-2.5 transition-colors", chip)} title={s.title} aria-label={t("viewSource", { outlet: s.outlet })}>
            {t("badge")}: {short}
          </a>
        );
      })}
    </span>
  );
}
