---
name: progress-report
description: Analyzes active Git workspace changes and generates structured branch names, commit commands, PR descriptions, and Google XYZ progress reports in progress-report-result.md.
metadata:
  short-description: Generate branch, commit, PR, and Google XYZ report
---

Analyzes active Git workspace changes and writes a structured progress summary to `progress-report-result.md`.

This command applies the prompt specifications defined in:

- `spec/skills/prompt-engineering/prompts-by-category/dev-workflow/progress-report.md`
- `spec/skills/prompt-engineering/prompts-by-category/dev-workflow/commit-message-generator.md`
- `spec/skills/prompt-engineering/prompts-by-category/dev-workflow/pr-description-generator.md`

## Workflow Steps

### 1. Workspace Inspection

Inspect active workspace changes using non-interactive Git commands:

- Run `git status` to identify modified, staged, and untracked files.
- Run `git diff` and `git diff --cached` to review exact code and documentation modifications.

### 2. Fact Extraction and Anti-Hallucination Constraints

Extract technical facts directly from the Git inspection output:

- Base all statements on verified code and documentation changes.
- Never speculate, invent, or guess changes not present in the Git diff.
- Do not use lines of code, files changed, or directories created as quantitative "Y" metrics in Google XYZ statements.
- When quantitative business or performance metrics are absent, write precise technical accomplishment bullets instead of fabricating metrics.

### 3. Output Generation

Format the required sections according to the prompt specifications:

- **Branch Name**: Suggest a Git branch name matching repository conventions (for example `feature/short-description`, `fix/issue-description`, `docs/topic-name`, `refactor/scope`, or `chore/task`).
- **Commit Commands**: Provide conventional commit commands formatted per `spec/skills/prompt-engineering/prompts-by-category/dev-workflow/commit-message-generator.md` (for example `git commit -m "feat: add progress report command"`).
- **Pull Request Description**: Provide a PR description formatted per `spec/skills/prompt-engineering/prompts-by-category/dev-workflow/pr-description-generator.md` with a title under 70 characters (`category: brief description`) and a body summarizing changes, modified files, and compliance status.
- **Google XYZ Progress Report**: Write accomplishment statements per `spec/skills/prompt-engineering/prompts-by-category/dev-workflow/progress-report.md` using the Google XYZ formula: "Accomplished [X] as measured by [Y], by doing [Z]".

### 4. File Output

Write the formatted results directly to `progress-report-result.md`.
