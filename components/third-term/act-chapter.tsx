import { getTranslations } from "next-intl/server";
import { ContourLines } from "@/components/shared/contour-lines";
import { HatTrick } from "@/components/shared/hat-trick";
import { PhotoSlot } from "@/components/shared/photo-slot";
import { ShareWhatsApp } from "@/components/shared/share-whatsapp";
import { SourceBadge } from "@/components/shared/source-badge";
import type { chapters } from "@/data/third-term/chapters";

type Chapter = (typeof chapters)[number];

/** One pinned, full-screen act: photo, one sentence, one hard number. Acts stack via position: sticky. */
export async function ActChapter({ chapter, index }: { chapter: Chapter; index: number }) {
  const t = await getTranslations("third-term.acts");
  const c = await getTranslations("common");
  const k = chapter.key;
  const finale = k === "finish";
  return (
    <section className="night sticky top-[var(--header-h)] flex min-h-[calc(100svh-var(--header-h))] items-center overflow-hidden border-t border-white/10" aria-labelledby={`act-${k}`}>
      <ContourLines seed={index * 4 + 2} count={12} />
      <div className="shell relative grid items-center gap-8 py-10 md:grid-cols-2">
        <PhotoSlot slot={chapter.photo} label={c("photo.slot", { slot: chapter.photo })} alt={c("photo.placeholderAlt")} className="aspect-[4/5] max-h-[52svh] w-full rounded-3xl md:max-h-[70svh]" sizes="(min-width: 768px) 50vw, 100vw" />
        <div>
          <div className="flex items-center gap-4">
            <HatTrick filled={finale ? 2 : index + 1} tone="night" label="" />
            <p className="kicker">{t(`${k}.label`)} · {t(`${k}.year`)}</p>
          </div>
          <h2 id={`act-${k}`} className="display-lg mt-4">{t(`${k}.title`)}</h2>
          <p className="lede mt-4 max-w-md text-white/90">{t(`${k}.line`)}</p>
          <p className={`mt-8 font-display text-6xl font-extrabold tracking-tighter sm:text-7xl ${finale ? "text-uda-500" : "text-white"}`}>{chapter.number.value}</p>
          <p className="mt-1 text-white/85">{t(`${k}.numberLabel`)}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <SourceBadge ids={chapter.number.sourceIds} tone="night" />
            <ShareWhatsApp text={`${t(`${k}.label`)} · ${t(`${k}.title`)}: ${chapter.number.value} ${t(`${k}.numberLabel`)}`} path={`/third-term#act-${k}`} tone="night" />
          </div>
        </div>
      </div>
    </section>
  );
}
