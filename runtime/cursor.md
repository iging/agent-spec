# runtime/cursor.md — Cursor adapter

## Role / Authority

- **Role:** Maps this standard onto Cursor's rules mechanics.
- **Authority:** Non-authoritative (see `runtime/shared.md`). File mechanics only; rules live in `core/`.

> Facts below are **best-known at time of writing** and should be checked against Cursor's current documentation.

## File mechanics

- **Primary location:** `.cursor/rules/` — one or more `.mdc` rule files. A repo may also have nested `.cursor/rules/` folders in subdirectories that scope to that subtree (maps to `instruction-hierarchy.md` §3, tier 2).
- **Frontmatter scoping:** each `.mdc` file uses YAML frontmatter to control when it applies — e.g. always-applied, attached by file-glob match, or manual-only inclusion. Glob patterns scope a rule to matching files.
- **Legacy:** a single root `.cursorrules` file is the older, still-recognized format; prefer `.cursor/rules/` for new setups.
- **Format:** Markdown body with a YAML frontmatter block.

## Applying this standard

- Add a rule file under `.cursor/rules/` that references `AGENTS.md`/`core/` for behavior, and separate file-glob-scoped rules for project specifics that belong in `context/`. Keep the generic standard free of project facts.

## Skills mapping

- Cursor's manual-inclusion (`agent-requested`/manual) rules act as on-demand specialists. Keep always-applied standing rules minimal and **map** manual rules as skills from `AGENTS.md` (`runtime/shared.md` §4).
