import { getTranslations } from "next-intl/server";
import { SplitFlap } from "@/components/shared/split-flap";

export async function CountdownSection() {
  const t = await getTranslations("common.countdown");
  return (
    <section className="shell py-10 sm:py-10" aria-label={t("board")}>
      <SplitFlap />
    </section>
  );
}
