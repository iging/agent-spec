---
name: the-team
description: >-
  Execute a multi-agent review loop (Writer, Editor, Fact-checker) to draft,
  critique, and verify high-stakes writing. Execute this skill when the user
  invokes /the-team, requests a "swarm of agents", or demands the strongest
  possible version of a piece. Do NOT execute for everyday low-stakes writing
  (use red-pen instead).
version: 2.0.0
verified-on: [cline]
---

# The Team

## 0. Identity

- **Role:** Principal Business Strategist. Runs a parallel execution loop where separate specialized agents (Writer, Editor, Fact-checker) argue over a draft until it survives all strict validation constraints.
- **Authority:** Owns the multi-agent writing verification loop only. Cannot publish, send, or commit the final text on the user's behalf.
- **Must not define:** Editorial policy, factual ground truth, or the user's writing voice (supplied as an input reference).
- **Normative base:** `shared/writing/writing-rules.md`; `docs/anti-patterns.md`; `skills/_template/SKILL.md`; `docs/skill-standard.md`.
- **Anti-pattern gate:** No step may trigger AP-1 (vague task), AP-3 (no success criteria), AP-28 (no stop condition), AP-42 (no target state), or AP-45 (no human review trigger).

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                                                           |
| --- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Task             | Run a Writer/Editor/Fact-checker loop until the draft passes all verification constraints, then output with a deletion summary. |
| 2   | Target Tool      | Any agent runtime reading markdown skills: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API.                        |
| 3   | Output Format    | Final approved text plus the exact Verification Summary sentence per §4.                                                        |
| 4   | Constraints      | Loop terminates only on zero Editor flags; every fact verified or marked; voice reference honored.                              |
| 5   | Input            | Writing task; voice reference (user markdown file); provided factual context.                                                   |
| 6   | Context          | Prevents single-model self-grading and unverified claims (AP-3, AP-42).                                                         |
| 7   | Audience         | The requesting writer and whomever consumes the final text.                                                                     |
| 8   | Success Criteria | Draft passes all three agent checks; zero Editor flags; summary sentence appended.                                              |
| 9   | Examples         | See §10.                                                                                                                        |

## 2. Trigger Matrix

| Trigger                                        | Fire? | Notes                   |
| ---------------------------------------------- | ----- | ----------------------- |
| `/the-team`                                    | YES   | Core trigger.           |
| "Swarm of agents / strongest possible version" | YES   | Core trigger.           |
| High-stakes launch or external-facing piece    | YES   | Core trigger.           |
| Everyday low-stakes writing                    | NO    | Route to `red-pen`.     |
| Casual two-line message                        | NO    | Over-execution; refuse. |

## 3. Execution Workflow

### Step 1: Initialize the Writer

- **Action:** The Writer agent generates the initial draft, relying exclusively on the user's voice reference (a user-supplied markdown voice file at a configurable path).
- **Input:** Writing task; voice reference path.
- **Stop Condition:** If the voice reference is missing, stop and ask the user to provide it or waive voice-matching.
- **Validation:** Initial draft produced and voice-matched to the reference.

### Step 2: Initialize Parallel Verification

- **Action:** Spawn two verification roles with disjoint criteria:
  - **Editor (The Critic):** Evaluate against the effort-transfer test: does the text transfer effort to the reader, did the writer make actual decisions, and is there one sentence only the user could have written? Reject on any failure.
  - **Fact-checker (The Skeptic):** Evaluate every factual claim and numerical value against the user's provided context. Mark unverifiable claims `[VERIFY]` or delete them.
- **Input:** Initial draft; user context.
- **Stop Condition:** If no factual context was provided, stop and require context or an explicit waiver before fact-checking.
- **Validation:** Both agents return a discrete flag list; zero unchecked claims.

### Step 3: Execute the Loop

- **Action:** The Writer rewrites the draft addressing every specific flag raised by the verification agents. Re-run Step 2 until the Editor returns zero flags.
- **Input:** Draft; flag lists.
- **Stop Condition:** If the loop exceeds its configured cap without zero flags, stop and surface the residual flags rather than declaring "good enough."
- **Validation:** Editor returns exactly zero flags.

### Step 4: Render Output

- **Action:** Output the finalized draft and append exactly one sentence summarizing the specific deletions made by the verification agents.
- **Input:** Approved draft; deletion log.
- **Stop Condition:** If the summary sentence is absent, stop and re-render.
- **Validation:** Output matches §4 exactly.

## 4. Output Specification

```markdown
[Final Approved Text]

---

**Verification Summary:** The Editor deleted [X] hedges; the Fact-checker flagged [Y] unverifiable claims.
```

## 5. Validation Gate

- [ ] All three agent roles executed with disjoint criteria.
- [ ] Editor returned exactly zero flags; loop terminated on the cap or zero.
- [ ] Every factual claim verified, marked `[VERIFY]`, or deleted.
- [ ] Final text voice-matched to the reference (or waiver recorded).
- [ ] Verification Summary sentence present and exact.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Running a standard one-shot prompt instead of spawning three distinct agent roles.
- **Over-execution threshold:** Using the expensive loop for a casual two-line message or a low-stakes draft.
- **Calibration default:** Err toward pushing the user to the lighter `red-pen` skill when the request lacks high-stakes markers.

## 7. Anti-Pattern Compliance

| Step             | Prevents AP                         | Mechanism                                                   |
| ---------------- | ----------------------------------- | ----------------------------------------------------------- |
| 1 (Writer)       | AP-11, AP-12 (forgotten/no context) | Voice reference required before drafting.                   |
| 2 (Verification) | AP-3 (no success criteria)          | Editor and Fact-checker criteria are explicit and disjoint. |
| 2 (Verification) | AP-42 (no target state)             | Unverifiable claims flagged or deleted.                     |
| 3 (Loop)         | AP-28 (no stop condition)           | Zero-flag termination plus configured cap.                  |
| 4 (Render)       | AP-45 (no human review trigger)     | Deletion summary keeps the writer in the loop.              |

## 8. Versioning & Changelog

- **Version:** 2.0.0
- **Changelog:**
  - `2.0.0` (2026-08-09) — Elevated to Tier 5 per `docs/skill-standard.md`. Parameterized the personal voice file into a configurable reference slot per spec-reviewer Step 5. Added loop cap to guarantee a stop condition. Added Identity, 9-Dimension Intent, Trigger Matrix, per-step Action/Input/Stop/Validation, Validation Gate, AP compliance map, Versioning, Portability Matrix.

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

**Input:** "Run the team on my launch announcement."

**Output:** The Writer drafts from the voice reference, Editor and Fact-checker flag the draft, the loop rewrites until zero Editor flags (capped), and the final text renders with the exact Verification Summary sentence.

**Failure case:** The user says "run the team on this Slack reply." Refuse: casual low-stakes writing per §6 routes to `red-pen`, not the three-agent loop.
