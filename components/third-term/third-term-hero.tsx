import { ArrowDown } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function ThirdTermHero() {
  const t = await getTranslations("third-term.hero");
  const c = await getTranslations("common");
  return (
    <section className="shell flex min-h-[70svh] flex-col justify-center py-16">
      <p className="kicker">{t("kicker")}</p>
      <h1 className="display-xl mt-4 max-w-5xl">{t("title")}</h1>
      <p className="mt-4 font-display text-2xl font-bold text-forest-600">{c("slogan")}</p>
      <a href="#act-promise" className="tap mt-10 gap-2 self-start font-semibold"><ArrowDown size={18} aria-hidden />{t("scroll")}</a>
    </section>
  );
}
