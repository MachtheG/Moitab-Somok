import { getLocale, getTranslations } from "next-intl/server";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import type { Stat } from "@/data/record/stats";
import { formatStat } from "@/lib/format";
import { cn } from "@/lib/utils";
import { ShareWhatsApp } from "./share-whatsapp";
import { SourceBadge } from "./source-badge";

/** One sourced statistic: big figure, label, detail, source chips, WhatsApp share. */
export async function StatCard({ stat, tone = "day", share = true, className }: { stat: Stat; tone?: "day" | "night"; share?: boolean; className?: string }) {
  const locale = await getLocale();
  const t = await getTranslations("record.stats");
  const f = formatStat(stat, locale);
  const label = t(`${stat.id}.label`);
  return (
    <article className={cn("flex flex-col gap-3 rounded-2xl border p-5 sm:p-6", tone === "night" ? "border-white/15" : "border-black/10 bg-white", className)} data-reveal>
      <p className={cn("font-display text-5xl font-extrabold leading-none tracking-tighter sm:text-6xl", tone === "night" ? "text-uda-500" : "text-black")}>
        {f.prefix && <span className="mr-1 align-top text-[0.4em] font-bold">{f.prefix.trim()}</span>}
        <AnimatedCounter value={f.numeric} decimals={f.decimals} />
        {f.suffix && <span className="text-[0.55em]">{f.suffix}</span>}
        <span className="sr-only"> ({f.value})</span>
      </p>
      <h3 className="text-base font-semibold leading-snug">{label}</h3>
      <p className={cn("text-sm", tone === "night" ? "text-white/80" : "text-black/70")}>{t(`${stat.id}.detail`)}</p>
      <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
        <SourceBadge ids={stat.sourceIds} confirmed={stat.confirmed} tone={tone} />
        {share && <ShareWhatsApp text={`${f.value}: ${label}`} path={`/record#${stat.id}`} tone={tone} />}
      </div>
    </article>
  );
}
