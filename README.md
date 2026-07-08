# agent-spec

A modular, tool-agnostic specification for how AI coding agents should discover instructions, make engineering decisions, respect safety constraints, and format output.

## Overview

`agent-spec` is a documentation-only repository: a Markdown specification, not an application. It defines a behavioral standard for AI coding agents (Claude Code, Cursor, GitHub Copilot, Cline, Windsurf, Kiro, and others) and decomposes that standard into single-responsibility files instead of one monolithic prompt, so each rule has exactly one place it's defined and one file that owns it.

The repository has no source code, no build system, and no dependencies. It is consumed by copying or referencing its Markdown files from a project's own agent-configuration files (`CLAUDE.md`, `.cursor/rules/**`, `.clinerules`, `.windsurfrules`, `.kiro/steering/**`, or an `AGENTS.md`).

## Features

- **Layered rule system.** `core/` defines the actual standard; `runtime/` and `examples/` depend on it and cannot override or contradict it.
- **Four independently-scoped `core/` modules** — instruction precedence, engineering decision-making, hard safety constraints, and output presentation — each with a declared Role and Authority so no file can be mistaken for a peer of another when it isn't one.
- **Six tool-specific runtime adapters** (Claude Code, Cursor, GitHub Copilot, Cline, Windsurf, Kiro) that translate the same core rules into each tool's actual file format and mechanical constraints, without redefining any rule.
- **Eight worked examples** demonstrating `core/` rules applied to concrete scenarios, each citing the specific `core/` file and section it demonstrates.
- **A portable single-file synthesis** (`AGENTS.md`) of the four `core/` modules, meant to be copied unmodified into any project without depending on the rest of this repository.
- **Standalone task prompts** (`prompts/`) for code documentation, git progress reporting, commit message generation, PR description generation, and README generation — usable independently of the core/runtime/examples chain.

## Tech Stack

This repository contains Markdown files only. There is no application code, no package manifest, no build tool, and no test runner to detect.

## Architecture

### Layering model

```
core/       → defines the rules (highest authority)
runtime/    → translates those rules per tool (no authority of its own)
examples/   → demonstrates the rules applied correctly (no authority of its own)
prompts/    → standalone, unrelated to this chain entirely
```

`runtime/` and `examples/` both depend on `core/` and must remain consistent with it; neither can introduce a new rule, override a `core/` file, or be treated as a source of truth in its own right. If a runtime or example file appears to contradict `core/`, `core/` is correct and the other file has a bug. `prompts/` sits outside this dependency chain — it does not inherit `core/` rules automatically, and a prompt file must state explicitly if it's meant to respect any part of the spec.

### Folder structure

```
agent-spec/
├── AGENTS.md                     Portable single-file synthesis of core/ (see note on filename collision below)
├── CONTRIBUTING.md               How to propose changes to this spec
├── LICENSE                       MIT License
├── core/                         Normative rules — the actual standard
├── runtime/                      Per-tool adapters translating core/ into tool-specific file formats
├── examples/                     Worked scenarios demonstrating core/ rules applied correctly
├── prompts/                      Standalone, task-specific prompt templates
└── history/                      Deprecated, non-normative snapshots of earlier spec versions
```

### A note on the `AGENTS.md` filename

