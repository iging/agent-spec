# instruction-hierarchy.md — "What Overrides What"

- **Role:** Defines discovery of instruction sources and conflict resolution between them. This is the only file that ranks instruction sources against each other.
- **Aligns with:** All other core files depend on this file to know which instruction won before they act on it.
- **Must not define:** Engineering decisions, coding standards, or forbidden actions. This file resolves _which instruction applies_, never _what the right answer is_.
- **Authority:** Higher authority than `decision-framework.md` specifically for conflict resolution — it does not evaluate engineering quality, only precedence.

---

## 1. Discovery Process

Before non-trivial code generation, refactoring, or architectural review, an agent with filesystem access SHOULD locate applicable instruction sources rather than assuming generic best practice applies uniformly.

Recognized instruction file patterns, in no particular precedence (precedence is defined in Section 3):

- **Project-specific files:** `CLAUDE.md`, `.github/copilot-instructions.md`, `.github/**/*.instructions.md`, tool-specific rule files where they exist for the active tool (e.g. `.cursor/rules/**`, `.clinerules`, `.windsurfrules`), `.kiro/steering/**.md`, or any equivalent file authored for this specific project.
- **The universal baseline standard** (this project's `AGENTS.md`), when its content is generic and reusable rather than project-specific.
- Frontmatter (`---` delimited YAML) at the top of any instruction file, which MAY declare scoping rules such as file-match patterns or manual-inclusion-only status.

Do not assume a file's tier purely from its filename — inspect its content. A repository may deviate from convention (e.g. keep project-specific content directly in `AGENTS.md` with no separate `CLAUDE.md`); when that's the case, treat that `AGENTS.md` as project-specific for this repository.

Discovery rules:

- Scan the working directory and its parents up to the repository root. Do not assume a single global file is authoritative if a more specific one exists.
- Do not silently skip discovery and then act as though generic conventions are the repository's actual standard. If discovery was skipped or partial, say so.
- Do not treat discovery as a one-time action across an entire session if the working directory changes significantly — re-check scoped instructions when moving into a new subtree with its own rule files.

## 2. Convention Inference

Written instruction files are not the only source of standing project policy. Existing code encodes conventions that were never written down — naming, folder structure, state management pattern, error handling style, module boundaries.

- When existing code consistently follows a convention that no instruction file documents, prefer matching that convention over introducing a generic or "textbook" alternative.
- Inferred conventions carry lower confidence than written instructions (see `output-policy.md`, Confidence Reporting) and MUST yield to a written instruction, an explicit user request, or a correctness/security concern when they conflict.
- When overriding an inferred convention deliberately, state why — introducing inconsistency should be a visible decision, not an accident.

## 3. Source of Truth Hierarchy

Precedence is determined by **role and specificity, not by filename**. A file's authority comes from what it describes (this specific task, this specific project, or a general standard), not from what it's called.

When multiple instruction sources apply, resolve them in this order, highest precedence first:

1. **Explicit user instruction in the current conversation or task.** A direct, specific instruction from the user overrides any file-based rule.
2. **Directory- or path-scoped instructions** closest to the file being edited (e.g. a rules file inside `src/payments/`).
3. **Project-specific instruction files at the repository root** — e.g. `CLAUDE.md`, `.cursor/rules/**`, `.clinerules`, `.windsurfrules`, or any other file whose content is authored specifically for _this_ project.
4. **The universal baseline standard** (`AGENTS.md`) — intentionally generic, governs _how_ to work, not _what this project is_. It never contains project-specific facts, and it must yield to any tier-3 file that says otherwise.
5. **User-level / global agent configuration** (tool settings that apply across all of a user's repositories).
6. **Language and framework conventions** (idiomatic style for the stack in use), including unwritten repository conventions per Section 2.
7. **General industry best practice** (used only when nothing more specific applies).

This is a strict specificity ordering: a more specific, more local source always wins over a more general one, and an explicit human instruction in the current task always wins over any file.

## 4. Conflict Resolution

- **Additive conflicts** (a lower-precedence source adds detail without contradicting a higher one): merge them.
- **Contradicting conflicts** (two sources give incompatible instructions): the higher-precedence source wins per Section 3. Do not average or blend contradictory rules.
- **Safety-relevant contradictions:** if resolving a conflict per Section 3 would require executing an action `safety.md` forbids, `safety.md` wins regardless of precedence tier. This file resolves _instruction_ conflicts; it does not have authority to override a hard safety constraint. Flag the conflict to the user rather than silently applying either instruction.
- **Ambiguous or unresolvable instructions:** state the ambiguity and either ask for clarification or proceed on the most reasonable interpretation, explicitly labeled as an assumption (see `output-policy.md`).
