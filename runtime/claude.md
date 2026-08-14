# runtime/claude.md — Claude Code adapter

## Role / Authority

- **Role:** Maps this standard onto Claude Code's instruction-file mechanics.
- **Authority:** Non-authoritative (see `runtime/shared.md`). Documents file mechanics only; all rules live in `core/`.

> Facts below are **best-known at time of writing (as of August 2026)** and should be checked against Anthropic's current Claude Code documentation.

---

## 1. File Mechanics

- **Primary file:** `CLAUDE.md` at the repository root — read automatically as project memory at session start. Tool-agnostic in practice: other agents also read it during discovery (`instruction-hierarchy.md` §1).
- **Scoped memory:** A `CLAUDE.md` file in a subdirectory applies when working within that subtree, layering on top of the root file (maps to `instruction-hierarchy.md` §3, tier 2).
- **User-level memory:** `~/.claude/CLAUDE.md` applies across all of the user's projects (tier 5).
- **Imports:** `CLAUDE.md` can reference other files via `@path/to/file` syntax, pulling in `context/` templates or skills without inlining.
- **Format:** Plain Markdown; concise bullet points and direct commands are preferred over prose.

---

## 2. Setup Guide

### Step 1: Root Reference Configuration

Create or update `CLAUDE.md` at your repository root to reference `AGENTS.md` and `context/`:

```markdown
# Project Instructions (Claude Code Adapter)

Import normative behavior standard:
@AGENTS.md

Project facts & rules:
- ARCHITECTURE: @context/ARCHITECTURE.md
- RULES: @context/RULES.md
```

### Step 2: Subdirectory Scoped Memory (Optional)

For sub-packages or services needing local instructions, place a `CLAUDE.md` in that subdirectory:

```markdown
# Subsystem Specifics

- Local build: `npm test -- --filter=subsystem`
- Architecture notes: @context/ARCHITECTURE.md §3
```

---

## 3. Skills Mapping

Claude Code supports on-demand skills and slash commands loaded when a task requires specialized capabilities. 

- Keep standing rules in `CLAUDE.md` / `AGENTS.md`.
- Store specialist workflows in `.agents/skills/<skill-name>/SKILL.md`.
- Map installed skills in `AGENTS.md` or `CLAUDE.md` so Claude knows when to invoke them (`runtime/shared.md` §4).

