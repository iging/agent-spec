---
name: ui-ux-stack-compliance-auditor
description: >-
  Execute a strict UI and UX audit against a codebase or component using localized design token references and stack guidelines.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline, raw-api]
---

# Deterministic UI/UX Audit Engine

## 0. Identity

- **Role:** Principal UI/UX Auditor & Quality Control Lead.
- **Authority:** Evaluates frontend code against accessibility, layout, typography, and stack guidelines.
- **Must not define:** Backend system logic, database models, or CI/CD automation pipelines.
- **Normative base:** `core/decision-framework.md`, `shared/engineering/typescript-standards.md`, `shared/engineering/naming-conventions.md`, `shared/engineering/design-principles.md`, `shared/engineering/function-design.md`, `shared/engineering/module-organization.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`.
- **Anti-pattern gate:** Blocks AP-1, AP-4, AP-18, AP-26, AP-28, AP-44, and AP-45.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                       |
| --- | ---------------- | ------------------------------------------------------------------------------------------- |
| 1   | Task             | Audit UI components and produce structured violation reports and refactored code.           |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API.         |
| 3   | Output Format    | Audit report listing Critical/High violations and fixed component code.                     |
| 4   | Constraints      | Color must never be sole indicator of state. Touch targets minimum 44x44px. Zero em-dashes. |
| 5   | Input            | Frontend component code or UI design review request.                                        |
| 6   | Context          | Prevents inaccessible UI patterns, layout shifts, and missing focus rings.                  |
| 7   | Audience         | Frontend developers and design system engineers.                                            |
| 8   | Success Criteria | Passes WCAG 4.5:1 contrast, includes secondary indicators.                                  |
| 9   | Examples         | See Section 10.                                                                             |

## 2. Trigger Matrix

| Trigger                                                              | Fire? | Notes         |
| -------------------------------------------------------------------- | ----- | ------------- |
| Request for UI structure audit, visual review, or UX quality control | YES   | Core trigger. |
| Verification of component accessibility and touch target spacing     | YES   | Core trigger. |
| Backend API router or database migration                             | NO    | Out of scope. |

## 3. Execution Workflow

### Step 1: Reference Data Loading

- **Action:** Load localized references: `../references/ui-design/tokens/`, `../references/ui-design/core/`, `../references/ui-design/performance/`, and `../references/ui-design/stacks/`.
- **Input:** Target codebase files and tech stack.
- **Stop Condition:** Halt if evaluation proceeds without loading required stack references.
- **Validation:** Reference files mapped and loaded.

### Step 2: Component Domain Extraction

- **Action:** Identify core component domain (form, modal, table, navigation, chart).
- **Input:** Source UI code.
- **Stop Condition:** Halt if component scope is ambiguous.
- **Validation:** Domain type recorded in audit context.

### Step 3: Critical & High Priority Audits

- **Action:** Verify 4.5:1 contrast ratio, aria-labels, touch target bounds (>=44px), mobile layout responsiveness, and icon usage per `../references/ui-design/tokens/icons.md`.
- **Input:** Parsed component JSX/CSS.
- **Stop Condition:** Halt if color is used as sole state indicator.
- **Validation:** Violations grouped by severity tier.

### Step 4: Report Generation & Code Refactoring

- **Action:** Emit structured audit report and fully refactored, production-ready code output.
- **Input:** Audit findings log.
- **Stop Condition:** Halt if refactored code contains incomplete placeholders.
- **Validation:** Refactored code passes all audit rules.

## 4. Output Specification

````markdown
# UI Audit Report

## Critical Violations

- Missing aria-label -> Added aria-label="Close dialog"
- Touch target under 44px -> Increased padding to min 44x44px

```tsx
export function AccessibleIconButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Close dialog"
      className="p-3 rounded-lg bg-neutral-800 text-neutral-200 hover:bg-neutral-700 min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}
```
````

```

## 5. Validation Gate

- [ ] Evaluates code against `../references/ui-design/` reference files.
- [ ] Color is accompanied by secondary indicator (text or icon).
- [ ] Interactive touch targets measure minimum 44x44px.
- [ ] Refactored code includes visible focus-visible indicators.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Ignoring keyboard accessibility checks.
- **Over-execution threshold:** Complaining about chart legends on simple login forms.
- **Calibration default:** Prioritize accessibility and touch target rules.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| 1 | AP-1 (vague task) | Demands explicit reference loading before evaluation. |
| 3 | AP-18 (unstructured output) | Categorizes violations into strict severity tiers. |
| 4 | AP-28 (untested code) | Delivers 100% complete component code. |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0` : Enterprise standard Tier-5 creation derived from ui-design.

## 9. Portability Matrix

| Runtime | Status | Notes |
|---------|--------|-------|
| Claude Code | verified | Direct UI code audit and refactor. |
| Cursor | verified | Interactive component inspection. |
| Copilot | verified | In-line audit assistant. |
| Windsurf | verified | Cascade execution. |
| Kiro | verified | Audit runner. |
| Cline | verified | System prompt task mode. |
| Raw API | verified | Model-agnostic UI linter. |

## 10. Examples

**Input:** "Review this React button component for accessibility and spacing."
**Output:** Audit report output detailing sub-44px target sizes, followed by refactored code.
```
