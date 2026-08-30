---
name: using-superpowers
description: >-
  Bootstrap protocol for injecting Tier-5 skill directives into active agent execution sessions.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline, raw-api]
---

# Tier-5 Autonomous Skill Directive Bootstrap Engine

## 0. Identity

- **Role:** Autonomous Skill Injector & Session Bootstrapper.
- **Authority:** Controls loading and activating Tier-5 methodologies within agent execution sessions.
- **Must not define:** Direct task execution logic, loads specialized skill directives into session memory.
- **Normative base:** `core/decision-framework.md`, `shared/engineering/typescript-standards.md`, `shared/engineering/naming-conventions.md`, `shared/engineering/design-principles.md`, `shared/engineering/function-design.md`, `shared/engineering/module-organization.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`.
- **Anti-pattern gate:** Blocks AP-4, AP-26, AP-28, AP-44, and AP-45.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                          |
| --- | ---------------- | ---------------------------------------------------------------------------------------------- |
| 1   | Task             | Bootstrap agent execution sessions with Tier-5 autonomous engineering skills.                  |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API.            |
| 3   | Output Format    | Loaded skill context and active router configuration.                                          |
| 4   | Constraints      | Must enforce strict skill precedence rules (`core/` -> `shared/` -> `skills/autonomous-dev/`). |
| 5   | Input            | Session start command or user skill invocation request.                                        |
| 6   | Context          | Prevents unguided agent behavior and ensures strict standard compliance.                       |
| 7   | Audience         | Autonomous agents starting new tasks.                                                          |
| 8   | Success Criteria | Skill environment verified, router loaded, sub-skill triggers active.                          |
| 9   | Examples         | See Section 10.                                                                                |

## 2. Trigger Matrix

| Trigger                                                          | Fire? | Notes           |
| ---------------------------------------------------------------- | ----- | --------------- |
| Agent session initialization or skill setup                      | YES   | Core trigger.   |
| User requests activation of autonomous engineering methodologies | YES   | Core trigger.   |
| Session already has skills initialized                           | NO    | Skip bootstrap. |
| Routine informational query without engineering action           | NO    | Skip bootstrap. |

## 3. Execution Workflow

### Step 1: Audit Skill Environment

- **Action:** Verify presence of `skills/autonomous-dev/SKILL.md` and sub-skill modules.
- **Input:** Local repository path.
- **Stop Condition:** Halt if core skill files are missing.
- **Validation:** File tree exists and structure is verified.

### Step 2: Inject Precedence Rules

- **Action:** Load instruction hierarchy precedence: 1) `core/`, 2) `shared/`, 3) `skills/autonomous-dev/`.
- **Input:** Spec hierarchy rules.
- **Stop Condition:** None.
- **Validation:** Skill precedence established in agent session context.

### Step 3: Activate Lifecycle Router

- **Action:** Bind `skills/autonomous-dev/SKILL.md` as the root lifecycle router.
- **Input:** Sub-skill trigger matrix.
- **Stop Condition:** None.
- **Validation:** Router ready to dispatch user requests to sub-skills.

## 4. Output Specification

```json
{
  "bootstrap_status": "SUCCESS",
  "root_router": "skills/autonomous-dev/SKILL.md",
  "loaded_skills": 14,
  "precedence_active": true
}
```

## 5. Validation Gate

- [ ] `skills/autonomous-dev/SKILL.md` loaded into session.
- [ ] Instruction hierarchy precedence enforced.
- [ ] Sub-skill path resolutions verified.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Running agent without bootstrap results in unguided code edits.
- **Over-execution threshold:** Re-bootstrapping during every turn of an active chat.
- **Calibration default:** Execute once per agent session initialization.

## 7. Anti-Pattern Compliance

| Step | Prevents AP                  | Mechanism                                     |
| ---- | ---------------------------- | --------------------------------------------- |
| 1    | AP-4 (over-permissive agent) | Validates environment file integrity upfront. |
| 2    | AP-26 (no scope boundary)    | Establishes normative precedence and limits.  |
| 3    | AP-28 (no stop condition)    | Sets structured routing pathways.             |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0` : Enterprise standard Tier-5 creation.

## 9. Portability Matrix

| Runtime     | Status   | Notes                          |
| ----------- | -------- | ------------------------------ |
| Claude Code | verified | Skill directive loading.       |
| Cursor      | verified | Rules integration.             |
| Copilot     | verified | Custom instructions.           |
| Windsurf    | verified | Directive integration.         |
| Kiro        | verified | Skill binding.                 |
| Cline       | verified | System prompt loading.         |
| Raw API     | verified | Model-agnostic session prompt. |

## 10. Examples

**Input:** "Initialize autonomous dev superpowers skill suite."
**Output:** Suite bootstrapped, 14 sub-skills active, root router engaged.
