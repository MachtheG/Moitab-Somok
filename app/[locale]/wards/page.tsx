import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SectionHeading } from "@/components/shared/section-heading";
import { SourceBadge } from "@/components/shared/source-badge";
import { WardMap } from "@/components/wards/ward-map";
import { wardViews } from "@/lib/wards";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "wards.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function WardsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("wards");
  return (
    <section className="shell py-10">
      <SectionHeading as="h1" kicker={t("hero.kicker")} title={t("hero.title")} lede={t("hero.body")} filled={2} />
      <div className="mt-6"><WardMap wards={wardViews(t, locale)} /></div>
      <SourceBadge ids={["mzalendo-constituency", "hdx-ward-boundaries"]} className="mt-6" />
      <p className="mt-3 text-sm text-black/70">{t("projectsPending")}</p>
    </section>
  );
}
