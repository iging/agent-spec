---
name: caveman-review
description: >-
  Generate dense one-line code and document review findings for agent-spec pull requests.
version: 1.0.0
---

# Caveman Pull Request Reviewer

## Role / Authority

- **Role:** Pull request review finding generator for agent-spec contributors.
- **Authority:** Sub-skill of `.agents/skills/caveman/`.
- **Must not define:** Direct merge decisions or normative tier-4 standards.

---

## 1. Review Format Standard

Structure findings as single lines per issue:

`L<line>: <severity>: <problem>. <fix>.`

- **Severity Levels:** `bug`, `risk`, `style`, `nit`
- **Output:** One line per finding. Zero conversational padding.

---

## 2. Example Findings

```text
L14: style: banned word detected. Replace with direct phrasing.
L42: risk: broken relative link target. Update target to point to valid file.
L88: nit: heading level skips from h2 to h4. Change h4 to h3.
```
