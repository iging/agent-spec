---
name: finishing-a-development-branch
description: >-
  Verify test suites, present merge or pull request options, and safely clean up worktrees.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline, raw-api]
---

# Safe Branch Closeout & Worktree Cleanup Protocol

## 0. Identity

- **Role:** Release Engineering & Worktree Shutdown Specialist.
- **Authority:** Handles branch closeout, pull request options, and worktree removal.
- **Must not define:** Direct code edits, handles lifecycle closeout only.
- **Normative base:** `core/decision-framework.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`.
- **Anti-pattern gate:** Blocks AP-4, AP-26, AP-28, AP-44, and AP-45.

## 1. Intent (9 Dimensions)

| # | Dimension | Value |
|---|-----------|-------|
| 1 | Task | Verify test completion, present closeout options, and safely clean up worktrees. |
| 2 | Target Tool | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API. |
| 3 | Output Format | Merged branch, created pull request, or safely removed worktree. |
| 4 | Constraints | Must not use force flags (`--force`) on untracked files without explicit confirmation. |
| 5 | Input | Active git branch and worktree path. |
| 6 | Context | Prevents orphaned worktrees, accidental data destruction, and unverified merges. |
| 7 | Audience | Autonomous agents and developers completing feature tasks. |
| 8 | Success Criteria | Full test suite passes, closeout action executed, worktree cleaned up. |
| 9 | Examples | See Section 10. |

## 2. Trigger Matrix

| Trigger | Fire? | Notes |
|---------|-------|-------|
| All tasks in implementation plan completed | YES | Core trigger. |
| User requests branch closeout or PR creation | YES | Core trigger. |
| Implementation tasks remain incomplete | NO | Complete tasks first. |
| Test suite is failing | NO | Fix failing tests first. |

## 3. Execution Workflow

### Step 1: Final Test Verification

- **Action:** Run complete project test suite and static analysis checks.
- **Input:** Repository root directory.
- **Stop Condition:** Halt immediately if any test fails.
- **Validation:** Test runner returns status code 0.

### Step 2: Uncommitted File Audit

- **Action:** Inspect worktree for untracked or uncommitted changes (`git status --short`).
- **Input:** Worktree working directory.
- **Stop Condition:** Stop and ask user if untracked files are detected.
- **Validation:** Working directory is completely clean.

### Step 3: Present Closeout Options

- **Action:** Present options to user: 1) Merge to base branch, 2) Create Pull Request, 3) Keep worktree.
- **Input:** Clean git status and passed test suite.
- **Stop Condition:** Halt and wait for user selection.
- **Validation:** User selection received.

### Step 4: Execute Closeout & Safe Removal

- **Action:** Perform selected merge/PR action. Remove worktree using `git worktree remove`.
- **Input:** User selected option.
- **Stop Condition:** If `git worktree remove` rejects due to uncommitted files, stop and report.
- **Validation:** Worktree directory safely deleted.

## 4. Output Specification

```markdown
# Branch Closeout Report

- Branch: `feature/user-auth`
- Closeout Action Executed: Pull Request Created (#42)
- Worktree Status: Safely Removed (`.worktrees/user-auth`)
- Final Test Status: 100% Passing
```

## 5. Validation Gate

- [ ] All unit and integration tests pass.
- [ ] Working directory has zero uncommitted changes.
- [ ] User explicitly selected closeout option.
- [ ] Worktree path safely removed without force deletion of untracked files.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Leaving stale worktrees pollutes disk and git references.
- **Over-execution threshold:** Running branch shutdown when implementation tasks remain open.
- **Calibration default:** Trigger only after plan tasks are 100% complete and verified.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| 1 | AP-9 (no verification) | Mandates complete test pass before closeout. |
| 2 | AP-4 (over-permissive agent) | Audits uncommitted files before deletion. |
| 3 | AP-45 (no human review) | Requires user selection of merge vs PR option. |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0` : Enterprise standard Tier-5 creation.

## 9. Portability Matrix

| Runtime | Status | Notes |
|---------|--------|-------|
| Claude Code | verified | Git command execution. |
| Cursor | verified | Terminal execution. |
| Copilot | verified | Terminal execution. |
| Windsurf | verified | Terminal execution. |
| Kiro | verified | Command runner. |
| Cline | verified | Command runner. |
| Raw API | verified | Model-agnostic closeout guide. |

## 10. Examples

**Input:** "Finish development branch feature/user-auth."
**Output:** PR created and worktree `.worktrees/user-auth` removed.
