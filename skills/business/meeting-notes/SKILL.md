---
name: meeting-notes
description: >-
  Extract a meeting transcript from a connected tool and render a deterministic
  summary with explicit action items. Execute this skill when the user invokes
  /meeting-notes, requests a call summary, or asks for action items from a
  transcript. Pull data from configured connected tools (e.g., Granola, Notion).
  Apply the anti-AI writing constraints from shared/writing-rules.md to the
  final prose. Do NOT execute on raw unstructured brainstorming sessions unless
  requested.
version: 2.0.0
verified-on: [cline]
---

# Meeting Notes

## 0. Identity

- **Role:** Principal Business Strategist. Converts raw meeting transcripts into a structured summary and action-item log that exposes only actionable decisions and obligations.
- **Authority:** Owns the meeting-summary workflow only. Cannot write follow-up emails, schedule tasks, or modify project boards.
- **Must not define:** Meeting agendas, proposal drafts, or decision-making policy.
- **Normative base:** `shared/writing-rules.md`; `docs/anti-patterns.md`; `skills/_template/SKILL.md`; `docs/skill-standard.md`.
- **Anti-pattern gate:** No step may trigger AP-1 (vague task), AP-3 (no success criteria), AP-11 (forgotten context), AP-42 (no target state), or AP-45 (no human review trigger).

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                                                       |
| --- | ---------------- | --------------------------------------------------------------------------------------------------------------------------- |
| 1   | Task             | Extract a transcript from a connected tool and render meeting notes with explicit decisions and action items.               |
| 2   | Target Tool      | Any agent runtime reading markdown skills: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API.                    |
| 3   | Output Format    | Structured markdown notes per §4 delivered in chat.                                                                         |
| 4   | Constraints      | Every action item needs an owner and due date; missing data is marked, never invented. Full transcript read before summary. |
| 5   | Input            | Connected-tool transcript; optional date or topic filter.                                                                   |
| 6   | Context          | Prevents summary hallucination and lost obligations (AP-11, AP-42).                                                         |
| 7   | Audience         | Meeting participants and task owners.                                                                                       |
| 8   | Success Criteria | Summary of the full transcript; every action item has owner and due date (or explicit placeholder).                         |
| 9   | Examples         | See §10.                                                                                                                    |

## 2. Trigger Matrix

| Trigger                                          | Fire? | Notes                        |
| ------------------------------------------------ | ----- | ---------------------------- |
| `/meeting-notes`                                 | YES   | Core trigger.                |
| "Summarize my last [tool] call"                  | YES   | Core trigger.                |
| "Pull the action items from this transcript"     | YES   | Core trigger.                |
| Raw unstructured brainstorming in an open thread | NO    | Unless explicitly requested. |
| Writing follow-up emails from notes              | NO    | Different artifact owner.    |

## 3. Execution Workflow

### Step 1: Locate Transcript

- **Action:** Search configured connected tools (e.g., Granola first, then Notion). If the user provided a date or topic, filter the search. If multiple candidates exist, list them and ask the user to select one.
- **Input:** Connected tools; optional date or topic filter.
- **Stop Condition:** If no transcript is found, stop and ask the user for a direct paste or a different search key.
- **Validation:** Exactly one transcript selected.

### Step 2: Extract Payload

- **Action:** Read the full raw transcript. Ignore the tool's auto-generated summary. Extract decisions made, action items, and unresolved open questions.
- **Input:** Selected transcript.
- **Stop Condition:** If the transcript has no discernible decisions or action items, stop and render the notes with an explicit "No decisions recorded" marker rather than inventing content.
- **Validation:** Every decision and action item traces to a transcript passage.

### Step 3: Filter Noise

- **Action:** Discard greetings, scheduling logistics, and unresolved tangents. Retain only decisions, obligations, and open questions.
- **Input:** Extracted payload.
- **Stop Condition:** None.
- **Validation:** Zero conversational filler remains.

### Step 4: Purify the Prose

- **Action:** Apply the anti-AI writing constraints from `shared/writing-rules.md`. Remove filler, puffery, and banned vocabulary.
- **Input:** Filtered payload.
- **Stop Condition:** None.
- **Validation:** Zero banned words; zero em dashes.

### Step 5: Render Output

- **Action:** Deliver the structured notes in chat per §4.
- **Input:** Purified payload.
- **Stop Condition:** If any action item lacks an owner or due date, stop and fill the explicit placeholders rather than assuming.
- **Validation:** Notes match §4; every obligation has an owner and date or a placeholder.

## 4. Output Specification

```markdown
**[Meeting Title] - [Date]**
_Attendees: [Names]_

**Summary**

[Three to six sentences defining the core outcome. Lead with the primary decision.]

**Decisions**

- [Specific decision 1]
- [Specific decision 2]

**Action Items**

- [ ] [Owner] - [Task] - [Due Date]
- [ ] [Owner] - [Task] - [Due Date]

**Open Questions**

- [Unresolved question 1]
```

## 5. Validation Gate

- [ ] Exactly one transcript selected from connected tools.
- [ ] Full raw transcript read; tool auto-summary ignored.
- [ ] Zero conversational filler in the output.
- [ ] Every action item has an owner and due date, or an explicit placeholder.
- [ ] Zero banned words, zero em dashes.
- [ ] Notes rendered in chat per §4.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Summarizing without reading the full transcript, or trusting the tool's auto-summary.
- **Over-execution threshold:** Including conversational tangents, writing follow-up emails, or creating tasks on the user's board.
- **Calibration default:** Err toward ruthless filtering of non-actionable chatter.

## 7. Anti-Pattern Compliance

| Step        | Prevents AP                         | Mechanism                                       |
| ----------- | ----------------------------------- | ----------------------------------------------- |
| 1 (Locate)  | AP-1 (vague task verb)              | Single transcript selection before extraction.  |
| 2 (Extract) | AP-11, AP-12 (forgotten/no context) | Full raw transcript read, auto-summary ignored. |
| 2 (Extract) | AP-42 (no target state)             | Explicit placeholders for missing owner/date.   |
| 3 (Filter)  | AP-29 (ambiguous verb)              | Deterministic noise-discard rule.               |
| 5 (Render)  | AP-45 (no human review trigger)     | Chat delivery keeps obligor in the loop.        |

## 8. Versioning & Changelog

- **Version:** 2.0.0
- **Changelog:**
  - `2.0.0` (2026-08-09) — Elevated to Tier 5 per `docs/skill-standard.md`. Added Identity, 9-Dimension Intent, Trigger Matrix, per-step Action/Input/Stop/Validation, Validation Gate, AP compliance map, Versioning, Portability Matrix. Fixed mojibake corruption in the Output Specification.

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

**Input:** "Summarize my last Granola call."

**Output:** A §4 note set: one transcript from Granola matched, full call read, decisions and action items extracted, noise filtered, prose purified, and the structured notes rendered in chat with `[OWNER UNASSIGNED]` or `[NO DATE SET]` where the transcript omits data.

**Failure case:** The user pastes an unstructured brainstorm thread and says "just make action items out of this." Refuse unless explicitly requested: the trigger matrix marks raw brainstorming NO by default. Ask for a recorded meeting transcript instead.
