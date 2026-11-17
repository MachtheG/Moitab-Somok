import type { Ward } from "../types";

export const chilchila: Ward = {
  slug: "chilchila",
  registered2022: 17117,
  color: "#008000", // docs/COLOR-LOCK.md §4.7
  sourceIds: ["mzalendo-constituency"],
  /** Projects whose NG-CDF entry names this ward. School→ward mapping pending from the campaign. */
  photoIds: [],
  quote: null, // only real, consented local quotes
};
