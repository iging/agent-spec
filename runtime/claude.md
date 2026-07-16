# runtime/claude.md — Claude Code adapter

## Role / Authority

- **Role:** Maps this standard onto Claude Code's instruction-file mechanics.
- **Authority:** Non-authoritative (see `runtime/shared.md`). Documents file mechanics only; all rules live in `core/`.

> Facts below are **best-known at time of writing** and should be checked against Anthropic's current Claude Code documentation.

## File mechanics

- **Primary file:** `CLAUDE.md` at the repository root — read automatically as project memory at session start. Tool-agnostic in practice: other agents also read it during discovery (`instruction-hierarchy.md` §1).
- **Scoped memory:** a `CLAUDE.md` in a subdirectory applies when working within that subtree, layering on top of the root file. This maps to path-scoped precedence (`instruction-hierarchy.md` §3, tier 2).
- **User-level memory:** `~/.claude/CLAUDE.md` applies across all of the user's projects (tier 5).
- **Imports:** `CLAUDE.md` can reference other files (e.g. `@path/to/file`), letting it pull in `context/` docs or a skills index without inlining them.
- **Format:** plain Markdown; concise bullet points are preferred over prose.

## Applying this standard

- Copy `AGENTS.md` to the repo root; either keep it as-is (Claude Code reads `AGENTS.md`) or reference it from `CLAUDE.md` via an import. Put project facts in `context/` and reference them, not in the generic file.

## Skills mapping

- Claude Code supports on-demand skills/commands loaded when a task needs them. Keep standing rules in `CLAUDE.md`/`AGENTS.md`; expose specialist workflows as separate skills and **map** them from the memory file (`runtime/shared.md` §4).
