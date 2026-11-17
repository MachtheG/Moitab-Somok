import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SectionHeading } from "@/components/shared/section-heading";
import { news } from "@/data/news";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "news.meta" });
  return { title: t("title"), description: t("description") };
}

/** Only verified items the campaign has cleared render (data/news.ts). */
export default async function NewsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("news");
  const shown = news
    .filter((n) => n.verified && (n.campaignApproval === "approved" || n.campaignApproval === "not-needed"))
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
  const pending = news.filter((n) => !n.verified || n.campaignApproval === "pending").length;
  return (
    <div className="shell py-14">
      <SectionHeading as="h1" kicker={t("hero.kicker")} title={t("hero.title")} lede={t("hero.body")} filled={2} />
      {shown.length ? (
        <ul className="mt-10 divide-y divide-black/10 border-y border-black/10">
          {shown.map((n) => (
            <li key={n.id}>
              <a href={n.url} target="_blank" rel="noopener noreferrer" className="group grid gap-2 py-6 sm:grid-cols-[10rem_1fr_auto]">
                <span className="font-mono text-xs text-black/70">{n.date} · {n.outlet}</span>
                <span className="text-lg">{t(`items.${n.id}`)}</span>
                <span className="flex items-center gap-1 text-sm font-semibold">{t("readAt", { outlet: n.outlet })}<ArrowUpRight size={16} aria-hidden /></span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 text-lg">{t("empty")}</p>
      )}
      {pending > 0 && (
        <div className="mt-10 rounded-2xl border border-dashed border-black/30 p-6">
          <h2 className="font-display text-xl font-bold">{t("pendingTitle")} ({pending})</h2>
          <p className="mt-2 text-black/75">{t("pendingBody")}</p>
        </div>
      )}
    </div>
  );
}
