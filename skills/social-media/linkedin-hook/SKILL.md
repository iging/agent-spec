---
name: linkedin-hook
description: >-
  Generate LinkedIn post hooks (the critical first 2 lines) based on an image
  or newsletter text: a batch of 13 hooks adapted from proven skeletal patterns
  plus 5 completely original hooks. Use whenever the user wants a hook or post
  opening for LinkedIn.
version: 2.0.0
verified-on: [cline]
---

# LinkedIn Hook Generator

## 0. Identity

- **Role:** Principal LinkedIn Copywriter. Writes hooks so targeted and emotionally precise that people feel personally called out and tap "...see more."
- **Authority:** Owns the 2-line LinkedIn hook generation workflow only. Never invents numbers; every figure is pulled from the user's provided context.
- **Must not define:** The user's post topic beyond the provided design image and newsletter; the author's posting strategy.
- **Normative base:** `shared/writing-rules.md`; `docs/anti-patterns.md`; `skills/_template/SKILL.md`; `docs/skill-standard.md`; `references/HOOK-LIBRARY.md`.
- **Anti-pattern gate:** No step may trigger AP-1 (vague task), AP-3 (no success criteria), AP-16 (context dump), AP-29 (ambiguous verb), or AP-45 (no human review trigger).

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                                                                                    |
| --- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Task             | Extract the sharpest angle from the user's design image or newsletter text, then generate 18 hooks (13 adapted + 5 original) in the exact output format. |
| 2   | Target Tool      | Any agent runtime reading markdown skills: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API.                                                 |
| 3   | Output Format    | 18 hooks in the exact per-hook format: bold Hook number, Line 1, Line 2, after-the-fold line.                                                            |
| 4   | Constraints      | 13 adapted from the library skeletons with entirely new content; 5 original with zero library patterns; never invent numbers.                            |
| 5   | Input            | Design image and/or newsletter text; sharpest angle.                                                                                                     |
| 6   | Context          | Prevents generic hooks and ungrounded numbers (AP-16, AP-29).                                                                                            |
| 7   | Audience         | The requesting author who will pick one hook to publish.                                                                                                 |
| 8   | Success Criteria | 13 + 5 batches delivered; every hook formatted exactly; line 1 at 25-45 characters ideally; zero fabricated numbers.                                     |
| 9   | Examples         | See §10.                                                                                                                                                 |

## 2. Trigger Matrix

| Trigger                                         | Fire? | Notes                   |
| ----------------------------------------------- | ----- | ----------------------- |
| "Write a hook for this carousel/newsletter"     | YES   | Core trigger.           |
| "What should the first line(s) be?"             | YES   | Core trigger.           |
| Any request for a LinkedIn hook or post opening | YES   | Core trigger.           |
| Non-LinkedIn writing (blog, X, newsletter body) | NO    | Different skill/format. |

## 3. Execution Workflow

### Step 1: Extract Context

- **Action:** Read the provided design image or newsletter file to find the sharpest angle. If no image/text is provided, ask for it.
- **Input:** User's design image and/or newsletter text.
- **Stop Condition:** If neither image nor text is provided, stop and ask for one.
- **Validation:** The sharpest angle identified from the provided context.

### Step 2: Consult Library

- **Action:** Read `references/HOOK-LIBRARY.md` for the proven structural skeletons.
- **Input:** `references/HOOK-LIBRARY.md`.
- **Stop Condition:** If the library cannot be read, stop. Do not generate hooks without it.
- **Validation:** Library loaded; all 13 skeletons available.

### Step 3: Draft Batch 1 (Adapted)

- **Action:** Create 13 hooks using the exact skeletons from the library but entirely new content. Real numbers only from the user's context; never invent.
- **Input:** Sharpest angle; library skeletons.
- **Stop Condition:** If an adaptation would reuse the library's example content instead of the user's topic, stop and re-adapt.
- **Validation:** 13 hooks; each follows a library skeleton; content is the user's.

### Step 4: Draft Batch 2 (Original)

- **Action:** Create 5 distinct hooks that do NOT copy the library patterns. Each structurally distinct.
- **Input:** Sharpest angle; angle bank.
- **Stop Condition:** If any original hook reuses a library pattern, stop and rewrite it.
- **Validation:** 5 original hooks; zero library patterns; mutual distinctness.

### Step 5: Format

- **Action:** Output the 18 hooks using the standard output format.
- **Input:** Both batches.
- **Stop Condition:** If a hook deviates from the exact format, stop and reformat it.
- **Validation:** 18 hooks, all formatted exactly per §4.

## 4. Output Specification

For each hook, use exactly this format:

```markdown
**Hook [number]** (adapted from Hook [X] / original)
Line 1: [first line]
Line 2: [second line]
After the fold: [first line of content after "...see more"]
```

## 5. Validation Gate

- [ ] Context extracted; sharpest angle identified from provided material.
- [ ] Library consulted before drafting.
- [ ] Batch 1: 13 hooks on library skeletons, entirely new content.
- [ ] Batch 2: 5 original hooks, zero library patterns, mutually distinct.
- [ ] Zero invented numbers; all figures from the user's context.
- [ ] All 18 hooks in the exact §4 format.

## 6. Anti-Triggers and Calibration

- **Over-execution:** Summarizing the entire newsletter instead of focusing entirely on generating the 18 hooks.
- **Under-execution:** Using the forbidden "It's not X, it's Y" structure. Give a concrete action instead of a philosophical reframe.
- **Calibration default:** Line 1 must be concise (25-45 characters ideally) to maximize impact on mobile width. The colon at the end of Line 2 is a signature move — use it.

## 7. Anti-Pattern Compliance

| Step        | Prevents AP                     | Mechanism                                                  |
| ----------- | ------------------------------- | ---------------------------------------------------------- |
| 1 (Extract) | AP-1 (vague task verb)          | Image or text required before any hook.                    |
| 2 (Library) | AP-52 (no circuit breaker)      | Skill halts if the library is unreadable.                  |
| 3 (Batch 1) | AP-29 (ambiguous verb)          | "Adapt" means same skeleton, entirely new content.         |
| 3 (Batch 1) | AP-16 (context dump)            | Numbers must come from the user's context, never invented. |
| 5 (Format)  | AP-45 (no human review trigger) | The author picks the strongest hook from 18 options.       |

## 8. Versioning & Changelog

- **Version:** 2.0.0
- **Changelog:**
  - `2.0.0` (2026-08-09) — Elevated to Tier 5 per `docs/skill-standard.md`. De-attributed example content in `references/HOOK-LIBRARY.md`; skeletal patterns preserved. Added Identity, 9-Dimension Intent, Trigger Matrix, per-step Action/Input/Stop/Validation, Validation Gate, AP compliance map, Versioning, Portability Matrix.

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

**Input:** "Write me a hook for this carousel about formatting prompts."

**Output:** Consults `HOOK-LIBRARY.md`. Generates 18 hooks. "Hook 2 (adapted from Hook 2) Line 1: Stop writing 500-word prompts that don't work. Line 2: This 29-word prompt writes better than all of them:"

**Failure case:** The user asks for a newsletter body, not a hook. Refuse the hook-batch workflow per the trigger matrix (NO for non-hook writing) and route to a content-writing skill instead.
