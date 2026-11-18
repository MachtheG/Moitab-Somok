"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export type WardView = {
  slug: string; name: string; color: string; registered: string; share: string; entries: number; intro: string; code: string;
  photo: { src: string; credit: string; source: string } | null;
};

/** Details for the selected ward. Server-formatted values only. */
export function WardPanel({ ward }: { ward: WardView }) {
  const t = useTranslations("wards");
  return (
    <div id="ward-panel" className="scroll-mt-24 overflow-hidden rounded-3xl border-2 border-black" aria-live="polite">
      {ward.photo && (
        <div className="relative aspect-[16/7]">
          <Image src={ward.photo.src} alt={t("landPhoto")} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          <a href={ward.photo.source} target="_blank" rel="noopener noreferrer" className="absolute bottom-2 right-2 rounded-full bg-black/70 px-2 py-0.5 text-[10px] text-white">{t("landPhoto")} · © {ward.photo.credit}</a>
        </div>
      )}
      <div className="p-5">
        <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest"><span className="size-3 rounded-full border border-black" style={{ backgroundColor: ward.color }} />{t("code", { code: ward.code })}</p>
        <h2 className="mt-1 font-display text-3xl font-bold">{ward.name}</h2>
        {!ward.intro.includes("[[TO CONFIRM") && <p className="mt-1 text-black/75">{ward.intro}</p>}
        <dl className="mt-4 grid grid-cols-3 gap-3">
          <div><dt className="text-xs text-black/70">{t("registered")}</dt><dd className="font-display text-2xl font-extrabold">{ward.registered}</dd></div>
          <div><dt className="text-xs text-black/70">%</dt><dd className="font-display text-2xl font-extrabold">{ward.share}</dd></div>
          <div><dt className="text-xs text-black/70">NG-CDF</dt><dd className="font-display text-2xl font-extrabold">{ward.entries}</dd></div>
        </dl>
        <Link href={`/wards/${ward.slug}`} className="tap mt-4 rounded-full bg-black px-5 font-semibold text-white">{t("explore", { name: ward.name })}</Link>
      </div>
    </div>
  );
}
