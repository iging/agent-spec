# cursor.md — Runtime Adapter for Cursor

- **Role:** Translates `core/` rules into Cursor's file mechanics. Defines no engineering rule of its own.
- **Authority:** None. Must remain consistent with `core/` at all times; see `shared.md` for the full contract this file operates under.

This file only covers Cursor-specific mechanics.

## File(s) this tool reads

- `.cursor/rules/*.mdc` — the current format. Multiple files allowed, each independently scoped.
- `.cursorrules` (single file, repo root) — legacy format, still honored for backward compatibility but superseded by `.cursor/rules/`. Prefer `.mdc` files for new setups.

## Format specifics

`.mdc` files are Markdown with YAML frontmatter controlling activation:

```yaml
---
description: When this rule applies (used by the agent to self-select relevance)
globs: "src/payments/**"
alwaysApply: false
---
```

Activation modes, from Cursor's own model:

- **Always** — `alwaysApply: true`. Injected into every conversation unconditionally.
- **Auto Attached** — triggered when a file matching `globs` is open/edited.
- **Agent-Requested** — the agent reads `description` and decides for itself whether the rule is relevant (no `globs` needed).
- **Manual** — only included when explicitly invoked by the user.

## Practical implications for this spec

- A rule mapped from `core/safety.md` should generally use `alwaysApply: true` — safety constraints should not depend on the agent guessing relevance.
- A rule mapped from `core/decision-framework.md`'s domain-specific sections (e.g. refactoring standards) can reasonably use `globs` scoping if it only matters for certain paths.
- Keep individual `.mdc` files short and focused — Cursor's own guidance recommends keeping rule files maintainable and performant (commonly cited around 500 lines as a soft ceiling); split a long rule into multiple scoped files rather than one large one.

## Precedence within this tool

If both `.cursorrules` and `.cursor/rules/*.mdc` exist in the same repo, treat `.cursor/rules/*.mdc` as authoritative per Cursor's own migration path, and treat `.cursorrules` as a legacy fallback only when no `.mdc` rules exist. This is a tool-native detail, distinct from and layered on top of the general hierarchy in `core/instruction-hierarchy.md`.
