import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/shared/section-heading";
import { SourceBadge } from "@/components/shared/source-badge";
import { timeline } from "@/data/record/timeline";

/** 2017 → today. Ordered by date; the 2017 and 2022 elections get the filled-dot treatment. */
export async function RecordTimeline() {
  const t = await getTranslations("record");
  const items = [...timeline].sort((a, b) => a.date.localeCompare(b.date));
  return (
    <section id="timeline" className="night relative scroll-mt-32 py-14">
      <div className="shell">
        <SectionHeading kicker={t("timelineKicker")} title={t("timeline.title")} tone="night" filled={2} />
        <ol className="relative mt-10 border-l-2 border-white/25 pl-6 sm:ml-4">
          {items.map((it) => {
            const big = it.key === "elected2017" || it.key === "reelected2022";
            return (
              <li key={it.key} className="relative pb-8 last:pb-0" data-reveal>
                <span className={`absolute -left-[33px] top-1 size-4 rounded-full border-2 border-uda-500 ${big ? "bg-uda-500" : "bg-forest-900"}`} aria-hidden />
                <p className="font-mono text-xs text-uda-500">{it.date}</p>
                <p className={big ? "mt-1 font-display text-2xl font-bold" : "mt-1 text-lg"}>{t(`timeline.${it.key}`)}</p>
                <SourceBadge ids={it.sourceIds} confirmed={it.confirmed} tone="night" className="mt-2" />
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
