# Getting Started

Adopt the agent-spec standard in your own project in under five minutes.

## 1. Clone

```bash
git clone https://github.com/iging/agent-spec.git
```

## 2. Copy the generic layer into your project

```bash
# From your project root:
cp path/to/agent-spec/AGENTS.md .
cp -r path/to/agent-spec/spec/core .
```

`AGENTS.md` is the portable, single-file synthesis of `spec/core/`. It contains no project-specific content, so it works unmodified in any repository.

## 3. Fill in the project templates

Copy the `spec/context/` directory and complete each placeholder:

```bash
cp -r path/to/agent-spec/spec/context .
```

| Template                  | What to fill in                                                     |
| ------------------------- | ------------------------------------------------------------------- |
| `context/PRD.md`          | Problem, scope, requirements, success metrics                       |
| `context/ARCHITECTURE.md` | System overview, component map, data flow, failure modes            |
| `context/SCHEMA.md`       | Data model (state plainly if there is no data layer)                |
| `context/DESIGN.md`       | Design system, or output/formatting conventions for non-UI projects |
| `context/RULES.md`        | Project coding rules, grounded in the clean-code standard           |

Each file ships with `[PLACEHOLDER: ...]` markers — replace them with your project's facts.

## 4. Point your AI tool at the standard

Use the adapter in `spec/runtime/` for your tool. Each adapter documents the exact files and locations that tool reads:

| Tool               | Setup                                                                    |
| ------------------ | ------------------------------------------------------------------------ |
| **Claude Code**    | Keep `AGENTS.md` at the root, or reference it from `CLAUDE.md`           |
| **Cursor**         | Add a rule file under `.cursor/rules/` referencing `AGENTS.md` / `spec/core/` |
| **GitHub Copilot** | Place the synthesis in `.github/copilot-instructions.md`                 |
| **Cline**          | Add a rule file in `.clinerules/`                                        |
| **Windsurf**       | Add an always-on rule under `.windsurf/rules/`                           |
| **Kiro**           | Add an always-included steering file under `.kiro/steering/`             |

## 5. (Optional) Add feature modules & skills

Browse the modular feature suites in [`spec/skills/`](../skills/) and copy any feature module or skill folder into your project's `.agents/` directory.

Two patterns are supported:

- **Individual skill** → `.agents/skills/<skill-name>/SKILL.md` (folder name matches the frontmatter `name:`, entry file is uppercase `SKILL.md`)
- **Whole module** → `.agents/<module-name>/` (router `SKILL.md` + stage folders copied as-is)

When a skill ships as a flat `.md` file, wrap it into a `<skill-name>/SKILL.md` folder before copying. See [**Installing Skills & Modules**](skill-installation.md) for exact conventions, copy commands, and a verification checklist.

## What happens next

Once set up, an AI agent consuming your project will:

1. **Discover** instruction sources by scanning the working directory up to the repository root.
2. **Infer** unwritten conventions from existing code.
3. **Resolve** which source wins using the [source-of-truth hierarchy](../../README.md#source-of-truth-hierarchy).
4. **Act** proportionally, scaling rigor to the change's risk and size.

## Further reading

- [README](../../README.md) — full architecture and layer model
- [CONTRIBUTING](../../CONTRIBUTING.md) — how to change the specification
- [FAQ](faq.md) — common questions
- [Anti-Patterns](anti-patterns.md) — 37 prompt patterns that waste tokens
