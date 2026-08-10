---
name: sound-like-your-posts
description: Load the user's real writing voice from their own published posts, then hold that voice for the entire session so every draft starts sounding like a specific human.
version: 2.0.0
verified-on: [cline]
---

# Sound Like Your Posts

## 0. Identity

- **Role:** Principal Persona Anchor. Establishes the user's voice before a draft begins and fights the AI's natural drift back to the "statistical middle of the internet".
- **Authority:** Owns the persona anchoring workflow for in-session drafting. Runs before any other writing skill.
- **Must not define:** Text someone else already wrote (that is the `humanizer` skill's job); the user's published voice beyond what is on record.
- **Normative base:** `shared/writing-rules.md`; `docs/anti-patterns.md`; `skills/_template/SKILL.md`; `docs/skill-standard.md`.
- **Cross-reference:** `humanizer` — fixing a block someone else wrote. This skill only anchors the user's own voice for new drafts.
- **Anti-pattern gate:** No step may trigger AP-1 (vague task), AP-3 (no success criteria), AP-16 (context dump), AP-29 (ambiguous verb), or AP-45 (no human review trigger).

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                                                                                |
| --- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Task             | Locate or build the voice profile, re-read it before writing, draft holding the voice, and fight drift every few paragraphs until the piece is done. |
| 2   | Target Tool      | Any agent runtime reading markdown skills: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API.                                             |
| 3   | Output Format    | Drafted text holding the user's voice through the entire length; no generic sign-off.                                                                |
| 4   | Constraints      | Run before any other writing skill. Never draft generically and offer to adjust tone later.                                                          |
| 5   | Input            | `voice.md` or `about-me.md`, or 5-10 real published posts to build the profile.                                                                      |
| 6   | Context          | Prevents drift to the generic "statistical middle" (AP-16, AP-29).                                                                                   |
| 7   | Audience         | The user whose voice is being held and the audience reading the post.                                                                                |
| 8   | Success Criteria | Voice profile loaded or built; every line passes the "could this appear in their real post?" test; drift checked at intervals; no generic sign-off.  |
| 9   | Examples         | See §10.                                                                                                                                             |

## 2. Trigger Matrix

| Trigger                                                  | Fire? | Notes                                          |
| -------------------------------------------------------- | ----- | ---------------------------------------------- |
| "Write a newsletter in my voice"                         | YES   | Core trigger.                                  |
| Any draft under the user's name once a voice file exists | YES   | Run before other writing skills per core rule. |
| Fixing a block someone else wrote                        | NO    | Route to `humanizer`.                          |

## 3. Execution Workflow

### Step 1: Locate Profile

- **Action:** Look for `voice.md` or `about-me.md` in the working folder. If missing, ask for 5-10 real published posts to build it.
- **Input:** Working folder / user.
- **Stop Condition:** If no profile and no posts are supplied, stop and ask for them — never invent a voice.
- **Validation:** Profile located or user posts supplied for building.

### Step 2: Extract Voice

- **Action:** If building, capture the cadence, rhythm, openers, signature moves, register, and what the user never does. Save it as the profile.
- **Input:** 5-10 published posts.
- **Stop Condition:** If the extraction is based on vibes rather than the posts' actual patterns, stop and re-extract from the text.
- **Validation:** Voice profile captures measured patterns, including the never-list.

### Step 3: Draft

- **Action:** Re-read the file before writing. Test every line: "Could this exact sentence have appeared in one of their real posts?"
- **Input:** Profile + writing task.
- **Stop Condition:** If a line fails the test, stop and rewrite it before continuing.
- **Validation:** Every line plausibly from the user's own posts.

### Step 4: Fight Drift

- **Action:** Stop every few paragraphs. If sentences are lengthening or getting corporate, pull them back to the voice.
- **Input:** Draft in progress.
- **Stop Condition:** If drift is detected and not pulled back, stop and correct before continuing.
- **Validation:** Voice held through the entire length; no generic sign-off added.

## 4. Output Specification

Output is the drafted text, holding the voice precisely through the entire length of the content. Do not add a generic sign-off.

## 5. Validation Gate

- [ ] Profile located (`voice.md` / `about-me.md`) or built from 5-10 real posts.
- [ ] Voice extracted as measured patterns (cadence, rhythm, openers, moves, register, never-list).
- [ ] Profile re-read before drafting.
- [ ] Every line passes the "could this appear in their real post?" test.
- [ ] Drift checked every few paragraphs and pulled back.
- [ ] No generic sign-off; voice held to the end.

## 6. Anti-Triggers and Calibration

- **Over-execution:** Trying to use this skill to fix a block of text someone else already wrote (that's the `humanizer` skill).
- **Under-execution:** Drafting long texts without stopping to check for structural drift.
- **Calibration:** Most strong writers never open with a question. Pay extreme attention to the user's actual opening patterns.

## 7. Anti-Pattern Compliance

| Step        | Prevents AP                     | Mechanism                                                           |
| ----------- | ------------------------------- | ------------------------------------------------------------------- |
| 1 (Locate)  | AP-1 (vague task verb)          | Profile or posts are required inputs; never invent a voice.         |
| 2 (Extract) | AP-16 (context dump)            | Patterns measured from real posts, not generic approximation.       |
| 3 (Draft)   | AP-29 (ambiguous verb)          | Every line tested against a hard origin test.                       |
| 4 (Drift)   | AP-42 (no target state)         | Interval drift check with explicit pull-back.                       |
| 4 (Drift)   | AP-45 (no human review trigger) | Full draft returned voice-verified; no fill sign-off to mask drift. |

## 8. Versioning & Changelog

- **Version:** 2.0.0
- **Changelog:**
  - `2.0.0` (2026-08-09) — Elevated to Tier 5 per `docs/skill-standard.md`. Fixed mojibake corruption (em dash) in the Core Rule. Added Identity, 9-Dimension Intent, Trigger Matrix, per-step Action/Input/Stop/Validation, Validation Gate, AP compliance map, Versioning, Portability Matrix.

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

**Input:** "Write a newsletter in my voice. Here is my voice.md."

**Output:** Loads `voice.md`. Drafts the newsletter, replacing generic claims with the blunt, short-sentence structure defined in the file. Checks for drift midway through. Returns the draft.

**Failure case:** The user pastes a colleague's memo and asks this skill to make it sound friendlier. Refuse and route to `humanizer`: this skill anchors the user's own voice for new drafts and never fixes someone else's text.
