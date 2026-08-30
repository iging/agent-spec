# runtime/README.md — IDE Adapters Catalog

## Role / Authority

- **Role:** Central index catalog and integration guide for IDE-specific runtime adapters.
- **Authority:** Non-authoritative tier level (Adapter layer). Translates `core/` and `AGENTS.md` into tool mechanics.
- **Must not define:** Engineering standards, instruction hierarchy, safety constraints, or output policies (owned exclusively by `core/`).

---

## 1. Overview

The `runtime/` layer bridges the generic `agent-spec` standard with tool-specific AI coding assistants. Because different tools use different configuration directory structures, scoping formats, and frontmatter syntaxes, each adapter specifies the exact mechanics needed to load `AGENTS.md`, `core/`, and `context/` in that environment.

All adapters enforce the fundamental principle defined in `runtime/shared.md`: **adapters translate, they never override or redefine standard rules.**

---

## 2. Tool Adapters Index

| Adapter                      | Target Tool        | Primary Config Path               | Frontmatter Format                            | On-Demand Skills Mechanism                      |
| :--------------------------- | :----------------- | :-------------------------------- | :-------------------------------------------- | :---------------------------------------------- |
| [`claude.md`](claude.md)     | **Claude Code**    | `CLAUDE.md` / `AGENTS.md`         | Plain Markdown (`@file` imports)              | Custom slash commands / on-demand skills        |
| [`cursor.md`](cursor.md)     | **Cursor**         | `.cursor/rules/*.mdc`             | YAML frontmatter (`globs`, `alwaysApply`)     | Manual-inclusion (`agent-requested`) MDC rules  |
| [`copilot.md`](copilot.md)   | **GitHub Copilot** | `.github/copilot-instructions.md` | YAML frontmatter (`applyTo` globs)            | Path-scoped `.instructions.md` files            |
| [`cline.md`](cline.md)       | **Cline**          | `.clinerules/`                    | Plain Markdown                                | Individually-toggleable rule files              |
| [`windsurf.md`](windsurf.md) | **Windsurf**       | `.windsurf/rules/`                | Plain Markdown / Activation metadata          | Model-decided and manual activation rules       |
| [`kiro.md`](kiro.md)         | **Kiro**           | `.kiro/steering/*.md`             | YAML frontmatter (`inclusion: always/manual`) | Manual inclusion (`inclusion: manual`) steering |
| [`shared.md`](shared.md)     | **All Tools**      | Cross-tool contract               | N/A                                           | Standard skill mapping convention               |

---

## 3. Integration Checklist for Adopters

To integrate `agent-spec` into your repository for any tool:

1. **Deploy Standard Core:** Copy `AGENTS.md` and `core/` to your repo root.
2. **Select Adapter:** Open the file corresponding to your primary AI tool in `runtime/[tool].md`.
3. **Create Tool Files:** Follow the step-by-step setup guide and copy the provided template snippet into your tool's expected path.
4. **Populate Project Facts:** Fill in template placeholders in `context/` (`PRD.md`, `ARCHITECTURE.md`, `RULES.md`).
5. **Install Skills (Optional):** Copy needed skills from `skills/` into `.agents/skills/<skill-name>/SKILL.md` and map them in `AGENTS.md`.

---

## 4. Multi-Tool Workspaces

If your team uses multiple AI coding agents simultaneously (e.g. Cursor + Claude Code + Copilot):

- Keep single sources of truth in `AGENTS.md` and `context/`.
- Point each tool adapter file (`.cursor/rules/`, `CLAUDE.md`, `.github/copilot-instructions.md`) to `@AGENTS.md` or transclude it.
- Never duplicate core rules across tool-specific configuration files.
