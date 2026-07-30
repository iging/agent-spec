---
name: repo-reorganizer
description: |-
  Reorganizes flat or messy repository file structures into professional, open-source-grade folder layouts with self-documenting names, per-folder READMEs, and migration commands.
  TRIGGER — use this skill whenever: the user asks to reorganize, restructure, or clean up a repository's folder structure; the user mentions making files "reusable" or "understandable" for contributors/followers; the user wants to convert a flat file dump into a proper open-source project layout; OR the task involves renaming, regrouping, or creating a folder taxonomy for an existing collection of prompts, skills, specs, or documentation files.
  SKIP only when: the user is asking about a single file's content (not its location); the task is about writing new content rather than organizing existing content; OR the user explicitly states they want to keep the current structure and only modify file contents.
---

# Prompt: Reorganize agent-spec into a Professional Open-Source Repository Structure

## Role

Act as a **Senior Open-Source Repository Architect** and **Developer Experience (DX) Engineer** with deep expertise in structuring public GitHub repositories for maximum discoverability, reusability, and contributor onboarding.

## Objective

Reorganize the flat `files/` directory of the `agent-spec` repository into a professional, clearly-named folder structure that any developer, AI practitioner, or open-source follower can navigate, understand, and reuse in their own projects within 60 seconds of landing on the repo.

**Success criteria:**

1. Every file has exactly one home in a descriptively-named folder.
2. A new contributor can find any file by folder name alone, without reading a README first.
3. All files are directly reusable: a user can copy any folder into their own project and it works standalone.
4. Internal cross-references (`core/`, `runtime/`, `context/`, `examples/`) still resolve correctly after the move.
5. A root-level `README.md` and per-folder `README.md` files explain what each folder contains and how to use it.

---

## Input — Current File Inventory

Here is the complete inventory of `files/` you must reorganize. Every file listed below must appear in your proposed structure. Do not omit, merge, or delete any file.

### Standalone Markdown Files (37 files)

| Current Path                      | Purpose / Category                                                              |
| --------------------------------- | ------------------------------------------------------------------------------- |
| `01-progress-report.md`           | **Dev workflow prompt** — Git workspace progress report generator               |
| `02-commit-message-generator.md`  | **Dev workflow prompt** — Conventional commit message generator                 |
| `03-pr-description-generator.md`  | **Dev workflow prompt** — Pull request description generator                    |
| `04-code-documentation.md`        | **Dev workflow prompt** — Production code documentation generator               |
| `05-prompt-engineer-mentor.md`    | **Learning prompt** — Prompt engineering mentor and teacher                     |
| `06-blog-generator.md`            | **Content creation prompt** — Technical blog post generator                     |
| `07-image-generation.md`          | **Content creation prompt** — Text-to-image prompt builder                      |
| `08-readme-generator.md`          | **Dev workflow prompt** — Architecture audit and README generator               |
| `09-agent-spec-generator.md`      | **Meta/generator prompt** — Regenerates the agent-spec system itself            |
| `ARCHITECTURE.md`                 | **Project template** — System architecture template (Tier-3, fill-in)           |
| `DESIGN.md`                       | **Project template** — Design system and output conventions template            |
| `PRD.md`                          | **Project template** — Product requirements document template                   |
| `RULES.md`                        | **Project template** — Coding standards and architecture rules template         |
| `SCHEMA.md`                       | **Project template** — Database and API schema template                         |
| `anti-patterns.md`                | **Core spec** — 37 credit-killing prompt patterns reference                     |
| `architecture-review.md`          | **Example** — Architecture review scenario demonstration                        |
| `capability-degradation.md`       | **Example** — Graceful capability degradation demonstration                     |
| `claude.md`                       | **Runtime adapter** — Claude Code file mechanics mapping                        |
| `cline.md`                        | **Runtime adapter** — Cline file mechanics mapping                              |
| `copilot.md`                      | **Runtime adapter** — GitHub Copilot file mechanics mapping                     |
| `cursor.md`                       | **Runtime adapter** — Cursor rules mechanics mapping                            |
| `decision-framework.md`           | **Core spec** — Engineering decision evaluation framework                       |
| `faq.md`                          | **Documentation** — Frequently asked questions                                  |
| `full-rigor-production-change.md` | **Example** — Full-rigor production change demonstration                        |
| `getting-started.md`              | **Documentation** — 5-minute adoption guide                                     |
| `instruction-hierarchy.md`        | **Core spec** — Instruction discovery, precedence, and conflict resolution      |
| `kiro.md`                         | **Runtime adapter** — Kiro file mechanics mapping                               |
| `output-policy.md`                | **Core spec** — Anti-hallucination, confidence, and output presentation         |
| `proportional-minimal-change.md`  | **Example** — Trivial/low-risk change scaling demonstration                     |
| `refactor-problem-first.md`       | **Example** — Problem-first refactoring demonstration                           |
| `safety.md`                       | **Core spec** — Hard constraints, identity, capability boundaries               |
| `security-conflict.md`            | **Example** — Security conflict resolution demonstration                        |
| `shared.md`                       | **Runtime adapter** — Shared adapter contract                                   |
| `v1-global-ai-standards.md`       | **Legacy/versioned** — V1 global AI standards (predecessor)                     |
| `v2-universal-standard.md`        | **Core spec** — AGENTS.md universal standard (V2, canonical)                    |
| `windsurf.md`                     | **Runtime adapter** — Windsurf file mechanics mapping                           |
| `writing-rules.md`                | **Shared utility** — Reusable writing style rules, banned words, truth protocol |

