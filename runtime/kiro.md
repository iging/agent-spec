# runtime/kiro.md — Kiro adapter

## Role / Authority

- **Role:** Maps this standard onto Kiro's steering mechanics.
- **Authority:** Non-authoritative (see `runtime/shared.md`). Documents file mechanics only; all rules live in `core/`.

> Facts below are **best-known at time of writing (as of August 2026)** and should be checked against Kiro's current documentation.

---

## 1. File Mechanics

- **Primary location:** `.kiro/steering/*.md` — steering files included in the agent's context.
- **Inclusion modes** (configured via YAML frontmatter):
  - `inclusion: always` (default) — included in every interaction.
  - `inclusion: fileMatch` — conditional inclusion using `fileMatchPattern` (e.g. `src/api/**/*`), included only when a matching file is in context.
  - `inclusion: manual` — included only when explicitly referenced by the user via context key (`#` in chat).
- **File transclusion:** Steering files can embed relative files via `#[[file:<relative_path>]]`, pulling in `context/` docs or API specs dynamically.
- **Format:** Markdown with optional YAML frontmatter.

---

## 2. Setup Guide

### Step 1: Always-Included Steering Rule

Create `.kiro/steering/00-agent-spec.md` at your repository root:

```markdown
---
inclusion: always
---

# Agent Behavioral Standard (Kiro Adapter)

This repository enforces the agent-spec behavioral standard.

- **Normative Rules:** See `AGENTS.md` and `core/`.
- **Precedence:** `core/instruction-hierarchy.md`
- **Decision Framework:** `core/decision-framework.md`
- **Output Policy:** `core/output-policy.md`
- **Safety Boundaries:** `core/safety.md`

## Project Context Transclusion
- Architecture: #[[file:context/ARCHITECTURE.md]]
- Coding Rules: #[[file:context/RULES.md]]
```

### Step 2: Manual Steering for On-Demand Workflows (Optional)

Create `.kiro/steering/migration.md` for manual inclusion:

```markdown
---
inclusion: manual
---

# Database Migration Workflow

- Database Schema: #[[file:context/SCHEMA.md]]
- Follow migration safety rules in `modules/dev-workflow/database-migrations/SKILL.md`.
```

---

## 3. Skills Mapping

Kiro's `inclusion: manual` steering files act as native on-demand specialists.

- Keep always-included steering focused on core standards and context transclusion.
- Store skills in `.agents/skills/<skill-name>/SKILL.md`.
- Create `inclusion: manual` steering files for specialist workflows loaded via `#` references.
- Map installed skills in `AGENTS.md` (`runtime/shared.md` §4).

