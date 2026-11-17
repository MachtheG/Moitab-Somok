import { cn } from "@/lib/utils";

/** ● 2017 ● 2022 ○ 2027. `filled` = how many dots are filled (0–3). */
export function HatTrick({ filled = 2, tone = "day", label, className }: { filled?: number; tone?: "day" | "night"; label: string; className?: string }) {
  const ink = tone === "night" ? "border-uda-500 bg-uda-500" : "border-black bg-black";
  return (
    <span role={label ? "img" : undefined} aria-label={label || undefined} aria-hidden={label ? undefined : true} className={cn("inline-flex items-center gap-2", className)}>
      {[0, 1, 2].map((i) => (
        <span key={i} className={cn("size-3 rounded-full border-[1.5px]", ink, i >= filled && "bg-transparent")} />
      ))}
    </span>
  );
}
