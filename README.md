# Moitab Somok · Kosgei 2027: Mara ya Tatu

Campaign website for **Hon. Hilary Kiplang'at Kosgei**, MP for Kipkelion West (Kericho County), seeking a third term on **Tuesday 10 August 2027**.

The idea: **● 2017 ● 2022 ○ 2027.** Two terms served; the third dot is the voter's to fill. Every number on the site links to its source; anything unverified is shown as a visible `[[TO CONFIRM]]` gap, never invented.

## Stack
Next.js 15 (App Router) · TypeScript · Tailwind 3 · Radix · Motion · next-intl (English at `/`, Kiswahili at `/sw`) · Zod · Vitest.

## Pages
| Tab | Route | What's there |
|---|---|---|
| Home / Nyumbani | `/` | Numeral hero, three-beat triptych, stat band, split-flap countdown, wards bar |
| The Record / Kazi Imeonekana | `/record`, `/record/[id]` | 14 sourced stats, NG-CDF allocation chart, money-flow chart, 404-line project explorer (URL filters), timeline, committees, Hansard |
| Mara ya Tatu | `/third-term` | Three pinned acts, why a third term, DRAFT commitments, letter |
| Our Wards / Wadi Zetu | `/wards`, `/wards/[ward]` | Schematic ward explorer + four ward pages |
| Gallery, News, Journey, Party, Elections, Get Involved, Contact, Privacy | `/gallery` … `/privacy` | |

## Folder map
```
app/[locale]/<tab>/page.tsx   one page per tab
app/api/forms/[kind]          pledge | volunteer | contact (Zod, honeypot, rate limit, adapters)
app/api/share/[locale]/[id]   1080² WhatsApp share cards (stats and acts)
app/api/election.ics          calendar invite
components/<tab>/             that tab's components; layout/, shared/, ui/ are cross-cutting
data/sources.ts               every source; all claims cite an id here
data/record/                  stats (computed), timeline, committees, Hansard, NG-CDF
data/raw/ngcdf/               NG-CDF Board PDFs (originals)
messages/{en,sw}/<tab>.json   all copy
design-system/                the shareable component package synced to Claude Design
docs/                         COLOR-LOCK, CREATIVE-DIRECTION, DECISIONS, SHOT-LIST, CONTENT-NEEDED
.claude/agents/               fact-checker, design-critic
```

## Develop
```bash
npm ci
cp .env.example .env.local   # optional; defaults work locally
npm run dev                  # http://localhost:3000
npm run check                # translations + sources + colour lock + types + lint + tests
npm run build
```
Other scripts: `npm run parse:ngcdf` (re-parse the NG-CDF PDFs; needs `pdftotext`), `npm run images` (optimise campaign photos), `npm run build:ds` (design-system package).

## Deploy to Vercel
1. Vercel → **Add New → Project** → import this GitHub repo. Framework is detected as Next.js; no build settings to change.
2. Environment variables (see `.env.example`):
   - `NEXT_PUBLIC_SITE_URL`: the production URL, e.g. `https://kosgei2027.co.ke` (without it, the Vercel URL is used).
   - `FORMS_ADAPTER`: `console` until a mailbox or database is ready, then `resend` (plus `RESEND_API_KEY`, `FORMS_TO_EMAIL`, `FORMS_FROM_EMAIL`) or `supabase` (plus `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`).
3. Deploy. Add the custom domain under **Settings → Domains**.
4. Recommended: enable Vercel Firewall rate limiting on `/api/forms/*` (the built-in limiter is per-instance).

## Adding photos
Only campaign-supplied or licensed photos; never press photos or AI likenesses (see `CLAUDE.md`). Drop originals in `photos-inbox/`, run `npm run images`, paste the printed entries into `data/photos.ts`, and fill alt text and captions (EN + SW), date, ward and credit. Use the slot ids from `docs/SHOT-LIST.md` (e.g. `hero-portrait`) and the placeholders switch to the real photo automatically.

## Editing content
- Copy: `messages/en/*.json` and `messages/sw/*.json`. Keys must match (`npm run check:translations`).
- Facts: add the source to `data/sources.ts` first; unknowns stay `[[TO CONFIRM: …]]` and are listed in `docs/CONTENT-NEEDED.md`.
- Colours: only those in `docs/COLOR-LOCK.md` (`npm run audit:colors`).

## Open items
See `docs/CONTENT-NEEDED.md` and `PROGRESS.md`.
