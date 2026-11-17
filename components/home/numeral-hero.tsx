import { getLocale, getTranslations } from "next-intl/server";
import { ContourLines } from "@/components/shared/contour-lines";
import { Button } from "@/components/ui/button";
import { photos } from "@/data/photos";
import { Link } from "@/i18n/navigation";

/**
 * The Numeral Hero: a giant "3" with the portrait clipped inside it. Until the
 * campaign supplies `hero-portrait`, the numeral is filled with contour texture
 * and carries an honest slot label.
 */
export async function NumeralHero() {
  const t = await getTranslations("home.hero");
  const c = await getTranslations("common");
  const locale = (await getLocale()) as "en" | "sw";
  const portrait = photos.find((p) => p.id === "hero-portrait");
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
        <div className="numeral-open relative order-1 mx-auto w-[min(40vw,30rem)] md:order-2 [@media(max-height:780px)]:w-[min(32vw,30rem)] md:[@media(max-height:780px)]:w-[min(34vw,30rem)]">
          <svg viewBox="0 0 400 520" className="h-auto w-full" role="img" aria-label={portrait ? portrait.alt[locale] : c("photo.slot", { slot: "hero-portrait" })}>
            <defs>
              <clipPath id="three"><text x="200" y="455" textAnchor="middle" fontSize="560" fontWeight="800" style={{ fontFamily: "var(--font-display)" }}>3</text></clipPath>
              <pattern id="hills" width="40" height="18" patternUnits="userSpaceOnUse"><path d="M0 12 Q10 4 20 12 T40 12" fill="none" stroke="#FFC700" strokeOpacity="0.55" strokeWidth="1.2" /></pattern>
            </defs>
            <g clipPath="url(#three)">
              <rect width="400" height="520" fill="#003D00" />
              {portrait ? <image href={portrait.src} width="400" height="520" preserveAspectRatio="xMidYMid slice" /> : <rect width="400" height="520" fill="url(#hills)" />}
            </g>
            <text x="200" y="455" textAnchor="middle" fontSize="560" fontWeight="800" fill="none" stroke="#FFC700" strokeWidth="3" style={{ fontFamily: "var(--font-display)" }}>3</text>
          </svg>
          {!portrait && <span className="absolute left-1/2 top-0 -translate-x-1/2 whitespace-nowrap rounded-full bg-forest-900 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-uda-500">{c("photo.slot", { slot: "hero-portrait" })}</span>}
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
