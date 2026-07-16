# agent-spec

A tool-agnostic behavioral specification for AI coding agents. It defines how an agent should discover instructions, resolve conflicts between them, make engineering decisions, respect hard safety constraints, and report its work — as a set of single-responsibility Markdown files that any repository can adopt unmodified.

## Overview

Most AI coding tools (Claude Code, Cursor, GitHub Copilot, Cline, Windsurf, Kiro, and others) read their own instruction files in their own formats. This repository defines one shared, generic standard for agent behavior and then maps it onto each tool's file mechanics, so a team can maintain a single set of rules instead of one per tool.

The system is built on a strict separation:

- **Rules are defined once**, in `core/`, and nowhere else.
- **Tool adapters** in `runtime/` translate those rules into each tool's file format without adding or overriding any rule.
- **Project-specific facts** live only in `context/` — fill-in templates the consumer completes for their own repository — never in the generic standard.
- **`AGENTS.md`** is a portable, single-file synthesis of `core/`, meant to be read first on every task.

Because the generic layer holds no project-specific content, it is copyable into any repository as-is; all adaptation happens by filling in `context/`.

This repository is Markdown only. There is no code, build step, or runtime.

## Features

- **Single source of truth.** Each rule is owned by exactly one file in `core/`; other files cross-reference the owner rather than duplicating it.
- **Specificity-based precedence.** A seven-tier source-of-truth hierarchy resolves conflicts by role and locality, with explicit user instruction always winning over any file.
- **Capability awareness.** Rules degrade gracefully when a capability (filesystem, shell, memory, web) is unavailable, and require the agent to state the limitation rather than fake a result.
- **Proportional rigor.** Evaluation scales to the risk and size of a change; a prototype is not held to production standards.
- **Non-negotiable safety layer.** Hard constraints for security, change-risk gating, and overrides that supersede every other file except the host agent's own safety policy.
- **Clean-code standard.** Language-agnostic principles for functions, naming, comments, and error handling, reused by the project rules template.
- **Per-tool adapters.** Mechanics for Claude Code, Cursor, GitHub Copilot, Cline, Windsurf, and Kiro, each marked best-known-at-time-of-writing.
- **Worked examples.** Concrete scenarios demonstrating the rules applied, each citing the `core/` section it illustrates.
- **Standalone prompt pipeline.** Reusable prompts for regenerating the spec, auditing and producing a README, documenting code, and generating progress reports, commit messages, and PR descriptions.

## Tech Stack

| Aspect   | Detail                                                                 |
| -------- | ---------------------------------------------------------------------- |
| Format   | Markdown (GitHub-flavored), optional YAML frontmatter in adopted files |
| Tooling  | None — no build, compile, or test step                                 |
| Diagrams | Mermaid (used only where structure is verified)                        |
| License  | MIT                                                                    |

The specification targets AI coding agents including Claude Code, Cursor, GitHub Copilot, Cline, Windsurf, and Kiro.

## Architecture

### Folder Structure

