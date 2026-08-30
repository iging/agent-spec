# Agent-Spec Generator (Fresh, Complete Rebuild)

## Role

Act as a **Specification Author**, **Standards Engineer**, and **Documentation Engineer**.

## Objective

Regenerate a complete, reusable agent instruction system from scratch. This produces two coordinated layers plus supporting docs:

1. **The generic standard (tier 4)** — a tool-agnostic behavioral spec for AI coding agents, decomposed into single-responsibility files: `AGENTS.md`, `core/`, `runtime/`, `examples/`. Contains **no project-specific content** and is copyable, unmodified, into any repository.
2. **The project-adaptation template (tier 3)** — a `context/` folder (`PRD.md`, `DESIGN.md`, `ARCHITECTURE.md`, `SCHEMA.md`, `RULES.md`) that a consumer fills in for their own project. Ships as fill-in templates with clear placeholders, never invented facts.

The goal is precise, specific, reusable Markdown that any agent (Claude Code, Cursor, Copilot, Cline, Windsurf, Kiro, and others) reads to behave consistently. This prompt is re-runnable: a maintainer or follower can regenerate a clean, consistent system at any time.

---

## Protected Paths — Never Touch

You may **only** create or overwrite:

- root `AGENTS.md`, `CONTRIBUTING.md`
- `core/`, `runtime/`, `examples/`, `context/`

Do **not** generate `README.md` here — it is produced separately by `prompts/readme-generator.md`. Leave any existing `README.md` untouched.

You are **forbidden** from creating, editing, moving, or deleting anything inside:

- `archive/` — the author's personal historical snapshots. Leave exactly as-is.
- `prompts/` — standalone prompts, including this one. Leave exactly as-is.

If any step would modify those two folders, skip it and report it. Confirm they are untouched in final validation.

---

## What "Reusable" Means Here (Non-Negotiable)

Earlier versions were too specific and too opinionated to reuse. Do not repeat those mistakes:

- **No project-specific content** in the generic standard. No stack names, company names, personal framing, or repo-specific paths. All project adaptation happens in `context/` (tier 3) or the consumer's own files — never in `core/` or `AGENTS.md`.
- **Behavioral contract, not a persona script.** Specify _what_ the agent must do, never _how it must sound_. No adversarial, "brutally honest," or performatively harsh tone. Skepticism is a reasoning discipline, not a voice.
- **Principle-based and capability-aware.** Degrade gracefully when a capability (filesystem, shell, memory, web) is absent; state the limitation instead of faking a result.
- **Proportional.** Scale rigor to the risk and size of the change; a prototype is not held to production standards.
- **Single source of truth.** Each rule is defined in exactly one file; reference the owner rather than duplicating.

---

## Architecture to Produce

```
core/       → defines the rules (highest authority, generic)
runtime/    → translates those rules per tool (no authority of its own)
examples/   → demonstrates the rules applied correctly (no authority of its own)
context/    → project-adaptation templates the consumer fills in (tier 3)
AGENTS.md   → portable single-file synthesis of core/, read first every task
```

`prompts/` and `archive/` sit outside this chain and are protected.

Every file in `core/`, `runtime/`, and `examples/` MUST open with a **Role / Authority** header stating what it may define and whether it can introduce a rule of its own. Authority flows downward: lower layers can never override `core/`.

---

## Files to Generate

### `AGENTS.md` (repository root)

A **portable single-file synthesis** of the four `core/` modules, copyable unmodified into any project. It is the agent's permanent memory — read first, every task. **Lead with the how-to; put background last. Keep it tight — no wall of text.**

Cover, as numbered sections: purpose (a behavioral contract, not a personality script); agent identity (evidence-based senior collaborator, states tradeoffs, no adversarial tone); capability awareness (table: capability / if available / if unavailable); discovery, convention inference, source-of-truth hierarchy, conflict resolution; the engineering decision framework with default tie-breaker (correctness > security > reliability > maintainability > observability > testability > performance > convenience); dependency governance, code generation, architecture review, refactoring, testing; security, change-risk, anti-hallucination, confidence reporting, validation, output requirements, failure handling, override rules, maintenance.

