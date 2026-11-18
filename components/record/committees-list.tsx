import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/shared/section-heading";
import { SourceBadge } from "@/components/shared/source-badge";
import { committees } from "@/data/record/committees";

export async function CommitteesList() {
  const t = await getTranslations("record");
  return (
    <section id="committees" className="shell scroll-mt-32 py-10">
      <SectionHeading kicker={t("committeesKicker")} title={t("committees.title")} filled={2} />
      <ul className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {committees.map((c) => (
          <li key={c.key} className="flex flex-col gap-1.5 rounded-2xl border border-black/10 p-3.5 sm:p-5" data-reveal>
            <p className="font-mono text-xs text-black/70">{t("committees.parliament", { n: c.parliament })} · {c.from}–{c.to ?? ""}</p>
            <h3 className="font-display text-lg font-bold leading-tight sm:text-xl">{t(`committees.${c.key}`)}</h3>
            <p className="text-sm">{t(`committees.${c.role}`)}</p>
            <SourceBadge ids={c.sourceIds} confirmed={c.confirmed} className="mt-auto pt-2" />
          </li>
        ))}
      </ul>
    </section>
  );
}
