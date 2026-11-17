import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { ShotSlots } from "@/components/gallery/shot-slots";
import { SectionHeading } from "@/components/shared/section-heading";
import { photos } from "@/data/photos";

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
    <div className="shell py-14">
      <SectionHeading as="h1" kicker={t("hero.kicker")} title={t("hero.title")} lede={t("hero.body")} filled={2} />
      <div className="mt-10"><GalleryGrid photos={photos} /></div>
      {photos.length < 12 && <ShotSlots />}
    </div>
  );
}
