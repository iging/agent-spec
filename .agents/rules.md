# Universal Agent Rules (.agents/rules.md)

## Role / Authority

- **Role:** Tool-agnostic repository entry point for any agent discovering `.agents/`.
- **Authority:** Non-authoritative layer linking to `AGENTS.md` and `core/`.
- **Must not define:** Standalone normative instructions.

---

## 1. Governance Reference

Any AI agent reading this workspace must adhere to:

1. `AGENTS.md` at root.
2. `core/instruction-hierarchy.md` (Tiers & Discovery).
3. `core/decision-framework.md` (Decision Protocols).
4. `core/output-policy.md` (Output & Communication).
5. `core/safety.md` (Safety & Boundaries).

## 2. Strict Operational Boundaries

- **Pure Documentation:** This repository contains documentation standards and specifications. It contains no executable web servers, backend applications, or application builds.
- **Validation Script:** Run `node scripts/audit-compliance.js` for automated compliance and link integrity verification.
- **Writing Standards:** Strictly observe `shared/writing-rules.md` and `docs/anti-patterns.md`. Avoid banned buzzwords and artificial fluff.
- **Core Files Protection:** Do not modify files in `core/` without explicit instructions.
