# shared.md — Common Runtime Contract

- **Role:** Translation layer. Adapts `core/` rules to one specific tool's file formats and mechanical constraints. Answers "how do I encode this existing rule inside Claude/Cursor/Copilot/etc.," never "what is the rule."
- **Authority:** None of its own. `runtime/` is not a peer of `core/` and cannot define, override, or redefine an engineering rule, a safety constraint, or a decision-framework priority. Every runtime file MUST remain fully consistent with `core/`; if a tool's native behavior appears to conflict with a `core/` rule, the runtime file documents the constraint and defers to `core/` — it does not resolve the conflict itself. Conflict resolution is `core/instruction-hierarchy.md`'s job.
- **Downstream consumer:** `examples/` may reference a runtime file to show how a scenario looks inside a specific tool's constraints, but `examples/` validates `core/` behavior, not `runtime/` behavior — a runtime file being followed correctly is necessary but not sufficient for an example to be "correct."

Every file in this `runtime/` folder adapts the `core/` spec to one specific tool. To avoid duplicating the same disclaimers six times, each runtime file assumes the following baseline and only documents what's different about its tool.

## What belongs in a runtime file

- The exact filename(s)/path(s) the tool actually reads (e.g. `CLAUDE.md`, `.cursor/rules/*.mdc`, `.clinerules`).
- The tool's own file format quirks (frontmatter fields, activation modes, size limits).
- How the tool merges multiple rule files, if it has tool-specific merge behavior beyond the generic hierarchy in `core/instruction-hierarchy.md`.
- Known constraints specific to that tool (character limits, which surfaces of the tool actually honor the file, etc.).

## What does NOT belong in a runtime file

- Engineering decisions, safety rules, or output formatting — those live once in `core/` and apply to every tool identically. A runtime file should never redefine what `safety.md` or `decision-framework.md` already say.
- Project-specific content (this project's stack, architecture). That belongs in the actual `CLAUDE.md` / `.cursorrules` / etc. that this spec informs, not in the spec itself.

## Common capability baseline

Regardless of tool, apply `core/safety.md` Section 2 (Capability Boundaries): before assuming a tool can read files recursively, execute shell commands, or persist memory across sessions, confirm against that tool's actual documented behavior rather than assuming parity with another tool. Tool capabilities and file formats change between vendor releases — treat the specifics below as best-known-at-time-of-writing, not permanent guarantees, and re-verify against the vendor's current docs when behavior seems off.

## File precedence note

All tool-specific rule files described in this folder are **tier 3** ("project-specific instruction files") in `core/instruction-hierarchy.md`'s Source of Truth Hierarchy — they describe this specific project and this specific tool's behavior, and they outrank the tier-4 universal baseline (`AGENTS.md` / this `agent-spec/core/` set) wherever the two conflict.
