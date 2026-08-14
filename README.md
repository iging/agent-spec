# agent-spec

A tool-agnostic behavioral specification for AI coding agents. Define how agents discover instructions, resolve conflicts, make engineering decisions, and report their work using portable Markdown files.

## Overview

agent-spec is the Linux Foundation Agentic AI standard for configuring AI coding agents. This is a pure documentation repository designed to be copied into other projects. It provides a structured approach to agent behavior through portable markdown files that work across Claude Code, Cursor, GitHub Copilot, Cline, Windsurf, and Kiro.

The specification separates project-agnostic normative instructions from project-specific facts. Copy the generic layer unmodified, fill in templates with your project details, and point your AI tool at the standard.

## Features

- **Tool-agnostic standard** for AI agent behavior across multiple IDEs and platforms
- **Seven-tier instruction hierarchy** with explicit conflict resolution
- **Normative core** covering instruction discovery, decision framework, output policy, and safety
- **Project templates** for PRD, architecture, schema, design, rules, and tasks
- **Eight capability modules** organizing autonomous dev, design engineering, mobile, enterprise business, dev workflows (including web starter kits), prompt engineering, content & growth, and research & productivity
- **Domain principles** for engineering, design, and writing rules
- **IDE adapters** for Claude Code, Cursor, Copilot, Cline, Windsurf, and Kiro
- **53 documented anti-patterns** that waste tokens and burn API credits
- **Annotated examples** demonstrating proper agent decision-making and rigor calibration

## Tech Stack

This is a documentation-only repository with no runtime dependencies.

- **Language:** Markdown
- **Structure:** Role/Authority pattern with strict separation of concerns
- **Version Control:** Git

## Architecture

### Folder Structure

```
agent-spec/
├── core/                   # Normative tier-4 instructions (portable, project-agnostic)
│   ├── instruction-hierarchy.md   # Discovery, precedence, conflict resolution
│   ├── decision-framework.md      # Engineering evaluation, clean-code standards
│   ├── output-policy.md          # Presentation, confidence reporting
│   ├── safety.md                 # Non-negotiable constraints, capability boundaries
│   └── README.md                 # Core layer index & adopter guide
├── context/                # Project-specific templates (shipped with placeholders)
│   ├── ARCHITECTURE.md           # System architecture template
│   ├── DESIGN.md                 # Design system template
│   ├── PRD.md                    # Product requirements template
│   ├── RULES.md                  # Project coding rules template
│   ├── SCHEMA.md                 # Database and API schema template
│   ├── TASKS.md                  # Task decomposition tracking template
│   └── README.md                 # Context template index
├── docs/                   # User-facing guides
│   ├── getting-started.md        # Quick setup guide
│   ├── faq.md                    # Common questions
│   ├── anti-patterns.md          # 53 credit-killing patterns
│   ├── skill-installation.md     # Module & skill installation standard
│   └── skill-standard.md        # Tier-5 skill schema specification
├── examples/               # Annotated workflow decision traces & brand presets
│   ├── architecture-review.md    # Architectural audit trace
│   ├── capability-degradation.md # Resiliency & missing tool handling
│   ├── full-rigor-production-change.md # High-rigor safety trace
│   ├── proportional-minimal-change.md # Minimal targeted change trace
│   ├── refactor-problem-first.md # Problem-first refactoring trace
│   ├── security-conflict.md     # Security policy conflict resolution
│   └── README.md                 # Workflow examples index
├── modules/                # Modular feature-based capability suites
│   ├── autonomous-dev/           # Full autonomous coding lifecycle (8 stages + references)
│   ├── design-engineering/       # Anti-slop UI design system, taste skills & brand presets
│   ├── mobile-react-native/      # Mobile cross-platform dev suite & Expo rules
│   ├── enterprise-business/      # Enterprise product suite, specs & business workflows
│   ├── dev-workflow/             # Developer lifecycle workflows, API generators & auditors
│   ├── prompt-engineering/       # Prompt templates & 9-dimension prompt auditor
│   ├── content-and-growth/       # Content creation, decks, writing style & viral social tools
│   └── research-and-productivity/# Deep research synthesizer, data analytics & learning tools
├── runtime/                # IDE-specific adapter instructions (Claude, Cursor, Copilot, Cline, Windsurf, Kiro)
│   ├── claude.md                 # Claude Code runtime adapter
│   ├── cline.md                  # Cline runtime adapter
│   ├── copilot.md                # GitHub Copilot runtime adapter
│   ├── cursor.md                 # Cursor runtime adapter
│   ├── kiro.md                   # Kiro runtime adapter
│   ├── shared.md                 # Shared runtime conventions
│   ├── windsurf.md               # Windsurf runtime adapter
│   └── README.md                 # Runtime adapters catalog & integration guide
├── shared/                 # Cross-cutting domain principles & conventions
│   ├── design/                   # UI/UX & HTML/CSS design principles
│   ├── engineering/              # Coding, JavaScript, & Next.js principles
│   ├── writing/                  # Anti-AI writing rules & prose constraints
│   └── README.md                 # Shared domain principles index
├── legacy/                 # Previous specification versions (v1, v2)
├── meta/                   # Tooling for generating/validating implementations
├── AGENTS.md               # Single-file synthesis of core/ (portable)
├── CLAUDE.md               # Tool-agnostic project documentation
└── CONTRIBUTING.md         # Contribution guidelines
```

