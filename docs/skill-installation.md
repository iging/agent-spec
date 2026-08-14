# Installing Skills & Modules in Your Project

_Last updated: 2026-08-14 · v1.0.0_

The canonical instruction for consuming agent-spec skills and modules in your own repository. If you read one file to learn how to install a capability, read this one.

---

## 1. Role / Authority

- **Role:** Defines the two supported consumption patterns for agent-spec capabilities and the exact directory conventions that let any AI tool discover them in an adopter's repository.
- **Authority:** Authoritative guidance for installation in projects. Complementary to `docs/skill-standard.md` (which governs how skills are _written_) and `runtime/shared.md` §4 (which governs how tools _load_ them); this file is the link between the two.
- **Must not define:** How to _author_ a skill (see `docs/skill-standard.md`). Tool-specific file mechanics (see `runtime/`). Any rule content — skills and modules are copied verbatim, never rewritten here.

---

## 2. Two Consumption Patterns

agent-spec content is consumed one of two ways. Pick the pattern that matches the shape of what you are installing.

### Pattern A — Individual Skill: `.agents/skills/<skill-name>/SKILL.md`

The canonical per-skill layout. Every AI tool that discovers skills natively (Claude Code `/skills`, Codex, Gemini, Copilot CLI, Cline, Kiro) reads the **uppercase `SKILL.md`** entry file inside a folder whose name matches the skill's frontmatter `name:`.

```
your-project/
└── .agents/
    └── skills/
        └── skill-name/   ← folder name == YAML name
            └── SKILL.md  ← uppercase entry file the tool reads
```

### Pattern B — Full Module: `.agents/<module-name>/`

A feature module is a self-contained suite with its own router `SKILL.md` at the top and stage folders beneath it. Drop the whole module in — the router dispatches to the sub-skills by path.

```
your-project/
└── .agents/
    └── module-name/          ← whole module copied as-is
        ├── SKILL.md          ← router / lifecycle dispatcher
        ├── 01-stage-name/
        │   └── skill-1.md
        └── ...               ← remaining stage folders + references/
```

## 3. Rules That Prevent Confusion

1. **`SKILL.md` (uppercase) is the only entry filename.** The tools do not read `skill.md`, `Skill.md`, or bare Markdown in the folder. This is the single most common adoption mistake.
2. **Folder name, YAML `name:`, and (best-effort) file stem must agree.** When a skill ships as a flat `.md` file, wrap it into `<name>/SKILL.md` and confirm the frontmatter `name:` still matches the folder name.
3. **`name:` and `description:` in the frontmatter must be truthful** — the description is what most tools surface to decide when the skill should load.
4. **Never split a module.** Drop stage folders, `references/`, and `SKILL.md` together — a half-copied module routes to missing sub-skills.

## Wrap a flat `.md` skill into a folder

```bash
# From the module (flat per-skill layout):
mkdir -p .agents/skills/design-taste-spec-exporter
cp modules/design-engineering/01-foundations-and-systems/design-taste-spec-exporter.md \
   .agents/skills/design-taste-spec-exporter/SKILL.md
```

Before: `design-taste-spec-exporter.md` (flat). After:

```
.agents/skills/design-taste-spec-exporter/SKILL.md
```

## 4. Cross-Tool Discovery Table

| Tool        | Skills location read                                  | Entry file   |
| ----------- | ----------------------------------------------------- | ------------ |
| Claude Code | `.claude/skills/` + `~/.claude/skills/`               | `SKILL.md`   |
| Codex       | `~/.agents/skills/` (or `.agents/skills/`)            | `SKILL.md`   |
| Gemini      | `~/.gemini/skills/` + `~/.agents/skills/`             | `SKILL.md`   |
| Kiro        | `.kiro/skills/`                                       | `SKILL.md`   |
| Cursor      | `.cursor/rules/` (via rule files that surface skills) | rules file   |
| Copilot     | `.github/copilot-instructions.md`                     | instructions |

_Table is best-known at time of writing; verify against each tool's current docs (`runtime/shared.md` §3)._

## 5. Verification Checklist

- [ ] Target directory exists: `.agents/skills/<name>/` (Pattern A) or `.agents/<module>/` (Pattern B)
- [ ] Folder contains an uppercase `SKILL.md`
- [ ] Frontmatter `name:` matches the folder name
- [ ] Module `references/` + stage folders present when copying a whole module
- [ ] `runtime/[tool].md` adapter consulted for the exact location your tool reads

## 6. Related Standards

| Section                                              | What it covers                                      |
| ---------------------------------------------------- | --------------------------------------------------- |
| [`docs/getting-started.md`](docs/getting-started.md) | Adoption quick-start (this is the deeper companion) |
| [`docs/skill-standard.md`](docs/skill-standard.md)   | Enterprise skill authoring standard                 |
| [`runtime/shared.md`](runtime/shared.md)             | Adapter contract + skills mapping                   |
| [`README.md`](README.md)                             | Repo overview + folder structure                    |
