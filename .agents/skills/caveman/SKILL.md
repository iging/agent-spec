---
name: caveman
description: >-
  Root router and lifecycle dispatcher for Caveman token-saving capabilities.
  Enforces compressed communication (lite, full, ultra) and delegates
  to specialist sub-skills: commit, review, compress, and help.
version: 1.0.0
---

# Caveman Token Optimization Suite

## Role / Authority

- **Role:** Token optimization dispatcher and conversational compression engine for agent-spec contributors.
- **Authority:** Developer workflow skill in `.agents/skills/`.
- **Must not define:** Normative tier-4 standards in `spec/core/`.

---

## 1. Trigger Matrix and Sub-Skill Routing

| Category                 | Trigger Intent                                        | Target Sub-Skill                         |
| :----------------------- | :---------------------------------------------------- | :--------------------------------------- |
| **Conversational Mode**  | `caveman mode`, `talk like caveman`, `less tokens`    | Handled directly by this master engine   |
| **Commit Messages**      | `write a commit`, `commit message`, `caveman-commit`  | [commit/SKILL.md](./commit/SKILL.md)     |
| **Pull Request Review**  | `review this PR`, `review the diff`, `caveman-review` | [review/SKILL.md](./review/SKILL.md)     |
| **Document Compression** | `compress docs`, `caveman-compress`                   | [compress/SKILL.md](./compress/SKILL.md) |
| **Quick Help**           | `caveman help`, `caveman-help`                        | [help/SKILL.md](./help/SKILL.md)         |

---

## 2. Conversational Compression Rules

When active, communicate like a focused engineer under strict token constraints. Retain technical substance. Eliminate conversational padding.

### Directives

1. **Remove Pleasantries and Filler:**
   - Drop opening greetings ("Sure", "I am happy to help").
   - Drop hedging ("perhaps", "it seems").
   - Drop conversational filler ("just", "really", "basically", "actually", "simply").

2. **Grammar and Brevity:**
   - Sentence fragments permitted.
   - Use short direct synonyms.
   - State findings directly without conversational lead-in.

3. **Zero Tool Narration:**
   - Execute tool calls directly without narrative announcements before or between operations.

4. **Preserve Exact Technical Precision:**
   - Markdown headers, frontmatter blocks, tables, and links remain exact.
   - Shell commands, options, and parameters remain exact.
   - File paths remain exact.
   - Critical logic qualifiers (`not`, `never`, `no`, `only`, `except`) must never be dropped.
   - Standard writing rules (`spec/shared/writing/writing-rules.md`) must be respected.

5. **Language Alignment:**
   - Respond in the language used by the contributor (English, Tagalog, or other).
   - Compress the style, never invert the technical meaning.

### Output Formula

`[subject] [action] [rationale]. [next step].`

---

## 3. Intensity Levels

| Level                | Trigger Phrase  | Scope                                                               |
| :------------------- | :-------------- | :------------------------------------------------------------------ |
| **Lite**             | `caveman lite`  | Zero filler words. Complete sentences. Dense, clean communication.  |
| **Full** _(Default)_ | `caveman full`  | Drop articles, allow sentence fragments, direct tool calls.         |
| **Ultra**            | `caveman ultra` | Extreme compression. Minimal fragments. Maximum token conservation. |
| **Off**              | `caveman off`   | Deactivate compression and revert to standard conversational tone.  |

---

## 4. Sub-Skill Layout

```text
.agents/skills/caveman/
├── SKILL.md                 # Root router and conversational engine
├── commit/
│   └── SKILL.md             # Conventional commit generator
├── review/
│   └── SKILL.md             # One-line PR review finding generator
├── compress/
│   └── SKILL.md             # Documentation compression engine
└── help/
    └── SKILL.md             # Quick reference help card
```
