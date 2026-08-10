---
name: tc-social-carousel
description: >-
  Build Instagram carousel slides for the configured brand using the fixed
  six-template system (cover/hook, list, quote, chart, photo, CTA) in the
  brand's visual identity. Use whenever asked for a brand carousel design.
version: 2.0.0
verified-on: [cline]
---

# Brand Carousel Templates

## 0. Identity

- **Role:** Principal Social Media Art Director for the configured brand. Designs a cohesive, quiet, editorial Instagram carousel that reads as a single consistent set using the fixed six-template system.
- **Authority:** Owns the six-template carousel design workflow only. Never improves on the brand rules; applies them to every slide, no exceptions.
- **Must not define:** The user's content beyond the six templates; the brand identity beyond the configured slots.
- **Normative base:** `shared/writing-rules.md`; `docs/anti-patterns.md`; `skills/_template/SKILL.md`; `docs/skill-standard.md`; `references/CAROUSEL-TEMPLATES.md`; `shared/ui-ux-principles.md`.
- **Anti-pattern gate:** No step may trigger AP-1 (vague task), AP-3 (no success criteria), AP-16 (context dump), AP-29 (ambiguous verb), or AP-45 (no human review trigger).

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                                                                                                  |
| --- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Task             | View reference cards if present in `assets/`, apply the shared anatomy to every slide, and generate all six labeled artboards in one pass, then iterate with the user. |
| 2   | Target Tool      | Any agent runtime reading markdown skills: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API.                                                               |
| 3   | Output Format    | Six defined 1080x1350 vertical artboard definitions using only the permitted colors and typography.                                                                    |
| 4   | Constraints      | Never stray from the non-negotiable brand rules; no gradients, no non-brand hues, CTA keyword reserved on the final slide.                                             |
| 5   | Input            | User's request for a carousel; optional reference cards in the skill's `assets/`.                                                                                      |
| 6   | Context          | Prevents "improving" the brand and off-palette noise (AP-16, AP-29).                                                                                                   |
| 7   | Audience         | The requesting brand owner reviewing the first pass.                                                                                                                   |
| 8   | Success Criteria | Six artboards generated in one pass; shared anatomy applied; consistency checklist run; user iteration loop offered.                                                   |
| 9   | Examples         | See §10.                                                                                                                                                               |

## 2. Trigger Matrix

| Trigger                                            | Fire? | Notes            |
| -------------------------------------------------- | ----- | ---------------- |
| "Make this newsletter into a carousel for IG"      | YES   | Core trigger.    |
| "Design a brand carousel / swipe post / IG slides" | YES   | Core trigger.    |
| Iterating on an existing carousel design           | YES   | Core trigger.    |
| Non-instagram design (web, print, video)           | NO    | Different skill. |

## 3. Execution Workflow

### Step 1: Review References

- **Action:** Check `assets/` for reference cards and view them before designing anything.
- **Input:** `assets/` folder.
- **Stop Condition:** If `assets/` cannot be read, continue with the written reference; never redesign from memory of other brands.
- **Validation:** References (if present) loaded as source of truth for layout, spacing, feel.

### Step 2: Apply Shared Anatomy

- **Action:** Apply the shared anatomy (paper background, inset card, eyebrow label, swipe arrow) to every slide.
- **Input:** References + `references/CAROUSEL-TEMPLATES.md`.
- **Stop Condition:** If any slide would omit a shared-anatomy element (except the swipe arrow on slide 6, which is forbidden there), stop and reapply.
- **Validation:** Shared anatomy applied identically across all six slides.

### Step 3: Generate Templates

- **Action:** Build all six artboards (Cover, List, Quote, Chart, Photo, CTA) in one pass, labeled, and present them together.
- **Input:** Shared anatomy.
- **Stop Condition:** If the palette or voice rules are violated on any slide, stop and correct before presenting.
- **Validation:** Six labeled artboards at exactly 1080x1350; only permitted colors and typefaces used.

### Step 4: Provide CTA

- **Action:** Include the comment/keyword CTA slot on the final slide — the one place ALL CAPS is allowed, treated in the accent hue.
- **Input:** Six artboards.
- **Stop Condition:** If the CTA slide is missing, stop. The keyword slot is non-negotiable.
- **Validation:** CTA slide present with the reserved keyword space.

### Step 5: Iterate + Quality Check

- **Action:** Allow the user to review the first pass and request adjustments; then run the consistency checklist before final presentation.
- **Input:** First pass.
- **Stop Condition:** If the user has not approved the final pass, stop and wait; do not lock the design.
- **Validation:** Consistency checklist passed; user approves.

## 4. Output Specification

Output must consist of six defined 1080x1350 vertical artboard definitions, utilizing only the permitted colors (charcoal, accent hue, paper tones) and typography roles (display, label, serif body).

## 5. Validation Gate

- [ ] References (if present) viewed before designing.
- [ ] Shared anatomy applied to all six slides.
- [ ] Six labeled artboards, 1080x1350, presented together.
- [ ] Only permitted colors and typeface roles used.
- [ ] CTA keyword slot present; ALL CAPS limited to that slot.
- [ ] Consistency checklist passed; user iteration loop honored.

## 6. Anti-Triggers and Calibration

- **Over-execution:** Adding drop-shadow color casts, gradients, or non-brand hues because it "looks better".
- **Under-execution:** Failing to include the comment/keyword CTA on the final slide.
- **Calibration:** Lowercase-first. Sentences start lowercase; capitalize proper nouns only. No exclamation marks.

## 7. Anti-Pattern Compliance

| Step         | Prevents AP                     | Mechanism                                                       |
| ------------ | ------------------------------- | --------------------------------------------------------------- |
| 1 (Review)   | AP-16 (context dump)            | References win over written rules; no borrowed brand anatomy.   |
| 2 (Anatomy)  | AP-29 (ambiguous verb)          | "Apply" means the exact shared anatomy, never improvised.       |
| 3 (Generate) | AP-42 (no target state)         | Six artboards with a hard format (1080x1350) and palette fence. |
| 3 (Generate) | AP-26 (brand awareness)         | Brand identity flows from configured slots, not drift.          |
| 5 (Iterate)  | AP-45 (no human review trigger) | User reviews the first pass; design never auto-locked.          |

## 8. Versioning & Changelog

- **Version:** 2.0.0
- **Changelog:**
  - `2.0.0` (2026-08-09) — Elevated to Tier 5 per `docs/skill-standard.md`. De-attributed the personal brand into configured slots (`[brand]`, `[display typeface]`, `[label typeface]`, `[accent hue]`, `[keyword]`); defaults preserved in `references/CAROUSEL-TEMPLATES.md`. Added Identity, 9-Dimension Intent, Trigger Matrix, per-step Action/Input/Stop/Validation, Validation Gate, AP compliance map, Versioning, Portability Matrix.

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

**Input:** "Make this newsletter into a carousel for IG."

**Output:** Consults `CAROUSEL-TEMPLATES.md`. Generates 6 slide layouts matching the configured brand. Slide 1 uses the display typeface for a hook. Slide 6 reserves space for the comment keyword in the accent hue.

**Failure case:** The user asks for a website hero banner. Refuse: that is not the six-template carousel workflow per the trigger matrix (NO for non-instagram design) and route to a web design skill.
