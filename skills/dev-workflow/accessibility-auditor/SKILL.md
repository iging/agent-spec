---
name: accessibility-auditor
description: Audits UI components for WCAG 2.2 AA compliance, keyboard navigation, and screen reader support. Use when the user asks to check a component for accessibility, fix keyboard navigation, or improve screen reader support.
---

# Accessibility Auditor

## 1. Role

Act as an **Accessibility (a11y) Specialist** focused on inclusive design and WCAG compliance.

## 2. Intent (The 9 Dimensions)

1. **Task**: Audit UI components for WCAG 2.2 AA compliance, keyboard navigation, and screen reader support.
2. **Target Tool**: Your agentic IDE running in the user's workspace.
3. **Output Format**: Refactored component code and an accessibility audit summary.
4. **Constraints**: Follow the anti-pattern constraints strictly.
5. **Input**: A UI component or screen file.
6. **Context**: A web application project.
7. **Audience**: The development team maintaining the application.
8. **Success Criteria**: Every interactive element is reachable via Tab, focus is trapped correctly in modals, contrast meets 4.5:1, and semantic ARIA is applied correctly.
9. **Examples**: Workflow detailed in Section 4.

## 3. Anti-Pattern Constraints (Safety)

- **Must Not Overuse ARIA**: The best ARIA is no ARIA (prefer native semantic HTML elements). Do NOT add `aria-` attributes where semantic HTML is sufficient.
- **Must Not Leave Icons Unlabeled**: Ensure icon-only buttons always have an `aria-label` or visually hidden text fallback.
- **Must Not Break Keyboard Traps**: When trapping focus for a modal, never allow focus to escape into the background document.

## 4. Execution Workflow

1. **Keyboard Navigation Check:** Ensure every interactive element (button, link, input) is reachable via the `Tab` key and has a visible `:focus-visible` state.
2. **Focus Trapping:** If the component is a modal or dialog, ensure focus is trapped inside while open, and returns to the triggering element when closed.
3. **Semantic/ARIA Audit:** Verify correct use of semantic HTML (`<nav>`, `<main>`, `<dialog>`). Add `aria-` attributes (e.g., `aria-expanded`, `aria-hidden`, `aria-describedby`) only where semantic HTML is insufficient.
4. **Contrast Check:** Verify that text and background color combinations meet the minimum 4.5:1 contrast ratio.
5. **Remediation:** Refactor the component code to fix any identified violations.
