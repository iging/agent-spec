---
name: project-onboarding-audit
description: >-
  Audits project codebase architecture, dependencies, configuration, and data flows to generate a structured PROJECT_ONBOARDING_MAP.md document for developer onboarding. Do NOT execute for single-file edits or simple bug fixes.
version: 1.0.0
verified-on: [cline]
---

# Project Onboarding Audit

## 0. Identity

- **Role:** Principal Software Architect and Technical Onboarding Lead. Audits codebases to create clear, complete onboarding documentation for developers and autonomous agents.
- **Authority:** Owns the codebase discovery, architecture analysis, and onboarding map generation workflow.
- **Must not define:** Direct application source code changes or business logic implementation.
- **Normative base:** `shared/writing/writing-rules.md`; `docs/anti-patterns.md`; `docs/skill-standard.md`.
- **Anti-pattern gate:** No step may trigger AP-1 (vague task), AP-3 (no success criteria), AP-16 (context dump), AP-26 (no scope boundary), AP-44 (unlocked filesystem), or AP-45 (no human review trigger).

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                                                                            |
| --- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Task             | Inspect a codebase, extract structural and architectural facts, and generate a `PROJECT_ONBOARDING_MAP.md` document.                             |
| 2   | Target Tool      | Any agent runtime reading markdown skills: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API.                                         |
| 3   | Output Format    | A structured `PROJECT_ONBOARDING_MAP.md` file created at the repository root, plus a chat summary.                                               |
| 4   | Constraints      | Never invent missing facts. Verify entry points, commands, and dependency graphs from configuration files. Write in Spartan voice without fluff. |
| 5   | Input            | Target project repository files, package manifests, configuration files, and source tree.                                                        |
| 6   | Context          | Eliminates onboarding friction for new developers and AI coding agents joining brownfield or complex repositories.                               |
| 7   | Audience         | Developers, technical leads, and downstream AI agents.                                                                                           |
| 8   | Success Criteria | `PROJECT_ONBOARDING_MAP.md` generated with verified entry points, build/test scripts, data flow overview, and key directory responsibilities.    |
| 9   | Examples         | See Section 10.                                                                                                                                  |

## 2. Trigger Matrix

| Trigger                                                     | Fire? | Notes                                                     |
| ----------------------------------------------------------- | ----- | --------------------------------------------------------- |
| "Audit this repository for onboarding"                      | YES   | Core trigger.                                             |
| "Generate an onboarding map / guide for this project"       | YES   | Core trigger.                                             |
| "Map out this codebase architecture and developer workflow" | YES   | Core trigger.                                             |
| Single file edit or simple bug fix                          | NO    | Out of scope. Use localized planning or direct execution. |
| Product requirements definition                             | NO    | Route to `prd-generator`.                                 |
| Writing unit tests for a specific module                    | NO    | Route to `write-a-test`.                                  |

## 3. Execution Workflow

### Step 1: Workspace Discovery and Stack Identification

- **Action:** Inspect top-level directory structure, package manifests (for example `package.json`, `Cargo.toml`, `pyproject.toml`), configuration files, and documentation. Identify languages, frameworks, runtime dependencies, and entry points.
- **Input:** Target repository root files.
- **Stop Condition:** If no package manifest or entry point is found, stop and ask the user to clarify the project root.
- **Validation:** Primary languages, frameworks, and main entry points identified and recorded.

### Step 2: Architecture and Directory Mapping

- **Action:** Analyze the directory hierarchy and key modules. Classify components into logical layers (for example presentation, domain logic, data access, scripts, and context rules).
- **Input:** Directory tree and source file paths.
- **Stop Condition:** If key directory boundaries are unclear, inspect internal import paths to resolve structural dependencies.
- **Validation:** Every major directory mapped with a clear single sentence describing its responsibility.

### Step 3: Commands and Environment Audit

- **Action:** Read scripts from package manifests and environment configuration files (for example `.env.example`, Dockerfiles, Makefile). Extract exact build, run, test, and lint commands.
- **Input:** Project manifests and configuration files.
- **Stop Condition:** If build or test commands are missing, search repository documentation or mark as "Not specified".
- **Validation:** Every command verified against actual configuration files; no phantom build scripts assumed.

### Step 4: Map Generation

