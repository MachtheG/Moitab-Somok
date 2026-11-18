import { getLocale, getTranslations } from "next-intl/server";
import { SourceBadge } from "@/components/shared/source-badge";
import { register } from "@/data/election";
import { wards } from "@/data/wards";
import { Link } from "@/i18n/navigation";
import { formatInt } from "@/lib/format";

/** Four wards as one proportional bar (2022 register). */
export async function WardsTeaser() {
  const t = await getTranslations("home.wards");
  const w = await getTranslations("wards");
  const locale = await getLocale();
  const total = register[2022];
  return (
    <section className="shell py-10 sm:py-10">
      <h2 className="display-md" data-reveal>{t("title")}</h2>
      <div className="mt-6 flex h-16 overflow-hidden rounded-xl border-2 border-black" role="img" aria-label={wards.map((x) => `${w(`${x.slug}.name`)} ${formatInt(x.registered2022, locale)}`).join(", ")}>
        {wards.map((x) => <div key={x.slug} style={{ width: `${(x.registered2022 / total) * 100}%`, backgroundColor: x.color }} className="border-r-2 border-black last:border-r-0" />)}
      </div>
      <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {wards.map((x) => (
          <li key={x.slug}>
            <Link href={`/wards/${x.slug}`} className="group block rounded-xl p-2 hover:bg-onyx-900">
              <span className="flex items-center gap-2 font-semibold"><span className="size-3 rounded-full border border-black" style={{ backgroundColor: x.color }} />{w(`${x.slug}.name`)}</span>
              <span className="font-mono text-sm text-black/75">{formatInt(x.registered2022, locale)}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <SourceBadge ids={["mzalendo-constituency"]} />
        <Link href="/wards" className="tap font-semibold underline underline-offset-4">{t("cta")}</Link>
      </div>
    </section>
  );
}
