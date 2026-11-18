import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/shared/section-heading";
import { SourceBadge } from "@/components/shared/source-badge";
import { floorActivity, hansard } from "@/data/record/hansard";

/** Hansard topics (summaries, not quotes, until certified text is pulled) + floor activity with method. */
export async function HansardHighlights() {
  const t = await getTranslations("record");
  const items = [...hansard].sort((a, b) => b.date.localeCompare(a.date));
  const floor = [
    ["contributions", floorActivity.hansardContributions],
    ["motions", floorActivity.motionsMoved],
    ["papers", floorActivity.papersLaid],
    ["divisions", `${floorActivity.divisionsVoted}/${floorActivity.divisionsRecorded}`],
  ] as const;
  return (
    <section id="hansard" className="scroll-mt-32 bg-onyx-900 py-10">
      <div className="shell grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <SectionHeading kicker={t("hansardKicker")} title={t("hansard.title")} filled={2} />
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {items.map((h) => (
              <li key={`${h.date}-${h.topicKey}`} className="rounded-2xl bg-white p-4" data-reveal>
                <p className="font-mono text-xs text-black/70">{h.date}</p>
                <p className="mt-1 text-base leading-snug">{t(`hansard.${h.topicKey}`)}</p>
                <p className="mt-2 text-xs italic text-black/70">{t("hansard.quotePending")}</p>
                <SourceBadge ids={[h.sourceId]} className="mt-3" />
              </li>
            ))}
          </ul>
        </div>
        <aside className="h-fit rounded-2xl border-2 border-black bg-white p-6" data-reveal>
          <h3 className="font-display text-xl font-bold">{t("floor.title")}</h3>
          <dl className="mt-4 grid grid-cols-2 gap-4">
            {floor.map(([k, v]) => (
              <div key={k}><dt className="text-xs text-black/70">{t(`floor.${k}`)}</dt><dd className="font-display text-3xl font-extrabold">{v}</dd></div>
            ))}
          </dl>
          <p className="mt-4 text-sm text-black/75">{t("floor.method")}</p>
          <SourceBadge ids={[floorActivity.sourceId]} className="mt-3" />
        </aside>
      </div>
    </section>
  );
}
