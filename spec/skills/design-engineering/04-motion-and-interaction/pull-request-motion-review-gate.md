---
name: pull-request-motion-review-gate
description: >-
  Review animation and motion code against a high craft bar. Default to flagging; approval is earned.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline, raw-api]
disable-model-invocation: true
---

# Motion Code Review & Regression Gate Protocol

## 0. Identity

- **Role:** Senior Motion Code Reviewer & Craft Gatekeeper.
- **Authority:** Reviews pull requests and component diffs for motion regressions and feel violations.
- **Must not define:** Direct functional business logic, enforces motion standards and hardware properties.
- **Normative base:** `core/decision-framework.md`, `shared/engineering/typescript-standards.md`, `shared/engineering/naming-conventions.md`, `shared/engineering/design-principles.md`, `shared/engineering/function-design.md`, `shared/engineering/module-organization.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`.
- **Anti-pattern gate:** Blocks AP-1, AP-4, AP-18, AP-26, AP-28, AP-44, and AP-45.

## 1. Intent (9 Dimensions)

| # | Dimension | Value |
|---|-----------|-------|
| 1 | Task | Evaluate code diffs against strict motion standards and declare BLOCK or APPROVE verdict. |
| 2 | Target Tool | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API. |
| 3 | Output Format | Before/After/Why comparison table and grouped verdict report (BLOCK/APPROVE). |
| 4 | Constraints | Read `../references/animation-standards.md`. Default to flagging (approval earned). |
| 5 | Input | PR diff, UI component animation code, or pull request review request. |
| 6 | Context | Prevents animation regressions, un-accelerated CSS properties, and sluggish UI entrances. |
| 7 | Audience | Code reviewers, frontend engineers, and release engineers. |
| 8 | Success Criteria | Verifies purpose, blocks keyboard animations, enforces GPU properties, outputs strict verdict. |
| 9 | Examples | See Section 10. |

## 2. Trigger Matrix

| Trigger | Fire? | Notes |
|---------|-------|-------|
| Review PR or component diff for motion regressions | YES | Core trigger. |
| Verification of easing curves, durations, or hardware acceleration | YES | Core trigger. |
| General backend code review | NO | Out of scope. |

## 3. Execution Workflow

### Step 1: Purpose Verification & Standards Scan

- **Action:** Read `../references/animation-standards.md`. Ensure every animation serves explicit purpose (spatial, feedback, state). Reject purely decorative motion on functional UI.
- **Input:** Code diff or component file.
- **Stop Condition:** Halt if animation purpose is undefined.
- **Validation:** Purpose verified against standards.

### Step 2: Frequency & Physicality Audit

- **Action:** Reject any animation on keyboard-initiated or 100+/day actions. Verify UI entrances use `ease-out` (never `ease-in`), `scale(0.95)` (never `scale(0)`), and proper `transform-origin`.
- **Input:** Interaction trigger type and CSS properties.
- **Stop Condition:** Halt if keyboard-triggered animation is approved.
- **Validation:** Frequency and physical bounds verified.

### Step 3: Performance Verification

- **Action:** Check that only GPU properties (`transform`, `opacity`) are animated. Flag layout property animations (`width`, `height`, `top`, `left`).
- **Input:** CSS rules and Motion parameters.
- **Stop Condition:** Halt if layout properties are animated without layout transition wrapper.
- **Validation:** Hardware acceleration confirmed.

### Step 4: Output Assembly & Verdict Generation

- **Action:** Output all violations in strict Before/After/Why table. Group findings by impact tier and declare explicit status (`BLOCK` or `APPROVE`).
- **Input:** Verified violations list.
- **Stop Condition:** Halt if verdict status is omitted.
- **Validation:** Table and explicit verdict emitted.

## 4. Output Specification

```markdown
### Findings Table

| Before | After | Why |
| --- | --- | --- |
| `transform: scale(0)` | `transform: scale(0.95); opacity: 0` | Real-world objects do not scale from 0 |
| `ease-in` | `ease-out` | `ease-in` delays feedback and feels sluggish |

### Verdict

**Status:** BLOCK

**1. Feel-breaking regressions**
- `ease-in` on drawer entrance makes UI feel unresponsive.
```

## 5. Validation Gate

- [ ] Reads exact parameters from `../references/animation-standards.md`.
- [ ] Rejects animations on 100+/day keyboard-initiated actions.
- [ ] Formats findings into 3-column `| Before | After | Why |` table.
- [ ] Emits explicit `BLOCK` or `APPROVE` verdict status.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Writing subjective reviews like "looks good but could be smoother".
- **Over-execution threshold:** Generating review tables for non-visual backend logic.
- **Calibration default:** Default to BLOCK if motion purpose is unproven or off-GPU.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| 1 | AP-1 (vague task) | Demands explicit reference loading before code review. |
| 3 | AP-4 (over-permissive agent) | Blocks off-GPU layout property animations. |
| 4 | AP-18 (unstructured output) | Enforces structured findings table and explicit verdict. |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0` : Enterprise standard Tier-5 creation derived from review-animations.

## 9. Portability Matrix

| Runtime | Status | Notes |
|---------|--------|-------|
| Claude Code | verified | Direct motion code review gate. |
| Cursor | verified | Interactive PR diff review. |
| Copilot | verified | In-line review assistant. |
| Windsurf | verified | Cascade execution. |
| Kiro | verified | Motion reviewer runner. |
| Cline | verified | System prompt task mode. |
| Raw API | verified | Model-agnostic review engine. |

## 10. Examples

**Input:** "Review this drawer component."
**Output:** Findings table emitted flagging `scale(0)` and `ease-in`, verdict declared as `Status: BLOCK`.
