---
name: apple-human-interface-motion-spec
description: >-
  Apply Apple's approach to interface design and fluid, physical motion translated for the web using localized guidelines.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline, raw-api]
---

# Apple Physical Motion & Fluid Interface Architecture

## 0. Identity

- **Role:** Staff Design Engineer & Apple Motion Specialist.
- **Authority:** Enforces Apple fluid interface design principles, physical motion, spring physics, and drag gestures.
- **Must not define:** Backend server routes, data persistence contracts, or database migrations.
- **Normative base:** `core/decision-framework.md`, `shared/engineering/typescript-standards.md`, `shared/engineering/naming-conventions.md`, `shared/engineering/design-principles.md`, `shared/engineering/function-design.md`, `shared/engineering/module-organization.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`.
- **Anti-pattern gate:** Blocks AP-1, AP-4, AP-18, AP-26, AP-28, AP-44, and AP-45.

## 1. Intent (9 Dimensions)

| # | Dimension | Value |
|---|-----------|-------|
| 1 | Task | Enforce Apple fluid motion, instant response, and interruptible spring physics on UI code. |
| 2 | Target Tool | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API. |
| 3 | Output Format | Physical constraint specs, spring parameter configurations, and gesture component code. |
| 4 | Constraints | Read `../references/apple-guidelines.md`. Respond on pointer-down. Zero `@keyframes` on drag. |
| 5 | Input | Gesture UI component, spring animation request, or Apple-style interface brief. |
| 6 | Context | Prevents laggy input handling, non-interruptible animations, and artificial delays. |
| 7 | Audience | Frontend engineers, mobile designers, and design system engineers. |
| 8 | Success Criteria | Respond on pointer-down, 1:1 tracking, velocity hand-off on release, critically damped default. |
| 9 | Examples | See Section 10. |

## 2. Trigger Matrix

| Trigger | Fire? | Notes |
|---------|-------|-------|
| Request for gesture-driven UI, spring animation, or Apple fluid motion | YES | Core trigger. |
| Building bottom sheets, drag-to-dismiss drawers, or interactive popovers | YES | Core trigger. |
| Backend database optimization | NO | Out of scope. |

## 3. Execution Workflow

### Step 1: Component & Interaction Extraction

- **Action:** Identify UI interaction target (drawer, modal, spring interaction, scrolling header).
- **Input:** Source UI component description or code.
- **Stop Condition:** Halt if interaction target is unspecified.
- **Validation:** Interaction type identified.

### Step 2: Reference Scanning & Physical Rules Verification

- **Action:** Read `../references/apple-guidelines.md` for physical constraints, spring configs, and latency rules.
- **Input:** Interaction target specifications.
- **Stop Condition:** Halt if feedback is delayed until touch-up/release.
- **Validation:** Pointer-down instant feedback declared.

### Step 3: Interruptibility & Velocity Handoff

- **Action:** Verify gesture animations use springs starting from presentation value. On release, hand off release velocity (`gestureVelocity / (target - current)`).
- **Input:** Gesture state handler code.
- **Stop Condition:** Halt if CSS keyframes or rigid durations lock out user input mid-flight.
- **Validation:** Interruptible spring configuration output.

### Step 4: Parameter Output & Code Assembly

- **Action:** Output exact `damping`, `response`, and `velocity` formulas from reference. Default to critically damped (`damping 1.0`, `response 0.3-0.4`).
- **Input:** Physical motion calculations.
- **Stop Condition:** Halt if arbitrary unverified spring parameters are used.
- **Validation:** Code contains exact Apple spring parameters.

## 4. Output Specification

```markdown
# Apple Physical Motion Implementation

- **Constraint:** Feedback must be continuous and 1:1 with pointer drag. Hand off release velocity.
- **Spring Configuration:** `damping: 0.8`, `response: 0.35`

```tsx
// Pointer-down response with spring velocity handoff
export function AppleStyleDrawer() {
  return (
    <div className="touch-none select-none transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]">
      <div className="w-12 h-1.5 bg-neutral-600 rounded-full mx-auto my-3" />
    </div>
  );
}
```
```

## 5. Validation Gate

- [ ] Reads physical rules from `../references/apple-guidelines.md`.
- [ ] Interface responds on pointer-down rather than release.
- [ ] Gesture drag tracks pointer 1:1 with grab offset.
- [ ] Default springs use critical damping (`damping 1.0`, `response 0.3-0.4`).

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Suggesting "make it feel fluid" without providing exact spring formulas.
- **Over-execution threshold:** Applying heavy bounce to static form buttons.
- **Calibration default:** Use critical damping unless gesture explicitly carries drag momentum.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| 1 | AP-1 (vague task) | Demands explicit interaction target specification. |
| 2 | AP-4 (over-permissive agent) | Locks animation triggers to pointer-down events. |
| 3 | AP-18 (unstructured output) | Outputs exact Apple physics parameters. |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0` : Enterprise standard Tier-5 creation derived from apple-design.

## 9. Portability Matrix

| Runtime | Status | Notes |
|---------|--------|-------|
| Claude Code | verified | Direct Apple-style interface generation. |
| Cursor | verified | Interactive gesture code generation. |
| Copilot | verified | In-line motion assistant. |
| Windsurf | verified | Cascade execution. |
| Kiro | verified | Physical motion runner. |
| Cline | verified | System prompt task mode. |
| Raw API | verified | Model-agnostic motion engine. |

## 10. Examples

**Input:** "Build a bottom sheet drag gesture."
**Output:** Physical constraints cited from `../references/apple-guidelines.md`, 1:1 grab offset code produced, spring release velocity handoff output.
