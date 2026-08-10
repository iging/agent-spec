# Evaluation and Audit

This document outlines the workflow and criteria for evaluating frontend interfaces. Use these guidelines when reviewing, critiquing, or auditing a design.

## Design Critique Workflow

A thorough design critique synthesizes visual evaluation with structured heuristics. When asked to critique a surface, output a structured report containing the following sections:

### 1. Nielsen Heuristics Score

Score the interface against these 10 heuristics (0-4 scale). A score of 4 means genuinely excellent.

1. **Visibility of System Status:** Timely feedback (loading, success, error).
2. **Match System/Real World:** Familiar terminology and logical order.
3. **User Control and Freedom:** Undo, cancel, and escape routes.
4. **Consistency and Standards:** Uniform terminology and interaction patterns.
5. **Error Prevention:** Smart constraints and destructive-action confirmations.
6. **Recognition Rather Than Recall:** Visible options and contextual help.
7. **Flexibility and Efficiency:** Keyboard shortcuts and bulk actions.
8. **Aesthetic and Minimalist Design:** No decorative clutter.
9. **Error Recovery:** Plain-language errors with actionable fixes.
10. **Help and Documentation:** Contextual and searchable guidance.

### 2. Cognitive Load Assessment

Count the distinct options, actions, or pieces of information a user must simultaneously consider at primary decision points.

- **<=4 items:** Manageable.
- **5-7 items:** Consider grouping or progressive disclosure.
- **8+ items:** Overloaded. Requires immediate redesign.

### 3. Persona Red Flags

Evaluate the interface through these archetypes. Report specific failures, not generic concerns.

- **Power User (Alex):** Checks for shortcuts, bulk actions, and speed.
- **First-Timer (Jordan):** Checks for plain language, clear onboarding, and labeled icons.
- **Accessibility-Dependent (Sam):** Checks keyboard navigation, contrast (4.5:1), and ARIA labels.
- **Stress Tester (Riley):** Checks edge cases, empty states, and error recovery.
- **Mobile User (Casey):** Checks thumb-zone accessibility and touch targets (44x44pt).

### 4. Priority Issues

Identify the 3-5 most impactful design problems. For each issue, provide:

- **What:** The specific problem.
- **Why it matters:** The impact on the user.
- **Fix:** A concrete, actionable recommendation.

## Technical Audit Workflow

When asked to run a technical audit, focus on implementation quality rather than visual design.

### 1. Accessibility (a11y)

- Verify semantic HTML (proper heading hierarchy, `<button>` vs `<a>`).
- Ensure all images have meaningful `alt` text.
- Verify color contrast ratios.
- Ensure focus states are visible and logical.

### 2. Performance

- Check for unoptimized or overly large assets.
- Verify lazy loading for off-screen images or heavy components.
- Identify blocking scripts or unnecessary DOM depth.

### 3. Responsiveness

- Verify layout reflow at standard breakpoints (mobile, tablet, desktop).
- Ensure typography scales appropriately.
- Check for horizontal scrolling issues or overflowing content.