The industry has since converged on `AGENTS.md` as an open, Linux Foundation-governed standard (via the [Agentic AI Foundation](https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation)) for _operational, project-specific_ agent context — build commands, test commands, project setup ([agents.md](https://agents.md/)). This repository's root `AGENTS.md` predates widespread awareness of that convention and serves a different purpose: it's a portable _behavioral/safety governance layer_ (instruction precedence, engineering tradeoffs, safety constraints, output formatting), not operational project context. The two are complementary — a project can keep an operational `AGENTS.md` with its own stack/commands and separately adopt this repository's rules (via `core/` or the root `AGENTS.md` synthesis) for agent conduct. See the note at the top of the root `AGENTS.md` for the precedence relationship.

### `core/` — normative rules

| File                       | Responsibility                                                                                                                                                                                                                                         |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `instruction-hierarchy.md` | Discovery of instruction sources, convention inference, source-of-truth precedence, and conflict resolution. The only file that ranks instruction sources against each other.                                                                          |
| `decision-framework.md`    | Engineering evaluation and tradeoff logic — correctness, architecture, dependency governance, code generation, architecture review, refactoring, and testing standards. Deliberately blind to file precedence; reasons about engineering quality only. |
| `safety.md`                | Hard, non-negotiable constraints — identity constraints, capability boundaries, security standards, override rules, failure handling, and change risk management. Overrides everything else in this spec except an explicit host-agent safety policy.  |
| `output-policy.md`         | How results are presented — anti-hallucination handling, confidence reporting, validation requirements, and adaptive output structure. Presentation layer only; cannot influence a decision already made.                                              |

`core/decision-framework.md` Section 6 (Testing Standards) states that tests are not added unless requested or already conventional in a project — the spec does not default to generating tests uninvited.

`history/AGENTS-V1.md` and `history/AGENTS-V2.md` are retained as historical snapshots of earlier, monolithic versions of this standard, kept outside `core/` since they are not live modules, are not kept in sync with the current standard, and (in V1's case) contradict current rules (e.g. `safety.md`'s tone constraints). Nothing else in this spec references them.

### `runtime/` — tool adapters

| File          | Tool                                                                                                                                                  |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `shared.md`   | Common contract every runtime adapter follows; defines what belongs in a runtime file versus `core/`.                                                 |
| `claude.md`   | Claude Code — `CLAUDE.md` discovery, subdirectory nesting, `@path` imports.                                                                           |
| `cursor.md`   | Cursor — `.cursor/rules/*.mdc` frontmatter and activation modes, legacy `.cursorrules` fallback.                                                      |
| `copilot.md`  | GitHub Copilot — `.github/copilot-instructions.md`, path-scoped `.github/instructions/*.instructions.md`, the 4,000-character code-review read limit. |
| `cline.md`    | Cline — global vs. workspace rules, Rules vs. Workflows distinction, multi-root workspace caveat.                                                     |
| `windsurf.md` | Windsurf — `.windsurfrules` character-limit constraint and its practical implications for spec fidelity.                                              |
| `kiro.md`     | Kiro — `.kiro/steering/*.md` inclusion modes (`always`/`fileMatch`/`manual`), `#[[file:...]]` imports, session types and autonomy modes.              |

### `examples/` — behavior demonstrations

| File                                  | Demonstrates                                                                                                                                    |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `backend-service.md`                  | Full rigor on a production, shared-service change (`decision-framework.md`, `safety.md`).                                                       |
| `refactor-example.md`                 | Stating the problem before refactoring and scoping the fix to it (`decision-framework.md`).                                                     |
| `architecture-review.md`              | Hidden-coupling and debuggability checks on a proposed design (`decision-framework.md`).                                                        |
| `security-review.md`                  | Security standards applied, including a case where a user instruction conflicts with `safety.md` and safety wins (`safety.md`).                 |
| `minimal-change-vs-overengineered.md` | The same small task solved two ways, showing proportional rigor versus uniform over-application of every rule (`decision-framework.md`).        |
| `conflicting-instructions.md`         | Two ordinary tier-3 files disagreeing on convention, with no safety concern involved (`instruction-hierarchy.md`).                              |
| `frontend-component.md`               | The decision framework applied to a UI task, showing it isn't backend-specific (`decision-framework.md`).                                       |
| `capability-degradation.md`           | An agent without shell access stating verification couldn't run, instead of fabricating a passed test result (`safety.md`, `output-policy.md`). |

### `prompts/` — standalone task prompts

Independent, self-contained prompt templates unrelated to the `core`/`runtime`/`examples` chain. Each would still be useful even if the rest of `agent-spec` didn't exist.

| File                          | Purpose                                                                                                                                            |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `code-documentation.md`       | Senior-engineer-style code commenting guidance.                                                                                                    |
| `progress-report.md`          | Git workspace analysis — generates `report-result.md` containing the progress report, branch name, commit message, and PR description in one pass. |
| `commit-message-generator.md` | Extracts just the commit message from `report-result.md`.                                                                                          |
| `pr-description-generator.md` | Extracts just the PR description from `report-result.md`.                                                                                          |
| `readme-generator.md`         | Architecture audit and evidence-based README generation prompt.                                                                                    |

## Installation

There is nothing to install. Clone or copy the repository, or copy individual files into a target project:

```bash
git clone https://github.com/iging/agent-spec.git
```

## Usage

This spec is not executed directly — it's wired into a specific AI tool's own instruction-loading mechanism:

- **Claude Code:** import the relevant `core/*.md` files from a project's `CLAUDE.md` using `@agent-spec/core/instruction-hierarchy.md`-style imports (see `runtime/claude.md`).
- **Cursor:** translate the relevant `core/` sections into `.cursor/rules/*.mdc` files with appropriate `alwaysApply`/`globs` frontmatter (see `runtime/cursor.md`).
- **Copilot:** place repo-wide rules in `.github/copilot-instructions.md`, keeping load-bearing content within the first 4,000 characters (see `runtime/copilot.md`).
- **Cline:** place project rules in `.clinerules/` (see `runtime/cline.md`).
- **Windsurf:** condense into `.windsurfrules`, respecting its character limit (see `runtime/windsurf.md`).
- **Kiro:** place always-included rules in `.kiro/steering/*.md`, using `#[[file:...]]` imports to reference `core/*.md` instead of duplicating it (see `runtime/kiro.md`).

The repository's root `AGENTS.md` is a separate, single-file, self-contained version of this same standard, intended to be portable — copied unmodified into any project without needing this repository's folder structure alongside it. `core/` is the decomposed authoring source for the same rules; the two are not currently kept in automatic sync and should be reconciled manually when either is updated (see `CONTRIBUTING.md`).

## Development

- To add a new rule: add it to the relevant `core/*.md` file only. Do not add engineering rules to `runtime/`, `examples/`, or `prompts/`.
- To add support for a new AI tool: add a new file to `runtime/`, following the Role/Authority header pattern already used in `shared.md` and the existing tool adapters, and verify the tool's actual documented behavior before writing — tool file formats and constraints change between vendor releases.
- To add a new example: add a new file to `examples/`, cite the specific `core/` file and section it demonstrates, and include the same Role/Authority header used in the existing example files.
- To add a new standalone prompt: add it to `prompts/`, with no expectation that it inherits any rule from `core/` unless the prompt states so explicitly.

## Contributing

See `CONTRIBUTING.md` for the full guide. In short: changes to `core/` should be made deliberately — a change here affects every `runtime/` adapter, every `examples/` file that references it, and the root `AGENTS.md` synthesis. When changing a `core/` rule, check whether `examples/` still accurately demonstrates it and whether `AGENTS.md` needs the same edit.

## License

MIT License. See `LICENSE`.
