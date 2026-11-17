import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ActChapter } from "@/components/third-term/act-chapter";
import { CommitmentsList } from "@/components/third-term/commitments-list";
import { MpLetter } from "@/components/third-term/mp-letter";
import { ThirdTermHero } from "@/components/third-term/third-term-hero";
import { WhyThirdTerm } from "@/components/third-term/why-third-term";
import { chapters } from "@/data/third-term/chapters";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "third-term.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function ThirdTermPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <ThirdTermHero />
      <div className="relative">
        {chapters.map((c, i) => <ActChapter key={c.key} chapter={c} index={i} />)}
      </div>
      <WhyThirdTerm />
      <CommitmentsList />
      <MpLetter />
    </>
  );
}
