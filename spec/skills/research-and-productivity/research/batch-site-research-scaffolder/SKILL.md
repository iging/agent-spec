---
name: batch-site-research-scaffolder
description: >-
  Dispatches batch research across up to 500 target URLs using research capability skills, extracts site intelligence, and provisions shared governance context templates. Do NOT execute for single-site manual research or non-batch tasks.
version: 1.0.0
verified-on: [cline]
---

# Batch Site Research Scaffolder

## 0. Identity

- **Role:** Principal Batch Intelligence Architect and Governance Analyst.
- **Authority:** Owns the multi-site research orchestration and governance artifact scaffolding workflow.
- **Must not define:** Core instruction hierarchy (`spec/core/`) or standalone application source code.
- **Normative base:** `spec/core/decision-framework.md`; `spec/shared/writing/writing-rules.md`; `spec/docs/anti-patterns.md`; `spec/docs/skill-standard.md`; `spec/skills/research-and-productivity/research/batch-site-research-scaffolder/references/batch-research-workflow.md`.
- **Anti-pattern gate:** Blocks AP-1 (vague task), AP-4 (over-permissive agent), AP-16 (context dump), AP-26 (no scope boundary), AP-44 (unlocked filesystem), and AP-45 (no human review trigger).

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                                                                                     |
| --- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Task             | Ingest up to 500 target URLs, orchestrate research sub-skills, synthesize intelligence, and provision governance templates.                               |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API.                                                                       |
| 3   | Output Format    | Batch Research Blueprint in chat, plus provisioned `SITE_INDEX.md`, `STC_ANALYSIS.md`, and context files upon user approval.                              |
| 4   | Constraints      | Maximum 500 URLs per run. Process in chunks of 10 to 25 URLs. Require user confirmation before writing files. Retain placeholder markers. Zero em dashes. |
| 5   | Input            | List of target website URLs or domain CSV/text file, target project path, active AI runtime.                                                              |
| 6   | Context          | Eliminates manual research overhead when onboarding or analyzing large multi-site estates.                                                                |
| 7   | Audience         | Enterprise architects, security leads, and development teams.                                                                                             |
| 8   | Success Criteria | Target URLs processed, sub-skill intelligence synthesized, governance blueprints presented, human approval recorded, and files provisioned cleanly.       |
| 9   | Examples         | See Section 10.                                                                                                                                           |

## 2. Trigger Matrix

| Trigger                                                | Decision | Action                               |
| ------------------------------------------------------ | -------- | ------------------------------------ |
| "Research these 50 websites and scaffold context"      | YES      | Execute batch site research workflow |
| "Analyze list of URLs and generate site index"         | YES      | Execute batch site research workflow |
| "Batch audit 100 domain targets and update governance" | YES      | Execute batch site research workflow |
| Single website analysis request                        | NO       | Route to `deep-research-synthesizer` |
| Fact-check a single article draft                      | NO       | Route to `editorial-fact-checker`    |

## 3. Execution Workflow

### Step 1: Batch Target Ingestion and Validation

- **Action:** Read input target URL list or manifest file. Validate domain formats and de-duplicate entries. Cap total targets at 500 URLs. Segment into chunks of 10 to 25 URLs per processing cycle.
- **Input:** User prompt URL list or manifest file path.
- **Stop Condition:** If target count exceeds 500 or input list is invalid, stop and request clarified input targets.
- **Validation:** Target list validated, de-duplicated, and chunked into processing cohorts.

### Step 2: Research Sub-Skill Orchestration

- **Action:** Dispatch research tasks across target cohorts using `references/batch-research-workflow.md` rules. Invoke `deep-research-synthesizer` for tech stack and structural analysis, `social-sentiment-researcher` for domain reputation signals, and `editorial-fact-checker` for claim validation.
- **Input:** Target cohorts and reference runbook.
- **Stop Condition:** If an external research source fails repeatedly, flag the affected cohort as unverified and continue processing remaining cohorts.
- **Validation:** Intelligence data extracted across tech stack, reputation, and structural patterns.

### Step 3: Synthesis and Governance Scaffolding

- **Action:** Synthesize extracted intelligence into global governance artifacts: `SITE_INDEX.md` (domain catalog), `STC_ANALYSIS.md` (stack, technology, and compliance profile), and updated `context/` templates (`PRD.md`, `ARCHITECTURE.md`, `RULES.md`).
- **Input:** Sub-skill research outputs.
- **Stop Condition:** If synthesized data contradicts existing codebase facts, surface the contradiction for user resolution.
- **Validation:** Governance artifacts structured according to `references/batch-research-workflow.md` specifications.

