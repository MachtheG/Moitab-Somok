import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProjectDetail } from "@/components/record/project-detail";
import { ngcdfProjects } from "@/data/record/ngcdf-projects";

type Props = { params: Promise<{ locale: string; slug: string }> };

// 404 projects × 2 locales: rendered on first request, then cached.
export const dynamicParams = true;
export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const p = ngcdfProjects.find((x) => x.id === slug);
  if (!p) return {};
  const t = await getTranslations({ locale, namespace: "record.meta" });
  return { title: `${p.name} (${p.fy})`, description: `${p.activity.slice(0, 150)} · ${t("title")}` };
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = ngcdfProjects.find((p) => p.id === slug);
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
