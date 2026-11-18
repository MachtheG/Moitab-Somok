import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PartyHistory } from "@/components/party/party-history";
import { ContourLines } from "@/components/shared/contour-lines";
import { PhotoSlot } from "@/components/shared/photo-slot";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "party.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function PartyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("party");
  return (
    <>
      <section className="night relative overflow-hidden">
        <ContourLines seed={9} />
        <div className="shell relative grid items-end gap-8 py-10 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="kicker !text-white/80">{t("hero.kicker")}</p>
            <h1 className="display-xl mt-3 text-uda-500">{t("hero.title")}</h1>
            <p className="lede mt-4 max-w-xl text-white/90">{t("hero.body")}</p>
          </div>
          <PhotoSlot slot="party" label={t("photo")} alt={t("photo")} className="aspect-video rounded-3xl" sizes="(min-width: 768px) 33vw, 100vw" />
        </div>
      </section>
      <PartyHistory />
    </>
  );
}
