import { getTranslations } from "next-intl/server";
import { SourceBadge } from "@/components/shared/source-badge";
import { journey } from "@/data/journey";
import { rich } from "@/lib/rich";

/** Education → KEBS → Parliament as a compact grid of milestone cards. */
export async function JourneyPath() {
  const t = await getTranslations("journey");
  return (
    <section className="shell py-10">
      <ol className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        {journey.map((s) => (
          <li key={s.key} className={`flex flex-col gap-1.5 rounded-2xl p-4 ${s.key.startsWith("mp") ? "night" : "border border-black/10"}`} data-reveal>
            <p className={`font-mono text-xs ${s.key.startsWith("mp") ? "text-uda-500" : "text-black/70"}`}>{s.from}–{s.to ?? t("present")}</p>
            <h2 className="font-display text-lg font-bold leading-tight sm:text-xl">{t(`steps.${s.key}.title`)}</h2>
            <p className={`text-[15px] leading-snug ${s.key.startsWith("mp") ? "text-white/85" : "text-black/75"}`}>{t(`steps.${s.key}.body`)}</p>
            <SourceBadge ids={s.sourceIds} tone={s.key.startsWith("mp") ? "night" : "day"} className="mt-auto pt-2" />
          </li>
        ))}
      </ol>
      <p className="mt-4 rounded-xl border border-dashed border-black/30 p-3 text-sm">{rich(t("gap"))}</p>
    </section>
  );
}
