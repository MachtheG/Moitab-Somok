import type { Sector, Ward } from "@/scripts/ngcdf/classify";

export type { Sector, Ward };

export type NgcdfProject = {
  id: string;
  fy: string; // "2023/24"
  list: number;
  sn: number;
  code?: string;
  name: string;
  activity: string;
  amount: number; // KSh, approved
  status: string; // as printed: new | ongoing | …
  sector: Sector;
  sectorSource: "heading" | "inferred";
  ward?: Ward; // only when the document names the ward explicitly
  sourceId: string;
};

export type NgcdfDocSummary = {
  fy: string;
  rows: number;
  parsed: number; // sum of parsed rows
  docTotals: number[]; // TOTAL / GRAND TOTAL lines printed in the PDF
};
