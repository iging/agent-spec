---
name: anchor-author-voice
description: >-
  Maintain strict alignment with a calibrated author voice profile across extended writing sessions,
  preventing stylistic drift, generic AI defaults, and vocabulary degradation.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline, raw-api]
---

# Anchor Author Voice

## 0. Identity

- **Role:** Voice Consistency & Stylistic Alignment Anchor.
- **Authority:** Tier-5 Enterprise Skill for session-level tone enforcement.
- **Must not define:** Direct creative narrative generation without established profile guidelines.
- **Normative base:** `core/instruction-hierarchy.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`.
- **Anti-pattern gate:** Blocks AP-1, AP-4, AP-26, AP-28, AP-44, and AP-45.

## 1. Intent (9 Dimensions)

| # | Dimension | Value |
|---|---|---|
| 1 | Task | Load voice profile and enforce sentence cadence, vocabulary rules, and tone across drafts. |
| 2 | Target Tool | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API. |
| 3 | Output Format | Voice-anchored content draft matching author parameters. |
| 4 | Constraints | Must follow spartan writing rules. Zero em dashes, zero default AI vocabulary. |
| 5 | Input | Target topic or raw outline, path to author voice profile markdown file. |
| 6 | Context | Prevents voice drift during multi-turn long-form authoring sessions. |
| 7 | Audience | Executive ghostwriters, content leads, and newsletter authors. |
| 8 | Success Criteria | Draft matches target profile sentence length variance and punctuation constraints. |
| 9 | Examples | See Section 10. |

## 2. Trigger Matrix

| Trigger Pattern | Fire? | Target Action |
|---|---|---|
| "Write draft using Jane's voice profile" | YES | Load voice profile and anchor style throughout draft. |
| "Maintain author tone across this article" | YES | Enforce sentence variance and vocabulary constraints. |
| "Prevent AI voice drift in long post" | YES | Run continuous voice validation during drafting. |
| "Deploy application to production" | NO | Ops task. Route to infrastructure skill. |

## 3. Execution Workflow

### Step 1: Voice Profile Ingestion
- **Action:** Read author profile file from `.context/voice/` or system prompt. Extract quantitative bounds.
- **Input:** Profile file path.
- **Stop Condition:** Stop if profile file is missing or invalid format.
- **Validation:** Bounds loaded (sentence length range, forbidden list, punctuation rules).

### Step 2: Draft Generation & Style Enforcement
- **Action:** Draft text section by section. Check each paragraph against loaded voice bounds.
- **Input:** User prompt and loaded voice parameters.
- **Stop Condition:** Stop if draft contains any banned vocabulary words.
- **Validation:** Text conforms to sentence length caps and paragraph line limits.

### Step 3: Drift Verification Audit
- **Action:** Perform end-to-end pass over complete text. Measure sentence length distribution and check punctuation signature.
- **Input:** Completed text draft.
- **Stop Condition:** Stop if style drift exceeds 15% deviation from target profile parameters.
- **Validation:** Final text delivers identical cadence to author profile.

## 4. Output Specification

```markdown
# Draft Output (Anchored to Voice Profile)

[Anchored Draft Body Text]

---
## Voice Compliance Check
- Target Sentence Length Range: 6 - 15 words
- Calculated Average Sentence Length: 9.4 words
- Forbidden Words Checked: 0 Violations
- Punctuation Compliance: 100% Passed (Zero em dashes used)
```

## 5. Validation Gate

- [ ] Target voice profile loaded and verified before drafting.
- [ ] Zero forbidden words present in generated draft.
- [ ] Sentence length distribution matches profile bounds.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Ignoring loaded profile and outputting default assistant prose.
- **Over-execution threshold:** Refusing to draft content because target topic requires technical terms not listed in profile.
- **Calibration default:** Enforce sentence cadence and punctuation strictly while adapting technical nouns.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|---|---|---|
| Step 1 | AP-1, AP-16 | Restricts profile reading strictly to specified file path. |
| Step 2 | AP-4, AP-42 | Rejects generic AI vocabulary defaults automatically. |
| Step 3 | AP-28, AP-45 | Performs explicit compliance check before releasing draft. |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0`: Initial clean implementation matching Tier-5 Enterprise standard.

## 9. Portability Matrix

| Runtime | Status | Notes |
|---|---|---|
| Claude Code | verified | Direct workspace execution. |
| Cursor | verified | Supported via rule file. |
| Copilot | verified | Formatted for prompt execution. |
| Windsurf | verified | Fully compatible. |
| Kiro | verified | Fully compatible. |
| Cline | verified | Verified in active workspace. |
| Raw API | verified | Accurate voice anchoring. |

## 10. Examples

**Input:** "Write a post on backend scaling using `jane-profile.md`."
**Output:** Loads `jane-profile.md`. Drafts 300-word post using 9-word average sentences and colons for emphasis. Zero banned words used.