### Step 4: Blueprint Presentation and Confirmation Gate

- **Action:** Present the complete Batch Research Blueprint summary in chat. Request explicit user confirmation before writing any files to disk.
- **Input:** Synthesized governance blueprint summary.
- **Stop Condition:** Pause execution and wait for explicit user approval. Do not write files without user confirmation.
- **Validation:** User approval recorded in session state.

### Step 5: Artifact Provisioning and Audit Gate

- **Action:** Write approved governance files to the target workspace. Preserve all `[PLACEHOLDER: ...]` markers on unconfirmed details. Run `node scripts/audit-compliance.js` to verify zero compliance errors.
- **Input:** Approved artifacts and workspace path.
- **Stop Condition:** If compliance audit returns errors, fix formatting issues before final completion.
- **Validation:** Files provisioned; `node scripts/audit-compliance.js` executes with 0 errors.

## 4. Output Specification

The chat summary output follows this structure:

```markdown
# Batch Site Research Blueprint

- **Total Targets:** [Count, max 500]
- **Processing Cohorts:** [Number of cohorts]
- **Target Runtime:** [Active AI agent tool]

## Discovered Technology & Stack Profile

- **Primary Frameworks:** [Extracted frameworks]
- **Common Infrastructure:** [Discovered hosting/cloud platforms]
- **Compliance Posture:** [WCAG / Security / OWASP summary]

## Scaffolding Plan

- `context/SITE_INDEX.md`: Target site inventory and metadata
- `context/STC_ANALYSIS.md`: Stack, technology, and compliance analysis
- `context/ARCHITECTURE.md`: Synthesized architectural patterns
- `context/RULES.md`: Inferred governance boundaries

## Action Plan

- [ ] Confirm file provisioning to target workspace
```

## 5. Validation Gate

- [ ] Target list capped at 500 URLs and processed in 10-25 URL chunks.
- [ ] Sub-skills (`deep-research-synthesizer`, `editorial-fact-checker`, `social-sentiment-researcher`) orchestrated per `references/batch-research-workflow.md`.
- [ ] Chat summary output conforms to Section 4 format.
- [ ] Human review confirmation recorded before writing any workspace files.
- [ ] Placeholder markers (`[PLACEHOLDER: ...]`) preserved on unconfirmed details.
- [ ] Compliance script `node scripts/audit-compliance.js` passes with 0 errors.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Writing governance files without running sub-skill research or skipping human review approval.
- **Over-execution threshold:** Overwriting application code or filling placeholder markers with unconfirmed assumptions.
- **Calibration default:** Require explicit human approval before file provisioning and limit processing to 500 URLs per run.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism                                                                 |
| ---- | ----------- | ------------------------------------------------------------------------- |
| 1    | AP-1, AP-26 | Limits execution to 500 URLs max and enforces validated cohort bounds.    |
| 2    | AP-4, AP-53 | Orchestrates dedicated sub-skills with explicit failure fallback rules.   |
| 3    | AP-42       | Maps synthesized findings to strict governance template structures.       |
| 4    | AP-45       | Halts execution for explicit human review approval before file writes.    |
| 5    | AP-44       | Enforces read-only audit check (`audit-compliance.js`) before completion. |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0` (2026-09-02) — Initial release of Tier-5 Batch Site Research Scaffolder skill.

## 9. Portability Matrix

| Runtime     | Status   | Notes                                 |
| ----------- | -------- | ------------------------------------- |
| Claude Code | verified | Command and sub-skill integration.    |
| Cursor      | verified | Workspace rules and prompt execution. |
| Copilot     | verified | Custom agent instruction path.        |
| Windsurf    | verified | Directive integration.                |
| Kiro        | verified | Skill path linking.                   |
| Cline       | verified | Executed in current workspace.        |
| Raw API     | verified | Model-agnostic batch dispatcher.      |

## 10. Examples

**Input:** "I have a list of 40 partner university websites. Research their tech stacks, accessibility posture, and build a site index and architecture context for our integration project."

**Output:** Ingests the 40 URLs, breaks into 2 processing cohorts of 20 URLs, dispatches research sub-skills, synthesizes stack and accessibility metrics, presents the Batch Research Blueprint in chat, and waits for user approval before provisioning `context/SITE_INDEX.md`, `context/STC_ANALYSIS.md`, and updating `context/ARCHITECTURE.md`.
