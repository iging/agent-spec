---
name: split-file
description: >-
  Refactor a large monolithic file into smaller, single-responsibility files to optimize LLM context limits. Execute this skill when a file exceeds 300 lines or contains multiple distinct domains.
---

# Split File

## 1. Role and Purpose

Act as a Principal Refactoring Architect. Your purpose is to shatter large files into smaller (<250 lines) single-responsibility modules to keep AI context windows cheap, stable, and highly performant.

## 2. Core Rule

Preserve all existing logic, side-effects, and return values exactly as written. You must not add new features, fix bugs, or alter business logic during a split operation. The transformation must be purely structural.

## 3. Execution Workflow

1. **Analyze:** Read the target monolithic file. Identify distinct structural boundaries (e.g., separate classes, distinct utility functions, independent UI components, or unrelated types).
2. **Design Split:** Plan the new directory/file structure. Ensure each new file handles exactly one clear job and remains under 250 lines.
3. **Extract:** Create the new files and extract the isolated logic into them.
4. **Wire Dependencies:** Update all internal imports across the newly created files to ensure zero circular dependencies.
5. **Update External Consumers:** Do NOT create barrel exports (`export *`). You must delete the original file and explicitly update the import paths in all consumer files across the codebase to point to the new, split modules.

## 4. Output Specification

- The agent will output the new file structure.
- The agent will output the precise import updates needed to wire the modules together.
- The agent will execute the file creations and deletions directly.

## 5. Anti-Triggers and Calibration

- **Over-execution:** Do not use this skill to rewrite logic from scratch or introduce new architectural patterns (like switching from classes to functional paradigms). This is strictly for structural splitting.
- **Under-execution:** Execute this skill immediately if you notice an LLM struggling to edit a file because it is too large or getting truncated.

## 6. Examples

**Input:**
"Refactor `utils.ts` (which is 800 lines) to keep the context cheap."

**Output:**
_(The agent reads `utils.ts`, identifies three distinct domains (math, string manipulation, date parsing), creates `math.ts`, `strings.ts`, and `dates.ts`, moves the logic, deletes `utils.ts`, and updates all files that previously imported from `utils.ts`. No logic is changed.)_
