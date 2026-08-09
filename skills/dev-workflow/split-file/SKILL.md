---
name: split-file
description: >-
  Refactor a large monolithic file into smaller, single-responsibility files
  to optimize LLM context limits. Execute this skill when a file exceeds 300
  lines or contains multiple distinct domains. Do NOT execute for logic
  rewrites, bug fixes, new features, or introducing new architectural
  paradigms.
version: 2.0.0
verified-on: [cline]
---

# Split File

## 0. Identity

- **Role:** Principal Refactoring Architect. Shatters large files into smaller (<250 lines) single-responsibility modules to keep AI context windows cheap, stable, and performant.
- **Authority:** Owns the structural splitting workflow. Cannot alter behavior, add features, or fix bugs during a split.
- **Must not define:** Business logic (see `context/RULES.md`); file-content semantics beyond structure; barrel-file patterns (banned).
- **Normative base:** target project's `shared/coding-principles.md` for module conventions; `docs/anti-patterns.md`; `skills/_template/SKILL.md`; `docs/skill-standard.md`.
- **Anti-pattern gate:** No step may trigger AP-1 (vague task verb) by altering logic, or AP-2 (two tasks) by mixing refactor with feature work. No barrel exports (violates project no-barrel rule).

## 1. Intent (9 Dimensions)

| # | Dimension | Value |
|---|-----------|-------|
| 1 | Task | Split one monolithic file into single-responsibility modules without changing any behavior, then delete the original and update all consumers. |
| 2 | Target Tool | Any agent runtime reading markdown skills and executing file operations: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline. |
| 3 | Output Format | New file structure + precise import-update list + executed file creations/deletions per §4. |
| 4 | Constraints | Preserve all logic, side-effects, and return values exactly. No new features, no bug fixes, no logic alteration. No barrel exports. Each new file under 250 lines. Delete the original file. |
| 5 | Input | Target monolithic file; consumer files that import from it. |
| 6 | Context | Prevents LLM truncation and context-window exhaustion on large files. |
| 7 | Audience | The requesting developer and any downstream agent that imports the split modules. |
| 8 | Success Criteria | Files split under 250 lines each; zero behavior change; original deleted; all consumer imports updated; zero barrel exports. |
| 9 | Examples | See §10. |

## 2. Trigger Matrix

| Trigger | Fire? | Notes |
|---------|-------|-------|
| File exceeds 300 lines | YES | Core trigger. |
| File contains multiple distinct domains | YES | Core trigger. |
| "Make this file easier for AI to edit" | YES | Core trigger. |
| Rewrite / refactor logic to a new paradigm | NO | Structural split only. |
| Fix a bug inside a large file | NO | Fixing is not splitting; split first, then fix in the new module. |
| Add a new feature | NO | Out of scope. |

## 3. Execution Workflow

### Step 1: Analyze

- **Action:** Read the target monolithic file. Identify distinct structural boundaries: separate classes, distinct utility functions, independent UI components, or unrelated types.
- **Input:** Target file.
- **Stop Condition:** If the file contains a single cohesive domain under 250 lines, stop and do not split.
- **Validation:** Boundary map recorded: each extracted unit has a named responsibility.

### Step 2: Design Split

- **Action:** Plan the new directory/file structure. Ensure each new file handles exactly one clear job and remains under 250 lines.
- **Input:** Boundary map.
- **Stop Condition:** If a proposed file would pair two unrelated responsibilities, re-split.
- **Validation:** Every planned file has exactly one responsibility and is under 250 lines.

### Step 3: Extract

- **Action:** Create the new files and extract the isolated logic into them. Copy logic, side-effects, and return values exactly. No behavioral edits.
- **Input:** Approved split design.
- **Stop Condition:** If extraction would require a logic change to compile, stop and report the conflict rather than altering behavior.
- **Validation:** Extracted modules compile; behavior identical to the original slice.

### Step 4: Wire Dependencies

- **Action:** Update all internal imports across the newly created files to ensure zero circular dependencies.
- **Input:** Extracted modules.
- **Stop Condition:** If a circular dependency appears, stop and re-partition the modules.
- **Validation:** Import graph is acyclic.

### Step 5: Update External Consumers

- **Action:** Do NOT create barrel exports (`export *`). Delete the original file. Explicitly update import paths in all consumer files across the codebase to point to the new split modules.
- **Input:** Extracted modules; consumer files.
- **Stop Condition:** If a consumer cannot be located, stop and ask rather than leave a dangling import.
- **Validation:** Grep confirms zero references to the deleted original file; zero barrel exports introduced.

## 4. Output Specification

- **New file structure:** [tree of created modules]
- **Import updates:** [precise list of path changes in every consumer]
- **Executed:** file creations and the original-file deletion performed.

## 5. Validation Gate

Run before declaring completion:

- [ ] Each new file under 250 lines with one clear responsibility.
- [ ] Zero behavior change: logic, side-effects, and return values preserved.
- [ ] Original file deleted; zero dangling references to it.
- [ ] All consumer imports updated explicitly.
- [ ] Zero barrel exports created.
- [ ] Import graph acyclic; project builds green.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Splitting only the obvious first domain while leaving a 400-line remainder.
- **Over-execution threshold:** Rewriting logic, fixing bugs, adding features, introducing new architectural patterns, or creating barrel exports during the split.
- **Calibration default:** Pure structural transformation. If behavior must change, that is a separate task.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| 1 (Analyze) | AP-1 (vague task verb) | Boundaries must map to named single responsibilities. |
| 3 (Extract) | AP-41 (hallucinated API) | Extraction copies exact logic; no invented APIs. |
| 4 (Wire) | AP-29 (no integration) | Acyclic import graph verified. |
| 5 (Consumers) | AP-29 (no integration) | Zero dangling references; consumers updated. |
| 5 (Consumers) | Project no-barrel rule | `export *` banned outright. |
| All steps | AP-2 (two tasks) | Splitting and behavior change never mixed. |

## 8. Versioning & Changelog

- **Version:** 2.0.0
- **Changelog:**
  - `2.0.0` (2026-08-08) — Elevated to Tier 5 per `docs/skill-standard.md`. Added Identity, 9-Dimension Intent, Trigger Matrix, per-step Action/Input/Stop/Validation, Validation Gate, AP compliance map, Versioning, Portability Matrix.

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

**Input:** "Refactor `utils.ts` (which is 800 lines) to keep the context cheap."

**Output:** Reads `utils.ts`, identifies three distinct domains (math, string manipulation, date parsing), creates `math.ts`, `strings.ts`, and `dates.ts`, moves the logic verbatim, deletes `utils.ts`, and updates all files that previously imported from `utils.ts`. No behavior changed, no barrel exports.

**Failure case:** The extraction fails because the monolith's logic depends on an internal closure the split cannot reproduce without a logic change. Stop and report the conflict; do not alter behavior to force the split.