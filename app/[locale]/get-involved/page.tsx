import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { InvolveHero } from "@/components/get-involved/involve-hero";
import { CampaignForm } from "@/components/shared/campaign-form";
import { PhotoSlot } from "@/components/shared/photo-slot";
import { WARDS } from "@/lib/forms/schema";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "get-involved.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function GetInvolvedPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("get-involved");
  const w = await getTranslations("wards");
  const c = await getTranslations("common.photo");
  const wardNames = Object.fromEntries(WARDS.map((k) => [k, w(`${k}.name`)]));
  return (
    <>
      <InvolveHero />
      <div className="shell grid gap-10 py-10 lg:grid-cols-2">
        <section id="pledge" className="scroll-mt-20 rounded-3xl border-2 border-black p-6 sm:p-8">
          <h2 className="display-md">{t("pledge.title")}</h2>
          <div className="mt-6"><CampaignForm kind="pledge" cta={t("pledge.cta")} success={t("pledge.success")} wardNames={wardNames} /></div>
        </section>
        <section id="volunteer" className="scroll-mt-20 rounded-3xl bg-onyx-900 p-6 sm:p-8">
          <h2 className="display-md">{t("volunteer.title")}</h2>
          <div className="mt-6"><CampaignForm kind="volunteer" cta={t("volunteer.cta")} success={t("volunteer.success")} wardNames={wardNames} variant="forest" /></div>
        </section>
      </div>
      <div className="shell"><PhotoSlot slot="get-involved" tone="day" label={c("slot", { slot: "get-involved" })} alt={c("placeholderAlt")} className="aspect-[21/9] rounded-3xl" /></div>
    </>
  );
}
