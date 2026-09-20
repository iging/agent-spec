---
name: productivity
description: >-
  Productivity group router for research and productivity, routing spreadsheet formatting, programmatic Excel manipulation, and ADHD communication requests to specialist sub-skills.
version: 2.0.0
verified-on: [cline]
---

# Productivity Group Router

## 0. Identity

- **Role:** Productivity Sub-Group Router and Dispatcher.
- **Authority:** Normative group router for `skills/research-and-productivity/productivity/`.
- **Must not define:** Direct spreadsheet styling, data engine execution, or response formatting; delegates to sub-skills.
- **Normative base:** `core/decision-framework.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`, `docs/skill-standard.md`.

## 1. Intent (9 Dimensions)

| # | Dimension | Value |
|---|-----------|-------|
| 1 | Task | Classify productivity requests and dispatch to `spreadsheet-style-formatter`, `adhd-communication-adapter`, or `excel-data-engine`. |
| 2 | Target Tool | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API. |
| 3 | Output Format | Structured routing decision and handoff to target productivity sub-skill. |
| 4 | Constraints | Router executes no productivity operations directly. |
| 5 | Input | User request for spreadsheet styling, ADHD response structuring, or Excel data processing. |
| 6 | Context | Prevents style/engine confusion and unguided communication adaptation. |
| 7 | Audience | Spreadsheet users, ADHD readers, and data engineers. |
| 8 | Success Criteria | Exactly one target productivity sub-skill resolved deterministically. |
| 9 | Examples | See Section 10. |

## 2. Trigger Matrix

| Category | Trigger | Target Skill File Path |
|---|---|---|
| Spreadsheet Style | Apply visual themes, color systems, and dashboard formatting to `.xlsx` files | `productivity/spreadsheet-style-formatter/SKILL.md` |
| ADHD Adapter | Adapt communication structure and task/talk modes for an ADHD reader | `productivity/adhd-communication-adapter/SKILL.md` |
| Excel Data Engine | Manipulate data, create formulas, clean datasets, and recalc `.xlsx` programmatically | `productivity/excel-data-engine/SKILL.md` |

## 3. Execution Workflow

### Step 1: Analyze Request

- **Action:** Classify request into spreadsheet styling, communication adaptation, or Excel data engineering.
- **Input:** User prompt text.
- **Stop Condition:** Ask user if intent is ambiguous.
- **Validation:** Matches Trigger Matrix.

### Step 2: Resolve Target

- **Action:** Select target sub-skill path under `skills/research-and-productivity/productivity/`.
- **Input:** Trigger Matrix.
- **Stop Condition:** Decline execution if out of scope.
- **Validation:** Target SKILL.md exists.

### Step 3: Handoff

- **Action:** Delegate control to target SKILL.md.
- **Input:** Resolved target.
- **Stop Condition:** Handoff control.
- **Validation:** Sub-skill executes.

## 4. Output Specification

```json
{
  "group": "productivity",
  "target_skill": "skills/research-and-productivity/productivity/excel-data-engine/SKILL.md"
}
```

## 5. Validation Gate

- [ ] Productivity intent mapped to target sub-skill path.
- [ ] Target SKILL.md exists on disk.
- [ ] Router executes no productivity tasks directly.

## 6. Anti-Triggers

- **Under-execution:** Delivering a spreadsheet with formula calculation errors.
- **Over-execution:** Building a full Excel dashboard when user requested a raw CSV dump.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|---|---|---|
| 1 | AP-1 (vague task) | Demands classification before handoff. |
| 3 | AP-4 (over-permissive) | Group router delegates execution to sub-skills. |

## 8. Versioning & Changelog

- **Version:** 2.0.0
- **Changelog:**
  - `2.0.0` — Productivity group router created for `skills/research-and-productivity/productivity/`.

## 9. Portability Matrix

| Runtime | Status | Notes |
|---|---|---|
| Claude Code | verified | Productivity sub-skill dispatcher. |
| Cursor | verified | Productivity rules routing. |
| Copilot | verified | Custom instructions. |
| Windsurf | verified | Productivity directive routing. |
| Kiro | verified | Skill runner handoff. |
| Cline | verified | System prompt loading. |
| Raw API | verified | Model-agnostic productivity router. |

## 10. Examples

**Input:** "Make my Excel revenue dashboard look professional with custom colors."
**Output:** Target `skills/research-and-productivity/productivity/spreadsheet-style-formatter/SKILL.md`.
