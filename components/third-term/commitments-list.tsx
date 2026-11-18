import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/shared/section-heading";
import { SourceBadge } from "@/components/shared/source-badge";
import { commitments } from "@/data/third-term/commitments";
import type { SourceId } from "@/data/sources";

export async function CommitmentsList() {
  const t = await getTranslations("third-term.commitments");
  return (
    <section className="relative z-10 bg-onyx-900 py-12">
      <div className="shell">
        <SectionHeading kicker={t("kicker")} title={t("title")} filled={3} />
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {commitments.map((c) => (
            <li key={c.key} className="flex flex-col gap-2 rounded-2xl border-2 border-black/10 bg-white p-4 sm:p-5" data-reveal>
              <h3 className="font-display text-xl font-bold">{t(`${c.key}.title`)}</h3>
              <p className="text-black/75">{t(`${c.key}.body`)}</p>
              <SourceBadge ids={c.basis as readonly SourceId[]} className="mt-auto pt-2" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
