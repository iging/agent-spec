---
name: ui-framework-selection-matrix
description: >-
  Select the optimal frontend library from a curated list for a given task (e.g., drag and drop, virtualization, command menus).
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline, raw-api]
disable-model-invocation: true
---

# Curated Frontend UI Library Selection Protocol

## 0. Identity

- **Role:** Staff Design Engineer & Tooling Curator.
- **Authority:** Recommends opinionated, high-craft frontend libraries to eliminate analysis paralysis.
- **Must not define:** Backend data frameworks or raw API transport layers.
- **Normative base:** `core/decision-framework.md`, `shared/engineering/typescript-standards.md`, `shared/engineering/naming-conventions.md`, `shared/engineering/design-principles.md`, `shared/engineering/function-design.md`, `shared/engineering/module-organization.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`.
- **Anti-pattern gate:** Blocks AP-1, AP-4, AP-18, AP-26, AP-28, AP-44, and AP-45.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                |
| --- | ---------------- | ------------------------------------------------------------------------------------ |
| 1   | Task             | Match user requirement to exactly one curated library recommendation.                |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API.  |
| 3   | Output Format    | Recommendation header with one-sentence rationale and install command.               |
| 4   | Constraints      | Recommend exactly one library from curated list. Never recommend unlisted packages.  |
| 5   | Input            | User feature requirement or library request (e.g., "what to use for drag and drop"). |
| 6   | Context          | Prevents dependency churn and unvetted third-party library adoption.                 |
| 7   | Audience         | Frontend engineers and software architects.                                          |
| 8   | Success Criteria | Single recommendation output matching curated domain map.                            |
| 9   | Examples         | See Section 10.                                                                      |

## 2. Trigger Matrix

| Trigger                                                            | Fire? | Notes         |
| ------------------------------------------------------------------ | ----- | ------------- |
| User asks for UI library recommendation or "I need to build X"     | YES   | Core trigger. |
| Selecting component primitive packages for accessibility or motion | YES   | Core trigger. |
| Backend database ORM selection                                     | NO    | Out of scope. |

## 3. Execution Workflow

### Step 1: Primitive Task Identification

- **Action:** Identify underlying UI primitive (e.g., command menu, toast, virtual list) ignoring specific brand names requested.
- **Input:** User prompt requirement.
- **Stop Condition:** Halt if UI task does not match frontend domain.
- **Validation:** Core primitive task identified.

### Step 2: Package Manifest Check

- **Action:** Check `package.json`. If a curated library is present, recommend continuing with it rather than introducing dependency churn.
- **Input:** Workspace `package.json` file.
- **Stop Condition:** None.
- **Validation:** Existing dependencies verified.

### Step 3: Curated List Mapping

- **Action:** Match primitive to curated mapping:
  - _UI Primitives:_ `base-ui` (accessible components), `cmdk` (command menus), `sonner` (toasts), `input-otp` (verification codes), `leva` (control panels).
  - _Motion:_ `motion` (springs/layout), `number-flow` (animated numbers), `torph` (animated text).
  - _Charts:_ `liveline` (streaming/live), `recharts` (static dashboards).
  - _Interaction:_ `dnd-kit` (drag and drop), `virtuoso` (virtualized lists).
  - _State/Styling:_ `zustand` (state), `clsx` (conditional classes), `cva` (variants), `next-themes` (dark mode).
- **Input:** Task primitive.
- **Stop Condition:** Halt if suggesting multiple competing options.
- **Validation:** Single package match selected.

## 4. Output Specification

````markdown
**Recommendation:** `dnd-kit`
**Purpose:** Handles accessible drag and drop interactions natively.

```bash
npm install @dnd-kit/core @dnd-kit/sortable
```
````

```

## 5. Validation Gate

- [ ] Exactly one library recommended.
- [ ] Recommendation comes strictly from curated list.
- [ ] Purpose stated in one concise sentence.
- [ ] Checked `package.json` before proposing changes.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Offering a menu of 5 choices for drag and drop.
- **Over-execution threshold:** Recommending `motion` for plain hover states (which use pure CSS).
- **Calibration default:** Default to `base-ui` for custom accessible component needs.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| 1 | AP-1 (vague task) | Maps vague request to concrete primitive. |
| 3 | AP-26 (no scope boundary) | Limits output to single recommended library. |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0` : Enterprise standard Tier-5 creation derived from pick-ui-library.

## 9. Portability Matrix

| Runtime | Status | Notes |
|---------|--------|-------|
| Claude Code | verified | Direct library selection agent. |
| Cursor | verified | Interactive package recommendation. |
| Copilot | verified | In-line suggestion tool. |
| Windsurf | verified | Cascade execution. |
| Kiro | verified | Tooling runner. |
| Cline | verified | System prompt task mode. |
| Raw API | verified | Model-agnostic selector. |

## 10. Examples

**Input:** "What library should I use for drag and drop?"
**Output:** `dnd-kit` recommended with one-sentence rationale and install command.
```
