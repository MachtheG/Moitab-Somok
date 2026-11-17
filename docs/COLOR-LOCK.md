# Colour Lock

Extracted on 2026-11-17 from the inherited codebase (`tailwind.config.ts`, `app/globals.css`, and every hard-coded hex / `rgba()` in `app/`, `components/`, `data/`, `lib/`, `scripts/`) **before any redesign work**.

**Rule:** only the colours below may appear anywhere in the project. Tints and shades are allowed only if they are built *from these hexes* (alpha over a locked surface, or `color-mix()` of two locked colours). No new hue. Every new text/background pairing must be added to the contrast table and must pass WCAG 2.2 AA (4.5:1 body text, 3:1 large text ≥ 24px / 18.66px bold, UI components and graphics).

The audit command `npm run audit:colors` (added in Phase 3) fails CI on any hex outside this file.

## 1. Hue families

The palette has only three hue families plus neutrals. They are the UDA party colours, which suit the candidate.

| Family | Hue | Hexes |
|---|---|---|
| Yellow / gold | ~47–51° | `uda-*`, `party-yellow`, `party-gold`, `#FFD700`, heat-ramp |
| Green | 120° | `forest-*`, `party-green` |
| Neutral | none | `#000000`, `#FFFFFF`, `onyx-*`, `#FCFCFB` |

## 2. Locked tokens

### Neutrals (`onyx`): light surface scale
| Token | Hex | Role (inherited) |
|---|---|---|
| `onyx-950` / `onyx` / `party-white` | `#FFFFFF` | Page canvas, text on dark |
| `onyx-900` | `#FAFAFA` | Elevated card / scrollbar track |
| `onyx-850` | `#F5F5F4` | Secondary surface |
| `onyx-800` | `#EFEFED` | Tertiary surface |
| `onyx-700` | `#E2E2DF` | Default border, neutral map fill |
| `onyx-600` | `#CACAC6` | Scrollbar thumb, disabled |
| `surface-alt` (heat-map) | `#FCFCFB` | Chart surface |
| `party-black` | `#000000` | Primary text, dark surfaces (footer/header contrast). Used heavily as alpha: `black/10` borders, `black/40–70` secondary text |

### Yellow (`uda`)
| Token | Hex | Role (inherited) |
|---|---|---|
| `uda-50` | `#FFF9E5` | Tint surface |
| `uda-100` | `#FFF0BF` | Tint surface |
| `uda-200` | `#FFE485` | Tint |
| `uda-300` | `#FFD84A` | Tint |
| `uda-400` | `#FFCE1F` | Button hover |
| `uda-500` / `party-yellow` | `#FFC700` | **Brand yellow.** Primary CTA fill, selection, glow `rgba(255,199,0,.5–.6)` |
| `uda-600` | `#E0AE00` | Shade |
| `uda-700` | `#B38A00` | Scrollbar hover |
| `uda-800` / `party-gold` | `#8A6900` | **Gold text on white** (kicker labels). Yellow fails as text on white |
| `uda-900` | `#6B5200` | Deep gold |
| `party-yellow-alt` | `#FFD700` | Second brand yellow (party data swatch, roadmap fill, hero glow `rgba(255,215,0,.10)`) |

### Green (`forest`)
| Token | Hex | Role (inherited) |
|---|---|---|
| `forest-50` | `#E6F5E6` | Tint surface |
| `forest-100` | `#C2E8C2` | Tint |
| `forest-200` | `#8ED28E` | Tint |
| `forest-300` | `#4FB94F` | Tint |
| `forest-400` | `#1F9E1F` | Shade |
| `forest-500` / `party-green` | `#008000` | **Brand green.** Secondary accent, "upcoming" fills |
| `forest-600` | `#006B00` | Shade |
| `forest-700` | `#005200` | Shade |
| `forest-800` | `#003D00` | Deep green surface |
| `forest-900` | `#002900` | Deepest green surface |

### Data ramp (gold, ordinal; from the old heat-map)
| Token | Hex |
|---|---|
| `ramp-1` | `#D4B054` |
| `ramp-2` | `#C29A00` |
| `ramp-3` | `#A07E00` |
| `ramp-4` | `#7A6100` |
| `ramp-5` | `#4D3D00` |

## 3. Contrast table (WCAG 2.x ratio)

✅ AA body (≥ 4.5) · 🔶 AA large / UI only (3.0–4.49) · ❌ fail (< 3.0)

