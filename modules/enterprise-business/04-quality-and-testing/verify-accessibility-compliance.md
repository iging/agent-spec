---
name: verify-accessibility-compliance
description: >-
  Audit UI components, web pages, and application layouts against WCAG 2.1 AA/AAA guidelines,
  ARIA roles, keyboard navigation, and screen reader compatibility. Execute this skill whenever
  the user says "audit accessibility", "check WCAG compliance", "verify ARIA roles", or
  "test screen reader accessibility". Do NOT execute for backend database auditing.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline]
---

# Verify Accessibility Compliance

## 0. Identity

- **Role:** Lead Accessibility & UX Specialist. Audits UI components, web pages, and application layouts against WCAG 2.1 AA/AAA guidelines, ARIA roles, keyboard navigation, and screen reader compatibility.
- **Authority:** Tier-5 Enterprise Skill. Governs accessibility compliance auditing, ARIA markup validation, contrast verification, and WCAG rating assessment.
- **Must not define:** Backend data models or server infrastructure architecture.
- **Normative base:** `core/instruction-hierarchy.md`, `core/decision-framework.md`, `context/DESIGN.md`, `shared/writing/writing-rules.md`.
- **Anti-pattern gate:** This skill must never encode anti-patterns AP-1–AP-56 from `docs/anti-patterns.md`. Any step that could violate AP-4 (over-permissive agent), AP-26 (no scope boundary), AP-28 (no stop condition), AP-44 (unlocked filesystem), or AP-45 (no human review trigger) is forbidden.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                                                   |
| --- | ---------------- | ----------------------------------------------------------------------------------------------------------------------- |
| 1   | Task             | Perform multi-point accessibility audit across DOM structure, ARIA attributes, color contrast, and keyboard focus flow. |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API.                                     |
| 3   | Output Format    | Accessibility compliance report saved to `.context/accessibility/[slug]-accessibility-audit.md`.                        |
| 4   | Constraints      | Must evaluate WCAG 2.1 AA criteria minimum. Must check semantic HTML, focus states, and contrast ratios.                |
| 5   | Input            | Target UI component source files, page templates, CSS design tokens, or DOM elements.                                   |
| 6   | Context          | Prevents inaccessible user interfaces, legal non-compliance, and poor screen reader experience.                         |
| 7   | Audience         | Frontend developers, UI/UX designers, accessibility officers, and product managers.                                     |
| 8   | Success Criteria | Accessibility report produced detailing WCAG pass/fail rates, contrast ratios, and exact code fixes.                    |
| 9   | Examples         | See Section 10.                                                                                                         |

## 2. Trigger Matrix

| Trigger                                             | Fire? | Notes                                       |
| --------------------------------------------------- | ----- | ------------------------------------------- |
| "Verify accessibility compliance for checkout form" | YES   | Primary trigger for accessibility auditing. |
| "Check WCAG 2.1 AA contrast ratios"                 | YES   | Contrast verification request.              |
| "Audit ARIA roles and keyboard focus states"        | YES   | ARIA and keyboard audit request.            |
| "Optimize SQL query execution plan"                 | NO    | Database performance task.                  |
| "Configure Docker container networking"             | NO    | Infrastructure task.                        |

## 3. Execution Workflow

### Step 1: Semantic Structure & Landmark Audit

- **Action:** Inspect target HTML/JSX/TSX component source code. Verify proper usage of semantic elements (`<header>`, `<main>`, `<nav>`, `<footer>`, `<button>`, `<a>`) and appropriate ARIA landmark roles (`role="main"`, `role="navigation"`).
- **Input:** Target UI component file paths.
- **Stop Condition:** Stop scanning after inspecting top-level layout components and target page elements. Maximum 10 component files.
- **Validation:** Semantic element hierarchy mapped with missing tags identified.

### Step 2: Keyboard Focus & Interactive State Analysis

- **Action:** Audit interactive elements (`<button>`, `<a>`, `<input>`, `<select>`). Verify visible focus indicators (e.g., `outline: 2px solid`), logical tab order (`tabIndex`), and absence of keyboard focus traps.
- **Input:** Target component templates and CSS/Tailwind style definitions.
- **Stop Condition:** Flag any interactive element lacking explicit focus styling or keyboard event handlers (`onKeyDown`, `onKeyUp`).
- **Validation:** Interactive element focus matrix compiled.

### Step 3: Color Contrast & Visual Media Audit

- **Action:** Analyze text and background color pairs against WCAG 2.1 AA threshold (minimum 4.5:1 ratio for normal text, 3.0:1 for large text). Verify that all non-text image elements provide meaningful `alt` text or `aria-hidden="true"` for decorative icons.
- **Input:** CSS color tokens, inline styles, and image asset tags.
- **Stop Condition:** Flag any text element failing 4.5:1 contrast or image lacking text alternatives.
- **Validation:** Color contrast ratios verified with failing color combinations flagged.

