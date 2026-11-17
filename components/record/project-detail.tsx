import { ArrowLeft } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { ShareWhatsApp } from "@/components/shared/share-whatsapp";
import { SourceBadge } from "@/components/shared/source-badge";
import type { NgcdfProject } from "@/data/record/ngcdf-types";
import { getSource, type SourceId } from "@/data/sources";
import { Link } from "@/i18n/navigation";
import { formatKsh } from "@/lib/format";

export async function ProjectDetail({ project: p }: { project: NgcdfProject }) {
  const t = await getTranslations("record");
  const w = await getTranslations("wards");
  const locale = await getLocale();
  const src = getSource(p.sourceId as SourceId);
  return (
    <article className="shell max-w-3xl py-10">
      <Link href="/record#projects" className="tap gap-2 text-sm font-semibold"><ArrowLeft size={16} aria-hidden />{t("detail.back")}</Link>
      <p className="kicker mt-6">{t("allocations.fyShort", { fy: p.fy })} · {t(`sectors.${p.sector}`)}</p>
      <h1 className="display-md mt-3">{p.name}</h1>
      <p className="mt-6 font-display text-5xl font-extrabold tracking-tight">{formatKsh(p.amount, locale)}</p>
      <p className="mt-1 text-sm text-black/70">{t("detail.approved")} · {t("detail.status")}: {p.status || "—"}</p>
      <dl className="mt-8 grid gap-5 border-t border-black/10 pt-6">
        <div><dt className="kicker">{t("detail.activity")}</dt><dd className="mt-1 text-lg">{p.activity}</dd></div>
        <div><dt className="kicker">{t("detail.sector")}</dt><dd className="mt-1">{t(`sectors.${p.sector}`)}{p.sectorSource === "inferred" && <span className="block text-sm text-black/70">{t("detail.inferredNote")}</span>}</dd></div>
        {p.ward && <div><dt className="kicker">{t("detail.wardNamed")}</dt><dd className="mt-1"><Link href={`/wards/${p.ward}`} className="underline">{w(`${p.ward}.name`)}</Link></dd></div>}
        <div><dt className="kicker">{t("detail.list", { list: p.list, sn: p.sn })}</dt>{p.code && <dd className="mt-1 font-mono text-sm">{t("detail.code")}: {p.code}</dd>}</div>
      </dl>
      <p className="mt-8 rounded-xl bg-onyx-900 p-4 text-sm">{t("detail.neutral")}</p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a href={src.url} target="_blank" rel="noopener noreferrer" className="tap rounded-full bg-black px-4 text-sm font-semibold text-white">{t("detail.sourcePdf")}</a>
        <SourceBadge ids={[p.sourceId as SourceId]} />
        <ShareWhatsApp text={`${p.name}: ${formatKsh(p.amount, locale)} (${p.fy})`} path={`/record/${p.id}`} />
      </div>
    </article>
  );
}
