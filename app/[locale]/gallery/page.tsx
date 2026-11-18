import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { SectionHeading } from "@/components/shared/section-heading";
import { landscapes, photos, portraits } from "@/data/photos";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "gallery.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function GalleryPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("gallery");
  return (
    <div className="shell py-10">
      <SectionHeading as="h1" kicker={t("hero.kicker")} title={t("hero.title")} lede={t("hero.body")} filled={2} />
      <div className="mt-6"><GalleryGrid photos={[...portraits, ...landscapes]} /></div>
      <p className="mt-4 text-sm text-black/70">{t("landNote")}</p>
      
    </div>
  );
}
