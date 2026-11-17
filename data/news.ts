import type { SourceId } from "./sources";

/**
 * Coverage list. Summaries are OUR OWN one-liners (messages/<locale>/news.json →
 * items.<id>), never copied text. Only `verified: true` items render.
 * `campaignApproval` is required for sensitive items before they render.
 */
export type NewsItem = {
  id: string;
  date: string | null;
  outlet: string;
  url: string;
  verified: boolean;
  campaignApproval: "not-needed" | "pending" | "approved" | "rejected";
  sourceId?: SourceId;
};

export const news: NewsItem[] = [
  { id: "kbc-were-justice", date: "2025-05-10", outlet: "KBC", url: "https://www.kbc.co.ke/leaders-demand-justice-for-slain-kasipul-mp-call-for-arrest-of-masterminds/", verified: true, campaignApproval: "pending", sourceId: "kbc-2025-05-10" },
  // Candidates found via search; pages could not be opened by our tools. Do not render until read.
  { id: "standard-angata-barrikoi", date: null, outlet: "The Standard", url: "https://www.standardmedia.co.ke/article/2001518209/leaders-condemn-police-brutality-in-angata-barrikoi-call-for-justice", verified: false, campaignApproval: "pending" },
  { id: "nation-pesticides-board", date: null, outlet: "Nation", url: "https://nation.africa/kenya/news/mps-want-board-disbanded-for-protecting-agrochemical-industry-4997866", verified: false, campaignApproval: "not-needed" },
  { id: "kenyans-land-fraud", date: null, outlet: "Kenyans.co.ke", url: "https://www.kenyans.co.ke/news/114430-mps-accuse-ministry-aiding-land-fraud-demand-dci-probe", verified: false, campaignApproval: "not-needed" },
  { id: "nation-coffee-day-2022", date: "2022-10", outlet: "Nation", url: "[[TO CONFIRM: URL of Nation report on International Coffee Day 2022 at Fort Ternan]]", verified: false, campaignApproval: "not-needed" },
];
