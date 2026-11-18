# Kosgei 2027: "Mara ya Tatu" campaign site

Campaign website for Hon. Hilary Kiplang'at Kosgei, MP for Kipkelion West (Kericho County), seeking a third term in the 10 August 2027 General Election.

Stack: Next.js App Router · TypeScript · Tailwind · Radix/shadcn-style UI · Motion · next-intl (EN/SW).

Key docs: `docs/COLOR-LOCK.md`, `docs/CREATIVE-DIRECTION.md`, `docs/DECISIONS.md`, `docs/CONTENT-NEEDED.md`, `docs/SHOT-LIST.md`, `PROGRESS.md`.

## Project rules

1. **No invented facts.** Never invent facts, figures, quotes, testimonials, endorsements, project outcomes or news coverage. Every claim needs an entry in `data/sources.ts` (title, outlet, date, URL). If something can't be verified, show a visible placeholder `[[TO CONFIRM: …]]` and log it in `PROGRESS.md`.
2. **Photos of Hon. Kosgei:** (updated 2026-11-18 at the site owner's instruction) photos from public sources may be used, but each must be downloaded and self-hosted (never hotlinked), clearly identify the Kipkelion West MP on its source page (another Hillary Kosgei appears in Kericho news), and be credited with its source in `data/photos.ts`. Campaign-supplied photos replace them when available. Never AI-generate images of him or any real person.
3. **No attacks on named opponents.** Use record-led, defamation-safe language.
4. **Colour lock:** only colours in `docs/COLOR-LOCK.md`. Tints/shades must derive from locked hexes; every pairing must pass WCAG AA.
5. **Structure:** one tab = one `page.tsx` + its own `components/<tab>/` folder + its own `messages/{en,sw}/<tab>.json`. One component per file, about 200 lines max.
6. **Every phase ends with** lint, typecheck, tests, build, and a visual check at 375 / 768 / 1440px. Commit after each phase.

## Content guardrails specific to this candidate
- NG-CDF is run by a constituency committee under the NG-CDF Act. Present projects as "NG-CDF projects approved for Kipkelion West". Don't say he personally built them unless a source says so.
- Floor statistics are modest. Don't pad or spin them. Lead with constituency delivery, consistency, two terms of experience and committee work.
- The nickname "Nyiganet" needs explicit campaign approval before it appears in headlines.
- Quote only certified Hansard text, and keep quotes short.
- Ignore the older parliament.go.ke profile that lists "Kipkelion East" and an advocates' firm (suspected data error) unless a second source confirms it.
