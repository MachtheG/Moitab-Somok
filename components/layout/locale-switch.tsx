"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const LOCALES = ["en", "sw"] as const;

/** Segmented EN | SW toggle with a sliding thumb. Stays on the same page. */
export function LocaleSwitch() {
  const t = useTranslations("common.locale");
  const locale = useLocale();
  const pathname = usePathname();
  const i = LOCALES.indexOf(locale as (typeof LOCALES)[number]);
  return (
    <div role="group" aria-label={t("label")} className="relative grid h-11 w-[5.5rem] grid-cols-2 rounded-full bg-black/[0.07] p-1">
      <span aria-hidden className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-black shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none" style={{ transform: `translateX(${i * 100}%)` }} />
      {LOCALES.map((l) => (
        <Link
          key={l}
          href={pathname}
          locale={l}
          scroll={false}
          aria-label={t(l)}
          aria-current={l === locale ? "true" : undefined}
          className={cn("relative z-10 flex items-center justify-center rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-colors", l === locale ? "text-white" : "text-black/70 hover:text-black")}
        >
          {l}
        </Link>
      ))}
    </div>
  );
}
