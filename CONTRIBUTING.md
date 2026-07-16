# Contributing

This repository is Markdown only — no code, no build step. Contributions are edits to specification files. The value of the system depends on one discipline: **every rule lives in exactly one place.** Read this before changing anything.

## The layer model

```
core/       → defines the rules (highest authority, generic)
runtime/    → translates rules per tool (no authority of its own)
examples/   → demonstrates rules applied (no authority of its own)
context/    → project-adaptation templates the consumer fills in (tier 3)
AGENTS.md   → portable single-file synthesis of core/, read first every task
```

## Where each kind of change goes

| You want to…                            | Edit…                                         |
| --------------------------------------- | --------------------------------------------- |
| Add, change, or remove a **rule**       | the one owning file in `core/` — nowhere else |
| Change how a **tool's files** work      | that tool's adapter in `runtime/`             |
| Add or fix a **worked example**         | `examples/`                                   |
| Change **project-fill-in** templates    | `context/`                                    |
| Reflect a `core/` change in the summary | `AGENTS.md` (keep it reconciled — see below)  |

## The core rules of contributing

1. **`core/` is the only place rules are defined.** `runtime/`, `examples/`, and `context/` translate, demonstrate, or fill in `core/` rules — they never introduce, override, or contradict one. If you need a rule that doesn't exist, add it to the owning `core/` file first.
2. **No rule is defined twice.** If two files would state the same rule, one of them is wrong — cross-reference the owning `core/` file instead of copying its text.
3. **Keep `AGENTS.md` reconciled with `core/`.** `AGENTS.md` is a manually-maintained synthesis. When you change a rule in `core/`, update `AGENTS.md` to match. If they ever diverge, `core/` is authoritative.
4. **Keep the generic standard generic.** No project-specific facts, stack names, personas, or adversarial tone in `core/`, `runtime/`, `examples/`, or `AGENTS.md`. Project facts belong only in `context/` (or a consumer's own files).
5. **Preserve the Role/Authority header.** Every file in `core/`, `runtime/`, and `examples/` opens with one, stating what it may define and whether it holds authority. Keep it accurate when you edit.

## Out of the rule chain — do not edit as part of the system

- **`archive/`** — the author's historical snapshots. Left exactly as-is.
- **`prompts/`** — standalone prompts, including the generator that produces this system. Left exactly as-is.

The generator (`prompts/agent-spec-generator.md`) does not touch `archive/` or `prompts/`, and does not create or overwrite `README.md` (that is produced separately by `prompts/readme-generator.md`).

## Before you open a PR

- Confirm the rule you changed still lives in exactly one `core/` file.
- Confirm `AGENTS.md` still matches `core/`.
- Confirm no project-specific content leaked into a generic file.
- Confirm all files render as valid Markdown.
