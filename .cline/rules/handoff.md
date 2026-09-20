---
name: handoff
description: >-
  Compress the entire current conversation into a clean, structured handoff
  document enabling a new chat session, a colleague, or future-you resume the
  work without losing decisions, constraints, or progress. Use this skill
  whenever the user says "handoff", asks to summarize the thread to continue
  elsewhere, mentions hitting context limits, wants to brief a teammate, or
  asks to export where things stand. Do NOT execute for a general meeting
  summary, changelog, or progress report.
version: 2.0.0
verified-on: [cline]
---

# Handoff

## 0. Identity

- **Role:** Principal Technical Project Manager. Compresses long, chaotic working threads into a structured, actionable state snapshot so the next session or developer can pick up immediately without relitigating settled questions.
- **Authority:** Owns the handoff document workflow. Cannot invent state; everything in the handoff must trace to the thread.
- **Must not define:** Project progress tracking (product-owned); changelogs; general meeting minutes.
- **Normative base:** shared conversation context; `docs/anti-patterns.md`; `skills/_template/SKILL.md`; `docs/skill-standard.md`.
- **Anti-pattern gate:** No step may trigger AP-11 (forgotten context) by dropping a single-mention constraint, or AP-53 (tool trust without validation) by filling gaps with plausible inference. Never fabricate what was not said.

## 1. Intent (9 Dimensions)

| # | Dimension | Value |
|---|-----------|-------|
| 1 | Task | Produce a structured, recipient-aware handoff snapshot with decisions, dead ends, constraints, artifacts, and a suggested opening prompt. |
| 2 | Target Tool | Any agent runtime reading markdown skills: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API. |
| 3 | Output Format | Downloadable markdown handoff per the §4 template (or fenced block if files are unavailable). |
| 4 | Constraints | State snapshot, never chronological narration. Everything traces to the thread. No plausible inference. Verbatim essentials survive exactly. Readable in 2-3 minutes. |
| 5 | Input | The full conversation thread; recipient type. |
| 6 | Context | Prevents knowledge loss across session boundaries and context limits (AP-11). |
| 7 | Audience | A new AI session, a human colleague, or future self — per the identified recipient. |
| 8 | Success Criteria | Handoff readable in 2-3 minutes; zero dropped corrections or single-mention constraints; artifact states current; verbatim essentials exact. |
| 9 | Examples | See §10. |

## 2. Trigger Matrix

| Trigger | Fire? | Notes |
|---------|-------|-------|
| "Handoff / summarize the thread to continue elsewhere" | YES | Core trigger. |
| "Hitting context limits" | YES | Core trigger. |
| "Brief a teammate / export where things stand" | YES | Core trigger. |
| General meeting summary | NO | Not a state snapshot. |
| Changelog or progress report | NO | Different output types. |

## 3. Execution Workflow

### Step 1: Identify Recipient

- **Action:** Infer if this handoff is for a new AI session (needs exact constraints and opening prompt), a human colleague (needs background, no prompt), or future self.
- **Input:** Conversation context; user request.
- **Stop Condition:** If recipient type is ambiguous, stop and ask which recipient the handoff targets.
- **Validation:** Recipient type recorded before extraction.

### Step 2: Extract Decisions

- **Action:** Mine the thread for decisions and their reasons. Record each as `[decision]: [reason]`.
- **Input:** Full thread.
- **Stop Condition:** If a decision's reason is absent from the thread, mark it "reason not stated" rather than infer one.
- **Validation:** Every decision listed carries its stated reason.

### Step 3: Extract Dead Ends

- **Action:** List approaches tried and rejected, and why. This prevents the next session from repeating failures.
- **Input:** Full thread.
- **Stop Condition:** None.
- **Validation:** Every rejected approach recorded with its rejection reason.

### Step 4: Extract Constraints and Corrections

- **Action:** Sweep for user corrections ("shorter", "wrong tone") and constraints stated only once. Do not drop single-mention constraints.
- **Input:** Full thread.
- **Stop Condition:** If uncertainty exists about a correction's scope, record it verbatim rather than generalizing it.
- **Validation:** Zero dropped corrections; zero dropped single-mention constraints.

### Step 5: Map Artifacts

- **Action:** Document every file/deliverable produced, its location, and its status (final/draft/superseded). Confirm statuses against the latest thread state.
- **Input:** Thread; file system state.
- **Stop Condition:** If an artifact status is unverifiable, mark it "unverified" rather than guessing.
- **Validation:** Artifact list complete; statuses current or explicitly flagged.

### Step 6: Verify

- **Action:** Scan the thread again to ensure no user correction was missed, no single-mention constraint was dropped, and artifact states are current.
- **Input:** Draft handoff; thread.
- **Stop Condition:** If verification surfaces a gap, fix the handoff before delivery.
- **Validation:** Re-scan passes; handoff ready for the §4 format.

## 4. Output Specification

Deliver as a downloadable markdown file (or fenced block if files are unavailable):

```markdown
# Handoff: [topic]
[Date] · [one line: what this thread was for]

## Objective
[The goal in 1-2 sentences]

## Current state
[Where things stand right now]

## Decisions (and why)
- [decision]: [reason]

## Dead ends — do not retry
- [approach]: [why it failed / was rejected]

## Artifacts
- [name/location]: [status]

## Verbatim essentials
[exact values, requirements, approved phrasings]

## Working preferences
[corrections and style preferences learned this thread]

## Open items
- Next step: [the one concrete action]
- Blocked: [item + what unblocks it]

## Suggested opening prompt
[A paste-ready first message for the new AI chat]
```

## 5. Validation Gate

Run before declaring completion:

- [ ] Recipient identified; output tailored to it.
- [ ] No chronological narration; snapshot structure only.
- [ ] Every decision carries its stated reason.
- [ ] All dead ends listed with rejection reasons.
- [ ] Zero dropped corrections or single-mention constraints.
- [ ] Artifact statuses current or marked unverified.
- [ ] Handoff readable in 2-3 minutes.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Omitting decision reasons or the dead-ends list.
- **Over-execution threshold:** Generating a 5-page transcript of the chat instead of a snapshot.
- **Calibration default:** Target a document the recipient can read in 2-3 minutes.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| 1 (Recipient) | AP-1 (vague task verb) | Recipient type forced before extraction. |
| 2 (Decisions) | AP-53 (tool trust without validation) | Reasons traced to thread; "not stated" rather than inferred. |
| 4 (Constraints) | AP-11 (forgotten context) | Single-mention constraints swept and preserved. |
| 5 (Artifacts) | AP-53 (tool trust without validation) | Unverifiable statuses flagged, never guessed. |
| 6 (Verify) | AP-11 (forgotten context) | Second-pass scan catches dropped items. |

## 8. Versioning & Changelog

- **Version:** 2.0.0
- **Changelog:**
  - `2.0.0` (2026-08-08) — Elevated to Tier 5 per `docs/skill-standard.md`. Added Identity, 9-Dimension Intent, Trigger Matrix, per-step Action/Input/Stop/Validation, Validation Gate, AP compliance map, Versioning, Portability Matrix.

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

**Input:** "Let's do a handoff, this chat is getting too long."

**Output:** Produces a clean markdown summary capturing the objective, current state, decisions with reasons, dead ends, artifacts with statuses, verbatim essentials, working preferences, open items, and a ready-to-paste suggested opening prompt for the new session.

**Failure case:** The thread contains a single-mention constraint ("keep the palette below 5 colors") and the draft drops it. Verification fails; the handoff is corrected before delivery because the constraint must survive exactly.