import { useTranslations } from "next-intl";
import { ContourLines } from "@/components/shared/contour-lines";
import { HatTrick } from "@/components/shared/hat-trick";
import { getSource } from "@/data/sources";
import { Link } from "@/i18n/navigation";
import { tabs } from "@/lib/nav";
import { rich } from "@/lib/rich";
import { LiteToggle } from "./lite-toggle";

const CHANNELS = ["official-x", "official-facebook"] as const;

export function SiteFooter() {
  const t = useTranslations("common");
  return (
    <footer className="night relative mt-24 overflow-hidden pb-20 sm:pb-0">
      <ContourLines seed={11} count={10} />
      <div className="shell relative grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <HatTrick tone="night" label={t("hatTrick.label")} />
          <p className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">{t("slogan")}</p>
          <p className="max-w-sm text-white/85">{t("footer.tagline")}</p>
          <p className="text-sm text-white/80">{t("footer.sources")}</p>
        </div>
        <nav aria-label={t("footer.pages")}>
          <p className="kicker">{t("footer.pages")}</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 text-sm md:grid-cols-1">
            {tabs.map((tab) => (
              <li key={tab.key}><Link href={tab.href} className="tap hover:text-uda-500">{t(`nav.${tab.key}`)}</Link></li>
            ))}
          </ul>
        </nav>
        <div className="space-y-6">
          <div>
            <p className="kicker">{t("footer.channels")}</p>
            <ul className="mt-3 text-sm">
              {CHANNELS.map((id) => {
                const s = getSource(id);
                return <li key={id}><a href={s.url} target="_blank" rel="noopener noreferrer me" className="tap hover:text-uda-500">{s.outlet}: {s.title}</a></li>;
              })}
            </ul>
            <p className="mt-1 text-xs text-white/70">{t("footer.channelsNote")}</p>
          </div>
          <LiteToggle />
        </div>
      </div>
      <div className="shell relative border-t border-white/15 py-5 text-xs text-white/75">{rich(t("footer.paidFor"))}</div>
    </footer>
  );
}
