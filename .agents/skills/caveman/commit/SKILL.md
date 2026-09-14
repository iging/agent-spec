---
name: caveman-commit
description: >-
  Generate concise Conventional Commits for agent-spec contributions.
  Enforces format category: brief description under 70 characters.
version: 1.0.0
---

# Caveman Commit Generator

## Role / Authority

- **Role:** Conventional Commit generator for agent-spec repository changes.
- **Authority:** Sub-skill of `.agents/skills/caveman/`.
- **Must not define:** Normative tier-4 standards in `spec/core/`.

---

## 1. Commit Format Standard

Commit titles must follow the repository contribution standard from `AGENTS.md`:

- **Title Limit:** Under 70 characters.
- **Title Structure:** `<type>: <description>` or `<type>(<scope>): <description>`
- **Allowed Types:** `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`
- **Body:** Concise explanation of rationale. No decorative filler.

---

## 2. Generation Directives

1. Inspect git status and staged diff directly.
2. Identify core change intent and affected files.
3. Emit commit message with zero conversational preamble.

### Example Output

```text
docs(skills): add caveman token compression suite

Add caveman skill suite to .agents/skills/ for contributor token savings.
Includes commit, review, compress, and help sub-skills.
```
