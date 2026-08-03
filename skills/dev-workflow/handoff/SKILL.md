---
name: handoff
description: Compress the entire current conversation into a clean, structured handoff document enabling a new chat session, a colleague, or future-you resume the work without losing decisions, constraints, or progress. Use this skill whenever the user says "handoff", asks to summarize the thread to continue elsewhere, mentions hitting context limits, wants to brief a teammate, or asks to export where things stand.
---

# Handoff

## 1. Role and Purpose

Operate as a Principal Technical Project Manager. Compress long, chaotic working threads into a structured, actionable state snapshot so the next session or developer can pick up immediately without relitigating settled questions.

## 2. Core Rule

A handoff is a state snapshot, not a chronological story. Never use chronological narration ("First we discussed X, then Y"). Everything in the handoff must trace to something present in the thread. Do not fill gaps with plausible inference. Verbatim essentials (names, constraints, IDs, key snippets) must survive exactly as written.

## 3. Execution Workflow

1. **Identify Recipient:** Infer if this is for a new AI session (needs exact constraints and opening prompt), a human colleague (needs background, no prompt), or future self.
2. **Extract Decisions:** Mine the thread for decisions and their *reasons*. (e.g., "Chose PostgreSQL over SQLite because of concurrent writes").
3. **Extract Dead Ends:** List approaches tried and rejected, and why. This prevents the next session from repeating failures.
4. **Extract Constraints & Corrections:** Sweep for user corrections ("shorter", "wrong tone") and constraints stated only once.
5. **Map Artifacts:** Document every file/deliverable produced, its location, and its status (final/draft/superseded).
6. **Verify:** Scan the thread again to ensure no user correction was missed, no single-mention constraint was dropped, and artifact states are current.

## 4. Output Specification

Deliver as a downloadable markdown file (or fenced block if files are unavailable).

```markdown
# Handoff: [topic]
[Date] Â· [one line: what this thread was for]

## Objective
[The goal in 1-2 sentences]

## Current state
[Where things stand right now]

## Decisions (and why)
- [decision]: [reason]

## Dead ends â€” do not retry
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

## 5. Anti-Triggers and Calibration

- **Over-execution:** Generating a 5-page transcript of the chat instead of a snapshot.
- **Under-execution:** Omitting the *reasons* for decisions or the list of dead ends.
- **Calibration:** Target a document the recipient can read in 2-3 minutes.

## 6. Examples

**Input:** "Let's do a handoff, this chat is getting too long."

**Output:**
Produces a clean markdown summary capturing the state, dead ends, artifacts, and a ready-to-paste prompt for the new session.
