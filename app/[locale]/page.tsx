import { setRequestLocale } from "next-intl/server";
import { Beats } from "@/components/home/beats";
import { CountdownSection } from "@/components/home/countdown-section";
import { JoinCta } from "@/components/home/join-cta";
import { LandBand } from "@/components/home/land-band";
import { NumeralHero } from "@/components/home/numeral-hero";
import { StatBand } from "@/components/home/stat-band";
import { WardsTeaser } from "@/components/home/wards-teaser";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <NumeralHero />
      <Beats />
      <LandBand />
      <StatBand />
      <CountdownSection />
      <WardsTeaser />
      <JoinCta />
    </>
  );
}
