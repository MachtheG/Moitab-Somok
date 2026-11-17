import type { SourceId } from "./sources";

export const party = {
  current: "UDA",
  currentFrom: 2022,
  previous: [{ name: "Jubilee", from: 2017, to: 2022 }],
  sourceIds: ["mzalendo-13th", "wikipedia-constituency"] satisfies SourceId[],
  /** Party colours match the site palette (docs/COLOR-LOCK.md). */
  nomination2027: "[[TO CONFIRM: UDA nomination status for 2027]]",
  note: "Parliament's member list has shown 'JP' in some views; Mzalendo reports UDA confirmed by Parliament's roster on 6 Nov 2026.",
} as const;
