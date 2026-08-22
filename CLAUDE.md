@import AGENTS.md

## Anti-Hallucination & Execution Guardrails

- **Pure Documentation Repository:** This repository contains Markdown specifications and standards only. Do not assume build commands (`npm run build`), test suites (`npm test`), or application runtime environments exist.
- **Single Validation Script:** The only automated validation script in this codebase is `node scripts/audit-compliance.js`.
- **Core Tier Boundary:** Ask for explicit user permission before modifying files in `core/` — these are normative Tier-4 definitions.
- **Context Templates:** Keep `[PLACEHOLDER: ...]` markers intact in `context/` templates.
- **No Legacy Imports:** Never reference or import files from `legacy/`.

## Claude-Specific Rules

- Use adaptive thinking natively; do not add CoT scaffolding or "think step by step" instructions.
- When editing `core/` files, preserve the strict Role/Authority separation model — each file owns its domain exclusively with no overlap.
- For complex refactoring of the standard itself, outline the blast radius (which files reference the changed concept) before executing.
- Follow writing rules in `shared/writing-rules.md` and avoid banned buzzwords.

## Available Slash Commands

- `/audit` — Runs `node scripts/audit-compliance.js` to validate Markdown files and relative links.
- `/check-antipatterns` — Audits documentation against the 53 anti-patterns in `docs/anti-patterns.md`.
- `/new-skill` — Guides creation of a new skill under `.agents/skills/<skill-name>/SKILL.md`.
- `/new-module` — Guides creation of a new feature module under `modules/`.
- `/validate-hierarchy` — Checks instruction hierarchy and authority boundaries in `core/`.
- `/repo-status` — Displays repository audit status and module inventory.
- `/apple-motion` — Applies Apple fluid motion, spring mechanics, and animation rules to UI components.
