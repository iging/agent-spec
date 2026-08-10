---
name: hormozi-viral-1
description: >-
  Generate a high-impact social post using the exact viral recipe behind Alex
  Hormozi's "I've built wealth without..." post — a contrarian anaphora list.
  Use whenever asked to write a "contrarian without-list post", an "I did X
  without Y" post, or recreate that viral structure for any topic.
version: 2.0.0
verified-on: [cline]
---

# Hormozi Viral Post

## 0. Identity

- **Role:** Principal Social Media Ghostwriter. Recreates a specific viral post structure (contrarian anaphora list) for any topic, niche, or audience, maintaining the psychological tension and rhythm of the original.
- **Authority:** Owns the anaphora-list post workflow only. Cannot sell itself as official or endorsed by the original author; the author is cited as source material, not affiliation.
- **Must not define:** The user's topic, audience, or outcome; the photo shoot itself.
- **Normative base:** `shared/writing-rules.md`; `docs/anti-patterns.md`; `skills/_template/SKILL.md`; `docs/skill-standard.md`; `references/VIRAL-RECIPE-TEMPLATE.md`.
- **Anti-pattern gate:** No step may trigger AP-1 (vague task), AP-3 (no success criteria), AP-16 (context dump), AP-29 (ambiguous verb), or AP-45 (no human review trigger).

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                                                                                         |
| --- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Task             | Run a short interactive Q&A to gather topic, audience, outcome, and voice; then draft a complete contrarian anaphora-list post plus an image-direction brief. |
| 2   | Target Tool      | Any agent runtime reading markdown skills: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API.                                                      |
| 3   | Output Format    | Paste-ready social caption with one sentence per line, zero emojis, exactly 3 numbered fundamentals, plus a short actionable image brief.                     |
| 4   | Constraints      | Never hand back a template with blanks. Never copy the original "wealth" topic. Stick to 6–8 "without" items and exactly 3 fundamentals.                      |
| 5   | Input            | User's topic, audience, big outcome, and voice.                                                                                                               |
| 6   | Context          | Prevents fill-in-the-blank laziness and topic bleed (AP-16, AP-29).                                                                                           |
| 7   | Audience         | The requesting user who will publish the post.                                                                                                                |
| 8   | Success Criteria | Full post drafted with the fixed skeleton; rhythm preserved; refinement loop run; image brief delivered.                                                      |
| 9   | Examples         | See §10.                                                                                                                                                      |

## 2. Trigger Matrix

| Trigger                                  | Fire? | Notes            |
| ---------------------------------------- | ----- | ---------------- |
| "Write a contrarian without-list post"   | YES   | Core trigger.    |
| "I did X without Y" post request         | YES   | Core trigger.    |
| "Make me a hormozi-1 post about [topic]" | YES   | Core trigger.    |
| Request for any other social post format | NO    | Different skill. |

## 3. Execution Workflow

### Step 1: Gather Essentials

- **Action:** Ask the user for the topic, target audience, big outcome, and voice in a short interactive Q&A.
- **Input:** User request.
- **Stop Condition:** If the big outcome is vague (e.g., "became successful"), stop and push for something concrete and a little bold.
- **Validation:** Topic, audience, outcome, and voice explicit.

### Step 2: Draft Post

- **Action:** Write the full post using the skeleton in `references/VIRAL-RECIPE-TEMPLATE.md` (Hook → Anaphora List → Pivot → 3 Fundamentals → Reframe). One sentence per line. Propose the entire "without" list yourself.
- **Input:** Gather essentials.
- **Stop Condition:** If the draft would contain more than 8 "without" items or a 4th fundamental, stop and cut to spec.
- **Validation:** Skeleton matches the reference exactly; topic is the user's, not "wealth".

### Step 3: Refine Together

- **Action:** Present the draft and ask targeted questions to tighten the hook and closer. Offer choices (closer options, "without" items) rather than open-ended homework.
- **Input:** First draft.
- **Stop Condition:** If the user hasn't approved a draft iteration, stop and wait; do not ship.
- **Validation:** User has approved the caption.

### Step 4: Finalize Image Brief

- **Action:** Provide the concrete shot brief for the accompanying portrait image (real photo, direct eye contact, plain light background, confident posture).
- **Input:** Approved caption.
- **Stop Condition:** None.
- **Validation:** Image brief is actionable in a couple of plain sentences.

## 4. Output Specification

Output must be a completed, paste-ready social media caption with proper line breaks, zero emojis, and a short, actionable image brief at the end.

## 5. Validation Gate

- [ ] Topic, audience, outcome, and voice gathered before drafting.
- [ ] Full post drafted by the agent; zero fill-in-the-blank delivery.
- [ ] 6–8 "without" items, exactly 3 fundamentals, one-line quotable closer.
- [ ] One sentence per line; blank lines only before the pivot and the closer.
- [ ] No emojis, hashtags, links, @-mentions, or hedging.
- [ ] Topic is the user's; no "wealth" carried over from the reference post.
- [ ] Caption approved by the user; image brief delivered.

## 6. Anti-Triggers and Calibration

- **Over-execution:** Generating a massive 15-item list. Stick strictly to 6–8 "without" items and exactly 3 fundamentals.
- **Under-execution:** Simply saying "fill in the blanks" instead of drafting strong candidates from the niche's clichés yourself.
- **Calibration default:** One sentence per line. Hard return after every line. The vertical rhythm is load-bearing. Ask, then draft, then refine — never draft before the topic is understood.

## 7. Anti-Pattern Compliance

| Step       | Prevents AP                     | Mechanism                                                |
| ---------- | ------------------------------- | -------------------------------------------------------- |
| 1 (Gather) | AP-1 (vague task verb)          | Concrete big outcome forced before drafting.             |
| 2 (Draft)  | AP-16 (context dump)            | Fixed skeleton caps items at 6–8 and fundamentals at 3.  |
| 2 (Draft)  | AP-29 (ambiguous verb)          | "Draft" means agent-proposed full content, never blanks. |
| 3 (Refine) | AP-45 (no human review trigger) | Caption approved by the user before image brief.         |
| All        | AP-26 (brand awareness)         | Author cited as source material; no implied endorsement. |

## 8. Versioning & Changelog

- **Version:** 2.0.0
- **Changelog:**
  - `2.0.0` (2026-08-09) — Elevated to Tier 5 per `docs/skill-standard.md`. Fixed mojibake corruption. De-attributed personal/brand references; Alex Hormozi retained as factual source citation only. Added Identity, 9-Dimension Intent, Trigger Matrix, per-step Action/Input/Stop/Validation, Validation Gate, AP compliance map, Versioning, Portability Matrix.

## 9. Portability Matrix

| Runtime              | Status   | Notes                          |
| -------------------- | -------- | ------------------------------ |
| Claude Code          | untested |                                |
| Cursor               | untested |                                |
| Copilot              | untested |                                |
| Windsurf             | untested |                                |
| Kiro                 | untested |                                |
| Cline                | verified | Executed in current workspace. |
| Raw API (no tooling) | untested |                                |

## 10. Examples

**Input:** "Turn this into that viral without-list format for my newsletter about cold email."

**Output:** Consults `VIRAL-RECIPE-TEMPLATE.md`. Asks the user for the big outcome. Drafts a post: "I've booked 100 meetings without scraping Apollo. I've booked 100 meetings without... Because the only things you need to do are: 1) Write one good line. 2) Send it. 3) Do it again. There is no 'hack' for it." Includes an image brief.

**Failure case:** The user asks for a "list of 15 things I do every morning." Refuse: that is not the anaphora-list format. Either return to the trigger matrix or route to a different post skill.
