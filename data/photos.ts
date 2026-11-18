/**
 * Photo manifest. ONLY campaign-supplied or campaign-licensed images.
 * Never press photos, never AI-generated likenesses (CLAUDE.md rule 2).
 * `npm run images` optimises files in /photos-inbox and appends entries here.
 *
 * Until real photos arrive every slot renders <PhotoSlot> (silhouette + slot label).
 */
export type PhotoCategory = "portrait" | "community" | "parliament" | "projects" | "campaign" | "family" | "landscape";
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
  /** Third-party images: licence or source page for the credit line. */
  license?: { name: string; url: string; source: string; changes?: string };
  /** CSS object-position, e.g. "50% 20%" to keep a face in frame. */
  focus?: string;
};

const OFFICIAL = { name: "Parliament of Kenya", url: "https://www.parliament.go.ke", source: "https://www.parliament.go.ke/index.php/the-national-assembly/hon-kosgei-hilary-kiplangat" };
const PROFILE = { name: "Mzalendo", url: "https://mzalendo.com", source: "https://mzalendo.com/mps-performance/national-assembly/13th-parliament/hilary-kiplangat-kosgei/" };
const PORTRAIT_ALT = { en: "Hon. Hilary Kiplang'at Kosgei, MP for Kipkelion West", sw: "Mhe. Hilary Kiplang'at Kosgei, Mbunge wa Kipkelion Magharibi" };
const official = (id: string): Photo => ({
  id, src: "/photos/kosgei/official-portrait.jpg", width: 775, height: 861, alt: PORTRAIT_ALT,
  caption: { en: "Official National Assembly portrait", sw: "Picha rasmi ya Bunge la Kitaifa" },
  date: null, ward: null, category: "portrait", credit: "Parliament of Kenya", approvedForPress: false, featured: true, license: OFFICIAL, focus: "50% 25%",
});
const profile = (id: string): Photo => ({
  id, src: "/photos/kosgei/profile-portrait.jpg", width: 320, height: 400, alt: PORTRAIT_ALT,
  caption: { en: "Hon. Kosgei, 13th Parliament", sw: "Mhe. Kosgei, Bunge la 13" },
  date: null, ward: null, category: "portrait", credit: "Mzalendo Trust", approvedForPress: false, featured: true, license: PROFILE, focus: "50% 22%",
});

/**
 * Photos of Hon. Kosgei from public profile pages (CLAUDE.md rule 2, updated
 * 2026-11-18). Slots without a photo of him use a credited Kericho landscape
 * (see `landscapeFor` below). Campaign photos replace these when supplied.
 */
export const photos: Photo[] = [
  official("hero-portrait"),
  official("parliament"),
  official("act-1-2017"),
  official("party"),
  profile("journey-portrait"),
  profile("contact"),
  profile("act-2-2022"),
];

/** Gallery set: one of each portrait (slots reuse the same files). */
export const portraits: Photo[] = [official("portrait-official"), profile("portrait-profile")];

/**
 * Openly licensed landscapes of the Kericho highlands from Wikimedia Commons.
 * Places only, no people as subjects, never the MP. Credits shown wherever used.
 */
const BYSA4 = { name: "CC BY-SA 4.0", url: "https://creativecommons.org/licenses/by-sa/4.0/" };
const BYSA3 = { name: "CC BY-SA 3.0", url: "https://creativecommons.org/licenses/by-sa/3.0/" };
const BY2 = { name: "CC BY 2.0", url: "https://creativecommons.org/licenses/by/2.0/" };
const resized = "Resized";

