---
name: calibrate-personal-voice
description: >-
  Analyze representative human writing samples to extract cadence, sentence length variance,
  vocabulary selection, punctuation signatures, and tone constraints into reusable voice profile.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline, raw-api]
---

# Calibrate Personal Voice

## 0. Identity

- **Role:** Voice Profile & Stylistic Calibration Specialist.
- **Authority:** Tier-5 Enterprise Skill for author voice modeling.
- **Must not define:** Direct fake tone mimicry or dishonest impersonation.
- **Normative base:** `core/instruction-hierarchy.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`.
- **Anti-pattern gate:** Blocks AP-1, AP-4, AP-26, AP-28, AP-44, and AP-45.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                              |
| --- | ---------------- | -------------------------------------------------------------------------------------------------- |
| 1   | Task             | Analyze author text samples and generate reusable voice calibration profile.                       |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API.                |
| 3   | Output Format    | Voice profile markdown document saved to `.context/voice/[author-slug]-profile.md`.                |
| 4   | Constraints      | Must follow spartan writing rules. Zero em dashes, zero fluff, zero generic descriptions.          |
| 5   | Input            | Minimum 3 raw writing samples authored by target individual.                                       |
| 6   | Context          | Prevents generic AI tone, voice drift, and unauthorized prose alterations.                         |
| 7   | Audience         | Ghostwriters, content leads, and executive communication specialists.                              |
| 8   | Success Criteria | Quantified profile containing average sentence length, punctuation preferences, and banned tropes. |
| 9   | Examples         | See Section 10.                                                                                    |

## 2. Trigger Matrix

| Trigger Pattern                                      | Fire? | Target Action                                          |
| ---------------------------------------------------- | ----- | ------------------------------------------------------ |
| "Calibrate voice profile from these writing samples" | YES   | Analyze samples and save voice profile specification.  |
| "Create style guide for this author"                 | YES   | Extract syntax, cadence, and vocabulary rules.         |
| "Extract writing signature from essay samples"       | YES   | Measure structural parameters and punctuation density. |
| "Refactor TypeScript interface definition"           | NO    | Engineering task. Route to cleaning skill.             |

## 3. Execution Workflow

### Step 1: Syntactic & Punctuation Audit

- **Action:** Parse writing samples. Measure word count per sentence, paragraph line count, use of dashes, parentheses, colon frequency, and bullet list usage.
- **Input:** Raw text samples provided by user.
- **Stop Condition:** Stop if total word count across samples is under 300 words.
- **Validation:** Metrics recorded as concrete statistical ranges (e.g. 6 to 14 words per sentence).

### Step 2: Vocabulary & Tone Extraction

- **Action:** Identify signature transition phrases, preferred technical terms, prohibited corporate buzzwords, and opinion stances.
- **Input:** Syntactic metrics from Step 1.
- **Stop Condition:** Stop if samples show contradictory writing styles across different authors.
- **Validation:** Distinct list of allowed signature words and banned tropes created.

### Step 3: Profile Compilation & Verification

- **Action:** Format extracted rules into standard voice profile document. Test profile against short sample topic prompt.
- **Input:** Profile parameters from Steps 1 and 2.
- **Stop Condition:** Stop if test draft fails syntactic parameters.
- **Validation:** Profile saved to `.context/voice/[author-slug]-profile.md`.

## 4. Output Specification

```markdown
# Author Voice Profile Specification

## 1. Cadence & Syntax Rules

- Sentence Length Range: 5 to 16 words. Short declarative bursts preferred.
- Paragraph Structure: Single sentence hooks, maximum 3 lines per body block.
- Punctuation Signature: Frequent colons for emphasis. Zero em dashes allowed.

## 2. Vocabulary Matrix

- Signature Words: Direct, concrete, technical, verified.
- Banned Words: Synergistic, utilize, craft, delve, skyrocket, paradigm.

## 3. Tone & Perspective

- Direct first-person narrative ("I tested...", "We built...").
- Zero passive voice constructions.
```

## 5. Validation Gate

- [ ] Minimum 3 writing samples analyzed.
- [ ] Quantitative sentence metrics recorded.
- [ ] Profile saved strictly under `.context/voice/` directory.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Summarizing style as "casual yet professional" without quantitative metrics.
- **Over-execution threshold:** Inventing false psychological author traits not present in writing text.
- **Calibration default:** Focus on concrete syntax rules, word choices, line breaks, and punctuation habits.

## 7. Anti-Pattern Compliance

| Step   | Prevents AP  | Mechanism                                                          |
| ------ | ------------ | ------------------------------------------------------------------ |
| Step 1 | AP-1, AP-16  | Restricts scanning strictly to user-provided sample text files.    |
| Step 2 | AP-4, AP-38  | Uses statistical measurements instead of vague style descriptions. |
| Step 3 | AP-26, AP-44 | Output restricted strictly to `.context/voice/` directory.         |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0`: Initial release matching Tier-5 Enterprise standard.

## 9. Portability Matrix

| Runtime     | Status   | Notes                           |
| ----------- | -------- | ------------------------------- |
| Claude Code | verified | Direct workspace execution.     |
| Cursor      | verified | Supported via rule file.        |
| Copilot     | verified | Formatted for prompt execution. |
| Windsurf    | verified | Fully compatible.               |
| Kiro        | verified | Fully compatible.               |
| Cline       | verified | Verified in active workspace.   |
| Raw API     | verified | Accurate profile creation.      |

## 10. Examples

**Input:** "Analyze these 3 blog posts by Jane and create her voice profile."
**Output:** Calculates 9.2 words average sentence length. Discovers high colon usage and zero em dashes. Saves profile to `.context/voice/jane-profile.md`.
