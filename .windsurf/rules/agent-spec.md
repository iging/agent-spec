# Agent Behavioral Standard & Anti-Hallucination Guardrails (Windsurf Adapter)

## Role / Authority

- **Role:** Windsurf Cascade rule file mapping `AGENTS.md` and `core/` to Windsurf.
- **Authority:** Non-authoritative runtime adapter layer.

---

## 1. Core Instruction Mapping

- **Normative Baseline:** Follow `AGENTS.md` at the repository root.
- **Instruction Hierarchy:** Follow `core/instruction-hierarchy.md`.
- **Decision Framework:** Follow `core/decision-framework.md`.
- **Output Policy:** Follow `core/output-policy.md`.
- **Safety Boundary:** Follow `core/safety.md`.

## 2. Anti-Hallucination Guardrails

- **Pure Documentation:** This repository is a pure Markdown standard. It has no application code, no backend APIs, and no build compilation step.
- **Validation Script:** The only automated validation script is `node scripts/audit-compliance.js`. Do not run phantom test commands like `npm test` or `pytest`.
- **Core Tier Immutability:** Never modify `core/` files without explicit confirmation.
- **Template Placeholders:** Preserve `[PLACEHOLDER: ...]` markers in `context/` templates.
- **No Legacy Imports:** Do not reference files inside `legacy/`.