### Application Flow

1. **Discovery:** Agent scans the working directory up to the repository root, identifying instruction sources (`AGENTS.md`, `CLAUDE.md`, tool rule files, `core/`, `context/`)
2. **Convention Inference:** Agent reads existing code to identify unwritten conventions (naming, structure, patterns)
3. **Precedence Resolution:** Seven-tier hierarchy determines which instruction wins when conflicts exist
4. **Execution:** Agent acts proportionally, scaling rigor to change risk and size
5. **Reporting:** Output includes assumptions, tradeoffs, validation results, and confidence levels

### Design Patterns

The specification uses the **Role/Authority pattern** throughout:

- **Role:** Defines the file's responsibility and scope
- **Authority:** Specifies normative tier level and ownership boundaries
- **Must not define:** Clear boundaries of what the file doesn't own

Each `core/` file owns its domain exclusively. Concepts are defined in exactly one file. Cross-references are explicit.

## Prerequisites

None. This is a documentation repository with no build or runtime requirements.

## Installation

```bash
git clone https://github.com/iging/agent-spec.git
```

## Configuration

### Quick Setup

1. Copy the generic layer into your project:

```bash
# From your project root:
cp path/to/agent-spec/AGENTS.md .
cp -r path/to/agent-spec/core .
```

2. Copy and fill in the project templates:

```bash
cp -r path/to/agent-spec/context .
```

Replace `[PLACEHOLDER: ...]` markers in each template with your project's facts.

3. Point your AI tool at the standard using the adapter for your tool:

| Tool               | Setup                                                                    |
| ------------------ | ------------------------------------------------------------------------ |
| **Claude Code**    | Keep `AGENTS.md` at the root, or reference it from `CLAUDE.md`           |
| **Cursor**         | Add a rule file under `.cursor/rules/` referencing `AGENTS.md` / `core/` |
| **GitHub Copilot** | Place the synthesis in `.github/copilot-instructions.md`                 |
| **Cline**          | Add a rule file in `.clinerules/`                                        |
| **Windsurf**       | Add an always-on rule under `.windsurf/rules/`                           |
| **Kiro**           | Add an always-included steering file under `.kiro/steering/`             |

See `runtime/[tool].md` for tool-specific details.

### Optional: Add Modules & Skills

Browse the feature suites in `modules/` and copy any module or skill folder into your project's `.agents/` directory.

Two patterns are supported — a per-skill folder (`.agents/skills/<skill-name>/SKILL.md`) or a whole-module drop (`.agents/<module-name>/`). Every skill entry file is **uppercase `SKILL.md`**. See [**Installing Skills & Modules**](docs/skill-installation.md) for the exact conventions, commands, and verification checklist.

## Usage

Once configured, an AI agent consuming your project will:

