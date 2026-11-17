"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { Photo } from "@/data/photos";

/** Full-screen viewer: arrows, keyboard and swipe. */
export function Lightbox({ photos, index, onClose, onIndex }: { photos: Photo[]; index: number; onClose: () => void; onIndex: (i: number) => void }) {
  const t = useTranslations("gallery.lightbox");
  const locale = useLocale() as "en" | "sw";
  const p = photos[index]!;
  const startX = useRef<number | null>(null);
  const go = (d: number) => onIndex((index + d + photos.length) % photos.length);
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); };
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  });
  return (
    <Dialog.Root open onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/95" />
        <Dialog.Content
          className="fixed inset-0 z-50 flex flex-col text-white"
          onPointerDown={(e) => (startX.current = e.clientX)}
          onPointerUp={(e) => { if (startX.current !== null && Math.abs(e.clientX - startX.current) > 50) go(e.clientX < startX.current ? 1 : -1); startX.current = null; }}
        >
          <Dialog.Title className="sr-only">{p.caption[locale]}</Dialog.Title>
          <div className="flex justify-end p-3"><Dialog.Close className="tap justify-center" aria-label={t("close")}><X /></Dialog.Close></div>
          <div className="relative flex-1"><Image src={p.src} alt={p.alt[locale]} fill sizes="100vw" className="object-contain" /></div>
          <div className="flex items-center justify-between gap-3 p-4">
            <button type="button" onClick={() => go(-1)} className="tap justify-center" aria-label={t("prev")}><ChevronLeft /></button>
            <Dialog.Description className="text-center text-sm">
              {p.caption[locale]}{p.date && ` · ${p.date}`} · {t("credit", { credit: p.credit })}
              {p.license && <> · <a href={p.license.source} target="_blank" rel="noopener noreferrer" className="underline">{t("license", { name: p.license.name })}</a>{p.license.changes && ` (${p.license.changes})`}</>}
            </Dialog.Description>
            <button type="button" onClick={() => go(1)} className="tap justify-center" aria-label={t("next")}><ChevronRight /></button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
