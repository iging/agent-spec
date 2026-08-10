---
name: define-foundation
description: >-
  Act as a Principal Systems Architect and Product Manager to translate a
  founder's initial brain dump into a rigorous, production-ready project
  foundation across the context/ directory. Execute this skill when the user
  provides an unstructured project idea or brain dump, or asks to establish a
  project foundation, define the PRD, architecture, schema, or task breakdown.
  Do NOT execute for incremental feature work, design mockups, or generating
  context/DESIGN.md or context/RULES.md (those own their own triggers).
version: 2.0.0
verified-on: [cline]
---

# Define Foundation

## 0. Identity

- **Role:** Translates a founder's initial brain dump into four deterministic foundation documents in `context/`: PRD.md, ARCHITECTURE.md, SCHEMA.md, TASKS.md.
- **Authority:** Owns the foundation definition workflow only. Cannot modify `core/`, `shared/`, or `skills/` at the repository root.
- **Must not define:** Design decisions (deferred until the foundation is approved); IDE loading behavior (`runtime/`); application code standards (`shared/`).
- **Normative base:** `references/interview-protocol.md`; `references/writing-rules.md`; `references/anti-patterns.md`; `skills/_template/SKILL.md`; `docs/skill-standard.md`; target project's `context/` templates.
- **Anti-pattern gate:** No step may trigger AP-1 (vague task), AP-3 (no success criteria), AP-26 (no scope boundary), AP-28 (no stop condition), AP-44 (unlocked filesystem), or AP-45 (no human review trigger). Never write to `context/` before ambiguity is destroyed.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                                                                                   |
| --- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Task             | Convert a brain dump into PRD.md, ARCHITECTURE.md, SCHEMA.md, TASKS.md in the target `context/` directory.                                              |
| 2   | Target Tool      | Any agent runtime reading markdown skills: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API.                                                |
| 3   | Output Format    | Four markdown files mapped to the project's `context/` templates, written in Spartan voice. Summary in chat; never the full file text.                  |
| 4   | Constraints      | Never write before the 3-round interview completes. Only the 4 listed files. Hard, technical, deterministic constraints only. No conversational filler. |
| 5   | Input            | User's initial request or brain dump; target project's `context/` templates.                                                                            |
| 6   | Context          | Prevents ambiguity-driven hallucination and unbuildable foundations (AP-1, AP-12, AP-42).                                                               |
| 7   | Audience         | The founder (approval gate) and every downstream agent that builds from the foundation.                                                                 |
| 8   | Success Criteria | All ambiguity destroyed via the 3-round interview; 4 files written; user approves the summary.                                                          |
| 9   | Examples         | See §10.                                                                                                                                                |

## 2. Trigger Matrix

| Trigger                                                          | Fire? | Notes                                         |
| ---------------------------------------------------------------- | ----- | --------------------------------------------- |
| "Here is my idea: [brain dump]"                                  | YES   | Core trigger.                                 |
| "Establish the project foundation / PRD / architecture / schema" | YES   | Core trigger.                                 |
| "Turn this into a buildable spec"                                | YES   | Core trigger.                                 |
| Incremental feature work on an existing foundation               | NO    | Use `plan-feature`.                           |
| "Design the UI / create mockups"                                 | NO    | Design decisions deferred; use design skills. |
| "Modify context/DESIGN.md or context/RULES.md"                   | NO    | Different owners.                             |

## 3. Execution Workflow

### Step 1: Untangle the Dump

- **Action:** Read `references/interview-protocol.md`. Apply Phase 1 to extract the core goal from the user's initial request. Restate the goal in one sentence and present it for confirmation.
- **Input:** User request; `references/interview-protocol.md`.
- **Stop Condition:** If no coherent core goal can be extracted, stop and ask the user to restate the objective.
- **Validation:** One-sentence goal confirmed by the user before proceeding.

### Step 2: The Grilling Phase

- **Action:** Apply Phase 2 of `references/interview-protocol.md` to execute the rigorous 3-round interview. Present questions as a numbered list. A single compressed round is forbidden. Round 1: goal and scope. Round 2: constraints, non-negotiables, exclusions. Round 3: success metrics, MVP vs V2 boundaries, open risks.
- **Input:** Confirmed goal; `references/interview-protocol.md`.
- **Stop Condition:** If the user attempts to skip a round, refuse and complete the round. If a critical dimension remains ambiguous after 3 rounds, stop and present the residual ambiguity explicitly.
- **Validation:** All three rounds completed; every answer recorded; zero unresolved ambiguities.

### Step 3: Draft Foundation

