# runtime/cursor.md — Cursor adapter

## Role / Authority

- **Role:** Maps this standard onto Cursor's rules mechanics.
- **Authority:** Non-authoritative (see `runtime/shared.md`). Documents file mechanics only; all rules live in `core/`.

> Facts below are **best-known at time of writing (as of August 2026)** and should be checked against Cursor's current documentation.

---

## 1. File Mechanics

- **Primary location:** `.cursor/rules/*.mdc` — one or more `.mdc` rule files.
- **Subdirectory rules:** Subdirectories can also contain `.cursor/rules/` to scope instructions to that subtree (maps to `instruction-hierarchy.md` §3, tier 2).
- **Frontmatter scoping:** Each `.mdc` file uses YAML frontmatter to define application scope:
  - `alwaysApply: true` — included in every interaction.
  - `globs: "src/**/*.ts"` — included automatically when touching matching files.
  - `description` — used by Cursor to decide relevance when `alwaysApply: false`.
- **Legacy format:** A single root `.cursorrules` file is the legacy format; `.cursor/rules/*.mdc` is the recommended standard.

---

## 2. Setup Guide

### Step 1: Create Global Standard Rule

Create `.cursor/rules/00-agent-spec.mdc` to enforce `AGENTS.md` and `core/` rules globally:

```markdown
---
description: Global agent behavior, instruction hierarchy, decision framework, and safety rules.
globs: "*"
alwaysApply: true
---

# Agent Behavioral Standard

This repository adheres to the agent-spec behavioral standard.

- **Normative Rules:** See `AGENTS.md` and `core/` directory.
- **Precedence:** `core/instruction-hierarchy.md`
- **Clean Code & Decisions:** `core/decision-framework.md`
- **Output & Anti-Hallucination:** `core/output-policy.md`
- **Safety Boundaries:** `core/safety.md`
```

### Step 2: Create Path-Scoped Context Rules (Optional)

Create `.cursor/rules/50-project-rules.mdc` for path-scoped rules:

```markdown
---
description: Project specific coding rules and architecture constraints.
globs: "src/**/*.{ts,tsx}"
alwaysApply: false
---

# Frontend Code Rules

- Follow conventions defined in `context/RULES.md`.
- Reference architecture specs in `context/ARCHITECTURE.md`.
```

---

## 3. Skills Mapping

Cursor supports manual-inclusion and model-decided rules as on-demand specialists.

- Store skills under `.agents/skills/<skill-name>/SKILL.md`.
- Define manual MDC rules under `.cursor/rules/` with `alwaysApply: false` and explicit `description` triggers.
- Map skills in `AGENTS.md` (`runtime/shared.md` §4).

