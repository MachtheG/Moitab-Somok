import { getTranslations } from "next-intl/server";
import { ogCard } from "@/lib/og/card";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Mara ya Tatu: Hilary Kosgei, Kipkelion West";

export default async function OgImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });
  return ogCard({ kicker: "Mara ya Tatu", big: "3", label: t("slogan"), size });
}
