"use client";

import { useRef, useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { ROLES, WARDS, type FormKind } from "@/lib/forms/schema";
import { cn } from "@/lib/utils";

/** Pledge / volunteer / contact form. Server validates again (app/api/forms/[kind]). */
export function CampaignForm({ kind, cta, success, wardNames, variant = "primary" }: { kind: FormKind; cta: string; success: string; wardNames: Record<string, string>; variant?: "primary" | "forest" }) {
  const t = useTranslations("get-involved");
  const locale = useLocale();
  const started = useRef(Date.now());
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [errors, setErrors] = useState<string[]>([]);

  /** Show errors, then move focus to the first one so phone users see it. */
  function fail(fields: string[]) {
    setErrors(fields);
    setState("idle");
    requestAnimationFrame(() => {
      const el = document.getElementById(`${kind}-${fields[0]}`) ?? document.getElementById(`${kind}-alert`);
      el?.focus();
      el?.scrollIntoView({ block: "center", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    });
  }

  /** Cheap checks before the network round trip (server validates again). */
  function precheck(fd: FormData) {
    const bad: string[] = [];
    if (String(fd.get("name") ?? "").trim().length < 2) bad.push("name");
    if (!/^(?:\+?254|0)(?:7|1)\d{8}$/.test(String(fd.get("phone") ?? "").replace(/[\s-]/g, ""))) bad.push("phone");
    if (!fd.get("ward")) bad.push("ward");
    const email = String(fd.get("email") ?? "").trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) bad.push("email");
    if (kind === "contact" && String(fd.get("message") ?? "").trim().length < 5) bad.push("message");
    if (fd.get("consent") !== "on") bad.push("consent");
    return bad;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const bad = precheck(fd);
    if (bad.length) return fail(bad);
    const body = {
      name: fd.get("name"), phone: fd.get("phone"), email: fd.get("email") ?? "", ward: fd.get("ward"),
      consent: fd.get("consent") === "on", website: fd.get("website") ?? "", startedAt: started.current, locale,
      ...(kind === "volunteer" && { roles: fd.getAll("roles") }),
      ...(kind === "contact" && { message: fd.get("message") }),
    };
    setState("sending");
    setErrors([]);
    try {
      const res = await fetch(`/api/forms/${kind}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const json = (await res.json()) as { ok: boolean; fields?: string[]; error?: string };
      if (json.ok) return setState("done");
      return fail(json.fields ?? [json.error ?? "server"]);
    } catch { return fail(["server"]); }
  }

  if (state === "done") {
    return <p className="flex items-center gap-3 rounded-2xl bg-forest-50 p-6 text-lg font-semibold text-forest-800" role="status"><CheckCircle2 aria-hidden />{success}</p>;
  }
  const err = (f: string) => errors.includes(f) && <p id={`${kind}-${f}-err`} className="text-sm font-semibold text-black underline decoration-uda-500 decoration-2">{t(`errors.${f}`)}</p>;
  const field = "min-h-12 w-full rounded-xl border border-black/30 bg-white px-4 text-base focus:border-black";
  const id = (f: string) => `${kind}-${f}`;
  const invalid = (f: string) => ({ "aria-invalid": errors.includes(f) || undefined, "aria-describedby": errors.includes(f) ? `${kind}-${f}-err` : undefined });

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4">
      <div className="grid gap-1"><label htmlFor={id("name")} className="font-semibold">{t("fields.name")}</label><input id={id("name")} name="name" autoComplete="name" required className={field} {...invalid("name")} />{err("name")}</div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1"><label htmlFor={id("phone")} className="font-semibold">{t("fields.phone")}</label><input id={id("phone")} name="phone" type="tel" inputMode="tel" autoComplete="tel" required className={field} {...invalid("phone")} />{err("phone")}</div>
        <div className="grid gap-1"><label htmlFor={id("ward")} className="font-semibold">{t("fields.ward")}</label>
          <select id={id("ward")} name="ward" required defaultValue="" className={field} {...invalid("ward")}><option value="" disabled>{t("fields.wardPlaceholder")}</option>{WARDS.map((w) => <option key={w} value={w}>{wardNames[w]}</option>)}</select>{err("ward")}</div>
      </div>
      <div className="grid gap-1"><label htmlFor={id("email")} className="font-semibold">{t("fields.email")}</label><input id={id("email")} name="email" type="email" autoComplete="email" className={field} {...invalid("email")} />{err("email")}</div>
      {kind === "volunteer" && (
        <fieldset className="grid gap-2"><legend className="mb-1 font-semibold">{t("volunteer.roles.label")}</legend>
          <div className="flex flex-wrap gap-2">{ROLES.map((r) => (
            <label key={r} className="tap cursor-pointer gap-2 rounded-full border border-black/25 px-4 has-[:checked]:border-black has-[:checked]:bg-uda-100"><input type="checkbox" name="roles" value={r} className="size-4 accent-black" />{t(`volunteer.roles.${r}`)}</label>
          ))}</div>
        </fieldset>
      )}
      {kind === "contact" && <div className="grid gap-1"><label htmlFor={id("message")} className="font-semibold">{t("fields.message")}</label><textarea id={id("message")} name="message" rows={5} required className={cn(field, "py-3")} {...invalid("message")} />{err("message")}</div>}
      <div className="absolute -left-[9999px]" aria-hidden><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <label className="flex items-start gap-3 text-[15px] leading-snug"><input id={id("consent")} type="checkbox" name="consent" className="mt-1 size-5 shrink-0 accent-black" {...invalid("consent")} /><span>{t("fields.consent")} <Link href="/privacy" className="underline">{t("privacyLink")}</Link></span></label>
      {err("consent")}
      {errors.length > 0 && (
        <p id={`${kind}-alert`} tabIndex={-1} role="alert" className="rounded-xl border-2 border-black bg-uda-50 p-3 text-base font-semibold">
          {errors.map((f) => t(`errors.${f}`)).join(" ")}
        </p>
      )}
      <Button type="submit" size="lg" variant={variant} disabled={state === "sending"} className="justify-self-start">{state === "sending" ? "…" : cta}</Button>
    </form>
  );
}
