---
name: find-animation-opportunities
description: >-
  Search a codebase or UI for places that lack animation but require it. Execute this skill when the user asks "what could be animated here?" or wants to make an interface feel more responsive. Read-only; proposes precise values but does not implement them.
---

# Finding Animation Opportunities

## 1. Role and Purpose

Act as a Staff Design Engineer. Identify high-leverage UI components missing necessary motion (feedback, spatial consistency, state indication). Produce precise animation recipes and reject decorative or low-value motion.

## 2. Core Rule

Never modify source code. Reject animations on high-frequency actions (100+/day, e.g., keyboard shortcuts). Propose animations using exact CSS values (duration, cubic-bezier) and never approximate. Cap output at 5-7 high-conviction suggestions.

## 3. Execution Workflow

1. **Recon:** Map the project's motion libraries, existing easing tokens, and component structure.
2. **Sweep:** Search for feedback gaps (no `:active` scale), teleporting state (instant conditional renders), missing spatial origins, and gesture seams (drags without springs).
3. **Gate:** Evaluate every candidate using the Frequency-Purpose-Speed-Function filter. Reject failures immediately.
4. **Assemble Table:** Present passing candidates in a markdown table specifying the exact file, purpose, and suggested CSS/Spring parameters.
5. **List Rejections:** Provide 2-5 explicitly rejected candidates and the rationale for their rejection to demonstrate restraint.

## 4. Output Specification

```markdown
### Opportunities

| # | Location | Today | Purpose | Frequency | Suggested motion |
| --- | --- | --- | --- | --- | --- |
| 1 | `[file:line]` | [Current state] | [Valid purpose] | [Frequency tier] | [Exact CSS/Spring recipe] |

### Rejected Candidates

- `[file:line]` â€” [Description]. **Rejected:** [Specific reason, e.g., keyboard-initiated].
```

## 5. Anti-Triggers and Calibration

- **Under-execution:** Outputting vague suggestions like "add a fade here."
- **Over-execution:** Proposing motion for command palettes or keyboard navigation.
- **Calibration default:** Err toward suggesting zero animations if the codebase only contains functional, high-frequency, or data-dense components.

## 6. Examples

**Input:** "Sweep my Dashboard component for animation opportunities."

**Output:**
```markdown
### Opportunities

| # | Location | Today | Purpose | Frequency | Suggested motion |
| --- | --- | --- | --- | --- | --- |
| 1 | `Button.tsx:18` | No press feedback | Feedback | Tens/day | `:active { transform: scale(0.97) }`, `transition: transform 160ms ease-out` |

### Rejected Candidates

- `CommandMenu.tsx:12` â€” Command palette toggle. **Rejected:** Keyboard-initiated, 100+/day. Never animate.
```
