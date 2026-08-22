---
name: repo-status
description: Displays a summary status of the repository, including audited file counts, module inventory, and installed skills.
metadata:
  short-description: Display repo health & status
---

Displays a summary status of the repository, including audited file counts, module inventory, and installed skills.

Execute this status check:

```bash
node scripts/audit-compliance.js
```

And summarize the codebase modules from `modules/` and skills from `.agents/skills/`.
