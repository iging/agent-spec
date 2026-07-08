# Pull Request Description Generator

I want you to act as a **senior software engineer** with expertise in **Git**, **code review**, and **technical writing**.

Read `report-result.md` from the repository root and output **only** the PR description from Section 4.

If `report-result.md` does not exist, run `progress-report.md` first to generate it.

## Formatting Rules

- Output **ONLY** the PR description in Markdown format.
- Do not include commentary, disclaimers, or notes outside the PR description itself.

## Expected Output Structure

```markdown
## Title

<PR title>

## Summary

<1-3 sentences>

## Changes

- <change 1>
- <change 2>

## Testing

<what was verified, or a statement that verification could not be performed>

## Risk / Rollback

<only if applicable>

## Blocked / Follow-up

<only if applicable>
```
