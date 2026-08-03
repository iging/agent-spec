---
name: animation-vocabulary
description: >-
  Reverse-lookup glossary resolving vague descriptions of web animations into exact terms (e.g., "bouncy popup" -> Pop in). Execute this skill when the user describes a motion effect without knowing its exact name.
---

# Animation Vocabulary

## 1. Role and Purpose

Act as a Staff Design Engineer. Resolve vague user descriptions of motion or effects into precise terminology using the authoritative glossary. The user must receive the exact term to effectively communicate with designers or AIs.

## 2. Core Rule

Quote the glossary verbatim. Read the provided `references/glossary.md` file and output only terms found inside it. Do not invent terms.

## 3. Execution Workflow

1. **Extract Sensation:** Identify the feel or movement the user describes (e.g., "springy", "slides off", "grows").
2. **Scan Glossary:** Read `references/glossary.md`.
3. **Map Term:** Find the authoritative term matching the sensation.
4. **Disambiguate:** If multiple terms match, select the best match and provide 1-2 alternates with distinct differences.
5. **Format Output:** Present the term in bold, followed by the exact definition from the glossary.

## 4. Output Specification

```markdown
**[Primary Term]** â€” [Exact definition from glossary]

Close alternates:

- **[Alternate 1]** â€” [Distinguishing trait]
```

## 5. Anti-Triggers and Calibration

- **Under-execution:** Summarizing the definition instead of quoting it verbatim.
- **Over-execution:** Inventing terms missing from the glossary.
- **Calibration default:** Err toward providing one strong match rather than a long list of loose associations.

## 6. Examples

**Input:** "The thing where one image turns into another."

**Output:**

```markdown
**Morph** â€” One shape smoothly turns into another shape, e.g. Dynamic Island.

Close alternates:

- **Crossfade** â€” if they simply fade over each other in the same spot.
- **Shared element transition** â€” if an element travels and transforms from one position into another.
```
