---
name: reverse-engineer-viral-recipe
description: >-
  Extract foundational narrative mechanics, structural patterns, tension points, and hook dynamics
  from high-performing reference posts to apply to new content topics without copying text.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline, raw-api]
---

# Reverse Engineer Viral Recipe

## 0. Identity

- **Role:** Viral Narrative Analyst and Structural Engineer.
- **Authority:** Tier-5 Enterprise Skill for content structure extraction.
- **Must not define:** Direct copying of reference phrasing or plagiarism.
- **Normative base:** `core/instruction-hierarchy.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`.
- **Anti-pattern gate:** Blocks AP-1, AP-4, AP-26, AP-28, AP-44, and AP-45.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                             |
| --- | ---------------- | ------------------------------------------------------------------------------------------------- |
| 1   | Task             | Analyze reference viral post, extract structural blueprint, and apply recipe to new topic.        |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API.               |
| 3   | Output Format    | Recipe analysis document and newly generated post blueprint saved to target path.                 |
| 4   | Constraints      | Must follow spartan writing rules. Zero em dashes, zero banned words, zero direct phrase copying. |
| 5   | Input            | High-performing source post text, target topic, target audience context.                          |
| 6   | Context          | Prevents superficial copying, formulaic spam, and loss of original author voice.                  |
| 7   | Audience         | Content strategists, executive ghostwriters, and growth marketers.                                |
| 8   | Success Criteria | Abstract structural recipe extracted and verified against new topic draft.                        |
| 9   | Examples         | See Section 10.                                                                                   |

## 2. Trigger Matrix

| Trigger Pattern                           | Fire? | Target Action                                      |
| ----------------------------------------- | ----- | -------------------------------------------------- |
| "Reverse engineer this viral post recipe" | YES   | Extract structural blueprint and map to new topic. |
| "Deconstruct why this post went viral"    | YES   | Analyze hooks, pacing, and tension points.         |
| "Write post using structure of reference" | YES   | Apply extracted recipe to new subject matter.      |
| "Audit code syntax error"                 | NO    | Engineering task. Route to debugging skill.        |

## 3. Execution Workflow

### Step 1: Structural Extraction

- **Action:** Read reference text. Deconstruct hook line, tension trigger, evidence block, payoff line, and call to action.
- **Input:** Reference post text.
- **Stop Condition:** Stop if reference post contains insufficient structural depth.
- **Validation:** Structure divided into clear narrative beats.

### Step 2: Mechanics Mapping

- **Action:** Abstract text into reusable mechanics (e.g. status quo disruption, cost of inaction, paradigm shift).
- **Input:** Structural breakdown from Step 1.
- **Stop Condition:** Stop if abstraction relies on specific source domain jargon.
- **Validation:** Blueprint contains domain-agnostic instructions.

### Step 3: Target Topic Synthesis

- **Action:** Apply abstracted blueprint to user target topic. Write original post draft.
- **Input:** Extracted blueprint and target topic details.
- **Stop Condition:** Stop if output copies 4 or more consecutive words from reference text.
- **Validation:** New draft matches blueprint pacing without plagiarizing source text.

## 4. Output Specification

```markdown
# Structural Recipe Analysis

## 1. Deconstructed Mechanics

- Hook Type: Subverted expectation (Line 1)
- Tension Point: Hidden industry cost (Lines 2-4)
- Resolution: Technical pattern shift (Lines 5-8)
- Call to Action: Low-friction comment prompt (Line 9)

## 2. Target Topic Application

[Original Post Draft using extracted recipe]
```

## 5. Validation Gate

- [ ] Zero borrowed phrases from source post (plagiarism check passed).
- [ ] Structural recipe contains abstract narrative beats.
- [ ] Target draft conforms strictly to spartan prose standards.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Copying reference post text verbatim and swapping target nouns.
- **Over-execution threshold:** Over-analyzing 1-sentence posts with complex multi-stage narrative blueprints.
- **Calibration default:** Focus on narrative tension, line pacing, and hook dynamics.

## 7. Anti-Pattern Compliance

| Step   | Prevents AP  | Mechanism                                                                   |
| ------ | ------------ | --------------------------------------------------------------------------- |
| Step 1 | AP-1, AP-26  | Caps analysis strictly to structural beats of provided reference text.      |
| Step 2 | AP-4, AP-38  | Replaces specific source nouns with domain-agnostic narrative patterns.     |
| Step 3 | AP-28, AP-45 | Halts execution if draft replicates source phrasing, requiring user review. |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0`: Clean implementation matching Tier-5 Enterprise standard.

## 9. Portability Matrix

| Runtime     | Status   | Notes                           |
| ----------- | -------- | ------------------------------- |
| Claude Code | verified | Direct workspace execution.     |
| Cursor      | verified | Supported via rule file.        |
| Copilot     | verified | Formatted for prompt execution. |
| Windsurf    | verified | Fully compatible.               |
| Kiro        | verified | Fully compatible.               |
| Cline       | verified | Verified in active workspace.   |
| Raw API     | verified | Valid structural output.        |

## 10. Examples

**Input:** "Reverse engineer this viral post about cloud bills and apply it to database migrations."
**Output:** Extracts 4-beat tension structure. Generates original database migration post following identical pacing. Zero copied phrasing.