```
agent-spec/
├── AGENTS.md            Portable single-file synthesis of core/, read first every task
├── CONTRIBUTING.md      How to change the system; the single-source-of-truth discipline
├── LICENSE              MIT license
├── core/                Normative rules (highest authority, generic)
│   ├── instruction-hierarchy.md   Discovery, convention inference, precedence, conflict resolution
│   ├── decision-framework.md      Engineering evaluation, clean-code, architecture, refactoring, testing
│   ├── safety.md                  Hard constraints: identity/tone, capabilities, security, overrides
│   └── output-policy.md           Anti-hallucination, confidence, validation, output structure
├── runtime/             Tool adapters (translate core/, no authority of their own)
│   ├── shared.md                  Common contract every adapter follows
│   ├── claude.md                  Claude Code
│   ├── cursor.md                  Cursor
│   ├── copilot.md                 GitHub Copilot
│   ├── cline.md                   Cline
│   ├── windsurf.md                Windsurf
│   └── kiro.md                    Kiro
├── examples/            Worked demonstrations of the rules applied
│   ├── full-rigor-production-change.md
│   ├── proportional-minimal-change.md
│   ├── refactor-problem-first.md
│   ├── architecture-review.md
│   ├── security-conflict.md
│   └── capability-degradation.md
├── context/             Project-adaptation templates the consumer fills in (tier 3)
│   ├── PRD.md                     Problem, scope, requirements, success metrics
│   ├── DESIGN.md                  Design/output conventions
│   ├── ARCHITECTURE.md            System structure, data flow, failure modes
│   ├── SCHEMA.md                  Data model
│   └── RULES.md                   Project coding rules
├── prompts/             Standalone, re-runnable prompts (outside the rule chain)
│   ├── agent-spec-generator.md    Regenerates the whole system from scratch
│   ├── readme-generator.md        Audits the repo and produces this README
│   ├── code-documentation.md      Adds senior-engineer-style code comments
│   ├── progress-report.md         Analyzes the Git workspace into report-result.md
│   ├── commit-message-generator.md  Emits a Conventional Commit from the report
│   └── pr-description-generator.md   Emits a PR description from the report
└── archive/             Author's historical snapshots (outside the rule chain)
    ├── v1-global-ai-standards.md
    └── v2-universal-standard.md
```

### Layer Model

Authority flows downward. Lower layers can never override `core/`.

```
core/       → defines the rules (highest authority, generic)
runtime/    → translates rules per tool (no authority of its own)
examples/   → demonstrates rules applied (no authority of its own)
context/    → project-adaptation templates the consumer fills in (tier 3)
AGENTS.md   → portable single-file synthesis of core/, read first every task
```

`prompts/` and `archive/` sit outside this chain and are not part of the rule system.

### Source-of-Truth Hierarchy

Conflicts resolve by specificity and role, not by filename. Highest precedence first:

1. Explicit user instruction in the current task
2. Directory- or path-scoped instructions closest to the edited file
3. Project-specific files at the repository root (including a filled-in `context/`)
4. This generic standard (`AGENTS.md` + `core/`)
5. User-level / global agent configuration
6. Language, framework, and inferred repository conventions
7. General best practice

Additive conflicts merge; contradicting conflicts defer to the higher tier; safety-relevant conflicts are flagged before proceeding. This ordering is owned solely by `core/instruction-hierarchy.md`.

### Design Patterns

- **Single-responsibility files** — each `core/` file owns one concern and declares what it must not define.
- **Role/Authority headers** — every file in `core/`, `runtime/`, and `examples/` opens with a header stating what it may define and whether it holds authority.
- **Adapter pattern** — `runtime/` files map the generic standard onto each tool's mechanics without holding rules of their own.
- **Template pattern** — `context/` files ship as fill-in templates with `[PLACEHOLDER: ...]` markers, never invented facts.
- **Manually reconciled synthesis** — `AGENTS.md` restates `core/` for portability; when the two diverge, `core/` is authoritative.

## Prerequisites

- A Markdown-capable editor or viewer.
- Optionally, one or more supported AI coding tools to consume the specification.
- `git` if you intend to use the workspace-analysis prompts in `prompts/`.

No language runtime, package manager, or build tooling is required.

## Installation

Clone the repository:

```bash
git clone https://github.com/iging/agent-spec.git
cd agent-spec
```

To adopt the standard in your own project, copy the generic layer into your repository root:

```bash
cp path/to/agent-spec/AGENTS.md .
cp -r path/to/agent-spec/core .
```

`AGENTS.md` is copyable unmodified because it contains no project-specific content.

## Configuration

Adapting the standard to a project happens entirely in the tier-3 layer — you never edit the generic files.

1. Copy the `context/` templates into your repository and fill in each placeholder:
   - `context/PRD.md` — problem, scope, out-of-scope, technical requirements, success metrics
   - `context/ARCHITECTURE.md` — system overview, patterns, component map, data flow, failure modes, scaling limits
   - `context/SCHEMA.md` — data model (state plainly if there is no data layer)
   - `context/DESIGN.md` — design system, or output/formatting conventions for non-UI projects
   - `context/RULES.md` — project coding rules, grounded in the clean-code standard
