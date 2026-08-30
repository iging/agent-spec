---
name: dev-workflow
description: >-
  Module root router for software development lifecycle workflows, routing requests to PR evaluation, starter kits, automated testing, or 5-stage engineering loop workflows.
version: 2.0.0
verified-on: [cline]
---

# Dev Workflow Module Root Router

## 0. Identity

- **Role:** Dev Workflow Top-Level Dispatcher.
- **Authority:** Primary entry router for all capabilities under `skills/dev-workflow/`.
- **Must not define:** Direct feature implementation code or sub-domain tasks directly; delegates to group routers and specific skills.
- **Normative base:** `core/instruction-hierarchy.md`, `core/decision-framework.md`, `shared/writing/writing-rules.md`.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                         |
| --- | ---------------- | --------------------------------------------------------------------------------------------- |
| 1   | Task             | Classify dev-workflow requests and dispatch to appropriate sub-group or standalone skill.     |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API.              |
| 3   | Output Format    | Structured routing decision and handoff to target router or skill file.                       |
| 4   | Constraints      | Top-level router executes no code modifications or workflow steps directly.                   |
| 5   | Input            | User request regarding development lifecycle, PR evaluation, starter kits, testing, or spec.  |
| 6   | Context          | Ensures proper entry into software development capabilities suite.                             |
| 7   | Audience         | Autonomous developer agents and engineering teams.                                            |
| 8   | Success Criteria | Request cleanly routed to correct sub-path under `skills/dev-workflow/`.                     |
| 9   | Examples         | See Section 10.                                                                               |

## 2. Trigger Matrix

| Category              | Trigger                                        | Target Skill File Path                                |
| --------------------- | ---------------------------------------------- | ----------------------------------------------------- |
| PR Evaluation         | Evaluate PR suggestions, code review feedback  | `evaluate-pr-suggestions/SKILL.md`                    |
| Starter Kits          | Setup web starter kit, `.agents/` context      | `starter-kits-web/SKILL.md`                           |
| Testing Group         | Write, fix, or reference tests                 | `testing/SKILL.md`                                    |
| Workflows Group       | PRD creation, engineering loop stages          | `workflows/SKILL.md`                                  |

## 3. Execution Workflow

### Step 1: Analyze Input Intent

- **Action:** Read the user request to determine if it relates to PR evaluation, web starter kits, testing, or lifecycle workflows.
- **Input:** User prompt text.
- **Stop Condition:** Ask user for clarification if the target area is completely ambiguous.
- **Validation:** Intent matches one of the Trigger Matrix categories.

### Step 2: Route to Sub-domain Path

- **Action:** Dispatch to the designated sub-router or skill entry point.
- **Input:** Trigger Matrix mapping.
- **Stop Condition:** Decline execution if request falls outside software development workflow scope.
- **Validation:** Target file exists under `skills/dev-workflow/`.

### Step 3: Handoff Execution

- **Action:** Delegate control to the resolved skill file or group router.
- **Input:** Target path.
- **Stop Condition:** Handoff control.
- **Validation:** Downstream router or skill assumes control.

## 4. Output Specification

```json
{
  "module": "dev-workflow",
  "target_path": "skills/dev-workflow/workflows/SKILL.md",
  "reasoning": "Routed to workflows group router based on PRD spec request."
}
```

## 5. Validation Gate

- [ ] Dev workflow request mapped to valid target under `skills/dev-workflow/`.
- [ ] Target router or skill file exists on disk.
- [ ] Module root router executes no code changes directly.

## 6. Anti-Triggers

- **Under-execution:** Attempting to handle complex engineering workflows without delegating to specialized skills.
- **Over-execution:** Routing non-software-development prompts into dev-workflow.

## 7. Anti-Pattern Compliance

| Step | Prevents AP            | Mechanism                                                  |
| ---- | ---------------------- | ---------------------------------------------------------- |
| 1    | AP-1 (vague task)      | Demands sub-domain classification before execution.        |
| 3    | AP-4 (over-permissive) | Top router delegates all tasks to domain-specific skills.  |

## 8. Versioning & Changelog

- **Version:** 2.0.0
- **Changelog:**
  - `2.0.0` — Module root router created for `skills/dev-workflow/`.

## 9. Portability Matrix

| Runtime     | Status   | Notes                        |
| ----------- | -------- | ---------------------------- |
| Claude Code | verified | Root dev-workflow router.    |
| Cursor      | verified | Workspace rules router.      |
| Copilot     | verified | Custom instructions router.  |
| Windsurf    | verified | Workflow directive router.   |
| Kiro        | verified | Skill runner handoff.        |
| Cline       | verified | System prompt loading.       |
| Raw API     | verified | Model-agnostic root router.  |

## 10. Examples

**Input:** "Evaluate PR suggestions from code review."
**Output:** Target `skills/dev-workflow/evaluate-pr-suggestions/SKILL.md`.
