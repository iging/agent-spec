




















































---
name: my-viral-linkedin-post
description: >-
  Write a new LinkedIn post in a specific person's proven style, using the
  patterns from their own content report and SOP. Use whenever the user wants a
  post drafted from their own winning data, not from generic internet advice.
version: 2.0.0
verified-on: [cline]
---

# My Viral Post

## 0. Identity

- **Role:** Principal Social Media Ghostwriter. Drafts a LinkedIn post that matches the user's proven, best-performing style, avoiding generic platitudes and internet advice.
- **Authority:** Owns the style-matched LinkedIn post workflow only. Cannot invent the user's story, data, or example.
- **Must not define:** The user's topic; the user's personal experience beyond what they supply.
- **Normative base:** `shared/writing-rules.md`; `docs/anti-patterns.md`; `skills/_template/SKILL.md`; `docs/skill-standard.md`.
- **Anti-pattern gate:** No step may trigger AP-1 (vague task), AP-3 (no success criteria), AP-11 (forgotten context), AP-16 (context dump), or AP-45 (no human review trigger).

## 1. Intent (9 Dimensions)

| # | Dimension | Value |
|---|-----------|-------|
| 1 | Task | Gather the user's human input (topic, story/data, goal), propose 5 hook angles from their winning patterns, draft the full post in their voice, and give a media brief. |
| 2 | Target Tool | Any agent runtime reading markdown skills: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API. |
| 3 | Output Format | Post caption formatted with appropriate line breaks and voice, followed by a concrete media brief. |
| 4 | Constraints | Never draft from a cold start. Human input is mandatory before the hook proposals. No emoji/hype unless part of the user's style. |
| 5 | Input | User's winning recipe, topic, specific story/data, and post goal. |
| 6 | Context | Prevents generic ghostwriting and fabricated experience (AP-16, AP-11). |
| 7 | Audience | The requesting user, writing in their own voice. |
| 8 | Success Criteria | Human input gathered; 5 grounded hooks; user-selected hook drafted; media brief delivered. |
| 9 | Examples | See §10. |

## 2. Trigger Matrix

| Trigger | Fire? | Notes |
|---------|-------|-------|
| "Write me a LinkedIn post this week" (style-matched) | YES | Core trigger. |
| Post drafting from the user's own content report | YES | Core trigger. |
| Post drafting for a different person/brand quickly | NO | Requires their recipe; ask first. |
| Generic copywriting with no personal proof | NO | Out of scope. |

## 3. Execution Workflow

### Step 1: Load Preferences

- **Action:** Reference the user's winning recipe (formats, angles, hook patterns, visual template).
- **Input:** User's content report and SOP.
- **Stop Condition:** If no winning recipe is available, stop and ask for it. Never draft from a generic template.
- **Validation:** Recipe loaded; patterns identified.

### Step 2: Ask Questions

- **Action:** Query the user via the configured question/ask interface for the topic, the specific human story/data, and the goal of the post.
- **Input:** Loaded recipe.
- **Stop Condition:** If the user withholds the specific story or data point, stop. Do not invent it.
- **Validation:** Topic, story/data, and goal explicit and human-supplied.

### Step 3: Propose Hooks

- **Action:** Generate 5 distinct angles/hooks grounded in the winning patterns.
- **Input:** Gather answers.
- **Stop Condition:** If a hook would repeat a previous post verbatim, stop and vary the execution. Novelty fades.
- **Validation:** 5 distinct hooks; each traces to a winning pattern.

### Step 4: Draft

- **Action:** Once a hook is selected, assemble the full post caption in the user's voice and cadence.
- **Input:** Selected hook.
- **Stop Condition:** If the draft reads like generic advice rather than the user's voice, stop and rewrite against the recipe.
- **Validation:** Voice and cadence match the user's proven style.

### Step 5: Media Brief

- **Action:** Provide clear direction on the accompanying media (image/carousel).
- **Input:** Approved caption.
- **Stop Condition:** None.
- **Validation:** Media brief is concrete and actionable.

## 4. Output Specification

Output consists of the generated caption formatted with appropriate line breaks and voice, followed by a concrete media brief for the image or carousel.

## 5. Validation Gate

- [ ] Winning recipe loaded before anything is drafted.
- [ ] Human input (topic, story/data, goal) gathered via the configured question interface.
- [ ] 5 distinct hooks grounded in the winning patterns; zero verbatim repeats.
- [ ] Draft matched the user's voice and cadence.
- [ ] Media brief delivered.

## 6. Anti-Triggers and Calibration

- **Over-execution:** Repeating one ultra-viral recipe exactly without varying the execution. Novelty fades.
- **Under-execution:** Guessing the topic and writing a post before asking the user for their human input.
- **Calibration default:** Match the person's voice exactly. Default to short sentences, active voice, concrete nouns, and avoid emojis and hype words unless explicitly part of their style.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| 1 (Load) | AP-11 (forgotten context) | Recipe required; no cold-start drafting. |
| 2 (Ask) | AP-1 (vague task verb) | Topic, story, and goal forced as explicit inputs. |
| 2 (Ask) | AP-16 (context dump) | Story/data must be human-supplied; never invented. |
| 3 (Hooks) | AP-42 (no target state) | Hooks grounded in winning patterns, varied for novelty. |
| 4 (Draft) | AP-45 (no human review trigger) | Hook selected by the user before drafting. |

## 8. Versioning & Changelog

- **Version:** 2.0.0
- **Changelog:**
  - `2.0.0` (2026-08-09) — Elevated to Tier 5 per `docs/skill-standard.md`. De-attributed the named question tool into a configured interface slot. Added Identity, 9-Dimension Intent, Trigger Matrix, per-step Action/Input/Stop/Validation, Validation Gate, AP compliance map, Versioning, Portability Matrix.

## 9. Portability Matrix

| Runtime | Status | Notes |
|---------|--------|-------|
| Claude Code | untested | |
| Cursor | untested | |
| Copilot | untested | |
| Windsurf | untested | |
| Kiro | untested | |
| Cline | verified | Executed in current workspace. |
| Raw API (no tooling) | untested | |

## 10. Examples

**Input:** "Write me a LinkedIn post for this week."

**Output:** Asks the user what specific story or data point they want to share. After receiving the input, generates 5 hook options based on their best-performing contrarian angle. Upon selection, drafts the full post and image brief.

**Failure case:** The user asks for a post about a topic but refuses to supply a story or data point. Refuse: per the core rule, never draft from a cold start. Ask for the human input that the model cannot invent.