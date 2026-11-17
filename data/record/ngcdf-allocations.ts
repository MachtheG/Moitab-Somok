import type { SourceId } from "../sources";

/** NG-CDF APPROVED allocations (not released or spent). */
export const ngcdfAllocations = [
  { fy: "2022/23", amount: 138_215_033 },
  { fy: "2023/24", amount: 166_593_720 },
  { fy: "2024/25", amount: 170_469_857 },
  { fy: "2025/26", amount: 182_982_585 },
] as const;

export const ngcdfAllocationsSource: SourceId = "mzalendo-ngcdf";

export const ngcdfAllocationTotal = ngcdfAllocations.reduce((s, a) => s + a.amount, 0);

/** % growth from first to last year shown. */
export const ngcdfAllocationGrowth =
  (ngcdfAllocations[ngcdfAllocations.length - 1]!.amount / ngcdfAllocations[0]!.amount - 1) * 100;

/**
 * Gaps between the approved allocation and the sum of the published project
 * code list. Shown on the site as-is, never "corrected".
 */
export const ngcdfGaps = [
  { fy: "2022/23", approved: 138_215_033, codeList: 132_315_033, note: "[[TO CONFIRM: KSh 5,900,000 not in the published code list]]" },
  { fy: "2023/24", approved: 166_593_720, codeList: 157_375_603, note: "[[TO CONFIRM: KSh 9,218,117 not in the published code list]]" },
] as const;
