---
name: codex-aida-landing-structure-engine
description: >-
  Codex/GPT-optimized AIDA page structuring, seed-based design randomization, and GSAP ScrollTrigger skeletons.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline, raw-api]
---

# GPT/Codex AIDA Design & Motion Engine

## 0. Identity

- **Role:** High-Variance Motion & AIDA Page Structure Specialist.
- **Authority:** Controls seed-based design randomization and GSAP scroll choreography for GPT/Codex models.
- **Must not define:** Backend database logic, handles page-level AIDA visual layout and GSAP motion.
- **Normative base:** `core/decision-framework.md`, `shared/engineering/typescript-standards.md`, `shared/engineering/naming-conventions.md`, `shared/engineering/design-principles.md`, `shared/engineering/function-design.md`, `shared/engineering/module-organization.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`.
- **Anti-pattern gate:** Blocks AP-1, AP-4, AP-18, AP-26, AP-28, AP-44, and AP-45.

## 1. Intent (9 Dimensions)

| # | Dimension | Value |
|---|-----------|-------|
| 1 | Task | Break LLM statistical loops using seed-based design selection and AIDA structure. |
| 2 | Target Tool | GPT-4, Codex, Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API. |
| 3 | Output Format | Full-length React/HTML pages with inline GSAP ScrollTrigger animations. |
| 4 | Constraints | Must simulate seed selection before code. H1 max 2-3 lines. Zero Inter font. |
| 5 | Input | User landing page or marketing site prompt. |
| 6 | Context | Prevents LLM statistical collapse into narrow 6-line heroes and repetitive layouts. |
| 7 | Audience | Frontend developers and agency design teams. |
| 8 | Success Criteria | Seed selected, AIDA layout applied, GSAP triggers pinned cleanly, tests pass. |
| 9 | Examples | See Section 10. |

## 2. Trigger Matrix

| Trigger | Fire? | Notes |
|---------|-------|-------|
| Request for Awwwards-tier motion landing page | YES | Core trigger. |
| Need for seed-based randomization to avoid AI defaults | YES | Core trigger. |
| Simple static contact form | NO | Use basic UI design. |
| Backend API architecture | NO | Out of scope. |

## 3. Execution Workflow

### Step 1: Simulated Seed Randomization

- **Action:** Compute seed from prompt length. Select 1 Hero architecture, 1 font stack (Cabinet Grotesk / Satoshi / Outfit / Geist), 3 component structures, and 2 GSAP paradigms.
- **Input:** User prompt string.
- **Stop Condition:** Halt if Inter font or standard Bootstrap grid is selected.
- **Validation:** Randomization selection recorded in design plan.

### Step 2: AIDA Structural Assembly

- **Action:** Build layout following Attention (Hero), Interest (Bento), Desire (GSAP Pinned), Action (CTA/Footer).
- **Input:** Selected design tokens.
- **Stop Condition:** Halt if vertical spacing between sections is less than `py-24`.
- **Validation:** Section padding enforces massive breathing room (`py-32 md:py-48`).

### Step 3: GSAP ScrollTrigger Choreography

- **Action:** Inject GSAP pin, scrub, or horizontal pan triggers using canonical skeletons.
- **Input:** Target container selectors.
- **Stop Condition:** Halt if animation binds to raw `window.onscroll` events.
- **Validation:** GSAP triggers use clean lifecycle hooks (`useLayoutEffect` / `useEffect`).

## 4. Output Specification

```tsx
// Simulated Design Seed: Seed #42 -> Font: Cabinet Grotesk -> Hero: Cinematic Center -> Motion: GSAP Pin
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function PinnedSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=100%",
        pin: true,
        scrub: 1,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen w-full bg-neutral-950 text-white flex items-center justify-center"
    >
      <h2 className="text-6xl font-bold tracking-tight">
        Cinematic Horizontal Motion
      </h2>
    </div>
  );
}
```

## 5. Validation Gate

- [ ] Seed selection declared in design plan before code assembly.
- [ ] Hero container uses wide width (`max-w-5xl`+) ensuring H1 does not exceed 3 lines.
- [ ] GSAP triggers registered inside clean lifecycle contexts.
- [ ] Huge section padding (`py-32 md:py-48`) enforced.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Falling back to static repetitive card layouts.
- **Over-execution threshold:** Adding GSAP pinning to small mobile viewports without scroll fallback.
- **Calibration default:** Mandatory for motion-intensive Awwwards-style web projects.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| 1 | AP-1 (vague task) | Forces explicit seed selection prior to execution. |
| 2 | AP-26 (no scope boundary) | Enforces strict AIDA structural boundaries. |
| 3 | AP-9 (no verification) | Validates GSAP context cleanup to prevent memory leaks. |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0` : Enterprise standard Tier-5 creation derived from gpt-tasteskill.

## 9. Portability Matrix

| Runtime | Status | Notes |
|---------|--------|-------|
| Claude Code | verified | Full script and component generation. |
| Cursor | verified | Interactive motion generation. |
| Copilot | verified | Component generation. |
| Windsurf | verified | Cascade execution. |
| Kiro | verified | Motion runner. |
| Cline | verified | Task execution mode. |
| Raw API | verified | Model-agnostic design code generator. |

## 10. Examples

**Input:** "Create an Awwwards-level landing page with GSAP scroll pinning."
**Output:** Seed selection plan output, wide hero generated, GSAP ScrollTrigger skeleton injected.