- **Action:** Read `references/writing-rules.md` and `references/anti-patterns.md`. Generate the 4 foundation documents mapping directly to the project's `context/` templates, using the exact writing standards defined in those references:
  - `context/PRD.md` — Stories, MVP vs V2, Metrics.
  - `context/ARCHITECTURE.md` — Tech stack, data flow.
  - `context/SCHEMA.md` — Data models, state structures.
  - `context/TASKS.md` — Numbered, one-line executable tasks breaking the MVP from the PRD.
- **Input:** Interview answers; templates; `references/writing-rules.md`; `references/anti-patterns.md`.
- **Stop Condition:** If a template is missing in the target project, ask the user before inventing structure. If any PRD story cannot map to a TASKS.md line item, stop and resolve the gap.
- **Validation:** All 4 files written to the target `context/`; every TASKS.md line traces to an MVP story in PRD.md; Spartan voice upheld.

### Step 4: Final Review

- **Action:** Present a summary of the generated context files and ask the user for approval. Output a concise per-file summary; do not dump file contents into chat.
- **Input:** Generated files.
- **Stop Condition:** If the user rejects any file, revise that file only, then re-present.
- **Validation:** User approves the summary before the skill declares completion.

## 4. Output Specification

```markdown
# Foundation Summary: [Project Name]

## PRD.md

- Stories: [count] · MVP stories: [count] · V2 stories: [count]
- Metrics: [list]

## ARCHITECTURE.md

- Tech stack: [list] · Data flow: [one line]

## SCHEMA.md

- Models: [count] · State structures: [list]

## TASKS.md

- Tasks: [count] · All trace to MVP: yes
```

## 5. Validation Gate

Run before declaring completion:

- [ ] 3-round interview completed, zero skipped rounds.
- [ ] All ambiguities resolved; residual ambiguity list is empty.
- [ ] Only the 4 allowed files written; `context/DESIGN.md` and `context/RULES.md` untouched.
- [ ] Spartan voice: no conversational filler, no subjective marketing language.
- [ ] Every TASKS.md line traces to an MVP story.
- [ ] User approval recorded.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Writing to `context/` before the interview completes, compressing the 3-round interview into one round, or allowing the user to skip the Grilling Phase.
- **Over-execution threshold:** Generating `context/DESIGN.md` or any other template not listed in Step 3; drifting into UI/design decisions.
- **Calibration default:** Err toward more interview rounds and stricter scope discipline. Ambiguity destroyed beats speed.

## 7. Anti-Pattern Compliance

| Step             | Prevents AP                           | Mechanism                                                   |
| ---------------- | ------------------------------------- | ----------------------------------------------------------- |
| 1 (Untangle)     | AP-1, AP-2 (vague / two tasks)        | One-sentence confirmed goal before proceeding.              |
| 2 (Grilling)     | AP-11, AP-12 (forgotten / no context) | 3-round interview captures constraints and non-negotiables. |
| 3 (Draft)        | AP-42 (no target state)               | PRD defines explicit MVP vs V2 and metrics.                 |
| 3 (Draft)        | AP-3 (no success criteria)            | TASKS.md maps every story to an executable line item.       |
| 4 (Final review) | AP-45 (no human review trigger)       | Approval gate before completion.                            |
| All steps        | AP-26, AP-44 (scope/filesystem)       | Only the 4 listed context files may be written.             |

## 8. Versioning & Changelog

- **Version:** 2.0.0
- **Changelog:**
  - `2.0.0` (2026-08-08) — Elevated to Tier 5 per `docs/skill-standard.md`. Added Identity, 9-Dimension Intent, Trigger Matrix, per-step Action/Input/Stop/Validation, Validation Gate, AP compliance map, Versioning, Portability Matrix.

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

**Input:** "I want a simple pill and menstrual tracking app, PWA, mobile-focused, calendar-first, with pill reminders, cycle tracking, privacy lock, and backup."

**Output:** `context/PRD.md` (MVP: pill log, cycle log, calendar, reminders; V2: predictions, PDF export, dark mode; metrics: daily log completion, 7-day retention), `context/ARCHITECTURE.md` (local-first PWA, Dexie, TanStack Query for remote sync), `context/SCHEMA.md` (PillLog, CycleLog, IntercourseLog, ReminderSetting models; branded IDs), `context/TASKS.md` (numbered one-line tasks tracing every MVP story), plus the §4 summary. No `context/DESIGN.md` generated.

**Failure case:** The user says "just write it, no interview". Refuse: skipping the Grilling Phase is under-execution per §6. Execute all 3 rounds before drafting.
