# Agent Behavioral Standard (Cline Adapter)

## Role / Authority

- **Role:** Entry point for Cline agent operation inside the `agent-spec` repository.
- **Authority:** Non-authoritative runtime adapter mapping `AGENTS.md` and `spec/core/` to Cline.
- **Must not define:** Standalone normative rules overriding `spec/core/`.

---

## 1. Primary Instruction Mapping

All operations in this repository must follow the Linux Foundation Agentic AI standard (`agent-spec`):

- **Normative Baseline:** Follow `AGENTS.md` at the repository root.
- **Instruction Hierarchy:** Follow `spec/core/instruction-hierarchy.md`.
- **Decision Framework:** Follow `spec/core/decision-framework.md`.
- **Output Policy:** Follow `spec/core/output-policy.md`.
- **Safety Boundary:** Follow `spec/core/safety.md`.
