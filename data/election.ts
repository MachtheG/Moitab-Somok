import type { SourceId } from "./sources";

/** 2027 General Election. Polls open 06:00 EAT (UTC+3). */
export const election = {
  date: "2027-08-10",
  startsAt: "2027-08-10T06:00:00+03:00",
  weekday: "Tuesday",
  label: "10.08.2027",
  sourceId: "iebc-election-date" satisfies SourceId,
  /** Key IEBC timelines as reported by The Standard (not yet checked against the gazette). */
  milestones: [
    { key: "primaries", date: "2027-05-09", confirmed: false },
    { key: "campaignStart", date: "2027-05-29", confirmed: false },
    { key: "campaignEnd", date: "2027-08-07", confirmed: false },
  ],
} as const;

type Mp = { year: number; name: string; party: string; sourceId: SourceId };

/** Constituency electoral history. */
export const constituencyHistory = {
  createdFor: 2013,
  createdNote: "Split from the former Kipkelion Constituency after the 2010 Constitution.",
  mps: <Mp[]>[
    { year: 2013, name: "Rob Jackson Kipkorir", party: "URP", sourceId: "wikipedia-constituency" },
    { year: 2017, name: "Hilary Kiplang'at Kosgei", party: "Jubilee", sourceId: "wikipedia-constituency" },
    { year: 2022, name: "Hilary Kiplang'at Kosgei", party: "UDA", sourceId: "mzalendo-constituency" },
  ],
  /** "First three-term MP" holds only if 2027 is won; needs IEBC 2013 confirmation of the 2013 MP's single term. */
  firstThreeTermClaim: { verified: false, note: "[[TO CONFIRM: no MP has served more than one term before 2017; confirm via IEBC 2013/2017 results]]" },
};

export const result2022 = { votes: 26_222, party: "UDA", gazette: "9950", sourceIds: ["mzalendo-constituency", "iebc-gazette-2022"] } as const;

export const register = {
  2017: 46_512,
  2022: 52_960,
  sourceId: "mzalendo-constituency",
} as const;
