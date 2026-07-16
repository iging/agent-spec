# runtime/copilot.md — GitHub Copilot adapter

## Role / Authority

- **Role:** Maps this standard onto GitHub Copilot's custom-instructions mechanics.
- **Authority:** Non-authoritative (see `runtime/shared.md`). File mechanics only; rules live in `core/`.

> Facts below are **best-known at time of writing** and should be checked against GitHub's current Copilot documentation.

## File mechanics

- **Primary file:** `.github/copilot-instructions.md` at the repository root — applied to Copilot chat/edit requests in that repository.
- **Scoped instructions:** `.github/instructions/**/*.instructions.md` files can use frontmatter with an `applyTo` glob to scope instructions to matching paths (maps to `instruction-hierarchy.md` §3, tier 2).
- **Format:** Markdown; concise, imperative guidance works best. Keep it short — overly long instruction files are less reliably applied.

## Applying this standard

- Put the synthesized behavior from `AGENTS.md` (or a reference to it) in `.github/copilot-instructions.md`. Use `applyTo`-scoped `.instructions.md` files for path-specific project rules that belong in `context/`; keep the generic standard project-fact-free.

## Skills mapping

- Copilot does not expose a general on-demand-skill loader the same way; approximate specialists with `applyTo`-scoped instruction files and **map** them from the root instructions (`runtime/shared.md` §4).
