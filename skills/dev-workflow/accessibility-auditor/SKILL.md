---
name: accessibility-auditor
description: >-
  Audits UI components for WCAG 2.2 AA compliance, keyboard navigation, and
  screen reader support, then outputs a remediated refactor. Execute this skill
  when the user asks to check a component for accessibility, fix keyboard
  navigation, or improve screen reader support. Do NOT execute for general
  visual design, performance, or security audits.
version: 2.0.0
verified-on: [cline]
---

# Accessibility Auditor

## 0. Identity

- **Role:** Principal Accessibility (a11y) Specialist. Focuses on inclusive design and WCAG 2.2 AA compliance. Audits components and provides accessible, remediated refactors.
- **Authority:** Owns the accessibility audit and remediation workflow. Cannot modify code outside the audited component scope.
- **Must not define:** Visual design language (see `skills/design-engineering/ui-design`); application state architecture (see `frontend/.agents/skills/`); general UX principles (see `shared/ui-ux-principles.md`).
- **Normative base:** `shared/ui-ux-principles.md`; WCAG 2.2 AA; `docs/anti-patterns.md`; `skills/_template/SKILL.md`; `docs/skill-standard.md`.
- **Anti-pattern gate:** No step may trigger AP-53 (tool trust without validation) — accessibility claims must be verified against the actual rendered markup. Never break a focus trap.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                                                     |
| --- | ---------------- | ------------------------------------------------------------------------------------------------------------------------- |
| 1   | Task             | Audit a UI component against WCAG 2.2 AA (keyboard, focus trap, semantics, contrast) and output a remediated refactor.    |
| 2   | Target Tool      | Any agent runtime reading markdown skills and editing code: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API. |
| 3   | Output Format    | Markdown audit report with Pass/Fail per check plus a remediated code block.                                              |
| 4   | Constraints      | Never overuse ARIA. Prefer native semantic HTML. Never allow focus to escape a modal. 4.5:1 minimum contrast.             |
| 5   | Input            | Target component source and rendered markup context.                                                                      |
| 6   | Context          | Prevents accessibility regressions in shipped UI; keeps PWA inclusive.                                                    |
| 7   | Audience         | The requesting developer and end users relying on assistive technology.                                                   |
| 8   | Success Criteria | All four checks pass or are remediated; report rendered per §4; no ARIA added where native HTML suffices.                 |
| 9   | Examples         | See §10.                                                                                                                  |

## 2. Trigger Matrix

| Trigger                                | Fire? | Notes              |
| -------------------------------------- | ----- | ------------------ |
| "Check this component for a11y / WCAG" | YES   | Core trigger.      |
| "Fix keyboard navigation"              | YES   | Core trigger.      |
| "Improve screen reader support"        | YES   | Core trigger.      |
| Modal / dialog focus-trap review       | YES   | Core trigger.      |
| Visual design review                   | NO    | Use design skills. |
| Performance or security audit          | NO    | Different domains. |

## 3. Execution Workflow

### Step 1: Keyboard Check

- **Action:** Ensure every interactive element is reachable via Tab and has a visible `:focus-visible` state.
- **Input:** Target component markup.
- **Stop Condition:** If interactive elements exist but have no focusable implementation, stop and record the violation.
- **Validation:** Every interactive element Tab-reachable; `:focus-visible` present.

### Step 2: Focus Trapping

- **Action:** For modals or dialogs, verify focus is trapped inside while open and returns to the trigger when closed.
- **Input:** Modal/dialog markup and open/close logic.
- **Stop Condition:** If focus can escape an open modal, stop and record the break as a blocking violation.
- **Validation:** Trap verified; focus restoration to trigger verified.

### Step 3: Semantic Audit

- **Action:** Verify correct use of semantic HTML. Add `aria-` attributes only as fallbacks. Ensure icon-only buttons have accessible names.
- **Input:** Component markup.
- **Stop Condition:** If an icon-only button lacks an accessible name, record the violation and remediate with an accessible label, not a decorative `div`.
- **Validation:** Native elements used where sufficient; ARIA only as fallback; icon-only affordances named.

