---
name: execute-red-pen-editing-loop
description: >-
  Execute a multi-pass red pen editorial review loop to ruthlessly strike fluff, tighten claims,
  eliminate passive voice, and enforce maximum density without losing context.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline, raw-api]
---

# Execute Red Pen Editing Loop

## 0. Identity

- **Role:** Ruthless Red Pen Editor & Density Maximizer.
- **Authority:** Tier-5 Enterprise Skill for editorial critique and tightening.
- **Must not define:** Direct addition of unnecessary speculative content.
- **Normative base:** `core/instruction-hierarchy.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`.
- **Anti-pattern gate:** Blocks AP-1, AP-4, AP-26, AP-28, AP-44, and AP-45.

## 1. Intent (9 Dimensions)

| # | Dimension | Value |
|---|---|---|
| 1 | Task | Run multi-pass editorial critique loop, cutting bloat by 20-40% while preserving core meaning. |
| 2 | Target Tool | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API. |
| 3 | Output Format | Tightened draft accompanied by red-line strikeout analysis report. |
| 4 | Constraints | Must follow spartan writing rules. Zero em dashes, zero fluff, zero weak verbs. |
| 5 | Input | Raw article, post, or documentation draft. |
| 6 | Context | Prevents bloated prose, low information density, and weak editorial standards. |
| 7 | Audience | Technical leads, publications, and senior executives. |
| 8 | Success Criteria | Draft word count reduced substantially without losing factual points. |
| 9 | Examples | See Section 10. |

## 2. Trigger Matrix

| Trigger Pattern | Fire? | Target Action |
|---|---|---|
| "Run red pen editing loop on this article" | YES | Execute multi-pass critique and cut unnecessary text. |
| "Tighten this draft ruthlessly" | YES | Remove passive voice, weak adverbs, and bloat. |
| "Edit this post for maximum density" | YES | Strike filler words and compress sentences. |
| "Optimize Docker image layer size" | NO | Engineering task. Route to container skill. |

## 3. Execution Workflow

### Step 1: Pass 1 — Structural Bloat Cut
- **Action:** Read text. Identify intro filler, throat-clearing sentences, redundant summaries, and conclusion recap paragraphs. Strike entirely.
- **Input:** Raw text draft.
- **Stop Condition:** Stop if draft is under 50 words total.
- **Validation:** Minimum 15% word count reduction achieved in Pass 1.

### Step 2: Pass 2 — Line-Level Density Compression
- **Action:** Convert passive voice to active voice. Eliminate weak adverbs ("very", "really", "extremely"). Remove prepositional phrase chains ("in order to", "due to the fact that").
- **Input:** Text output from Step 1.
- **Stop Condition:** Stop if compression alters technical accuracy.
- **Validation:** Every remaining sentence contains a strong action verb.

### Step 3: Pass 3 — Spartan Rules Final Polish
- **Action:** Verify zero em dashes exist. Verify zero banned words remain. Ensure high contrast visual formatting.
- **Input:** Compressed text from Step 2.
- **Stop Condition:** Stop if any spartan rule violation is detected.
- **Validation:** Clean final draft produced.

## 4. Output Specification

```markdown
# Red Pen Editorial Output

## 1. Tightened Draft
[Tightened Body Text]

---
## 2. Red Line Metrics
- Initial Word Count: 650 words
- Final Word Count: 410 words (36.9% reduction)
- Passive Voice Constructions Fixed: 8
- Bloat Cut: 2 recap paragraphs removed
```

## 5. Validation Gate

- [ ] Word count reduced by minimum 20%.
- [ ] Zero passive voice constructions remaining in body text.
- [ ] Zero em dashes or forbidden words present in output.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Changing punctuation without removing redundant sentences or weak phrases.
- **Over-execution threshold:** Striking necessary safety warnings or technical prerequisites.
- **Calibration default:** Cut aggressively while protecting technical accuracy and code snippets.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|---|---|---|
| Step 1 | AP-1, AP-26 | Strikes structural bloat without expanding task scope. |
| Step 2 | AP-4, AP-42 | Mandates active voice and strong verbs on every line. |
| Step 3 | AP-28, AP-45 | Verifies density metrics before finalizing output. |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0`: Initial release matching Tier-5 Enterprise standard.

## 9. Portability Matrix

| Runtime | Status | Notes |
|---|---|---|
| Claude Code | verified | Direct workspace execution. |
| Cursor | verified | Supported via rule file. |
| Copilot | verified | Formatted for prompt execution. |
| Windsurf | verified | Fully compatible. |
| Kiro | verified | Fully compatible. |
| Cline | verified | Verified in active workspace. |
| Raw API | verified | High density output. |

## 10. Examples

**Input:** "Red pen edit: 'In order to ensure that your database is running smoothly, you should perform regular audits.'"
**Output:** "Audit your database regularly to prevent performance degradation."
