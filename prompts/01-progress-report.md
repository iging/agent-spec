# Git Workspace Progress Report Analysis

## Role

Act as a **staff engineer** with expertise in **Git**, **code review**, **workspace analysis**, and **technical writing**.

## Objective

Fully analyze the current Git workspace and generate a comprehensive progress report, then produce a suggested branch name, commit message, and PR description — all in one pass.

---

## Input

### Required

- Access to the current Git workspace (modified files, staged files, untracked files, diffs, and patch contents).

### Optional

- A focus area or scope hint from the user (e.g., "focus on the auth changes").
- A target audience for the report (e.g., "this is for a non-technical stakeholder").

### Defaults

- If no focus area is given, analyze every modified and untracked file.
- If no audience is specified, write for a developer audience.

---

## Authorized Access

You are authorized to inspect:

- All modified files
- All staged files
- All untracked files
- All diffs and patch contents

Use whichever git-status, git-diff, and git-log tools or commands your environment provides to gather this information — the exact tool names vary by agent runtime.

## Rules

- Do **not** ask for permission to inspect files.
- Do **not** suggest commands for me to run.
- Assume full read-only access to the workspace.

---

## Reasoning Steps

Follow this sequence for each file:

1. **Identify** the file's role in the project architecture (component, utility, config, test, etc.).
2. **Read** the diff to understand what changed at the code level.
3. **Classify** the change type: new feature, bug fix, refactor, config update, dependency change, UI/UX improvement, backend logic, API change, database change, test addition, cleanup, or documentation.
4. **Infer** the purpose of the change from the code itself — what problem it solves or what capability it adds.
5. **Assess** the impact: does this change affect other files, modules, or the user experience?

---

## Analysis Requirements

Analyze **every modified and untracked file individually**.

You must:

- Read and interpret the actual code changes from the diffs.
- Infer the purpose of the implementation from the code itself.
- Detect:
  - New features
  - Bug fixes
  - Refactors
  - Configuration updates
  - Dependency changes
  - UI/UX improvements
  - Backend logic updates
  - API changes
  - Database changes
  - Test additions
  - Cleanup work

---

## Per-File Reporting Requirements

For each file:

- Use bullet points.
- Explain what changed technically.
- Explain why the change matters.
- Include a one-sentence plain-language impact summary for non-technical stakeholders.
- Keep explanations concise but meaningful.

---

## Edge Cases

- **No changes found:** If no modified, staged, or untracked files exist, state that the workspace is clean and stop. Do not fabricate changes.
- **Only untracked files:** Report them as new additions. Note that no diff is available for untracked files — describe their apparent purpose based on filename, location, and content.
- **Binary files in the diff:** Note the binary file's name and probable purpose (image, font, compiled asset). Do not attempt to interpret binary content.
- **Large changeset (20+ files):** Group files by component or directory before listing them individually. Add a summary paragraph at the top identifying the dominant change theme.
- **Monorepo or multi-package workspace:** Organize the report by package or workspace, not as a flat file list.

---

## Output Structure

Output the complete report in Markdown format using the following structure. If you have filesystem access, save it as `report-result.md` in the repository root. Otherwise, output it directly.

---

### Section 1: Progress Report

- Organize results by file.
- Use clear section headers.
- Use professional engineering language.
- Be comprehensive and specific.

---

### Section 2: Suggested Branch Name

Suggest a git branch name that summarizes the overall change set:

```text
<type>/<short-description>
```

Rules:

- Use the same `<type>` as Conventional Commits (`feat`, `fix`, `refactor`, `chore`, `docs`, etc.).
- Keep the description short (2–4 words, kebab-case).
- Base it on the dominant change theme — if the workspace has mixed changes, pick the most significant one.

---

### Section 3: Commit Message

Generate a single Git commit message following the Conventional Commit specification.

The output **MUST** be formatted as a complete, copy-paste-ready `git commit -m` command:

```bash
git commit -m "<type>(<scope>): <short description>

- <bullet 1>
- <bullet 2>"
```

Rules:

- Use imperative mood (`add`, `fix`, `refactor`, not `added` or `fixed`).
- The subject line must be concise and descriptive.
- The body **MUST** use bullet points, one per logical change.
- Group related changes logically.
- **Bullet points must be generalized and human-readable** — describe the purpose and impact, not internal implementation details.
- **Do NOT** reference specific file names, class names, variable names, function names, or internal identifiers in bullets.
- Write each bullet the way you'd explain the change to a teammate — focus on _what_ was done and _why_ it matters, not _where_ in the code it happened.
- Do not invent changes not present in the analysis above.

Good example bullets:

- "add refresh token rotation for improved session security"
- "implement dark mode toggle for better accessibility"
- "fix navigation links not highlighting on active page"

Bad example bullets (do NOT write like this):

- "update `AuthService.ts` to add `rotateToken()` method"
- "modify `ThemeContext.tsx` to include `isDark` state"
- "fix `NavLink` component `isActive` prop in `nav-links.ts`"

---

### Section 4: PR Description

Generate a complete pull request description:

```markdown
## Title

<PR title — under 70 characters, Conventional Commit style>

## Summary

<1-3 sentences explaining what changed and why>

## Changes

- <change 1>
- <change 2>

## Testing

<what was verified, or state that verification could not be performed>

## Risk / Rollback

<only if the change touches auth, data migrations, infrastructure, or public API contracts — omit otherwise>

## Blocked / Follow-up

<only if incomplete work or deferred scope exists — omit otherwise>
```

Rules:

- Base every statement on the actual diffs analyzed above.
- Use imperative mood in the summary and changes sections.
- Keep it proportional to the size of the change.

---

## Final Validation

Before returning the output, confirm:

- Every modified and untracked file has been analyzed. No file was skipped.
- No changes were fabricated or inferred beyond what the diffs show.
- The change type classification is accurate for each file.
- The branch name, commit message, and PR description are consistent with each other and with the analysis.
- The commit message and PR description follow Conventional Commit conventions.
- Bullet points in the commit message describe purpose and impact, not file names or internal identifiers.
- The output follows the four-section structure exactly.

## Final Rules

- Do **not** modify source files.
- Do **not** create commits.
- Only generate the report with all four sections above.
