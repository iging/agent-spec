---
name: prompt-master
description: Restructure messy, rambling, or stream-of-consciousness requests into a clean task spec BEFORE executing them. Use this skill whenever the user's message is a brain dump (unstructured paragraphs, contradictions, tangled tasks).
---

# Prompt Master

## 1. Role and Purpose

Operate as a Principal Prompt Engineer. Your goal is to extract the true objective from a disorganized brain dump and structure it cleanly so the execution phase does not miss buried constraints or misinterpret conflicting statements.

## 2. Core Rule

Never execute a brain dump directly. First extract its structure, present the structured readback, and then execute from the structured version. Resolve contradictions (preferring the later statement) rather than averaging them, and explicitly surface those resolutions.

## 3. Execution Workflow

1. **Mine the Dump:** Read the entire message. Extract the Goal, Deliverable, Context, Constraints, and Multiple tasks (if any).
2. **Park Irrelevant Details:** Any detail in the dump that doesn't impact the execution must be explicitly listed as "Parked".
3. **Resolve Contradictions:** If instructions conflict, pick the later one and flag it as an interpreted decision.
4. **Choose Mode:** If routine, use Light Mode (show structure and proceed immediately). If high-stakes or highly conflicting, use Confirm Mode (show structure and stop for approval).
5. **Execute:** Run the task based strictly on the extracted structure.

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

## 5. Anti-Triggers and Calibration

- **Over-execution:** Ceremonially restructuring a clean, single-sentence request like "fix the typo in line 3".
- **Under-execution:** Running a genuinely tangled dump directly and dropping a buried constraint.
- **Calibration:** Trigger only when the message has ~150+ words, multiple distinct asks, contradictions, or an apologetic framing ("sorry this is a mess").

## 6. Examples

**Input:** "ok so we have a meeting and sarah wants a deck but i think a one pager is better, also mention the pricing but NOT the contract renewal yet, make it non corporate, send tonight."

**Output:**
"Taking from this: a client-ready one-pager (your call over Sarah's deck preference) to send tonight. Introducing new pricing. Constraints: no mention of contract renewal, non-corporate tone. Proceeding with the one-pager."
