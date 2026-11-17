import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

export default function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("home.hero");
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <p className="kicker">{t("kicker")}</p>
      <h1 className="mt-3 font-display text-6xl font-extrabold sm:text-8xl">{t("headline")}</h1>
      <p className="mt-6 max-w-xl text-lg">{t("subhead")}</p>
    </section>
  );
}
