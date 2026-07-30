---
name: excel-style
description: [ YOUR NAME ]'s personal spreadsheet style for Excel trackers and dashboards. Use this skill EVERY time you create or restyle an .xlsx file for [ YOUR NAME ] — trackers, dashboards, reports, KPI sheets, monitors, or any spreadsheet deliverable — even if they don't mention style. Trigger on any phrase like "make me a spreadsheet", "build a tracker", "dashboard for X", "excel file", or when producing any xlsx output. Apply it on top of the standard xlsx skill workflow.
---

# [ YOUR NAME ]'s Excel Style

Defines HOW spreadsheets for [ YOUR NAME ] must look and behave. Layers on top of the public `xlsx` skill (`/mnt/skills/public/xlsx/SKILL.md`) — read that too for the openpyxl/recalc workflow. Where they conflict on style, THIS skill wins. Aim for **[ YOUR DESIRED FEEL — e.g. refined and substantial: classy, not corporate-bland, never sparse ]**.

## Priorities (in order)

1. **Working formulas, never hardcoded results.** Every KPI, total, delta, and table value is an Excel formula (SUMIFS/COUNTIFS) pulling from the Data tab. The workbook recalculates when data or filters change.
2. **Clear structure & navigation.** Multi-tab, predictable layout, frozen panes.
3. **Bold, refined visual design.** Monochromatic accent system, layered details (banner, cards, banded rows, data bars).
4. **Charts** that add insight — at least two on a dashboard, never filler.

> Reorder these priorities if your context demands it — e.g. [ OPTIONAL: a finance team might rank formula integrity and auditability above visual polish; a sales team might rank charts higher ].

## Workbook structure (always multi-tab)

- **Dashboard** — first tab, active on open. All summary views.
- **Data** — flat table, header row 1, one record per row. Include helper columns (Year, Month as text) that make SUMIFS clean.
- **Settings** — dropdown source lists, named parameters, chart helper tables (formula-driven, accent-headed), prior-period helper cells, accent hex reference. Hidden gridlines.
- NO instructions/legend tabs or explanatory text blocks. If a cell needs explanation, use a cell comment.
- [ OPTIONAL: any extra tabs your work always needs — e.g. a "Raw Import" tab, a "Forecast" tab, an "Archive" tab. ]

## Color system: one accent family per project

Pick ONE family matching the topic; use three shades plus support tones:

| Token            | Role                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------ |
| **Dark**         | banner fill, table header rows, primary chart series, big KPI numbers, section header text |
| **Mid**          | KPI card top-strips, data bars, secondary chart series, section underlines                 |
| **Light**        | filter cells, banner subtitle text                                                         |
| Card bg `F7F9FC` | KPI card body fill (adjust tint toward accent)                                             |
| Band `EFF3F9`    | alternating table rows (light accent tint)                                                 |
| Edge `C9D3E0`    | card perimeter borders                                                                     |
| Text `333333`    | body text; label grey `7A8699` for card labels                                             |

**Reference palettes** (replace with your own brand families if you have them — [ OPTIONAL: add your brand hex codes here, e.g. "House Blue 0B3D91/3D6FD1/D6E2F7" ]):
Teal `1D6F5E/4DA28E/CFE8E1` · Navy `1F3A5F/4A6FA5/D9E2EF` · Burgundy `6B1F2E/A04958/F0DCE0` · Forest `2D5A27/5E8C58/DDEAD9` · Plum `4A2E5C/7B5E8E/E5DCEC` · Amber `9A6A00/C99A2E/F4E8CC`.

**Default family when the topic gives no obvious cue:** [ YOUR DEFAULT — e.g. Navy ].

