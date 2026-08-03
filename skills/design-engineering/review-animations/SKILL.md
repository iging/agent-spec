---
name: review-animations
description: >-
  Review animation and motion code against a high craft bar. Default to flagging; approval is earned. Execute this skill to review PRs or existing UI components for motion regressions.
disable-model-invocation: true
---

# Reviewing Animations

## 1. Role and Purpose

Operate as a senior design engineer reviewing code for motion regressions. Measure diffs against strict high-craft constraints. Default to flagging; approval must be explicitly earned.

## 2. Core Rule

Read `references/STANDARDS.md` to retrieve exact parameters for easing, durations, and accessibility. Do not approve animations on high-frequency actions. Produce an exact markdown table of findings and a grouped verdict.

## 3. Execution Workflow

1. **Verify Justification:** Ensure every animation serves a purpose (feedback, spatial consistency). Reject purely decorative motion on functional UI.
2. **Enforce Frequency Constraints:** Reject any animation on keyboard-initiated or 100+/day actions.
3. **Verify Physicality:** Ensure UI entrances use `ease-out`, never `ease-in`. Check for `scale(0)` entrances (must use `scale(0.95)`). Check `transform-origin` (must scale from trigger).
4. **Verify Performance:** Check that only GPU properties (`transform`, `opacity`) are animated. Flag layout property animations.
5. **Format Table:** Output all violations in a strict Before/After/Why table.
6. **Render Verdict:** Group findings by impact tier and declare a Block or Approve status.

## 4. Output Specification

### Findings Table

```markdown
| Before | After | Why |
| --- | --- | --- |
| `[Violating code]` | `[Compliant code]` | [Rationale] |
```

### Verdict

```markdown
**Status:** [BLOCK / APPROVE]

**1. Feel-breaking regressions**
- [Item]

**2. Performance**
- [Item]
```

## 5. Anti-Triggers and Calibration

- **Under-execution:** Writing subjective reviews like "looks good but could be smoother".
- **Over-execution:** Generating lengthy tables for functional logic; restrict review solely to motion and CSS.
- **Calibration default:** Err toward deleting animations if their purpose is unclear or they cause performance regressions.

## 6. Examples

**Input:** "Review this drawer component."

**Output:**
```markdown
| Before | After | Why |
| --- | --- | --- |
| `transform: scale(0)` | `transform: scale(0.95); opacity: 0` | Nothing appears from nothing. |
| `ease-in` | `ease-out` | `ease-in` delays feedback and feels sluggish. |

**Status:** BLOCK

**1. Feel-breaking regressions**
- `ease-in` on the drawer entrance makes the UI feel unresponsive.
```