State that `AGENTS.md` is a manually-reconciled synthesis of `core/`, and that `core/` is authoritative if the two diverge.

### `core/` — Normative Rules (four files)

| File                       | Sole responsibility                                                                                                                                                                                      |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `instruction-hierarchy.md` | Discovery of instruction sources, convention inference, source-of-truth precedence, conflict resolution. The only file that ranks sources against each other.                                            |
| `decision-framework.md`    | Engineering evaluation and tradeoffs — correctness, dependency governance, **code generation standards (clean-code, see below)**, architecture review, refactoring, testing. Blind to file precedence.   |
| `safety.md`                | Hard, non-negotiable constraints — identity/tone limits, capability boundaries, security, override rules, failure handling, change-risk. Overrides everything except the host agent's own safety policy. |
| `output-policy.md`         | Presentation only — anti-hallucination, confidence reporting, validation, adaptive output structure. Cannot influence a decision already made.                                                           |

Each `core/` file declares what it owns and what it must **not** define (deferring to the owner), so no rule is duplicated.

### Clean-Code Standards (author into `core/decision-framework.md` and reused by `context/RULES.md`)

Encode these as the code-generation standard. State them as principles, adapted to whatever language the consumer uses — not tied to any one stack:

- **Functions** — small and single-purpose; one level of abstraction per function; extract until a further extraction would only restate the code; few arguments (0–2 ideal, wrap 3+ into an object); no flag arguments that make one function do two jobs; no hidden side effects; command/query separation (a function either does something or answers something, not both); prefer exceptions over returned error codes; DRY — one authoritative representation per piece of knowledge.
- **Naming** — intention-revealing (the name answers why it exists and how it's used, without a comment); no disinformation (don't call a map a "list"); meaningful distinctions (different names must mean different things — no `data`/`data2`, no `Manager`/`Handler` noise); pronounceable and searchable; avoid encodings/Hungarian notation; avoid abbreviations that force mental mapping.
- **Comments** — explain _why_, not _what_; the best comment is code clear enough to need none. Good uses: intent, warning of consequences, amplification of importance, well-formed TODOs, public-API docs. Reject: comments that restate the code, mandated noise docs, misleading or non-local comments, commented-out code, author/journal attributions (version control owns history), and closing-brace/section-marker comments that apologize for oversized functions. An inaccurate comment is worse than none; if you keep a comment, keep it accurate and local.
- **Error handling & security** — validate input at trust boundaries; parameterized queries, never string-built SQL; no hardcoded secrets; handle plausible failure paths for external calls in production code.

### `runtime/` — Tool Adapters

- `shared.md` — the common contract every adapter follows: what belongs in a runtime file (exact filenames, format quirks, size limits, merge behavior) versus what must never appear (engineering rules, project content).
- One adapter each for the major tools (e.g. `claude.md`, `cursor.md`, `copilot.md`, `cline.md`, `windsurf.md`, `kiro.md`), documenting only that tool's actual file mechanics. Verify current behavior rather than restating `core/` rules; if a fact can't be verified, mark it best-known-at-time-of-writing.
- **Skills mapping (from the AGENTS.md-vs-skills distinction).** Document the difference: `AGENTS.md` is the agent's _permanent_ memory, read on every task, and holds only what applies to everything (setup, build/test commands, coding style, structure, PR format). A _skill_ is an on-demand specialist the agent loads only when a task needs it (e.g. deployment, data-migration, incident-investigation workflows). The runtime layer must explain that `AGENTS.md` should **map** available skills so the agent knows when to invoke each one, keeping standing rules and specialist workflows in separate files.

### `examples/` — Behavior Demonstrations

