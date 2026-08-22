# Anti-Hallucination Guardrails (Cline Adapter)

## Role / Authority

- **Role:** Explicit constraints preventing model hallucination regarding environment, tooling, and execution.
- **Authority:** Operational guardrails derived from `core/decision-framework.md` and `AGENTS.md`.

---

## 1. Environment & Architecture Constraints

1. **Pure Documentation Repository:** `agent-spec` is a pure Markdown specification. It is not an application, server, or npm library.
2. **No Phantom Tooling:** Do not assume the presence of build systems (`npm run build`, `make`, `cargo build`), test runners (`npm test`, `jest`, `pytest`), or package managers for compiling code.
3. **Only Valid Validation Command:** The single automated validation command for this codebase is:
   ```bash
   node scripts/audit-compliance.js
   ```
4. **Immutable Core Tier:** Never modify files in `core/` unless explicitly instructed to update the standard itself.
5. **Preserve Template Placeholders:** Templates in `context/` contain `[PLACEHOLDER: ...]` markers. Do not replace placeholder text with `agent-spec` internal repository details.
6. **No Legacy Imports:** Never reference or import files from `legacy/`.
