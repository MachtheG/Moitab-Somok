import type { SourceId } from "../sources";
import type { PhotoSlot } from "../photos";

/** Three acts. Each: one photo, one sentence (messages third-term.acts.<key>), one hard number. */
export const chapters: { key: "promise" | "proof" | "finish"; year: 2017 | 2022 | 2027; photo: PhotoSlot; number: { value: string; sourceIds: SourceId[] } }[] = [
  { key: "promise", year: 2017, photo: "act-1-2017", number: { value: "46,512", sourceIds: ["mzalendo-constituency"] } },
  { key: "proof", year: 2022, photo: "act-2-2022", number: { value: "26,222", sourceIds: ["mzalendo-constituency"] } },
  { key: "finish", year: 2027, photo: "act-3-2027", number: { value: "52,960", sourceIds: ["mzalendo-constituency"] } },
];
