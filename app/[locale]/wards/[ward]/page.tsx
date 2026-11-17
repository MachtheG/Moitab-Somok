import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { WardDetail } from "@/components/wards/ward-detail";
import { wards } from "@/data/wards";
import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string; ward: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => wards.map((w) => ({ locale, ward: w.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, ward } = await params;
  const t = await getTranslations({ locale, namespace: "wards" });
  if (!wards.some((w) => w.slug === ward)) return {};
  return { title: `${t(`${ward}.name`)} · ${t("meta.title")}` };
}

export default async function WardPage({ params }: Props) {
  const { locale, ward } = await params;
  setRequestLocale(locale);
  const w = wards.find((x) => x.slug === ward);
  if (!w) notFound();
  return <WardDetail slug={w.slug} />;
}
