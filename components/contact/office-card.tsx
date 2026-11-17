import { getTranslations } from "next-intl/server";
import { PhotoSlot } from "@/components/shared/photo-slot";
import { getSource } from "@/data/sources";
import { rich } from "@/lib/rich";

const ROWS = ["address", "phone", "email", "hours"] as const;

export async function OfficeCard() {
  const t = await getTranslations("contact");
  const c = await getTranslations("common");
  return (
    <section className="space-y-6">
      <PhotoSlot slot="contact" label={c("photo.slot", { slot: "contact" })} alt={c("photo.placeholderAlt")} className="aspect-[4/3] rounded-3xl" sizes="(min-width: 1024px) 40vw, 100vw" />
      <div>
        <h2 className="font-display text-2xl font-bold">{t("office.title")}</h2>
        <dl className="mt-3 grid gap-2">
          {ROWS.map((r) => <div key={r}><dd>{rich(t(`office.${r}`))}</dd></div>)}
        </dl>
      </div>
      <div>
        <h2 className="font-display text-2xl font-bold">{t("social")}</h2>
        <ul className="mt-2">
          {(["official-x", "official-facebook"] as const).map((id) => {
            const s = getSource(id);
            return <li key={id}><a href={s.url} target="_blank" rel="noopener noreferrer me" className="tap underline">{s.outlet}: {s.title}</a></li>;
          })}
        </ul>
        <p className="text-sm text-black/70">{c("footer.channelsNote")}</p>
      </div>
    </section>
  );
}
