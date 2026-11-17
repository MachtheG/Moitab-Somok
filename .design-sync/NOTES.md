# design-sync notes: Kosgei 2027 · Mara ya Tatu

- This repo is a Next.js site, not a component library. The synced design system is the mini-package `design-system/` (entry `design-system/index.ts`), built by `npm run build:ds` into `design-system/dist/` (ESM + .d.ts + flat `ds.css`). Build it before every sync.
- Only content-free components are exported (no next-intl, next/image or campaign data). Add new shared components to `design-system/index.ts` to sync them.
- Styling is Tailwind 3 compiled with a safelist of locked-palette and type utilities (`design-system/tailwind.config.ts`). Classes outside the safelist only exist if a component or preview uses them.
- Fonts: OFL subsets (latin, latin-ext) committed in `design-system/fonts/`, declared in `design-system/fonts.css` (wired as `extraFonts`).
- Converter deps (esbuild, ts-morph, playwright) live in `.ds-sync/node_modules`; the cached chromium build is `chromium-1255`.
- Scope of the first sync (2026-11-17, user choice): tokens-first, i.e. palette, type and the six basic components. The real design system (SplitFlap, StatCounter, SourceBadge, PhotoMask, ShareCard…) lands in Phase 3: re-sync then.
- Converter run: `npm run build:ds` → `node .ds-sync/resync.mjs --config .design-sync/config.json --node-modules ./node_modules --entry ./design-system/dist/index.js --out ./ds-bundle [--remote .design-sync/.cache/remote-sync.json]`.
- Playwright 1.65.1 in `.ds-sync/` matches the cached chromium-1255.
- AnimatedCounter previews must pass `animate={false}`: captures happen mid-animation and showed wrong figures (45,733 instead of 52,960). For a campaign, a card with a wrong number is a content error, not a cosmetic one.
- A prop named `animate` shadows motion's `animate` import: it's imported as `animateValue`.
- Button uses `cardMode: "column"` (its cells overflow the grid).

## Known render warns
- `tokens: 1 missing, below threshold`: an unused tailwindcss-animate `--tw-*` variable. Harmless.

## Re-sync risks
- `design-system/dist/` is gitignored: always run `npm run build:ds` before syncing, or the converter reads a stale or missing build.
- The Tailwind safelist in `design-system/tailwind.config.ts` decides which classes designs can use. `conventions.md` names the families it guarantees; if the safelist changes, re-validate every class named there.
- Fonts are committed copies of Google Fonts subsets taken from a Next build (2026-11-17). If `app/[locale]/layout.tsx` changes typefaces, replace `design-system/fonts/` and `fonts.css` to match.
- Colour tokens in `design-system/tokens.css` duplicate docs/COLOR-LOCK.md. Keep them in step (`npm run audit:colors` doesn't scan design-system/ yet).
- Phase 3 will add the real components (SplitFlap, StatCounter, SourceBadge, PhotoMask, ShareCard, Lightbox). Export them from `design-system/index.ts`, author previews, and re-sync.