1. Discover instruction sources by scanning the working directory
2. Infer unwritten conventions from existing code
3. Resolve conflicts using the seven-tier source-of-truth hierarchy
4. Act proportionally, scaling rigor to the change's risk and size
5. Report assumptions, tradeoffs, and validation results

### Source-of-Truth Hierarchy

Precedence from highest to lowest:

1. **Explicit user instruction** in the current conversation
2. **Directory-scoped instructions** closest to the file being edited
3. **Project-specific instruction files** at the repository root
4. **This generic standard** (`core/`, `AGENTS.md`)
5. **User-level / global agent configuration**
6. **Language and framework conventions**
7. **General industry best practice**

A more specific, more local source always wins over a more general one.

## Development

### Documentation Style

All files follow the Role/Authority pattern:

```markdown
# [file-path]

## Role / Authority

- **Role:** [Responsibility and scope]
- **Authority:** [Normative tier level and ownership]
- **Must not define:** [Clear boundaries]

---

## [Numbered sections with hierarchical structure]
```

### Branch Naming

- `feature/short-description` — New functionality or content
- `fix/issue-description` — Bug fixes or corrections
- `docs/topic` — Documentation improvements
- `refactor/component` — Structure improvements

### Commit Style

Follow Conventional Commits:

```
feat: add SQL optimization skill to modules/dev-workflow/
fix: correct instruction hierarchy precedence in core/
docs: clarify contribution workflow in CONTRIBUTING.md
refactor: reorganize principles into domain subfolders in shared/
```

## Project Structure

### Core Layer (`core/`)

Normative tier-4 instructions. Portable and project-agnostic. Stable and rarely changed.

- `instruction-hierarchy.md` — Discovery, precedence, conflict resolution
- `decision-framework.md` — Engineering evaluation, dependency governance, clean-code standards
- `output-policy.md` — Anti-hallucination, confidence reporting, validation
- `safety.md` — Non-negotiable constraints, capability boundaries
- `README.md` — Core layer index catalog & adopter guidance

### Context Layer (`context/`)

Project-specific templates shipped with `[PLACEHOLDER: ...]` markers. Fill these in for your project:

- `PRD.md` — Problem, scope, requirements, success metrics
- `ARCHITECTURE.md` — System overview, component map, data flow
- `SCHEMA.md` — Data model, API contracts
- `DESIGN.md` — Design system or output formatting conventions
- `RULES.md` — Project coding rules
- `TASKS.md` — Task decomposition and state tracking
- `README.md` — Index of context templates

### Modules Layer (`modules/`)

Self-contained feature capability suites organized by domain:

- `autonomous-dev/` — Autonomous lifecycle (ideation, worktrees, planning, execution, testing, debugging, code review)
- `design-engineering/` — Taste skills, animation, aesthetic engines, brand presets
- `mobile-react-native/` — Expo and React Native best practices
- `enterprise-business/` — Business skills, client briefs, meeting visualizers, negotiations
- `dev-workflow/` — API endpoint generator, database migrations, split-file, accessibility auditor
- `prompt-engineering/` — Prompt templates & 9-dimension prompt auditor
- `content-and-growth/` — Deck builder, infographics, SEO optimizer, social copywriting
- `research-and-productivity/` — Research synthesizer, data analytics, learning mentor

### Shared Layer (`shared/`)

Cross-cutting domain principles and conventions:

- `engineering/` — Coding principles, JavaScript principles, Next.js principles
- `design/` — UI/UX principles, HTML/CSS principles
- `writing/` — Anti-AI writing rules & prose constraints
- `README.md` — Domain catalog index

### Runtime Layer (`runtime/`)

IDE-specific adapter instructions. Each adapter translates `core/` rules into the tool's file format without adding, overriding, or contradicting any rule.

## Contributing

Contributions are welcome. Before proposing a new skill or capability, check `docs/anti-patterns.md` to ensure it does not encode any of the 53 credit-killing patterns.

### Review Requirements

- **Simple changes** (typos, small docs): Standard review
- **New content** (modules, skills, examples): Verify against anti-patterns
- **Core changes**: Explicit review for consistency with the instruction hierarchy model

All changes to `core/` require explicit review for consistency with the instruction hierarchy model.

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
