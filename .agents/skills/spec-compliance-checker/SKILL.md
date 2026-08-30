---
name: spec-compliance-checker
description: >-
  Audits Markdown documentation against agent-spec writing rules, anti-patterns, and link integrity.
---

# Spec Compliance Checker Skill

## Role / Authority

- **Role:** Specialized skill for auditing repository Markdown files.
- **Authority:** Non-authoritative execution helper running repository audit tools.

---

## 1. When to Invoke

Invoke this skill whenever:

- Modifying or adding Markdown files in `spec/core/`, `spec/context/`, `spec/docs/`, `spec/skills/`, or `spec/shared/`.
- Validating link integrity across repository files.
- Verifying compliance before submitting a pull request.

## 2. Verification Protocol

Run the repository compliance audit script:

```bash
node scripts/audit-compliance.js
```

## 3. Compliance Criteria

1. **Zero Banned Words:** Verify no prohibited terms listed in `spec/shared/writing/writing-rules.md`.
2. **Valid Link Targets:** Ensure all relative Markdown links point to existing files.
3. **Role / Authority Header:** Ensure files follow the structured Role/Authority section layout.
