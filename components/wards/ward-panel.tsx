"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export type WardView = { slug: string; name: string; color: string; registered: string; share: string; entries: number; intro: string };

/** Details for the selected ward in the explorer. Server-formatted values only. */
export function WardPanel({ ward }: { ward: WardView }) {
  const t = useTranslations("wards");
  return (
    <div className="rounded-3xl border-2 border-black p-6" aria-live="polite">
      <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest"><span className="size-3 rounded-full border border-black" style={{ backgroundColor: ward.color }} />{t("hero.kicker")}</p>
      <h2 className="display-md mt-2">{ward.name}</h2>
      <p className="mt-2 text-black/75">{ward.intro.includes("[[TO CONFIRM") ? "" : ward.intro}</p>
      <dl className="mt-6 grid grid-cols-2 gap-4">
        <div><dt className="text-xs text-black/70">{t("registered")}</dt><dd className="font-display text-4xl font-extrabold">{ward.registered}</dd></div>
        <div><dt className="text-xs text-black/70">{t("projects")}</dt><dd className="font-display text-4xl font-extrabold">{ward.entries}</dd></div>
      </dl>
      <p className="mt-2 text-sm">{t("share", { pct: ward.share })}</p>
      <div className="mt-6 aspect-[16/9] rounded-2xl bg-onyx-850 p-3 font-mono text-[10px] uppercase tracking-widest text-uda-900">{t("photo", { name: ward.name })}</div>
      <Link href={`/wards/${ward.slug}`} className="tap mt-6 rounded-full bg-black px-5 font-semibold text-white">{t("explore", { name: ward.name })}</Link>
    </div>
  );
}