### Subdirectories with SKILL.md Files (Skills — 28 directories)

Each of these contains a `SKILL.md` file and is a standalone, reusable AI skill/prompt:

| Current Path                 | Category                         |
| ---------------------------- | -------------------------------- |
| `_template/`                 | **Meta** — Blank skill template  |
| `client-brief/`              | **Business/consulting**          |
| `deck-builder/`              | **Content creation**             |
| `deep-research-synthesizer/` | **Research**                     |
| `delete-ai-words/`           | **Writing/editing**              |
| `excel-style/`               | **Data/productivity**            |
| `fable-prompter/`            | **Creative writing**             |
| `fact-checker/`              | **Research/verification**        |
| `grill-me/`                  | **Interview/planning**           |
| `handoff/`                   | **Dev workflow**                 |
| `hormozi-viral-1/`           | **Social media/marketing**       |
| `how-to/`                    | **Learning/tutorial**            |
| `humanizer/`                 | **Writing/editing**              |
| `i-have-adhd/`               | **Productivity/accessibility**   |
| `infographic-builder/`       | **Content creation/visual**      |
| `linkedin-hook/`             | **Social media/marketing**       |
| `linkedin-post-report/`      | **Social media/marketing**       |
| `meeting-notes/`             | **Business/productivity**        |
| `meeting-visualizer/`        | **Business/productivity**        |
| `my-viral-linkedin-post/`    | **Social media/marketing**       |
| `negotiation/`               | **Business/communication**       |
| `personal-voice/`            | **Writing/editing**              |
| `prompt-engineering/`        | **Learning**                     |
| `prompt-master/`             | **Learning**                     |
| `red-pen/`                   | **Writing/editing**              |
| `reddit-researcher/`         | **Research/social media**        |
| `sound-like-your-posts/`     | **Writing/editing**              |
| `tc-social-carousel/`        | **Social media/marketing**       |
| `the-team/`                  | **Business/team**                |
| `viral-recipe/`              | **Social media/marketing**       |
| `write-a-skill/`             | **Meta** — Skill authoring guide |
| `xlsx/`                      | **Data/productivity**            |

### Subdirectories with AGENTS.md + context/ (Starter Kits — 2 directories)

