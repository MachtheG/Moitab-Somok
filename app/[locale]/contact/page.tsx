import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { OfficeCard } from "@/components/contact/office-card";
import { CampaignForm } from "@/components/shared/campaign-form";
import { SectionHeading } from "@/components/shared/section-heading";
import { WARDS } from "@/lib/forms/schema";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const w = await getTranslations("wards");
  const wardNames = Object.fromEntries(WARDS.map((k) => [k, w(`${k}.name`)]));
  return (
    <div className="shell py-14">
      <SectionHeading as="h1" kicker={t("hero.kicker")} title={t("hero.title")} filled={2} />
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <OfficeCard />
        <section className="rounded-3xl border-2 border-black p-6 sm:p-8">
          <h2 className="display-md">{t("form.title")}</h2>
          <div className="mt-6"><CampaignForm kind="contact" cta={t("form.cta")} success={t("form.success")} wardNames={wardNames} /></div>
        </section>
      </div>
    </div>
  );
}
