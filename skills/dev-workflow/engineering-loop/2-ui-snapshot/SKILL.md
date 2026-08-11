---
name: 2-ui-snapshot
description: >-
  Extract core visual tokens (colors, padding, radii) from a built component and record them in context/design-tokens.md so future components perfectly match the project's visual identity. Run this immediately after building any frontend component. Do NOT execute on backend code.
version: 1.0.0
verified-on: [cline]
---

# UI Snapshot

## 0. Identity

- **Role:** Design System Enforcer. Reads a newly built UI component, extracts visual properties, and updates the design registry to maintain global consistency.
- **Authority:** Controls the extraction of visual tokens. Cannot alter the component code.
- **Must not define:** The underlying design philosophy, only enforces it.
- **Normative base:** `context/design-tokens.md`.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                                            |
| --- | ---------------- | ---------------------------------------------------------------------------------------------------------------- |
| 1   | Task             | Extract visual tokens from a UI component and update the design registry.                                        |
| 2   | Target Tool      | Any agent runtime.                                                                                               |
| 3   | Output Format    | Appended entries in `context/design-tokens.md`.                                          |
| 4   | Constraints      | Extract only visual tokens (colors, radii, spacing). Ignore structural tokens (flex, grid, position).            |
| 5   | Input            | Filepath to the newly built component.                                                                           |
| 6   | Context          | Enforces UI consistency across isolated agent sessions.                                                          |
| 7   | Audience         | The executing agent for future UI tasks.                                                                         |
| 8   | Success Criteria | `context/design-tokens.md` is updated and developer is informed of the extracted tokens. |
| 9   | Examples         | See §10.                                                                                                         |

## 2. Trigger Matrix

| Trigger                             | Fire? | Notes               |
| ----------------------------------- | ----- | ------------------- |
| "Run ui-snapshot on this component" | YES   | Core trigger.       |
| "Record these UI styles"            | YES   | Core trigger.       |
| "Refactor this backend route"       | NO    | Not a UI component. |

## 3. Execution Workflow

### Step 1: Target Identification

- **Action:** Read the component file provided by the developer. If no file is provided, ask the developer which file to snapshot.
- **Input:** Filepath.
- **Stop Condition:** If filepath is invalid or points to backend logic, halt and report.
- **Validation:** Component source code is loaded.

### Step 2: Token Extraction

- **Action:** Extract specific visual classes or properties: backgrounds, text colors, border radii, border colors, and padding/gap spacing. Discard structural layout properties (flex, grid, relative positioning).
- **Input:** Component source code.
- **Stop Condition:** None.
- **Validation:** Visual tokens isolate correctly.

### Step 3: Registry Update

- **Action:** Open `context/design-tokens.md`. Append the extracted tokens under a clear heading for the component type (e.g., "Card", "Button").
- **Input:** Extracted tokens.
- **Stop Condition:** None.
- **Validation:** File is written successfully.

### Step 4: Developer Handoff

- **Action:** Output a summary of the extracted tokens to the developer.
- **Input:** Updated registry state.
- **Stop Condition:** Await next task.
- **Validation:** Summary matches written registry.

## 4. Output Specification

```markdown
# Snapshot Complete

Recorded the following tokens for **[Component Name]** into `context/design-tokens.md`:

- Background: [token]
- Border Radius: [token]
- Padding: [token]

Future components of this type will adhere to these properties.
```

## 5. Validation Gate

- [ ] Target file was confirmed as UI code.
- [ ] Only visual tokens (not structural) were extracted.
- [ ] `context/design-tokens.md` was appended to, not overwritten entirely.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Failing to record extracted tokens to the registry file.
- **Over-execution threshold:** Extracting layout properties (e.g., `flex-col`, `absolute`) as global design tokens.

## 7. Anti-Pattern Compliance

| Step | Prevents AP               | Mechanism                                                    |
| ---- | ------------------------- | ------------------------------------------------------------ |
| 1    | AP-29 (no file path)      | Demands exact component filepath.                            |
| 2    | AP-21 (vague adjectives)  | Replaces vague instructions with hardcoded visual tokens.    |
| 3    | AP-10 (assumed knowledge) | Persists UI knowledge into a fixed file for future sessions. |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0` — Initial enterprise tier implementation.

## 9. Portability Matrix

| Runtime | Status   |
| ------- | -------- |
| Cline   | verified |

## 10. Examples

**Input:** "Snapshot `Button.tsx`"
**Output:** Extracts `bg-blue-500`, `rounded-md`, `px-4 py-2` and appends to `DESIGN.md`.
