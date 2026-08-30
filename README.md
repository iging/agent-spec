# agent-spec

The Linux Foundation Agentic AI standard for configuring AI coding agents. `agent-spec` provides a portable, modular framework for agent governance, instructions, capability suites, and runtime adapters.

## Architecture and Layer Model

`agent-spec` uses a tiered layer architecture to organize instructions, constraints, and project context cleanly:

1. **Core Standard (`spec/core/`)**: Normative Tier-4 instructions (instruction hierarchy, decision framework, output policy, safety). Portable and project-agnostic.
2. **Context Templates (`spec/context/`)**: Project-specific context placeholders (`PRD.md`, `ARCHITECTURE.md`, `SCHEMA.md`, `DESIGN.md`, `RULES.md`) filled in by adopters.
3. **Capability Suites (`spec/skills/`)**: Modular domain skills providing deterministic workflows for development, design, testing, research, and project management.
4. **Runtime Adapters (`spec/runtime/`)**: Tool-specific instruction adapters for Claude Code, Cursor, Copilot, Cline, Windsurf, Kiro, and raw APIs.
5. **Shared Rules (`spec/shared/`)**: Cross-cutting writing standards and engineering principles.

## Source of Truth Hierarchy

When resolving conflicting guidance or instructions across files, agents follow this strict hierarchy:

1. **System Prompt / Runtime Safety Overrides**: Hard constraints passed directly by the execution platform or runtime safety layer.
2. **Core Governance (`spec/core/`)**: Normative rules defined in `instruction-hierarchy.md`, `decision-framework.md`, `output-policy.md`, and `safety.md`.
3. **Project Context (`spec/context/` or `.agents/context/`)**: Project-specific rules, architecture decisions, database schemas, and design constraints defined in the adopter's repository.
4. **Skill Instructions (`spec/skills/`)**: Task-specific workflow instructions and domain capability specifications.
5. **Shared Conventions (`spec/shared/`)**: Codebase writing rules, naming conventions, and style constraints.

## Repository Structure

```
agent-spec/
├── AGENTS.md                  # Root entry point mapping spec/core/ to workspace agents
├── README.md                  # Specification overview and architecture documentation
├── CONTRIBUTING.md            # Contribution guidelines and revision process
├── CODE_OF_CONDUCT.md         # Code of conduct and community standards
├── GOVERNANCE.md              # Project governance and decision framework
├── LICENSE                    # Apache 2.0 open source license
├── Dockerfile                 # Container image definition for audit environment
├── docker-compose.yml         # Container orchestration configuration
├── package.json               # Node.js manifest and dependency definitions
├── tsconfig.json              # TypeScript compiler configuration
├── .devcontainer/             # Development container definitions
├── .github/                   # CI/CD workflows and GitHub integration templates
├── schemas/                   # JSON schemas for specification and skill validation
│   ├── skill.v1.schema.json   # Schema for capability skill definitions
│   └── spec.v1.schema.json    # Schema for core specification formats
├── scripts/                   # Audit and validation scripts
│   └── audit-compliance.js    # Automated compliance and rule enforcement script
├── src/                       # CLI tooling, compiler, and linter source code
│   ├── cli/                   # Command line interface implementation
│   ├── compiler/              # Specification compilation utilities
│   ├── linter/                # Rule validation and static analysis engine
│   └── types/                 # TypeScript type definitions
└── spec/
    ├── core/                  # Normative Tier-4 governance standards
    ├── context/               # Project specification templates with placeholder markers
    ├── docs/                  # Getting started guides, FAQs, and anti-pattern references
    ├── examples/              # Annotated workflow examples and brand presets
    ├── legacy/                # Historical specification archives (do not reference)
    ├── meta/                  # Generator and specification authoring tooling
    ├── runtime/               # Agent runtime adapters for supported IDEs and tools
    │   ├── claude.md          # Claude Code runtime adapter specification
    │   ├── cursor.md          # Cursor runtime adapter specification
    │   ├── copilot.md         # GitHub Copilot runtime adapter specification
    │   ├── cline.md           # Cline runtime adapter specification
    │   ├── windsurf.md        # Windsurf runtime adapter specification
    │   ├── kiro.md            # Kiro runtime adapter specification
    │   └── shared.md          # Cross-tool adapter contracts
    ├── shared/                # Codebase conventions, engineering principles, and writing rules
    └── skills/                # Feature-based capability suites
```