### Step 4: Contrast Check

- **Action:** Verify text and background color combinations meet the 4.5:1 minimum contrast ratio.
- **Input:** Component styles/colors.
- **Stop Condition:** If a color is defined dynamically and cannot be evaluated statically, flag it as "requires runtime verification".
- **Validation:** Every static foreground/background pair meets 4.5:1.

### Step 5: Remediate

- **Action:** Refactor the component to fix all recorded violations. Prefer native semantic HTML over ARIA. Never break a focus trap during remediation.
- **Input:** Violation list.
- **Stop Condition:** If remediation would require a behavior change outside the accessibility fix, stop and flag it as out of scope.
- **Validation:** Remediated component passes all four checks; behavior unchanged otherwise.

## 4. Output Specification

```markdown
## Accessibility Audit

- **Keyboard Navigation:** [Pass/Fail] - [Details]
- **Focus Trapping:** [Pass/Fail] - [Details]
- **Semantics:** [Pass/Fail] - [Details]
- **Contrast:** [Pass/Fail] - [Details]

### Remediated Code

[Full remediated component code block]
```

## 5. Validation Gate

Run before declaring completion:

- [ ] All four checks have explicit Pass/Fail verdicts.
- [ ] Every interactive element Tab-reachable with `:focus-visible`.
- [ ] Modals trap focus and restore it on close.
- [ ] No ARIA added where native semantic HTML suffices.
- [ ] Static color pairs meet 4.5:1; dynamic pairs flagged for runtime verification.
- [ ] Remediated code block output; no out-of-scope behavior changes.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Missing focus traps on modals, or skipping the contrast check.
- **Over-execution threshold:** Generating massive ARIA configurations when a simple `<button>` suffices.
- **Calibration default:** Default to native HTML elements over custom divs with ARIA roles.

## 7. Anti-Pattern Compliance

| Step           | Prevents AP                           | Mechanism                                                    |
| -------------- | ------------------------------------- | ------------------------------------------------------------ |
| 1 (Keyboard)   | AP-3 (no success criteria)            | Explicit Tab-reachability + `:focus-visible` pass/fail.      |
| 2 (Focus trap) | AP-28 (no stop condition)             | Escape breaks recorded as blocking violations.               |
| 3 (Semantics)  | ARIA-overuse anti-pattern             | Native HTML first; ARIA only as fallback.                    |
| 4 (Contrast)   | AP-53 (tool trust without validation) | Static pairs verified; dynamic pairs flagged, never assumed. |
| 5 (Remediate)  | AP-26 (no scope boundary)             | Only accessibility fixes; behavior otherwise unchanged.      |

## 8. Versioning & Changelog

- **Version:** 2.0.0
- **Changelog:**
  - `2.0.0` (2026-08-08) — Elevated to Tier 5 per `docs/skill-standard.md`. Added Identity, 9-Dimension Intent, Trigger Matrix, per-step Action/Input/Stop/Validation, Validation Gate, AP compliance map, Versioning, Portability Matrix.

## 9. Portability Matrix

| Runtime              | Status   | Notes                          |
| -------------------- | -------- | ------------------------------ |
| Claude Code          | untested |                                |
| Cursor               | untested |                                |
| Copilot              | untested |                                |
| Windsurf             | untested |                                |
| Kiro                 | untested |                                |
| Cline                | verified | Executed in current workspace. |
| Raw API (no tooling) | untested |                                |

## 10. Examples

**Input:** "Can you check this custom dropdown for accessibility?"

**Output:** Accessibility Audit report per §4: Keyboard Navigation Fail (items are `div`s not reachable via Tab), plus a remediated code block using a native `<select>` or correct `combobox`/`listbox` pattern with `:focus-visible`.

**Failure case:** The user's modal uses a custom overlay and the audit finds focus escapes when Tab is pressed. Record it as a blocking violation; remediate with a focus trap and restoration to the trigger. Never ship the modal as-is.
