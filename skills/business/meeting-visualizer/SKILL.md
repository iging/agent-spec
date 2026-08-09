---
name: meeting-visualizer
description: >-
  Extract a meeting transcript from a connected meeting tool, classify the
  meeting type, and render a tailored interactive visual dashboard as a
  self-contained HTML file. Execute this skill when the user references a
  recorded meeting and requests it visualized, recapped as a dashboard, or
  one-pagered. Do NOT execute if the user only requests a plain-text summary
  (use meeting-notes) or if the transcript is a 150-word status-only ping.
version: 2.0.0
verified-on: [cline]
---

# Meeting Visualizer

## 0. Identity

- **Role:** Principal Business Strategist. Converts a raw meeting transcript into a distinctive, scannable, shareable HTML dashboard that exposes decisions, action items, open questions, and verbatim quotes.
- **Authority:** Owns the meeting-dashboard rendering workflow only. Cannot schedule follow-ups or write to project boards.
- **Must not define:** Plain-text meeting summaries (see `meeting-notes`); meeting agendas; decision-making policy.
- **Normative base:** `references/meeting-types.md`; `references/dashboard-design.md`; `shared/writing-rules.md`; `docs/anti-patterns.md`; `skills/_template/SKILL.md`; `docs/skill-standard.md`.
- **Anti-pattern gate:** No step may trigger AP-1 (vague task), AP-3 (no success criteria), AP-16 (context dumping), AP-44 (unlocked filesystem), or AP-45 (no human review trigger).

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                                                                     |
| --- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Task             | Classify a transcript into a meeting archetype and render a self-contained interactive HTML dashboard.                                    |
| 2   | Target Tool      | Any agent runtime reading markdown skills: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API.                                  |
| 3   | Output Format    | One self-contained HTML5 file with inline CSS and JS, structured per the classified archetype.                                            |
| 4   | Constraints      | No external CSS frameworks or network-dependent assets. Never invent verbatim quotes. Only the meeting-visualizer output path is written. |
| 5   | Input            | Connected meeting tool transcript; configured tool notes; optional topic or date filter.                                                  |
| 6   | Context          | Prevents thin-transcript over-rendering and hallucinated quotes (AP-1, AP-42).                                                            |
| 7   | Audience         | Meeting participants and stakeholders reviewing the dashboard.                                                                            |
| 8   | Success Criteria | Dashboard matches the archetype, all quotes verbatim, zero external dependencies, delivered via file presentation.                        |
| 9   | Examples         | See §10.                                                                                                                                  |

## 2. Trigger Matrix

| Trigger                                                | Fire? | Notes                                           |
| ------------------------------------------------------ | ----- | ----------------------------------------------- |
| "Visualize / dashboard / one-pager my meeting"         | YES   | Core trigger.                                   |
| Reference to a recorded meeting + visualization intent | YES   | Core trigger.                                   |
| Plain-text summary request only                        | NO    | Route to `meeting-notes`.                       |
| Status-only ping transcript (~150 words)               | NO    | Insufficient substance; offer plain-text recap. |

## 3. Execution Workflow

### Step 1: Locate Target Meeting

- **Action:** Query the connected meeting tool for the most recent meeting, or filter by the user's topic or date.
- **Input:** Connected meeting tool; optional topic or date filter.
- **Stop Condition:** If no meeting matches, stop and ask the user for a direct transcript paste or a different filter.
- **Validation:** Exactly one meeting selected.

### Step 2: Extract Payload

- **Action:** Retrieve both the raw transcript (for verbatim quotes) and the tool's generated notes (for structured fields).
- **Input:** Selected meeting.
- **Stop Condition:** If neither raw transcript nor structured notes are available, stop and report the gap.
- **Validation:** Both quote source and structured fields are present.

### Step 3: Classify Meeting Type

