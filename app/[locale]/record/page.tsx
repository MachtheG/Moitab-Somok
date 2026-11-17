import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AllocationChart } from "@/components/record/allocation-chart";
import { CommitteesList } from "@/components/record/committees-list";
import { HansardHighlights } from "@/components/record/hansard-highlights";
import { ProjectsSection } from "@/components/record/projects-section";
import { RecordHero } from "@/components/record/record-hero";
import { RecordTimeline } from "@/components/record/record-timeline";
import { SectorFlow } from "@/components/record/sector-flow";
import { StatsGrid } from "@/components/record/stats-grid";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "record.meta" });
  return { title: t("title"), description: t("description"), alternates: { canonical: locale === "en" ? "/record" : "/sw/record", languages: { en: "/record", sw: "/sw/record" } } };
}

export default async function RecordPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <RecordHero />
      <StatsGrid />
      <AllocationChart />
      <SectorFlow />
      <ProjectsSection />
      <RecordTimeline />
      <CommitteesList />
      <HansardHighlights />
    </>
  );
}
