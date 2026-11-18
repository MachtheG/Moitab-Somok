import { getTranslations } from "next-intl/server";
import { SourceBadge } from "@/components/shared/source-badge";
import { party } from "@/data/party";
import { rich } from "@/lib/rich";

export async function PartyHistory() {
  const t = await getTranslations("party");
  return (
    <section className="shell max-w-4xl py-10">
      <h2 className="display-md">{t("history.title")}</h2>
      <ol className="mt-6 grid gap-4 sm:grid-cols-2">
        <li className="rounded-2xl border border-black/10 p-6" data-reveal><p className="font-mono text-xs text-black/70">2017–2022</p><p className="mt-2 font-display text-2xl font-bold">{t("history.jubilee")}</p></li>
        <li className="rounded-2xl border-2 border-black p-6" data-reveal><p className="font-mono text-xs text-black/70">2022–</p><p className="mt-2 font-display text-2xl font-bold">{t("history.uda")}</p></li>
      </ol>
      <SourceBadge ids={party.sourceIds} className="mt-6" />
      <p className="mt-6 text-lg">{rich(t("nomination"))}</p>
      <p className="mt-3 text-black/75">{t("colours")}</p>
    </section>
  );
}
