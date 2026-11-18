import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CountdownPill } from "./countdown-pill";
import { LocaleSwitch } from "./locale-switch";
import { MenuSheet } from "./menu-sheet";
import { NavLink } from "./nav-link";

const DESKTOP = [
  { key: "record", href: "/record" },
  { key: "thirdTerm", href: "/third-term" },
  { key: "wards", href: "/wards" },
  { key: "journey", href: "/journey" },
  { key: "elections", href: "/elections" },
] as const;

export function SiteHeader() {
  const t = useTranslations("common");
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80" style={{ viewTransitionName: "site-header" }}>
      <a href="#main" className="sr-only z-50 rounded bg-black px-3 py-2 text-white focus:not-sr-only focus:fixed focus:left-2 focus:top-2">{t("nav.skip")}</a>
      <div className="shell flex h-[var(--header-h)] items-center justify-between gap-3">
        <Link href="/" className="tap gap-2.5" aria-label={`${t("brand.name")}, ${t("nav.home")}`}>
          <Image src="/brand/kericho-coat-of-arms.png" alt={t("crest")} width={40} height={40} priority className="size-10 shrink-0 object-contain" />
          <span className="leading-none">
            <span className="block font-display text-base font-extrabold tracking-tight sm:text-lg"><span className="hidden sm:inline">Hilary </span>Kosgei</span>
            <span className="hidden font-mono text-[10px] uppercase tracking-widest text-black/70 sm:block">{t("brand.sub")}</span>
          </span>
        </Link>
        <nav aria-label={t("nav.primary")} className="hidden lg:block">
          <ul className="flex items-center gap-1 text-sm">
            {DESKTOP.map((tab) => (
              <li key={tab.key}>
                <NavLink href={tab.href} className="tap rounded-full px-3 hover:bg-black/[0.05]" activeClassName="bg-black text-white hover:bg-black">{t(`nav.${tab.key}`)}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-1.5">
          <CountdownPill />
          <LocaleSwitch />
          <NavLink href="/get-involved" className="tap hidden rounded-full bg-uda-500 px-4 text-sm font-semibold text-black hover:bg-uda-400 md:inline-flex">{t("nav.getInvolved")}</NavLink>
          <span className="hidden sm:inline-flex"><MenuSheet /></span>
        </div>
      </div>
    </header>
  );
}