| Foreground \ Background | `#FFFFFF` | `#FAFAFA` | `#F5F5F4` | `#000000` | `#FFC700` | `#008000` | `#003D00` | `#002900` |
|---|---|---|---|---|---|---|---|---|
| `#000000` | ✅ 21.00 | ✅ 20.12 | ✅ 19.25 | — | ✅ 13.42 | 🔶 4.09 | ❌ 1.67 | ❌ 1.32 |
| `#FFFFFF` | — | — | — | ✅ 21.00 | ❌ 1.56 | ✅ 5.14 | ✅ 12.59 | ✅ 15.94 |
| `#FFC700` | ❌ 1.56 | ❌ 1.50 | ❌ 1.43 | ✅ 13.42 | — | 🔶 3.28 | ✅ 8.05 | ✅ 10.19 |
| `#FFD700` | ❌ 1.40 | ❌ 1.34 | ❌ 1.29 | ✅ 14.97 | — | 🔶 3.66 | ✅ 8.98 | ✅ 11.37 |
| `#8A6900` gold | ✅ 5.12 | ✅ 4.91 | ✅ 4.69 | 🔶 4.10 | 🔶 3.27 | ❌ | ❌ 2.46 | 🔶 3.11 |
| `#6B5200` | ✅ 7.42 | ✅ 7.10 | ✅ 6.80 | ❌ 2.83 | ✅ 4.74 | ❌ | ❌ | ❌ |
| `#008000` green | ✅ 5.14 | ✅ 4.92 | ✅ 4.71 | 🔶 4.09 | 🔶 3.28 | — | ❌ | 🔶 3.10 |
| `#006B00` | ✅ 6.77 | ✅ 6.48 | ✅ 6.20 | 🔶 3.10 | 🔶 4.33 | ❌ | ❌ | ❌ |
| `#005200` | ✅ 9.52 | ✅ 9.12 | ✅ 8.72 | ❌ | ✅ 6.08 | ❌ | ❌ | ❌ |
| `#003D00` | ✅ 12.59 | ✅ 12.07 | ✅ 11.54 | ❌ | ✅ 8.05 | ❌ | — | ❌ |
| `#B38A00` | 🔶 3.21 | 🔶 3.07 | ❌ 2.94 | ✅ 6.55 | ❌ | ❌ | 🔶 3.93 | ✅ 4.97 |

Ramp swatches on white (graphics need ≥ 3:1 against the adjacent surface): `#D4B054` ❌ 2.07 · `#C29A00` ❌ 2.65 · `#A07E00` 🔶 3.83 · `#7A6100` ✅ 5.94 · `#4D3D00` ✅ 10.59. **The two lightest ramp steps need a `#7A6100`+ outline, or must sit on `#000000`, when used as data marks.**

On tint surfaces: `#000000` on `#FFF9E5` 19.93 ✅ · on `#E6F5E6` 18.57 ✅ · `#8A6900` on `#FFF9E5` 4.86 ✅ · `#008000` on `#E6F5E6` 4.54 ✅ (just passes; prefer `#006B00`, 5.98).

## 4. Usage rules that follow from the table

1. **Yellow is never text on light surfaces.** Use `#8A6900` (or darker) for gold text on white. Yellow text is fine on black and on deep green.
2. **Text on brand yellow is black.** Never white (1.56).
3. **Text on brand green is white** at ≥ 16px (5.14). Black on green (4.09) is large-text only.
4. **Deep-green surfaces (`#003D00`, `#002900`)** take white or yellow text. They are the "night" surfaces for the hat-trick hero and act chapters.
5. **Body copy on white:** `#000000` at 100%, or black alpha no lower than `black/60` (≈ `#666`, 5.7:1). `black/40` and `black/45` from the inherited code fail AA for body text and are **retired for text**. They stay allowed for borders and decorative rules.
6. **Focus ring:** 2px `#000000` with 2px `#FFC700` offset on light; 2px `#FFC700` on dark/green.
7. **Ward colours** (Ward Explorer, Phase 5): Chilchila `#008000`, Kipkelion `#FFC700`, Kamasian `#003D00`, Kunyak `#8A6900`, each with a black outline so all four reach ≥ 3:1 against white and against each other's edges.

## 5. Changelog
- 2026-11-17: lock created from the inherited code. 34 distinct hexes + 4 `rgba()` derivatives (all alpha of `#FFC700` / `#FFD700`).
