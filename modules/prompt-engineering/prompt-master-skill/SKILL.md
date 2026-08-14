---
name: prompt-master
description: >-
  Restructure messy, rambling, or stream-of-consciousness requests into a clean
  task spec BEFORE executing them. Use this skill whenever the user's message
  is a brain dump (unstructured paragraphs, contradictions, tangled tasks). Do
  NOT execute on clean, single-sentence requests.
version: 2.0.0
verified-on: [cline]
---

# Prompt Master

## 0. Identity

- **Role:** Principal Prompt Engineer. Extracts the true objective from a disorganized brain dump and structures it cleanly so the execution phase does not miss buried constraints or misinterpret conflicting statements.
- **Authority:** Owns the brain-dump structuring gate only. Cannot execute a dump directly without extracting its structure first.
- **Must not define:** The user's intent beyond the structured readback; decisions resolved by the readback are surfaced, not silently re-authored.
- **Normative base:** `shared/writing/writing-rules.md`; `docs/anti-patterns.md`; `skills/_template/SKILL.md`; `docs/skill-standard.md`.
- **Anti-pattern gate:** No step may trigger AP-1 (vague task), AP-2 (two tasks in one prompt), AP-3 (no success criteria), AP-11 (forgotten context), or AP-45 (no human review trigger).

## 1. Intent (9 Dimensions)

| # | Dimension | Value |
|---|-----------|-------|
| 1 | Task | Structuring a brain dump into Goal, Deliverable, Context, Constraints, and tasks; resolving contradictions; then executing from the clean structure. |
| 2 | Target Tool | Any agent runtime reading markdown skills: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API. |
| 3 | Output Format | Light Mode one-liner or Confirm Mode structured readback per §4, then execution. |
| 4 | Constraints | Never execute a dump directly. Prefer the later statement on conflict. Explicitly surface every interpreted decision. Max 3 open questions. |
| 5 | Input | User's brain-dump message; optional stakes signal. |
| 6 | Context | Prevents buried constraints and misinterpreted conflicts (AP-11, AP-2). |
| 7 | Audience | The requesting user who owns the final intent. |
| 8 | Success Criteria | Structure extracted; contradictions resolved (later wins, flagged); parked details explicit; execution matches the readback. |
| 9 | Examples | See §10. |

## 2. Trigger Matrix

| Trigger | Fire? | Notes |
|---------|-------|-------|
| Brain dump: ~150+ words, multiple asks, contradictions, or apologetic framing | YES | Core trigger. |
| Stream-of-consciousness unstructured paragraphs | YES | Core trigger. |
| Clean single-sentence request ("fix the typo in line 3") | NO | Execute directly. |
| Structured request with no conflicts | NO | No restructuring needed. |

## 3. Execution Workflow

### Step 1: Mine the Dump

- **Action:** Read the entire message. Extract the Goal, Deliverable, Context, Constraints, and Multiple tasks (if any).
- **Input:** User's brain-dump message.
- **Stop Condition:** If no coherent Goal can be extracted, stop and ask the user to state the outcome in one sentence before proceeding.
- **Validation:** Goal, deliverable, and constraints all explicit.

### Step 2: Park Irrelevant Details

- **Action:** List any detail in the dump that does not impact execution explicitly as "Parked".
- **Input:** Extracted structure.
- **Stop Condition:** None; parking is deterministic against the execution path.
- **Validation:** Every non-impacting detail appears under Parked.

### Step 3: Resolve Contradictions

- **Action:** If instructions conflict, pick the later one and flag it as an interpreted decision.
- **Input:** Extracted structure.
- **Stop Condition:** If a contradiction cannot be resolved by recency, stop and add it to Open Questions instead of guessing.
- **Validation:** Every conflict resolved by recency and flagged, or escalated to Open Questions.

### Step 4: Choose Mode

- **Action:** If routine, use Light Mode (show structure and proceed immediately). If high-stakes or highly conflicting, use Confirm Mode (show structure and stop for approval).
- **Input:** Resolved structure; stakes assessment.
- **Stop Condition:** If stakes are ambiguous, default to Confirm Mode.
- **Validation:** Mode selection matches stakes; Confirm Mode halts for approval.

### Step 5: Execute

- **Action:** Run the task based strictly on the extracted structure.
- **Input:** Approved (Confirm) or accepted (Light) structure.
- **Stop Condition:** If execution would require a detail parked or flagged, stop and return to Confirmation before acting on it.
- **Validation:** Execution matches the structured readback exactly.

## 4. Output Specification

**Light Mode Format:**
```markdown
Taking from this: [goal] as [deliverable], constraints: [list].
Assuming [interpreted decisions]. Parked: [items]. Proceeding.
```

**Confirm Mode Format:**
```markdown
## What I'm reading in this
Goal: [goal]
Deliverable: [format]
Key context: [context]
Constraints: [constraints]
Interpreted decisions: [resolutions]
Open questions: [only true blockers, max 3]
Parked: [unused details]
```

## 5. Validation Gate

- [ ] Entire message read; Goal, Deliverable, Context, Constraints extracted.
- [ ] Non-impacting details explicitly Parked.
- [ ] Every contradiction resolved by recency and flagged, or escalated.
- [ ] Mode matches stakes; Confirm Mode halts for approval.
- [ ] Execution matches the structured readback exactly.

## 6. Anti-Triggers and Calibration

- **Over-execution:** Ceremonially restructuring a clean, single-sentence request like "fix the typo in line 3".
- **Under-execution:** Running a genuinely tangled dump directly and dropping a buried constraint.
- **Calibration default:** Trigger only when the message has ~150+ words, multiple distinct asks, contradictions, or an apologetic framing ("sorry this is a mess").

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| 1 (Mine) | AP-1 (vague task verb) | Coherent Goal required before execution. |
| 1 (Mine) | AP-2 (two tasks in one prompt) | Multiple tasks split explicitly in the structure. |
| 2 (Park) | AP-11 (forgotten context) | Non-impacting details surfaced, never silently dropped. |
| 3 (Resolve) | AP-29 (ambiguous verb) | Recency rule makes conflict resolution deterministic. |
| 4 (Mode) | AP-45 (no human review trigger) | Confirm Mode gates high-stakes execution. |

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

**Input:** "ok so we have a meeting and sarah wants a deck but i think a one pager is better, also mention the pricing but NOT the contract renewal yet, make it non corporate, send tonight."

**Output:** "Taking from this: a client-ready one-pager (your call over Sarah's deck preference) to send tonight. Introducing new pricing. Constraints: no mention of contract renewal, non-corporate tone. Proceeding with the one-pager."

**Failure case:** The user pastes a clean one-liner but the agent still runs the full restructure ceremony. Refuse: the trigger matrix marks clean requests NO. Execute directly.