# cline.md — Runtime Adapter for Cline

- **Role:** Translates `core/` rules into Cline's file mechanics. Defines no engineering rule of its own.
- **Authority:** None. Must remain consistent with `core/` at all times; see `shared.md` for the full contract this file operates under.

This file only covers Cline-specific mechanics.

## File(s) this tool reads

- **Global rules** — configured once, apply across all of a user's projects. Use for universal coding style, preferred persona, or general instructions that should stay active unless explicitly turned off.
- **Workspace rules** — a `.clinerules/` directory (or a single `.clinerules` file) at the project root. Specific to that codebase; use for team standards and project-specific context.

Both are Markdown files. Content from any rule file toggled "on" (global or workspace) is appended directly into Cline's system prompt for that session — this is not passive background context, it actively shapes reasoning for every interaction until toggled off.

## Precedence within this tool

Workspace rules take precedence over global rules when they conflict. This is Cline's own stated behavior and matches the general specificity ordering in `core/instruction-hierarchy.md` (project-specific beats general/global) — no separate rule is needed here beyond confirming the mapping.

## Practical implications for this spec

- Because rule content is appended to every system prompt for the session, keep workspace rules concise — this is not a place to inline the entire `core/` spec verbatim. Reference or summarize; don't duplicate at length.
- Cline distinguishes **Rules** (persistent, behavioral — "always behave this way") from **Workflows** (on-demand, procedural — invoked via a slash command, injected only for that message, then discarded). This spec's `core/*.md` content maps to Rules, not Workflows — it describes standing behavior, not a one-off procedure. If a project wants a scripted multi-step process (e.g. "run this exact PR review sequence"), that belongs in a Cline Workflow, not in a rules file.
- Multi-root workspaces: Cline rules only apply in the primary workspace folder. If the project uses a multi-root VS Code workspace, confirm which folder Cline treats as primary before assuming workspace rules are active for a given subfolder.
