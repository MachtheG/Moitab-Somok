import { ArrowLeft } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { PhotoSlot } from "@/components/shared/photo-slot";
import { SourceBadge } from "@/components/shared/source-badge";
import { ngcdfProjects } from "@/data/record/ngcdf-projects";
import { Link } from "@/i18n/navigation";
import { formatKsh } from "@/lib/format";
import { rich } from "@/lib/rich";
import { wardViews } from "@/lib/wards";

export async function WardDetail({ slug }: { slug: string }) {
  const t = await getTranslations("wards");
  const r = await getTranslations("record");
  const locale = await getLocale();
  const w = wardViews(t, locale).find((x) => x.slug === slug)!;
  const entries = ngcdfProjects.filter((p) => p.ward === slug);
  return (
    <>
      <section className="night relative">
        <div className="shell grid items-end gap-8 py-12 md:grid-cols-[1.4fr_1fr]">
          <div>
            <Link href="/wards" className="tap gap-2 text-sm"><ArrowLeft size={16} aria-hidden />{t("back")}</Link>
            <p className="kicker mt-6 flex items-center gap-2"><span className="size-3 rounded-full border border-white" style={{ backgroundColor: w.color }} />{t("hero.kicker")}</p>
            <h1 className="display-lg mt-3">{w.name}</h1>
            <p className="lede mt-4 text-white/85">{rich(w.intro)}</p>
            <p className="mt-6 font-display text-6xl font-extrabold text-uda-500">{w.registered}</p>
            <p className="text-white/85">{t("registered")} · {t("share", { pct: w.share })}</p>
            <SourceBadge ids={["mzalendo-constituency"]} tone="night" className="mt-4" />
          </div>
          <PhotoSlot slot={`ward-${slug}` as "ward-chilchila"} label={t("photo", { name: w.name })} alt={t("photo", { name: w.name })} className="aspect-[4/5] rounded-3xl" sizes="(min-width: 768px) 33vw, 100vw" />
        </div>
      </section>
      <section className="shell py-10">
        <h2 className="display-md">{t("projects")}</h2>
        {entries.length ? (
          <ul className="mt-6 divide-y divide-black/10 border-y border-black/10">
            {entries.map((p) => (
              <li key={p.id}><Link href={`/record/${p.id}`} className="flex min-h-14 items-center justify-between gap-4 py-2 hover:bg-onyx-900"><span><span className="block font-semibold">{p.name}</span><span className="font-mono text-xs text-black/70">{p.fy} · {r(`sectors.${p.sector}`)}</span></span><span className="shrink-0 whitespace-nowrap font-mono text-sm tabular-nums">{formatKsh(p.amount, locale)}</span></Link></li>
            ))}
          </ul>
        ) : <p className="mt-4">{t("none")}</p>}
        <p className="mt-4 text-sm text-black/70">{t("projectsPending")}</p>
        <div className="mt-6 rounded-2xl border border-dashed border-black/30 p-6 text-black/75">{t("quotePending")}</div>
      </section>
    </>
  );
}
