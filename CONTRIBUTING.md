# Contributing to agent-spec

Thank you for considering contributing to the agent-spec standard! This document provides guidelines for making contributions that maintain the quality and consistency of the specification.

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Types of Contributions](#types-of-contributions)
3. [Before You Start](#before-you-start)
4. [Contribution Workflow](#contribution-workflow)
5. [Writing Guidelines](#writing-guidelines)
6. [Core File Guidelines](#core-file-guidelines)
7. [Review Process](#review-process)
8. [Questions?](#questions)

---

## Quick Start

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/iging/agent-spec.git`
3. **Create a branch**: `git checkout -b feature/your-description`
4. **Make your changes** following the guidelines below
5. **Commit**: `git commit -m "feat: your description"` (use [Conventional Commits](#commit-message-format))
6. **Push**: `git push origin feature/your-description`
7. **Open a Pull Request** targeting the `main` branch

---

## Types of Contributions

### Encouraged Contributions

- **New Feature Modules**: Add reusable feature packages and skills to `modules/` (autonomous-dev, design-engineering, prompt-engineering, content-and-growth, etc.)
- **Examples**: Add workflow examples to `examples/` demonstrating agent decision patterns
- **Runtime Adapters**: Update `runtime/` adapters for IDE-specific behavior changes
- **Documentation Improvements**: Fix typos, clarify instructions, improve guides in `docs/`
- **Anti-Pattern Additions**: Document new credit-killing patterns in `docs/anti-patterns.md`

### Requires Extra Review

- **Core Changes**: Modifications to `core/` files (instruction-hierarchy, decision-framework, output-policy, safety)
- **Template Changes**: Structural changes to `context/` templates
- **Breaking Changes**: Any change that affects existing adopters

### Not Accepted

- IDE-specific workspace settings (`.vscode/`, `.cursor/`, `.windsurf/`)
- Filled-in `context/` templates with project-specific details (these ship empty)
- References to deprecated files in `legacy/`
- Contributions that violate patterns in `docs/anti-patterns.md`

---

## Before You Start

### 1. Check Existing Issues

Browse [existing issues](../../issues) to see if your contribution is already planned or being worked on.

### 2. Read the Documentation

Familiarize yourself with:

- `AGENTS.md` — Repository structure and boundaries
- `docs/getting-started.md` — How the standard works
- `docs/anti-patterns.md` — 53 patterns to avoid
- `core/instruction-hierarchy.md` — How instruction sources are ranked

### 3. Understand the Architecture

```
core/           ← Normative tier-4 (portable, project-agnostic)
context/        ← Templates (shipped empty with [PLACEHOLDER] markers)
docs/           ← User-facing guides
examples/       ← Annotated workflow demonstrations
modules/        ← Feature-based capability suites (self-contained feature packages)
runtime/        ← IDE-specific adapters
```

---

## Contribution Workflow

### Branch Naming

Use descriptive branch names following these patterns:

- `feature/short-description` — New functionality or content
- `fix/issue-description` — Bug fixes or corrections
- `docs/topic` — Documentation improvements
- `refactor/component` — Code or structure improvements

**Examples:**

- `feature/add-python-skill`
- `fix/typo-in-safety-doc`
- `docs/improve-getting-started`

### Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>: <description>

[optional body]

[optional footer]
```

**Types:**

- `feat:` — New feature, skill, prompt, or example
- `fix:` — Bug fix, typo correction, broken link
- `docs:` — Documentation-only changes
- `refactor:` — Restructuring without changing behavior
- `chore:` — Maintenance tasks (dependencies, CI, etc.)

**Examples:**

```
feat: add SQL optimization skill to skills/database/
fix: correct instruction hierarchy precedence in core/
docs: clarify contribution workflow in CONTRIBUTING.md
refactor: reorganize prompts by workflow category
```

---

## Writing Guidelines

### General Style

- **Clarity over cleverness**: Write to be understood, not to impress
- **Specificity over generality**: Avoid vague advice like "write clean code"
- **Show, don't tell**: Use concrete examples instead of abstract principles
- **Dense prose**: No fluff, filler, or redundant phrasing

### Documentation Pattern (for `core/` and formal files)

All normative files follow the Role/Authority structure:

```markdown
# [file-path]

## Role / Authority

- **Role:** [Defines the file's responsibility and scope]
- **Authority:** [Normative tier level and ownership boundaries]
- **Must not define:** [Clear boundaries of what this file doesn't own]

---

## 1. [First Section]

[Dense prose with clear ownership boundaries]

## 2. [Second Section]

[Continue...]
```

### Template Guidelines (for `context/` files)

Templates use `[PLACEHOLDER: ...]` markers:

```markdown
## Section Title

[PLACEHOLDER: Explain what should be filled in here, with 1-2 examples]

- **Field 1:** [PLACEHOLDER: Description]
- **Field 2:** [PLACEHOLDER: Description]
```

### Anti-Pattern Checking

Before submitting prompts or skills, verify they don't encode any of the 53 patterns in `docs/anti-patterns.md`. Common issues:

- ❌ Vague task verbs ("help me with...")
- ❌ No success criteria ("make it better")
- ❌ No scope boundary ("fix my app")
- ❌ Adding CoT to reasoning models
- ❌ Unlocked filesystem with no restrictions

---

## Core File Guidelines

Changes to `core/` files require special attention because they affect all adopters of the standard.

### Ownership Boundaries

Each `core/` file owns its domain exclusively:

- `instruction-hierarchy.md` — Discovery, precedence, conflict resolution
- `decision-framework.md` — Engineering evaluation, clean-code standards
- `output-policy.md` — Presentation, confidence reporting, validation
- `safety.md` — Non-negotiable constraints, capability boundaries

**Rule**: A concept should be defined in exactly one file. Other files may reference it but must not redefine it.

### Making Core Changes

1. **Identify the file** that owns the concept you want to change
2. **Check cross-references** — search for mentions of the concept in other files
3. **Outline blast radius** — which adopters and use cases are affected
4. **Preserve structure** — maintain the Role/Authority pattern
5. **Update cross-references** — ensure other files still reference correctly

### Example: Adding a New Constraint

If adding a new security constraint:

1. Add it to `safety.md` §3 (owns security constraints)
2. Reference it from `decision-framework.md` §3.4 (implements it in code generation)
3. Do NOT duplicate the constraint text in both files

---

## Review Process

### What Reviewers Check

- **Correctness**: Does it accurately represent best practices?
- **Consistency**: Does it match existing style and structure?
- **Completeness**: Are examples concrete and sufficient?
- **Boundaries**: Does it respect file ownership (for `core/` changes)?
- **Anti-patterns**: Does it avoid the 53 documented credit-killers?

### Timeline

- **Simple changes** (typos, small docs): 1-3 days
- **New content** (skills, prompts, examples): 3-7 days
- **Core changes**: 7-14 days (requires architectural review)

### Feedback

Expect iterative feedback. Common requests:

- "Make this example more specific"
- "Add a code snippet showing the pattern"
- "This overlaps with [file] — coordinate the change"
- "Check this against anti-pattern #26"

---

## Questions?

- **General questions**: Open a [Discussion](../../discussions)
- **Bug reports**: Open an [Issue](../../issues)
- **Feature proposals**: Open an [Issue](../../issues) with the `enhancement` label
- **Clarification on guidelines**: Comment on a relevant existing issue or discussion

---

## Recognition

All contributors are valued! Your contributions help thousands of developers work more effectively with AI agents.

Thank you for helping improve the agent-spec standard!

---

## License

By contributing to agent-spec, you agree that your contributions will be licensed under its MIT License. See [LICENSE](LICENSE) for details.
