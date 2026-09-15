---
name: caveman-review
description: >-
  Generate dense one-line PR review findings formatted as L<line>: <severity>: <problem>. <fix>.
version: 1.0.0
---

# Caveman Review Generator

## 0. Identity

- **Role:** One-line code review finding generator under `spec/skills/caveman/`.
- **Authority:** Sub-skill of `spec/skills/caveman/`.
- **Must not define:** Normative tier-4 standards in `spec/core/`.
- **Normative base:** `core/instruction-hierarchy.md`, `shared/writing/writing-rules.md`.

---

## 1. Finding Format Standard

`L<line>: <severity>: <problem>. <fix>.`

- **Severity Levels:** `bug`, `risk`, `style`, `nit`
- **Rule:** Exactly one line per finding. Zero conversational padding.

---

## 2. Example Output

```text
L14: style: banned word detected. Replace with direct phrasing.
L42: risk: null reference possible before check. Add guard condition.
L88: nit: long function spans multiple domains. Extract helper function.
```
