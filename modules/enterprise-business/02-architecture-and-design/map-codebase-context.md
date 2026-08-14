---
name: map-codebase-context
description: >-
  Scan and index workspace file trees, module relationships, and dependency graphs
  to produce structural codebase context maps for developers and downstream agents.
  Execute this skill whenever the user says "map codebase context", "generate context map",
  "index repository structure", or "analyze project layout". Do NOT execute for code editing.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline]
---

# Map Codebase Context

## 0. Identity

- **Role:** Lead Codebase Cartographer. Scans and indexes workspace file trees, module relationships, and dependency graphs to produce structural codebase context maps.
- **Authority:** Tier-5 Enterprise Skill. Governs codebase indexing, workspace mapping, and structural context generation.
- **Must not define:** Architectural redesign decisions, code refactoring, or bug fixes.
- **Normative base:** `core/instruction-hierarchy.md`, `core/decision-framework.md`, `shared/writing/writing-rules.md`.
- **Anti-pattern gate:** This skill must never encode anti-patterns AP-1–AP-56 from `docs/anti-patterns.md`. Any step that could violate AP-4 (over-permissive agent), AP-16 (context dump), AP-26 (no scope boundary), AP-28 (no stop condition), or AP-44 (unlocked filesystem) is forbidden.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                                       |
| --- | ---------------- | ----------------------------------------------------------------------------------------------------------- |
| 1   | Task             | Scan repository files to map directory trees, export signatures, and component dependency graphs.           |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API.                         |
| 3   | Output Format    | Codebase map document saved to `.context/maps/[slug]-codebase-map.md`.                                      |
| 4   | Constraints      | Must exclude build artifacts and vendor directories. Must complete mapping in structured stages.            |
| 5   | Input            | Target workspace directory path and optional file focus patterns.                                           |
| 6   | Context          | Prevents agent confusion and context exhaustion by providing clear entry points and component indexes.      |
| 7   | Audience         | Software developers, engineering onboarding leads, and automated coding agents.                             |
| 8   | Success Criteria | Codebase map produced detailing directory hierarchy, entry points, core exports, and external dependencies. |
| 9   | Examples         | See Section 10.                                                                                             |

## 2. Trigger Matrix

| Trigger                            | Fire? | Notes                                 |
| ---------------------------------- | ----- | ------------------------------------- |
| "Map codebase context"             | YES   | Primary trigger for codebase mapping. |
| "Index repository structure"       | YES   | Workspace indexing request.           |
| "Generate project map"             | YES   | Codebase cartography request.         |
| "Refactor the database controller" | NO    | Code refactoring task.                |
| "Fix broken unit tests"            | NO    | QA and debugging task.                |

## 3. Execution Workflow

### Step 1: Workspace Hierarchy Discovery

- **Action:** Read the top-level directory structure of the repository. Ignore build outputs, node modules, cache folders, and third-party vendor directories (e.g., `node_modules/`, `dist/`, `.git/`, `vendor/`).
- **Input:** Workspace root path.
- **Stop Condition:** Limit recursive directory traversal to a maximum depth of 4 levels.
- **Validation:** Clean directory tree generated with vendor artifacts filtered out.

### Step 2: Entry Point and Core Module Identification

- **Action:** Identify key application entry points (e.g., `index.ts`, `main.go`, `app.py`, `server.js`) and configuration manifests (e.g., `package.json`, `Cargo.toml`, `go.mod`, `pyproject.toml`).
- **Input:** Filtered directory listing from Step 1.
- **Stop Condition:** Pause after reading primary entry point definitions and configuration files.
- **Validation:** Primary application entry points and active framework types cataloged.

### Step 3: Module Export and Dependency Indexing

- **Action:** Scan source files to extract exported functions, class interfaces, type definitions, and inter-file import relationships.
- **Input:** Identified source file paths from Step 2.
- **Stop Condition:** Maximum 20 source files read for deep export indexing.
- **Validation:** Export signatures and module import relationships mapped without missing core interfaces.

### Step 4: Codebase Map Artifact Delivery

