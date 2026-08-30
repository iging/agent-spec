# Agent Behavioral Standard & Anti-Hallucination Guardrails (Windsurf Adapter)

## Role / Authority

- **Role:** Windsurf Cascade rule file mapping `AGENTS.md` and `spec/core/` to Windsurf.
- **Authority:** Non-authoritative runtime adapter layer.

---

## 1. Primary Instruction Mapping

All operations in this repository must follow the Linux Foundation Agentic AI standard (`agent-spec`):

- **Normative Baseline:** Follow `AGENTS.md` at the repository root.
- **Instruction Hierarchy:** Follow `spec/core/instruction-hierarchy.md`.
- **Decision Framework:** Follow `spec/core/decision-framework.md`.
- **Output Policy:** Follow `spec/core/output-policy.md`.
- **Safety Boundary:** Follow `spec/core/safety.md`.

## 2. Anti-Hallucination Guardrails

- **Pure Documentation:** This repository is a pure Markdown standard. It has no application code, no backend APIs, and no build compilation step.
- **Validation Script:** The only automated validation script is `node scripts/audit-compliance.js`. Do not run phantom test commands like `npm test` or `pytest`.
- **Core Tier Immutability:** Never modify `spec/core/` files without explicit confirmation.
- **Template Placeholders:** Preserve `[PLACEHOLDER: ...]` markers in `spec/context/` templates.
- **No Legacy Imports:** Do not reference files inside `spec/legacy/`.
