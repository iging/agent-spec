# Frequently Asked Questions

## General

### What is agent-spec?

A tool-agnostic behavioral specification for AI coding agents. It defines _how_ an agent should discover instructions, resolve conflicts, make engineering decisions, and report its work — as a set of Markdown files that any repository can adopt unmodified.

### Is this a framework or a library?

Neither. It is a documentation standard. There is no code, no build step, no runtime. It is Markdown files that AI agents read.

### Which AI tools does it support?

Claude Code, Cursor, GitHub Copilot, Cline, Windsurf, and Kiro. Each has a per-tool adapter in `runtime/`. Adding a new tool means writing one adapter file.

### Do I need all the files?

No. At minimum, copy `AGENTS.md` into your project root. It is a self-contained synthesis of the full `core/` specification. Add `core/` and `context/` when you want the full system.

---

## Architecture

### Why is `AGENTS.md` separate from `core/`?

Portability. `AGENTS.md` is a single file that works in any repository without dependencies. `core/` is the authoritative, multi-file specification. `AGENTS.md` is a manually reconciled synthesis — when they diverge, `core/` wins.

### What is the `context/` directory for?

Project-specific facts. The generic standard (`core/`, `AGENTS.md`, `runtime/`) must stay free of project content. All project adaptation — your stack, your data model, your coding rules — goes in `context/` templates.

### How do conflicts between instruction sources get resolved?

By a seven-tier specificity hierarchy (defined in `core/instruction-hierarchy.md`). The short version: explicit user instruction wins over everything; local instructions beat global ones; safety constraints override all but the host agent's own policy.

### What is the difference between `skills/` and `prompts/`?

**Skills** are agent-loadable behaviors — folders with a `SKILL.md` that an agent discovers and activates on demand. **Prompts** are standalone, re-runnable instructions you paste into an agent manually. Skills are automatic; prompts are manual.

---

## Contributing

### How do I add a new rule?

Add it to the owning `core/` file, then update `AGENTS.md` to match. Never define a rule in two places. See [CONTRIBUTING.md](../CONTRIBUTING.md) for the full discipline.

### How do I add a new skill?

Copy `skills/_template/` to a new folder, fill in the `SKILL.md`, and open a PR. See the [skill template](../skills/_template/SKILL.md) for the structure.

### How do I add support for a new AI tool?

Create a new adapter file in `runtime/` following the contract in `runtime/shared.md`. The adapter translates `core/` rules into that tool's file format — it must not introduce, override, or contradict any rule.

### Can I use this in a commercial project?

Yes. The project is [MIT licensed](../LICENSE).
