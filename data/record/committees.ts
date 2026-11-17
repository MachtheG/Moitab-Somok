import type { SourceId } from "../sources";

export type Committee = {
  key: string; // messages key
  parliament: 12 | 13;
  role: "member" | "vice-chair";
  from: number;
  to: number | null;
  sourceIds: SourceId[];
  confirmed: boolean;
};

export const committees: Committee[] = [
  { key: "environment", parliament: 12, role: "member", from: 2017, to: 2020, sourceIds: ["parliament-profile", "mzalendo-12th"], confirmed: true },
  { key: "regionalIntegration", parliament: 12, role: "member", from: 2020, to: 2022, sourceIds: ["parliament-profile"], confirmed: true },
  // 13th Parliament: listed by Mzalendo only. Verify against the National Assembly committee lists.
  { key: "implementation", parliament: 13, role: "member", from: 2022, to: null, sourceIds: ["mzalendo-13th"], confirmed: false },
  { key: "socialProtection", parliament: 13, role: "vice-chair", from: 2022, to: null, sourceIds: ["mzalendo-13th"], confirmed: false },
];
