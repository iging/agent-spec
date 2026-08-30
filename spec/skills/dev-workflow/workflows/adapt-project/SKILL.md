---
name: adapt-project
description: >-
  Analyze a new or existing project repository, select matching agent-spec capability modules, skills,
  prompts, and shared context files, and adapt agent-spec governance to the workspace.
  Execute this skill when the user asks to adapt agent-spec, configure agent-spec for an existing codebase,
  recommend skills or prompts for a project, or set up workspace context governance.
  Do NOT execute for defining application foundations from scratch (use define-foundation),
  authoring new skills (use write-a-skill), or auditing prompt files (use prompt-auditor).
version: 1.0.0
verified-on: [cline]
---

# Adapt Project

## 0. Identity

- **Role:** Project adaptation engine. Audits workspace context and provisions agent-spec configurations, skills, prompts, and context templates for target projects.
- **Authority:** Owns the workspace audit, skill matching, prompt selection, and context provisioning workflow. Cannot alter core standards in `core/` or modify target application code without user confirmation.
- **Must not define:** Core instruction hierarchy (`core/`), foundation PRD/architecture definitions (`define-foundation`), or skill authoring rules (`write-a-skill`).
- **Normative base:** `shared/writing/writing-rules.md`; `docs/anti-patterns.md`; `skills/_template/SKILL.md`; `docs/skill-standard.md`; `skills/prompt-engineering/prompts-by-category/learning/prompt-engineer-mentor.md`; `references/module-mapping-guide.md`.
- **Anti-pattern gate:** No step may trigger AP-1 (vague task), AP-4 (over-permissive agent), AP-16 (context dump), AP-26 (no scope boundary), AP-44 (unlocked filesystem), or AP-45 (no human review trigger). Never overwrite project context without user confirmation.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                                                                                    |
| --- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Task             | Audit a target codebase and configure matching agent-spec skills, prompts, shared rules, and context templates.                                          |
| 2   | Target Tool      | Any agent runtime reading markdown skills: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API.                                                 |
| 3   | Output Format    | Adaptation blueprint in chat summary, plus selected `context/` templates with placeholders and `.agents/` configurations upon approval.                  |
| 4   | Constraints      | Max 3 clarifying questions. Imperative voice. No em dashes. No banned words. Retain template placeholder markers. Require approval before writing files. |
| 5   | Input            | Target project path, codebase indicators, target AI agent runtime, and user goals.                                                                       |
| 6   | Context          | Eliminates configuration friction for teams adopting agent-spec governance.                                                                              |
| 7   | Audience         | Project developers and downstream AI coding agents.                                                                                                      |
| 8   | Success Criteria | Codebase stack identified, relevant skills and prompts selected, context templates scaffolded cleanly, and human review approval recorded.               |
| 9   | Examples         | See §10.                                                                                                                                                 |

## 2. Trigger Matrix

| Trigger                                                 | Fire? | Notes                                   |
| ------------------------------------------------------- | ----- | --------------------------------------- |
| "Adapt agent-spec to my project"                        | YES   | Core trigger for new or existing repos. |
| "Adapt agent-spec to my existing codebase / legacy app" | YES   | Core trigger for brownfield projects.   |
| "Recommend skills and prompts for this codebase"        | YES   | Core trigger.                           |
| "Set up agent-spec governance in this repository"       | YES   | Core trigger.                           |
| "Define my app foundation from scratch"                 | NO    | Route to `define-foundation`.           |
| "Write a new skill"                                     | NO    | Route to `write-a-skill`.               |
| "Audit an existing prompt file"                         | NO    | Route to `prompt-auditor`.              |

## 3. Execution Workflow

### Step 1: Workspace Audit and Stack Discovery

- **Action:** Inspect the target project workspace (new or existing codebase). Identify package manifests, configuration files, directory structures, existing source code, and the active AI agent runtime. Preserve existing application source files.
- **Input:** Target workspace files and user prompt.
- **Stop Condition:** Primary programming language, framework, project domain, existing architecture, and active agent runtime recorded.
- **Validation:** Workspace stack and codebase structure categorized against `references/module-mapping-guide.md`.

### Step 2: Capability Suite and Skill Selection

- **Action:** Match the discovered project domain with relevant capability suites in `skills/` (such as `dev-workflow`, `design-engineering`, `mobile-react-native`, `autonomous-dev`, `enterprise-business`, `prompt-engineering`, `research-and-productivity`, `content-and-growth`).
- **Input:** Step 1 stack profile and `references/module-mapping-guide.md`.
- **Stop Condition:** List of specific skills and capability suites compiled with short justifications.
- **Validation:** Selected skills exist in `skills/` and match project stack requirements.

### Step 3: Prompt Engineering and Role Framing

- **Action:** Construct tool-specific prompt contracts, role framing declarations, and safety boundaries tailored to the project stack using prompt engineering principles.
- **Input:** Selected skills and target AI agent runtime.
- **Stop Condition:** System prompt templates and execution instructions compiled.
- **Validation:** Prompts strictly follow writing rules (no em dashes, no banned words, proper reasoning model constraints).

