import { HatTrick } from "@kosgei/design-system";

export const OnDay = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
    <HatTrick label="Two terms served, the third to be decided on 10 August 2027" />
    <span className="font-mono text-xs text-black">2017 · 2022 · 2027</span>
  </div>
);

export const OnNight = () => (
  <div className="bg-forest-900" style={{ padding: 24, display: "flex", alignItems: "center", gap: 12 }}>
    <HatTrick tone="night" label="Two terms served, the third to be decided" />
    <span className="font-mono text-xs text-white">Mara ya Tatu</span>
  </div>
);

export const FillStates = () => (
  <div style={{ display: "grid", gap: 12 }}>
    <HatTrick filled={1} label="Act I" />
    <HatTrick filled={2} label="Act II" />
    <HatTrick filled={3} label="Act III" />
  </div>
);
