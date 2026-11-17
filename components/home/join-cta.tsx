import { getTranslations } from "next-intl/server";
import { ContourLines } from "@/components/shared/contour-lines";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export async function JoinCta() {
  const t = await getTranslations("home.join");
  return (
    <section className="shell">
      <div className="night relative overflow-hidden rounded-3xl px-6 py-14 sm:px-12" data-reveal>
        <ContourLines seed={7} count={9} />
        <div className="relative max-w-2xl">
          <h2 className="display-md">{t("title")}</h2>
          <p className="lede mt-4 text-white/85">{t("body")}</p>
          <Button asChild size="lg" className="mt-8"><Link href="/get-involved">{t("cta")}</Link></Button>
        </div>
      </div>
    </section>
  );
}
