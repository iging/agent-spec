---
name: deck-builder
description: >-
  Generate presentation slide outlines and execute the configured presentation
  render integration. Execute this skill when the user mentions a deck,
  presentation, talk, workshop, keynote, or webinar. Do NOT execute for
  LinkedIn posts, newsletters, blog drafts, one-pagers, or text-only ad copy.
version: 2.0.0
verified-on: [cline]
---

# Deck Builder

## 0. Identity

- **Role:** Staff Content Architect. Constructs a highly structured presentation outline and executes a handoff to the configured presentation render integration.
- **Authority:** Owns the deck-outline and render-handoff workflow only. Cannot write LinkedIn posts, newsletters, or ad copy.
- **Must not define:** The presentation theme or branding (user-owned); final publishing decisions.
- **Normative base:** `shared/writing-rules.md`; `docs/anti-patterns.md`; `skills/_template/SKILL.md`; `docs/skill-standard.md`.
- **Anti-pattern gate:** No step may trigger AP-1 (vague task), AP-3 (no success criteria), AP-20 (unrequested side effects), AP-45 (no human review trigger), or AP-52 (no circuit breaker).

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                                        |
| --- | ---------------- | ------------------------------------------------------------------------------------------------------------ |
| 1   | Task             | Generate a slide-by-slide outline and hand off rendering to the configured presentation integration.         |
| 2   | Target Tool      | Any agent runtime reading markdown skills: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API.     |
| 3   | Output Format    | Structured per-slide outline per §4; final render URL after approval.                                        |
| 4   | Constraints      | One core idea per slide. Outline approved by the user before any render call. Never render without approval. |
| 5   | Input            | Topic, audience, slide count, key takeaway; approved outline.                                                |
| 6   | Context          | Prevents rambling decks and unapproved external side effects (AP-1, AP-20).                                  |
| 7   | Audience         | The presenting user and the deck viewers.                                                                    |
| 8   | Success Criteria | Outline approved; render executes with the approved slide count and audience; final URL delivered.           |
| 9   | Examples         | See §10.                                                                                                     |

## 2. Trigger Matrix

| Trigger                                                   | Fire? | Notes                      |
| --------------------------------------------------------- | ----- | -------------------------- |
| Deck / presentation / talk / workshop / keynote / webinar | YES   | Core trigger.              |
| "Build a [N]-slide deck for [X]"                          | YES   | Core trigger.              |
| LinkedIn post, newsletter, blog draft, one-pager, ad copy | NO    | Different artifact owners. |

## 3. Execution Workflow

### Step 1: Extract Brief Constraints

- **Action:** Identify Topic, Audience, Slide Count, and Key Takeaway from the user prompt. Ask exactly one clarifying question if any metric is missing.
- **Input:** User prompt.
- **Stop Condition:** If a constraint remains missing after one question, stop and present the partial brief for completion.
- **Validation:** All four constraints explicit.

### Step 2: Generate Outline

- **Action:** Produce the slide-by-slide outline. Assign exactly one core idea per slide.
- **Input:** Brief constraints.
- **Stop Condition:** If a slide needs two core ideas, stop and split the slide or drop one idea.
- **Validation:** One core idea per slide; outline matches the approved slide count.

### Step 3: Purify the Prose

- **Action:** Apply the anti-AI writing constraints from `shared/writing-rules.md`. Delete banned phrases (e.g., "Let's dive in", "In today's fast-paced world") and banned words.
- **Input:** Outline draft.
- **Stop Condition:** None.
- **Validation:** Zero banned words; zero em dashes.

### Step 4: Pause for Approval

- **Action:** Display the outline to the user and halt execution. State exactly: "Please approve this outline before I generate the presentation."
- **Input:** Purified outline.
- **Stop Condition:** If the user rejects the outline, revise only the flagged slides and re-present. Never proceed without approval.
- **Validation:** Explicit user approval recorded.

### Step 5: Execute Render

- **Action:** Execute the configured presentation render integration using the exact approved slide count and audience parameters. Output the final URL.
- **Input:** Approved outline.
- **Stop Condition:** If the render integration fails or is unavailable, stop and report the failure instead of approximating output.
- **Validation:** Render executed with approved parameters; final URL delivered.

## 4. Output Specification

```markdown
**Slide [Number]: [Hook Title]**

- [One-sentence description of the core takeaway.]
- [Supporting metric or visual instruction.]
```

## 5. Validation Gate

- [ ] Topic, audience, slide count, and key takeaway all explicit.
- [ ] One core idea per slide.
- [ ] Zero banned words, zero em dashes.
- [ ] User approval recorded before any render call.
- [ ] Render executed with approved parameters; URL delivered.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Sending a raw paragraph of text instead of a structured outline.
- **Over-execution threshold:** Generating a 50-slide outline for a 5-minute lightning talk, or rendering without approval.
- **Calibration default:** Err toward fewer, higher-impact slides over excessive bullet points.

## 7. Anti-Pattern Compliance

| Step         | Prevents AP                      | Mechanism                                   |
| ------------ | -------------------------------- | ------------------------------------------- |
| 1 (Extract)  | AP-1 (vague task verb)           | Four explicit brief constraints required.   |
| 2 (Outline)  | AP-42 (no target state)          | One core idea per slide, fixed slide count. |
| 4 (Approval) | AP-45 (no human review trigger)  | Render gated on explicit user approval.     |
| 5 (Render)   | AP-20 (unrequested side effects) | Render executes only post-approval.         |
| 5 (Render)   | AP-52 (no circuit breaker)       | Render failure halts with a report.         |

## 8. Versioning & Changelog

- **Version:** 2.0.0
- **Changelog:**
  - `2.0.0` (2026-08-09) — Elevated to Tier 5 per `docs/skill-standard.md`. De-attributed the render API brand into a configurable integration slot per spec-reviewer Step 2. Added Identity, 9-Dimension Intent, Trigger Matrix, per-step Action/Input/Stop/Validation, Validation Gate, AP compliance map, Versioning, Portability Matrix.

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

**Input:** "Build a 5-slide pitch deck for my new AI startup."

**Output:** A §4 outline: topic, audience, slide count, and takeaway extracted, one idea per slide, prose purified, then the exact approval pause sentence. Only after approval does the render integration execute and return the final URL.

**Failure case:** The user says "just render it, skip the outline." Refuse: Step 4 gates all rendering on approval per AP-45. Present the outline first.
