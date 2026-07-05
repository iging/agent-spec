# claude.md — Runtime Adapter for Claude Code

- **Role:** Translates `core/` rules into Claude Code's file mechanics. Defines no engineering rule of its own.
- **Authority:** None. Must remain consistent with `core/` at all times; see `shared.md` for the full contract this file operates under.

This file only covers Claude Code–specific mechanics.

## File(s) this tool reads

- `CLAUDE.md` at the repository root — loaded automatically into context at the start of every session, delivered as a user message after the system prompt (not part of the system prompt itself).
- `CLAUDE.md` in subdirectories — Claude Code walks the directory tree and reads subdirectory `CLAUDE.md` files for package-specific context in monorepos, in addition to the root file.
- `.claude/rules/` directory — supports path-scoped rules using glob patterns, similar in spirit to Cursor's per-path rules.

## Format specifics

- Plain Markdown, no required frontmatter schema (unlike Cursor's `.mdc`).
- Supports `@path/to/file` import syntax to pull in other files' content without duplicating it inline — use this to reference `agent-spec/core/*.md` from a project's `CLAUDE.md` instead of copy-pasting spec content into it.
- `@` import paths resolve against the file's own location; know that some Claude Code versions have had inconsistent root resolution when the project root is inside a hidden (dot-prefixed) directory — verify an import actually resolved if the project structure is nonstandard.

## Precedence within this tool

- Root `CLAUDE.md` provides shared/global project context; subdirectory `CLAUDE.md` files provide package-specific context and take precedence for files within their subtree. This is a tool-native instance of the general "more specific beats more general" rule in `core/instruction-hierarchy.md` — it does not need a separate rule here, just this mapping of the general principle to Claude Code's actual mechanism.

## Recommended structure for this project's `CLAUDE.md`

```markdown
# CLAUDE.md

@agent-spec/core/instruction-hierarchy.md
@agent-spec/core/decision-framework.md
@agent-spec/core/safety.md
@agent-spec/core/output-policy.md

## Project-Specific Context

[stack, architecture, conventions, commands — see the CLAUDE.md template]
```

This keeps the universal spec as a single authored source (imported, not duplicated) and keeps this file focused on what's actually project-specific.
