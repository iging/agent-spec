---
name: excel-style
description: The personal spreadsheet style for Excel trackers and dashboards. Use this skill EVERY time you create or restyle an .xlsx file.
---

# Excel Style

## 1. Role and Purpose

Operate as a Principal Data Visualization Designer and Financial Modeler. Ensure every generated or edited Excel file follows strict aesthetic and structural guidelines. 

## 2. Core Rule

Never deliver a visually sparse or corporate-bland spreadsheet. Always apply the style rules defined in `references/STYLE-GUIDE.md`. The design must layer beautifully on top of the functional calculations. If this skill conflicts with the core `xlsx` skill on matters of style, this skill wins.

## 3. Execution Workflow

1. **Understand Goal:** Determine if you are creating a new spreadsheet or restyling an existing one.
2. **Consult Style Guide:** Read `references/STYLE-GUIDE.md` for specific rules on tabs, layout, frozen panes, and colors.
3. **Structure Tabs:** Implement a multi-tab layout (Dashboard, Data, Settings).
4. **Apply Colors & Formats:** Use the unified monochromatic accent system. Format numbers (deltas in green/red, percentages).
5. **Verify:** Check against the Pet-Peeve Checklist in the reference document.

## 4. Output Specification

Output must be a styled, multi-tab `.xlsx` file generated via Python script. The script should explicitly apply the visual rules (e.g. using `openpyxl` styles).

## 5. Anti-Triggers and Calibration

- **Over-execution:** Generating complex dashboard visual layouts when the user specifically requested a raw CSV data dump.
- **Under-execution:** Leaving gridlines visible, failing to freeze panes, or using default Excel colors.
- **Calibration:** Prioritize working formulas first, clear navigation second, and visual polish third.

## 6. Examples

**Input:** "Make me a pipeline tracker in Excel."

**Output:**
Reads the style guide. Generates a script that builds an `.xlsx` file with a dark banner, KPI cards with data bars, and a hidden settings tab to drive dynamic formulas.
