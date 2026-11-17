"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

/** Lite mode: no motion, smaller images. Remembered in a cookie; suggested on slow / save-data connections. */
export function LiteToggle() {
  const t = useTranslations("common.lite");
  const [on, setOn] = useState(false);
  const [suggest, setSuggest] = useState(false);
  useEffect(() => {
    setOn(document.documentElement.classList.contains("lite"));
    const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (c && (c.saveData || /2g|3g/.test(c.effectiveType ?? ""))) setSuggest(true);
  }, []);
  const toggle = () => {
    const next = !on;
    setOn(next);
    document.documentElement.classList.toggle("lite", next);
    document.cookie = `lite=${next ? 1 : 0}; path=/; max-age=31536000; samesite=lax`;
  };
  return (
    <div className="space-y-1">
      <label className="tap cursor-pointer gap-3 text-sm">
        <input type="checkbox" checked={on} onChange={toggle} className="size-5 accent-uda-500" />
        {t("toggle")}
      </label>
      {(on || suggest) && <p className="text-xs text-white/80">{on ? t("on") : t("suggest")}</p>}
    </div>
  );
}
