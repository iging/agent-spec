@import AGENTS.md

## Claude-Specific Rules

- Use adaptive thinking natively; do not add CoT scaffolding or "think step by step" instructions.
- When editing `core/` files, preserve the strict Role/Authority separation model — each file owns its domain exclusively with no overlap.
- For complex refactoring of the standard itself, outline the blast radius (which files reference the changed concept) before executing.
- Ask for explicit permission before modifying `core/` files — these are normative tier-4 definitions that affect all adopters.
