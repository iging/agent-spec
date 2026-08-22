# Project Instructions (Cline Adapter)

## Role / Authority

- **Role:** Entry point for Cline agent operation inside the `agent-spec` repository.
- **Authority:** Non-authoritative runtime adapter mapping `AGENTS.md` and `core/` to Cline.
- **Must not define:** Standalone normative rules overriding `core/`.

---

## 1. Standard Rules & Baseline

- **Normative Baseline:** Follow `AGENTS.md` at the repository root.
- **Precedence & Discovery:** Follow `core/instruction-hierarchy.md`.
- **Decision Framework:** Follow `core/decision-framework.md`.
- **Output Policy:** Follow `core/output-policy.md`.
- **Safety Boundary:** Follow `core/safety.md`.

## 2. Modular Rules Index

Detailed workspace rules are configured under `.cline/rules/`:
- `.cline/rules/00-agent-spec.md`: Primary instruction mapping.
- `.cline/rules/10-anti-hallucination.md`: Guardrails against phantom build scripts & tests.
- `.cline/rules/50-project-facts.md`: Workspace structure and writing style constraints.
