import { getTranslations } from "next-intl/server";
import { SourceBadge } from "@/components/shared/source-badge";
import { journey } from "@/data/journey";
import { rich } from "@/lib/rich";

/** Education → KEBS → Parliament, as a winding path with the documented gap shown honestly. */
export async function JourneyPath() {
  const t = await getTranslations("journey");
  return (
    <section className="shell max-w-4xl py-14">
      <ol className="relative">
        {journey.map((s, i) => (
          <li key={s.key} className="relative grid grid-cols-[4.5rem_1fr] gap-4 pb-10 sm:grid-cols-[7rem_1fr]" data-reveal>
            <div className="text-right">
              <p className="font-display text-2xl font-extrabold sm:text-3xl">{s.from}</p>
              <p className="font-mono text-xs text-black/70">{s.to ?? t("present")}</p>
            </div>
            <div className="border-l-2 border-black/15 pl-5">
              <span className={`-ml-[29px] mb-2 block size-4 rounded-full border-2 border-black ${s.key.startsWith("mp") ? "bg-uda-500" : "bg-white"}`} aria-hidden />
              <h2 className="font-display text-2xl font-bold">{t(`steps.${s.key}.title`)}</h2>
              <p className="mt-1 text-black/75">{t(`steps.${s.key}.body`)}</p>
              <SourceBadge ids={s.sourceIds} className="mt-3" />
              {i === 2 && <p className="mt-6 rounded-xl border border-dashed border-black/30 p-4 text-sm">{rich(t("gap"))}</p>}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
