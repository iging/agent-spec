---
name: software-engineering-context-scaffolder
description: Scaffolds, audits, and maintains the 23 Enterprise Software Engineering Context domains across greenfield and brownfield repositories.
metadata:
  short-description: Audit and scaffold 23 context domains
---

Invokes the `software-engineering-context-scaffolder` skill.

Steps to perform:

1. Execute the `software-engineering-context-scaffolder` skill (`spec/skills/dev-workflow/workflows/software-engineering-context-scaffolder/SKILL.md`).
2. Audit the target repository context across all 23 Enterprise Software Engineering Context domains detailed in `references/context-domains.md`.
3. Present the Context Scaffolding Audit & Plan to the user and request explicit confirmation before writing any files.
4. Provision approved context templates into `.agents/context/` or `context/`, preserving all `[PLACEHOLDER: ...]` markers on unconfirmed details.
5. Run `node scripts/audit-compliance.js` to verify zero structural compliance errors.
