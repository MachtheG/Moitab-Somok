import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SectionHeading } from "@/components/shared/section-heading";
import { rich } from "@/lib/rich";

type Props = { params: Promise<{ locale: string }> };
const SECTIONS = ["who", "what", "why", "keep", "rights", "contact"] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");
  return (
    <article className="shell max-w-3xl py-10">
      <SectionHeading as="h1" kicker={t("hero.kicker")} title={t("hero.title")} />
      <div className="mt-6 space-y-8">
        {SECTIONS.map((s) => (
          <section key={s}>
            <h2 className="font-display text-2xl font-bold">{t(`sections.${s}.title`)}</h2>
            <p className="mt-2 text-lg leading-relaxed">{rich(t(`sections.${s}.body`))}</p>
          </section>
        ))}
      </div>
      <p className="mt-6 font-mono text-sm text-black/70">{t("updated", { date: "2026-11-17" })}</p>
    </article>
  );
}
