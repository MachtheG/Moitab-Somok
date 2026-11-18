import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { ContourLines } from "@/components/shared/contour-lines";
import { Button } from "@/components/ui/button";
import { photoForSlot } from "@/data/photos";
import { Link } from "@/i18n/navigation";

/**
 * The Numeral Hero: the portrait in a framed card with a giant contour-filled
 * "3" standing beside it (overlapping the frame edge). Without a portrait, an
 * honest slot label sits where the photo would be.
 */
export async function NumeralHero() {
  const t = await getTranslations("home.hero");
  const c = await getTranslations("common");
  const locale = (await getLocale()) as "en" | "sw";
  const portrait = photoForSlot("hero-portrait");
  return (
    <section className="night relative isolate overflow-hidden">
      <ContourLines />
      <div className="shell relative grid items-center gap-4 py-8 md:min-h-[calc(100svh-var(--header-h))] md:grid-cols-[1.1fr_1fr] md:gap-6 md:py-10">
        <div className="relative z-10 order-2 md:order-1">
          <p className="kicker !text-white/80">{t("kicker")}</p>
          <h1 className="display-xl mt-4 text-white">{t("headline")}</h1>
          <p className="mt-3 font-display text-2xl font-bold text-white/90 sm:text-3xl">{c("slogan")}</p>
          <p className="lede mt-5 max-w-xl text-white/85">{t("subhead")}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg"><Link href="/get-involved">{t("ctaPrimary")}</Link></Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:border-uda-500 hover:bg-white/10"><Link href="/record">{t("ctaSecondary")}</Link></Button>
          </div>
        </div>
        <div className="numeral-open relative order-1 md:order-2">
          <div className="mx-auto flex w-full max-w-[30rem] items-end justify-center">
            {portrait ? (
              <figure className="relative z-0 w-[44%] max-w-56 shrink-0 [@media(max-height:780px)]:max-w-40 md:w-[52%] md:max-w-none">
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl ring-2 ring-uda-500 ring-offset-4 ring-offset-forest-900">
                  <Image src={portrait.src} alt={portrait.alt[locale]} fill priority sizes="(min-width: 768px) 25vw, 45vw" className="object-cover" style={{ objectPosition: portrait.focus }} />
                </div>
                {portrait.license && (
                  <figcaption className="mt-2 text-center text-[10px] text-white/70">
                    <a href={portrait.license.source} target="_blank" rel="noopener noreferrer" className="hover:text-white">© {portrait.credit}</a>
                  </figcaption>
                )}
              </figure>
            ) : (
              <span className="rounded-full bg-forest-800 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-uda-500">{c("photo.slot", { slot: "hero-portrait" })}</span>
            )}
            <svg viewBox="0 0 400 520" className="relative z-10 -ml-[6%] h-auto w-[36%] max-w-44 shrink-0 [@media(max-height:780px)]:max-w-32 md:w-[44%] md:max-w-none" aria-hidden>
              <defs>
                <pattern id="hills" width="40" height="18" patternUnits="userSpaceOnUse"><path d="M0 12 Q10 4 20 12 T40 12" fill="none" stroke="#FFC700" strokeOpacity="0.55" strokeWidth="1.2" /></pattern>
              </defs>
              <text x="200" y="470" textAnchor="middle" fontSize="560" fontWeight="800" fill="#003D00" style={{ fontFamily: "var(--font-display)" }}>3</text>
              <text x="200" y="470" textAnchor="middle" fontSize="560" fontWeight="800" fill="url(#hills)" stroke="#FFC700" strokeWidth="5" paintOrder="stroke" style={{ fontFamily: "var(--font-display)" }}>3</text>
            </svg>
          </div>
          <div className="mt-3 flex items-center justify-center gap-6 font-mono text-xs text-white/80" aria-hidden>
            <span className="flex items-center gap-2"><span className="size-3 rounded-full bg-uda-500" />2017</span>
            <span className="flex items-center gap-2"><span className="size-3 rounded-full bg-uda-500" />2022</span>
            <span className="flex items-center gap-2"><span className="size-3 rounded-full border-[1.5px] border-uda-500" />2027</span>
          </div>
        </div>
      </div>
    </section>
  );
}
