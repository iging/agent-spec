---
name: spreadsheet-style-formatter
description: The configured personal spreadsheet style for Excel trackers and dashboards. Use this skill EVERY time you create or restyle an .xlsx file.
version: 2.0.0
verified-on: [cline]
---

# Spreadsheet Style Formatter

## 0. Identity

- **Role:** Principal Data Visualization Designer and Financial Modeler. Ensures every generated or edited Excel file follows the configured aesthetic and structural guidelines.
- **Authority:** Owns the spreadsheet styling workflow. Where this skill conflicts with the core `excel-data-engine` skill on matters of style, this skill wins.
- **Must not define:** The raw spreadsheet data or the xlsx generation mechanics (owned by the `excel-data-engine` skill).
- **Normative base:** `shared/writing/writing-rules.md`; `docs/anti-patterns.md`; `skills/_template/SKILL.md`; `docs/skill-standard.md`; `references/spreadsheet-style-guide.md`; the `excel-data-engine` skill.
- **Anti-pattern gate:** No step may trigger AP-1 (vague task), AP-3 (no success criteria), AP-16 (context dump), AP-29 (ambiguous verb), or AP-45 (no human review trigger).

## 1. Intent (9 Dimensions)

| # | Dimension | Value |
|---|-----------|-------|
| 1 | Task | Determine create-vs-restyle, read the style guide, implement the multi-tab structure, apply the monochromatic accent system and number formats, then verify against the pet-peeve checklist. |
| 2 | Target Tool | Any agent runtime reading markdown skills: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API. |
| 3 | Output Format | A styled, multi-tab `.xlsx` file generated via Python script with explicit visual rules (openpyxl styles). |
| 4 | Constraints | Never deliver a visually sparse or corporate-bland spreadsheet. When restyling, the style layers on top of the functional calculations. |
| 5 | Input | A create request ("make me a tracker"), a restyle request, or an existing .xlsx to restyle. |
| 6 | Context | Prevents formula-blind styling and style-blind formula work (AP-16, AP-29). |
| 7 | Audience | The user who will use the workbook. |
| 8 | Success Criteria | Multi-tab workbook with working formulas, unified accent system, frozen panes, hidden gridlines, and a clean pet-peeve checklist. |
| 9 | Examples | See §10. |

## 2. Trigger Matrix

| Trigger | Fire? | Notes |
|---------|-------|-------|
| "Make me an Excel tracker / dashboard" | YES | Core trigger. |
| Restyling an existing .xlsx | YES | Core trigger; layers on functional calculations. |
| Producing any xlsx output (reports, KPI sheets) | YES | Proactive per description. |
| Raw CSV data dump requested | YES | Run in minimal mode — do NOT over-engineer a dashboard. |

## 3. Execution Workflow

### Step 1: Understand Goal

- **Action:** Determine if you are creating a new spreadsheet or restyling an existing one.
- **Input:** User request.
- **Stop Condition:** If the user asked for a raw CSV dump, do not build a full dashboard — apply only minimal, clean styling.
- **Validation:** Create vs restyle determined.

### Step 2: Consult Style Guide

- **Action:** Read `references/spreadsheet-style-guide.md` for the configured rules on tabs, layout, frozen panes, and colors.
- **Input:** Style guide + the `excel-data-engine` skill's openpyxl/recalc workflow.
- **Stop Condition:** None.
- **Validation:** Style rules loaded; style-vs-xlsx precedence known.

### Step 3: Structure Tabs

- **Action:** Implement the multi-tab layout (Dashboard, Data, Settings).
- **Input:** Style guide.
- **Stop Condition:** If any tab is missing, stop and add it.
- **Validation:** Multi-tab structure implemented per the guide.

### Step 4: Apply Colors and Formats

- **Action:** Apply the unified monochromatic accent system. Format numbers (deltas in green/red, percentages).
- **Input:** Multi-tab structure.
- **Stop Condition:** If the workbook uses more than one accent family (plus green/red deltas), stop and collapse it.
- **Validation:** Single accent family; number formats applied; gridlines hidden.

### Step 5: Verify

- **Action:** Check against the pet-peeve checklist in the style guide; run the xlsx recalc script and render a visual check (PDF → image).
- **Input:** Styled workbook.
- **Stop Condition:** If recalc errors (zero #REF!/#DIV/0!/#VALUE!) or visual issues (truncated labels, overlapping axes) remain, stop and fix.
- **Validation:** Pet-peeve checklist clean; recalc clean; visual render checked.

## 4. Output Specification

Output must be a styled, multi-tab `.xlsx` file generated via Python script (e.g. using `openpyxl` styles), with the visual rules applied explicitly.

## 5. Validation Gate

- [ ] Create vs restyle determined; raw-dump requests got minimal styling, not a full dashboard.
- [ ] Style guide read; style precedence over `xlsx` established.
- [ ] Multi-tab structure (Dashboard, Data, Settings) implemented.
- [ ] Single accent family; green/red reserved for deltas; no rainbow.
- [ ] Gridlines hidden; frozen panes; zoom 90 on Dashboard.
- [ ] Pet-peeve checklist verified clean; recalc ran with zero errors; visual render checked.

## 6. Anti-Triggers and Calibration

- **Over-execution:** Generating complex dashboard visual layouts when the user specifically requested a raw CSV data dump.
- **Under-execution:** Leaving gridlines visible, failing to freeze panes, or using default Excel colors.
- **Calibration:** Prioritize working formulas first, clear navigation second, and visual polish third.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| 1 (Goal) | AP-1 (vague task verb) | Create vs restyle is forced; raw-dump calibration prevents over-build. |
| 2 (Consult) | AP-16 (context dump) | Style guide is the single source for look; excel-data-engine skill owns mechanics. |
| 3 (Tabs) | AP-42 (no target state) | Multi-tab structure is the bounded target shape. |
| 4 (Colors) | AP-3 (no success criteria) | Single-accent-fence is a hard, checkable rule. |
| 5 (Verify) | AP-45 (no human review trigger) | Recalc + visual render are the review pass before delivery. |

## 8. Versioning & Changelog

- **Version:** 2.0.0
- **Changelog:**
  - `2.0.0` (2026-08-09) — Elevated to Tier 5 per `docs/skill-standard.md`. De-attributed the "personal" framing; fixed the path in `references/spreadsheet-style-guide.md` to `modules/research-and-productivity/productivity/excel-data-engine/SKILL.md`. Added Identity, 9-Dimension Intent, Trigger Matrix, per-step Action/Input/Stop/Validation, Validation Gate, AP compliance map, Versioning, Portability Matrix.

## 9. Portability Matrix

| Runtime | Status | Notes |
|---------|--------|-------|
| Claude Code | untested | |
| Cursor | untested | |
| Copilot | untested | |
| Windsurf | untested | |
| Kiro | untested | |
| Cline | verified | Executed in current workspace. |
| Raw API (no tooling) | untested | |

## 10. Examples

**Input:** "Make me a pipeline tracker in Excel."

**Output:** Reads the style guide. Generates a script that builds an `.xlsx` file with a dark banner, KPI cards with data bars, and a hidden settings tab to drive dynamic formulas. Runs the recalc script and verifies the pet-peeve checklist before delivering.

**Failure case:** The user asks for a plain CSV dump of their ledger but says "make it look nice." Per the anti-trigger, apply only minimal clean styling — do not build a full dashboard they did not ask for.