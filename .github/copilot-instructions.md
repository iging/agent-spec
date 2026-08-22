# GitHub Copilot Workspace Instructions (agent-spec)

## Role / Authority

- **Role:** Repository-wide instructions for GitHub Copilot.
- **Authority:** Non-authoritative runtime adapter layer referencing `AGENTS.md` and `core/`.

---

## 1. Core Instruction Mapping

- **Normative Baseline:** Follow `AGENTS.md` at repository root.
- **Instruction Hierarchy:** Follow `core/instruction-hierarchy.md`.
- **Decision Framework:** Follow `core/decision-framework.md`.
- **Output Policy:** Follow `core/output-policy.md`.
- **Safety Boundary:** Follow `core/safety.md`.

## 2. Anti-Hallucination Guardrails

- **Pure Documentation:** This repository is a pure Markdown documentation standard. It is not a runnable application or library.
- **Validation Script:** Run `node scripts/audit-compliance.js` for compliance and link integrity verification. Do not assume `npm test` or build targets exist.
- **Core Tier Immutability:** Do not edit files under `core/` without explicit permission.
- **Template Placeholders:** Preserve `[PLACEHOLDER: ...]` markers in `context/` templates.
- **No Legacy Imports:** Never reference or import files from `legacy/`.
