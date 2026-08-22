---
inclusion: always
---

# Agent Behavioral Standard & Anti-Hallucination Guardrails (Kiro Adapter)

## Role / Authority

- **Role:** Kiro steering file mapping `AGENTS.md` and `core/` to Kiro AI.
- **Authority:** Non-authoritative runtime adapter layer.

---

## 1. Core Instruction Mapping

- **Normative Baseline:** Follow `AGENTS.md` at the repository root.
- **Instruction Hierarchy:** Follow `core/instruction-hierarchy.md`.
- **Decision Framework:** Follow `core/decision-framework.md`.
- **Output Policy:** Follow `core/output-policy.md`.
- **Safety Boundary:** Follow `core/safety.md`.

## 2. Anti-Hallucination Guardrails

- **Pure Documentation Repository:** This workspace contains Markdown documentation standards. It contains no web server, backend service, or frontend application.
- **Single Validation Tool:** Automated compliance is checked via `node scripts/audit-compliance.js`. Do not attempt to run `npm test` or build scripts.
- **Core Tier Immutability:** Do not edit `core/` files without explicit confirmation.
- **Context Templates:** Keep `[PLACEHOLDER: ...]` markers intact in `context/`.
- **No Legacy References:** Never import or reference files from `legacy/`.
