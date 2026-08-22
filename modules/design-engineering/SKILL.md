---
name: design-engineering
description: >-
  Root router and lifecycle dispatcher for design engineering, anti-slop frontend, spring motion, and visual aesthetics.
version: 2.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline, raw-api]
---

# Design Engineering Suite Router (v2.0.0)

## 0. Identity

- **Role:** Design Engineering Lifecycle Dispatcher.
- **Authority:** Normative root router for `modules/design-engineering/`.
- **Must not define:** Direct frontend code implementation, routing hands off to specialized stage sub-skills.
- **Normative base:** `core/decision-framework.md`, `shared/engineering/typescript-standards.md`, `shared/engineering/naming-conventions.md`, `shared/engineering/design-principles.md`, `shared/engineering/function-design.md`, `shared/engineering/module-organization.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`.
- **Anti-pattern gate:** Blocks AP-1, AP-4, AP-18, AP-26, AP-28, AP-44, and AP-45.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                               |
| --- | ---------------- | ----------------------------------------------------------------------------------- |
| 1   | Task             | Classify design requests into 6 lifecycle stages and dispatch to sub-skills.        |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API. |
| 3   | Output Format    | Structured routing decision and target skill execution handoff.                     |
| 4   | Constraints      | No direct UI code generation in router. Zero em-dashes.                             |
| 5   | Input            | User UI prompt, feature design idea, image comp, animation audit, or redesign.      |
| 6   | Context          | Prevents templated AI design output and unguided aesthetic selection.               |
| 7   | Audience         | Autonomous agents and developers building user interfaces.                          |
| 8   | Success Criteria | Exactly one target design skill resolved and executed deterministically.            |
| 9   | Examples         | See Section 10.                                                                     |

## 2. Trigger Matrix

| Stage   | Trigger                                 | Target Skill File Path                                                        |
| ------- | --------------------------------------- | ----------------------------------------------------------------------------- |
| Stage 1 | UI/UX architecture & Nielsen heuristics | `01-foundations-and-systems/design-system-architecture-spec.md`               |
| Stage 1 | Domain token system & wireframing       | `01-foundations-and-systems/token-system-wireframe-builder.md`                |
| Stage 1 | Deterministic UI/UX audit & stack rules | `01-foundations-and-systems/ui-ux-stack-compliance-auditor.md`                |
| Stage 1 | Curated UI library recommendation       | `01-foundations-and-systems/ui-framework-selection-matrix.md`                 |
| Stage 1 | Google Stitch & DESIGN.md spec export   | `01-foundations-and-systems/design-taste-spec-exporter.md`                    |
| Stage 2 | Anti-slop 3-dial tuning                 | `02-aesthetic-engines-and-styles/anti-slop-aesthetic-tuning-engine.md`        |
| Stage 2 | High-craft motion & GPU audit           | `02-aesthetic-engines-and-styles/high-craft-gpu-performance-auditor.md`       |
| Stage 2 | $150k+ agency look, Ethereal Glass      | `02-aesthetic-engines-and-styles/ethereal-glass-agency-aesthetic.md`          |
| Stage 2 | Utilitarian minimalism                  | `02-aesthetic-engines-and-styles/utilitarian-minimalist-layout-engine.md`     |
| Stage 2 | Swiss print typography & telemetry HUD  | `02-aesthetic-engines-and-styles/industrial-brutalist-telemetry-hud.md`       |
| Stage 2 | Apple physical motion & spring physics  | `02-aesthetic-engines-and-styles/apple-human-interface-motion-spec.md`        |
| Stage 2 | GPT/Codex AIDA page structure & GSAP    | `02-aesthetic-engines-and-styles/codex-aida-landing-structure-engine.md`      |
| Stage 3 | Brandkit image generation moodboards    | `03-brand-presets-and-visual-identity/brandkit-moodboard-prompt-generator.md` |
| Stage 3 | 60+ Brand presets                       | `03-brand-presets-and-visual-identity/brand-presets/`                         |
| Stage 4 | Animation vocabulary & term resolver    | `04-motion-and-interaction/motion-vocabulary-term-resolver.md`                |
| Stage 4 | Sweeping UI codebase for missing motion | `04-motion-and-interaction/codebase-motion-gap-scanner.md`                    |
| Stage 4 | Motion codebase audit & plans           | `04-motion-and-interaction/motion-codebase-refactor-planner.md`               |
| Stage 4 | PR motion code review & regression gate | `04-motion-and-interaction/pull-request-motion-review-gate.md`                |
| Stage 4 | Multi-variant UI prototyping            | `04-motion-and-interaction/multi-variant-interactive-prototyping.md`          |
| Stage 5 | Image-to-code visual comp analysis      | `05-vision-and-code-generation/visual-comp-image-to-code-converter.md`        |
| Stage 5 | Desktop web landing page image prompts  | `05-vision-and-code-generation/desktop-web-landing-image-prompter.md`         |
| Stage 5 | Mobile app screen image prompts         | `05-vision-and-code-generation/mobile-app-screen-image-prompter.md`           |
| Stage 6 | Codebase diagnostic & visual refactor   | `06-audit-refactor-and-enforcement/visual-redesign-diagnostic-auditor.md`     |
| Stage 6 | Full output code enforcement            | `06-audit-refactor-and-enforcement/zero-placeholder-code-enforcer.md`         |
| Stage 6 | Legacy v1 taste-skill fallback          | `06-audit-refactor-and-enforcement/legacy-taste-v1-fallback-handler.md`       |

