---
name: caveman-help
description: >-
  Quick reference cheatsheet for Caveman commands, intensities, and sub-skills.
version: 1.0.0
---

# Caveman Help Reference

## 0. Identity

- **Role:** Reference cheat sheet for Caveman suite under `spec/skills/caveman/`.
- **Authority:** Sub-skill of `spec/skills/caveman/`.
- **Must not define:** Normative tier-4 standards in `spec/core/`.
- **Normative base:** `core/instruction-hierarchy.md`, `shared/writing/writing-rules.md`.

---

## 1. Commands Reference

| Command            | Action                                           |
| :----------------- | :----------------------------------------------- |
| `caveman lite`     | Activate zero-filler complete sentences          |
| `caveman full`     | Activate default compressed style with fragments |
| `caveman ultra`    | Activate maximum compression mode                |
| `caveman off`      | Deactivate compression and restore normal tone   |
| `caveman-commit`   | Generate concise Conventional Commit message     |
| `caveman-review`   | Generate one-line review findings                |
| `caveman-compress` | Compress targeted Markdown document              |

---

## 2. Invariants

- Code blocks, commands, and paths remain untouched.
- Critical logic qualifiers (`not`, `never`, `no`) are never dropped.
- Writing standards from `spec/shared/writing/writing-rules.md` remain in effect.
