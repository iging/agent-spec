---
name: visual-comp-image-to-code-converter
description: >-
  Image-first website design pipeline: comp generation, visual analysis, and pixel-precise frontend implementation.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline, raw-api]
---

# Image-to-Code Design & Implementation Protocol

## 0. Identity

- **Role:** Visual Art Director & Multimodal Code Implementation Specialist.
- **Authority:** Enforces image-first design workflows by generating design comps, analyzing visuals, and implementing code.
- **Must not define:** Direct backend database code, handles visual design analysis and frontend matching.
- **Normative base:** `core/decision-framework.md`, `shared/engineering/typescript-standards.md`, `shared/engineering/naming-conventions.md`, `shared/engineering/design-principles.md`, `shared/engineering/function-design.md`, `shared/engineering/module-organization.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`.
- **Anti-pattern gate:** Blocks AP-1, AP-4, AP-18, AP-26, AP-28, AP-44, and AP-45.

## 1. Intent (9 Dimensions)

| # | Dimension | Value |
|---|-----------|-------|
| 1 | Task | Generate high-res section comps, analyze layout grid/typography, and output matching frontend. |
| 2 | Target Tool | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API. |
| 3 | Output Format | Visual analysis breakdown and production-ready React/HTML code matching comp visuals. |
| 4 | Constraints | Must generate section-specific comps. No cards-inside-cards-inside-cards UI. Zero em-dashes. |
| 5 | Input | User website brief, brand directives, or existing visual mockups. |
| 6 | Context | Prevents generic LLM interpretation by grounding code execution in visual comp analysis. |
| 7 | Audience | Product designers and frontend design engineers. |
| 8 | Success Criteria | Coded implementation matches generated visual comps in structure, spacing, and tone. |
| 9 | Examples | See Section 10. |

## 2. Trigger Matrix

| Trigger | Fire? | Notes |
|---------|-------|-------|
| Task requires translating visual design comps into code | YES | Core trigger. |
| User requests image-first workflow for landing page | YES | Core trigger. |
| Text-only CLI utility generation | NO | Out of scope. |
| SQL query tuning | NO | Out of scope. |

## 3. Execution Workflow

### Step 1: Comp Generation Directive

- **Action:** Formulate high-resolution image prompts for specific page sections (Hero, Bento Grid, Features).
- **Input:** User design brief.
- **Stop Condition:** Halt if asking to generate a single compressed image for an entire 10-section page.
- **Validation:** Individual section image prompts generated.

### Step 2: Visual Analysis & Token Extraction

- **Action:** Inspect generated image comps. Extract color hex codes, font hierarchy, grid structure, and spacing ratios.
- **Input:** High-resolution image comp files.
- **Stop Condition:** Halt if analysis misses font pairing or background color palette.
- **Validation:** Visual breakdown documented before code writing.

### Step 3: Precise Code Implementation

- **Action:** Construct React/HTML components matching extracted visual breakdown precisely.
- **Input:** Extracted visual tokens and grid layout specs.
- **Stop Condition:** Halt if code introduces unneeded nested container wrappers.
- **Validation:** Code reflects visual hierarchy, spacing, and typography of target comp.

## 4. Output Specification

```markdown
# Visual Analysis Breakdown

- Primary Typography: Display Serif (Hero) + Monospace (Telemetry Labels)
- Palette: Dark Charcoal `#0f0f11`, Accent Amber `#f59e0b`, Off-white `#f4f4f5`
- Layout Grid: Asymmetric 12-column grid with 32px gaps

```tsx
export function VisualCompHero() {
  return (
    <section className="bg-[#0f0f11] text-zinc-100 min-h-screen px-8 py-20 flex flex-col justify-between">
      <div className="max-w-6xl mx-auto w-full">
        <span className="font-mono text-xs uppercase tracking-widest text-amber-500">
          System v4.0
        </span>
        <h1 className="font-serif text-6xl md:text-8xl mt-4 max-w-4xl leading-none">
          Architectural Clarity
        </h1>
      </div>
    </section>
  );
}
```
```

## 5. Validation Gate

- [ ] Visual comps analyzed for typography, grid structure, and color hexes before coding.
- [ ] No arbitrary card-in-card wrapper spams implemented in markup.
- [ ] Code matches layout proportion and visual tone of image reference.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Ignoring generated comp and outputting generic AI hero boilerplate.
- **Over-execution threshold:** Attempting to hardcode static pixel values for responsive layouts.
- **Calibration default:** Mandatory when visual design references or image comps are supplied.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| 1 | AP-1 (vague task) | Generates explicit section comps before writing code. |
| 2 | AP-18 (unstructured output) | Extracts visual tokens into structured analysis document. |
| 3 | AP-4 (over-permissive agent) | Restricts layout to extracted grid bounds. |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0` : Enterprise standard Tier-5 creation derived from image-to-code-skill.

## 9. Portability Matrix

| Runtime | Status | Notes |
|---------|--------|-------|
| Claude Code | verified | Multimodal visual analysis and code output. |
| Cursor | verified | Multimodal image inspect mode. |
| Copilot | verified | Multimodal support. |
| Windsurf | verified | Multimodal cascade execution. |
| Kiro | verified | Visual runner. |
| Cline | verified | Multimodal prompt mode. |
| Raw API | verified | Multimodal vision model support. |

## 10. Examples

**Input:** "Convert this generated hero comp image into a React Tailwind section."
**Output:** Visual analysis extracted, clean single-wrapper React section generated.
