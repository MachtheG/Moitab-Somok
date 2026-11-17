import { useTranslations } from "next-intl";
import { HatTrick } from "@/components/shared/hat-trick";
import { Link } from "@/i18n/navigation";
import { tabs } from "@/lib/nav";
import { CountdownPill } from "./countdown-pill";
import { LocaleSwitch } from "./locale-switch";

/** Phase 1 shell. Final design lands in Phase 4 after Checkpoint 2. */
export function SiteHeader() {
  const t = useTranslations("common");
  return (
    <header className="border-b border-black/10">
      <a href="#main" className="sr-only focus:not-sr-only">{t("nav.skip")}</a>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2">
        <Link href="/" className="inline-flex min-h-11 items-center gap-3 font-display text-lg font-bold">
          <HatTrick label={t("hatTrick.label")} />
          Kosgei
        </Link>
        <div className="flex items-center gap-2">
          <CountdownPill />
          <LocaleSwitch />
        </div>
      </div>
      <nav aria-label={t("nav.menu")} className="mx-auto max-w-6xl overflow-x-auto px-4 pb-2">
        <ul className="flex gap-1 whitespace-nowrap text-sm">
          {tabs.map((tab) => (
            <li key={tab.key}>
              <Link href={tab.href} className="inline-flex min-h-11 items-center px-2 hover:underline">{t(`nav.${tab.key}`)}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
