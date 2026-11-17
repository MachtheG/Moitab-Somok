import { getTranslations } from "next-intl/server";
import { ContourLines } from "@/components/shared/contour-lines";

/** The interactive promise of the site: the third dot is the visitor's to fill. */
export async function InvolveHero() {
  const t = await getTranslations("get-involved.hero");
  return (
    <section className="night relative overflow-hidden">
      <ContourLines seed={13} />
      <div className="shell relative py-16">
        <div className="flex items-center gap-4" aria-hidden>
          <span className="size-10 rounded-full bg-uda-500 sm:size-14" />
          <span className="size-10 rounded-full bg-uda-500 sm:size-14" />
          <span className="size-10 rounded-full border-4 border-dashed border-uda-500 sm:size-14" />
        </div>
        <p className="kicker mt-8">{t("kicker")}</p>
        <h1 className="display-lg mt-3">{t("title")}</h1>
        <p className="lede mt-4 max-w-xl text-white/85">{t("body")}</p>
      </div>
    </section>
  );
}
