import { getTranslations } from "next-intl/server";
import { PhotoSlot } from "@/components/shared/photo-slot";
import { photoSlots } from "@/data/photos";

/** Honest placeholders for every photo the design needs (docs/SHOT-LIST.md). */
export async function ShotSlots() {
  const t = await getTranslations("gallery");
  const c = await getTranslations("common.photo");
  return (
    <section className="mt-14">
      <h2 className="display-md">{t("slotsTitle")}</h2>
      <p className="mt-2 text-black/75">{t("slotsBody")}</p>
      <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {photoSlots.map((s, i) => (
          <li key={s}><PhotoSlot slot={s} tone={i % 3 === 0 ? "night" : "day"} label={c("slot", { slot: s })} alt={c("placeholderAlt")} className="aspect-[4/5] rounded-xl" sizes="25vw" /></li>
        ))}
      </ul>
    </section>
  );
}
