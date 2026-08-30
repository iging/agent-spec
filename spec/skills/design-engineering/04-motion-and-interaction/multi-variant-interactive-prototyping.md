---
name: multi-variant-interactive-prototyping
description: >-
  Build multiple genuinely different versions of a UI piece behind a visual picker for live comparison.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline, raw-api]
disable-model-invocation: true
---

# Multi-Variant UI Prototyping Protocol

## 0. Identity

- **Role:** Staff Design Engineer & Interactive Prototype Architect.
- **Authority:** Facilitates design exploration by building 3-5 distinct UI variants inside an isolated picker harness.
- **Must not define:** Direct edits to production routes, operates in isolated `/prototypes/slug` routes.
- **Normative base:** `core/decision-framework.md`, `shared/engineering/typescript-standards.md`, `shared/engineering/naming-conventions.md`, `shared/engineering/design-principles.md`, `shared/engineering/function-design.md`, `shared/engineering/module-organization.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`.
- **Anti-pattern gate:** Blocks AP-1, AP-4, AP-18, AP-26, AP-28, AP-44, and AP-45.

## 1. Intent (9 Dimensions)

| # | Dimension | Value |
|---|-----------|-------|
| 1 | Task | Generate 3-5 genuinely distinct UI variants rendered behind a standardized picker harness. |
| 2 | Target Tool | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API. |
| 3 | Output Format | Variant comparison summary table, harness URL/path, and functional prototype code. |
| 4 | Constraints | Never touch production code during exploration. Follow `../references/prototype-picker.md`. |
| 5 | Input | Component exploration prompt or multi-variant UI request. |
| 6 | Context | Prevents superficial color-only tweaks by exploring true interaction and density axes. |
| 7 | Audience | Product designers, frontend leads, and design engineers. |
| 8 | Success Criteria | Isolated route created, 3-5 distinct variants rendered, picker harness functional. |
| 9 | Examples | See Section 10. |

## 2. Trigger Matrix

| Trigger | Fire? | Notes |
|---------|-------|-------|
| Exploring visual or interaction design directions for a single component | YES | Core trigger. |
| Generating interactive variant prototypes behind a visual picker harness | YES | Core trigger. |
| Refactoring existing production components directly | NO | Out of scope. |

## 3. Execution Workflow

### Step 1: Scope Isolation & Reconnaissance

- **Action:** Isolate request to a single component (e.g., pricing card, hold-to-delete button, toast). Map project stack and tokens.
- **Input:** User component prompt.
- **Stop Condition:** Halt if request spans an entire 15-page application.
- **Validation:** Single component target selected.

### Step 2: Direction & Axis Formulation

- **Action:** Define 3 variants (up to 5 if requested). Assign distinct names ("Quiet", "Editorial", "Playful") and distinct axes of divergence (density, layout, motion story).
- **Input:** Target component concept.
- **Stop Condition:** Halt if variants only differ by border color or corner radius.
- **Validation:** 3 distinct axes of divergence specified.

### Step 3: Picker Harness Implementation

- **Action:** Build picker harness adhering strictly to `../references/prototype-picker.md`. Render variants full-size in isolated `/prototypes/slug` route or standalone HTML file.
- **Input:** Formulated variants.
- **Stop Condition:** Halt if production components are modified directly.
- **Validation:** Picker harness mounts cleanly with instant keyboard/click switching (`1-N`, `R`).

### Step 4: Presentation & User Review

- **Action:** Output markdown summary table detailing variants, rationale, costs, and picker location. Stop and wait for user selection.
- **Input:** Implemented harness and variants.
- **Stop Condition:** None.
- **Validation:** Summary table and picker location emitted.

## 4. Output Specification

```markdown
### Prototype Ready

| # | Variant | Axis | When it's the right choice | Its cost |
| --- | --- | --- | --- | --- |
| 1 | Quiet | Linear fill, no bounce | Functional dashboards | Unmemorable |
| 2 | Physical | Spring release, haptic shake | High-risk destructive actions | Adds visual noise |
| 3 | Minimal | Long press delay, static state | Density-heavy tables | Weak feedback |

**Location:** `http://localhost:3000/prototypes/delete-btn`
```

## 5. Validation Gate

- [ ] Production code left untouched (prototypes built in isolated route).
- [ ] Implement picker harness following `../references/prototype-picker.md`.
- [ ] 3-5 variants differ on real structural or interaction axes (not minor color tweaks).
- [ ] All variants built with realistic interactive data (no lorem ipsum or dead controls).

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Building variants that differ only by border radius or font size.
- **Over-execution threshold:** Generating 10 variants, diluting comparison clarity.
- **Calibration default:** Default to 3 distinct interaction models (Quiet, Physical, Minimal).

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| 1 | AP-1 (vague task) | Isolates exploration to a single component scope. |
| 3 | AP-26 (no scope boundary) | Confines all experimental code to `/prototypes/slug`. |
| 4 | AP-18 (unstructured output) | Enforces structured variant comparison table. |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0` : Enterprise standard Tier-5 creation derived from prototype.

## 9. Portability Matrix

| Runtime | Status | Notes |
|---------|--------|-------|
| Claude Code | verified | Direct prototype harness generator. |
| Cursor | verified | Interactive prototype route editor. |
| Copilot | verified | Variant generation assistant. |
| Windsurf | verified | Cascade execution. |
| Kiro | verified | Prototype harness runner. |
| Cline | verified | System prompt task mode. |
| Raw API | verified | Model-agnostic prototype builder. |

## 10. Examples

**Input:** "Prototype a hold-to-delete button."
**Output:** 3 variants (Quiet, Physical, Minimal) generated in `/prototypes/delete-btn` with picker harness.