- **Action:** Format the discovered facts into `PROJECT_ONBOARDING_MAP.md` at the project root using the exact Section 4 Output Specification. Write in Spartan voice following `shared/writing/writing-rules.md`.
- **Input:** Verified facts from Steps 1 through 3.
- **Stop Condition:** If any section lacks verified data, mark it explicitly rather than guessing facts.
- **Validation:** File `PROJECT_ONBOARDING_MAP.md` written to repository root; zero banned words; zero em dashes.

### Step 5: Presentation and Handoff

- **Action:** Present a concise summary of the generated onboarding map in chat. Ask the user to review the generated file.
- **Input:** Created `PROJECT_ONBOARDING_MAP.md` file.
- **Stop Condition:** None.
- **Validation:** Chat summary delivered; file verified present on disk.

## 4. Output Specification

The generated `PROJECT_ONBOARDING_MAP.md` must adhere strictly to this format:

```markdown
# Project Onboarding Map: [Project Name]

## 1. Executive Summary

- **Primary Stack:** [Languages, frameworks, database]
- **Architecture Style:** [For example Monolith, Monorepo, Micro-frontend, Modular]
- **Target Runtime:** [Target environment]

## 2. Directory Structure & Key Responsibilities

- `[directory/]` - [One sentence responsibility]
- `[directory/]` - [One sentence responsibility]

## 3. Core Entry Points & Flow

- **Application Entry:** `[path/to/entry]`
- **Configuration Entry:** `[path/to/config]`
- **Data Flow Summary:** [Two sentence summary of how data enters and flows through the system]

## 4. Development Workflow & Commands

- **Install Dependencies:** `[command]`
- **Run Locally:** `[command]`
- **Run Tests:** `[command]`
- **Lint / Audit:** `[command]`

## 5. Architectural Boundaries & Conventions


## 5. Validation Gate

Run before declaring completion:

- [ ] Repository manifests and entry points verified from real files.
- [ ] File `PROJECT_ONBOARDING_MAP.md` created at project root.
- [ ] All 6 required sections present in `PROJECT_ONBOARDING_MAP.md`.
- [ ] Writing follows `shared/writing/writing-rules.md` (zero banned words, zero em dashes, no Latin abbreviations).
- [ ] No phantom commands or phantom tooling assumed.
- [ ] Chat summary presented to user.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Generating a generic onboarding template with placeholders instead of auditing real repository files.
- **Over-execution threshold:** Modifying source code files, editing dependencies, or writing application features during the audit.
- **Calibration default:** Focus strictly on extracting factual repository layout and workflow commands.

## 7. Anti-Pattern Compliance

| Step               | Prevents AP                           | Mechanism                                                  |
| ------------------ | ------------------------------------- | ---------------------------------------------------------- |
| 1 (Discovery)      | AP-41 (hallucinated API/stack)        | Reads real manifests to discover stack and tools.          |
| 2 (Arch mapping)   | AP-16 (context dump)                  | Summarizes directory roles cleanly without dumping source.  |
| 3 (Command audit)  | AP-53 (tool trust without validation) | Asserts only verified commands found in config files.      |
| 4 (Map generation) | AP-42 (no target state)               | Enforces strict Section 4 Markdown template structure.     |
| 5 (Handoff)        | AP-45 (no human review trigger)       | Presents chat summary for human verification.              |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0` (2026-09-03) — Initial release of Tier-5 project onboarding audit skill per `docs/skill-standard.md`.

## 9. Portability Matrix

| Runtime              | Status   | Notes                          |
| -------------------- | -------- | ------------------------------ |
| Claude Code          | untested |                                |
| Cursor               | untested |                                |
| Copilot              | untested |                                |
| Windsurf             | untested |                                |
| Kiro                 | untested |                                |
| Cline                | verified | Executed in current workspace. |
| Raw API (no tooling) | untested |                                |

## 10. Examples

**Input:** "Audit this repository and create an onboarding map for new engineers."

**Output:** Audits top-level manifests, identifies Node.js and TypeScript setup, maps `src/components`, `src/services`, and `scripts/`, extracts package scripts (`npm run build`, `npm test`), and writes a complete `PROJECT_ONBOARDING_MAP.md` file to the root directory. Presents a 4-bullet summary in chat.

- **State Management:** [Pattern used]
- **Data Persistence:** [ORM / database interface]
- **Key Constraints:** [Strict rules or boundaries discovered]

## 6. Onboarding Checklist for New Developers

1. [ ] Clone repository and install dependencies
2. [ ] Configure local environment variables
3. [ ] Run local test suite to verify baseline
4. [ ] Review key entry points and component map
```
