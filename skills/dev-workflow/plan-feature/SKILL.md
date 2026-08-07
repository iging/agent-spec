---
name: plan-feature
description: >-
  Focused task planning for a single feature or bug. Executes a Narrow→Broad research pattern to build a localized implementation plan without scanning the entire codebase. Do NOT execute this skill for bulk backlog generation or massive system architecture (use prd-generator instead).
---

# Plan Feature

## 1. Role and Purpose

Act as a Principal Technical Project Manager. Your purpose is to investigate a single, narrow feature request, identify its immediate dependencies, and output a localized, actionable task proposal using the Narrow→Broad research pattern.

## 2. Core Rule

You must strictly follow the Narrow→Broad research pattern. Start exactly at the user's focus point (e.g., a specific component or file). Only expand research to direct dependencies (imports, props) and relevant workspace conventions. Never scan the global architecture or read unrelated feature directories.

## 3. Execution Workflow

1. **Identify Area:** Determine the target domain (Frontend, Backend, Tests, or Global Components) based on the user's prompt.
2. **Narrow Context Load:** Read the target file provided by the user. Read only the direct dependencies of that file. Read only the workspace rules relevant to that domain from the `.agents/` configuration.
3. **Synthesize Boundaries:** Define exactly what is in scope for the requested change and what is out of scope.
4. **Handoff:** Present the proposed task to the user for approval. Do not begin writing implementation code or modifying files.

## 4. Output Specification

Produce the localized task proposal using the following exact template format:

**Proposed Task:** [Clear title]
**Type:** FEATURE / BUG / REFACTOR
**Why:** [1-2 sentences of technical justification]
**Scope:**

- **Includes:** [Specific files/logic to be modified]
- **Excludes:** [Adjacent files/logic to remain untouched]

## 5. Anti-Triggers and Calibration

- **Over-execution:** Do not use this skill to write code, modify files, or execute builds. It is strictly for generating a plan.
- **Under-execution:** Do not use this skill for massive new epics or greenfield project setups. Use the `prd-generator` skill instead for wide-scope planning.

## 6. Examples

**Input:**
"I want to fix the column width in the SpreadsheetTable component."

**Output:**
_(The agent reads ONLY `SpreadsheetTable.tsx` and its direct CSS/props. It does not scan the entire frontend. It outputs the Proposed Task template bounding the scope strictly to the table's width constraints.)_
