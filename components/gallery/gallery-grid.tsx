"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import type { Photo, PhotoCategory } from "@/data/photos";
import { cn } from "@/lib/utils";
import { Lightbox } from "./lightbox";

const CATS: (PhotoCategory | "all")[] = ["all", "landscape", "portrait", "community", "parliament", "projects", "campaign", "family"];

export function GalleryGrid({ photos }: { photos: Photo[] }) {
  const t = useTranslations("gallery");
  const locale = useLocale() as "en" | "sw";
  const [cat, setCat] = useState<(typeof CATS)[number]>("all");
  const [open, setOpen] = useState<number | null>(null);
  const shown = photos.filter((p) => cat === "all" || p.category === cat);
  const present = new Set(photos.map((p) => p.category));
  return (
    <div>
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 [mask-image:linear-gradient(to_right,#000_85%,transparent)] md:[mask-image:none]" role="toolbar" aria-label={t("filters.all")}>
        {CATS.filter((c) => c === "all" || present.has(c)).map((c) => (
          <button key={c} type="button" onClick={() => setCat(c)} aria-pressed={cat === c} className={cn("tap shrink-0 rounded-full border px-4 text-sm", cat === c ? "border-black bg-black text-white" : "border-black/25")}>{t(`filters.${c}`)}</button>
        ))}
      </div>
      {shown.length === 0 ? (
        <p className="mt-6 text-black/75">{t("empty")}</p>
      ) : (
        <ul className="mt-6 columns-2 gap-3 md:columns-3">
          {shown.map((p, i) => (
            <li key={p.id} className="mb-3 break-inside-avoid">
              <button type="button" onClick={() => setOpen(i)} className="block w-full overflow-hidden rounded-xl">
                <Image src={p.src} alt={p.alt[locale]} width={p.width} height={p.height} sizes="(min-width: 768px) 33vw, 50vw" className="h-auto w-full" />
              </button>
              <p className="mt-1 text-xs text-black/70">{p.caption[locale]} · {p.credit}{p.license && `, ${p.license.name}`}</p>
            </li>
          ))}
        </ul>
      )}
      {open !== null && <Lightbox photos={shown} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />}
    </div>
  );
}
