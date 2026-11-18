import { getTranslations } from "next-intl/server";
import { ContourLines } from "@/components/shared/contour-lines";
import { PhotoSlot } from "@/components/shared/photo-slot";

export async function RecordHero() {
  const t = await getTranslations("record.hero");
  const c = await getTranslations("common.photo");
  return (
    <section className="night relative overflow-hidden">
      <ContourLines seed={5} />
      <div className="shell relative grid grid-cols-[1fr_7rem] items-end gap-4 py-8 sm:grid-cols-[1.5fr_1fr] sm:gap-8">
        <div>
          <p className="kicker">{t("kicker")}</p>
          <h1 className="display-lg mt-3">{t("title")}</h1>
          <p className="mt-3 max-w-2xl text-white/85 sm:lede">{t("body")}</p>
        </div>
        <PhotoSlot slot="parliament" label={c("slot", { slot: "parliament" })} alt={c("placeholderAlt")} className="aspect-[4/5] rounded-2xl sm:max-h-80" sizes="(min-width: 768px) 33vw, 100vw" />
      </div>
    </section>
  );
}
