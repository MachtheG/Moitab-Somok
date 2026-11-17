/** Sector + ward helpers for the NG-CDF parser. Pure functions, unit-tested. */

export const SECTORS = [
  "primary-education",
  "secondary-education",
  "jss",
  "bursaries",
  "security",
  "sports",
  "environment",
  "water",
  "ict",
  "emergency",
  "administration",
  "monitoring",
  "strategic-plan",
  "other",
] as const;
export type Sector = (typeof SECTORS)[number];

export const WARDS = ["chilchila", "kipkelion", "kamasian", "kunyak"] as const;
export type Ward = (typeof WARDS)[number];

const HEADING_MAP: [RegExp, Sector][] = [
  [/JSS/, "jss"],
  [/PRIMARY/, "primary-education"],
  [/SECONDARY/, "secondary-education"],
  [/BURSAR/, "bursaries"],
  [/SECURITY/, "security"],
  [/SPORT/, "sports"],
  [/ENVIRONMENT|CLIMATE/, "environment"],
  [/INNOVATION|ICT/, "ict"],
  [/EMERGENCY/, "emergency"],
  [/MONITORING|EVALUATION|CAPACITY/, "monitoring"],
  [/ADMINISTRATION|RECURRENT|NG-CDF OFFICE/, "administration"],
  [/STRATEGIC/, "strategic-plan"],
];

/** Map a document section heading to a sector, or null for non-sector headings (e.g. "ADDITIONAL"). */
export function normaliseHeading(heading: string): Sector | null {
  const h = heading.toUpperCase();
  for (const [re, s] of HEADING_MAP) if (re.test(h)) return s;
  return null;
}

const KEYWORDS: [RegExp, Sector][] = [
  [/bursar/i, "bursaries"],
  [/\bjss\b|junior (secondary|school)/i, "jss"],
  [/secondary|\bsec\b|high school|girls|boys/i, "secondary-education"],
  [/primary|\bpry\b|ecde/i, "primary-education"],
  [/police|chief|security|\bdcc\b|\bacc\b|administration police/i, "security"],
  [/tournament|sport|ball|uniforms/i, "sports"],
  [/tree|environment|climate/i, "environment"],
  [/innovation|ict|digital/i, "ict"],
  [/emergency|unforeseen/i, "emergency"],
  [/monitoring|capacity|training/i, "monitoring"],
  [/strategic plan/i, "strategic-plan"],
  // Overheads before water, so "Water and Sewerage Charges" is administration.
  [
    /salar|gratuity|nssf|nhif|electricity|telephone|courier|postal|printing|catering|travel|fuel|insurance|committee|allowance|goods and services|hire of transport|oversight|office|charges|commission|maintenance/i,
    "administration",
  ],
  [/water|borehole|tank|dam\b/i, "water"],
];

/**
 * Keyword fallback for documents without section headings.
 * Name is checked before activity, because a school's name is a stronger
 * signal than the work described (a "water tank at X Secondary" is education).
 */
export function classifySector(text: string): Sector {
  for (const [re, s] of KEYWORDS) if (re.test(text)) return s;
  return "other";
}

/**
 * Returns a ward only when the text explicitly says "<Ward> Ward" for exactly
 * one ward. Never infers from school or place names.
 */
export function findWard(text: string): Ward | undefined {
  const hits = WARDS.filter((w) => new RegExp(`\\b${w}\\s+ward\\b`, "i").test(text));
  return hits.length === 1 ? hits[0] : undefined;
}

/** Name first, then activity. */
export function inferSector(name: string, activity: string): Sector {
  const byName = classifySector(name);
  return byName !== "other" ? byName : classifySector(activity);
}
