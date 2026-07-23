# Handoff

Last updated: 2026-07-22 (evening)
Updated by: COWORK Danni (Claude Code session)

---

## Current Mission
Scroll-driven motion website for Dope Golf (golfsdope.com) — pre-launch
"welcome / join the movement" one-pager. Built as a coded Vite + TypeScript
site in `dope-golf-site/` on branch `feature/dope-golf-scroll-site`.

## Completed Work
- Full single-page site: hero, marquee, Collections (5 lines, "Coming Soon"
  badges, no selling language), The Movement story section, film-strip
  gallery band, VIP email capture, footer with real @DopeGolfCompany socials.
- Art direction v2 after Ronnie's feedback (v1 was "too basic / clip-art"):
  all lifestyle art generated via Higgsfield soul_2 (people-first, golden
  hour, black+gold). 12 generations, ~1.7 credits spent (8.32 remain, free plan).
- QA'd every generated image; regenerated 4 that had garbled AI text or
  third-party logos (Nike/adidas). Desert Classic bottom text cropped out
  with sharp. Remaining shots are logo-clean at display size.
- All assets web-optimized via `npm run optimize:assets` (sharp): page
  photo weight ~2.5MB total.
- TypeScript strict build passes (`npm run build`). No console errors.
  Mobile 375px verified: no overflow, single-column cards, collapsed nav.

## In Progress
- Ronnie visual review of v2 (dev server: `npm run dev` → localhost:5177).

## Blocked
- Higgsfield hero *video* + any future video work: free plan, 8.32 credits —
  video generation needs a top-up. Site uses code motion (parallax, Ken Burns,
  particles) instead; works well.
- badbirdiegolf.com reference study: HTTP 429 rate-limited (twice). Got the
  formula from breezygolf.com + vicegolf.com instead.

## Open Risks
- AI-generated people imagery: fine for pre-launch vibe, but Ronnie may want
  a real shoot (see Hero_Shoot_Plan_2026-07-20.md) before full launch.
- Generated crest-ish embroidery in photos is generic, not the actual DG
  crest. Acceptable at card size; flag if used larger.
- Two logo systems still coexist in the asset folders (crowned crest vs.
  "no crown" locked decision in Project Docs). This build follows Ronnie's
  latest instruction (crowned crest = current). DECISIONS.md not yet updated.

## Exact Next Action
Ronnie reviews localhost:5177. If approved: `git add dope-golf-site && commit`
on `feature/dope-golf-scroll-site`, open PR to main, then decide deployment
path for golfsdope.com (currently on Hostinger builder — needs either static
deploy or replacement).

## Resumption Instructions
- Project: `dope-golf-site/` (Vite + TS, strict). `npm install`, `npm run dev`.
- Asset pipeline: raw brand files in `Dope Golf Images/` + `Dopegolf Website/`;
  curated/optimized copies in `dope-golf-site/public/assets/`.
- Higgsfield MCP: soul_2 for lifestyle images (~0.12 credits each, max 1
  concurrent job on free plan). Always prompt "no logos, no text" and QA for
  Nike swooshes / garbled lettering before use.
