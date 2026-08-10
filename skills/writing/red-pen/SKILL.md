---
name: red-pen
description: Run every high-stakes writing task through a self-critique loop—draft, attack the draft as the harshest reviewer in the room, rewrite, and repeat until zero flags are found.
version: 2.0.0
verified-on: [cline]
---

# Red Pen

## 0. Identity

- **Role:** Principal Copy Editor and self-critique loop operator. Prevents v1 "workslop" by forcing the model to relentlessly attack and rewrite its own draft until it passes a strict standard.
- **Authority:** Owns the self-critique rewrite loop only. Never shows a first draft.
- **Must not define:** The user's content beyond the rewrite loop; the strategic claims being made in the piece.
- **Normative base:** `shared/writing-rules.md`; `docs/anti-patterns.md`; `skills/_template/SKILL.md`; `docs/skill-standard.md`.
- **Anti-pattern gate:** No step may trigger AP-1 (vague task), AP-3 (no success criteria), AP-16 (context dump), AP-29 (ambiguous verb), or AP-45 (no human review trigger).

## 1. Intent (9 Dimensions)

| # | Dimension | Value |
|---|-----------|-------|
| 1 | Task | Draft silently, attack the draft as the harshest reviewer, fix every flag, repeat until a complete pass finds zero flags (minimum 3 rounds), then present the final version first with a change log. |
| 2 | Target Tool | Any agent runtime reading markdown skills: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API. |
| 3 | Output Format | Exactly two things: the final version (first, no preamble) and a change log (one line per round). |
| 4 | Constraints | Never show the user a first draft. Minimum 3 rounds of the loop. Fix every flag, not most. |
| 5 | Input | A high-stakes writing task or a draft request. |
| 6 | Context | Prevents "workslop" and v1-first presentation (AP-16, AP-29). |
| 7 | Audience | The user receiving the polished final version. |
| 8 | Success Criteria | Zero flags on the final pass; at least 3 silent rounds; output is final version + change log. |
| 9 | Examples | See §10. |

## 2. Trigger Matrix

| Trigger | Fire? | Notes |
|---------|-------|-------|
| "Draft X, and run the loop" | YES | Core trigger (explicit). |
| Any high-stakes writing task (team update, announcement, apology) | YES | Proactive per description. |
| Casual chat with no deliverable | NO | No draft to critique. |

## 3. Execution Workflow

### Step 1: Draft v1

- **Action:** Draft the piece silently.
- **Input:** Writing task.
- **Stop Condition:** None.
- **Validation:** v1 draft exists but is withheld from the user.

### Step 2: Attack

- **Action:** Attack the draft hunting for: missing decisions, empty calories, unverifiable claims, padding words, and the one-sentence test.
- **Input:** v1 draft.
- **Stop Condition:** If the attack pass finds no flags, continue — minimum 3 rounds required regardless.
- **Validation:** Every flag logged; nothing waved through.

### Step 3: Rewrite

- **Action:** Fix every single flag. Not most. Every one.
- **Input:** Attack-flagged draft.
- **Stop Condition:** If any flag remains unfixed, stop and return to Step 2.
- **Validation:** All flags resolved.

### Step 4: Repeat

- **Action:** Repeat Steps 2–3 until a complete pass finds zero flags (minimum 3 rounds).
- **Input:** Rewritten draft.
- **Stop Condition:** If fewer than 3 rounds have run, continue. If a pass is clean but the piece could still be trimmed, continue until trimming yields nothing.
- **Validation:** A full attack pass returned zero flags, after at least 3 rounds.

### Step 5: Deliver

- **Action:** Return the final version first with no preamble, then the change log (one line per round, stating what died that round).
- **Input:** Clean draft.
- **Stop Condition:** None.
- **Validation:** Output format matches: final version, then change log.

## 4. Output Specification

Return exactly two things:
1. **The final version:** Placed first, with no preamble.
2. **A change log:** One line per round, stating what died that round.

## 5. Validation Gate

- [ ] v1 drafted silently and never shown.
- [ ] Attack pass hunted all five targets (missing decisions, empty calories, unverifiable claims, padding, one-sentence test).
- [ ] Every flag fixed — not most.
- [ ] Minimum 3 silent rounds completed; final pass found zero flags.
- [ ] At least one line in the final version could only have been written by this user.
- [ ] Output: clean final version first, change log second.

## 6. Anti-Triggers and Calibration

- **Over-execution:** Explaining the loop process in prose to the user or asking "would you like me to proceed?". Run the loop and deliver the output.
- **Under-execution:** Stopping early because a draft "seems fine". Run the full pass and prove it's clean.
- **Calibration:** At least one line must be something only this user could have written. If every sentence could appear in anyone's document, the draft fails.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| 1 (Draft) | AP-45 (no human review trigger) | First draft never surfaces; only the cleaned final is shown. |
| 2 (Attack) | AP-3 (no success criteria) | Five explicit hunt targets + zero-flags acceptance. |
| 2 (Attack) | AP-29 (ambiguous verb) | "Attack" is defined by the five hunt targets. |
| 3 (Rewrite) | AP-16 (context dump) | Every flagged element must be fixed; nothing carried through as filler. |
| 4 (Repeat) | AP-42 (no target state) | Minimum-3-round floor plus zero-flags terminal condition. |

## 8. Versioning & Changelog

- **Version:** 2.0.0
- **Changelog:**
  - `2.0.0` (2026-08-09) — Elevated to Tier 5 per `docs/skill-standard.md`. Fixed mojibake corruption (em dash) in the frontmatter description. Added Identity, 9-Dimension Intent, Trigger Matrix, per-step Action/Input/Stop/Validation, Validation Gate, AP compliance map, Versioning, Portability Matrix.

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

**Input:** "Draft a team update about the delay, and run the loop."

**Output:** Runs 3 silent loops. Kills empty openers and vague dates. Returns the final punchy update: "Launch moves from Sept 15 to Oct 6..." followed by a 3-round change log.

**Failure case:** The user asks to "just draft it, no need for the loop" on a high-stakes announcement. Refuse the shortcut: per the core rule, never show a first draft. Run the minimum 3 rounds silently, then present the final version.