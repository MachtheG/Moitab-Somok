import { getTranslations } from "next-intl/server";
import { rich } from "@/lib/rich";

export async function MpLetter() {
  const t = await getTranslations("third-term.letter");
  return (
    <section className="relative z-10 bg-white py-20">
      <div className="shell max-w-3xl">
        <p className="kicker">{t("draftBadge")}</p>
        <h2 className="display-md mt-3">{t("title")}</h2>
        <div className="mt-6 rounded-2xl border border-black/10 bg-onyx-900 p-6 text-lg leading-relaxed">{rich(t("body"))}</div>
        <p className="mt-6 font-display text-xl font-bold">{t("signoff")}</p>
      </div>
    </section>
  );
}
