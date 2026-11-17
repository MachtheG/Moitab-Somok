import type { SourceId } from "./sources";

/** Copy: messages/<locale>/journey.json → steps.<key>. */
export const journey: { key: string; from: number; to: number | null; sourceIds: SourceId[] }[] = [
  { key: "koruFarm", from: 1981, to: 1989, sourceIds: ["parliament-profile", "mzalendo-13th"] },
  { key: "kerichoHigh", from: 1989, to: 1992, sourceIds: ["parliament-profile", "mzalendo-13th"] },
  { key: "kenyattaUniversity", from: 1994, to: 1998, sourceIds: ["parliament-profile", "mzalendo-13th"] },
  { key: "kebs", from: 2015, to: 2017, sourceIds: ["parliament-profile", "mzalendo-13th"] },
  { key: "mp2017", from: 2017, to: 2022, sourceIds: ["wikipedia-constituency"] },
  { key: "mp2022", from: 2022, to: null, sourceIds: ["mzalendo-constituency"] },
];

/** 1998–2015 is a gap in every public source. */
export const journeyGap = "[[TO CONFIRM: career 1998–2015, from the campaign]]";
