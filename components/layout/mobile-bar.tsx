import { useTranslations } from "next-intl";
import { BookOpenCheck, HandHeart, Home, Sparkles } from "lucide-react";
import { MenuSheet } from "./menu-sheet";
import { NavLink } from "./nav-link";

const ITEMS = [
  { key: "home", href: "/", Icon: Home },
  { key: "record", href: "/record", Icon: BookOpenCheck },
  { key: "thirdTerm", href: "/third-term", Icon: Sparkles },
  { key: "getInvolved", href: "/get-involved", Icon: HandHeart },
] as const;

/** Thumb-reachable bottom navigation on phones. */
export function MobileBar() {
  const t = useTranslations("common.nav");
  return (
    <nav aria-label={t("mobile")} className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur sm:hidden">
      <ul className="flex">
        {ITEMS.map(({ key, href, Icon }) => (
          <li key={key} className="flex flex-1">
            <NavLink href={href} className="flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 text-center text-xs font-medium leading-tight text-black/80" activeClassName="font-semibold text-black [&>svg]:text-forest-600">
              <Icon size={20} aria-hidden />
              {t(key)}
            </NavLink>
          </li>
        ))}
        <li className="flex flex-1"><MenuSheet variant="bar" /></li>
      </ul>
    </nav>
  );
}
