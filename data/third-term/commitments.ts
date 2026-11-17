/**
 * DRAFT — awaiting the MP's approval. Copy: messages/<locale>/third-term.json → commitments.<key>.
 * Directions are grounded in his recorded Hansard themes and NG-CDF spending
 * patterns. No targets or figures until the campaign supplies them.
 */
export const commitments = [
  { key: "classrooms", basis: ["ngcdf-2023-24"], status: "draft" },
  { key: "bursaries", basis: ["ngcdf-2023-24", "ngcdf-2022-23"], status: "draft" },
  { key: "roads", basis: ["mzalendo-13th"], status: "draft" },
  { key: "coffeeDairy", basis: ["wikipedia-constituency"], status: "draft" },
  { key: "youth", basis: ["mzalendo-13th"], status: "draft" },
  { key: "security", basis: ["ngcdf-2023-24"], status: "draft" },
] as const;
