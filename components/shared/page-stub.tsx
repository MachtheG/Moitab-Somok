import { useTranslations } from "next-intl";

/** Phase 1 placeholder: title + intro from the tab's messages. Replaced per tab in Phases 4–7. */
export function PageStub({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <p className="kicker">{t("hero.kicker")}</p>
      <h1 className="mt-3 font-display text-4xl font-bold sm:text-6xl">{t("hero.title")}</h1>
    </section>
  );
}
