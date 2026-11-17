export type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

/** Time remaining until `target`, clamped at zero. */
export function getTimeLeft(target: Date, now: number = Date.now()): TimeLeft {
  const diff = Math.max(0, target.getTime() - now);
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}
