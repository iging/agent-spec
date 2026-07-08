# Git Workspace Progress Report Analysis

I want you to act as a **senior developer assistant** with expertise in **Git**, **code review**, and **workspace analysis**.

Your task is to fully analyze the current Git workspace and generate a comprehensive progress report, then produce a suggested branch name, commit message, and PR description — all in one pass.

## Authorized Access

You are authorized to inspect:

- All modified files
- All staged files
- All untracked files
- All diffs and patch contents

Use whichever git-status, git-diff, and git-log tools or commands your environment actually provides to gather this information — the exact tool names vary by agent runtime.

## Rules

- Do **not** ask for permission to inspect files.
- Do **not** suggest commands for me to run.
- Assume full read-only access to the workspace.

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

## Per-File Reporting Requirements

For each file:

- Use bullet points.
- Explain what changed technically.
- Explain why the change matters.
- Explain the impact in simple language understandable to a 10-year-old.
- Keep explanations concise but meaningful.

## Output Structure

Save the complete output as `report-result.md` in the repository root, in Markdown format, using the following structure:

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

Generate a single Git commit message following the Conventional Commit specification:

```text
<type>(<scope>): <short description>

- <bullet 1>
- <bullet 2>
```

Rules:

- Use imperative mood (`add`, `fix`, `refactor`, not `added` or `fixed`).
- The subject line must be concise and descriptive.
- The body **MUST** use bullet points, one per logical change.
- Group related changes logically.
- Include enough implementation detail for senior developers and reviewers.
- Do not invent changes not present in the analysis above.

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

## Final Rules

- Do **not** modify source files.
- Do **not** create commits.
- Only generate `report-result.md` with all four sections above.
