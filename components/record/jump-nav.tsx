import { getTranslations } from "next-intl/server";

const SECTIONS = [
  ["numbers", "numbers"],
  ["by-year", "byYear"],
  ["flow", "flow"],
  ["projects", "projects"],
  ["timeline", "timeline"],
  ["committees", "committees"],
  ["hansard", "hansard"],
] as const;

/** Sticky in-page jump row so phone readers can skip straight to a section. */
export async function JumpNav() {
  const t = await getTranslations("record.jump");
  return (
    <nav aria-label={t("label")} className="sticky top-[var(--header-h)] z-30 border-b border-black/10 bg-white/95 backdrop-blur">
      <ul className="shell no-scrollbar flex gap-2 overflow-x-auto py-2 [mask-image:linear-gradient(to_right,#000_88%,transparent)] md:[mask-image:none]">
        {SECTIONS.map(([id, key]) => (
          <li key={id} className="shrink-0">
            <a href={`#${id}`} className="tap rounded-full border border-black/20 px-4 text-sm font-semibold hover:border-black">{t(key)}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
