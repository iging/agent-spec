---
name: evaluate-pr-suggestions
description: Lists the authoritative constraint documents this skill cross-references when evaluating automated PR bot suggestions. Fill in the placeholders for your project.
---

# Review Sources

## 1. Context and Scope

- **Authority:** Reference for the `evaluate-pr-suggestions` skill.
- **Scope:** The bounded set of files every automated PR suggestion must be cross-referenced against before a verdict.

## 2. Mandatory Sources

The following are checked for EVERY suggestion, in this order:

1. **`AGENTS.md`** — project rules and forbidden-pattern list at the repository root.
2. **`docs/anti-patterns.md`** — the agent-spec 53 anti-pattern catalog.
3. **`shared/writing/writing-rules.md`** — writing and documentation constraints.

## 3. Project-Specific Sources

Add your project's authoritative architecture documents below. [PLACEHOLDER: path and file for the architecture document, e.g. `context/ARCHITECTURE.md`]

- Architecture: [PLACEHOLDER: path, e.g. `context/ARCHITECTURE.md`]
- Design: [PLACEHOLDER: path, e.g. `context/DESIGN.md`]
- Schema/Data Model: [PLACEHOLDER: path, e.g. `context/SCHEMA.md`]

## 4. Usage Rule

Never accept an automated PR suggestion at face value. Check it against every source listed above. If a suggestion violates any listed constraint, it must be rejected. If a project-specific source is unfilled, the mandatory sources (Section 2) still apply and are sufficient as a review baseline.