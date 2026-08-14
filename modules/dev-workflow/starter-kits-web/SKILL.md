---
name: starter-kits-web
description: >-
  Provides pre-configured agent workspace rules, design specifications, and shared architectural guidelines for modern web application starter kits.
version: 2.0.0
verified-on: [cline]
---

# Web Application Starter Kit

## 0. Identity

- **Role:** Web Application Workspace Architect. Bootstraps and enforces project context, design guidelines, and coding rules in `.agents/` for web software projects.
- **Authority:** Owns the `starter-kits-web` environment template configuration.
- **Must not define:** Runtime application logic directly.
- **Normative base:** `core/instruction-hierarchy.md`, `context/RULES.md`, `context/DESIGN.md`.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                                 |
| --- | ---------------- | ----------------------------------------------------------------------------------------------------- |
| 1   | Task             | Supply workspace context templates, architectural rules, and design tokens for web projects.          |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API.                      |
| 3   | Output Format    | Initialized `.agents/` directory structure with `AGENTS.md`, `RULES.md`, and `DESIGN.md`.             |
| 4   | Constraints      | Do not overwrite existing project rules without user confirmation.                                    |
| 5   | Input            | Request to initialize a web project workspace or bootstrap agent guidelines.                          |
| 6   | Context          | Establishes baseline design and behavioral guardrails for new web projects.                           |
| 7   | Audience         | Autonomous developer agents and human web engineers.                                                  |
| 8   | Success Criteria | Workspace populated with `.agents/` context templates ready for project-specific customization.       |
| 9   | Examples         | See Section 10.                                                                                       |

## 2. Trigger Matrix

| Trigger                                           | Fire? | Notes                                         |
| ------------------------------------------------- | ----- | --------------------------------------------- |
| "Initialize web starter kit", "Bootstrap web app" | YES   | Core trigger.                                 |
| "Set up `.agents/` workspace rules for web"       | YES   | Core trigger.                                 |
| "Run PR evaluation"                               | NO    | Belongs to `evaluate-pr-suggestions`.         |

## 3. Execution Workflow

### Step 1: Inspect Target Workspace

- **Action:** Check if `.agents/` already exists in the target directory.
- **Input:** Workspace root path.
- **Stop Condition:** Ask user before overwriting existing `.agents/` configurations.
- **Validation:** Workspace state confirmed.

### Step 2: Copy Workspace Templates

- **Action:** Copy template files from `starter-kits-web/.agents/` to the project root `.agents/`.
- **Input:** `starter-kits-web/.agents/` contents.
- **Stop Condition:** None.
- **Validation:** Files copied successfully.

### Step 3: Inform Adopter

- **Action:** Prompt the user to fill in project-specific details in `.agents/context/RULES.md` and `DESIGN.md`.
- **Input:** Initialized files.
- **Stop Condition:** Wait for user acknowledgment.
- **Validation:** Handoff message presented.

## 4. Output Specification

```markdown
# Web Starter Kit Initialized

Initialized project context in `.agents/`:
- `.agents/AGENTS.md` (Agent instruction entry point)
- `.agents/context/RULES.md` (Project rules template)
- `.agents/context/DESIGN.md` (Design guidelines template)
- `.agents/shared/SHARED_RULES.md` (Cross-cutting rules)

Next step: Customize `[PLACEHOLDER]` entries in `.agents/context/` files.
```

## 5. Validation Gate

- [ ] Workspace state inspected before file generation.
- [ ] Context files generated cleanly under `.agents/`.
- [ ] User instructed on placeholder completion.

## 6. Anti-Triggers and Calibration

- **Under-execution:** Overwriting existing user rules silently without checking.
- **Over-execution:** Generating boilerplate application source code instead of configuration.

## 7. Anti-Pattern Compliance

| Step | Prevents AP                 | Mechanism                                              |
| ---- | --------------------------- | ------------------------------------------------------ |
| 1    | AP-44 (unlocked filesystem) | Asks before modifying pre-existing workspace configs.  |
| 3    | AP-1 (vague task)           | Clear handoff instructions for filling context files.  |

## 8. Versioning & Changelog

- **Version:** 2.0.0
- **Changelog:**
  - `2.0.0` — Standardized entry SKILL.md for starter-kits-web per enterprise skill standard.

## 9. Portability Matrix

| Runtime     | Status   | Notes                              |
| ----------- | -------- | ---------------------------------- |
| Claude Code | verified | Workspace setup template.          |
| Cursor      | verified | Workspace rules integration.       |
| Copilot     | verified | Workspace instructions loader.     |
| Windsurf    | verified | Workspace setup flow.              |
| Kiro        | verified | Workspace config runner.           |
| Cline       | verified | Direct execution in workspace.     |
| Raw API     | verified | Portable template directory.       |

## 10. Examples

**Input:** "Initialize web starter kit for this project."
**Output:** Copies `.agents/` context files into workspace root and presents customization checklist.
