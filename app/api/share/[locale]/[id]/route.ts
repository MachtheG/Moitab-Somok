import { getTranslations } from "next-intl/server";
import { stats } from "@/data/record/stats";
import { getSource } from "@/data/sources";
import { chapters } from "@/data/third-term/chapters";
import { formatStat } from "@/lib/format";
import { ogCard } from "@/lib/og/card";

const SIZE = { width: 1080, height: 1080 };

/** WhatsApp-sized share card for a stat id or an act key (promise | proof | finish). */
export async function GET(_req: Request, { params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale: raw, id } = await params;
  const locale = raw === "sw" ? "sw" : "en";
  const stat = stats.find((s) => s.id === id);
  if (stat) {
    const t = await getTranslations({ locale, namespace: "record.stats" });
    return ogCard({ kicker: "Kazi Imeonekana", big: formatStat(stat, locale).value, label: t(`${id}.label`), source: getSource(stat.sourceIds[0]!).outlet, size: SIZE });
  }
  const act = chapters.find((c) => c.key === id);
  if (act) {
    const t = await getTranslations({ locale, namespace: "third-term.acts" });
    return ogCard({ kicker: `${t(`${id}.label`)} · ${t(`${id}.title`)}`, big: act.number.value, label: t(`${id}.numberLabel`), source: getSource(act.number.sourceIds[0]!).outlet, size: SIZE });
  }
  return new Response("Not found", { status: 404 });
}
