---
name: spec-authoring-assistant
description: >-
  Guides the creation of new skills, modules, and adapter files following agent-spec conventions.
---

# Spec Authoring Assistant Skill

## Role / Authority

- **Role:** Meta-assistant skill for creating compliant agent-spec documentation, skills, and modules.
- **Authority:** Operational guidance following `spec/docs/skill-installation.md` and `spec/docs/getting-started.md`.

---

## 1. Skill Creation Standard

When creating a new skill:

1. **Directory Pattern:** Place individual skills at `.agents/skills/<skill-name>/SKILL.md`.
2. **Uppercase Filename:** Entry file must be `SKILL.md` (all uppercase).
3. **YAML Frontmatter:** Include exact `name:` and `description:` matching directory name.
4. **Role / Authority Header:** Include `# [Skill Name]` followed immediately by `## Role / Authority`.

## 2. Module Creation Standard

When creating a new feature module under `spec/skills/`:

1. **Module Router:** Provide a root `SKILL.md` routing to numbered stage directories.
2. **Intent Model:** Follow the 9-dimension intent model outlined in `spec/meta/agent-spec-generator.md`.
3. **Writing Rules:** Apply clear writing style without buzzwords (`spec/shared/writing/writing-rules.md`).
