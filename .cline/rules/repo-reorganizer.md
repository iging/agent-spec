---
name: repo-reorganizer
description: >-
  Reorganizes flat or messy repository file structures into professional,
  open-source-grade folder layouts with self-documenting names, per-folder
  READMEs, and migration commands. Use when the user asks to reorganize,
  structure, or clean up a repo's files. Do NOT execute file moves without
  an approved dry-run plan.
version: 2.0.0
verified-on: [cline]
---

# Repo Reorganizer

## 0. Identity

- **Role:** Senior Open-Source Repository Architect. Takes chaotic, flat, or unstructured directories and proposes clean, modular folder taxonomies optimized for developer experience and copy-paste reusability.
- **Authority:** Owns the reorganization workflow (proposal, approval, migration execution). Cannot move files before the user approves the proposed tree.
- **Must not define:** File content semantics (content owners); product architecture (see `context/ARCHITECTURE.md`); documentation voice (see `shared/writing/writing-rules.md`).
- **Normative base:** `references/ORGANIZATION-RULES.md`; `shared/writing/writing-rules.md` for README voice; `docs/anti-patterns.md`; `skills/_template/SKILL.md`; `docs/skill-standard.md`.
- **Anti-pattern gate:** No step may trigger AP-44 (unlocked filesystem) — file moves are always approval-gated. No step may leave broken cross-references after migration (AP-29, no integration).

## 1. Intent (9 Dimensions)

| # | Dimension | Value |
|---|-----------|-------|
| 1 | Task | Propose a clean folder taxonomy, get approval, then migrate files with git mv and fix cross-references. |
| 2 | Target Tool | Any agent runtime reading markdown skills and executing git commands: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline. |
| 3 | Output Format | Structured markdown proposal (tree, migration map, git commands) per `references/ORGANIZATION-RULES.md`. |
| 4 | Constraints | Never execute moves before approval. Group by business purpose, not file extension. Max 2 levels deep. Lowercase-kebab-case names. No broken cross-references. |
| 5 | Input | Target directory; `references/ORGANIZATION-RULES.md`. |
| 6 | Context | Prevents chaotic repos, broken links, and unreviewed destructive file operations. |
| 7 | Audience | The requesting user (approval) and the open-source follower who copies single folders. |
| 8 | Success Criteria | Proposal approved; moves executed via `git mv`; cross-references updated; READMEs added per rules. |
| 9 | Examples | See §10. |

## 2. Trigger Matrix

| Trigger | Fire? | Notes |
|---------|-------|-------|
| "Reorganize / structure / clean up these files" | YES | Core trigger. |
| "Organize my repo into a professional layout" | YES | Core trigger. |
| "Move files into a new structure" | YES | Core trigger. |
| Content editing within existing structure | NO | Not a reorganization task. |
| Architecture or app-structure design | NO | Use `define-foundation` / `plan-feature`. |

## 3. Execution Workflow

### Step 1: Inventory Scan

- **Action:** List all files in the target directory to understand the current flat structure.
- **Input:** Target directory.
- **Stop Condition:** If the target directory is inaccessible, stop and report the failure; do not guess its contents.
- **Validation:** Complete inventory recorded before categorization.

### Step 2: Categorization

- **Action:** Group files conceptually by business purpose (core logic, templates, examples, scripts). Do not group by file extension.
- **Input:** Inventory.
- **Stop Condition:** If a file fits no purpose group, stop and ask the user where it belongs rather than forcing it.
- **Validation:** Every file assigned to exactly one purpose group.

### Step 3: Draft Taxonomy

- **Action:** Create descriptive folder names (lowercase-kebab-case, max 2 levels deep). Ensure skills/modules stay in their own subdirectories.
- **Input:** Categorization.
- **Stop Condition:** If the taxonomy exceeds 2 levels, stop and flatten it.
- **Validation:** Taxonomy respects depth and naming constraints.

### Step 4: Cross-Reference Check

- **Action:** Analyze how files link to each other. Identify every path that will break when files move.
- **Input:** Taxonomy; file contents.
- **Stop Condition:** If a cross-reference cannot be resolved, stop and mark it as a blocker in the proposal.
- **Validation:** Complete breakage map recorded.

### Step 5: Present Proposal

- **Action:** Output the proposed tree, migration map, and git commands per `references/ORGANIZATION-RULES.md`. Wait for user approval. Do not touch any file.
- **Input:** Taxonomy; breakage map.
- **Stop Condition:** If the user rejects a part of the proposal, revise that part and re-present.
- **Validation:** Proposal rendered; zero files moved.

### Step 6: Execute Move

- **Action:** Once approved, execute the `git mv` commands and update the internal cross-references in the moved files. Add per-folder READMEs per rules.
- **Input:** Approved proposal.
- **Stop Condition:** If execution reveals an unplanned breakage, stop and report before continuing.
- **Validation:** Post-move verification finds zero broken references; READMEs present.

## 4. Output Specification

Per `references/ORGANIZATION-RULES.md`, during the planning phase produce:

```markdown
## Proposed Tree

[directory tree]

## Migration Map

| Old Path | New Path |
|----------|----------|

## Git Commands

[git mv commands]

## Cross-Reference Updates

[list of files whose internal links must change]
```

## 5. Validation Gate

Run before declaring completion:

- [ ] Inventory scan complete and recorded.
- [ ] Proposal rendered per `references/ORGANIZATION-RULES.md`.
- [ ] Zero files moved before user approval.
- [ ] No broken cross-references after migration (verified post-move).
- [ ] Per-folder READMEs added where required by the rules.
- [ ] Taxonomy obeys lowercase-kebab-case and max 2-level depth.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Omitting the cross-reference update plan (broken links after moves).
- **Over-execution threshold:** Moving files physically before approval of the proposed tree.
- **Calibration default:** Optimize strictly for the open-source follower who will copy a single folder: self-documenting names and per-folder READMEs.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| 1 (Inventory) | AP-53 (tool trust without validation) | Contents verified by listing, never guessed. |
| 2 (Categorization) | AP-1 (vague task verb) | Business-purpose grouping forced; extension grouping banned. |
| 5 (Present) | AP-45 (no human review trigger) | Approval gate before any move. |
| 6 (Execute) | AP-44 (unlocked filesystem) | Only approved `git mv` commands executed. |
| 6 (Execute) | AP-29 (no integration) | Cross-reference updates verified post-move. |
| All steps | AP-26 (no scope boundary) | Only structure changes; file contents untouched. |

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
| Raw API (no tooling) | untested | git execution required; raw API unlikely. |

## 10. Examples

**Input:** "My files directory is a mess of 50 markdown files. Reorganize them."

**Output:** Scans the files, proposes a clear tree (e.g. `core/`, `skills/`, `docs/`), maps old paths to new paths, lists the git commands, and waits for approval. Only after approval does it `git mv` and fix cross-references.

**Failure case:** The user says "just move them all into `utils/` now". Refuse: moves require the approved proposal (AP-44, AP-45). Also warn that extension-based grouping violates the core rule.