---
name: legacy-taste-v1-fallback-handler
description: >-
  Preserved v1 legacy fallback compatibility layer for original taste-skill frontend design workflows.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline, raw-api]
---

# Legacy Frontend Design Taste Protocol (v1 Fallback)

## 0. Identity

- **Role:** Legacy Frontend Design Taste Specialist (v1 Compatibility Layer).
- **Authority:** Provides backwards-compatible v1 design rules for legacy projects expecting original taste-skill behavior.
- **Must not define:** Direct backend database migrations, handles frontend visual interface code.
- **Normative base:** `core/decision-framework.md`, `shared/engineering/coding-principles.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`.
- **Anti-pattern gate:** Blocks AP-1, AP-4, AP-18, AP-26, AP-28, AP-44, and AP-45.

## 1. Intent (9 Dimensions)

| # | Dimension | Value |
|---|-----------|-------|
| 1 | Task | Output v1-compatible anti-slop frontend code for legacy workflow configurations. |
| 2 | Target Tool | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API. |
| 3 | Output Format | Clean HTML5/Tailwind frontend code blocks matching original v1 guidelines. |
| 4 | Constraints | Prohibit Inter/Roboto fonts, pure black `#000000` backgrounds, and harsh drop shadows. Zero em-dashes. |
| 5 | Input | Legacy landing page request or v1 taste-skill user prompt. |
| 6 | Context | Preserves exact v1 behavior for adopters with legacy configuration hooks. |
| 7 | Audience | Teams maintaining existing v1 taste-skill implementations. |
| 8 | Success Criteria | Clean frontend code output passing original v1 visual standards. |
| 9 | Examples | See Section 10. |

## 2. Trigger Matrix

| Trigger | Fire? | Notes |
|---------|-------|-------|
| Explicit request for v1 taste-skill behavior | YES | Core trigger. |
| Legacy project configured with taste-skill v1 rules | YES | Core trigger. |
| New anti-slop landing page requiring 3-dial tuning | NO | Use `anti-slop-frontend`. |
| Backend database optimization | NO | Out of scope. |

## 3. Execution Workflow

### Step 1: V1 Core Rule Verification

- **Action:** Load original v1 core rules (Geist/Outfit font selection, dark charcoal background `#0a0a0a`, single accent color, loose line heights).
- **Input:** User prompt and legacy parameters.
- **Stop Condition:** Halt if project requires v2 3-dial tuning, redirect to `anti-slop-frontend`.
- **Validation:** V1 rule configuration confirmed.

### Step 2: Component Code Generation

- **Action:** Build React/HTML landing components following v1 spacing and typography rules.
- **Input:** Target layout requirements.
- **Stop Condition:** Halt if generic AI blue/purple gradients are inserted.
- **Validation:** Clean non-slop component code produced.

## 4. Output Specification

```tsx
export function LegacyV1Hero() {
  return (
    <section className="w-full bg-[#0a0a0a] text-white py-24 px-6 max-w-6xl mx-auto flex flex-col justify-center">
      <h1 className="text-5xl font-bold tracking-tight max-w-4xl leading-tight">
        Legacy Precision Architecture
      </h1>
      <p className="mt-4 text-lg text-neutral-400 max-w-xl">
        Backwards-compatible frontend design rules for v1 taste implementations.
      </p>
    </section>
  );
}
```

## 5. Validation Gate

- [ ] V1 rules (off-black background, wide hero width, character typography) satisfied.
- [ ] No generic Inter font applied.
- [ ] Code output is fully written with zero missing sections.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Falling back to default Bootstrap templates.
- **Over-execution threshold:** Applying v2 3-dial engine when strict v1 output is requested.
- **Calibration default:** Use only when explicitly requested for legacy compatibility.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| 1 | AP-1 (vague task) | Validates v1 compatibility requirement explicitly. |
| 2 | AP-18 (unstructured output) | Enforces v1 design token constraints. |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0` : Enterprise standard Tier-5 creation derived from taste-skill-v1.

## 9. Portability Matrix

| Runtime | Status | Notes |
|---------|--------|-------|
| Claude Code | verified | Direct v1 frontend generation. |
| Cursor | verified | In-line code mode. |
| Copilot | verified | Component generation. |
| Windsurf | verified | Cascade execution. |
| Kiro | verified | Visual runner. |
| Cline | verified | System prompt task mode. |
| Raw API | verified | Model-agnostic design generator. |

## 10. Examples

**Input:** "Generate a landing hero using taste-skill v1 rules."
**Output:** V1 off-black hero code output using Geist typography.
