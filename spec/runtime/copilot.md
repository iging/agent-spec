# runtime/copilot.md — GitHub Copilot adapter

## Role / Authority

- **Role:** Maps this standard onto GitHub Copilot's custom-instructions mechanics.
- **Authority:** Non-authoritative (see `runtime/shared.md`). Documents file mechanics only; all rules live in `core/`.

> Facts below are **best-known at time of writing (as of August 2026)** and should be checked against GitHub's current Copilot documentation.

---

## 1. File Mechanics

- **Primary file:** `.github/copilot-instructions.md` at the repository root — applied to Copilot Chat and edit requests in that repository.
- **Scoped instructions:** `.github/instructions/*.instructions.md` files can use YAML frontmatter with `applyTo` globs to scope instructions to matching file paths (maps to `instruction-hierarchy.md` §3, tier 2).
- **Format:** Plain Markdown; clear imperative statements are recommended. Keep files short and focused.

---

## 2. Setup Guide

### Step 1: Root Instruction Configuration

Create `.github/copilot-instructions.md` at your repository root to reference `AGENTS.md` and `spec/core/`:

```markdown
# Repository Agent Behavioral Standard

This repository enforces the agent-spec behavioral standard.

- **Normative Rules:** See `AGENTS.md` and `spec/core/`.
- **Precedence:** Follow `spec/core/instruction-hierarchy.md`.
- **Engineering Rigor:** Follow `spec/core/decision-framework.md`.
- **Anti-Hallucination & Reporting:** Follow `spec/core/output-policy.md`.
- **Non-Negotiable Safety:** Follow `spec/core/safety.md`.
```

### Step 2: Path-Scoped Instructions (Optional)

Create `.github/instructions/api.instructions.md` for path-scoped rules:

```markdown
---
applyTo: "src/api/**/*.ts"
---

# API Subsystem Rules

- Enforce schema validation defined in `context/SCHEMA.md`.
- Follow coding standards in `context/RULES.md`.
```

---

## 3. Skills Mapping

GitHub Copilot relies on `applyTo`-scoped instruction files for context-driven specialization.

- Store specialized skills in `.agents/skills/<skill-name>/SKILL.md`.
- Reference on-demand skills in `.github/copilot-instructions.md` or scoped `.instructions.md` files.
- Map installed skills in `AGENTS.md` so Copilot recognizes when to reference them (`runtime/shared.md` §4).

