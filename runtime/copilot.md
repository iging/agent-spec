# copilot.md — Runtime Adapter for GitHub Copilot

- **Role:** Translates `core/` rules into Copilot's file mechanics. Defines no engineering rule of its own.
- **Authority:** None. Must remain consistent with `core/` at all times; see `shared.md` for the full contract this file operates under.

This file only covers Copilot-specific mechanics.

## File(s) this tool reads

- `.github/copilot-instructions.md` — the repository-wide baseline. Loaded for every interaction in the repository; every other instruction file builds on top of it.
- `.github/instructions/*.instructions.md` — path-scoped instruction files, each with an `applyTo` frontmatter field to target specific files or directories. Supported in Copilot Chat (VS Code, Visual Studio) and Copilot cloud agent.

## Format specifics

Path-scoped files use YAML frontmatter:

```yaml
---
applyTo: "src/payments/**"
---
```

Content below the frontmatter is plain Markdown, same as `.github/copilot-instructions.md`.

## Known constraint

**Copilot code review specifically** only reads the first 4,000 characters of any custom instruction file — instructions beyond that limit are silently ignored for code-review purposes. This limit does not apply to Copilot Chat or the Copilot cloud agent. Practical implication: if `.github/copilot-instructions.md` is meant to inform code review, keep the highest-priority content (safety constraints, critical conventions) within the first 4,000 characters, and treat anything after that as effectively invisible to that specific surface.

## Precedence within this tool

`.github/copilot-instructions.md` is the global baseline; path-scoped `.github/instructions/*.instructions.md` files layer on top for their matched paths. This mirrors the general specificity rule in `core/instruction-hierarchy.md` — a path-scoped file is more specific than the repo-wide baseline and takes precedence for files it covers.
