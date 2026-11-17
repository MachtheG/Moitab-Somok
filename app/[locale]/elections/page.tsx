import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ElectionHistory } from "@/components/elections/election-history";
import { KeyDates } from "@/components/elections/key-dates";
import { SplitFlap } from "@/components/shared/split-flap";
import { SourceBadge } from "@/components/shared/source-badge";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "elections.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function ElectionsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("elections");
  return (
    <>
      <section className="shell py-14">
        <p className="kicker">{t("hero.kicker")}</p>
        <h1 className="display-xl mt-3">{t("hero.title")}</h1>
        <div className="mt-10"><SplitFlap /></div>
        <p className="mt-4 text-sm text-black/75">{t("dateNote")}</p>
        <SourceBadge ids={["iebc-election-date"]} className="mt-2" />
      </section>
      <KeyDates />
      <ElectionHistory />
    </>
  );
}
