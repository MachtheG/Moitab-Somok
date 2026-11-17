# Mara ya Tatu: conventions for building with this design system

Campaign design system for Hon. Hilary Kosgei (Kipkelion West, 2027). Theme: the hat-trick, ● 2017 ● 2022 ○ 2027.

## Setup
No provider or wrapper is needed. Components read no context. Load `styles.css` (it carries the tokens, compiled Tailwind classes and the three brand fonts). All components are on `window.KosgeiDS`.

## Colour: locked palette, no other hues
Use only these. Never write other hex values.

| Role | Class | Token |
|---|---|---|
| Day canvas | `bg-white`, `bg-onyx-900` | `var(--surface-day)` |
| Night canvas (hero, acts) | `bg-forest-900` | `var(--surface-night)` |
| Signal (one per screen: filled dot, CTA, key numeral) | `bg-uda-500` / `bg-party-yellow`, `text-party-yellow` | `var(--signal)` |
| Ink | `text-black`, `text-white` on night | `var(--ink)`, `var(--ink-on-night)` |
| Gold text on white (labels, kickers) | `text-party-gold` / `text-uda-800` | `var(--gold-ink)` |
| Growth / secondary | `bg-forest-500`, `text-forest-700` | `var(--color-forest-500)` |
| Tint surfaces | `bg-uda-50`, `bg-forest-50` | |

Scales `uda-50…900`, `forest-50…900` and `onyx-600…950` exist as `bg-`/`text-`/`border-`/`ring-` classes and as `var(--color-<scale>-<step>)`.

Contrast rules: **never yellow text on white** (use `text-party-gold`); text on yellow is black; text on `forest-500` is white; body text on white is `text-black`.

## Type
- `font-display` (Bricolage Grotesque, 200–800) for headlines and big numerals; `font-extrabold` for display numbers.
- `font-sans` (Instrument Sans) for body.
- `font-mono` (JetBrains Mono) for labels, years and source badges. `.kicker` gives the gold, mono, uppercase, widest-tracked label style.
- Sizes `text-xs`…`text-9xl`; tracking `tracking-tightest`…`tracking-widest`.

## Layout
Only the palette and type classes above are guaranteed to be compiled. **Do layout with inline styles** (`style={{ display: "grid", gap: 16, padding: 24 }}`) or `Container` for page-width sections. Don't assume other Tailwind utilities (`p-4`, `gap-4`, `max-w-*`) exist. Motion tokens: `var(--ease-out-expo)`, `var(--dur-1…4)` (180/260/420/700ms). Animate only transform and opacity.

## Components
`Button` (variant: primary | forest | outline | ghost; size: sm | default | lg; `asChild` for links) · `HatTrick` (filled 0–3, tone day | night, required `label`) · `Kicker` · `PillarBadge` (color uda | forest) · `AnimatedCounter` (`animate={false}` to show the final value statically) · `Container`. Per-component docs are in `components/general/<Name>/<Name>.prompt.md`.

## Content rules
Real campaign data only. Never invent numbers, quotes or endorsements; mark unknowns `[[TO CONFIRM]]`. No faces: use a labelled placeholder box for photos of the MP.

## Example
```jsx
const { Button, HatTrick, Kicker, AnimatedCounter } = window.KosgeiDS;
<section className="bg-forest-900" style={{ padding: 32, display: "grid", gap: 16 }}>
  <HatTrick tone="night" label="Two terms served, the third to be decided" />
  <h1 className="font-display text-6xl font-extrabold text-white">Mara ya Tatu.</h1>
  <p className="font-sans text-white">
    <AnimatedCounter value={52960} animate={false} className="font-display text-4xl text-party-yellow" /> registered voters
  </p>
  <div style={{ display: "flex", gap: 12 }}><Button>Pledge your vote</Button><Button variant="outline" className="text-white">See the record</Button></div>
</section>
```
