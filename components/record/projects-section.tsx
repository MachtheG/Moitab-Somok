import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/shared/section-heading";
import { ngcdfProjects } from "@/data/record/ngcdf-projects";
import { ProjectExplorer, type ProjectRow } from "./project-explorer";

export async function ProjectsSection() {
  const t = await getTranslations("record");
  const c = await getTranslations("common.source");
  const rows: ProjectRow[] = ngcdfProjects.map(({ id, fy, name, amount, sector }) => ({ id, fy, name, amount, sector }));
  const years = [...new Set(rows.map((r) => r.fy))].sort().reverse();
  const sectors = [...new Set(rows.map((r) => r.sector))];
  return (
    <section id="projects" className="shell scroll-mt-32 py-14">
      <SectionHeading kicker={t("explorer.kicker")} title={t("explorer.title")} lede={`${c("approvedNote")} ${t("detail.neutral")}`} filled={2} />
      <div className="mt-8">
        <Suspense fallback={null}>
          <ProjectExplorer rows={rows} years={years} sectors={sectors} />
        </Suspense>
      </div>
    </section>
  );
}
