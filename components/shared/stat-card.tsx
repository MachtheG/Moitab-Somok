import { getLocale, getTranslations } from "next-intl/server";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import type { Stat } from "@/data/record/stats";
import { formatStat } from "@/lib/format";
import { cn } from "@/lib/utils";
import { ShareWhatsApp } from "./share-whatsapp";
import { SourceBadge } from "./source-badge";

/** One sourced statistic: big figure, label, detail, source chips, WhatsApp share. */
/**
 * Sourced numbers render at their final value (no count-up): a mid-animation
 * screenshot must never show a wrong figure.
 */
export async function StatCard({ stat, tone = "day", share = true, compact = false, className }: { stat: Stat; tone?: "day" | "night"; share?: boolean; compact?: boolean; className?: string }) {
  const locale = await getLocale();
  const t = await getTranslations("record.stats");
  const f = formatStat(stat, locale);
  const label = t(`${stat.id}.label`);
  return (
    <article className={cn("flex flex-col rounded-2xl border", compact ? "gap-2 p-3.5 sm:gap-3 sm:p-6" : "gap-3 p-5 sm:p-6", tone === "night" ? "border-white/15" : "border-black/10 bg-white", className)} data-reveal>
      <p className={cn("font-display font-extrabold leading-none tracking-tighter", compact ? "text-[1.9rem] sm:text-5xl lg:text-6xl" : "text-5xl sm:text-6xl", tone === "night" ? "text-uda-500" : "text-black")}>
        {f.prefix && <span className="mr-1 align-top text-[0.4em] font-bold">{f.prefix.trim()}</span>}
        <AnimatedCounter value={f.numeric} decimals={f.decimals} animate={false} />
        {f.suffix && <span className="text-[0.55em]">{f.suffix}</span>}
        <span className="sr-only"> ({f.value})</span>
      </p>
      <h3 className={cn("font-semibold leading-snug", compact ? "text-[15px] sm:text-base" : "text-base")}>{label}</h3>
      <p className={cn("text-[15px] leading-snug", compact && "hidden sm:block", tone === "night" ? "text-white/80" : "text-black/75")}>{t(`${stat.id}.detail`)}</p>
      <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
        <SourceBadge ids={stat.sourceIds} confirmed={stat.confirmed} tone={tone} />
        {share && <ShareWhatsApp text={`${f.value}: ${label}`} path={`/record#${stat.id}`} tone={tone} className={compact ? "hidden sm:inline-flex" : undefined} />}
      </div>
    </article>
  );
}
