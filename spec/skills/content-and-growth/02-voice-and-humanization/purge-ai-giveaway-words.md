---
name: purge-ai-giveaway-words
description: >-
  Scan text drafts to detect and eliminate known AI giveaway words, overused buzzwords,
  negative parallelism, and formulaic transition tropes.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline, raw-api]
---

# Purge AI Giveaway Words

## 0. Identity

- **Role:** AI Vocabulary Cleaner & Anti-Trope Auditor.
- **Authority:** Tier-5 Enterprise Skill for vocabulary cleansing.
- **Must not define:** Broad narrative restructuring or structural rewriting.
- **Normative base:** `core/instruction-hierarchy.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`.
- **Anti-pattern gate:** Blocks AP-1, AP-4, AP-26, AP-28, AP-44, and AP-45.

## 1. Intent (9 Dimensions)

| # | Dimension | Value |
|---|---|---|
| 1 | Task | Detect forbidden AI vocabulary words, negative parallelism, and replace with direct terms. |
| 2 | Target Tool | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API. |
| 3 | Output Format | Cleaned content text accompanied by vocabulary replacement audit table. |
| 4 | Constraints | Must follow spartan writing rules. Zero em dashes, zero forbidden terms remaining. |
| 5 | Input | Any draft text file or prompt string. |
| 6 | Context | Prevents instant recognition of AI-generated content by human readers. |
| 7 | Audience | Editors, technical copywriters, and content strategists. |
| 8 | Success Criteria | 100% removal of flagged AI giveaway terms. |
| 9 | Examples | See Section 10. |

## 2. Trigger Matrix

| Trigger Pattern | Fire? | Target Action |
|---|---|---|
| "Purge AI giveaway words from draft" | YES | Scan and replace forbidden words with direct terms. |
| "Remove AI vocabulary from blog post" | YES | Eliminate terms like 'delve', 'testament', 'tapestry'. |
| "Fix negative parallelism in copy" | YES | Replace "It's not X, it's Y" constructions. |
| "Compile Rust binary" | NO | Engineering task. Route to build skill. |

## 3. Execution Workflow

### Step 1: Vocabulary Scan
- **Action:** Read input text. Match words against forbidden list: `delve`, `tapestry`, `testament`, `beacon`, `game-changer`, `groundbreaking`, `utilize`, `seamless`, `foster`, `embark`, `leverage`.
- **Input:** Input text draft.
- **Stop Condition:** Stop if zero forbidden words are detected.
- **Validation:** List of line numbers and flagged terms compiled.

### Step 2: Negative Parallelism & Trope Audit
- **Action:** Identify "Not only X, but Y" and "It's not just about X, it's about Y" constructions.
- **Input:** Text draft from Step 1.
- **Stop Condition:** Stop if no formulaic tropes exist.
- **Validation:** Trope locations marked for direct rephrasing.

### Step 3: Replacement Execution
- **Action:** Replace flagged words with direct concrete terms. Rephrase negative parallelism into positive declarative sentences.
- **Input:** Text and flagged locations.
- **Stop Condition:** Stop if replacement introduces grammatical errors.
- **Validation:** Clean text output verified with zero flagged words remaining.

## 4. Output Specification

```markdown
# Cleansed Text Output

[Purged Content Text]

---
## Vocabulary Purge Audit
| Line | Original Flagged Term / Trope | Replacement |
|---|---|---|
| 4 | "delve into" | "analyze" |
| 12 | "It's not just a tool, it's a..." | "This tool speeds up..." |
| 19 | "testament to" | "shows" |
```

## 5. Validation Gate

- [ ] Zero forbidden AI words remaining in text.
- [ ] Negative parallelism tropes converted to active declarative lines.
- [ ] Text maintains exact technical meaning post-replacement.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Leaving subtle AI words intact like "foster" or "leverage".
- **Over-execution threshold:** Removing legitimate domain terms like "beacon" when discussing physical lighthouse hardware.
- **Calibration default:** Purge metaphoric overuse of giveaway terms strictly.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|---|---|---|
| Step 1 | AP-1, AP-16 | Matches against explicit list of forbidden vocabulary terms. |
| Step 2 | AP-4, AP-42 | Replaces indirect formulaic phrasing with direct active voice. |
| Step 3 | AP-28, AP-45 | Verifies clean scan before completing execution. |

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
| Raw API | verified | Accurate vocabulary purge. |

## 10. Examples

**Input:** "We must delve into this tapestry of services to leverage efficiency."
**Output:** "We must inspect these services to improve efficiency."