export const landscapes: Photo[] = [
  {
    id: "kericho-tea-carpet", src: "/photos/landscape/kericho-tea-carpet.jpg", width: 960, height: 480,
    alt: { en: "Rows of green tea stretching to the horizon in the Kericho highlands", sw: "Mistari ya chai ya kijani hadi upeo wa macho katika nyanda za juu za Kericho" },
    caption: { en: "Tea in the Kericho highlands", sw: "Chai katika nyanda za juu za Kericho" },
    date: "2020-07-19", ward: null, category: "landscape", credit: "Carter.Maina", approvedForPress: false, featured: true,
    license: { ...BYSA4, source: "https://commons.wikimedia.org/wiki/File:Tea_carpet_plantation_of_Kericho_highlands,_in_Kenya.jpg", changes: resized },
  },
  {
    id: "kericho-tealand-2012", src: "/photos/landscape/kericho-tealand-2012.jpg", width: 960, height: 582,
    alt: { en: "Tea fields, a lone tree and forested hills near Kericho", sw: "Mashamba ya chai, mti mmoja na milima yenye misitu karibu na Kericho" },
    caption: { en: "Tea country near Kericho", sw: "Eneo la chai karibu na Kericho" },
    date: "2012-08-25", ward: null, category: "landscape", credit: "Bjørn Christian Tørrissen", approvedForPress: false, featured: true,
    license: { ...BYSA3, source: "https://commons.wikimedia.org/wiki/File:Kenya-Tealand-Near-Kericho-2012.JPG", changes: resized },
  },
  {
    id: "kericho-tea-plantation", src: "/photos/landscape/kericho-tea-plantation.jpg", width: 960, height: 606,
    alt: { en: "A tea plantation under a wide sky with white clouds, Kericho", sw: "Shamba la chai chini ya anga pana lenye mawingu meupe, Kericho" },
    caption: { en: "Big skies over the tea, Kericho", sw: "Anga pana juu ya chai, Kericho" },
    date: "2009-10-28", ward: null, category: "landscape", credit: "edskoch", approvedForPress: false, featured: false,
    license: { ...BY2, source: "https://commons.wikimedia.org/wiki/File:Tea_plantation_(4326146081).jpg", changes: resized },
  },
  {
    id: "kericho-forest", src: "/photos/landscape/kericho-forest.jpg", width: 835, height: 640,
    alt: { en: "Tall forest trees above a tea hedge in Kericho", sw: "Miti mirefu ya msitu juu ya ua wa chai Kericho" },
    caption: { en: "Forest and tea, Kericho", sw: "Msitu na chai, Kericho" },
    date: "2009-01-27", ward: null, category: "landscape", credit: "Juliana (bankelele.blogspot.com)", approvedForPress: false, featured: false,
    license: { ...BY2, source: "https://commons.wikimedia.org/wiki/File:Forest_in_Kericho.jpg", changes: "Cropped and resized" },
  },
  {
    id: "kericho-farmland", src: "/photos/landscape/kericho-farmland.jpg", width: 960, height: 638,
    alt: { en: "Rolling farmland with fields and scattered homes near Kericho", sw: "Mashamba ya vilima yenye nyumba zilizotawanyika karibu na Kericho" },
    caption: { en: "Farms on the hills near Kericho", sw: "Mashamba vilimani karibu na Kericho" },
    date: "2012-08-06", ward: null, category: "landscape", credit: "Josep M. Gracia", approvedForPress: false, featured: true,
    license: { ...BYSA4, source: "https://commons.wikimedia.org/wiki/File:KER_-_Agricultural_landscape_near_Kericho,_Kenya,_2012.jpg", changes: resized },
  },
];


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

/** Slots filled with a landscape until a photo of the MP exists for them. */
const LANDSCAPE_FOR: Partial<Record<PhotoSlot, string>> = {
  "act-3-2027": "kericho-farmland",
  "ward-chilchila": "kericho-tealand-2012",
  "ward-kipkelion": "kericho-farmland",
  "ward-kamasian": "kericho-tea-carpet",
  "ward-kunyak": "kericho-tea-plantation",
  "get-involved": "kericho-tea-carpet",
};

/** The photo to show in a slot: the MP if we have one, else a credited landscape. */
export function photoForSlot(slot: PhotoSlot): Photo | undefined {
  return photos.find((p) => p.id === slot) ?? landscapes.find((l) => l.id === LANDSCAPE_FOR[slot]);
}
