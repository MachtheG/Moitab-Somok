/** One messages file per tab (plus `common`). check-translations.ts uses this list. */
export const namespaces = [
  "common",
  "home",
  "record",
  "third-term",
  "wards",
  "gallery",
  "news",
  "journey",
  "party",
  "elections",
  "get-involved",
  "contact",
  "privacy",
] as const;
export type Namespace = (typeof namespaces)[number];
