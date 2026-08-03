# Repository Organization Rules

## Structural Constraints

1. **Self-Documenting Folders:** Folder names must immediately explain their contents to a new open-source developer. Use lowercase-kebab-case. Avoid abbreviations, jargon, or numbered prefixes.
2. **Preserve Reusability:** Group files by their business purpose, not by file extension. Each folder must work as a standalone unit that a user can copy-paste into their own projects without breaking dependencies.
3. **No Deep Nesting:** Maximum two levels of nesting from the root. (e.g. `skills/writing/humanizer/SKILL.md` is fine. `skills/writing/editing/humanizer/SKILL.md` is too deep).
4. **Standalone Skills:** If organizing skills or prompts, keep them as separate directories containing a `SKILL.md` (or similar manifest). Do not flatten them into single files.
5. **Starter Templates:** Include a `_template/` or `_starter/` mechanism for users to duplicate and start fresh.

## Output Format Specification

### Part 1 — Proposed Folder Structure

Output a complete directory tree showing every file in its new location:

```
repo-name/
├── README.md                          # Repository overview
├── [folder-name]/
│   ├── README.md                      # What this folder contains
│   ├── [file.md]
│   └── ...
└── ...
```

### Part 2 — Migration Map

A table mapping every current file path to its new path:

| Current Path      | New Path         | Reason for Move                                          |
| ----------------- | ---------------- | -------------------------------------------------------- |
| `files/safety.md` | `core/safety.md` | Core behavioral spec, grouped with other core spec files |
| ...               | ...              | ...                                                      |

### Part 3 — Cross-Reference Update Plan

List every internal cross-reference found in the files and whether it still resolves correctly after the move. Flag any that need updating.

### Part 4 — Git Commands

Provide the exact `git mv` or `mv` commands to execute the migration safely.
