import { Kicker } from "@kosgei/design-system";

export const Default = () => <Kicker>The record · Kazi Imeonekana</Kicker>;

export const AboveHeadline = () => (
  <div>
    <Kicker>01 · The record</Kicker>
    <h2 className="font-display text-4xl font-bold text-black" style={{ marginTop: 12 }}>
      What two terms look like on paper
    </h2>
  </div>
);
