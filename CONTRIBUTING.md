# Contributing to agent-spec

Thanks for considering a contribution. This repo is a specification, not application code — most contributions are edits to Markdown files, so the bar is clarity and consistency, not build tooling.

## Before you start

Read `README.md`'s Architecture section. It's short and explains the four-folder layering model (`core/` → `runtime/` → `examples/`, plus standalone `prompts/`, and a non-normative `history/` for deprecated spec snapshots). Every contribution should fit cleanly into one of these categories:

| If you want to...                              | Edit...                        |
| ---------------------------------------------- | ------------------------------ |
| Add or change an engineering rule              | `core/*.md` only               |
| Add support for a new AI tool                  | a new `runtime/<tool>.md` file |
| Demonstrate a rule with a concrete scenario    | a new `examples/*.md` file     |
| Add a standalone, spec-independent prompt      | `prompts/*.md`                 |
| Fix a mismatch between `AGENTS.md` and `core/` | both, kept in sync (see below) |
| Deprecate an old spec version                  | move it to `history/*.md`      |

## Rules for each folder

### `core/`

This is the only place engineering rules, safety constraints, or precedence logic may be defined. Before adding a rule:

- Confirm it doesn't already exist, worded differently, in another `core/` file.
- Confirm which single file owns it: `instruction-hierarchy.md` (precedence/conflict resolution), `decision-framework.md` (engineering tradeoffs), `safety.md` (hard constraints), or `output-policy.md` (presentation).
- Do not duplicate a rule across two `core/` files — reference the owning file instead (see the existing "Aligns with" / "Must not define" headers in each file for the pattern).

Changes to `core/` affect every `runtime/` adapter and every `examples/` file that references it. Check whether `examples/` still accurately demonstrates a rule after changing it, and update `AGENTS.md` (the single-file synthesis) to match.

### `runtime/`

A runtime adapter documents a tool's actual file mechanics — nothing else. Before submitting a new adapter:

- Verify the tool's current documented behavior directly (official docs), not from memory or a blog post — tool file formats and constraints change between vendor releases.
- Follow the existing Role/Authority header pattern (see any file in `runtime/` for the template) and keep the adapter scoped to "what's different about this tool," per `runtime/shared.md`.
- Do not restate an engineering rule from `core/` inside a runtime file. If you find yourself writing a rule rather than a file-format fact, it belongs in `core/` instead.
- Add your new file to the table in `README.md`'s "runtime/" section and to the "Usage" list.

### `examples/`

- Cite the specific `core/` file and section the example demonstrates — don't introduce a rule that doesn't already exist in `core/`.
- Include the same Role/Authority header used in the existing example files.
- Prefer a concrete, narrow scenario over a broad survey of many rules at once — the existing examples each focus on one or two `core/` sections.
- Add your new file to the table in `README.md`'s "examples/" section.

### `prompts/`

- Keep these self-contained. A prompt here should be useful on its own, with no dependency on `core/` unless the prompt states that dependency explicitly.
- Keep prompts scoped to AI coding agent tasks (documentation, git workflow, README generation, and similar). This repository's mission is a coding-agent specification — a prompt unrelated to software engineering work, however well-written, doesn't belong here even if it's technically "standalone."

### `history/`

- This folder holds deprecated, non-normative snapshots of earlier versions of the standard (e.g. `AGENTS-V1.md`, `AGENTS-V2.md`). Nothing in `history/` is live — no other file should reference or depend on it.
- Do not add new rules here. If a `core/` file is being deprecated, move the old version here and update `README.md`'s note explaining why it's retained (or delete it outright if it has no historical/contrast value).

## Style

- Markdown only, no non-Markdown build artifacts in this repo.
- Match the existing tone: direct, evidence-based, no filler. Avoid marketing language ("seamlessly," "powerful," "cutting-edge").
- Use the Role/Authority/Aligns-with header pattern already established in `core/`, `runtime/`, and `examples/` files — it's what lets a reader tell at a glance whether a file can define a new rule or only reference one.

## Submitting a change

1. Open an issue first for anything that adds a new rule to `core/` or changes existing precedence — these affect every downstream file and are worth discussing before writing.
2. Small fixes (typos, broken links, a new `runtime/` adapter, a new `examples/` scenario) can go straight to a PR.
3. In the PR description, state which `core/` file/section (if any) your change relates to, and which other files you updated to stay consistent (e.g. README tables, `AGENTS.md`).
4. Keep PRs scoped to one category of change. A PR that adds a `runtime/` adapter shouldn't also sneak in an unrelated `core/` rule change.
