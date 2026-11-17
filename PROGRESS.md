# Progress

## Phases 2–9 (2026-11-17, "finish the project")
- [x] Design system: tokens, hat-trick dots, StatCard, SourceBadge, SplitFlap, SectionHeading, PhotoSlot, ContourLines, ShareWhatsApp, Lightbox; synced to Claude Design (project "Moitab Somok", tokens-first)
- [x] Layout: sticky header with scroll-filling dot, countdown pill, EN⇄SW switch, full-screen menu, thumb-reach mobile bar, footer with Lite mode
- [x] All 12 tabs + /record/[id] (404 projects) + /wards/[ward]
- [x] Forms (Zod, consent, honeypot, time-trap, rate limit, console/Resend/Supabase adapters) + tests
- [x] SEO: metadata, hreflang, sitemap, robots, JSON-LD Person, OG image, WhatsApp share cards
- [x] Security headers; CI (checks + sweep + build); Vercel-ready
- [ ] Lighthouse ≥ 95 not measured (no Lighthouse run in this environment)
- [ ] Phase 2 design canvases skipped (D-018); /review and /security-review not run
- [ ] Real photos, certified Hansard quotes, verified news (see CONTENT-NEEDED)

## Phase 1: Audit, lock & research (2026-11-17)
- [x] Inventory; source repo chosen (D-001)
- [x] `docs/COLOR-LOCK.md` (34 hexes + 4 rgba derivatives, contrast table)
- [x] Previous-candidate purge + package/metadata/README rename
- [x] §2 facts re-verified (table below)
- [x] NG-CDF parser: 4 code lists, 404 project lines, reconciled to printed totals (tests)
- [x] Subagents: fact-checker, design-critic
- [x] EN copy draft + slogans + DRAFT commitments; SW draft
- [ ] Hansard certified quotes (parliament.go.ke Hansard PDFs not yet read)
- [ ] News coverage: only 1 of 10–15 items verified (fetch tool blocked major outlets, D-013)
- [ ] Ward local context (beyond registers): not yet researched

## §2 verification
| Claim | Status | Source |
|---|---|---|
| Name, UDA, Kipkelion West, Kericho | ✅ | parliament-profile, mzalendo-13th |
| Jubilee 2017 | ✅ | wikipedia-constituency (cites IEBC 2017 data report) |
| Education Koru Farm 1981–89, Kericho HS 1989–92, KU BA Econ 1994–98 | ✅ | parliament-profile, mzalendo-13th |
| KEBS board 2015–17 | ✅ | parliament-profile, mzalendo-13th |
| 26,222 votes (Gazette 9950) | ✅ via Mzalendo · gazette PDF not opened | mzalendo-constituency |
| Created for 2013; MPs 2013 Rob Jackson Kipkorir (URP) | ✅ (Wikipedia) | wikipedia-constituency |
| "First three-term MP" | ⚠️ [[TO CONFIRM]] | |
| Registered voters 46,512 → 52,960 (+13.9%) | ✅ | mzalendo-constituency |
| Wards 17,117 / 15,140 / 11,827 / 8,876 | ✅ sums to 52,960 | mzalendo-constituency |
| 12th committees Environment 2017–20, Regional Integration 2020–22 | ✅ | parliament-profile (+ Hansard 15 Oct 2019) |
| 13th: Implementation member, Social Protection vice-chair | ⚠️ [[TO CONFIRM]] Mzalendo only | mzalendo-13th |
| 63 contributions, 2 motions moved, 1 paper, 10/10 divisions | ✅ (Mzalendo method) | mzalendo-13th |
| Bungemeter 99 speeches | ❌ not used: site unreachable | |
| Coffee & dairy | ✅ (Wikipedia; We Effect cited) | wikipedia-constituency |
| NG-CDF 138.2 / 166.6 / 170.5 / 183.0M; total 658.3M; +32.4% | ✅ | mzalendo-ngcdf |
| Election 10 Aug 2027 | ✅ multiple outlets; gazette link pending | iebc-election-date |

## Open [[TO CONFIRM]] items
See `docs/CONTENT-NEEDED.md` → "Facts to confirm". Parser caveat: a handful of rows where the name and activity are separated by a single space may split imperfectly; every row links to its source PDF.
