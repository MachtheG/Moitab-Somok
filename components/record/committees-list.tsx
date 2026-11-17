import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/shared/section-heading";
import { SourceBadge } from "@/components/shared/source-badge";
import { committees } from "@/data/record/committees";

export async function CommitteesList() {
  const t = await getTranslations("record");
  return (
    <section id="committees" className="shell scroll-mt-32 py-14">
      <SectionHeading kicker={t("committeesKicker")} title={t("committees.title")} filled={2} />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {committees.map((c) => (
          <li key={c.key} className="flex flex-col gap-2 rounded-2xl border border-black/10 p-5" data-reveal>
            <p className="font-mono text-xs text-black/70">{t("committees.parliament", { n: c.parliament })} · {c.from}–{c.to ?? ""}</p>
            <h3 className="font-display text-xl font-bold">{t(`committees.${c.key}`)}</h3>
            <p className="text-sm">{t(`committees.${c.role}`)}</p>
            <SourceBadge ids={c.sourceIds} confirmed={c.confirmed} className="mt-auto pt-2" />
          </li>
        ))}
      </ul>
    </section>
  );
}
