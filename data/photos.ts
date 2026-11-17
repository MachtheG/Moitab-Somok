/**
 * Photo manifest. ONLY campaign-supplied or campaign-licensed images.
 * Never press photos, never AI-generated likenesses (CLAUDE.md rule 2).
 * `npm run images` optimises files in /photos-inbox and appends entries here.
 *
 * Until real photos arrive every slot renders <PhotoSlot> (silhouette + slot label).
 */
export type PhotoCategory = "portrait" | "community" | "parliament" | "projects" | "campaign" | "family";
export type Ward = "chilchila" | "kipkelion" | "kamasian" | "kunyak";

export type Photo = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: { en: string; sw: string };
  caption: { en: string; sw: string };
  date: string | null;
  ward: Ward | null;
  category: PhotoCategory;
  credit: string;
  approvedForPress: boolean;
  featured: boolean;
};

export const photos: Photo[] = [];

/** Named slots the design needs. See docs/SHOT-LIST.md. */
export const photoSlots = [
  "hero-portrait",
  "act-1-2017",
  "act-2-2022",
  "act-3-2027",
  "ward-chilchila",
  "ward-kipkelion",
  "ward-kamasian",
  "ward-kunyak",
  "parliament",
  "journey-portrait",
  "party",
  "get-involved",
  "contact",
] as const;
export type PhotoSlot = (typeof photoSlots)[number];
