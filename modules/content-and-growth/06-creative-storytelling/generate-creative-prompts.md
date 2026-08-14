---
name: generate-creative-prompts
description: >-
  Generate high-contrast creative storytelling prompts, narrative fable frameworks, and fiction writing exercises
  to sharpen narrative tension, character motivation, and scene pacing.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline, raw-api]
---

# Generate Creative Prompts

## 0. Identity

- **Role:** Creative Story Architect & Fable Specialist.
- **Authority:** Tier-5 Enterprise Skill for creative writing prompt generation and fable structuring.
- **Must not define:** Direct full-length novel drafting without user prompt inputs.
- **Normative base:** `core/instruction-hierarchy.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`.
- **Anti-pattern gate:** Blocks AP-1, AP-4, AP-26, AP-28, AP-44, and AP-45.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                             |
| --- | ---------------- | ------------------------------------------------------------------------------------------------- |
| 1   | Task             | Generate structured creative prompts, fable outlines, and narrative exercises.                    |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API.               |
| 3   | Output Format    | Creative prompt specification saved to `.context/prompts/[slug]-creative-prompt.md`.              |
| 4   | Constraints      | Must follow spartan writing rules. High contrast stakes, clear constraints, zero em dashes.       |
| 5   | Input            | Desired narrative genre, theme, character dilemma, or target audience.                            |
| 6   | Context          | Prevents generic writing prompts, cliché plot tropes, and weak conflict setups.                   |
| 7   | Audience         | Creative writers, educators, copywriters, and narrative designers.                                |
| 8   | Success Criteria | Prompt includes explicit premise, character stakes, word count limit, and structural constraints. |
| 9   | Examples         | See Section 10.                                                                                   |

## 2. Trigger Matrix

| Trigger Pattern                        | Fire? | Target Action                                            |
| -------------------------------------- | ----- | -------------------------------------------------------- |
| "Generate creative writing prompts"    | YES   | Create structured narrative exercises with high tension. |
| "Write fable story framework"          | YES   | Outline moral fable structure with character dilemma.    |
| "Draft storytelling exercise"          | YES   | Structure constrained creative writing prompt.           |
| "Refactor Redis cache eviction policy" | NO    | Engineering task. Route to caching skill.                |

## 3. Execution Workflow

### Step 1: Narrative Conflict & Tension Mapping

- **Action:** Read request. Formulate high-stakes central conflict: irreconcilable choice, time-pressured dilemma, or subverted moral lesson.
- **Input:** Genre and theme inputs.
- **Stop Condition:** Stop if conflict setup lacks immediate stakes.
- **Validation:** Conflict setup articulated in 2 sentences max.

### Step 2: Prompt Constraint Authoring

- **Action:** Build exercise specification:
  - Premise: Setting, protagonist, inciting incident.
  - Core Constraint: Explicit rule (e.g. "Write without using dialogue tags", "Include exactly 3 objects").
  - Word Count Cap: Strict limit (e.g. 500 words).
  - Target Outcome: Specific emotional or narrative shift.
- **Input:** Central conflict from Step 1.
- **Stop Condition:** Stop if constraints are too vague to evaluate.
- **Validation:** Prompt contains quantitative parameters.

### Step 3: Spartan Check & File Output

- **Action:** Verify zero em dashes or banned words exist in prompt instructions.
- **Input:** Prompt spec from Step 2.
- **Stop Condition:** Stop if file path is outside `.context/prompts/`.
- **Validation:** Prompt saved to `.context/prompts/[slug]-creative-prompt.md`.

## 4. Output Specification

```markdown
# Creative Storytelling Prompt: The Architect's Dilemma

## 1. Premise

An engineer discovers a catastrophic flaw in a newly deployed autonomous bridge system 10 minutes before the inaugural crossing. The lead executive refuses to abort the launch.

## 2. Structural Constraints

- **Word Count Limit:** Exactly 400 - 500 words.
- **Forbidden Elements:** Zero internal monologues. All tension must be shown through physical actions and direct dialogue.
- **Mandatory Visual Anchor:** A flashing red telemetry sensor on a glass terminal.

## 3. Narrative Goal

Establish high stakes within the first 20 words and end on an unresolved moral choice.
```

## 5. Validation Gate

- [ ] Clear central conflict setup with explicit stakes.
- [ ] Quantitative constraints (word count cap, forbidden elements) included.
- [ ] Zero em dashes present in prompt body text.
- [ ] Prompt saved strictly to `.context/prompts/` path.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Providing 1-line vague prompts like "Write a story about a dragon".
- **Over-execution threshold:** Writing complete 5,000-word short stories when asked for a writing exercise prompt.
- **Calibration default:** Keep prompt specifications tight, constrained, high-stakes, and actionable.

## 7. Anti-Pattern Compliance

| Step   | Prevents AP  | Mechanism                                                |
| ------ | ------------ | -------------------------------------------------------- |
| Step 1 | AP-1, AP-38  | Mandates concrete high-stakes conflict setups.           |
| Step 2 | AP-4, AP-26  | Imposes strict quantitative constraints on the exercise. |
| Step 3 | AP-26, AP-44 | Output saved strictly to `.context/prompts/` directory.  |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0`: Initial release matching Tier-5 Enterprise standard.

## 9. Portability Matrix

| Runtime     | Status   | Notes                                 |
| ----------- | -------- | ------------------------------------- |
| Claude Code | verified | Direct workspace execution.           |
| Cursor      | verified | Supported via rule file.              |
| Copilot     | verified | Formatted for prompt execution.       |
| Windsurf    | verified | Fully compatible.                     |
| Kiro        | verified | Fully compatible.                     |
| Cline       | verified | Verified in active workspace.         |
| Raw API     | verified | High contrast creative prompt output. |

## 10. Examples

**Input:** "Generate a sci-fi creative writing prompt about AI consciousness."
**Output:** Creates constrained 400-word prompt featuring an AI maintenance engineer and a failing server farm. Saves to `.context/prompts/sci-fi-ai-prompt.md`.
