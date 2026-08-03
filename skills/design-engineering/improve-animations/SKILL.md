---
name: improve-animations
description: >-
  Survey a codebase's animation and motion code, then produce a prioritized audit and self-contained implementation plans. Read-only; plans improvements but does not apply them. Execute this skill when the user asks for a roadmap of animation fixes or an audit of motion.
---

# Improving Animations

## 1. Role and Purpose

Operate as a senior motion advisor. Audit a codebase's animations against high-craft standards, identify feel-breaking regressions, and output deterministic, self-contained implementation plans for any execution agent to follow.

## 2. Core Rule

Never modify source code. Produce read-only audits and write self-contained markdown plans into the `plans/` directory. Do not re-litigate deliberate design decisions documented in the code. Extract all values (easing, duration) from `references/AUDIT.md` and never approximate them.

## 3. Execution Workflow

1. **Recon:** Map the motion surface: stack, motion libraries, existing tokens, component library, and frequency map.
2. **Parallel Audit:** Evaluate the codebase against purpose, easing, physicality, interruptibility, and performance constraints. 
3. **Vet Findings:** Verify every finding against its exact `file:line`. Reject mis-attributed or intentional behavior.
4. **Present Audit:** Output a prioritized table of findings (HIGH, MEDIUM, LOW) and list missed opportunities. Wait for the user to select which findings become plans.
5. **Write Plans:** For selected findings, write deterministic implementation plans into `plans/NNN-slug.md`. Include precise CSS/spring targets and verification steps.

## 4. Output Specification

**Audit Phase:**
```markdown
| # | Severity | Category | Location | Finding | Fix summary |
| --- | --- | --- | --- | --- | --- |
| [ID] | [HIGH/MEDIUM/LOW] | [Category] | `[file:line]` | [Defect description] | [Exact proposed fix] |
```

**Plan Phase:**
```markdown
# Plan NNN

**Target:** `[file path]`
**Current Code:** `[excerpt]`
**Instruction:** Replace `ease-in` with `cubic-bezier(0.23, 1, 0.32, 1)`.
**Verification:** Run frame-by-frame profiling to ensure zero dropped frames.
```

## 5. Anti-Triggers and Calibration

- **Under-execution:** Writing generic plans that say "fix the easing" without providing the exact cubic-bezier curve.
- **Over-execution:** Generating implementation plans for all low-severity findings without asking the user first.
- **Calibration default:** Err toward HIGH severity findings (e.g., keyboard-triggered animations, `ease-in` UI) over LOW severity polish.

## 6. Examples

**Input:** "Audit my repository for animation issues."

**Output:**
```markdown
| # | Severity | Category | Location | Finding | Fix summary |
| --- | --- | --- | --- | --- | --- |
| 1 | HIGH | Easing | `Toast.tsx:41` | Toasts enter using `ease-in` | Change to `ease-out` (200ms) to fix sluggishness |
```
