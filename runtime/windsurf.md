# runtime/windsurf.md — Windsurf adapter

## Role / Authority

- **Role:** Maps this standard onto Windsurf's rules mechanics.
- **Authority:** Non-authoritative (see `runtime/shared.md`). File mechanics only; rules live in `core/`.

> Facts below are **best-known at time of writing** and should be checked against Windsurf's current documentation.

## File mechanics

- **Primary location:** `.windsurf/rules/` holding one or more Markdown rule files. A single root `.windsurfrules` file is the older, still-recognized format.
- **Activation modes:** rules can be set to always-on, manual, model-decided (glob/description-triggered), or file-glob-scoped — controlling when each rule loads (maps to `instruction-hierarchy.md` §3, tiers 2–4).
- **Size limits:** individual rule files and the combined rule set have character limits; keep files focused and within them.
- **Format:** Markdown, optionally with activation metadata.

## Applying this standard

- Add an always-on rule that references `AGENTS.md`/`core/`, and glob- or manually-scoped rules for project specifics drawn from `context/`. Keep the generic standard free of project facts and within Windsurf's size limits.

## Skills mapping

- Windsurf's manual and model-decided activation modes serve as on-demand specialists. Keep always-on rules minimal and **map** the conditional ones as skills from `AGENTS.md` (`runtime/shared.md` §4).
