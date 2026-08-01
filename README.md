# agent-spec

A tool-agnostic behavioral specification for AI coding agents. Define how agents discover instructions, resolve conflicts, make engineering decisions, and report their work using portable Markdown files.

## Overview

agent-spec is the Linux Foundation Agentic AI standard for configuring AI coding agents. This is a pure documentation repository designed to be copied into other projects. It provides a structured approach to agent behavior through portable markdown files that work across Claude Code, Cursor, GitHub Copilot, Cline, Windsurf, and Kiro.

The specification separates project-agnostic normative instructions from project-specific facts. Copy the generic layer unmodified, fill in templates with your project details, and point your AI tool at the standard.

## Features

- **Tool-agnostic standard** for AI agent behavior across multiple IDEs and platforms
- **Seven-tier instruction hierarchy** with explicit conflict resolution
- **Normative core** covering instruction discovery, decision framework, output policy, and safety
- **Project templates** for PRD, architecture, schema, design, and coding rules
- **Reusable skills** organized by domain (business, content-creation, learning, React Native, terminal)
- **Prompt templates** for development workflows, content creation, and learning
- **IDE adapters** for Claude Code, Cursor, Copilot, Cline, Windsurf, and Kiro
- **53 documented anti-patterns** that waste tokens and burn API credits
- **Annotated examples** demonstrating proper agent decision-making

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
│   └── safety.md                 # Non-negotiable constraints, capability boundaries
├── context/                # Project-specific templates (shipped with placeholders)
│   ├── PRD.md                    # Product requirements template
│   ├── ARCHITECTURE.md           # System architecture template
│   ├── SCHEMA.md                 # Database and API schema template
│   ├── DESIGN.md                 # Design system template
│   └── RULES.md                  # Project coding rules template
├── docs/                   # User-facing guides
│   ├── getting-started.md        # Quick setup guide
│   ├── faq.md                    # Common questions
│   └── anti-patterns.md          # 53 credit-killing patterns
├── examples/               # Annotated workflow examples
├── prompts/                # Reusable prompt templates
│   ├── career/                   # Cover letter generation, career planning
│   ├── content-creation/         # Blog, image generation
│   ├── dev-workflow/             # Code docs, PR descriptions, README generation
│   └── learning/                 # Prompt engineering mentorship
├── runtime/                # IDE-specific adapter instructions
│   ├── shared.md                 # Common adapter contract
│   ├── claude.md                 # Claude Code adapter
│   ├── cursor.md                 # Cursor adapter
│   ├── copilot.md                # GitHub Copilot adapter
│   ├── cline.md                  # Cline adapter
│   ├── windsurf.md               # Windsurf adapter
│   └── kiro.md                   # Kiro adapter
├── skills/                 # Reusable skill modules
│   ├── business/                 # Client briefs, meeting notes, negotiation
│   ├── content-creation/         # Deck builder, infographics, UI design
│   ├── learning/                 # Prompt engineering
│   └── react-native/             # React Native best practices
├── shared/                 # Cross-cutting conventions
│   └── writing-rules.md          # Writing style, banned words, truth protocol
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

### Optional: Add Skills

Browse the skills catalog in `skills/` and copy any skill folder into your project's `.agents/skills/` directory.

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
feat: add SQL optimization skill to skills/database/
fix: correct instruction hierarchy precedence in core/
docs: clarify contribution workflow in CONTRIBUTING.md
refactor: reorganize prompts by workflow category
```

## Project Structure

### Core Layer (`core/`)

Normative tier-4 instructions. Portable and project-agnostic. Stable and rarely changed.

- `instruction-hierarchy.md` — Discovery, precedence, conflict resolution
- `decision-framework.md` — Engineering evaluation, dependency governance, clean-code standards
- `output-policy.md` — Anti-hallucination, confidence reporting, validation
- `safety.md` — Non-negotiable constraints, capability boundaries

### Context Layer (`context/`)

Project-specific templates shipped with `[PLACEHOLDER: ...]` markers. Fill these in for your project:

- `PRD.md` — Problem, scope, requirements, success metrics
- `ARCHITECTURE.md` — System overview, component map, data flow
- `SCHEMA.md` — Data model, API contracts
- `DESIGN.md` — Design system or output formatting conventions
- `RULES.md` — Project coding rules

### Skills Layer (`skills/`)

Independent, on-demand specialist modules. Each skill has a `SKILL.md` file that agents discover and activate when needed:

- `business/` — Client briefs, meeting notes, negotiation, team management
- `content-creation/` — Deck builder, infographics, UI design
- `learning/` — Prompt engineering mentorship
- `react-native/` — React Native best practices
- `terminal/` — Command-line workflow optimization

### Prompts Layer (`prompts/`)

Standalone, re-runnable prompt templates organized by category:

- `dev-workflow/` — Code documentation, commit messages, PR descriptions, README generation
- `content-creation/` — Blog generation, image generation
- `learning/` — Prompt engineer mentor

### Runtime Layer (`runtime/`)

IDE-specific adapter instructions. Each adapter translates `core/` rules into the tool's file format without adding, overriding, or contradicting any rule.

## Contributing

Contributions are welcome. Before proposing a new prompt or skill, check `docs/anti-patterns.md` to ensure it does not encode any of the 53 credit-killing patterns.

### Review Requirements

- **Simple changes** (typos, small docs): Standard review
- **New content** (skills, prompts, examples): Verify against anti-patterns
- **Core changes**: Explicit review for consistency with the instruction hierarchy model

All changes to `core/` require explicit review for consistency with the instruction hierarchy model.

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
