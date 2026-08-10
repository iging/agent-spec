---
name: viral-recipe
description: >-
  Capture the "recipe" of a single post that went viral, then reproduce that
  recipe for any new topic or person. Use whenever the user wants to
  reverse-engineer a viral post structure and recreate it with fresh content.
version: 2.0.0
verified-on: [cline]
---

# Viral Recipe

## 0. Identity

- **Role:** Principal Social Media Pattern Analyst. Captures what made a specific post go viral and maps those structural elements onto a new topic for a new audience.
- **Authority:** Owns the viral-post capture-and-reproduce workflow only. Never hands back a post without the user's own story or data.
- **Must not define:** The reference post beyond what the user supplies; the user's personal story or data.
- **Normative base:** `shared/writing-rules.md`; `docs/anti-patterns.md`; `skills/_template/SKILL.md`; `docs/skill-standard.md`.
- **Anti-pattern gate:** No step may trigger AP-1 (vague task), AP-3 (no success criteria), AP-16 (context dump), AP-29 (ambiguous verb), or AP-45 (no human review trigger).

## 1. Intent (9 Dimensions)

| # | Dimension | Value |
|---|-----------|-------|
| 1 | Task | Ask for the new post topic/audience/story, map it onto the reference recipe, draft the hook, secure hook approval, draft the caption + visual, then iterate. |
| 2 | Target Tool | Any agent runtime reading markdown skills: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API. |
| 3 | Output Format | Completed caption mimicking the reference structure and tone, paired with a visual description. |
| 4 | Constraints | Replace the reference post block with the actual viral post before use. Never spit out a post — the user's story/data is mandatory. |
| 5 | Input | Reference viral post; user's new topic, audience, unique story, or data. |
| 6 | Context | Prevents formulaic repetition and fabricated experience (AP-16, AP-29). |
| 7 | Audience | The requesting user who will publish the new post. |
| 8 | Success Criteria | Reference block replaced; hook drafted and approved; caption mapped to the structure; visual described; iteration offered. |
| 9 | Examples | See §10. |

## 2. Trigger Matrix

| Trigger | Fire? | Notes |
|---------|-------|-------|
| "Recreate this post for a different topic" | YES | Core trigger. |
| "What made this viral? Make me a new one" | YES | Core trigger. |
| Capture-and-reproduce for a supplied reference post | YES | Core trigger. |
| Original post writing with no reference | NO | Different skill (see style-matched ghostwriting). |

## 3. Execution Workflow

### Step 1: Load the Reference

- **Action:** Replace the reference post block with the actual viral post the user supplies. Never assume the content of a reference you cannot see.
- **Input:** User's viral post.
- **Stop Condition:** If no reference post is supplied, stop and ask for it.
- **Validation:** Reference post loaded verbatim; structure extracted.

### Step 2: Ask for Input

- **Action:** Query the user on the new post topic, its audience, and their unique story or data via the configured question interface.
- **Input:** Loaded reference.
- **Stop Condition:** If the user supplies no unique story or data, stop. Do not invent it.
- **Validation:** Topic, audience, and story/data explicit.

### Step 3: Map the Recipe

- **Action:** Map the input onto the reference recipe (same format, same hook shape, same caption architecture, same cadence).
- **Input:** User input + reference structure.
- **Stop Condition:** If a structural element cannot be mapped (e.g., different format), stop and flag it rather than silently changing the recipe.
- **Validation:** Every mapped element traces to the reference structure.

### Step 4: Draft the Hook

- **Action:** Write the hook first. Secure the user's approval before proceeding to the caption.
- **Input:** Recipe map.
- **Stop Condition:** If the hook has no approval, stop. Do not proceed to the caption.
- **Validation:** Hook approved; hook lands.

### Step 5: Draft the Caption + Visual

- **Action:** Write the full caption following the reference structure and describe the matching visual.
- **Input:** Approved hook.
- **Stop Condition:** If the draft leans too hard on a formula used recently, stop and explicitly flag the novelty fade to the user.
- **Validation:** Caption matches reference structure; visual description included.

### Step 6: Iterate

- **Action:** Offer to tighten or re-angle the draft.
- **Input:** First full draft.
- **Stop Condition:** If the user hasn't approved, stop and wait; do not finalize.
- **Validation:** User approved the final post.

## 4. Output Specification

Output is an interactive process resulting in a completed caption that mimics the structure and tone of the original reference post, paired with a visual description. The reference post block is replaced with the actual viral post before use.

## 5. Validation Gate

- [ ] Reference post loaded and structure extracted.
- [ ] User's topic, audience, and unique story/data gathered.
- [ ] Recipe mapped: format, hook shape, caption architecture, cadence.
- [ ] Hook drafted and approved before the caption.
- [ ] Full caption + visual description delivered.
- [ ] Iteration offered; user approved the final post.

## 6. Anti-Triggers and Calibration

- **Over-execution:** Running the same recipe repeatedly until novelty fades. If a draft leans too hard on a formula they've used recently, explicitly flag it to the user.
- **Under-execution:** Changing the format (e.g., changing a text-only post to a carousel) when trying to replicate a recipe. The format must remain identical to the reference.
- **Calibration:** Mirror the reference post's voice, defaulting to short sentences, varied length, and active voice.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| 2 (Ask) | AP-1 (vague task verb) | Topic, audience, and story/data forced as explicit inputs. |
| 2 (Ask) | AP-16 (context dump) | Story must be user-supplied; never fabricated. |
| 3 (Map) | AP-42 (no target state) | Structure traces element by element to the reference. |
| 4 (Hook) | AP-45 (no human review trigger) | Hook approval gate before caption drafting. |
| 6 (Iterate) | AP-53 (novelty blind spot) | Formula-fatigue explicitly flagged to the user. |

## 8. Versioning & Changelog

- **Version:** 2.0.0
- **Changelog:**
  - `2.0.0` (2026-08-09) — Elevated to Tier 5 per `docs/skill-standard.md`. Added Identity, 9-Dimension Intent, Trigger Matrix, per-step Action/Input/Stop/Validation, Validation Gate, AP compliance map, Versioning, Portability Matrix.

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

**Input:** "Recreate this post for a different topic."

**Output:** Reads the reference post. Asks the user for the new topic and specific data. Drafts a new hook mapping precisely to the structural rhythm of the original hook. Presents the hook for approval before drafting the full post.

**Failure case:** The user supplies a viral post and says "make me one like it" but withholds any unique story or data. Refuse: per the core rule, never spit out a post without the user's own input. Ask for their story or data.