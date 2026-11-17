import { PillarBadge } from "@kosgei/design-system";

export const Colors = () => (
  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
    <PillarBadge color="uda">Education</PillarBadge>
    <PillarBadge color="forest">Coffee &amp; dairy</PillarBadge>
  </div>
);

export const InContext = () => (
  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
    <PillarBadge color="uda">Bursaries</PillarBadge>
    <PillarBadge color="uda">Classrooms</PillarBadge>
    <PillarBadge color="forest">Roads</PillarBadge>
    <PillarBadge color="forest">Security</PillarBadge>
  </div>
);
