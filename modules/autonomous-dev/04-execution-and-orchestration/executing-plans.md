---
name: executing-plans
description: >-
  Execute implementation plans sequentially within main context with interactive batching and user checkpoints.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline, raw-api]
---

# Sequential Batch Implementation Execution Protocol

## 0. Identity

- **Role:** Sequential Implementation Task Executor.
- **Authority:** Controls step-by-step plan execution within main agent session.
- **Must not define:** Unplanned structural edits, strictly follows implementation plan tasks.
- **Normative base:** `core/decision-framework.md`, `shared/engineering/coding-principles.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`.
- **Anti-pattern gate:** Blocks AP-1, AP-4, AP-26, AP-28, AP-44, and AP-45.

## 1. Intent (9 Dimensions)

| # | Dimension | Value |
|---|-----------|-------|
| 1 | Task | Execute plan tasks sequentially in batches of 1-3 tasks with user checkpoints. |
| 2 | Target Tool | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API. |
| 3 | Output Format | Completed code changes with updated plan checkboxes and test execution logs. |
| 4 | Constraints | Must halt after batch of 1-3 tasks for user verification. Must follow TDD cycles. |
| 5 | Input | Implementation plan path from `docs/superpowers/plans/`. |
| 6 | Context | Prevents runaway context expansion during sequential execution. |
| 7 | Audience | Developers performing guided plan execution. |
| 8 | Success Criteria | Plan tasks completed sequentially with zero skipped verification checks. |
| 9 | Examples | See Section 10. |

## 2. Trigger Matrix

| Trigger | Fire? | Notes |
|---------|-------|-------|
| Implementation plan ready in `docs/superpowers/plans/` | YES | Core trigger. |
| User requests direct sequential plan execution | YES | Core trigger. |
| Autonomous subagent orchestration requested | NO | Use `subagent-driven-development.md`. |
| No implementation plan exists | NO | Run `writing-plans.md` first. |

## 3. Execution Workflow

### Step 1: Load Implementation Plan

- **Action:** Read plan file. Identify uncompleted tasks (`[ ]`).
- **Input:** Implementation plan file path.
- **Stop Condition:** Halt if all tasks are already marked complete.
- **Validation:** Task queue established.

### Step 2: Execute Task Batch

- **Action:** Execute current batch of 1-3 tasks sequentially using Red-Green-Refactor logic.
- **Input:** Task file paths and requirements.
- **Stop Condition:** If any unit test fails, halt immediately and fix before proceeding.
- **Validation:** Unit tests for batch tasks pass.

### Step 3: Present User Checkpoint

- **Action:** Report completed batch items, diff summary, and test results.
- **Input:** Completed batch output.
- **Stop Condition:** Halt execution and wait for user permission to execute next batch.
- **Validation:** User authorization received.

### Step 4: Update Plan Checklist

- **Action:** Check off completed tasks (`[x]`) in the plan file.
- **Input:** User confirmation.
- **Stop Condition:** None.
- **Validation:** Plan document updated on disk.

## 4. Output Specification

```markdown
# Execution Batch Report

- Plan File: `docs/superpowers/plans/2026-08-14-user-search.md`
- Tasks Completed In Batch: Step 1, Step 2
- Test Suite Status: 100% Passing (14 tests)
- Awaiting User Direction: Ready for Step 3 batch.
```

## 5. Validation Gate

- [ ] Max 3 tasks executed per checkpoint batch.
- [ ] TDD cycle enforced for every task.
- [ ] User review checkpoint requested between batches.
- [ ] Plan checkboxes updated after user approval.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Running entire 20-task plan without stopping causes context degradation.
- **Over-execution threshold:** Asking user permission for every single line of code.
- **Calibration default:** Batch size of 1-3 tasks per checkpoint.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| 2 | AP-9 (no verification) | Runs unit tests after every task implementation. |
| 3 | AP-45 (no human review) | Stops for user checkpoint every 1-3 tasks. |
| 4 | AP-28 (no stop condition) | Establishes explicit batch pause points. |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0` : Enterprise standard Tier-5 creation.

## 9. Portability Matrix

| Runtime | Status | Notes |
|---------|--------|-------|
| Claude Code | verified | Direct task execution. |
| Cursor | verified | Chat mode batching. |
| Copilot | verified | Chat mode batching. |
| Windsurf | verified | Cascade batching. |
| Kiro | verified | Step execution. |
| Cline | verified | Step execution. |
| Raw API | verified | Model-agnostic execution guide. |

## 10. Examples

**Input:** "Execute batch 1 of plan docs/superpowers/plans/2026-08-14-user-search.md."
**Output:** Step 1 and Step 2 executed, tested, checked off, and presented for review.
