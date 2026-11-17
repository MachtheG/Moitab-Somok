import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/shared/section-heading";

const KEYS = ["experience", "continuity", "accountable"] as const;

export async function WhyThirdTerm() {
  const t = await getTranslations("third-term.why");
  return (
    <section className="relative z-10 bg-white py-20">
      <div className="shell">
        <SectionHeading kicker="01 · 02 · 03" title={t("title")} filled={3} />
        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {KEYS.map((k, i) => (
            <li key={k} className="rounded-2xl border border-black/10 p-6" data-reveal>
              <span className="font-display text-6xl font-extrabold text-uda-800">{i + 1}</span>
              <h3 className="mt-4 font-display text-2xl font-bold">{t(`${k}.title`)}</h3>
              <p className="mt-2 text-black/75">{t(`${k}.body`)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
