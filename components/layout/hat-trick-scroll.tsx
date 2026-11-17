"use client";

import { useEffect, useState } from "react";

/** Header dots: 2017 and 2022 filled; the 2027 dot fills as you scroll to the end of the page. */
export function HatTrickScroll({ label }: { label: string }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      setP(max > 0 ? Math.min(1, scrollY / max) : 0);
    };
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  return (
    <span role="img" aria-label={label} className="inline-flex items-center gap-1.5">
      <span className="size-3 rounded-full border-[1.5px] border-black bg-black" />
      <span className="size-3 rounded-full border-[1.5px] border-black bg-black" />
      <span className="relative size-3 overflow-hidden rounded-full border-[1.5px] border-black">
        <span className="absolute inset-0 origin-bottom bg-uda-500 transition-transform duration-150" style={{ transform: `scaleY(${p})` }} />
      </span>
    </span>
  );
}
