# Creative Direction: "Mara ya Tatu"

## The idea in one line
**Two filled dots, one waiting.** Everything on the site is built from the same simple device: ● 2017 ● 2022 ○ 2027. The visitor's scroll, the countdown and finally the vote fill the third dot.

## Who we design for
A voter in Chilchila, Kipkelion, Kamasian or Kunyak on a mid-range Android phone (≈ 360–412 px wide, 3–4 GB RAM) over mobile data, often in bright daylight, often shared from a WhatsApp link. Second audience: journalists and party officials on desktop who want sourced numbers fast.

Consequences: the first screen must be meaningful within 2 s on slow 4G. Text must stay readable in sunlight (high-contrast black/white/yellow, no mid-grey body text). Every number must carry its source on tap.

## Palette in use (from docs/COLOR-LOCK.md, no new hues)
The UDA palette is the inherited one: we use it with more discipline, not more colours.

| Role | Colour | Where |
|---|---|---|
| Day canvas | `#FFFFFF`, `#FAFAFA` | Record, wards, forms. Readable, factual |
| Night canvas | `#002900` / `#003D00` | Hero, the three acts, split-flap board. The hills at dusk |
| Signal | `#FFC700` | The filled dot, the third numeral, primary CTA. **Used sparingly: one yellow thing per screen** |
| Ink | `#000000` | Type on day canvas; type on yellow |
| Gold ink | `#8A6900` | Kickers, source badges, small labels on white |
| Growth | `#008000` | Data "up" states, ward Chilchila, secondary CTA |
| Ramp | `#D4B054 → #4D3D00` | Ordinal data only (NG-CDF years, sectors) |

Rule of thumb: day pages are white with black ink and one yellow accent. Night sections are deep green with white ink and one yellow accent. Never yellow on white for text.

## Type
- **Display: Bricolage Grotesque** (variable, wght 200–800, opsz 12–96, Google Fonts via `next/font`). It has a hand-cut, slightly agricultural warmth, and its numerals are wide and confident, which suits a giant "3". Weight animates 300 → 800 as the hero numeral resolves. Fallback: system-ui bold.
- **Body: Instrument Sans** (variable). Quiet, very legible at 15–17 px on small screens, with good Latin-extended coverage for Kiswahili.
- **Data: JetBrains Mono** (inherited) for tabular figures, source badges and the split-flap board.
- Scale (mobile → desktop, fluid `clamp`): 14 / 16 / 18 / 22 / 28 / 40 / 64 / 120 / display-numeral 70vh.
- Only two font files on first load (display + body subsets). Mono loads lazily on routes that need it.

## Signature systems

### 1. Hat-Trick dots
Three 12 px circles, 8 px apart. Filled = `#FFC700` (on night) or `#000000` (on day), with a 1.5 px ring in the same colour. Empty = ring only. Years set below them in mono at 11 px.
Used in: header (fills as the page scrolls: the third dot fills at 100% of the page), section markers ("Act I ● ○ ○"), loaders (dots fill in sequence), favicon (two filled + ring), OG cards, the bullet of every list.
Reduced motion: the dots render already in their state, with no fill animation.

### 2. Numeral Hero
Full viewport, night canvas. A single "3" in Bricolage at 800 weight, about 85vh tall, centred slightly right. On desktop his portrait is masked inside the numeral (CSS `mask-image` with an SVG text mask, so no canvas cost). Scroll 0 → 60% scales the mask up until the "3" opens into the full portrait. The headline then sets in, word by word, EN/SW.
Mobile: no scroll-driven mask. The "3" is an inline SVG with the portrait as `<image>` inside a `<clipPath>`, fading to the full photo on first scroll (one opacity transition). Lite mode: static portrait plus a solid yellow "3", no mask.
Until a real portrait arrives: the "3" is filled with the contour-line texture and carries a quiet "PHOTO: hero-portrait" slot label.

### 3. Three-act story (`/third-term`)
Three pinned chapters, each one screen: **Act I · 2017 · The Promise**, **Act II · 2022 · The Proof**, **Act III · 2027 · The Finish**. Each act has one photo (full bleed, duotone in deep green and white via a CSS filter, not new colour), one sentence (≤ 18 words), and one hard number with a source badge. The hat-trick dots in the corner fill act by act. Pinning uses CSS `position: sticky` (no scroll-jacking library). Native scroll is never hijacked.

