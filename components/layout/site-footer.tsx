import { useTranslations } from "next-intl";
import { HatTrick } from "@/components/shared/hat-trick";

export function SiteFooter() {
  const t = useTranslations("common");
  return (
    <footer className="mt-24 bg-forest-900 text-white">
      <div className="mx-auto max-w-6xl space-y-3 px-4 py-12">
        <HatTrick tone="night" label={t("hatTrick.label")} />
        <p className="font-display text-xl">{t("footer.tagline")}</p>
        <p className="text-sm text-white/80">{t("footer.sources")}</p>
        <p className="text-sm text-white/80">{t("footer.paidFor")}</p>
      </div>
    </footer>
  );
}