Green `1F8A3B` / red `C0392B` (and Excel's Color10/Red in number formats) are reserved for positive/negative deltas regardless of accent. White background, **gridlines hidden on every sheet**, `zoomScale = 90` on the Dashboard.

## Dashboard layout (top to bottom)

1. **Banner** — rows 1-3 filled dark accent across the full grid width. Title in white bold 20pt, one-line subtitle beneath in light accent 10pt (e.g. "[ YOUR TYPICAL SUBTITLE — e.g. Revenue · Deals · Pipeline ]"). Narrow spacer column A (width 2).
2. **Filter row** — tiny bold-caps labels (8pt) above data-validation dropdowns styled as light-accent cells with thin dark borders, centered bold text. Sources on Settings. Where it makes sense, include an **"All" option**: prepend "All" to the list and build criteria as `IF($D$6="All","*",$D$6)` inside SUMIFS (works for text columns).
3. **KPI cards** ([ HOW MANY YOU USUALLY WANT — e.g. 4-6 ]) — light cards, NOT solid dark blocks. Anatomy per card (2 merged columns wide, spacer column between cards):
   - top strip: 4.5pt-high row filled mid accent
   - label row: bold 8pt grey-blue caps, centered
   - value row (height 30): bold 21pt dark accent, centered — always a formula
   - delta sub-line: bold 9pt, the vs-prior-period delta with the arrow number format below, or a context stat (e.g. `#,##0 "open"`)
   - thin `C9D3E0` perimeter border, `F7F9FC` body fill
   - [ OPTIONAL: KPIs you almost always want on top — e.g. "always include a total-revenue card and a win-rate card first" ]
4. **Section headers** — bold 11pt dark-accent caps text (e.g. "[ YOUR SECTION NAMES — e.g. PERFORMANCE BREAKDOWN, TRENDS ]") with a medium mid-accent bottom border spanning the content width. One before tables, one before charts.
5. **Comparison tables** side by side (see conventions).
6. **Charts** — two side by side: a combo column+line for the time trend (primary metric bars in dark, count/rate line in mid on a secondary axis with `crosses="max"`), and a horizontal bar for a categorical breakdown in mid accent. Chart source ranges are formula helper tables on Settings that respect the dashboard filters.

Freeze panes so banner + filters + KPI cards stay visible (e.g. `freeze_panes = "A13"`).

## Table conventions

- Header row: dark accent fill, white bold 10pt; first column left-aligned, numbers right-aligned.
- Columns: `<Dimension>` | `[ CURRENT PERIOD LABEL — e.g. Sel Yr ]` | `[ PRIOR PERIOD LABEL — e.g. Prior Yr ]` | `[ DELTA LABEL — e.g. vs PY ]` (adapt period labels to context).
- **Delta number format** (no CF rules needed):
  `[Color10]0.0%"▲";[Red](0.0%)"▼"`
- **Banded rows**: alternate `EFF3F9` fill on data rows.
- **Data bars**: `DataBarRule(start_type="num", start_value=0, end_type="max", color=MID)` on the current-period column.
- **Totals row**: bold, thin dark top border + double dark bottom border, SUM formulas.
- First (label) column wider (~14.5) so nothing truncates; verify no `####` overflow anywhere.
- Numbers: `#,##0;(#,##0)`; percentages `0.0%`; negatives in parentheses, never minus signs; years as text.
- [ OPTIONAL: your unit/format conventions — e.g. currency symbol, thousands vs millions scaling, decimal places, date format ]

## Data tab styling

- Dark accent header row, frozen; banded rows; amount columns in money format.
- Status-like columns get colored bold text per value (e.g. [ YOUR STATUS VALUES + COLORS — e.g. green `1F8A3B` for Won/Done, amber `9A6A00` for Pipeline/Open ]).

## Formula rules

- Dashboard values aggregate from Data via SUMIFS/COUNTIFS keyed on the filter cells; prior period derived in a Settings helper cell (e.g. `=TEXT(VALUE(Dashboard!$B$6)-1,"0")`).
- Wrap any ratio in IFERROR(...,0) — prior periods can be zero.
- Parameters ([ YOUR RECURRING PARAMETERS — e.g. targets, commission rates, tax rate ]) in named Settings cells, referenced, never inlined.
- After saving, ALWAYS run the xlsx skill's recalc script and fix every error. Zero #REF!/#DIV/0!/#VALUE!.
- Then render a visual check: convert to PDF with `soffice --headless --convert-to pdf` and `pdftoppm`, view the image, and fix truncated labels, overlapping axes, or layout collisions before delivering.

## Pet-peeve checklist (verify before delivering)

- [ ] No hardcoded calculated values — spot-check KPI cards and totals with data_only load
- [ ] Gridlines hidden on all sheets; zoom 90 on Dashboard
- [ ] Single accent family + green/red deltas only — no rainbow
- [ ] No instructions/legend/notes sheets
- [ ] Dashboard is first and active tab; filters actually change the numbers
- [ ] Recalc ran clean; visual render checked
- [ ] No truncated labels or #### overflow
- [ ] [ ADD YOUR OWN PET PEEVES — e.g. "company logo in banner top-right", "fiscal year starts in April, not January", "no comma-separated cents" ]
