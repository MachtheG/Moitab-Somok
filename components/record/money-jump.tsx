import { getTranslations } from "next-intl/server";

/** Small in-tab jump row for the Money tab (three long sections). */
export async function MoneyJump() {
  const t = await getTranslations("record.tabs");
  const items = [["by-year", "byYear"], ["flow", "flow"], ["projects", "projects"]] as const;
  return (
    <nav aria-label={t("moneyJump")} className="shell flex flex-wrap items-center gap-2 pt-6">
      <span className="font-mono text-xs uppercase tracking-widest text-black/70">{t("moneyJump")}</span>
      {items.map(([id, key]) => (
        <a key={id} href={`#${id}`} className="tap rounded-full border border-black/20 px-4 text-sm font-semibold hover:border-black">{t(key)}</a>
      ))}
    </nav>
  );
}