## Compliance and Validation Workflows

To ensure standard compliance across documentation and skill definitions, `agent-spec` includes an automated validation suite:

```bash
node scripts/audit-compliance.js
```

### Automated Checks

The audit engine (`scripts/audit-compliance.js`) verifies all Markdown files against strict repository guardrails:

- **Prohibited Words & Marketing Prose**: Scans for banned words, hype adjectives, and fluff.
- **Prohibited Setup Phrases**: Rejects structural phrases such as "in conclusion" or "in summary".
- **Markdown Link Integrity**: Verifies every relative link points to an existing file or valid anchor target.
- **Template Placeholder Integrity**: Enforces retention of `[PLACEHOLDER: ...]` markers within `spec/context/` template files.

## Runtime Adapters and IDE Integration

The `spec/runtime/` layer translates `AGENTS.md` and `spec/core/` into tool-specific instruction mechanics. Each adapter specifies configuration file locations, frontmatter formats, and skill loading protocols without overriding core rules.

| Adapter                                   | Target Tool        | Primary Config Path               | Frontmatter Format                            | Skill Loading Mechanism                         |
| :---------------------------------------- | :----------------- | :-------------------------------- | :-------------------------------------------- | :---------------------------------------------- |
| [`claude.md`](spec/runtime/claude.md)     | **Claude Code**    | `CLAUDE.md` / `AGENTS.md`         | Plain Markdown (`@file` imports)              | Custom slash commands / on-demand skills        |
| [`cursor.md`](spec/runtime/cursor.md)     | **Cursor**         | `.cursor/rules/*.mdc`             | YAML frontmatter (`globs`, `alwaysApply`)     | Manual-inclusion (`agent-requested`) MDC rules  |
| [`copilot.md`](spec/runtime/copilot.md)   | **GitHub Copilot** | `.github/copilot-instructions.md` | YAML frontmatter (`applyTo` globs)            | Path-scoped `.instructions.md` files            |
| [`cline.md`](spec/runtime/cline.md)       | **Cline**          | `.clinerules/`                    | Plain Markdown                                | Toggleable rule files                           |
| [`windsurf.md`](spec/runtime/windsurf.md) | **Windsurf**       | `.windsurf/rules/`                | Plain Markdown / Activation metadata          | Model-decided and manual activation rules       |
| [`kiro.md`](spec/runtime/kiro.md)         | **Kiro**           | `.kiro/steering/*.md`             | YAML frontmatter (`inclusion: always/manual`) | Manual inclusion (`inclusion: manual`) steering |
| [`shared.md`](spec/runtime/shared.md)     | **All Tools**      | Cross-tool contract               | N/A                                           | Standard skill mapping convention               |

### Multi-Tool Workspaces

For repositories supported by multiple AI tools simultaneously:

- Maintain a single canonical entry point in `AGENTS.md` and `spec/context/`.
- Point each tool adapter file (`CLAUDE.md`, `.cursor/rules/`, `.github/copilot-instructions.md`) to `AGENTS.md`.
- Keep normative rules in `spec/core/` rather than duplicating configuration across multiple tool settings files.

## Gitignore Governance and Repository Hygiene

`agent-spec` maintains strict separation between tracked specification files and local agent runtime artifacts.

### Tracked Assets

- Core governance standards (`spec/core/`)
- Project context templates (`spec/context/`)
- Capability suites (`spec/skills/`)
- Runtime adapter templates (`spec/runtime/`)
- Audit and compliance scripts (`scripts/`)

### Ignored Artifacts (`.gitignore`)

- **Dependencies & Builds**: `node_modules/`, `dist/`
- **Local Agent Runtimes**: `.claude/`, `.cursor/`, `.cline/`
- **Generated Reports**: `progress-report-result.md`, `cover-letter-result.md`

This isolation ensures local agent state files and working directories do not pollute the repository or contaminate standard governance specifications.

## Quick Start

To adopt `agent-spec` in your project:

1. Copy `AGENTS.md` and `spec/core/` into your repository root.
2. Copy `spec/context/` templates into your repository and populate the `[PLACEHOLDER: ...]` markers.
3. Select desired capability suites from `spec/skills/` and configure your target tool adapter from `spec/runtime/`.
4. Run compliance validation using `node scripts/audit-compliance.js`.

For detailed setup instructions, see [Getting Started](spec/docs/getting-started.md).
