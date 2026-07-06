# kiro.md — Runtime Adapter for Kiro

- **Role:** Translates `core/` rules into Kiro's file mechanics. Defines no engineering rule of its own.
- **Authority:** None. Must remain consistent with `core/` at all times; see `shared.md` for the full contract this file operates under.

This file only covers Kiro-specific mechanics.

## File(s) this tool reads

- `.kiro/steering/*.md` — steering files. Default behavior (no frontmatter) is **always included**: the file's content is loaded into every agent interaction in the workspace.
- `.kiro/specs/**/*.md` — structured spec documents (`requirements.md`, `design.md`, `tasks.md` per feature). These are task-scoped planning artifacts, not standing behavioral rules — they don't belong in the same category as `core/`, but a spec's content is still authoritative for the feature it describes while that spec is active.
- `.kiro/hooks/*.json` — agent hook definitions (event-triggered automation). Not instruction content; out of scope for this adapter beyond noting hooks exist and can invoke the agent with a prompt (`askAgent`) or a shell command (`runCommand`).
- `.kiro/settings/mcp.json` (and the user-level `~/.kiro/settings/mcp.json`) — MCP server configuration. Not instruction content.

## Format specifics

Steering files support three inclusion modes via YAML frontmatter:

```yaml
---
inclusion: always # default if omitted — loaded into every interaction
---
```

```yaml
---
inclusion: fileMatch
fileMatchPattern: "README*" # loaded only when a matching file enters context
---
```

```yaml
---
inclusion: manual # loaded only when the user references it via #steering-file-name
---
```

Steering files support a `#[[file:<relative_file_name>]]` import syntax to pull in another file's content without duplicating it inline — this is Kiro's equivalent of Claude Code's `@path` imports (see `runtime/claude.md`). Use it to reference `agent-spec/core/*.md` from a steering file instead of copy-pasting spec content into it.

## Precedence within this tool

- `fileMatch`- and `manual`-scoped steering files are narrower in applicability than `always`-included ones. This is a tool-native instance of the general "more specific beats more general" rule in `core/instruction-hierarchy.md`, not a separate rule.
- Per `core/instruction-hierarchy.md`'s Source of Truth Hierarchy, `.kiro/steering/**.md` files sit in **tier 3** (project-specific instruction files) — they describe this specific project and outrank the tier-4 universal baseline (`AGENTS.md` / `agent-spec/core/`) wherever the two conflict.

## Session types and autonomy modes — relevance to `core/decision-framework.md`

Kiro exposes two session types (Vibe — conversational, exploratory; Spec — structured requirements → design → tasks) and two autonomy modes (Autopilot — end-to-end execution; Supervised — approval required per turn). Neither introduces a new engineering rule, but both map directly onto proportionality already required by `core/decision-framework.md` Section 1 ("this evaluation SHOULD be proportional... state which category the work falls into"):

- A quick Vibe-session fix should be treated like any other small, low-risk task — no five-section write-up, per the proportionality guidance already in `core/decision-framework.md` and `core/output-policy.md`.
- A Spec workflow (requirements → design → tasks) is the natural place to apply the full rigor of `core/decision-framework.md`'s Engineering Decision Framework and `core/safety.md`'s Change Risk Management — the spec's `design.md` is where architecture tradeoffs (Section 4/11) should be stated explicitly, and `tasks.md` is where a refactor's stated problem (Section 5/12) belongs before implementation starts.
- Autopilot vs. Supervised mode is a user-controlled review cadence, not a change to what the agent is allowed to do — `core/safety.md`'s override and confirmation requirements (e.g. flagging an auth-bypass request) apply identically in both modes.

## Recommended structure for a project's steering files

```markdown
---
inclusion: always
---

# Project Standards

#[[file:../agent-spec/core/instruction-hierarchy.md]] #[[file:../agent-spec/core/decision-framework.md]] #[[file:../agent-spec/core/safety.md]] #[[file:../agent-spec/core/output-policy.md]]

## Project-Specific Context

[stack, architecture, conventions, commands]
```

Splitting project-specific context into its own `fileMatch`- or `manual`-scoped steering file (e.g. one steering file per subsystem) keeps the always-loaded baseline small, consistent with the general principle in `runtime/shared.md` of not duplicating the full `core/` spec inline where a tool offers a reference/import mechanism instead.
