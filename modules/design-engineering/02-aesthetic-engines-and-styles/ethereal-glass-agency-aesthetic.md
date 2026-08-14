---
name: ethereal-glass-agency-aesthetic
description: >-
  Agency-tier visual design system ($150k+ look), Ethereal Glass, Soft Structuralism, and micro-interactions.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline, raw-api]
---

# High-End Visual Design & Agency Aesthetics Architecture

## 0. Identity

- **Role:** Principal UI/UX Architect & Agency Design Lead ($150k+ tier).
- **Authority:** Controls high-end visual aesthetics, ethereal glassmorphism, soft structuralism, and spring motion.
- **Must not define:** Cheap generic Bootstrap layouts, Inter/Arial default typography, or harsh black shadows.
- **Normative base:** `core/decision-framework.md`, `shared/engineering/coding-principles.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`.
- **Anti-pattern gate:** Blocks AP-1, AP-4, AP-18, AP-26, AP-28, AP-44, and AP-45.

## 1. Intent (9 Dimensions)

| # | Dimension | Value |
|---|-----------|-------|
| 1 | Task | Engineer agency-tier digital experiences with haptic visual depth and fluid motion. |
| 2 | Target Tool | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API. |
| 3 | Output Format | Production React/Tailwind code with ultra-soft lighting, hair-line borders, and spring physics. |
| 4 | Constraints | Prohibit Inter/Roboto/Arial fonts, standard Lucide icons, 1px solid gray borders, and harsh shadows. |
| 5 | Input | SaaS marketing prompt, luxury product page, or high-end portfolio brief. |
| 6 | Context | Prevents cheap generic AI layouts by enforcing Apple-level visual craftsmanship. |
| 7 | Audience | Design Directors, product leaders, and enterprise buyers. |
| 8 | Success Criteria | Diffuse backdrop blurs, organic spring physics, micro-interactions, responsive grid collapse. |
| 9 | Examples | See Section 10. |

## 2. Trigger Matrix

| Trigger | Fire? | Notes |
|---------|-------|-------|
| Request for $150k agency design, Apple-tier UI, or luxury SaaS | YES | Core trigger. |
| Ethereal Glass, Editorial Luxury, or Soft Structuralism request | YES | Core trigger. |
| Brutalist tactical telemetry interface | NO | Use `industrial-brutalist-ui`. |
| Notion-style plain document viewer | NO | Use `minimalist-ui`. |

## 3. Execution Workflow

### Step 1: Vibe & Texture Selection

- **Action:** Select ONE texture profile: Ethereal Glass (OLED black `#050505`, mesh gradients, hairlines), Editorial Luxury (Warm cream `#FDFBF7`, variable serif, noise grain), or Soft Structuralism (Silver-grey background, diffused ambient shadows).
- **Input:** Product domain and brand voice.
- **Stop Condition:** Halt if project attempts to mix OLED black glass with warm cream paper textures.
- **Validation:** Texture profile selected and declared.

### Step 2: Layout Archetype Construction

- **Action:** Build layout using Asymmetrical Bento, Z-Axis Cascade, or Editorial Split with strict mobile fallback (`min-h-[100dvh]`).
- **Input:** Component content tree.
- **Stop Condition:** Halt if symmetrical 3-column Bootstrap grid is output.
- **Validation:** Mobile fallback resets columns to single-column stack below `768px`.

### Step 3: Haptic Micro-Interactions & Spring Motion

- **Action:** Inject spring physics transitions (`transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]`) and custom hairline borders (`border border-white/10`).
- **Input:** Component interaction targets.
- **Stop Condition:** Halt if standard linear or `ease-in-out` transitions are used.
- **Validation:** Micro-interactions use cubic-bezier spring curves.

## 4. Output Specification

```tsx
export function HighEndAgencyCard() {
  return (
    <div className="relative bg-[#050505] border border-white/10 rounded-2xl p-8 backdrop-blur-2xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]">
      <h3 className="font-sans text-3xl font-semibold text-white tracking-tight leading-tight">
        Ethereal Precision
      </h3>
      <p className="mt-4 text-sm text-neutral-400 leading-relaxed font-light">
        High-craft interface architecture engineered for luxury digital platforms.
      </p>
    </div>
  );
}
```

## 5. Validation Gate

- [ ] One texture profile (Ethereal Glass, Editorial Luxury, Soft Structuralism) selected.
- [ ] Banned fonts (Inter, Roboto, Arial) completely absent.
- [ ] Mobile viewports enforce `min-h-[100dvh]` without height jumping.
- [ ] Transitions use spring cubic-bezier curves instead of linear defaults.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Using default Tailwind `shadow-md` and solid grey borders.
- **Over-execution threshold:** Adding excessive heavy backdrop blurs that degrade GPU rendering performance.
- **Calibration default:** Mandatory for flagship marketing pages and premium product landing sites.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| 1 | AP-1 (vague task) | Demands explicit selection of agency texture profile. |
| 2 | AP-18 (unstructured output) | Enforces responsive layout archetypes. |
| 3 | AP-4 (over-permissive agent) | Replaces linear transitions with spring cubic-bezier timing. |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0` : Enterprise standard Tier-5 creation derived from soft-skill.

## 9. Portability Matrix

| Runtime | Status | Notes |
|---------|--------|-------|
| Claude Code | verified | Direct high-end interface generation. |
| Cursor | verified | Interactive component generation. |
| Copilot | verified | High-precision component generation. |
| Windsurf | verified | Cascade execution. |
| Kiro | verified | Visual runner. |
| Cline | verified | System prompt design mode. |
| Raw API | verified | Model-agnostic design generator. |

## 10. Examples

**Input:** "Build an Apple-level product hero card."
**Output:** Ethereal Glass profile locked, hair-line border generated, spring curve transition applied.
