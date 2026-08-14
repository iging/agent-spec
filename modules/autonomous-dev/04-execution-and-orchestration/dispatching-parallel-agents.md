---
name: dispatching-parallel-agents
description: >-
  Dispatch concurrent subagents for independent, non-overlapping tasks with conflict check gates.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline, raw-api]
---

# Parallel Subagent Dispatch & Conflict Management Protocol

## 0. Identity

- **Role:** Concurrent Multi-Agent Dispatcher & Conflict Arbiter.
- **Authority:** Handles parallel subagent task distribution for non-overlapping modules.
- **Must not define:** Direct production code editing within root process.
- **Normative base:** `core/decision-framework.md`, `shared/engineering/coding-principles.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`.
- **Anti-pattern gate:** Blocks AP-4, AP-26, AP-28, AP-44, and AP-45.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                 |
| --- | ---------------- | ------------------------------------------------------------------------------------- |
| 1   | Task             | Dispatch concurrent subagents for independent, non-overlapping task execution.        |
| 2   | Target Tool      | Any agent runtime supporting subagent concurrency (e.g. Claude Code).                 |
| 3   | Output Format    | Merged set of non-conflicting task diffs with full test pass report.                  |
| 4   | Constraints      | Must prove strict file independence before dispatch. Zero file overlap permitted.     |
| 5   | Input            | Implementation plan with multiple independent task modules.                           |
| 6   | Context          | Prevents git merge conflicts and race conditions across concurrent subagents.         |
| 7   | Audience         | Autonomous agents and release engineers managing parallel workflows.                  |
| 8   | Success Criteria | Concurrent subagents complete isolated tasks, diffs merge cleanly, test suite passes. |
| 9   | Examples         | See Section 10.                                                                       |

## 2. Trigger Matrix

| Trigger                                                     | Fire? | Notes                                           |
| ----------------------------------------------------------- | ----- | ----------------------------------------------- |
| Implementation plan contains 2+ independent task modules    | YES   | Core trigger.                                   |
| User explicitly requests parallel execution                 | YES   | Core trigger.                                   |
| Tasks touch overlapping files or shared interfaces          | NO    | Must run sequentially via `executing-plans.md`. |
| Execution environment does not support subagent concurrency | NO    | Fall back to sequential execution.              |

## 3. Execution Workflow

### Step 1: Pre-Flight Isolation Matrix

- **Action:** Read task descriptions. Compute file intersection matrix across all concurrent candidate tasks.
- **Input:** Task list with target file paths.
- **Stop Condition:** If any file is modified by more than one task, reject parallel execution for those tasks.
- **Validation:** Matrix proves zero file overlap.

### Step 2: Dispatch Concurrent Subagents

- **Action:** Issue parallel execution commands to separate subagent workers.
- **Input:** Independent task briefs and prompt specs (`references/implementer-prompt.md`).
- **Stop Condition:** If any subagent worker encounters an error, halt remaining workers.
- **Validation:** All subagent processes launched concurrently.

### Step 3: Collect & Merge Worktree Diffs

- **Action:** Collect execution reports and diffs from all completed subagents.
- **Input:** Subagent completion payloads.
- **Stop Condition:** If git merge conflict occurs, abort parallel merge and report collision.
- **Validation:** Diffs applied cleanly to working branch.

### Step 4: Run Unified Integration Testing

- **Action:** Run complete project integration and unit test suite against combined code state.
- **Input:** Combined git repository state.
- **Stop Condition:** Halt if any integration test fails.
- **Validation:** Test runner returns exit code 0.

## 4. Output Specification

```json
{
  "parallel_status": "SUCCESS",
  "concurrency_degree": 3,
  "files_modified": [
    "src/moduleA/index.ts",
    "src/moduleB/index.ts",
    "src/moduleC/index.ts"
  ],
  "integration_test_status": "PASSED"
}
```

## 5. Validation Gate

- [ ] Zero file path overlap between parallel task boundaries.
- [ ] Concurrent subagents executed in isolated git worktrees or paths.
- [ ] Unified integration test suite passes post-merge.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Serializing purely independent tasks increases execution latency.
- **Over-execution threshold:** Dispatching parallel subagents on shared state files causes merge conflicts.
- **Calibration default:** Use parallel dispatch strictly when file boundaries are disjoint.

## 7. Anti-Pattern Compliance

| Step | Prevents AP                  | Mechanism                                           |
| ---- | ---------------------------- | --------------------------------------------------- |
| 1    | AP-26 (no scope boundary)    | Enforces strict zero-file-overlap isolation matrix. |
| 3    | AP-4 (over-permissive agent) | Validates merge clean status before applying.       |
| 4    | AP-9 (no verification)       | Mandates complete unified test pass post-merge.     |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0` : Enterprise standard Tier-5 creation.

## 9. Portability Matrix

| Runtime     | Status   | Notes                     |
| ----------- | -------- | ------------------------- |
| Claude Code | verified | Parallel tool execution.  |
| Cursor      | verified | Parallel agent runner.    |
| Copilot     | verified | Multi-threaded runner.    |
| Windsurf    | verified | Parallel execution.       |
| Kiro        | verified | Parallel agent runner.    |
| Cline       | verified | Parallel sub-task runner. |
| Raw API     | verified | Async batch dispatcher.   |

## 10. Examples

**Input:** "Dispatch parallel tasks for module A, module B, and module C."
**Output:** 3 parallel subagents complete tasks with zero file conflicts and passing tests.
