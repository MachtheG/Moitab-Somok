import { Container, Kicker } from "@kosgei/design-system";

export const PageSection = () => (
  <div className="bg-onyx-900">
    <Container className="py-10">
      <Kicker>03 · What's next</Kicker>
      <h2 className="font-display text-3xl font-bold text-black" style={{ marginTop: 12 }}>
        The third term is for finishing
      </h2>
      <p className="text-base text-black" style={{ marginTop: 8, maxWidth: 560 }}>
        Container centres content, caps it at 1440px and adds responsive side padding.
      </p>
    </Container>
  </div>
);
