import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { JourneyPath } from "@/components/journey/journey-path";
import { PhotoSlot } from "@/components/shared/photo-slot";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "journey.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function JourneyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("journey");
  const c = await getTranslations("common.photo");
  return (
    <>
      <section className="night">
        <div className="shell grid items-end gap-8 py-14 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="kicker">{t("hero.kicker")}</p>
            <h1 className="display-lg mt-3">{t("hero.title")}</h1>
          </div>
          <PhotoSlot slot="journey-portrait" label={c("slot", { slot: "journey-portrait" })} alt={c("placeholderAlt")} className="aspect-[4/5] rounded-3xl" sizes="(min-width: 768px) 33vw, 100vw" />
        </div>
      </section>
      <JourneyPath />
    </>
  );
}
