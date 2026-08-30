---
name: writing-skills
description: >-
  Meta-skill standard for authoring, evaluating, and elevating skills to Tier-5 enterprise compliance.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline, raw-api]
---

# Tier-5 Skill Authoring & Quality Clearance Engine

## 0. Identity

- **Role:** Meta-Skill Architect & Spec Author.
- **Authority:** Controls creation, elevation, and auditing of skill files against Tier-5 standard.
- **Must not define:** Direct production code edits outside skill documents, validates markdown skill files.
- **Normative base:** `core/decision-framework.md`, `docs/skill-standard.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`.
- **Anti-pattern gate:** Blocks AP-1 through AP-56.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                |
| --- | ---------------- | ------------------------------------------------------------------------------------ |
| 1   | Task             | Author, standardize, and audit markdown skills against the 10-section Tier-5 schema. |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API.  |
| 3   | Output Format    | Validated markdown skill file passing `node scripts/audit-compliance.js`.            |
| 4   | Constraints      | Must follow exact 10-section schema. Must pass writing-rules and anti-pattern gates. |
| 5   | Input            | Raw skill ideas, Superpowers skill source files, or elevation requests.              |
| 6   | Context          | Prevents informal, incomplete, or anti-pattern polluted skill documents.             |
| 7   | Audience         | Skill authors, agent architects, and specification maintainers.                      |
| 8   | Success Criteria | 10 sections complete, zero compliance script issues, zero banned words.              |
| 9   | Examples         | See Section 10.                                                                      |

## 2. Trigger Matrix

| Trigger                                                               | Fire? | Notes                             |
| --------------------------------------------------------------------- | ----- | --------------------------------- |
| Request to author a new skill file                                    | YES   | Core trigger.                     |
| Elevating legacy or third-party skills to Tier-5 enterprise standards | YES   | Core trigger.                     |
| Task is standard production code implementation                       | NO    | Use `test-driven-development.md`. |
| Routine project documentation update                                  | NO    | Follow standard docs workflow.    |

## 3. Execution Workflow

### Step 1: Structural Schema Verification

- **Action:** Enforce the 10-section template (`skills/_template/SKILL.md`).
- **Input:** Target skill draft.
- **Stop Condition:** Halt if any of the 10 required sections are missing.
- **Validation:** Sections 0 through 10 present in exact order.

### Step 2: Prose & Vocabulary Audit

- **Action:** Audit prose against `shared/writing/writing-rules.md`. Remove em-dashes and banned vocabulary words.
- **Input:** Skill draft content.
- **Stop Condition:** Halt if prohibited words or em-dashes are found.
- **Validation:** Zero prohibited terms present in text.

### Step 3: Anti-Pattern Clearance Gate

- **Action:** Audit against `docs/anti-patterns.md` (AP-1 to AP-56).
- **Input:** Skill workflow and trigger rules.
- **Stop Condition:** If workflow permits un-verified file writes or missing stop conditions, fix structure.
- **Validation:** Anti-Pattern Compliance table (Section 7) populated and verified.

### Step 4: Automated Verification Script Run

- **Action:** Run `node scripts/audit-compliance.js <skill-path>`.
- **Input:** Saved skill file on disk.
- **Stop Condition:** Halt if audit script exits with code 1.
- **Validation:** Script logs success with 0 issues detected.

## 4. Output Specification

```markdown
# Skill Creation & Audit Summary

- Skill Path: `skills/autonomous-dev/08-meta-and-bootstrap/writing-skills.md`
- Schema Compliance: 10/10 Sections Present
- Writing Rules Check: PASSED (0 banned terms, 0 em-dashes)
- Compliance Script: PASSED (`node scripts/audit-compliance.js`)
```

## 5. Validation Gate

- [ ] Frontmatter contains name, description, version, and verified-on array.
- [ ] All 10 required sections present in exact order.
- [ ] Zero banned vocabulary words or em-dashes present.
- [ ] Automated compliance script (`node scripts/audit-compliance.js`) returns 0 issues.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Authoring skills without formal section structure causes execution failures.
- **Over-execution threshold:** Applying 10-section meta ceremony to simple project README files.
- **Calibration default:** Mandatory for all files inside `skills/`.

## 7. Anti-Pattern Compliance

| Step | Prevents AP                 | Mechanism                                                |
| ---- | --------------------------- | -------------------------------------------------------- |
| 1    | AP-1 (vague task)           | Demands 9-dimension intent model definition.             |
| 2    | AP-18 (unstructured output) | Locks markdown format and output schemas.                |
| 4    | AP-9 (no verification)      | Validates skill files using automated compliance script. |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0` : Enterprise standard Tier-5 creation.

## 9. Portability Matrix

| Runtime     | Status   | Notes                                 |
| ----------- | -------- | ------------------------------------- |
| Claude Code | verified | Skill authoring environment.          |
| Cursor      | verified | Markdown editing support.             |
| Copilot     | verified | Markdown editing support.             |
| Windsurf    | verified | Markdown editing support.             |
| Kiro        | verified | Skill runner.                         |
| Cline       | verified | Skill runner.                         |
| Raw API     | verified | Model-agnostic skill authoring guide. |

## 10. Examples

**Input:** "Upgrade legacy skill to Tier-5 standard."
**Output:** Skill created with 10 sections, audited with `audit-compliance.js`, 0 warnings.
