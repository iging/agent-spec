# windsurf.md — Runtime Adapter for Windsurf

- **Role:** Translates `core/` rules into Windsurf's file mechanics. Defines no engineering rule of its own.
- **Authority:** None. Must remain consistent with `core/` at all times; see `shared.md` for the full contract this file operates under. This file discloses Windsurf's constraints — it does not decide whether those constraints make Windsurf the right tool for a given project. That decision belongs to whoever is applying `core/decision-framework.md` to the actual project, not to this adapter.

This file only covers Windsurf-specific mechanics.

## File(s) this tool reads

- `.windsurfrules` — project-level rules file at the repository root. Takes highest precedence over global rules when both exist.
- **Global Rules** — configured once in Windsurf's settings, apply across all projects for that user, conceptually parallel to Cline's global rules.

## Known constraint — character limit

Windsurf rule files (both `.windsurfrules` and Global Rules) are subject to a character limit; content beyond the limit is truncated and silently has no effect. This is the single most important thing to know about this tool's rules system, and it's easy to violate by accident if a rules file grows organically over time.

Practical implications:

- Do not attempt to inline the full `core/` spec into `.windsurfrules` — it will very likely exceed the limit and get silently truncated, with no error to signal that the tail end of the file is being ignored.
- Prioritize ruthlessly: put `core/safety.md`'s hard constraints and the most load-bearing project-specific facts first in the file, since truncation cuts from the end.
- Periodically verify the file's actual character count against Windsurf's current documented limit — this has changed between Windsurf releases and should be re-checked rather than assumed, per `shared.md`'s guidance on tool specifics changing over time.

## Precedence within this tool

`.windsurfrules` (project-level) takes precedence over Global Rules. This matches the general specificity ordering in `core/instruction-hierarchy.md`.

## Practical implication for encoding this spec in Windsurf

Given the character limit and the absence of an `@path`-style import mechanism (unlike Claude Code), `.windsurfrules` cannot faithfully carry the full `core/` spec as a direct copy. Treat it as a condensed pointer/summary instead. This is a disclosed constraint, not a verdict on whether Windsurf is suitable for a given project — that tradeoff (spec fidelity vs. tool choice) is a project-level decision made via `core/decision-framework.md`, not something this adapter resolves on its own.
