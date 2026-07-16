# runtime/kiro.md — Kiro adapter

## Role / Authority

- **Role:** Maps this standard onto Kiro's steering mechanics.
- **Authority:** Non-authoritative (see `runtime/shared.md`). File mechanics only; rules live in `core/`.

> Facts below are **best-known at time of writing** and should be checked against Kiro's current documentation.

## File mechanics

- **Primary location:** `.kiro/steering/*.md` — steering files included in the agent's context.
- **Inclusion modes** (set via frontmatter):
  - **Always** (default) — included in every interaction.
  - **Conditional** — `inclusion: fileMatch` with a `fileMatchPattern` (e.g. `README*`), included only when a matching file is in context.
  - **Manual** — `inclusion: manual`, included only when the user references it via a context key (`#` in chat).
- **File references:** steering files can embed other files via `#[[file:<relative_path>]]`, letting them pull in `context/` docs or an API spec without inlining.
- **Format:** Markdown with optional YAML frontmatter.

## Applying this standard

- Put the `AGENTS.md` synthesis (or a reference to it) in an always-included steering file. Use `fileMatch` steering for path-specific project rules and `#[[file:...]]` references to `context/` docs for project facts — keeping the generic standard project-fact-free.

## Skills mapping

- Kiro's `inclusion: manual` steering files are natural on-demand specialists (deployment, migration workflows) loaded only when referenced. Keep always-included steering minimal and **map** the manual ones as skills from `AGENTS.md` (`runtime/shared.md` §4).
