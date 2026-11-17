import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/shared/section-heading";
import { StatCard } from "@/components/shared/stat-card";
import { stats } from "@/data/record/stats";
import { Link } from "@/i18n/navigation";

const HOME = ["votes2022", "ngcdfFourYears", "registerGrowth"];

/** Three-column stat band (horizontal snap carousel on phones). */
export async function StatBand() {
  const t = await getTranslations("home.stats");
  const picks = HOME.map((id) => stats.find((s) => s.id === id)!);
  return (
    <section className="bg-onyx-900 py-16 sm:py-24">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading kicker={t("kicker")} title={t("title")} />
          <Link href="/record" className="tap font-semibold underline underline-offset-4">{t("seeAll")}</Link>
        </div>
        <div className="no-scrollbar relative -mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
          {picks.map((s) => <StatCard key={s.id} stat={s} className="w-[82%] shrink-0 snap-center md:w-auto" />)}
        </div>
      </div>
    </section>
  );
}
