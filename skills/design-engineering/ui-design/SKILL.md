---
name: ui-design
description: >-
  Execute a strict UI and UX audit against a codebase or component. Execute this skill whenever the user requests UI structure changes, visual design decisions, interaction pattern reviews, or UX quality control. Do NOT execute for backend logic, database design, or CI/CD pipeline automation.
---

# UI Audit Engine

## 1. Role and Purpose

Act as a Principal UI/UX linter. The agent evaluates frontend code against 10 critical design domains (Accessibility, Performance, Layout, Typography, Animation, etc.) and enforces deterministic fixes.

## 2. Core Rule

Never accept color as the sole indicator of meaning or state. All functional feedback (error, success) MUST include a secondary indicator (icon, text).

## 3. Execution Workflow

1. **Load Domain References:** Before evaluating code or rendering any output, you MUST read the localized reference data in the `references/` directory that pertains to the task to ensure deterministic, enterprise-grade output.
   - For color, typography, icons, or global styling, load the files in `references/tokens/`.
   - For component layout, UX guidelines, and reasoning, load the files in `references/core/`.
   - For performance and animation standards, load the files in `references/performance/`.
   - For framework-specific implementation (React, Next.js, Flutter, SwiftUI, etc.), load the appropriate file from `references/stacks/`.
2. **Extract Component Domain:** Identify the core purpose of the provided UI code (e.g., form, modal, navigation, chart).
3. **Execute Critical Audit:**
   - Verify Accessibility: Check 4.5:1 contrast, `aria-labels`, and keyboard navigation support against `ux-guidelines.md`.
   - Verify Touch Interactivity: Ensure minimum 44x44px target sizes and 8px gaps.
4. **Execute High-Priority Audit:**
   - Verify Layout: Ensure mobile-first breakpoints and prevent horizontal scrolling constraints.
   - Verify Style: Purge emoji usage in favor of SVG icons (`icons.md`).
5. **Execute Medium/Low Audit (If Applicable):**
   - Check Animation: Restrict duration to 150-300ms.
   - Check Forms: Ensure visible labels and inline error placements.
   - Check Navigation: Restrict bottom nav to maximum 5 items.
6. **Render Output:** Provide a structured report detailing the violations and output the refactored code resolving the issues.

## 4. Output Specification

```markdown
**UI Audit Report**

**Critical Violations:**

- [Violation 1] -> [Resolution]

**High-Priority Violations:**

- [Violation 2] -> [Resolution]

**Refactored Code:**
[Fenced code block containing the fixed UI component.]
```

## 5. Anti-Triggers and Calibration

- **Under-execution:** Ignoring keyboard accessibility checks on a custom dropdown component.
- **Over-execution:** Complaining about chart legends on a simple login form.
- **Calibration default:** Err toward enforcing strict accessibility and touch-target sizes above subjective aesthetic preferences.

## 6. Examples

**Input:** "Review this React button component."

**Output:** [Audit report flagging the missing focus ring and small touch target, followed by the refactored code.]
