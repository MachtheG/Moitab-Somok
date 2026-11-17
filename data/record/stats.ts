import type { SourceId } from "../sources";
import { register, result2022 } from "../election";
import { floorActivity } from "./hansard";
import { ngcdfAllocationGrowth, ngcdfAllocationTotal } from "./ngcdf-allocations";
import { termTotals, TERM_YEARS } from "./ngcdf-derived";

/**
 * Headline stats. Values are COMPUTED from data files, never typed in.
 * `labelKey` → messages/<locale>/record.json → stats.<labelKey>.{label,detail}
 */
export type Stat = {
  id: string;
  value: number;
  format: "int" | "ksh" | "kshM" | "pct" | "fraction";
  of?: number;
  sourceIds: SourceId[];
  confirmed: boolean;
};

const ngcdfDocs: SourceId[] = TERM_YEARS.map((y) => `ngcdf-${y.replace("/", "-")}` as SourceId);

export const stats: Stat[] = [
  { id: "terms", value: 2, format: "int", sourceIds: ["wikipedia-constituency", "mzalendo-constituency"], confirmed: true },
  { id: "votes2022", value: result2022.votes, format: "int", sourceIds: ["mzalendo-constituency"], confirmed: true },
  { id: "registered2022", value: register[2022], format: "int", sourceIds: ["mzalendo-constituency"], confirmed: true },
  { id: "registerGrowth", value: (register[2022] / register[2017] - 1) * 100, format: "pct", sourceIds: ["mzalendo-constituency"], confirmed: true },
  { id: "ngcdfFourYears", value: ngcdfAllocationTotal, format: "kshM", sourceIds: ["mzalendo-ngcdf"], confirmed: true },
  { id: "ngcdfGrowth", value: ngcdfAllocationGrowth, format: "pct", sourceIds: ["mzalendo-ngcdf"], confirmed: true },
  { id: "projectLines", value: termTotals.projectLines, format: "int", sourceIds: ngcdfDocs, confirmed: true },
  { id: "educationLines", value: termTotals.educationLines, format: "int", sourceIds: ngcdfDocs, confirmed: true },
  { id: "educationKsh", value: termTotals.education, format: "kshM", sourceIds: ngcdfDocs, confirmed: true },
  { id: "bursariesKsh", value: termTotals.bursaries, format: "kshM", sourceIds: ngcdfDocs, confirmed: true },
  { id: "divisions", value: floorActivity.divisionsVoted, of: floorActivity.divisionsRecorded, format: "fraction", sourceIds: ["mzalendo-13th"], confirmed: true },
  { id: "hansard", value: floorActivity.hansardContributions, format: "int", sourceIds: ["mzalendo-13th"], confirmed: true },
  { id: "committees", value: 4, format: "int", sourceIds: ["parliament-profile", "mzalendo-13th"], confirmed: false },
  { id: "wards", value: 4, format: "int", sourceIds: ["wikipedia-constituency", "mzalendo-constituency"], confirmed: true },
];