- **Action:** Save the consolidated codebase map to `.context/maps/[slug]-codebase-map.md`.
- **Input:** Indexed structural data from Steps 1–3.
- **Stop Condition:** If directory `.context/maps/` does not exist, create it before saving.
- **Validation:** Map artifact saved to disk matching the Section 4 schema.

## 4. Output Specification

```markdown
# Structural Codebase Context Map: [Repository Name]

- **Date:** [YYYY-MM-DD]
- **Cartographer:** [Lead Codebase Cartographer]
- **Map Path:** `.context/maps/[slug]-codebase-map.md`

## 1. Executive Layout Overview

- **Primary Stack:** [e.g., TypeScript / Node.js / React]
- **Core Package Manifest:** [package.json | Cargo.toml | go.mod]
- **Primary Entry Points:** `[entry path 1]`, `[entry path 2]`

## 2. Directory Hierarchy (Filtered)
```

src/
├── components/ # UI Component layer
├── controllers/ # API Route Handlers
├── services/ # Core Business Logic
└── utils/ # Shared Utilities

```

## 3. Core Module & Export Index

### 3.1 Services (`src/services/`)
- `authService.ts`: Exports `loginUser()`, `validateSession()`, `hashPassword()`.
- `userService.ts`: Exports `createUser()`, `findUserById()`.

### 3.2 Key Dependencies & Inter-Module Graph
- `controllers/authController.ts` --> imports `services/authService.ts`
- `services/authService.ts` --> imports `utils/crypto.ts`

## 4. Architectural Hotspots & Key Files

- **High Complexity:** `src/services/paymentEngine.ts` (Core transaction pipeline)
- **Shared Contracts:** `src/types/index.ts` (Global domain interfaces)
```

## 5. Validation Gate

Run before declaring completion:

- [ ] Directory traversal depth capped at maximum 4 levels.
- [ ] Vendor directories and build artifacts explicitly excluded.
- [ ] Maximum 20 source files read for export indexing.
- [ ] Codebase map saved to `.context/maps/[slug]-codebase-map.md`.
- [ ] Zero banned words or em dashes present in map artifact.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Listing directories without identifying entry points or exported interfaces.
- **Over-execution threshold:** Reading every source file line-by-line or dumping raw file contents.
- **Calibration default:** Err toward summary structures if the codebase contains hundreds of files.

## 7. Anti-Pattern Compliance

| Step   | Prevents AP  | Mechanism                                                            |
| ------ | ------------ | -------------------------------------------------------------------- |
| Step 1 | AP-16        | Excludes vendor artifacts and caps directory depth to 4 levels.      |
| Step 2 | AP-1, AP-28  | Focuses indexing on primary entry points and configuration files.    |
| Step 3 | AP-31        | Caps deep file scanning to 20 source files to prevent token waste.   |
| Step 4 | AP-26, AP-44 | Confines generated artifacts strictly to `.context/maps/` directory. |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0`: Initial clean-room release in Tier-5 Enterprise SKILL standard format.

## 9. Portability Matrix

| Runtime              | Status   | Notes                                           |
| -------------------- | -------- | ----------------------------------------------- |
| Claude Code          | verified | Direct execution using workspace file tools.    |
| Cursor               | verified | Compatible with workspace context search.       |
| Copilot              | verified | Formatted for prompt-based context mapping.     |
| Windsurf             | verified | Fully compatible.                               |
| Kiro                 | verified | Fully compatible.                               |
| Cline                | verified | Executed and verified in workspace environment. |
| Raw API (no tooling) | verified | Generates valid structural codebase maps.       |

## 10. Examples

**Input:** "Map codebase context for our React frontend app so I can understand the folder layout."

**Output:** Filters `node_modules` and `build`. Discovers entry points `src/main.tsx` and `src/App.tsx`. Indexes component exports under `src/components/`. Generates `.context/maps/frontend-app-codebase-map.md` with explicit module dependency graph and entry point breakdown.

**Failure case:** User says "Refactor all component files to use functional components." Refuses mapping mode because request is code refactoring, routing user to engineering execution workflow instead.
