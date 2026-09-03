---
name: batch-site-research-scaffolder
description: Dispatches batch research across up to 500 target URLs using research capability skills, extracts site intelligence, and provisions shared governance context templates.
metadata:
  short-description: Batch research up to 500 URLs & scaffold context
---

Invokes the `batch-site-research-scaffolder` skill.

Steps to perform:

1. Execute the `batch-site-research-scaffolder` skill (`spec/skills/research-and-productivity/research/batch-site-research-scaffolder/SKILL.md`).
2. Audit the input batch URL target list (up to 500 sites) and categorize sites into operational domain cohorts.
3. Orchestrate research sub-skills (`deep-research-synthesizer`, `social-sentiment-researcher`, `editorial-fact-checker`) to extract site intelligence, technology stacks, compliance posture, and architectural patterns.
4. Present the Batch Research Blueprint & Governance Plan to the user and request explicit confirmation before writing any files.
5. Provision generated shared governance artifacts and updated `context/` templates into the target repository, preserving all `[PLACEHOLDER: ...]` markers on unconfirmed details.
6. Run `node scripts/audit-compliance.js` to verify zero structural compliance errors.