### Step 4: Shared Rules and Context Scaffolding

- **Action:** Select required `context/` templates (`PRD.md`, `ARCHITECTURE.md`, `SCHEMA.md`, `DESIGN.md`, `RULES.md`) and `shared/` writing rules needed for project governance. If the project lacks existing context files, apply the Zero-Context Repository Onboarding Protocol from `references/module-mapping-guide.md`.
- **Input:** Project architecture, domain needs, and workspace context status.
- **Stop Condition:** Selected context templates and shared rules prepared for workspace provisioning.
- **Validation:** All placeholders retain `[PLACEHOLDER: ...]` markers while confirmed codebase facts are pre-filled into `ARCHITECTURE.md`.

### Step 5: Adaptation Blueprint and Handoff

- **Action:** Present the complete adaptation blueprint summary to the user. Request explicit confirmation before writing any files to the project repository.
- **Input:** Compiled results from Steps 1 through 4.
- **Stop Condition:** User approves or requests modifications to the adaptation blueprint.
- **Validation:** Approval recorded. On pass, provision approved `context/` templates and `.agents/` configurations.

## 4. Output Specification

The summary output in chat follows this structure:

```markdown
# Agent-Spec Adaptation Blueprint

- **Target Project:** [Project name / path]
- **Detected Stack:** [Languages, frameworks, tools]
- **Target Runtime:** [Active AI agent tool]

## Recommended Modules & Skills

- [module-name/skill-name]: [1-sentence justification]

## Recommended Context Templates

- context/[TEMPLATE].md: [1-sentence purpose]

## System Prompt Framing

[Role statement, file scope bounds, and execution constraints]

## Action Plan

- [ ] Confirm file provisioning
```

Upon user approval, write selected templates with retained `[PLACEHOLDER: ...]` markers to `context/` or `.agents/`.

## 5. Validation Gate

Run before declaring completion:

- [ ] Workspace audit completed and stack accurately categorized.
- [ ] Recommended skills exist in `skills/` and match project scope.
- [ ] Prompt recommendations follow tool-specific rules without adding Chain of Thought to reasoning models.
- [ ] Context templates preserve all `[PLACEHOLDER: ...]` markers without pre-filling mock data.
- [ ] No em dashes and no banned words present in generated content.
- [ ] Explicit human review approval recorded before writing files.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Recommending generic modules without checking codebase files, or writing files without user approval.
- **Over-execution threshold:** Overwriting existing application source code, or pre-filling project facts into context templates instead of leaving placeholders.
- **Calibration default:** Err toward precise codebase inspection and strict human approval gates.

## 7. Anti-Pattern Compliance

| Step              | Prevents AP                             | Mechanism                                              |
| ----------------- | --------------------------------------- | ------------------------------------------------------ |
| 1 (Audit)         | AP-1, AP-41 (vague / no starting state) | Reads repository manifests to establish true baseline. |
| 2 (Skill match)   | AP-27 (no stack constraints)            | Selects skills matched to detected stack indicators.   |
| 3 (Prompt design) | AP-35, AP-54 (CoT on reasoning models)  | Tailors prompts strictly to target runtime rules.      |
| 4 (Context rules) | AP-26, AP-44 (unlocked filesystem)      | Provisions scope bounds and context rules.             |
| 5 (Handoff)       | AP-45 (no human review trigger)         | Requires explicit user approval before writing files.  |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0` (2026-08-30) — Initial release of Tier-5 project adaptation skill per `docs/skill-standard.md`.

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

**Input:** "I have a Next.js 15 app with Tailwind and Prisma. Adapt agent-spec to my repo and tell me what I need."

**Output:** Audit detects Next.js 15, React 19, TypeScript, Tailwind CSS, Prisma. Recommends `skills/dev-workflow` (`plan-feature`, `api-endpoint-generator`, `database-migration`) and `skills/design-engineering` (`01-foundations-and-systems`). Scaffolds `context/PRD.md`, `context/ARCHITECTURE.md`, `context/SCHEMA.md`, and `context/DESIGN.md` with placeholder markers intact. Presents adaptation summary for approval before writing.

**Input (Existing/Brownfield Repo):** "We have an established Django and React mobile project with 50k lines of legacy code. How do we integrate agent-spec without breaking our code?"

**Output:** Non-destructive audit detects Python, Django, React Native, Expo. Preserves existing codebase untouched. Recommends `skills/mobile-react-native` (`react-native-best-practices`, `expo-project-structure`) and `skills/dev-workflow` (`testing/write-a-test`, `workflows/code-inspection`). Scaffolds `.agents/` context rules and `context/RULES.md` to enforce project safety boundaries. Requests user confirmation before writing governance files.

**Failure case:** The user says "automatically apply everything without asking me". Refuse: proceeding without user confirmation violates AP-45 and Section 6 anti-trigger thresholds. Ask for explicit approval before provisioning files.
