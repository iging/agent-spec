---
name: learning
description: >-
  Learning group router for research and productivity, routing pre-build interview and step-by-step coaching requests to specialist sub-skills.
version: 2.0.0
verified-on: [cline]
---

# Learning Group Router

## 0. Identity

- **Role:** Learning Sub-Group Router and Dispatcher.
- **Authority:** Normative group router for `skills/research-and-productivity/learning/`.
- **Must not define:** Direct interview or coaching execution; delegates to sub-skills.
- **Normative base:** `core/decision-framework.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`, `docs/skill-standard.md`.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                        |
| --- | ---------------- | -------------------------------------------------------------------------------------------- |
| 1   | Task             | Classify learning requests and dispatch to `build-spec-interviewer` or `step-by-step-coach`. |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API.             |
| 3   | Output Format    | Structured routing decision and handoff to target learning sub-skill.                        |
| 4   | Constraints      | Router executes no coaching or interviewing tasks directly.                                  |
| 5   | Input            | User request to interview before building or coach through a process.                        |
| 6   | Context          | Prevents premature execution and unguided learning workflows.                                |
| 7   | Audience         | Requesting users and non-technical learners.                                                 |
| 8   | Success Criteria | Exactly one target learning sub-skill resolved deterministically.                            |
| 9   | Examples         | See Section 10.                                                                              |

## 2. Trigger Matrix

| Category            | Trigger                                                                 | Target Skill File Path                     |
| ------------------- | ----------------------------------------------------------------------- | ------------------------------------------ |
| Pre-Build Interview | Interview user with 10-15 questions before building non-trivial request | `learning/build-spec-interviewer/SKILL.md` |
| Step-by-Step Coach  | Walk beginner through multi-step process one confirmed step at a time   | `learning/step-by-step-coach/SKILL.md`     |

## 3. Execution Workflow

### Step 1: Analyze Request

- **Action:** Classify request into pre-build interview vs step-by-step coaching.
- **Input:** User prompt text.
- **Stop Condition:** Ask user if intent is ambiguous.
- **Validation:** Matches Trigger Matrix.

### Step 2: Resolve Target

- **Action:** Select target sub-skill path under `skills/research-and-productivity/learning/`.
- **Input:** Trigger Matrix.
- **Stop Condition:** Decline execution if out of scope.
- **Validation:** Target SKILL.md exists.

### Step 3: Handoff

- **Action:** Delegate control to target SKILL.md.
- **Input:** Resolved target.
- **Stop Condition:** Handoff control.
- **Validation:** Sub-skill executes.

## 4. Output Specification

```json
{
  "group": "learning",
  "target_skill": "skills/research-and-productivity/learning/build-spec-interviewer/SKILL.md"
}
```

## 5. Validation Gate

- [ ] Learning intent mapped to target sub-skill path.
- [ ] Target SKILL.md exists on disk.
- [ ] Router executes no learning logic directly.

## 6. Anti-Triggers

- **Under-execution:** Building a complex project without running the pre-build interview.
- **Over-execution:** Forcing a 10-question interview for a simple single-line typo fix.

## 7. Anti-Pattern Compliance

| Step | Prevents AP            | Mechanism                                       |
| ---- | ---------------------- | ----------------------------------------------- |
| 1    | AP-1 (vague task)      | Demands classification before handoff.          |
| 3    | AP-4 (over-permissive) | Group router delegates execution to sub-skills. |

## 8. Versioning & Changelog

- **Version:** 2.0.0
- **Changelog:**
  - `2.0.0` — Learning group router created for `skills/research-and-productivity/learning/`.

## 9. Portability Matrix

| Runtime     | Status   | Notes                           |
| ----------- | -------- | ------------------------------- |
| Claude Code | verified | Learning sub-skill dispatcher.  |
| Cursor      | verified | Learning rules routing.         |
| Copilot     | verified | Custom instructions.            |
| Windsurf    | verified | Learning directive routing.     |
| Kiro        | verified | Skill runner handoff.           |
| Cline       | verified | System prompt loading.          |
| Raw API     | verified | Model-agnostic learning router. |

## 10. Examples

**Input:** "Walk me step-by-step through setting up a newsletter."
**Output:** Target `skills/research-and-productivity/learning/step-by-step-coach/SKILL.md`.
