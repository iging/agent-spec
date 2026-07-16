# runtime/cline.md — Cline adapter

## Role / Authority

- **Role:** Maps this standard onto Cline's rules mechanics.
- **Authority:** Non-authoritative (see `runtime/shared.md`). File mechanics only; rules live in `core/`.

> Facts below are **best-known at time of writing** and should be checked against Cline's current documentation.

## File mechanics

- **Primary location:** a `.clinerules/` directory at the repository root holding one or more Markdown rule files, loaded together as project instructions. A single root `.clinerules` file is also recognized.
- **Toggling:** rule files in `.clinerules/` can be individually enabled/disabled, letting a repo keep several rule sets and activate the relevant ones.
- **Format:** plain Markdown.

## Applying this standard

- Place the `AGENTS.md` synthesis (or a reference to it) as a rule file in `.clinerules/`; keep project specifics in separate rule files that mirror `context/`. Do not put project facts in the generic standard.

## Skills mapping

- Use individually-toggleable `.clinerules/` files as on-demand specialists — enable a workflow rule only when its task is active — and **map** them from `AGENTS.md` (`runtime/shared.md` §4).
