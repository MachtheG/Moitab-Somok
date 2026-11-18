import { getTranslations } from "next-intl/server";
import { election } from "@/data/election";

export async function KeyDates() {
  const t = await getTranslations("elections");
  const rows = [...election.milestones.map((m) => ({ key: m.key, date: m.date, confirmed: m.confirmed })), { key: "electionDay", date: election.date, confirmed: true }];
  return (
    <section className="bg-onyx-900 py-10">
      <div className="shell">
        <h2 className="display-md">{t("milestones.title")}</h2>
        <ol className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {rows.map((r) => (
            <li key={r.key} className={`rounded-2xl p-4 ${r.key === "electionDay" ? "bg-black text-white" : "bg-white"}`} data-reveal>
              <p className="font-mono text-sm">{r.date}</p>
              <p className="mt-1 font-display text-lg font-bold leading-tight">{t(`milestones.${r.key}`)}</p>
              {!r.confirmed && <p className="mt-2 text-sm text-black/75">{t("milestones.unconfirmed")}</p>}
            </li>
          ))}
        </ol>
        <div className="mt-6 rounded-2xl border-2 border-black bg-white p-6">
          <h3 className="font-display text-xl font-bold">{t("voter.title")}</h3>
          <p className="mt-1">{t("voter.body")}</p>
          <a href={t("voter.url")} target="_blank" rel="noopener noreferrer" className="tap mt-4 rounded-full bg-uda-500 px-5 font-semibold">{t("voter.cta")}</a>
        </div>
      </div>
    </section>
  );
}
