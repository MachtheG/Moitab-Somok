"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { ContourLines } from "@/components/shared/contour-lines";
import { tabs } from "@/lib/nav";
import { LiteToggle } from "./lite-toggle";
import { NavLink } from "./nav-link";

/** Full-screen night menu with every tab. Opens from the header and the mobile bar. */
export function MenuSheet({ variant = "header" }: { variant?: "header" | "bar" }) {
  const t = useTranslations("common");
  const [open, setOpen] = useState(false);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className={variant === "bar" ? "flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 text-[11px]" : "tap justify-center rounded-full border border-black/15 px-3 text-sm"}
        aria-label={t("nav.more")}
      >
        <Menu size={variant === "bar" ? 20 : 18} aria-hidden />
        <span className={variant === "bar" ? "" : "sr-only sm:not-sr-only sm:ml-2"}>{t("nav.menu")}</span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <Dialog.Content className="night fixed inset-0 z-50 overflow-y-auto">
          <ContourLines />
          <div className="shell relative flex min-h-full flex-col py-5">
            <div className="flex items-center justify-between">
              <Dialog.Title className="kicker">{t("nav.more")}</Dialog.Title>
              <Dialog.Close className="tap justify-center rounded-full border border-white/30" aria-label={t("nav.close")}>
                <X size={20} aria-hidden />
              </Dialog.Close>
            </div>
            <Dialog.Description className="sr-only">{t("meta.siteName")}</Dialog.Description>
            <ul className="mt-8 grid gap-1 sm:grid-cols-2">
              {tabs.map((tab, i) => (
                <li key={tab.key}>
                  <NavLink href={tab.href} onClick={() => setOpen(false)} className="group flex min-h-12 items-baseline gap-4 py-1 font-display text-3xl font-bold text-white sm:text-4xl" activeClassName="text-uda-500">
                    <span className="w-8 font-mono text-xs text-white/60">{String(i + 1).padStart(2, "0")}</span>
                    <span className="group-hover:text-uda-500">{t(`nav.${tab.key}`)}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-10"><LiteToggle /></div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
