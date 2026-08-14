---
name: prompt-engineering
description: >-
  Root router for the Prompt Engineering module, routing prompt auditing, prompt generation, and categorized prompt templates to specialist skills.
version: 2.0.0
verified-on: [cline]
---

# Prompt Engineering Router

## 0. Identity

- **Role:** Prompt Engineering Module Router and Dispatcher.
- **Authority:** Tier-5 normative root skill for `modules/prompt-engineering/`.
- **Must not define:** Direct prompt drafting or execution; delegates to sub-skills and prompt catalogs.
- **Normative base:** `core/decision-framework.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`, `docs/skill-standard.md`.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                                      |
| --- | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| 1   | Task             | Classify prompt engineering requests and dispatch to prompt master, prompt auditor, or category templates. |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API.                           |
| 3   | Output Format    | Structured routing decision and handoff to target prompt skill or template.                                |
| 4   | Constraints      | Router executes no prompt optimization directly.                                                           |
| 5   | Input            | User request to write, audit, optimize, or format a prompt or system instruction.                          |
| 6   | Context          | Prevents weak, uncalibrated, or anti-pattern-riddled prompts.                                              |
| 7   | Audience         | Prompt engineers, autonomous agents, and system instruction authors.                                       |
| 8   | Success Criteria | Request routed cleanly to target prompt engineering tool or template.                                      |
| 9   | Examples         | See Section 10.                                                                                            |

## 2. Trigger Matrix

| Sub-Skill / Catalog  | Trigger                                                                             | Target File Path                 |
| -------------------- | ----------------------------------------------------------------------------------- | -------------------------------- |
| Prompt Master Skill  | Turn raw brain dumps into 9-dimension task specs and prompt instructions            | `prompt-master-skill/SKILL.md`   |
| Prompt Auditor Suite | Audit prompt quality, remove anti-patterns, optimize for target model               | `prompt-auditor-skill/README.md` |
| Prompts by Category  | Access production prompt templates for dev workflows, content, career, and learning | `prompts-by-category/`           |

## 3. Execution Workflow

### Step 1: Analyze Request

- **Action:** Classify user request into prompt creation, auditing/optimization, or template retrieval.
- **Input:** User prompt text.
- **Stop Condition:** Ask user if intent is ambiguous.
- **Validation:** Matches Trigger Matrix.

### Step 2: Resolve Target

- **Action:** Select target path under `modules/prompt-engineering/`.
- **Input:** Trigger Matrix.
- **Stop Condition:** Decline execution if request is out of scope.
- **Validation:** Target file exists on disk.

### Step 3: Handoff

- **Action:** Delegate control to target skill or template catalog.
- **Input:** Resolved target path.
- **Stop Condition:** Handoff control.
- **Validation:** Target executes.

## 4. Output Specification

```json
{
  "module": "prompt-engineering",
  "target_skill": "modules/prompt-engineering/prompt-master-skill/SKILL.md"
}
```

## 5. Validation Gate

- [ ] Intent mapped to target prompt engineering asset.
- [ ] Target file exists on disk.
- [ ] Router executes no prompt creation logic directly.

## 6. Anti-Triggers

- **Under-execution:** Accepting uncalibrated, 1-line prompts without running Prompt Master or Auditor.
- **Over-execution:** Running 9-stage prompt audit for a simple 1-word typo fix.

## 7. Anti-Pattern Compliance

| Step | Prevents AP            | Mechanism                                                 |
| ---- | ---------------------- | --------------------------------------------------------- |
| 1    | AP-1 (vague task)      | Enforces classification before prompt generation.         |
| 3    | AP-4 (over-permissive) | Router delegates to specialized auditor or master skills. |

## 8. Versioning & Changelog

- **Version:** 2.0.0
- **Changelog:**
  - `2.0.0` — Module root router created for `modules/prompt-engineering/`.

## 9. Portability Matrix

| Runtime     | Status   | Notes                          |
| ----------- | -------- | ------------------------------ |
| Claude Code | verified | Prompt engineering dispatcher. |
| Cursor      | verified | Prompt rules routing.          |
| Copilot     | verified | Custom instructions.           |
| Windsurf    | verified | Directive routing.             |
| Kiro        | verified | Skill runner handoff.          |
| Cline       | verified | System prompt loading.         |
| Raw API     | verified | Model-agnostic prompt router.  |

## 10. Examples

**Input:** "Help me transform my messy thoughts into a structured prompt for Claude."
**Output:** Target `modules/prompt-engineering/prompt-master-skill/SKILL.md`.
