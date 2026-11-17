import type { SourceId } from "./sources";

/**
 * Coverage list. Summaries are OUR OWN one-liners (messages/<locale>/news.json →
 * items.<id>), never copied text. Only `verified` items with approval
 * "approved" or "not-needed" render (newest first).
 */
export type NewsItem = {
  id: string;
  date: string | null;
  outlet: string;
  url: string;
  verified: boolean;
  campaignApproval: "not-needed" | "pending" | "approved" | "rejected";
  sourceId?: SourceId;
  note?: string;
};

export const news: NewsItem[] = [
  { id: "kenyans-land-fraud", date: "2025-07-22", outlet: "Kenyans.co.ke", url: "https://www.kenyans.co.ke/news/114430-mps-accuse-ministry-aiding-land-fraud-demand-dci-probe", verified: true, campaignApproval: "not-needed", sourceId: "kenyans-2025-07-22" },
  { id: "kbc-were-justice", date: "2025-05-10", outlet: "KBC", url: "https://www.kbc.co.ke/leaders-demand-justice-for-slain-kasipul-mp-call-for-arrest-of-masterminds/", verified: true, campaignApproval: "approved", sourceId: "kbc-2025-05-10", note: "Sensitive (a colleague's killing). Published at the site owner's request on 2026-11-17; remove if the campaign prefers." },
  { id: "kenyans-rival-in-laws", date: "2019-07-05", outlet: "Kenyans.co.ke", url: "https://www.kenyans.co.ke/news/41384-odm-jubilee-mps-who-are-married-sisters", verified: true, campaignApproval: "not-needed", sourceId: "kenyans-2019-07-05" },
  // Not rendered:
  { id: "standard-angata-barrikoi", date: "2025-05-06", outlet: "The Standard", url: "https://www.standardmedia.co.ke/article/2001518209/leaders-condemn-police-brutality-in-angata-barrikoi-call-for-justice", verified: false, campaignApproval: "pending", note: "Read 2026-11-17: he is only tagged; nothing visible is attributed to him (paywall)." },
  { id: "star-gachagua", date: "2024-09-28", outlet: "The Star", url: "https://the-star.co.ke/news/realtime/2024-09-28-mt-kenya-people-are-good-we-just-want-to-replace-gachagua-rift-mps", verified: true, campaignApproval: "rejected", note: "Excluded under CLAUDE.md rule 3: calls for a named politician's removal." },
  { id: "nation-pesticides-board", date: null, outlet: "Nation", url: "https://nation.africa/kenya/news/mps-want-board-disbanded-for-protecting-agrochemical-industry-4997866", verified: false, campaignApproval: "not-needed", note: "403 for our tools; not read." },
  { id: "nation-coffee-day-2022", date: "2022-10", outlet: "Nation", url: "[[TO CONFIRM: URL of Nation report on International Coffee Day 2022 at Fort Ternan]]", verified: false, campaignApproval: "not-needed" },
];
