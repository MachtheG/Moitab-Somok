import { useTranslations } from "next-intl";
import { HatTrick } from "@/components/shared/hat-trick";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("common");
  return (
    <section className="shell flex min-h-[60svh] flex-col items-start justify-center py-16">
      <HatTrick filled={2} label="" />
      <h1 className="display-lg mt-6">404</h1>
      <Link href="/" className="tap mt-6 rounded-full bg-black px-5 font-semibold text-white">{t("nav.home")}</Link>
    </section>
  );
}