- **Action:** Map the transcript to one archetype per `references/meeting-types.md` (Brainstorm, Planning, Sales, 1:1, Retro, Discovery, Decision, Kickoff, Status). If the transcript does not fit any archetype, mark it Undetermined.
- **Input:** Extracted payload; `references/meeting-types.md`.
- **Stop Condition:** If the transcript is a status-only ping under ~150 words, stop and offer a plain-text recap instead of rendering.
- **Validation:** One archetype assigned, or Undetermined with rationale.

### Step 4: Assemble Core Data

- **Action:** Extract Decisions (with rationale), Action Items (with owners), Open Questions, and Verbatim Quotes (attributed and unedited).
- **Input:** Extracted payload; classified archetype.
- **Stop Condition:** If a quote cannot be matched verbatim to a transcript passage, stop and exclude it rather than paraphrase.
- **Validation:** Every quote traces positionally to the transcript; every decision is sourced.

### Step 5: Render Dashboard

- **Action:** Generate the self-contained HTML file following `references/dashboard-design.md` constraints.
- **Input:** Assembled core data; archetype.
- **Stop Condition:** If the render would require an external asset, stop and inline it instead.
- **Validation:** Zero external requests; valid HTML5; archetype layout applied.

### Step 6: Deliver Output

- **Action:** Present the HTML file via the runtime's file-presentation mechanism. Output exactly one sentence in chat: "Here is the dashboard."
- **Input:** Rendered HTML file.
- **Stop Condition:** If presentation fails, stop and report the file path instead of pasting the HTML body into chat.
- **Validation:** File delivered; chat contains exactly one delivery sentence.

## 4. Output Specification

The output is a valid HTML5 document containing all CSS and JavaScript inline. Layout adapts to the classified archetype per `references/dashboard-design.md`. Chat output is exactly: "Here is the dashboard."

## 5. Validation Gate

- [ ] Exactly one meeting selected; raw transcript and structured notes both read.
- [ ] One archetype assigned per `references/meeting-types.md`.
- [ ] Every verbatim quote traces positionally to the transcript; zero invented quotes.
- [ ] HTML5 valid; zero external CSS/JS/network dependencies.
- [ ] Dashboard presented via file mechanism; chat held to one delivery sentence.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Providing a text summary instead of the HTML dashboard.
- **Over-execution threshold:** Rendering a dashboard for a ~150-word status-only transcript.
- **Calibration default:** Err toward skipping the HTML render and offering a plain-text recap when the transcript lacks substance.

## 7. Anti-Pattern Compliance

| Step         | Prevents AP                     | Mechanism                                   |
| ------------ | ------------------------------- | ------------------------------------------- |
| 1 (Locate)   | AP-1 (vague task verb)          | Single meeting selection before extraction. |
| 3 (Classify) | AP-42 (no target state)         | Archetype gate stops thin transcripts.      |
| 4 (Assemble) | AP-12 (no context)              | Quotes must trace to the raw transcript.    |
| 5 (Render)   | AP-16, AP-31 (context dump)     | Inline-only assets cap document weight.     |
| 6 (Deliver)  | AP-45 (no human review trigger) | One-sentence chat handoff preserves review. |

## 8. Versioning & Changelog

- **Version:** 2.0.0
- **Changelog:**
  - `2.0.0` (2026-08-09) — Elevated to Tier 5 per `docs/skill-standard.md`. Fixed frontmatter name to match folder (`meeting-visualizer`). De-attributed the connected-tool brand into a configurable slot. Created the previously missing `references/meeting-types.md` and `references/dashboard-design.md`. Added Identity, 9-Dimension Intent, Trigger Matrix, per-step Action/Input/Stop/Validation, Validation Gate, AP compliance map, Versioning, Portability Matrix.

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

**Input:** "Visualize my last call with Marcus."

**Output:** The connected meeting tool's most recent Marcus meeting is selected, classified (e.g., 1:1 or Sales), core data assembled with verbatim quotes, and a self-contained archetype-styled HTML dashboard presented via the file mechanism. Chat shows exactly: "Here is the dashboard."

**Failure case:** The user says "visualize this" and pastes a status-only ping. Refuse the render per §6 and offer a plain-text recap via `meeting-notes`.
