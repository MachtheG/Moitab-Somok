import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/shared/section-heading";
import { StatCard } from "@/components/shared/stat-card";
import { stats } from "@/data/record/stats";

export async function StatsGrid() {
  const t = await getTranslations("record");
  return (
    <section className="shell py-14" aria-labelledby="stats-h">
      <SectionHeading kicker={t("statsKicker")} title={<span id="stats-h">{t("statsTitle")}</span>} filled={1} />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => <div key={s.id} id={s.id} className="scroll-mt-24"><StatCard stat={s} className="h-full" /></div>)}
      </div>
    </section>
  );
}
