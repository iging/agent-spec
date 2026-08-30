---
name: industrial-brutalist-telemetry-hud
description: >-
  Industrial brutalism, Swiss typographic print, tactical telemetry, CRT scanlines, and mechanical UI.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline, raw-api]
---

# Industrial Brutalism & Tactical Telemetry Architecture

## 0. Identity

- **Role:** Industrial Brutalism & Tactical Telemetry Engineering Lead.
- **Authority:** Directs Swiss print typography, military terminal HUDs, and mechanical UI systems.
- **Must not define:** Soft pastel consumer themes, gentle glassmorphism, or rounded pill buttons.
- **Normative base:** `core/decision-framework.md`, `shared/engineering/typescript-standards.md`, `shared/engineering/naming-conventions.md`, `shared/engineering/design-principles.md`, `shared/engineering/function-design.md`, `shared/engineering/module-organization.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`.
- **Anti-pattern gate:** Blocks AP-1, AP-4, AP-18, AP-26, AP-28, AP-44, and AP-45.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                       |
| --- | ---------------- | ------------------------------------------------------------------------------------------- |
| 1   | Task             | Construct raw mechanical UI fusing Swiss typographic print and tactical terminal HUDs.      |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API.         |
| 3   | Output Format    | Rigid HTML/Tailwind templates with high contrast grids and telemetry labels.                |
| 4   | Constraints      | Commit to ONE archetype per project. Rigid visible grid lines. Zero rounded corners.        |
| 5   | Input            | Telemetry dashboard request, developer tool landing, or brutalist portfolio prompt.         |
| 6   | Context          | Prevents rounded consumer UI defaults by enforcing industrial mechanical precision.         |
| 7   | Audience         | Systems developers, security teams, and brutalist web enthusiasts.                          |
| 8   | Success Criteria | Rigid grid lines, extreme macro/micro type contrast, zero rounded corners (`rounded-none`). |
| 9   | Examples         | See Section 10.                                                                             |

## 2. Trigger Matrix

| Trigger                                                      | Fire? | Notes                         |
| ------------------------------------------------------------ | ----- | ----------------------------- |
| Request for brutalist, Swiss print, or tactical telemetry UI | YES   | Core trigger.                 |
| Data-dense terminal dashboard or security command center     | YES   | Core trigger.                 |
| Soft consumer health app                                     | NO    | Use `high-end-visual-design`. |
| Notion-style minimal document editor                         | NO    | Use `minimalist-ui`.          |

## 3. Execution Workflow

### Step 1: Archetype Commitment

- **Action:** Select Archetype 1 (Swiss Print: light mode, newsprint substrate, red accent) OR Archetype 2 (Tactical Telemetry: OLED black, phosphor glow, monospace).
- **Input:** User prompt and domain context.
- **Stop Condition:** Halt if project attempts to mix light Swiss print with dark CRT scanlines simultaneously.
- **Validation:** Single visual archetype selected and recorded.

### Step 2: Typographic Architecture Setup

- **Action:** Set Macro-Typography (Neue Haas Grotesk, Monument Extended) with tight leading (`0.85`), tracking (`-0.04em`), uppercase. Set Micro-Typography (JetBrains Mono) fixed at `11px`.
- **Input:** Selected archetype.
- **Stop Condition:** Halt if default Inter sans-serif is used for display headers.
- **Validation:** Macro and micro typography CSS rules explicitly bound.

### Step 3: Rigid Grid & Telemetry Component Assembly

- **Action:** Construct grid with 1px visible borders (`border border-neutral-800`), crosshairs (`+`), and uppercase telemetry metadata.
- **Input:** Visual component specifications.
- **Stop Condition:** Halt if rounded corners (`rounded-lg`, `rounded-full`) are applied.
- **Validation:** Grid exhibits strict 0px border radius across containers.

## 4. Output Specification

```tsx
export function TacticalTelemetryCard() {
  return (
    <div className="bg-black text-white border border-neutral-800 rounded-none p-4 font-mono">
      <div className="flex justify-between items-center border-b border-neutral-800 pb-2 mb-4 text-[10px] tracking-widest text-neutral-500 uppercase">
        <span>SYS.LOC // 0x4F91</span>
        <span>STATUS: ACTIVE</span>
      </div>
      <h2 className="font-sans font-black text-4xl uppercase tracking-tighter leading-none mb-2">
        TELEMETRY FEED
      </h2>
      <p className="text-xs text-neutral-400 leading-relaxed font-mono">
        [DATA STREAM ENCRYPTED] 1024-BIT BITMAP RENDERING INITIALIZED.
      </p>
    </div>
  );
}
```

## 5. Validation Gate

- [ ] Single archetype (Swiss Print or Tactical Telemetry) committed.
- [ ] Rounded container corners completely banned (`rounded-none` enforced).
- [ ] Extreme typographic scale contrast applied.
- [ ] Rigid visible structural grid lines present.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Adding a single monospace label to a standard rounded card.
- **Over-execution threshold:** Making text unreadable through excessive screen noise.
- **Calibration default:** Mandatory for brutalist and tactical terminal interfaces.

## 7. Anti-Pattern Compliance

| Step | Prevents AP                  | Mechanism                                                  |
| ---- | ---------------------------- | ---------------------------------------------------------- |
| 1    | AP-1 (vague task)            | Demands explicit choice between Swiss Print and Telemetry. |
| 2    | AP-18 (unstructured output)  | Enforces dual macro/micro typography rules.                |
| 3    | AP-4 (over-permissive agent) | Hard-blocks rounded corners and consumer UI elements.      |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0` : Enterprise standard Tier-5 creation derived from brutalist-skill.

## 9. Portability Matrix

| Runtime     | Status   | Notes                                  |
| ----------- | -------- | -------------------------------------- |
| Claude Code | verified | Direct brutalist interface generation. |
| Cursor      | verified | Interactive code editor mode.          |
| Copilot     | verified | Component generation.                  |
| Windsurf    | verified | Cascade execution.                     |
| Kiro        | verified | Brutalist runner.                      |
| Cline       | verified | System prompt execution mode.          |
| Raw API     | verified | Model-agnostic design generator.       |

## 10. Examples

**Input:** "Create an industrial brutalist telemetry module."
**Output:** Tactical archetype locked, monospaced metadata output, 0px border radius enforced.
