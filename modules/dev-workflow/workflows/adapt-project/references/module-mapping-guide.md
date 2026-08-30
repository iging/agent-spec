# Module Mapping Reference Guide

## Purpose

This guide maps project technology indicators, domains, and workspace profiles to matching agent-spec capability suites, skills, and context templates.

---

## 1. Domain and Module Mapping

| Project Category             | Technology Indicators                       | Recommended agent-spec Module       | Key Skills to Provision                                                                          | Context Templates Needed                             |
| ---------------------------- | ------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------- |
| Full-Stack / Web App         | React, Next.js, Node.js, TypeScript, Vue    | `modules/dev-workflow`              | `plan-feature`, `api-endpoint-generator`, `database-migration`, `accessibility-auditor`          | `PRD.md`, `ARCHITECTURE.md`, `SCHEMA.md`, `TASKS.md` |
| Mobile Application           | React Native, Expo, iOS, Android            | `modules/mobile-react-native`       | `expo-project-structure`, `expo-tailwind-setup`, `react-native-best-practices`                   | `PRD.md`, `ARCHITECTURE.md`, `DESIGN.md`             |
| Design & UI Systems          | Tailwind, CSS Modules, Design Tokens, Figma | `modules/design-engineering`        | `01-foundations-and-systems`, `02-aesthetic-engines-and-styles`                                  | `DESIGN.md`, `RULES.md`                              |
| Autonomous / Multi-Agent Dev | Long-running tasks, CLI agents, PR loops    | `modules/autonomous-dev`            | `03-planning-and-decomposition`, `04-execution-and-orchestration`, `07-code-review-and-feedback` | `PRD.md`, `ARCHITECTURE.md`, `RULES.md`              |
| Prompt & AI Engineering      | Model routing, system prompts, evaluation   | `modules/prompt-engineering`        | `prompt-auditor-skill`, `prompt-master-skill`                                                    | `RULES.md`                                           |
| Enterprise & Business        | Workflows, meeting notes, team specs        | `modules/enterprise-business`       | `business-skills/meeting-notes`, `business-skills/the-team`                                      | `PRD.md`, `RULES.md`                                 |
| Research & Synthesizing      | Market research, fact checking, data        | `modules/research-and-productivity` | `research/deep-research-synthesizer`, `research/editorial-fact-checker`                          | `PRD.md`, `RULES.md`                                 |
| Content & Marketing          | Documentation, blog, social strategy        | `modules/content-and-growth`        | `01-audience-and-strategy`, `05-distribution-and-seo`                                            | `PRD.md`, `RULES.md`                                 |

---

## 2. Shared File Mapping Rules

- `context/PRD.md`: Required when building new features, products, or user-facing workflows.
- `context/ARCHITECTURE.md`: Required when the project involves technical stack choices, APIs, or database boundaries.
- `context/SCHEMA.md`: Required when data models, database tables, or strict TypeScript interfaces are defined.
- `context/DESIGN.md`: Required when UI design tokens, component styling, or visual guidelines apply.
- `context/RULES.md`: Required for repository governance, safety boundaries, and team conventions.
- `shared/writing/writing-rules.md`: Required for any prompt or documentation generating user-facing copy.

---

## 3. Tool-Specific Adaptation Guidelines

- **Claude Code:** Front-load intent, specify file bounds explicitly, use present-tense imperative instructions.
- **Cursor / Windsurf:** Define clear starting state, target state, explicit allowed/forbidden file paths.
- **Cline:** Enforce step validation, human review triggers before file writes, and clear stop conditions.
- **Reasoning Models:** Keep instructions short and direct. Do not add Chain of Thought scaffolding.

---

## 4. Adaptation to Existing (Brownfield) Projects

When applying agent-spec to an existing codebase, follow these rules:

1. **Non-Destructive Audit:** Inspect existing `package.json`, build scripts, existing documentation, directory structures, and git commits. Never alter or overwrite existing application source code.
2. **Preserve Established Architecture:** Extract project patterns (such as folder structures, naming conventions, state management, database ORMs) and reflect them in the recommended `context/ARCHITECTURE.md` and `context/RULES.md`.
3. **Incremental Governance Setup:** Scaffold `agent-spec` files alongside existing documentation. If an existing `README.md` or `docs/` folder exists, place agent configurations in `.agents/` or `context/` without deleting existing files.
4. **Legacy Codebase Handling:** For repositories missing tests or strict type definitions, recommend `modules/dev-workflow/testing/write-a-test` or `modules/dev-workflow/workflows/code-inspection` to establish test coverage before introducing large refactors.

---

## 5. Zero-Context Repository Onboarding Protocol

When a target project lacks any `context/` directory or `.agents/` configuration files, execute this protocol:

1. **Classify Workspace Status:** Flag the repository as a Zero-Context Workspace. Do not treat missing governance files as an error.
2. **Reverse-Engineered Fact Discovery:** Read root files (`package.json`, build definitions, ORM schemata, router files) to extract established stack choices, dependencies, and environment assumptions automatically.
3. **Scaffold Context Directory:** Create the `context/` folder and copy required templates (`PRD.md`, `ARCHITECTURE.md`, `RULES.md`) containing `[PLACEHOLDER: ...]` markers upon user confirmation.
4. **Pre-Fill Verified Technical Facts:** Insert confirmed codebase facts (such as framework version, ORM type, directory boundaries) into `ARCHITECTURE.md` while leaving business placeholders intact for human review.
5. **Establish Safety Boundaries Immediately:** Create `context/RULES.md` to lock sensitive configuration files (such as `.env`, build scripts, database credentials) and restrict write access to target feature areas.
