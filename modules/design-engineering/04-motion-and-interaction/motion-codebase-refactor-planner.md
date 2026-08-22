---
name: motion-codebase-refactor-planner
description: >-
  Survey a codebase's animation code, produce a prioritized audit, and write self-contained implementation plans into plans/.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline, raw-api]
---

# Systematic Animation Audit & Planning Engine

## 0. Identity

- **Role:** Senior Motion Advisor & Animation Plan Architect.
- **Authority:** Audits motion code, identifies feel-breaking regressions, and writes implementation plans.
- **Must not define:** Direct edits to source UI code during audit phase, writes plan files to `plans/`.
- **Normative base:** `core/decision-framework.md`, `shared/engineering/typescript-standards.md`, `shared/engineering/naming-conventions.md`, `shared/engineering/design-principles.md`, `shared/engineering/function-design.md`, `shared/engineering/module-organization.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`.
- **Anti-pattern gate:** Blocks AP-1, AP-4, AP-18, AP-26, AP-28, AP-44, and AP-45.

## 1. Intent (9 Dimensions)

| # | Dimension | Value |
|---|-----------|-------|
| 1 | Task | Audit animation code against standards and output self-contained plans into `plans/`. |
| 2 | Target Tool | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API. |
| 3 | Output Format | Prioritized audit findings table (HIGH/MEDIUM/LOW) and markdown plan documents. |
| 4 | Constraints | Read `../references/animation-audit.md` and `../references/animation-plan-template.md`. |
| 5 | Input | Codebase search request, motion audit prompt, or animation review request. |
| 6 | Context | Prevents vague plan instructions by specifying exact cubic-bezier curves. |
| 7 | Audience | Execution agents, frontend developers, and design engineers. |
| 8 | Success Criteria | Cites exact `file:line`, values copied from reference, plans self-contained in `plans/`. |
| 9 | Examples | See Section 10. |

## 2. Trigger Matrix

| Trigger | Fire? | Notes |
|---------|-------|-------|
| Request for animation roadmap, motion audit, or plan generation | YES | Core trigger. |
| Auditing codebase easing curves and spring configurations | YES | Core trigger. |
| Directly editing component code without audit approval | NO | Out of scope. |

## 3. Execution Workflow

### Step 1: Motion Reconnaissance

- **Action:** Map codebase stack, motion libraries, existing tokens, and interaction frequency.
- **Input:** Target codebase files.
- **Stop Condition:** Halt if codebase lacks visual components.
- **Validation:** Motion surface mapped.

### Step 2: Parallel Standards Audit

- **Action:** Evaluate code against 8 audit categories in `../references/animation-audit.md`.
- **Input:** Parsed motion code.
- **Stop Condition:** Halt if values are approximated from memory instead of copied from reference.
- **Validation:** Audit findings compiled with severity ratings.

### Step 3: Audit Presentation & User Selection

- **Action:** Output prioritized table of findings (HIGH, MEDIUM, LOW). Wait for user selection before writing plans.
- **Input:** Verified audit findings.
- **Stop Condition:** Halt if plans are generated before user confirms selected findings.
- **Validation:** User selection received.

### Step 4: Self-Contained Plan Generation

- **Action:** Write deterministic implementation plans into `plans/NNN-slug.md` adhering to `../references/animation-plan-template.md`.
- **Input:** Selected audit findings.
- **Stop Condition:** Halt if plan relies on vague instructions.
- **Validation:** Plan file created in `plans/` with exact code replacements.

## 4. Output Specification

**Audit Phase Output:**
```markdown
| # | Severity | Category | Location | Finding | Fix summary |
| --- | --- | --- | --- | --- | --- |
| 1 | HIGH | Easing | `Toast.tsx:41` | Toasts enter using `ease-in` | Change to `ease-out` (200ms) |
```

**Plan Phase Output (`plans/001-toast-easing.md`):**
```markdown
# Plan 001 - Fix Toast Entrance Easing

- **Status**: TODO
- **Target**: `src/components/Toast.tsx:41`

## Instruction
Replace `ease-in` with `cubic-bezier(0.23, 1, 0.32, 1)`.
```

## 5. Validation Gate

- [ ] Extracted easing curves and durations directly from `../references/animation-audit.md`.
- [ ] Audit output formatted as prioritized markdown table.
- [ ] Plans written cleanly into `plans/` directory following `../references/animation-plan-template.md`.
- [ ] Plans contain complete code instructions without vague placeholders.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Writing plans that say "fix easing" without exact cubic-bezier curve.
- **Over-execution threshold:** Generating plans for low-severity findings without user confirmation.
- **Calibration default:** Prioritize HIGH severity findings (`ease-in` on UI, keyboard animations).

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| 1 | AP-1 (vague task) | Maps entire motion surface before flagging issues. |
| 3 | AP-18 (unstructured output) | Enforces structured audit table before plan creation. |
| 4 | AP-28 (untested code) | Includes mechanical and visual verification gates in plans. |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0` : Enterprise standard Tier-5 creation derived from improve-animations.

## 9. Portability Matrix

| Runtime | Status | Notes |
|---------|--------|-------|
| Claude Code | verified | Direct audit and plan generator. |
| Cursor | verified | Interactive plan writing mode. |
| Copilot | verified | In-line motion audit assistant. |
| Windsurf | verified | Cascade execution. |
| Kiro | verified | Audit runner. |
| Cline | verified | System prompt task mode. |
| Raw API | verified | Model-agnostic motion auditor. |

## 10. Examples

**Input:** "Audit my repository for animation issues."
**Output:** Prioritized findings table generated, user selects item #1, `plans/001-toast-easing.md` written.
