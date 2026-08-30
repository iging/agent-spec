---
name: excel-data-engine
description: Use this skill any time a spreadsheet file is the primary input or output (e.g., adding columns, computing formulas, formatting, charting, cleaning messy data). Trigger especially when the user references a spreadsheet file by name or path.
version: 2.0.0
verified-on: [cline]
---

# Excel Data Engine

## 0. Identity

- **Role:** Principal Data Engineer and Financial Modeler. Manipulates, cleans, and creates Excel spreadsheets (`.xlsx`, `.csv`) programmatically via Python, while ensuring professional aesthetics and bulletproof formula integrity.
- **Authority:** Owns the xlsx creation/editing/analysis workflow only. Does not own spreadsheet visual styling beyond the professional baseline (that is the `spreadsheet-style-formatter` skill's domain).
- **Must not define:** Google Sheets integration, database pipelines, or non-spreadsheet deliverables.
- **Normative base:** `shared/writing/writing-rules.md`; `docs/anti-patterns.md`; `skills/_template/SKILL.md`; `docs/skill-standard.md`; `references/PYTHON-EXCEL-WORKFLOW.md`.
- **Anti-pattern gate:** No step may trigger AP-1 (vague task), AP-3 (no success criteria), AP-16 (context dump), AP-29 (ambiguous verb), or AP-45 (no human review trigger).

## 1. Intent (9 Dimensions)

| # | Dimension | Value |
|---|-----------|-------|
| 1 | Task | Choose tool (pandas for data, openpyxl for formulas/formatting), apply standards, generate and run the Python script, recalculate formulas (MANDATORY), verify errors until clear. |
| 2 | Target Tool | Any agent runtime reading markdown skills: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API. |
| 3 | Output Format | A saved, formula-recalculated `.xlsx` file. |
| 4 | Constraints | NEVER calculate values in Python and hardcode them. ALWAYS write Excel formulas so the spreadsheet stays dynamic. ZERO formula errors (#REF!, #DIV/0!, #VALUE!).
| 5 | Input | A spreadsheet file as primary input or output; a request referencing a spreadsheet by name or path. |
| 6 | Context | Prevents brittle hardcoded workbooks and formula-blind output (AP-16, AP-29). |
| 7 | Audience | The user who will open and update the workbook. |
| 8 | Success Criteria | Workbook saved with live formulas; recalc script ran; zero formula errors; template conventions preserved when updating. |
| 9 | Examples | See §10. |

## 2. Trigger Matrix

| Trigger | Fire? | Notes |
|---------|-------|-------|
| Spreadsheet file is primary input or output | YES | Core trigger. |
| User references a spreadsheet file by name or path | YES | Even casually ("the xlsx in my downloads"). |
| Cleaning messy tabular data into spreadsheets | YES | Deliverable must be a spreadsheet file. |
| Primary deliverable is Word/HTML report, standalone script, database pipeline, or Google Sheets API | NO | Out of scope. |

## 3. Execution Workflow

### Step 1: Choose Tool

- **Action:** Use `pandas` for bulk data cleaning/analysis; `openpyxl` for formulas and formatting.
- **Input:** Task.
- **Stop Condition:** None.
- **Validation:** Tool choice matches the operation type.

### Step 2: Apply Standards

- **Action:** Use professional fonts. Format numbers properly (Years as text, currency as `$#,##0`, negatives in parentheses). Place assumptions in separate cells, not inline.
- **Input:** Task requirements.
- **Stop Condition:** If updating an existing template, stop and study its exact conventions — existing template style ALWAYS overrides these guidelines.
- **Validation:** Professional baseline applied; existing template conventions preserved.

### Step 3: Execute Python

- **Action:** Generate and run the Python script to build or edit the workbook. Write formulas, never hardcoded values.
- **Input:** Standards + task.
- **Stop Condition:** If any calculated value would be hardcoded into a cell instead of written as a formula, stop and rewrite as a formula (e.g. `=SUM(B2:B9)`).
- **Validation:** Formulas in cells; no hardcoded totals/growth/ratios.

### Step 4: Recalculate (MANDATORY)

- **Action:** Run `python scripts/recalc.py output.xlsx` to force LibreOffice to evaluate the formulas you wrote.
- **Input:** Saved workbook.
- **Stop Condition:** If the recalc step is skipped, stop — it is mandatory whenever formulas are used.
- **Validation:** Recalc script executed successfully.

### Step 5: Verify

- **Action:** Check the recalc script's JSON output. Fix any flagged errors (#REF!, #DIV/0!, #VALUE!) and recalculate until clear. Test complex references on 2-3 cells before applying broadly.
- **Input:** Recalc output.
- **Stop Condition:** If any formula error remains, stop and fix before delivering. Zero errors required.
- **Validation:** Zero formula errors; status success.

## 4. Output Specification

Output is the saved, formula-recalculated `.xlsx` file.

## 5. Validation Gate

- [ ] Tool chosen correctly (pandas vs openpyxl).
- [ ] Professional font and number formats applied; assumptions in separate cells.
- [ ] Existing template conventions preserved when updating.
- [ ] All values are Excel formulas, never Python-hardcoded results.
- [ ] Recalc script run (mandatory) and clean.
- [ ] Zero formula errors; complex references spot-tested before broad application.

## 6. Anti-Triggers and Calibration

- **Over-execution:** Using this skill when the primary deliverable is a database pipeline or Google Sheets integration.
- **Under-execution:** Overwriting existing template formatting. Always preserve established template conventions if present.
- **Calibration:** Test complex cell references in Python on 2-3 cells before applying broadly. Excel rows are 1-indexed (DataFrame row 5 = Excel row 6).

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| 2 (Standards) | AP-1 (vague task verb) | Number-format and assumption-placement rules are concrete. |
| 3 (Execute) | AP-29 (ambiguous verb) | "Write formulas, never hardcoded values" is a deterministic rule. |
| 4 (Recalc) | AP-3 (no success criteria) | Mandatory recalc with JSON error output. |
| 5 (Verify) | AP-42 (no target state) | Zero formula errors is the terminal condition. |
| 5 (Verify) | AP-45 (no human review trigger) | Errors surfaced as JSON and fixed before delivery. |

## 8. Versioning & Changelog

- **Version:** 2.0.0
- **Changelog:**
  - `2.0.0` (2026-08-09) — Elevated to Tier 5 per `docs/skill-standard.md`. Added Identity, 9-Dimension Intent, Trigger Matrix, per-step Action/Input/Stop/Validation, Validation Gate, AP compliance map, Versioning, Portability Matrix.

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

**Input:** "Create an Excel model for my startup's revenue projections."

**Output:** Builds the model using `openpyxl`, writing out exact `=B5*(1+$B$6)` formulas instead of computing the projection in Python. Runs the recalculation script to verify no division-by-zero errors exist.