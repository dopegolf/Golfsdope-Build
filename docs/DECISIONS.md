# Decision Log

Record of approved decisions. Each entry is final unless a reversal
trigger is met and Ronnie approves the change.

---

## Template

### DECISION-[NUMBER]: [Title]
- **Date:** YYYY-MM-DD
- **Owner:** [who made the call]
- **Status:** Approved / Reversed / Superseded
- **Context:** [why this decision was needed]
- **Decision:** [what was decided]
- **Alternatives considered:** [what else was on the table]
- **Evidence:** [data, research, or reasoning]
- **Reversal triggers:** [conditions that would reopen this decision]
- **Related:** [links to issues, PRs, or other decisions]

---

## Active Decisions

### DECISION-001: Crowned DG monogram is the current brand mark
- **Date:** 2026-07-22
- **Owner:** Ronnie
- **Status:** Approved
- **Context:** Asset folders contained conflicting logo systems (crowned crest vs. an older "no crown" locked decision in Project Docs).
- **Decision:** The crowned gold DG monogram is current. A clean generated version lives at `dope-golf-site/public/assets/dg-crown.png` (transparent, web-ready).
- **Alternatives considered:** Crown-free minimalist "Dope Golf Co." system (dope_golf_logo_2.png style).
- **Evidence:** Ronnie's direct instruction describing the crowned crest, plus "remake the DG with a Crown" on 2026-07-22.
- **Reversal triggers:** Ronnie requests a rebrand.
- **Related:** Supersedes the "no crown" note in DOPE_GOLF_MASTER_BUILD_BRIEF.md §1.

### DECISION-002: Site is a coded static site, not Hostinger Website Builder
- **Date:** 2026-07-22
- **Owner:** Ronnie (approved in AskUserQuestion)
- **Status:** Approved
- **Context:** Scroll-driven motion couldn't be built in the drag-and-drop builder.
- **Decision:** Vite + TypeScript static site in `dope-golf-site/`, deployed to the Hostinger Business hosting plan (Phoenix DC). Builder site preserved but detached.
- **Reversal triggers:** Need for non-technical in-place editing outweighs custom motion.
- **Related:** PR #1; cutover record in HANDOFF.md.

### DECISION-003: Tagline hierarchy — "Higher Vibes • Lower Scores" primary
- **Date:** 2026-07-22
- **Owner:** Ronnie
- **Status:** Approved
- **Context:** Older brief had "Play Dope. Stay Dope." as core tagline.
- **Decision:** Hero/primary: "Higher Vibes • Lower Scores". Secondary/embroidered: "Play Dope. Stay Dope."
- **Reversal triggers:** Brand voice revision.

### DECISION-004: Pre-launch posture — no selling, no claims
- **Date:** 2026-07-22
- **Owner:** Ronnie
- **Status:** Approved
- **Context:** Products not finished; site must read "welcome / join the movement / dope things are coming."
- **Decision:** No shop links, no product/inventory/date claims; collections shown as "Coming Soon"; primary CTA is VIP email capture.
- **Reversal triggers:** First drop becomes purchasable.

### DECISION-005: Lifestyle art is Higgsfield-generated until real shoot
- **Date:** 2026-07-22
- **Owner:** Ronnie
- **Status:** Approved
- **Context:** No usable real photography existed (see Photo_Inventory_2026-07-20.md); Ronnie rejected folder graphics as "clip art."
- **Decision:** All site lifestyle imagery generated via Higgsfield soul_2, people-first, black/gold desert editorial. Must be QA'd for third-party logos and garbled text before use.
- **Reversal triggers:** Real shoot delivers (Hero_Shoot_Plan_2026-07-20.md) — replace AI imagery then.
