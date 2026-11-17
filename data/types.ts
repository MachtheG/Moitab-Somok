import type { SourceId } from "./sources";

export type Ward = {
  slug: "chilchila" | "kipkelion" | "kamasian" | "kunyak";
  registered2022: number;
  color: string;
  sourceIds: SourceId[];
  photoIds: string[];
  quote: { text: string; name: string; consentOn: string } | null;
};
