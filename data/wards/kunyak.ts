import type { Ward } from "../types";

export const kunyak: Ward = {
  slug: "kunyak",
  registered2022: 8876,
  color: "#8A6900", // docs/COLOR-LOCK.md §4.7
  sourceIds: ["mzalendo-constituency"],
  /** Projects whose NG-CDF entry names this ward. School→ward mapping pending from the campaign. */
  photoIds: [],
  quote: null, // only real, consented local quotes
};
