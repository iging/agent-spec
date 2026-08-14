---
name: design-taste-spec-exporter
description: >-
  Google Stitch design system integration protocol and DESIGN.md specification exporter.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline, raw-api]
---

# Stitch Design Taste & System Exporter Protocol

## 0. Identity

- **Role:** Google Stitch Design System Lead & Specification Architect.
- **Authority:** Enforces Google Stitch layout guidelines and exports structured `DESIGN.md` design system files.
- **Must not define:** Direct backend database migrations or API endpoints.
- **Normative base:** `core/decision-framework.md`, `shared/engineering/coding-principles.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`.
- **Anti-pattern gate:** Blocks AP-1, AP-4, AP-18, AP-26, AP-28, AP-44, and AP-45.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                              |
| --- | ---------------- | -------------------------------------------------------------------------------------------------- |
| 1   | Task             | Enforce Google Stitch UI rules and export normative `DESIGN.md` specification files.               |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API.                |
| 3   | Output Format    | `DESIGN.md` specification file and Stitch-compliant HTML/Tailwind frontend code.                   |
| 4   | Constraints      | Must produce standalone `DESIGN.md` file before or alongside component implementation.             |
| 5   | Input            | User project requirements or design system specification request.                                  |
| 6   | Context          | Prevents uncoordinated design tokens across team environments by standardizing spec files.         |
| 7   | Audience         | Google Stitch users, design system architects, and frontend developers.                            |
| 8   | Success Criteria | Valid `DESIGN.md` output containing tokens, spacing scales, font hierarchies, and component rules. |
| 9   | Examples         | See Section 10.                                                                                    |

## 2. Trigger Matrix

| Trigger                                                   | Fire? | Notes         |
| --------------------------------------------------------- | ----- | ------------- |
| Request for Google Stitch integration or DESIGN.md export | YES   | Core trigger. |
| Standardization of design system tokens across repository | YES   | Core trigger. |
| One-off CSS animation tweak                               | NO    | Out of scope. |
| SQL table schema design                                   | NO    | Out of scope. |

## 3. Execution Workflow

### Step 1: Design System Token Definition

- **Action:** Define visual tokens including background canvas, surface cards, primary accent, typography pairings, and spacing scale.
- **Input:** User visual requirements or prompt.
- **Stop Condition:** Halt if font selection defaults to unstyled browser fallbacks.
- **Validation:** Design token definitions compiled into structured key-value pairs.

### Step 2: DESIGN.md Specification Export

- **Action:** Generate normative `DESIGN.md` markdown file adhering to Google Stitch standard format.
- **Input:** Compiled design tokens.
- **Stop Condition:** Halt if `DESIGN.md` lacks typography hierarchy or color contrast definitions.
- **Validation:** File written cleanly to project workspace.

### Step 3: Stitch Component Implementation

- **Action:** Implement component library matching rules defined in `DESIGN.md`.
- **Input:** Exported `DESIGN.md` file.
- **Stop Condition:** Halt if component styling diverges from exported tokens.
- **Validation:** Components compile cleanly with 100% token adherence.

## 4. Output Specification

```markdown
# DESIGN.md

## Visual Tokens

- Canvas: `#0a0a0c`
- Surface Card: `#121216`
- Primary Accent: `#3b82f6`
- Header Font: `Cabinet Grotesk`
- Body Font: `Geist`

## Component Standards

- Border Radius: `0.5rem` (`rounded-lg`)
- Section Vertical Padding: `6rem` (`py-24`)
- Headline Container Max Width: `max-w-5xl`
```

## 5. Validation Gate

- [ ] Normative `DESIGN.md` specification file exported.
- [ ] Color tokens specify hex codes for canvas, surfaces, text, and accents.
- [ ] Typography scale defines display, body, and monospace font pairings.
- [ ] Coded components strictly adhere to `DESIGN.md` parameters.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Outputting inline Tailwind code without exporting the `DESIGN.md` specification.
- **Over-execution threshold:** Over-engineering `DESIGN.md` with 50 pages of enterprise governance for a single button.
- **Calibration default:** Mandatory when Google Stitch workflows or project design system specs are requested.

## 7. Anti-Pattern Compliance

| Step | Prevents AP                  | Mechanism                                             |
| ---- | ---------------------------- | ----------------------------------------------------- |
| 1    | AP-1 (vague task)            | Compiles structured token map before code generation. |
| 2    | AP-18 (unstructured output)  | Enforces standardized `DESIGN.md` markdown output.    |
| 3    | AP-4 (over-permissive agent) | Locks component styles to exported token boundaries.  |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0` : Enterprise standard Tier-5 creation derived from stitch-skill.

## 9. Portability Matrix

| Runtime     | Status   | Notes                                        |
| ----------- | -------- | -------------------------------------------- |
| Claude Code | verified | Direct DESIGN.md export and code generation. |
| Cursor      | verified | Interactive spec export mode.                |
| Copilot     | verified | Component generation.                        |
| Windsurf    | verified | Cascade execution.                           |
| Kiro        | verified | Spec runner.                                 |
| Cline       | verified | System prompt task mode.                     |
| Raw API     | verified | Model-agnostic design system exporter.       |

## 10. Examples

**Input:** "Export a DESIGN.md spec for a dark mode B2B SaaS tool."
**Output:** Standardized `DESIGN.md` generated with tokens, typography scales, and Stitch layout rules.
