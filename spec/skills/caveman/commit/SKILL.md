---
name: caveman-commit
description: >-
  Generate concise Conventional Commits under 70 characters without conversational padding.
version: 1.0.0
---

# Caveman Commit Generator

## 0. Identity

- **Role:** Conventional Commit generator under `spec/skills/caveman/`.
- **Authority:** Sub-skill of `spec/skills/caveman/`.
- **Must not define:** Normative tier-4 standards in `spec/core/`.
- **Normative base:** `core/instruction-hierarchy.md`, `shared/writing/writing-rules.md`.

---

## 1. Commit Format Standard

- **Subject Limit:** Maximum 70 characters.
- **Structure:** `<type>: <description>` or `<type>(<scope>): <description>`
- **Allowed Types:** `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`
- **Body:** Essential context only. No conversational filler.

---

## 2. Example Output

```text
docs(skills): add caveman token compression suite

Add caveman skill suite to spec/skills/ for token savings.
Includes commit, review, compress, and help sub-skills.
```
