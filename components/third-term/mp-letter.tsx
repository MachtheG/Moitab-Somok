import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { photoForSlot } from "@/data/photos";

export async function MpLetter() {
  const t = await getTranslations("third-term.letter");
  const portrait = photoForSlot("journey-portrait");
  const paragraphs = t("body").split("\n\n");
  return (
    <section id="letter" className="relative z-10 bg-white py-12">
      <div className="shell grid max-w-5xl gap-6 md:grid-cols-[12rem_1fr]">
        {portrait && (
          <div className="flex items-center gap-4 md:block">
            <div className="relative size-24 shrink-0 overflow-hidden rounded-2xl md:size-48">
              <Image src={portrait.src} alt={portrait.alt.en} fill sizes="12rem" className="object-cover" style={{ objectPosition: portrait.focus }} />
            </div>
            <h2 className="display-md md:mt-4">{t("title")}</h2>
          </div>
        )}
        <article className="rounded-3xl border border-black/10 bg-onyx-900 p-5 text-[17px] leading-relaxed sm:p-8">
          {paragraphs.map((p, i) => (
            <p key={i} className={i === 0 ? "font-display text-2xl font-bold" : i === paragraphs.length - 1 ? "mt-5 font-display text-xl font-bold text-forest-700" : "mt-4"}>{p}</p>
          ))}
          <p className="mt-6 font-display text-lg font-bold">{t("signoff")}</p>
        </article>
      </div>
    </section>
  );
}
