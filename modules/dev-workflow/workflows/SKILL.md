---
name: workflows
description: >-
  Workflows group router for software development lifecycle, routing lifecycle requests to PRD generation and 5-stage engineering loop sub-skills.
version: 2.0.0
verified-on: [cline]
---

# Dev Workflow Workflows Group Router

## 0. Identity

- **Role:** Dev Workflow Lifecycle Dispatcher.
- **Authority:** Normative group router for `modules/dev-workflow/workflows/`.
- **Must not define:** Direct implementation code or execution of specific workflow stages directly; delegates to workflow sub-skills.
- **Normative base:** `core/decision-framework.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                             |
| --- | ---------------- | --------------------------------------------------------------------------------- |
| 1   | Task             | Classify lifecycle requests and dispatch to appropriate workflow sub-skill.       |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API.  |
| 3   | Output Format    | Structured routing decision and handoff to target workflow SKILL.md.              |
| 4   | Constraints      | Router executes no sub-skill tasks directly.                                      |
| 5   | Input            | User request to spec a feature, plan architecture, inspect code, checkpoint, etc. |
| 6   | Context          | Guarantees enforcement of the 5-stage engineering loop and PRD preparation.       |
| 7   | Audience         | Autonomous developer agents and software architects.                              |
| 8   | Success Criteria | Request routed to target workflow skill cleanly.                                  |
| 9   | Examples         | See Section 10.                                                                   |

## 2. Trigger Matrix

| Category | Trigger                                        | Target Skill File Path                                   |
| -------- | ---------------------------------------------- | -------------------------------------------------------- |
| PRD      | Create PRD, spec out feature                   | `workflows/prd-generator/SKILL.md`                       |
| Stage 1  | Blueprint session, pre-coding plan             | `workflows/engineering-loop/blueprint-session/SKILL.md`  |
| Stage 2  | Extract visual tokens from UI component        | `workflows/engineering-loop/ui-snapshot-tokens/SKILL.md` |
| Stage 3  | Code inspection, audit code against plan       | `workflows/engineering-loop/code-inspection/SKILL.md`    |
| Stage 4  | Context checkpoint, save/restore session state | `workflows/engineering-loop/context-checkpoint/SKILL.md` |
| Stage 5  | Failure triage, diagnose complex build bugs    | `workflows/engineering-loop/failure-triage/SKILL.md`     |

## 3. Execution Workflow

### Step 1: Analyze Lifecycle Request

- **Action:** Classify user request into PRD generation or one of the 5 engineering loop stages.
- **Input:** User prompt.
- **Stop Condition:** Ask user if workflow stage is ambiguous.
- **Validation:** Matches a row in the Trigger Matrix.

### Step 2: Resolve Sub-skill

- **Action:** Select exact sub-skill path under `workflows/`.
- **Input:** Trigger Matrix.
- **Stop Condition:** Decline if outside dev workflow lifecycle scope.
- **Validation:** Target SKILL.md exists.

### Step 3: Handoff Execution

- **Action:** Delegate control to target SKILL.md.
- **Input:** Target path.
- **Stop Condition:** Handoff control.
- **Validation:** Target skill begins execution.

## 4. Output Specification

```json
{
  "group": "workflows",
  "target_skill": "modules/dev-workflow/workflows/engineering-loop/blueprint-session/SKILL.md"
}
```

## 5. Validation Gate

- [ ] Lifecycle request mapped to target sub-skill path.
- [ ] Target SKILL.md file exists on disk.
- [ ] Router does not execute workflow logic directly.

## 6. Anti-Triggers

- **Under-execution:** Bypassing pre-coding blueprint and jumping straight to implementation code.
- **Over-execution:** Forcing PRD generation for simple, single-line bug fixes.

## 7. Anti-Pattern Compliance

| Step | Prevents AP            | Mechanism                                                      |
| ---- | ---------------------- | -------------------------------------------------------------- |
| 1    | AP-1 (vague task)      | Enforces workflow stage classification before execution.       |
| 3    | AP-4 (over-permissive) | Router delegates to sub-skills rather than executing directly. |

## 8. Versioning & Changelog

- **Version:** 2.0.0
- **Changelog:**
  - `2.0.0` — Workflows group router created for `modules/dev-workflow/workflows/`.

## 9. Portability Matrix

| Runtime     | Status   | Notes                           |
| ----------- | -------- | ------------------------------- |
| Claude Code | verified | Workflow sub-skill dispatcher.  |
| Cursor      | verified | Workflow routing rules.         |
| Copilot     | verified | Custom instructions.            |
| Windsurf    | verified | Workflow directive routing.     |
| Kiro        | verified | Skill runner handoff.           |
| Cline       | verified | System prompt loading.          |
| Raw API     | verified | Model-agnostic workflow router. |

## 10. Examples

**Input:** "Let's plan the architecture for the new authentication service before writing code."
**Output:** Target `modules/dev-workflow/workflows/engineering-loop/blueprint-session/SKILL.md`.
