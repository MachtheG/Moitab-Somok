import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { landscapes } from "@/data/photos";

/** Full-bleed strip of the Kericho highlands (openly licensed, credited). */
export async function LandBand() {
  const t = await getTranslations("home.land");
  const locale = (await getLocale()) as "en" | "sw";
  const p = landscapes.find((x) => x.id === "kericho-tea-carpet")!;
  return (
    <figure className="relative">
      <div className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-[21/7]">
        <Image src={p.src} alt={p.alt[locale]} fill sizes="100vw" className="object-cover" />
      </div>
      <figcaption className="shell flex flex-wrap justify-between gap-2 py-3 text-sm">
        <span>{t("caption")}</span>
        <a href={p.license!.source} target="_blank" rel="noopener noreferrer" className="text-xs text-black/70 underline">
          {t("credit", { credit: p.credit, license: p.license!.name })}
        </a>
      </figcaption>
    </figure>
  );
}
