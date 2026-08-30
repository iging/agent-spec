# runtime/windsurf.md — Windsurf adapter

## Role / Authority

- **Role:** Maps this standard onto Windsurf's rules mechanics.
- **Authority:** Non-authoritative (see `runtime/shared.md`). Documents file mechanics only; all rules live in `core/`.

> Facts below are **best-known at time of writing (as of August 2026)** and should be checked against Windsurf's current documentation.

---

## 1. File Mechanics

- **Primary location:** `.windsurf/rules/` holding one or more Markdown rule files. A single root `.windsurfrules` file is the legacy format.
- **Activation modes:** Rules can be set to always-on, manual, model-decided (glob/description-triggered), or file-glob-scoped — controlling when each rule loads (maps to `instruction-hierarchy.md` §3, tiers 2–4).
- **Size limits:** Individual rule files and the combined rule set have character limits; keep files focused and within limits.
- **Format:** Plain Markdown, optionally with activation metadata.

---

## 2. Setup Guide

### Step 1: Always-On Core Rule Configuration

Create `.windsurf/rules/agent-spec.md` at your repository root:

```markdown
# Agent Behavioral Standard (Windsurf Adapter)

This repository enforces the agent-spec behavioral standard.

- **Normative Rules:** See `AGENTS.md` and `core/`.
- **Precedence:** `core/instruction-hierarchy.md`
- **Engineering Evaluation:** `core/decision-framework.md`
- **Output & Anti-Hallucination:** `core/output-policy.md`
- **Safety Boundaries:** `core/safety.md`
```

Set activation mode to **Always-On** in Windsurf's rule configuration interface.

### Step 2: Project Rules Configuration (Optional)

Create `.windsurf/rules/project-context.md` for project facts:

```markdown
# Project Facts & Coding Guidelines

- Architecture: See `context/ARCHITECTURE.md`.
- Coding Rules: See `context/RULES.md`.
- Database Schema: See `context/SCHEMA.md`.
```

---

## 3. Skills Mapping

Windsurf's manual and model-decided activation modes serve as on-demand specialists.

- Keep always-on rules focused on core behavior.
- Store skills in `.agents/skills/<skill-name>/SKILL.md`.
- Use model-decided or manual activation rules in `.windsurf/rules/` for specialist workflows.
- Map installed skills in `AGENTS.md` (`runtime/shared.md` §4).

