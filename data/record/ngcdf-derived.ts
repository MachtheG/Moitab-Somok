import { ngcdfProjects } from "./ngcdf-projects";
import type { NgcdfProject, Sector } from "./ngcdf-types";

const EDUCATION: Sector[] = ["primary-education", "secondary-education", "jss"];

/** Financial years that fall inside his terms (FY2017/18 began before the Aug 2017 election). */
export const TERM_YEARS = ["2020/21", "2022/23", "2023/24"] as const;

const sum = (ps: NgcdfProject[]) => ps.reduce((s, p) => s + p.amount, 0);

export function projectsFor(years: readonly string[]) {
  return ngcdfProjects.filter((p) => years.includes(p.fy));
}

export function sectorTotals(years: readonly string[]) {
  const totals = new Map<Sector, number>();
  for (const p of projectsFor(years)) totals.set(p.sector, (totals.get(p.sector) ?? 0) + p.amount);
  return [...totals].map(([sector, amount]) => ({ sector, amount })).sort((a, b) => b.amount - a.amount);
}

const term = projectsFor(TERM_YEARS);
export const termTotals = {
  projectLines: term.length,
  educationLines: term.filter((p) => EDUCATION.includes(p.sector)).length,
  education: sum(term.filter((p) => EDUCATION.includes(p.sector))),
  bursaries: sum(term.filter((p) => p.sector === "bursaries")),
  security: sum(term.filter((p) => p.sector === "security")),
  total: sum(term),
};
