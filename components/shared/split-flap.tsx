"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Volume2, VolumeX } from "lucide-react";
import { election } from "@/data/election";
import { getTimeLeft, type TimeLeft } from "@/lib/countdown";
import { FlapDigit } from "./flap-digit";

const UNITS = ["days", "hours", "minutes", "seconds"] as const;

/** "NEXT STOP: TERM 3 · 10.08.2027" split-flap board. Sound is opt-in. */
export function SplitFlap() {
  const t = useTranslations("common.countdown");
  const [left, setLeft] = useState<TimeLeft | null>(null);
  const [sound, setSound] = useState(false);
  const ctx = useRef<AudioContext | null>(null);

  useEffect(() => {
    const target = new Date(election.startsAt);
    const tick = () => setLeft(getTimeLeft(target));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const click = () => {
    if (!sound) return;
    ctx.current ??= new AudioContext();
    const a = ctx.current, o = a.createOscillator(), g = a.createGain();
    o.frequency.value = 1800; g.gain.setValueAtTime(0.04, a.currentTime); g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + 0.03);
    o.connect(g).connect(a.destination); o.start(); o.stop(a.currentTime + 0.035);
  };

  const pad = (n: number, w = 2) => String(n).padStart(w, "0");
  return (
    <div className="night relative rounded-2xl p-5 sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <p className="kicker">{t("board")} · {election.label}</p>
        <button type="button" onClick={() => setSound((s) => !s)} className="tap justify-center rounded-full text-white/80 hover:text-uda-500" aria-pressed={sound} aria-label={sound ? t("soundOn") : t("soundOff")}>
          {sound ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
      </div>
      <div className="mt-5 grid grid-cols-4 gap-2 sm:gap-4" role="timer" aria-live="off" aria-label={left ? `${left.days} ${t("days")}` : t("electionDay")}>
        {UNITS.map((u, i) => {
          const v = left ? pad(left[u], i === 0 ? 3 : 2) : i === 0 ? "---" : "--";
          return (
            <div key={u} className="flex flex-col items-center">
              <div className="flex gap-[3px] text-[clamp(1.6rem,7vw,3.5rem)]">
                {v.split("").map((c, j) => <FlapDigit key={j} char={c} onFlip={j === v.length - 1 ? click : undefined} />)}
              </div>
              <span className="mt-2 font-mono text-[10px] uppercase tracking-widest text-white/80">{t(u)}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-white/85">{t("electionDay")}</p>
        <a href="/api/election.ics" className="tap rounded-full bg-uda-500 px-4 text-sm font-semibold text-black hover:bg-uda-400">{t("addToCalendar")}</a>
      </div>
    </div>
  );
}
