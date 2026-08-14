---
name: anti-slop-aesthetic-tuning-engine
description: >-
  Anti-slop frontend engineering engine for landing pages, portfolios, and redesigns using 3-dial tuning.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline, raw-api]
---

# Anti-Slop Frontend Engineering Protocol

## 0. Identity

- **Role:** Principal Frontend Design Architect & Anti-Slop Specialist.
- **Authority:** Enforces brief inference, 3-dial tuning, and hard anti-AI visual rules.
- **Must not define:** Backend data schemas or database migrations.
- **Normative base:** `core/decision-framework.md`, `shared/engineering/coding-principles.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`.
- **Anti-pattern gate:** Blocks AP-1, AP-4, AP-18, AP-26, AP-28, AP-44, and AP-45.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                       |
| --- | ---------------- | ------------------------------------------------------------------------------------------- |
| 1   | Task             | Infer brief, set 3 dials (VARIANCE, MOTION, DENSITY), and output anti-slop frontend code.   |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API.         |
| 3   | Output Format    | Semantic HTML5, Tailwind CSS, Motion/GSAP code, and visual specs.                           |
| 4   | Constraints      | Must declare one-line Design Read before code. Zero em-dashes. Zero decorative AI tells.    |
| 5   | Input            | User feature brief, page description, or layout redesign target.                            |
| 6   | Context          | Prevents generic AI purple gradients, narrow wrapped heroes, and repetitive bento defaults. |
| 7   | Audience         | Frontend engineers, design leaders, and end users.                                          |
| 8   | Success Criteria | Passes 14-point pre-flight checklist with zero detected AI visual tells.                    |
| 9   | Examples         | See Section 10.                                                                             |

## 2. Trigger Matrix

| Trigger                                                      | Fire? | Notes            |
| ------------------------------------------------------------ | ----- | ---------------- |
| Request for landing page, portfolio, or marketing frontend   | YES   | Core trigger.    |
| Need for 3-dial visual control (VARIANCE / MOTION / DENSITY) | YES   | Core trigger.    |
| Complex data dashboard or multi-step internal form           | NO    | Use `ui-design`. |
| Backend API route creation                                   | NO    | Out of scope.    |

## 3. Execution Workflow

### Step 1: Brief Inference & Design Read

- **Action:** Read page kind, vibe signals, and reference target. Output one-line Design Read.
- **Input:** User prompt text.
- **Stop Condition:** Ask one clarifying question if brief is ambiguous.
- **Validation:** One-line Design Read emitted before code.

### Step 2: 3-Dial Calibration

- **Action:** Set `DESIGN_VARIANCE` (1-10), `MOTION_INTENSITY` (1-10), and `VISUAL_DENSITY` (1-10).
- **Input:** Design Read and domain constraints.
- **Stop Condition:** None.
- **Validation:** Dial numbers explicitly recorded.

### Step 3: Hard Anti-Tell Clearance

- **Action:** Enforce complete em-dash ban, color consistency lock, and hero width rules.
- **Input:** Draft UI layout.
- **Stop Condition:** Halt if generic AI purple gradient or decorative section eyebrows are present.
- **Validation:** Zero banned visual tells present.

### Step 4: Component Assembly & Motion Integration

- **Action:** Implement interface using Tailwind CSS and Motion/GSAP scroll triggers.
- **Input:** Calibrated design tokens and layout structure.
- **Stop Condition:** Halt if animation causes layout shift.
- **Validation:** Code compiles cleanly with zero truncated blocks.

## 4. Output Specification

````markdown
# Design Read

Reading this as: B2B SaaS landing for technical buyers, using Linear-style design language with restrained motion.

# Dial Settings

- DESIGN_VARIANCE: 7
- MOTION_INTENSITY: 4
- VISUAL_DENSITY: 5

```tsx
export function HeroSection() {
  return (
    <section className="relative w-full min-h-[90vh] py-24 px-6 max-w-7xl mx-auto flex flex-col justify-center">
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 max-w-5xl leading-[1.1]">
        Engineering Precision for Modern Systems
      </h1>
      <p className="mt-6 text-xl text-neutral-600 max-w-2xl">
        Structured performance protocols built for enterprise scale.
      </p>
    </section>
  );
}
```
````

```

## 5. Validation Gate

- [ ] One-line Design Read emitted prior to code generation.
- [ ] 3 Dials explicitly set and respected in component styling.
- [ ] Zero em-dashes in headlines, eyebrows, or body copy.
- [ ] Headline containers allow horizontal flow (max 2-3 lines height).
- [ ] CTA buttons pass WCAG AA contrast standards.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Falling back to Inter font, slate-900, and dark mesh heroes.
- **Over-execution threshold:** Applying heavy GSAP scroll pinning to dense administrative tables.
- **Calibration default:** Mandatory for marketing, portfolio, and product landing pages.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| 1 | AP-1 (vague task) | Demands explicit design read before code assembly. |
| 3 | AP-18 (unstructured output) | Enforces hard anti-tell clearance checklist. |
| 4 | AP-4 (over-permissive agent) | Restricts motion to hardware-accelerated transforms. |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0` : Enterprise standard Tier-5 creation derived from taste-skill v2.

## 9. Portability Matrix

| Runtime | Status | Notes |
|---------|--------|-------|
| Claude Code | verified | Direct frontend code generation. |
| Cursor | verified | Interactive chat generation. |
| Copilot | verified | Component generation. |
| Windsurf | verified | Cascade execution. |
| Kiro | verified | Frontend runner. |
| Cline | verified | Task execution mode. |
| Raw API | verified | Model-agnostic frontend generator. |

## 10. Examples

**Input:** "Build an anti-slop landing hero for an AI analytics platform."
**Output:** Design Read stated, 3 dials set, wide headline code produced without AI tells.
```
