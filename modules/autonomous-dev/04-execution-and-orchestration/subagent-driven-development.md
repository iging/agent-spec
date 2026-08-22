---
name: subagent-driven-development
description: >-
  Execute implementation plans task-by-task using isolated fresh-context subagents with two-stage reviews.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline, raw-api]
---

# Subagent-Driven Development Orchestration Protocol

## 0. Identity

- **Role:** Autonomous Subagent Multi-Agent Orchestrator.
- **Authority:** Controls dispatching fresh-context implementer subagents and reviewer subagents.
- **Must not define:** Direct production code edits within orchestrator context, delegates to subagents.
- **Normative base:** `core/decision-framework.md`, `shared/engineering/typescript-standards.md`, `shared/engineering/naming-conventions.md`, `shared/engineering/design-principles.md`, `shared/engineering/function-design.md`, `shared/engineering/module-organization.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`.
- **Anti-pattern gate:** Blocks AP-1, AP-2, AP-3, AP-4, AP-26, AP-28, AP-44, and AP-45.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                      |
| --- | ---------------- | ------------------------------------------------------------------------------------------ |
| 1   | Task             | Execute plan tasks using fresh-context implementers and two-stage reviewer subagents.      |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API.        |
| 3   | Output Format    | Tested code changes with completed plan checklist updates.                                 |
| 4   | Constraints      | Implementers must operate in fresh context. Reviewers must evaluate Spec and Code Quality. |
| 5   | Input            | Implementation plan path from `docs/superpowers/plans/`.                                   |
| 6   | Context          | Prevents context degradation, dirtying main context, and unreviewed changes.               |
| 7   | Audience         | Developers and autonomous multi-agent execution systems.                                   |
| 8   | Success Criteria | All plan tasks implemented, reviewed, and verified by passing test suite.                  |
| 9   | Examples         | See Section 10.                                                                            |

## 2. Trigger Matrix

| Trigger                                                  | Fire? | Notes                         |
| -------------------------------------------------------- | ----- | ----------------------------- |
| Implementation plan ready in `docs/superpowers/plans/`   | YES   | Core trigger.                 |
| User requests autonomous plan execution with subagents   | YES   | Core trigger.                 |
| Single small task best suited for direct batch execution | NO    | Use `executing-plans.md`.     |
| No implementation plan exists                            | NO    | Run `writing-plans.md` first. |

## 3. Execution Workflow

### Step 1: Initialize Orchestration Session

- **Action:** Load implementation plan. Verify clean git status and passing baseline tests.
- **Input:** Plan file path.
- **Stop Condition:** Halt if baseline tests fail.
- **Validation:** Plan tasks identified and baseline verified.

### Step 2: Dispatch Implementer Subagent

- **Action:** Spawn fresh-context implementer subagent with task prompt template (`references/implementer-prompt.md`).
- **Input:** Task details, target file paths, and test requirements.
- **Stop Condition:** If implementer fails task, retry once or halt for user review.
- **Validation:** Implementer returns deliverable report and updated diff.

### Step 3: Dispatch Skeptical Reviewer Subagent

- **Action:** Spawn fresh-context reviewer subagent with reviewer prompt (`references/task-reviewer-prompt.md`).
- **Input:** Task brief and git diff.
- **Stop Condition:** If reviewer returns REJECTED status, send feedback to implementer.
- **Validation:** Reviewer returns APPROVED status for both Spec Compliance and Code Quality.

### Step 4: Mark Completed & Proceed

- **Action:** Update plan checkbox (`[x]`). Commit task changes to git.
- **Input:** Approved task diff.
- **Stop Condition:** Halts after each task batch if human review requested.
- **Validation:** Task marked complete and clean commit created.

## 4. Output Specification

```json
{
  "orchestration_status": "COMPLETED",
  "tasks_executed": 4,
  "tasks_approved": 4,
  "commits_created": 4,
  "final_test_status": "PASSED"
}
```

## 5. Validation Gate

- [ ] Every task implemented in a fresh subagent context.
- [ ] Spec compliance verified before code quality evaluation.
- [ ] Zero un-reviewed commits pushed to target branch.
- [ ] Full test suite passes at workflow completion.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Running all tasks in single long context window leads to degradation.
- **Over-execution threshold:** Spawning subagents for minor single-line typo edits.
- **Calibration default:** Standard execution path for complex multi-task feature plans.

## 7. Anti-Pattern Compliance

| Step | Prevents AP              | Mechanism                                             |
| ---- | ------------------------ | ----------------------------------------------------- |
| 2    | AP-2 (context pollution) | Spawns fresh context subagents for each task.         |
| 3    | AP-45 (no human review)  | Evaluates spec compliance and quality before merging. |
| 4    | AP-9 (no verification)   | Re-runs full test suite before updating checklist.    |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0` : Enterprise standard Tier-5 creation.

## 9. Portability Matrix

| Runtime     | Status   | Notes                              |
| ----------- | -------- | ---------------------------------- |
| Claude Code | verified | Native subagent tool invocation.   |
| Cursor      | verified | Agent subprocess support.          |
| Copilot     | verified | Agent subprocess support.          |
| Windsurf    | verified | Cascade execution.                 |
| Kiro        | verified | Agent tool support.                |
| Cline       | verified | Sub-task runner.                   |
| Raw API     | verified | Model-agnostic multi-agent runner. |

## 10. Examples

**Input:** "Execute plan docs/superpowers/plans/2026-08-14-user-search.md using subagents."
**Output:** All tasks executed, reviewed, and committed with green test suite.
