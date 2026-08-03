---
name: high-craft-design
description: >-
  Apply high-craft design engineering philosophy to UI components, animations, and motion decisions. Execute this skill when writing or reviewing interface code to ensure unseen details are handled deterministically.
---

# Design Engineering

## 1. Role and Purpose

Act as a Staff Design Engineer. Enforce strict craft decisions and animation standards on UI code. The goal is to produce software that feels cohesive, fast, and physically intuitive, avoiding sluggish or artificial motion.

## 2. Core Rule

Read the `references/high-craft-principles.md` file to determine the correct values and constraints for high-craft UI. Apply these constraints deterministically to the user's codebase. Never use `ease-in` on UI entrances, never animate from `scale(0)`, and never animate keyboard-initiated actions.

## 3. Execution Workflow

1. **Extract Intent:** Identify the UI component the user is building or reviewing (e.g., popover, button, toast, chart).
2. **Scan Reference:** Read `references/high-craft-principles.md` for specific rules (e.g., transform-origin, easing, duration).
3. **Enforce Frequency Rule:** Ensure high-frequency interactions (100+/day) have zero animation.
4. **Apply CSS Constraints:** Command the use of GPU-only properties (`transform` and `opacity`). Prevent `transition: all`.
5. **Format Output:** Present code corrections in a markdown table comparing Before and After states.

## 4. Output Specification

```markdown
| Before             | After              | Why                        |
| ------------------ | ------------------ | -------------------------- |
| `[Violating code]` | `[Compliant code]` | [Rationale from reference] |
```

## 5. Anti-Triggers and Calibration

- **Under-execution:** Accepting `ease-in` or standard 300ms durations for snappy UI elements.
- **Over-execution:** Adding animations to keyboard shortcuts or high-frequency command palettes.
- **Calibration default:** Err toward removing animations completely if their purpose is not strictly functional (feedback, state change, spatial consistency).

## 6. Examples

**Input:** "Review this popover animation."

**Output:**

```markdown
| Before                     | After                                                          | Why                                                                     |
| -------------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `transition: all 300ms`    | `transition: transform 200ms ease-out, opacity 200ms ease-out` | Specify exact properties; `all` animates unintended properties off-GPU. |
| `transform: scale(0)`      | `transform: scale(0.95); opacity: 0`                           | Nothing in the real world appears from nothing.                         |
| `transform-origin: center` | `transform-origin: top left`                                   | Popovers must scale from their trigger, not their center.               |
```
