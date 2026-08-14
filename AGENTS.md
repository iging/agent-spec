# agent-spec

Pure markdown documentation repository — the Linux Foundation Agentic AI standard for configuring AI coding agents. Designed to be copied into other projects, not run as an application.

## Commands

- **Build**: None (documentation only)
- **Test**: None (documentation only)
- **Lint**: None (markdown files are manually reviewed)

## Documentation Style

All files follow the structured Role/Authority pattern with strict separation of concerns. Tier-4 normative files (`core/`) use precise ownership boundaries. Templates (`context/`) contain `[PLACEHOLDER: ...]` markers.

```markdown
# [file-path]

## Role / Authority

- **Role:** [Defines the file's responsibility and scope]
- **Authority:** [Normative tier level and ownership boundaries]
- **Must not define:** [Clear boundaries of what this file doesn't own]

---

## [Numbered sections with clear hierarchical structure]

[Dense prose organized by domain responsibility, with explicit cross-references to other files where authority overlaps]
```

## Architecture Constraints

- `core/` → Normative tier-4 instructions (instruction hierarchy, decision framework, output policy, safety). Portable and project-agnostic.
- `context/` → Project-specific templates (PRD, ARCHITECTURE, SCHEMA, DESIGN, RULES). Shipped with `[PLACEHOLDER]` markers to be filled in by adopters.
- `docs/` → User-facing guides (getting-started, FAQ, anti-patterns).
- `examples/` → Annotated workflow examples demonstrating proper agent behavior.
- `runtime/` → IDE-specific adapter instructions (Claude, Cursor, Copilot, Cline, Windsurf, Kiro).
- `modules/` → Self-contained feature-based capability suites (autonomous-dev, design-engineering, mobile-react-native, enterprise-business, dev-workflow, prompt-engineering, content-and-growth, research-and-productivity).
- `legacy/` → Previous specification versions (v1, v2). Do not reference in new work.
- `meta/` → Tooling for generating or validating agent-spec implementations.
- `shared/` → Cross-cutting conventions (writing-rules).

**Data flow:** `core/` is imported by `AGENTS.md` at the root. Projects copy `AGENTS.md` + `core/` unmodified, then fill in `context/` templates with project facts. `runtime/` adapters tell each IDE how to load these layers.

**Import restrictions:** Never import from `legacy/` in current work. `core/` files reference each other but remain independent (no circular dependencies). Templates in `context/` reference `core/` concepts but do not redefine them.

## Boundaries

- **Forbidden:** Do not modify `core/` files during routine maintenance unless the change is a deliberate update to the standard itself.
- **Forbidden:** Do not commit IDE-specific workspace settings (`.vscode/`, `.cursor/`, `.windsurf/`) — these belong in user environments, not the spec repository.
- **Forbidden:** Do not fill in `context/` templates with agent-spec's own details — these are shipped empty for adopters to complete.
- **Scope:** When editing `core/`, preserve the Role/Authority structure and explicit ownership boundaries. Each file owns its domain exclusively.
- **Scope:** When adding examples, ensure they demonstrate a clear before/after contrast or annotated decision flow.
- **Scope:** When adding prompts, follow the 9-dimension intent model (see `prompts/dev-workflow/agent-config-generator.md` §2).

## Contribution Workflow

- **Branch format:** `feature/short-description`, `fix/issue-description`, `docs/topic`
- **Commit style:** Conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`
- **Review requirement:** All changes to `core/` require explicit review for consistency with the instruction hierarchy model.
- **Anti-patterns:** Before proposing a new prompt or skill, check `docs/anti-patterns.md` to ensure it does not encode any of the 53 credit-killing patterns.

## Versioning & Stability

- `core/` is stable. Breaking changes are rare and explicitly versioned.
- `context/` templates evolve gradually. Placeholder markers are stable; section structure may be refined.
- `runtime/` adapters track the latest behavior of each IDE and are updated as those tools evolve.
- `skills/` are independent modules; each skill versions itself.

## Git Workflow

- **Main branch:** `main` (protected)
- **PR target:** Always target `main` for new work
- **PR title:** Under 70 characters, format: `category: brief description`
- **PR description:** Include: summary of change, which files/sections were modified, whether it introduces new anti-patterns or resolves existing ones
