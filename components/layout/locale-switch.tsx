"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export function LocaleSwitch() {
  const t = useTranslations("common.locale");
  const locale = useLocale();
  const pathname = usePathname();
  return (
    <Link href={pathname} locale={locale === "en" ? "sw" : "en"} className="inline-flex min-h-11 items-center px-2 text-sm underline-offset-4 hover:underline" aria-label={t("label")}>
      {t("switchTo")}
    </Link>
  );
}
