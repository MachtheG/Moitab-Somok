import { Button } from "@kosgei/design-system";

export const Primary = () => <Button>Pledge your vote</Button>;

export const Variants = () => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
    <Button variant="primary">Pledge your vote</Button>
    <Button variant="forest">Volunteer</Button>
    <Button variant="outline">See the record</Button>
    <Button variant="ghost">Read more</Button>
  </div>
);

export const Sizes = () => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
    <Button size="sm">Small</Button>
    <Button size="default">Default</Button>
    <Button size="lg">Large</Button>
  </div>
);

export const Disabled = () => (
  <div style={{ display: "flex", gap: 12 }}>
    <Button disabled>Pledge your vote</Button>
    <Button variant="outline" disabled>See the record</Button>
  </div>
);

export const AsLink = () => (
  <Button asChild variant="outline">
    <a href="#record">See the record</a>
  </Button>
);