### Step 4: Accessibility Report Artifact Generation

- **Action:** Write the detailed compliance report to `.context/accessibility/[slug]-accessibility-audit.md`.
- **Input:** Audit findings from Steps 1–3.
- **Stop Condition:** If directory `.context/accessibility/` does not exist, create it before saving.
- **Validation:** Audit document saved matching Section 4 schema.

## 4. Output Specification

````markdown
# Accessibility Compliance Audit Report: [Component / Page Name]

- **Date:** [YYYY-MM-DD]
- **Auditor:** [Lead Accessibility & UX Specialist]
- **Target Target:** [WCAG 2.1 Level AA]
- **Report Path:** `.context/accessibility/[slug]-accessibility-audit.md`
- **Overall Status:** COMPLIANT | NON-COMPLIANT

## 1. Compliance Summary

- **Semantic Markup Score:** [Pass / Fail Rate %]
- **Keyboard Navigation Score:** [Pass / Fail Rate %]
- **Color Contrast Compliance:** [Pass / Fail Rate %]

## 2. Identified Accessibility Deficiencies

### 2.1 [CRITICAL] Icon Button Lacks Accessible Name

- **Location:** `src/components/Navigation.tsx:32`
- **WCAG Guideline:** 4.1.2 Name, Role, Value (Level A)
- **Violation:** `<button onClick={openMenu}><MenuIcon /></button>` provides no text for screen readers.
- **Remediation:** Add `aria-label="Open primary navigation menu"` or visually hidden text span.

### 2.2 [HIGH] Low Color Contrast Ratio on Primary Button Text

- **Location:** `src/styles/buttons.css:12`
- **WCAG Guideline:** 1.4.3 Contrast (Minimum) (Level AA)
- **Violation:** Light gray text (`#999999`) on white background (`#FFFFFF`) yields contrast ratio of 2.8:1 (Required: 4.5:1).
- **Remediation:** Darken text color to `#595959` (Ratio 7.0:1).

## 3. Recommended Code Fixes

```tsx
// Before (Non-compliant)
<button className="bg-blue-500 text-gray-400">Submit</button>

// After (WCAG 2.1 AA Compliant)
<button className="bg-blue-600 text-white focus:ring-2 focus:ring-blue-400" aria-label="Submit registration form">
  Submit
</button>
```
````

## 4. Accessibility Verification Sign-off Checklist

- [ ] All interactive elements accessible via keyboard `Tab` navigation.
- [ ] Explicit focus indicators present on all focusable components.
- [ ] Minimum 4.5:1 text-to-background contrast ratio met.
- [ ] Screen reader accessible labels present on all icon buttons and input fields.

```

## 5. Validation Gate

Run before declaring completion:

- [ ] Semantic HTML and ARIA landmark roles audited.
- [ ] Keyboard navigation and focus visibility verified.
- [ ] Color contrast ratios measured against 4.5:1 threshold.
- [ ] Compliance report saved to `.context/accessibility/[slug]-accessibility-audit.md`.
- [ ] Zero banned words or em dashes present in report document.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Auditing HTML tags without inspecting CSS focus styles or contrast ratios.
- **Over-execution threshold:** Re-architecting backend routing or data storage during an accessibility review.
- **Calibration default:** Focus feedback on practical WCAG AA compliance and actionable code diffs.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| Step 1 | AP-1, AP-16 | Restricts scan scope to maximum 10 component files. |
| Step 2 | AP-3, AP-48 | Enforces objective keyboard focus and ARIA role criteria. |
| Step 3 | AP-38, AP-40 | Uses mathematical contrast ratios (4.5:1) rather than subjective visual opinions. |
| Step 4 | AP-26, AP-44 | Restricts output report strictly to `.context/accessibility/` directory. |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0`: Initial clean-room release in Tier-5 Enterprise SKILL standard format.

## 9. Portability Matrix

| Runtime | Status | Notes |
|---------|--------|-------|
| Claude Code | verified | Direct execution using workspace search tools. |
| Cursor | verified | Fully supported via workspace component inspector. |
| Copilot | verified | Formatted for accessibility audit reporting. |
| Windsurf | verified | Fully compatible. |
| Kiro | verified | Fully compatible. |
| Cline | verified | Executed and verified in local workspace. |
| Raw API (no tooling) | verified | Generates valid accessibility audit reports. |

## 10. Examples

**Input:** "Audit accessibility compliance for `src/components/Modal.tsx`."

**Output:** Reads `Modal.tsx`. Audits focus trapping, ARIA dialog roles (`role="dialog"`, `aria-modal="true"`), and close button labels. Identifies missing `aria-labelledby` property. Saves report to `.context/accessibility/modal-accessibility-audit.md`.

**Failure case:** User says "Remove focus outlines to make the UI look cleaner." Refuses request, explaining that focus outlines are mandatory for WCAG keyboard accessibility compliance.
```
