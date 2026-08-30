# runtime/cline.md — Cline adapter

## Role / Authority

- **Role:** Maps this standard onto Cline's rules mechanics.
- **Authority:** Non-authoritative (see `runtime/shared.md`). Documents file mechanics only; all rules live in `core/`.

> Facts below are **best-known at time of writing (as of August 2026)** and should be checked against Cline's current documentation.

---

## 1. File Mechanics

- **Primary location:** A `.clinerules/` directory at the repository root containing one or more Markdown rule files, loaded together as project instructions. A single root `.clinerules` file is also recognized.
- **Toggling:** Rule files inside `.clinerules/` can be individually enabled or disabled, allowing repositories to maintain several specialized rule sets and activate them as needed.
- **Format:** Plain Markdown.

---

## 2. Setup Guide

### Step 1: Root Rule Configuration

Create `.clinerules/00-agent-spec.md` at your repository root to enforce standard behavior:

```markdown
# Agent Behavioral Standard (Cline Adapter)

This repository enforces the agent-spec behavioral standard.

- **Normative Base:** Follow `AGENTS.md` and `core/`.
- **Precedence & Discovery:** Follow `core/instruction-hierarchy.md`.
- **Decision Framework:** Follow `core/decision-framework.md`.
- **Output Policy:** Follow `core/output-policy.md`.
- **Safety Boundary:** Follow `core/safety.md`.
```

### Step 2: Project Rules File (Optional)

Create `.clinerules/50-project-facts.md` for project specifics:

```markdown
# Project Facts & Coding Standards

- Architecture: See `context/ARCHITECTURE.md`.
- Coding Rules: See `context/RULES.md`.
- Data Specs: See `context/SCHEMA.md`.
```

---

## 3. Skills Mapping

Cline uses individually-toggleable `.clinerules/` files as on-demand specialist rules.

- Keep core standing rules minimal in `.clinerules/00-agent-spec.md`.
- Store specialist workflows under `.agents/skills/<skill-name>/SKILL.md` or as dedicated `.clinerules/workflow-<name>.md` files.
- Activate workflow rules only when their specific task is active.
- Map installed skills in `AGENTS.md` (`runtime/shared.md` §4).

