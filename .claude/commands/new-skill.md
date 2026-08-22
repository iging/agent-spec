---
name: new-skill
description: Guides the creation of a new skill following the agent-spec canonical layout.
metadata:
  short-description: Scaffold a new skill
---

Guides the creation of a new skill following the agent-spec canonical layout.

Steps to perform:

1. Prompt for skill name and domain responsibility.
2. Create directory `.agents/skills/<skill-name>/`.
3. Create entry file `.agents/skills/<skill-name>/SKILL.md` (uppercase).
4. Add YAML frontmatter with exact `name:` and concise `description:`.
5. Add Role/Authority section and numbered operational guidelines.
6. Verify compliance with `node scripts/audit-compliance.js`.
