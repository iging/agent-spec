# AGENT SPEC

A modular, tool-agnostic specification for how AI coding agents should discover instructions, make engineering decisions, respect safety constraints, and format output — decomposed into single-responsibility files instead of one monolithic prompt.

## Overview

`agent-spec` is the authored source for this repository's AI agent behavior standard. It exists because a single large instruction file tends to mix unrelated concerns — identity, decision logic, safety rules, and output formatting all in one place — which makes it hard to audit, hard to reuse across tools, and easy to accidentally duplicate or contradict a rule when editing.

This folder splits that standard into four independently-scoped categories, each with a declared role and authority level, so no file can be mistaken for a peer of another when it isn't one.

## Architecture

### Folder Structure

```
agent-spec/
├── core/        Normative rules — the actual standard
├── runtime/     Per-tool adapters that translate core/ into tool-specific file formats
├── examples/    Worked scenarios demonstrating core/ rules applied correctly
└── prompts/     Independent, task-specific prompt templates (not part of the core/runtime/examples chain)
```

### Layering Model

```
core/       → defines the rules (highest authority)
runtime/    → translates those rules per tool (no authority of its own)
examples/   → demonstrates the rules applied correctly (no authority of its own)
prompts/    → standalone, unrelated to this chain entirely
```

`runtime/` and `examples/` both depend on `core/` and must remain consistent with it; neither can introduce a new rule, override a `core/` file, or be treated as a source of truth in its own right. If a runtime or example file appears to contradict `core/`, `core/` is correct and the other file has a bug. `prompts/` sits outside this dependency chain — it does not inherit `core/` rules automatically, and a prompt file must state explicitly if it's meant to respect any part of the spec.

### core/ — Normative Rules

Four topic-scoped files, each with a single responsibility:

| File                       | Responsibility                                                                                                                                                                                                                                        |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `instruction-hierarchy.md` | Discovery of instruction sources, convention inference, source-of-truth precedence, and conflict resolution. The only file that ranks instruction sources against each other.                                                                         |
| `decision-framework.md`    | Engineering evaluation and tradeoff logic — correctness, architecture, dependency governance, code generation, architecture review, and refactoring standards. Deliberately blind to file precedence; reasons about engineering quality only.         |
| `safety.md`                | Hard, non-negotiable constraints — identity constraints, capability boundaries, security standards, override rules, failure handling, and change risk management. Overrides everything else in this spec except an explicit host-agent safety policy. |
| `output-policy.md`         | How results are presented — anti-hallucination handling, confidence reporting, validation requirements, and adaptive output structure. Presentation layer only; cannot influence a decision already made.                                             |

`core/AGENTS-V1.md` and `core/AGENTS-V2.md` are retained as historical snapshots of earlier, monolithic versions of this standard. They are not live modules and nothing else in this spec references them.

### runtime/ — Tool Adapters

Translates `core/` rules into the file formats and mechanical constraints of specific AI coding tools. Each file documents only what differs for its tool (file paths, frontmatter schema, size limits) — never a new engineering rule.

| File          | Tool                                                                                                                                                  |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `shared.md`   | Common contract every runtime adapter follows; defines what belongs in a runtime file versus `core/`.                                                 |
| `claude.md`   | Claude Code — `CLAUDE.md` discovery, subdirectory nesting, `@path` imports.                                                                           |
| `cursor.md`   | Cursor — `.cursor/rules/*.mdc` frontmatter and activation modes, legacy `.cursorrules` fallback.                                                      |
| `copilot.md`  | GitHub Copilot — `.github/copilot-instructions.md`, path-scoped `.github/instructions/*.instructions.md`, the 4,000-character code-review read limit. |
| `cline.md`    | Cline — global vs. workspace rules, Rules vs. Workflows distinction, multi-root workspace caveat.                                                     |
| `windsurf.md` | Windsurf — `.windsurfrules` character-limit constraint and its practical implications for spec fidelity.                                              |

### examples/ — Behavior Demonstrations

Each file shows `core/` rules applied to a concrete scenario. None define new rules; each cites the specific `core/` file and section it demonstrates.

| File                                  | Demonstrates                                                                                                                             |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `backend-service.md`                  | Full rigor on a production, shared-service change (`decision-framework.md`, `safety.md`).                                                |
| `refactor-example.md`                 | Stating the problem before refactoring and scoping the fix to it (`decision-framework.md`).                                              |
| `architecture-review.md`              | Hidden-coupling and debuggability checks on a proposed design (`decision-framework.md`).                                                 |
| `security-review.md`                  | Security standards applied, including a case where a user instruction conflicts with `safety.md` and safety wins (`safety.md`).          |
| `minimal-change-vs-overengineered.md` | The same small task solved two ways, showing proportional rigor versus uniform over-application of every rule (`decision-framework.md`). |

### prompts/ — Standalone Task Prompts

Independent, self-contained prompt templates unrelated to the `core`/`runtime`/`examples` chain. Each would still be useful even if the rest of `agent-spec` didn't exist.

| File                          | Purpose                                                                                                                                                                                          |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `code-documentation.md`       | Senior-engineer-style code commenting guidance.                                                                                                                                                  |
| `progress-report.md`          | Git workspace diff analysis and reporting.                                                                                                                                                       |
| `commit-message-generator.md` | Conventional Commit message generation from a progress report. Intentionally duplicated at the repository-root `prompts/commit-message-generator.md`; both copies are kept in sync deliberately. |

## Usage

This spec is not executed directly — it's wired into a specific AI tool's own instruction-loading mechanism:

- **Claude Code:** import the relevant `core/*.md` files from a project's `CLAUDE.md` using `@agent-spec/core/instruction-hierarchy.md`-style imports (see `runtime/claude.md`).
- **Cursor:** translate the relevant `core/` sections into `.cursor/rules/*.mdc` files with appropriate `alwaysApply`/`globs` frontmatter (see `runtime/cursor.md`).
- **Copilot:** place repo-wide rules in `.github/copilot-instructions.md`, keeping load-bearing content within the first 4,000 characters (see `runtime/copilot.md`).
- **Cline:** place project rules in `.clinerules/` (see `runtime/cline.md`).
- **Windsurf:** condense into `.windsurfrules`, respecting its character limit (see `runtime/windsurf.md`).

The repository's root `AGENTS.md` is a separate, single-file, self-contained version of this same standard, intended to be portable — copied unmodified into any project without needing this `agent-spec/` folder alongside it. `agent-spec/core/` is the decomposed authoring source for the same rules; the two are not currently kept in automatic sync and should be reconciled manually when either is updated.

## Development

To add a new rule: add it to the relevant `core/*.md` file only. Do not add engineering rules to `runtime/`, `examples/`, or `prompts/`.

To add support for a new AI tool: add a new file to `runtime/`, following the Role/Authority header pattern already used in `shared.md` and the existing tool adapters, and verify the tool's actual documented behavior before writing — tool file formats and constraints change between vendor releases.

To add a new example: add a new file to `examples/`, cite the specific `core/` file and section it demonstrates, and include the same Role/Authority header used in the existing five files.

To add a new standalone prompt: add it to `prompts/`, with no expectation that it inherits any rule from `core/` unless the prompt states so explicitly.

## Contributing

Changes to `core/` should be made deliberately — a change here affects every `runtime/` adapter and every `examples/` file that references it. When changing a `core/` rule, check whether `examples/` still accurately demonstrates it.
