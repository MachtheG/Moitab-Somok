"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { election } from "@/data/election";
import { getTimeLeft } from "@/lib/countdown";

export function CountdownPill() {
  const t = useTranslations("common.countdown");
  const [days, setDays] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setDays(getTimeLeft(new Date(election.startsAt)).days);
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);
  return (
    <a href="/api/election.ics" className="inline-flex min-h-11 items-center rounded-full bg-black px-3 font-mono text-xs text-white" aria-label={days === null ? t("electionDay") : t("pillLabel", { days })}>
      {days === null ? election.label : t("pill", { days })}
    </a>
  );
}
