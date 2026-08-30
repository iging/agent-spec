# runtime/shared.md

## Role / Authority

- **Role:** Defines the common contract every tool adapter in `runtime/` follows — what belongs in an adapter versus what must never appear.
- **Authority:** Non-authoritative. Adapters **translate** `core/` into each tool's file mechanics; they hold no rule of their own and can never override `core/` or `AGENTS.md`.
- **Must not define:** any engineering, safety, precedence, or output rule. Those live in `core/`. An adapter that needs a rule references the owning `core/` file.

---

## 1. What an adapter documents

Only the mechanical facts of one tool's instruction system:

- **Exact filenames and locations** the tool reads (e.g. root file, a rules directory, a settings path).
- **Format quirks** — Markdown vs. YAML frontmatter, required headers, glob/scoping syntax.
- **Size or count limits**, truncation behavior, and load order the tool applies.
- **Merge behavior** — how the tool combines multiple instruction files, and how that maps onto the precedence in `instruction-hierarchy.md` §3.
- **How to point the tool at this standard** — e.g. copy `AGENTS.md` to the tool's expected path, or reference `core/` from the tool's rule file.

## 2. What an adapter must never contain

- Engineering rules, clean-code standards, safety constraints, or output policy — reference the owning `core/` file instead.
- Project-specific content — that lives only in `context/`.
- A re-ranking of instruction sources — precedence is owned solely by `instruction-hierarchy.md`.

## 3. Verification & staleness

Tool file conventions change. Verify current behavior against the tool's own documentation rather than restating this standard. When a fact can't be verified, mark it **best-known at time of writing** and date it. An adapter is a convenience mapping, not a source of truth.

## 4. Skills mapping (applies to every adapter)

`AGENTS.md` is the agent's **permanent memory** — read on every task, holding only what applies to everything (setup, build/test commands, coding style, structure, PR format). A **skill** is an on-demand specialist the agent loads only when a task calls for it (deployment, data migration, incident investigation).

Each adapter states how its tool exposes on-demand skills or specialist prompts (a skills folder, a manual-inclusion rule file, a slash command, etc.), and reinforces that `AGENTS.md` should **map** those skills — naming each and when to invoke it — rather than inlining their contents. Standing rules and specialist workflows stay in separate files.
