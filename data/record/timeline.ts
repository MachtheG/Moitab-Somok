import type { SourceId } from "../sources";

/** Record timeline 2017 → today. Copy lives in messages/<locale>/record.json → timeline.<key>. */
export const timeline: { key: string; date: string; sourceIds: SourceId[]; confirmed: boolean }[] = [
  { key: "elected2017", date: "2017-08", sourceIds: ["wikipedia-constituency"], confirmed: true },
  { key: "environmentCommittee", date: "2017", sourceIds: ["parliament-profile"], confirmed: true },
  { key: "ngcdf2017", date: "2017-07", sourceIds: ["ngcdf-2017-18"], confirmed: true },
  { key: "settlementVisit", date: "2019-10-15", sourceIds: ["mzalendo-12th"], confirmed: true },
  { key: "regionalIntegration", date: "2020", sourceIds: ["parliament-profile"], confirmed: true },
  { key: "ngcdf2020", date: "2020-07", sourceIds: ["ngcdf-2020-21"], confirmed: true },
  { key: "fertiliser2022", date: "2022-02-23", sourceIds: ["mzalendo-12th"], confirmed: true },
  { key: "reelected2022", date: "2022-08", sourceIds: ["mzalendo-constituency"], confirmed: true },
  { key: "ngcdf2022", date: "2022-07", sourceIds: ["ngcdf-2022-23", "mzalendo-ngcdf"], confirmed: true },
  { key: "ngcdf2023", date: "2023-07", sourceIds: ["ngcdf-2023-24", "mzalendo-ngcdf"], confirmed: true },
  { key: "roads2025", date: "2025-07-23", sourceIds: ["mzalendo-13th"], confirmed: true },
  { key: "education2025", date: "2025-10-09", sourceIds: ["mzalendo-13th"], confirmed: true },
  { key: "ngcdf2025", date: "2025-07", sourceIds: ["mzalendo-ngcdf"], confirmed: true },
];
