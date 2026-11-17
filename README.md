# Kosgei 2027: Mara ya Tatu

Campaign website for **Hon. Hilary Kiplang'at Kosgei**, MP for Kipkelion West (Kericho County), seeking a third term on **10 August 2027**.

> Status: Phase 1 (audit, colour lock, research, copy). Pages are structural stubs until the Phase 2 designs are approved. See `PROGRESS.md`.

## Stack
Next.js 15 (App Router) · TypeScript · Tailwind 3 · Radix + cva · Motion · next-intl (EN/SW) · Zod · Vitest.

## Folder map
```
app/[locale]/<tab>/page.tsx   one page per tab (EN at /, SW at /sw)
app/api/election.ics          calendar invite for election day
components/<tab>/             components for that tab only
components/{layout,shared,ui} shell, cross-tab pieces, primitives
data/sources.ts               every source; all claims cite an id here
data/record/                  stats, timeline, committees, Hansard, NG-CDF
data/raw/ngcdf/               NG-CDF Board PDFs (originals)
data/wards/ data/third-term/  ward data; acts + DRAFT commitments
messages/{en,sw}/<tab>.json   all copy (one file per tab + common)
scripts/                      parse-ngcdf, check-*, audit-colors, optimize-images
docs/                         COLOR-LOCK, CREATIVE-DIRECTION, DECISIONS, SHOT-LIST, CONTENT-NEEDED
.claude/agents/               fact-checker, design-critic
```

## Commands
| | |
|---|---|
| `npm run dev` | local dev server |
| `npm run check` | translations + sources + colour audit + typecheck + lint + tests |
| `npm run build` | production build |
| `npm run parse:ngcdf` | re-parse `data/raw/ngcdf/*.pdf` → `data/record/ngcdf-projects.ts` (needs `pdftotext`) |
| `npm run images` | optimise photos in `photos-inbox/` → `public/photos/` and print manifest entries |

## Adding photos
Only campaign-supplied or licensed photos (see `CLAUDE.md`). Drop originals in `photos-inbox/`, run `npm run images`, paste the printed entries into `data/photos.ts`, and fill in alt text, captions (EN + SW), date, ward and credit.

## Editing content
- Copy lives in `messages/en/*.json` and `messages/sw/*.json`. Keys must match: `npm run check:translations` fails otherwise.
- Any new fact needs a source in `data/sources.ts`. Unknown facts use `[[TO CONFIRM: …]]` and get logged in `PROGRESS.md`.
- Colours: only those in `docs/COLOR-LOCK.md` (`npm run audit:colors`).

## Deploying to Vercel
Import the repo in Vercel (framework: Next.js). Set `NEXT_PUBLIC_SITE_URL` to the production URL. Form adapters (Resend/Supabase) are configured with env vars, documented when the forms land in Phase 7.
