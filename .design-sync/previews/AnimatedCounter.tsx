import { AnimatedCounter } from "@kosgei/design-system";

export const StatFigure = () => (
  <div>
    <AnimatedCounter value={52960} animate={false} className="font-display text-6xl font-extrabold text-black" />
    <p className="text-sm text-black" style={{ marginTop: 4 }}>Registered voters, 2022</p>
  </div>
);

export const Decimals = () => (
  <div className="bg-forest-900" style={{ padding: 24 }}>
    <span className="font-display text-5xl font-bold text-party-yellow">
      <AnimatedCounter value={13.9} decimals={1} animate={false} />%
    </span>
    <p className="text-sm text-white" style={{ marginTop: 4 }}>Growth in the voter register, 2017–2022</p>
  </div>
);