### 4. Hills & harvest textures
Topographic contour lines, inspired by the Kipkelion hills and drawn as abstract generated SVG paths (not real survey data), stroked at 1 px in `#FFC700` at 18% on night, or `#000000` at 6% on day. They animate their `stroke-dashoffset` slowly (40 s loop) on desktop only. Coffee-cherry motif: clusters of two or three circles (echoing the dots) as section dividers. Dairy motif: a single soft-cornered pail silhouette used only in the ward explorer legend. All SVG, all under 4 KB.

### 5. Split-flap countdown
NEXT STOP: TERM 3 · 10.08.2027. Black tiles, white JetBrains Mono digits, a hairline hinge. Each digit flips with a 3D `rotateX` in two halves (≈ 260 ms). Click sound off by default (toggle with a speaker icon, a 1.4 KB WAV). Reduced motion: digits cross-fade. The header pill shows a compact "D-266" version on every page.

### 6. Where the money went (Sankey)
NG-CDF approved total → sectors (and wards once the campaign supplies school→ward mapping; see DECISIONS D-007). Bands use the ramp, sorted by size, labelled directly (no legend). Tap a band to open a bottom sheet listing the approved projects with amounts and the source PDF link. Copy always says "approved for Kipkelion West", never "he built".

### 7. Ward Explorer
A stylised four-shape map (abstract, not survey-accurate, labelled "schematic"). Each ward has its locked colour plus a black outline (≥ 3:1). Tap a ward to see registered voters (2022), NG-CDF entries that name it, a photo slot of him in that ward, and a local quote slot (consented quotes only).

### 8. Kinetic bilingual type
The EN/SW toggle cross-fades headlines in place (`AnimatePresence` on keyed text) while the URL locale updates through the View Transitions API, so the page doesn't reload. Body copy swaps instantly.

### 9. Share cards
`next/og` cards at 1080×1080 (WhatsApp) and 1200×630 (OG): night canvas, one number at display size, a one-line label, the hat-trick dots, his portrait slot, and the source in small mono. Generated per stat id and per act.

## Layout grammar: threes
- Triptychs: three-column stat bands (mobile: horizontal snap carousel with dot indicators).
- Three-act scroll on the third-term page; three-beat home page (Who · What he did · What's next).
- Section numbering "01 / 02 / 03" restarts per page; never more than three primary CTAs on a screen.

## Motion principles
- Ease: `cubic-bezier(0.16, 1, 0.3, 1)` (out-expo) for entrances; `cubic-bezier(0.65, 0, 0.35, 1)` for state changes. Durations 180 / 260 / 420 / 700 ms.
- Animate only `transform` and `opacity` (plus `stroke-dashoffset` for SVG lines).
- Staggered reveals at 60 ms. Magnetic CTAs on pointer:fine only. View Transitions between tabs (cross-fade + header persistence).
- `prefers-reduced-motion`: no scroll-linked motion, no flips, no contour animation; content is never hidden behind an animation.
- **Lite mode** (toggle in the footer and the header menu, remembered in a cookie, auto-suggested when `navigator.connection.saveData` or `effectiveType` is 2g/3g): no motion, no hero mask, images at 50% quality, no web fonts beyond the body face.

## Performance budget (mobile, slow 4G)
LCP < 2.0 s · CLS < 0.05 · INP < 200 ms · first-load JS ≤ 130 KB gz per route · hero image ≤ 90 KB AVIF. Lighthouse mobile ≥ 95 in all four categories.

## Voice
Plain, warm, specific. Kiswahili first-class, not translated as an afterthought. Never superlatives without a number. Never a claim without a source badge. The honesty is the brand: "Here is what was approved, here is the document."

## What we will not do
- No stock crowds, no fake testimonials, no AI faces.
- No dark patterns in forms; consent is explicit and unticked by default.
- No attacks on opponents; record-led only.
- No horizontal scroll, no autoplay audio, no scroll-jacking.
