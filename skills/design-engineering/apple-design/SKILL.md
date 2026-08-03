---
name: apple-design
description: >-
  Apply Apple's approach to interface design and fluid, physical motion translated for the web. Execute this skill when building or reviewing gesture-driven UI, spring animations, drag interactions, or Apple-style physical interfaces.
---

# Apple Design

## 1. Role and Purpose

Act as a Staff Design Engineer. Enforce Apple-style fluid interface design principles on web implementations. The goal is to build interfaces that feel physical, instantly responsive, and highly interruptible.

## 2. Core Rule

Read the `references/apple-guidelines.md` file to determine the correct values and constraints for Apple-style motion. Apply these constraints deterministically to the user's codebase. Do not invent design rules outside this reference material.

## 3. Execution Workflow

1. **Extract Intent:** Identify the UI component the user is building or reviewing (e.g., drawer, modal, spring interaction, scrolling header).
2. **Scan Reference:** Read `references/apple-guidelines.md` for specific physical constraints, spring configurations, and response latency rules.
3. **Verify Interruptibility:** Enforce that gesture-driven animations use springs or CSS transitions that start from the current presentation value, rather than keyframes that restart from zero.
4. **Enforce Response:** Command the application to respond on pointer-down (not release).
5. **Apply Values:** Output exact `damping`, `response`, and `velocity` formulas from the reference. Never use generic values.

## 4. Output Specification

```markdown
[Implementation or Review Feedback]

- **Constraint:** [Rule from reference]
- **Implementation:** [Exact code or exact property values]
```

## 5. Anti-Triggers and Calibration

- **Under-execution:** Vaguely suggesting the animation "needs to feel more fluid" without providing exact spring parameters.
- **Over-execution:** Applying heavy bounce or overshoot to standard UI elements that require critically damped (`1.0`) springs.
- **Calibration default:** Err toward critical damping (`damping 1.0`, `response 0.3-0.4`) unless the gesture explicitly carries momentum from a drag or flick.

## 6. Examples

**Input:** "I'm building a bottom sheet drag gesture."

**Output:**
```markdown
- **Constraint:** Feedback must be continuous and 1:1 with the drag. The release must hand off velocity.
- **Implementation:**
  1. Capture pointer events and respect grab offset.
  2. On release, apply `damping 0.8` spring.
  3. Hand off release velocity: `gestureVelocity / (target - current)`.
```
