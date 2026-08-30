---
name: using-git-worktrees
description: >-
  Create isolated git worktree environments before implementation to protect main worktrees.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline, raw-api]
---

# Git Worktree Workspace Isolation Protocol

## 0. Identity

- **Role:** Git Workspace & Branch Isolation Specialist.
- **Authority:** Controls creation of isolated git worktrees and branch environments.
- **Must not define:** Implementation planning or coding logic, hands off to `writing-plans.md`.
- **Normative base:** `core/decision-framework.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`.
- **Anti-pattern gate:** Blocks AP-4 (over-permissive agent), AP-26 (no scope boundary), AP-44 (unlocked filesystem), and AP-45 (no human review trigger).

## 1. Intent (9 Dimensions)

| # | Dimension | Value |
|---|-----------|-------|
| 1 | Task | Create isolated git worktrees for new feature development. |
| 2 | Target Tool | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API. |
| 3 | Output Format | Isolated branch in `.worktrees/<feature-name>` directory. |
| 4 | Constraints | Must ask user confirmation before worktree creation. Must verify clean baseline tests. |
| 5 | Input | Target feature name and base branch name. |
| 6 | Context | Prevents dirtying main worktrees and accidental commits to protected branches. |
| 7 | Audience | Autonomous agents and developers starting feature implementation. |
| 8 | Success Criteria | New worktree created, clean git status, existing test suite passes. |
| 9 | Examples | See Section 10. |

## 2. Trigger Matrix

| Trigger | Fire? | Notes |
|---------|-------|-------|
| Approved design spec ready for implementation | YES | Core trigger. |
| User requests isolated workspace setup | YES | Core trigger. |
| Session already running inside a linked worktree | NO | Skip creation. |
| Single-line typo fix in current branch | NO | Execute directly in main tree. |

## 3. Execution Workflow

### Step 1: Detect Worktree Environment

- **Action:** Check if working directory is already an isolated worktree via `git rev-parse --is-inside-work-tree`.
- **Input:** Current working directory.
- **Stop Condition:** If already inside a linked worktree, stop and proceed to planning.
- **Validation:** Workspace state confirmed.

### Step 2: Request User Confirmation

- **Action:** Prompt user for permission to create a new git worktree directory.
- **Input:** Proposed feature branch name (e.g. `feature/user-auth`).
- **Stop Condition:** Halts if user declines worktree creation.
- **Validation:** User explicit consent recorded.

### Step 3: Execute Worktree Creation

- **Action:** Run `git worktree add -b <branch-name> .worktrees/<feature-name>`.
- **Input:** Feature branch name and destination path.
- **Stop Condition:** If git command fails, report error and stop.
- **Validation:** Directory `.worktrees/<feature-name>` exists and `git status` is clean.

### Step 4: Baseline Verification

- **Action:** Run repository build and test suite inside the new worktree.
- **Input:** New worktree path.
- **Stop Condition:** If baseline tests fail, halt and report pre-existing errors.
- **Validation:** Test runner returns status code 0.

## 4. Output Specification

```markdown
# Worktree Isolation Handoff

- Worktree Path: `.worktrees/user-auth`
- Branch Name: `feature/user-auth`
- Baseline Test Status: PASSED
- Handoff Target: `03-planning-and-decomposition/writing-plans.md`
```

## 5. Validation Gate

- [ ] User consent received prior to worktree creation.
- [ ] Worktree located in `.worktrees/`.
- [ ] Baseline test suite passes with zero errors.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Working directly on main branch causes branch pollution.
- **Over-execution threshold:** Creating worktrees when already operating in an isolated branch.
- **Calibration default:** Mandatory for multi-task feature implementations.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| 2 | AP-45 (no human review) | Requires explicit user consent before creation. |
| 3 | AP-44 (unlocked filesystem) | Restricts isolation directory to `.worktrees/`. |
| 4 | AP-9 (goal without verification) | Runs baseline test suite before coding. |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0` : Enterprise standard Tier-5 creation.

## 9. Portability Matrix

| Runtime | Status | Notes |
|---------|--------|-------|
| Claude Code | verified | Git command execution. |
| Cursor | verified | Terminal integration. |
| Copilot | verified | Terminal integration. |
| Windsurf | verified | Terminal integration. |
| Kiro | verified | Command runner. |
| Cline | verified | Command runner. |
| Raw API | verified | Command instruction generator. |

## 10. Examples

**Input:** "Set up worktree for user search feature."
**Output:** Worktree active at `.worktrees/user-search`.
