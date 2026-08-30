# core/instruction-hierarchy.md

## Role / Authority

- **Role:** Defines how an agent discovers instruction sources, infers unwritten conventions, ranks sources against each other, and resolves conflicts between them.
- **Authority:** Normative (tier 4, `core/`). This is the **only** file that ranks instruction sources by precedence. Other files may reference this ordering but must not restate or redefine it.
- **Must not define:** engineering evaluation or code standards (see `decision-framework.md`), hard safety constraints (see `safety.md`), or presentation rules (see `output-policy.md`). When precedence resolution touches a safety-relevant risk, defer the risk decision to `safety.md`.

---

## 1. Discovery

Before non-trivial code generation, refactoring, or architectural review, an agent with filesystem access locates applicable instruction sources rather than assuming generic best practice applies uniformly.

Recognized instruction sources (precedence is defined in Section 3, not by filename):

- **Project-specific files** — `AGENTS.md`, `CLAUDE.md`, `.github/copilot-instructions.md`, `.github/**/*.instructions.md`, tool rule files where they exist for the active tool (e.g. `.cursor/rules/**`, `.clinerules`, `.windsurfrules`), `.kiro/steering/**.md`, or any file authored for this specific project.
- **Tool-agnostic supplementary instructions** — a repository `.agents/` or `context/` folder holding reusable prompts, skills, or project reference material any agent can pull in.
- **This generic standard** — a repository's `AGENTS.md`/`core/` when its content is generic and reusable rather than project-specific.
- **Frontmatter** (`---` delimited YAML) at the top of any instruction file, which may declare scoping such as file-match patterns or manual-inclusion-only status.

Discovery rules:

- Scan the working directory and its parents up to the repository root. Do not assume a single global file is authoritative when a more specific one exists.
- Inspect content, not just filename. A file named `AGENTS.md` may hold project-specific facts (making it project-specific in role) or a generic standard. Determine role from what it describes.
- Read a root `CLAUDE.md` as part of discovery regardless of which tool is active — it is tool-agnostic project documentation, not a Claude-only file.
- Do not silently skip discovery and then act as though generic conventions are the repository's actual standard. If discovery was skipped or partial, say so (reporting owned by `output-policy.md`).
- Re-check scoped instructions when moving into a new subtree that has its own rule files; discovery is not a one-time action if the working directory changes significantly.

---

## 2. Convention Inference

Existing code encodes standing conventions that were never written down — naming, folder structure, state-management pattern, error-handling style, module boundaries.

- When existing code consistently follows a convention no instruction file documents, prefer matching it over a generic or textbook alternative.
- Inferred conventions carry lower confidence than written instructions and yield to a written instruction, an explicit user request, or a correctness/security concern.
- When deliberately overriding an inferred convention, state why — introducing inconsistency should be a visible decision, not an accident.

---

## 3. Source-of-Truth Hierarchy

Precedence comes from **role and specificity, not filename**. A file's authority comes from what it describes (this task, this project, or a general standard). Highest precedence first:

1. **Explicit user instruction** in the current conversation or task.
2. **Directory- or path-scoped instructions** closest to the file being edited.
3. **Project-specific instruction files at the repository root** — files whose content is authored for _this_ project (stack, architecture, team conventions), including a filled-in `context/`.
4. **This generic standard** — `core/` and the synthesized `AGENTS.md`. Intentionally free of project facts; governs _how_ to work, not _what this project is_. Yields to any tier-3 source that says otherwise.
5. **User-level / global agent configuration** — tool settings applying across all of a user's repositories.
6. **Language and framework conventions** — idiomatic style for the stack, including unwritten repository conventions (Section 2).
7. **General industry best practice** — used only when nothing more specific applies.

This is a strict specificity ordering: a more specific, more local source wins over a more general one, and an explicit human instruction always wins over any file. Because the generic standard (tier 4) holds no project facts and always yields to tier 3, it is copyable unmodified into any repository. All project adaptation happens by authoring tier-3 files, never by editing the generic layer.

---

## 4. Conflict Resolution

- **Additive conflicts** (a lower-precedence source adds detail without contradicting a higher one): merge them.
- **Contradicting conflicts** (incompatible instructions): the higher-precedence source wins per Section 3. Do not average or blend contradictory rules.
- **Safety-relevant contradictions** (a lower-precedence source would introduce a security, data-loss, or correctness risk): flag the conflict before proceeding. Precedence governs style and architecture preference; it does not authorize silently shipping a known defect. The risk decision itself is owned by `safety.md`.
- **Ambiguous or unparseable instructions**: state the ambiguity and either ask for clarification or proceed on the most reasonable interpretation, explicitly labeled as an assumption (labeling owned by `output-policy.md`).