A small set of concrete, narrow scenarios, each citing the specific `core/` file and section it demonstrates, each using the Role/Authority header. Cover at least: a full-rigor production change; a proportional minimal change (showing rigor scaled down); a refactor that states its problem first; an architecture review checking hidden coupling and debuggability; a security case where a user request conflicts with `safety.md` and safety wins; and a capability-degradation case (no shell access → state that verification couldn't run instead of fabricating a passed test).

### `context/` — Project-Adaptation Template (tier 3)

The fill-in layer a consumer completes for their own project. This is where project-specific facts live — never in the generic standard. Generate each as a template with a one-line purpose, a `Last updated: [DATE]` line, and `[PLACEHOLDER: ...]` markers where the maintainer must decide. Never invent project facts.

- `context/PRD.md` — Problem & Goal, Scope (MVP), Out of Scope, Technical Requirements, Success Metrics. Keeps work inside scope.
- `context/DESIGN.md` — Brand Identity, Theme & Color, Typography, Spacing & Layout, Motion, Accessibility (note full WCAG conformance needs manual testing). For non-UI projects, reduce to output/formatting conventions.
- `context/ARCHITECTURE.md` — Top-Level Overview, Design Methodology & Patterns, Component Map, Data Flow, Integration Points & Failure Modes, Scaling Limits. Include a Mermaid diagram only when structure is clear.
- `context/SCHEMA.md` — Tables/Collections/Models, Relationships (Mermaid `erDiagram` when verifiable), Access/RLS Policies, Migrations. If there is no data layer, say so and keep it short.
- `context/RULES.md` — the project's coding rules, grounded in the clean-code standards above (SOLID; DRY once a pattern genuinely repeats; KISS), adapted to the project's actual language and conventions.

`AGENTS.md` must reference each `context/` doc and any skills, so the agent knows where deeper detail lives.

### AGENTS.md Quality Bar (avoid the four failure modes)

- **Not vague** — exact commands and concrete expectations, not "follow best practices."
- **Not a wall of text** — short; push long explanations into `core/` or `context/`.
- **How, not just why** — tell the agent what to do, not only the rationale.
- **Not stale** — mark it a living document; when the same mistake is fixed twice, record it.

### `CONTRIBUTING.md`

- `CONTRIBUTING.md` — where each kind of change goes, the rule that `core/` is the only place rules are defined, the requirement to keep `AGENTS.md` reconciled with `core/`, and a note that `archive/` (historical snapshots) and `prompts/` (standalone prompts) sit outside the rule chain and are not edited by the generator.

**`README.md` is out of scope for this prompt.** Regenerate it separately with `prompts/readme-generator.md`, which audits the repository and produces an evidence-based README. Do not create or overwrite `README.md` here.

---

## Consistency Requirements

- `core/` is the source of truth. `runtime/`, `examples/`, and `context/` must never introduce, override, or contradict a `core/` rule.
- `AGENTS.md` must stay consistent with `core/`; if they differ, `core/` wins.
- No two files define the same rule — cross-reference the owner instead.
- Generic files (`core/`, `AGENTS.md`) carry no project-specific content; project facts live only in `context/`.

---

## Final Validation

Before finishing, confirm:

- `archive/` and `prompts/` were not created, edited, moved, or deleted.
- `README.md` was not created or overwritten — it is regenerated separately via `prompts/readme-generator.md`.
- No generic-standard file contains project-specific content, a persona/tone script, or an adversarial voice.
- Clean-code standards (functions, naming, comments, error handling) are present in `core/decision-framework.md` and reflected in `context/RULES.md`.
- The AGENTS.md-vs-skills distinction is documented and `AGENTS.md` maps `context/` docs and any skills.
- Every rule lives in exactly one `core/` file; nothing is duplicated.
- `context/` files are templates with placeholders, not invented facts.
- Every `core/`, `runtime/`, and `examples/` file opens with a Role/Authority header, and `AGENTS.md` leads with how-to and stays tight.
- All files render correctly as Markdown.
