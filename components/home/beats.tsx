import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { HatTrick } from "@/components/shared/hat-trick";
import { Link } from "@/i18n/navigation";

const BEATS = [
  { key: "one", href: "/journey" },
  { key: "two", href: "/record" },
  { key: "three", href: "/third-term" },
] as const;

/** Three-beat triptych: Who · The record · What's next. */
export async function Beats() {
  const t = await getTranslations("home.beats");
  return (
    <section className="shell py-16 sm:py-24">
      <ol className="grid gap-4 md:grid-cols-3">
        {BEATS.map((b, i) => (
          <li key={b.key} data-reveal>
            <Link href={b.href} className="group flex h-full flex-col rounded-2xl border border-black/10 p-6 transition-colors hover:border-black">
              <HatTrick filled={i + 1} label="" />
              <p className="kicker mt-6">{t(`${b.key}.kicker`)}</p>
              <h2 className="mt-2 font-display text-2xl font-bold leading-tight">{t(`${b.key}.title`)}</h2>
              <p className="mt-3 text-black/75">{t(`${b.key}.body`)}</p>
              <ArrowUpRight className="mt-auto self-end pt-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={36} aria-hidden />
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