| Current Path | Purpose                                             |
| ------------ | --------------------------------------------------- |
| `web/`       | Pre-configured agent-spec setup for web projects    |
| `mobile/`    | Pre-configured agent-spec setup for mobile projects |

### Other Subdirectory

| Current Path | Purpose                          |
| ------------ | -------------------------------- |
| `48/`        | Unknown — inspect and categorize |

---

## Constraints

1. **Folder names must be self-documenting.** A developer who has never seen this repo must understand what a folder contains from its name alone. Use lowercase-kebab-case. Avoid abbreviations, jargon, or numbered prefixes.
2. **Preserve reusability.** Each folder must work as a standalone copy-paste unit. A user should be able to copy `skills/writing/humanizer/` into their own project and it works without dependencies on sibling folders.
3. **No file content changes in the first pass.** Propose the folder structure and file mapping first. Content edits (updating internal cross-references like `core/`, `runtime/`, `context/`) come in a second pass after I approve the structure.
4. **Maintain the existing file naming.** Do not rename files unless the current name is genuinely confusing. Renaming `05-prompt-engineer-mentor.md` to `prompt-engineer-mentor.md` (dropping the number prefix) is acceptable. Renaming `safety.md` to something else is not.
5. **Group by purpose, not by file type.** "All the `.md` files" is not a valid grouping. Group by what the file does for the user.
6. **Skills stay as directories.** Each skill is a folder with at least a `SKILL.md` inside. Do not flatten skills into single files.
7. **Include a `_template/` or `_starter/` mechanism** so users can create new skills from a blank template.
8. **Maximum two levels of nesting** from the repository root. `skills/writing/humanizer/SKILL.md` is fine. `skills/writing/editing/humanizer/SKILL.md` is too deep.

---

## Required Output

### Part 1 — Proposed Folder Structure

Output a complete directory tree showing every file in its new location. Use this format:

```
agent-spec/
├── README.md                          # Repository overview, quick-start, table of contents
├── AGENTS.md                          # The universal standard (currently v2-universal-standard.md)
├── [folder-name]/
│   ├── README.md                      # What this folder contains and how to use it
│   ├── [file.md]
│   └── ...
├── [folder-name]/
│   ├── [subfolder]/
│   │   └── SKILL.md
│   └── ...
└── ...
```

### Part 2 — Migration Map

A table mapping every current file path to its new path:

| Current Path      | New Path         | Reason for Move                                          |
| ----------------- | ---------------- | -------------------------------------------------------- |
| `files/safety.md` | `core/safety.md` | Core behavioral spec, grouped with other core spec files |
| ...               | ...              | ...                                                      |

### Part 3 — README Outlines

For each new top-level folder, provide a 3-5 line README outline explaining:

- What the folder contains
- Who should use it
- How to use the contents (copy-paste, reference, fill-in, etc.)

### Part 4 — Cross-Reference Update Plan

List every internal cross-reference (e.g., `core/decision-framework.md §5`) found in any file, and whether it still resolves correctly after the move. Flag any that need updating.

### Part 5 — Git Commands

Provide the exact `git mv` commands to execute the migration, preserving Git history. Group commands by destination folder.

---

## Rules

1. **Do not execute any changes.** Output the plan only. I will review and approve before any files move.
2. **Account for every file.** If a file from the inventory is missing from your proposed structure, that is a failure. Cross-check your output against the inventory above.
3. **Explain your grouping rationale.** For each top-level folder, state in one sentence why these files belong together and not somewhere else.
4. **Flag ambiguous files.** If a file could reasonably live in two folders, list both options and recommend one with reasoning.
5. **Optimize for the open-source follower.** The primary user is someone who found this repo, wants to grab useful prompts/skills for their own AI workflows, and needs to understand the structure immediately. Design for them.

---

## What This Prompt Does NOT Cover

- Writing or rewriting the content of any file
- Creating a documentation site or wiki
- CI/CD pipeline setup
- License selection
- Publishing to a package registry
