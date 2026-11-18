import { getLocale, getTranslations } from "next-intl/server";
import { SourceBadge } from "@/components/shared/source-badge";
import { constituencyHistory, register } from "@/data/election";
import { formatInt, formatPct } from "@/lib/format";

export async function ElectionHistory() {
  const t = await getTranslations("elections");
  const locale = await getLocale();
  const growth = formatPct((register[2022] / register[2017] - 1) * 100, locale);
  return (
    <section className="shell grid gap-10 py-10 md:grid-cols-2">
      <div>
        <h2 className="display-md">{t("history.title")}</h2>
        <p className="mt-3 text-black/75">{t("history.created")}</p>
        <ol className="mt-6 space-y-3">
          {constituencyHistory.mps.map((m) => (
            <li key={m.year} className="flex items-center gap-3 text-lg" data-reveal>
              <span className={`size-4 rounded-full border-2 border-black ${m.name.includes("Kosgei") ? "bg-uda-500" : "bg-white"}`} aria-hidden />
              {t("history.mp", { year: m.year, name: m.name, party: m.party })}
            </li>
          ))}
        </ol>
        <SourceBadge ids={["wikipedia-constituency", "mzalendo-constituency"]} className="mt-4" />
      </div>
      <div>
        <h2 className="display-md">{t("register.title")}</h2>
        <dl className="mt-6 grid grid-cols-2 gap-4">
          <div><dt className="font-mono text-sm">{t("register.y2017")}</dt><dd className="font-display text-4xl font-extrabold">{formatInt(register[2017], locale)}</dd></div>
          <div><dt className="font-mono text-sm">{t("register.y2022")}</dt><dd className="font-display text-4xl font-extrabold">{formatInt(register[2022], locale)}</dd></div>
        </dl>
        <p className="mt-3 font-semibold text-forest-700">{t("register.growth", { pct: growth })}</p>
        <SourceBadge ids={[register.sourceId]} className="mt-4" />
      </div>
    </section>
  );
}
