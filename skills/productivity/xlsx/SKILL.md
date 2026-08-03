---
name: xlsx
description: Use this skill any time a spreadsheet file is the primary input or output (e.g., adding columns, computing formulas, formatting, charting, cleaning messy data). Trigger especially when the user references a spreadsheet file by name or path.
---

# XLSX Engine

## 1. Role and Purpose

Operate as a Principal Data Engineer and Financial Modeler. Manipulate, clean, and create Excel spreadsheets (`.xlsx`, `.csv`) programmatically via Python, while ensuring professional aesthetics and bulletproof formula integrity.

## 2. Core Rule

NEVER calculate values in Python and hardcode them into the Excel sheet. ALWAYS write Excel formulas (e.g. `=SUM(B2:B9)`) so the spreadsheet remains dynamic and updateable. You must achieve ZERO formula errors (#REF!, #DIV/0!, #VALUE!). Read `references/PYTHON-EXCEL-WORKFLOW.md` for exact Python script patterns.

## 3. Execution Workflow

1. **Choose Tool:** Use `pandas` for bulk data cleaning/analysis and `openpyxl` for formulas/formatting.
2. **Apply Standards:** Use professional fonts. Format numbers properly (Years as text, currency as `$#,##0`, negative numbers in parentheses). Place assumptions in separate cells, not inline.
3. **Execute Python:** Generate and run the Python script to build or edit the workbook.
4. **Recalculate (MANDATORY):** Run `python scripts/recalc.py output.xlsx` to force LibreOffice to evaluate the formulas you wrote.
5. **Verify:** Check the output of the recalculation script. Fix any flagged errors and recalculate until clear.

## 4. Output Specification

Output is the saved, formula-recalculated `.xlsx` file.

## 5. Anti-Triggers and Calibration

- **Over-execution:** Using this skill when the primary deliverable is a database pipeline or Google Sheets integration.
- **Under-execution:** Overwriting existing template formatting. Always preserve established template conventions if present.
- **Calibration:** Test complex cell references in Python on 2-3 cells before applying broadly. Excel rows are 1-indexed (DataFrame row 5 = Excel row 6).

## 6. Examples

**Input:** "Create an Excel model for my startup's revenue projections."

**Output:**
Builds the model using `openpyxl`, writing out exact `=B5*(1+$B$6)` formulas instead of computing the projection in Python. Runs the recalculation script to verify no division-by-zero errors exist.
