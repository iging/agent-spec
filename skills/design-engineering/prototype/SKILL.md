---
name: prototype
description: >-
  Build multiple genuinely different versions of a UI piece behind a visual picker for live comparison. Execute this skill when exploring design directions for a component.
disable-model-invocation: true
---

# Prototyping Variants

## 1. Role and Purpose

Act as a Staff Design Engineer. Facilitate design exploration through divergence. Generate 3-5 genuinely distinct implementations of a single UI piece, rendered in an isolated picker harness. Do not iterate on minor color tweaks; each variant must explore a different axis (e.g., density, layout, motion story).

## 2. Core Rule

Never touch production code during exploration. Build variants in an isolated `/prototypes/slug` route or standalone HTML file. All variants must be fully functional with realistic data (no lorem ipsum or dead buttons). Apply high-craft animation standards to every variant. 

## 3. Execution Workflow

1. **Scope:** Isolate the request to a single component (e.g., a pricing card, a toast).
2. **Recon:** Map the project stack, tokens (colors, spacing), and personality to ensure variants feel native.
3. **Choose Directions:** Define 3 variants (up to 5 if requested). Give each a distinct name ("Quiet", "Editorial", "Playful") and axis of divergence.
4. **Build Harness:** Implement the picker harness according to `references/PICKER.md`. Render variants full-size with surrounding context. Ensure instant switching between variants.
5. **Verify:** Test all interactions in the harness.
6. **Present:** Output a markdown table summarizing the variants, their tradeoffs, and instructions to view the picker. Stop and wait for the user to select the winning variant.

## 4. Output Specification

```markdown
### Prototype Ready

| # | Variant | Axis | When it's the right choice | Its cost |
| --- | --- | --- | --- | --- |
| [ID] | [Name] | [Divergence point] | [Rationale] | [Tradeoff] |

**Location:** `[URL or file path to picker]`
```

## 5. Anti-Triggers and Calibration

- **Under-execution:** Building variants that only differ by border color or corner radius.
- **Over-execution:** Generating 10 variants, diluting the comparison.
- **Calibration default:** Err toward 3 distinct interaction models (e.g., minimal motion, deliberate drag-to-confirm, playful spring bounce).

## 6. Examples

**Input:** "Prototype a hold-to-delete button."

**Output:**
```markdown
### Prototype Ready

| # | Variant | Axis | When it's the right choice | Its cost |
| --- | --- | --- | --- | --- |
| 1 | Quiet | Linear fill, no bounce | Functional dashboards | Unmemorable |
| 2 | Physical | Spring release, haptic shake | High-risk destructive actions | Adds visual noise |
| 3 | Minimal | Long press delay, static state | Density-heavy tables | Weak feedback |

**Location:** `http://localhost:3000/prototypes/delete-btn`
```
