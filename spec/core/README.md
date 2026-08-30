# core/README.md

## Role / Authority

- **Role:** Index catalog and adopter guidance for the normative core behavioral specification layer.
- **Authority:** Tier-4 normative documentation. Explains how `core/` operates as a portable, project-agnostic engine.
- **Must not define:** New instruction rules, decision frameworks, output policies, or safety constraints (these belong exclusively in their respective specification files).

---

## 1. Overview

The `core/` directory contains the four normative files that define how AI coding agents reason, resolve instruction conflicts, evaluate engineering decisions, and enforce safety boundaries. This layer is portable and project-agnostic.

## 2. Core Specification Index

| File | Domain Ownership | Key Authority |
|---|---|---|
| `instruction-hierarchy.md` | Discovery & Precedence | Defines the 7-tier source-of-truth precedence ranking (Tiers 1 to 7) and conflict resolution rules. |
| `decision-framework.md` | Engineering Evaluation | Defines engineering trade-offs, clean-code standards, dependency rules, refactoring, and testing conventions. |
| `output-policy.md` | Presentation & Reporting | Governs anti-hallucination, assumption labeling, confidence reporting (High, Medium, Low), and output formatting. |
| `safety.md` | Non-Negotiable Boundaries | Enforces security gates, change-risk rollback requirements, agent identity and tone limits, and override rules. |

## 3. Adoption & Integration Guide

To use `core/` in any target repository:

```bash
# Copy core/ and AGENTS.md to your project root
cp -r path/to/agent-spec/core ./
cp path/to/agent-spec/AGENTS.md ./

# Copy context templates and customize for your project
cp -r path/to/agent-spec/context ./
```

Project-specific facts belong in `context/` (`PRD.md`, `ARCHITECTURE.md`, `RULES.md`, `SCHEMA.md`, `TASKS.md`). Because Tier 3 (`context/`) outranks Tier 4 (`core/`), your project rules override `core/` defaults automatically without editing `core/`.

## 4. Maintenance Boundaries

- **Immutability:** Do not edit files inside `core/` for routine project customization.
- **Single Ownership:** Each `core/` file owns its domain exclusively without circular authority.
- **Verification:** All files in `core/` are audited for link integrity and rule compliance.
