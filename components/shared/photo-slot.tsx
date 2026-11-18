import Image from "next/image";
import { photoForSlot, type PhotoSlot as Slot } from "@/data/photos";
import { cn } from "@/lib/utils";

/**
 * A slot's photo (the MP, or a credited landscape) with a small credit line,
 * or, if none exists, an honest placeholder: an abstract silhouette and the
 * slot label. Never a fake face.
 */
export function PhotoSlot({ slot, label, alt, tone = "night", className, priority, sizes = "100vw", credit = true }: { slot: Slot; label: string; alt: string; tone?: "night" | "day"; className?: string; priority?: boolean; sizes?: string; credit?: boolean }) {
  const photo = photoForSlot(slot);
  if (photo) {
    return (
      <div className={cn("relative overflow-hidden bg-forest-800", className)}>
        <Image src={photo.src} alt={photo.category === "portrait" ? photo.alt.en : alt} fill sizes={sizes} priority={priority} className="object-cover" style={{ objectPosition: photo.focus ?? "50% 50%" }} />
        {credit && photo.license && (
          <a href={photo.license.source} target="_blank" rel="noopener noreferrer" className="absolute bottom-2 right-2 rounded-full bg-black/70 px-2 py-0.5 text-[10px] text-white">
            © {photo.credit}
          </a>
        )}
      </div>
    );
  }
  const night = tone === "night";
  return (
    <div role="img" aria-label={alt} className={cn("relative overflow-hidden", night ? "bg-forest-800" : "bg-onyx-850", className)}>
      <svg viewBox="0 0 200 240" preserveAspectRatio="xMidYMax meet" className="absolute inset-x-0 bottom-0 mx-auto h-[82%] w-auto" aria-hidden>
        <circle cx="100" cy="78" r="42" className={night ? "fill-forest-700" : "fill-onyx-700"} />
        <path d="M18 240c0-52 36-92 82-92s82 40 82 92z" className={night ? "fill-forest-700" : "fill-onyx-700"} />
      </svg>
      <span className={cn("absolute left-3 top-3 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest", night ? "bg-forest-900 text-uda-500" : "bg-white text-uda-900")}>{label}</span>
    </div>
  );
}
