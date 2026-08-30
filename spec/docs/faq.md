# Frequently Asked Questions

## General

### What is agent-spec?

A tool-agnostic behavioral specification for AI coding agents. It defines _how_ an agent should discover instructions, resolve conflicts, make engineering decisions, and report its work — as a set of Markdown files that any repository can adopt unmodified.

### Is this a framework or a library?

Neither. It is a documentation standard. There is no code, no build step, no runtime. It is Markdown files that AI agents read.

### Which AI tools does it support?

Claude Code, Cursor, GitHub Copilot, Cline, Windsurf, and Kiro. Each has a per-tool adapter in `spec/runtime/`. Adding a new tool means writing one adapter file.

### Do I need all the files?

No. At minimum, copy `AGENTS.md` into your project root. It is a self-contained synthesis of the full `spec/core/` specification. Add `spec/core/` and `spec/context/` when you want the full system.

---

## Architecture

### Why is `AGENTS.md` separate from `spec/core/`?

Portability. `AGENTS.md` is a single file that works in any repository without dependencies. `spec/core/` is the authoritative, multi-file specification. `AGENTS.md` is a manually reconciled synthesis — when they diverge, `spec/core/` wins.

### What is the `spec/context/` directory for?

Project-specific facts. The generic standard (`spec/core/`, `AGENTS.md`, `spec/runtime/`) must stay free of project content. All project adaptation — your stack, your data model, your coding rules — goes in `spec/context/` templates.

### How do conflicts between instruction sources get resolved?

By a seven-tier specificity hierarchy (defined in `spec/core/instruction-hierarchy.md`). The short version: explicit user instruction wins over everything; local instructions beat global ones; safety constraints override all but the host agent's own policy.

### How are capability modules structured?

Capabilities are organized into self-contained feature modules under `spec/skills/` (such as `spec/skills/autonomous-dev/`, `spec/skills/design-engineering/`, etc.). Each module contains its own router `SKILL.md` and related resources, allowing drag-and-drop portability into adopter repositories.

---

## Contributing

### How do I add a new rule?

Add it to the owning `spec/core/` file, then update `AGENTS.md` to match. Never define a rule in two places. See [CONTRIBUTING.md](../../CONTRIBUTING.md) for the full discipline.

### How do I add a new skill?

Copy `spec/skills/_template/` to a new folder, fill in the `SKILL.md`, and open a PR. See the [skill template](../skills/_template/SKILL.md) for the structure.

### How do I add support for a new AI tool?

Create a new adapter file in `spec/runtime/` following the contract in `spec/runtime/shared.md`. The adapter translates `spec/core/` rules into that tool's file format — it must not introduce, override, or contradict any rule.

### Can I use this in a commercial project?

Yes. The project is [MIT licensed](../../LICENSE).

### How do I install a skill or module in my project?

Copy the skill folder or module into your project's `.agents/` directory. Two patterns exist: an individual skill goes in `.agents/skills/<skill-name>/SKILL.md` (folder name matches the frontmatter `name:`, entry file is uppercase `SKILL.md`), and a whole module goes in `.agents/<module-name>/`. Flat `.md` skill files must be wrapped into a folder named after the skill. See [Installing Skills & Modules](skill-installation.md) for the exact conventions and commands.