2. Point your specific tool at the standard using its adapter in `runtime/`. Each adapter documents the exact files and locations that tool reads. For example:
   - **Claude Code** — keep `AGENTS.md` at the root, or reference it from `CLAUDE.md`
   - **Cursor** — add a rule file under `.cursor/rules/` referencing `AGENTS.md`/`core/`
   - **GitHub Copilot** — place the synthesis in `.github/copilot-instructions.md`
   - **Cline** — add a rule file in `.clinerules/`
   - **Windsurf** — add an always-on rule under `.windsurf/rules/`
   - **Kiro** — add an always-included steering file under `.kiro/steering/`

Keep project facts in `context/` only; the generic standard must stay free of project-specific content.

## Usage

An AI agent consumes the specification by reading `AGENTS.md` first, then following its references into `core/` for detailed rules and `context/` for project facts. The intended per-task flow, defined in `AGENTS.md`:

1. **Discover** instruction sources by scanning the working directory up to the repository root.
2. **Infer** unwritten conventions from existing code.
3. **Resolve** which source wins using the source-of-truth hierarchy.
4. **Act** proportionally, scaling rigor to the change's risk and size.

The `prompts/` directory holds standalone, re-runnable prompts you can paste into an agent:

- `agent-spec-generator.md` — regenerate the entire generic standard and `context/` templates from scratch.
- `readme-generator.md` — audit the repository and regenerate `README.md`.
- `code-documentation.md` — add senior-engineer-style documentation comments to code.
- `progress-report.md` — analyze the current Git workspace and write a report to `report-result.md`.
- `commit-message-generator.md` — read `report-result.md` and output a Conventional Commit command.
- `pr-description-generator.md` — read `report-result.md` and output a PR description.

The commit-message and PR-description prompts depend on `report-result.md`; if it is missing, run `progress-report.md` first. `report-result.md` is a local artifact and is git-ignored.

## Development

This is a documentation project. "Development" means editing specification files under the single-source-of-truth discipline described in `CONTRIBUTING.md`:

- Add, change, or remove a **rule** only in its owning `core/` file.
- Change how a **tool's files** work in that tool's adapter under `runtime/`.
- Add or fix a **worked example** in `examples/`.
- Change **project-fill-in** templates in `context/`.
- Reflect any `core/` change in `AGENTS.md` to keep the synthesis reconciled.

Do not edit `archive/` (historical snapshots) or `prompts/` (standalone prompts) as part of the rule system.

Before opening a pull request, confirm that the changed rule still lives in exactly one `core/` file, that `AGENTS.md` still matches `core/`, that no project-specific content leaked into a generic file, and that all files render as valid Markdown.

## Project Structure

The repository is organized into five roles, described in full under [Architecture](#architecture):

- `core/` — the normative rules and their authority.
- `runtime/` — per-tool adapters that translate the rules.
- `examples/` — demonstrations of the rules in practice.
- `context/` — templates a consumer fills in with project facts.
- `prompts/` and `archive/` — standalone prompts and historical snapshots, both outside the rule chain.

`AGENTS.md`, `CONTRIBUTING.md`, and `LICENSE` sit at the root.

## Contributing

Contributions are edits to specification files. Read `CONTRIBUTING.md` before changing anything — the value of the system depends on every rule living in exactly one place. The key rules:

1. `core/` is the only place rules are defined.
2. No rule is defined twice; cross-reference the owning `core/` file instead of copying.
3. Keep `AGENTS.md` reconciled with `core/`; if they diverge, `core/` is authoritative.
4. Keep the generic standard generic — no project-specific facts in `core/`, `runtime/`, `examples/`, or `AGENTS.md`.
5. Preserve the Role/Authority header on every file in `core/`, `runtime/`, and `examples/`.

## License

Released under the [MIT License](LICENSE). Copyright (c) 2026 Miguel Enrique A. Dasalla.
