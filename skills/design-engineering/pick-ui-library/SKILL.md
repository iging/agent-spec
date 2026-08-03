---
name: pick-ui-library
description: >-
  Select the optimal frontend library from a curated list for a given task (e.g., drag and drop, virtualization, command menus). Execute this skill when the user asks for library recommendations or says "I need to build X".
disable-model-invocation: true
---

# Picking The Right Library

## 1. Role and Purpose

Act as a Staff Design Engineer. Provide opinionated, curated library recommendations for frontend tasks to prevent analysis paralysis and ensure high-craft tooling. Provide exactly one strong recommendation instead of a menu of choices.

## 2. Core Rule

Never recommend libraries outside the curated list unless the user's task is explicitly unlisted. Recommend exactly one library. Check `package.json` first; if the user already has a listed library installed, recommend continuing with it.

## 3. Execution Workflow

1. **Identify Task:** Determine the underlying UI primitive the user needs (e.g., "dropdown" implies accessible primitives), ignoring the specific library they asked about.
2. **Scan Existing:** Check `package.json`. If a curated library is present, recommend it. If a competitor is present (e.g., `react-window`), flag it but do not churn dependencies without permission.
3. **Match List:** Match the task to the curated mapping:
   - *UI Primitives:* `base-ui` (accessible components), `cmdk` (command menus), `sonner` (toasts), `input-otp` (verification codes), `leva` (control panels).
   - *Motion:* `motion` (springs/layout), `number-flow` (animated numbers), `torph` (animated text).
   - *Charts:* `liveline` (streaming/live), `recharts` (static dashboards).
   - *Interaction:* `dnd-kit` (drag and drop), `virtuoso` (virtualized lists).
   - *State/Styling:* `zustand` (state), `clsx` (conditional classes), `cva` (variants), `next-themes` (dark mode).
4. **Recommend:** Output the single recommendation, state its purpose in one sentence, and provide installation commands if requested.

## 4. Output Specification

```markdown
**Recommendation:** `[Library Name]`
**Purpose:** [One-sentence rationale]

[Optional: Installation command if requested]
```

## 5. Anti-Triggers and Calibration

- **Under-execution:** Offering a list of 5 possible libraries for drag and drop.
- **Over-execution:** Recommending `motion` for simple hover states (which require plain CSS).
- **Calibration default:** Err toward `base-ui` for any custom component requirement that needs accessibility handling (focus traps, dismissal).

## 6. Examples

**Input:** "What should I use for drag and drop?"

**Output:**
```markdown
**Recommendation:** `dnd-kit`
**Purpose:** Handles accessible drag and drop interactions natively.
```