## 3. Execution Workflow

### Step 1: Analyze Design Intent

- **Action:** Inspect user prompt, aesthetic descriptors, stack requirements, and task boundaries.
- **Input:** User prompt text.
- **Stop Condition:** Stop and ask user if aesthetic target is ambiguous.
- **Validation:** User intent matches a row in the Trigger Matrix.

### Step 2: Resolve Target Skill Path

- **Action:** Select exact skill path corresponding to the identified visual design goal.
- **Input:** Trigger Matrix table.
- **Stop Condition:** Decline execution if no design skill matches.
- **Validation:** Target skill file exists under `modules/design-engineering/`.

### Step 3: Handoff Execution

- **Action:** Invoke target sub-skill with contextual parameters.
- **Input:** Resolved skill path.
- **Stop Condition:** Handoff transfers control to sub-skill.
- **Validation:** Sub-skill executes internal workflow.

## 4. Output Specification

```json
{
  "design_category": "anti-slop-aesthetic-tuning-engine",
  "target_skill": "modules/design-engineering/02-aesthetic-engines-and-styles/anti-slop-aesthetic-tuning-engine.md",
  "reasoning": "Selected based on anti-slop landing page request."
}
```

## 5. Validation Gate

- [ ] User design intent mapped to exactly one sub-skill.
- [ ] Target skill file exists on disk.
- [ ] Router executes no code or CSS modifications directly.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Failing to route leads to generic AI boilerplate UI.
- **Over-execution threshold:** Routing simple CSS bug fixes to full design engines.
- **Calibration default:** Route structured UI requests, execute trivial bug fixes directly.

## 7. Anti-Pattern Compliance

| Step | Prevents AP                  | Mechanism                                         |
| ---- | ---------------------------- | ------------------------------------------------- |
| 1    | AP-1 (vague task)            | Demands explicit design read before dispatching.  |
| 2    | AP-26 (no scope boundary)    | Limits design execution to designated sub-skills. |
| 3    | AP-4 (over-permissive agent) | Router cannot modify code directly.               |

## 8. Versioning & Changelog

- **Version:** 2.0.0
- **Changelog:**
  - `2.0.0` : Re-architected into 6 lifecycle stages with reverse-engineered domain-driven file naming and zero-loss migration of 60+ brand presets.
  - `1.0.0` : Initial root router creation for `modules/design-engineering/`.

## 9. Portability Matrix

| Runtime     | Status   | Notes                         |
| ----------- | -------- | ----------------------------- |
| Claude Code | verified | Direct sub-skill invocation.  |
| Cursor      | verified | Rules integration.            |
| Copilot     | verified | Custom instructions.          |
| Windsurf    | verified | Directive integration.        |
| Kiro        | verified | Skill runner.                 |
| Cline       | verified | System prompt loading.        |
| Raw API     | verified | Model-agnostic design router. |

## 10. Examples

**Input:** "Build a modern anti-slop landing page for a developer tool."
**Output:** Target `modules/design-engineering/02-aesthetic-engines-and-styles/anti-slop-aesthetic-tuning-engine.md`.
