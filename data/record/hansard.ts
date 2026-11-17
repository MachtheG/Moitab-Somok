import type { SourceId } from "../sources";

/**
 * Hansard highlights. `quote` is only filled from CERTIFIED Hansard text
 * (parliament.go.ke). Until then we show a neutral topic summary and link.
 */
export type HansardItem = {
  date: string;
  topicKey: string; // messages: record.hansard.<topicKey>
  quote: string | null;
  certified: boolean;
  sourceId: SourceId;
};

export const hansard: HansardItem[] = [
  { date: "2025-07-23", topicKey: "roads", quote: null, certified: false, sourceId: "mzalendo-13th" },
  { date: "2025-10-09", topicKey: "education", quote: null, certified: false, sourceId: "mzalendo-13th" },
  { date: "2025-10-07", topicKey: "tea", quote: null, certified: false, sourceId: "mzalendo-13th" },
  { date: "2026-03-11", topicKey: "dams", quote: null, certified: false, sourceId: "mzalendo-13th" },
  { date: "2025-07-23", topicKey: "socialWork", quote: null, certified: false, sourceId: "mzalendo-13th" },
  { date: "2022-02-23", topicKey: "fertiliser", quote: null, certified: false, sourceId: "mzalendo-12th" },
  { date: "2019-10-15", topicKey: "settlement", quote: null, certified: false, sourceId: "mzalendo-12th" },
];

/** Floor activity, 13th Parliament, Mzalendo counting method (contributions = Hansard passages attributed to him). */
export const floorActivity = {
  method: "mzalendo",
  hansardContributions: 63,
  motionsMoved: 2,
  papersLaid: 1,
  divisionsVoted: 10,
  divisionsRecorded: 10,
  questions: 0,
  billsSponsored: 0,
  sourceId: "mzalendo-13th" as SourceId,
} as const;
