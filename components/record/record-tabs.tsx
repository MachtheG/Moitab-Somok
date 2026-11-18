"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type RecordTab = { id: string; label: string; anchors: string[]; panel: ReactNode };

/**
 * Sticky tab bar: one section group visible at a time. Deep links (#projects,
 * #flow, …) open the right tab and scroll to the anchor. All panels are in the
 * HTML (search engines and no-JS readers see everything).
 */
export function RecordTabs({ tabs, label }: { tabs: RecordTab[]; label: string }) {
  const [active, setActive] = useState(tabs[0]!.id);

  useEffect(() => {
    const sync = () => {
      const h = location.hash.slice(1);
      const tab = tabs.find((t) => t.id === h || t.anchors.includes(h));
      if (!tab) return;
      setActive(tab.id);
      if (h !== tab.id) requestAnimationFrame(() => document.getElementById(h)?.scrollIntoView({ block: "start" }));
    };
    sync();
    addEventListener("hashchange", sync);
    return () => removeEventListener("hashchange", sync);
  }, [tabs]);

  const go = (id: string) => {
    setActive(id);
    history.replaceState(null, "", `${location.pathname}${location.search}#${id}`);
    document.getElementById("record-tabs")?.scrollIntoView({ block: "start" });
  };

  return (
    <div id="record-tabs" className="scroll-mt-[var(--header-h)]">
      <div className="sticky top-[var(--header-h)] z-30 border-b border-black/10 bg-white/95 backdrop-blur">
        <div role="tablist" aria-label={label} className="shell no-scrollbar grid grid-cols-4 gap-1 py-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={active === t.id}
              aria-controls={`panel-${t.id}`}
              onClick={() => go(t.id)}
              className={cn("min-h-11 rounded-full px-2 text-sm font-semibold leading-tight transition-colors", active === t.id ? "bg-black text-white" : "text-black/75 hover:bg-black/[0.06]")}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      {tabs.map((t) => (
        <div key={t.id} id={`panel-${t.id}`} role="tabpanel" aria-labelledby={`tab-${t.id}`} hidden={active !== t.id}>
          {t.panel}
        </div>
      ))}
    </div>
  );
}
