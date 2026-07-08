# Conventional Commit Message Generator

I want you to act as a **professional software engineer** with expertise in **Git** and **Conventional Commit standards**.

Read `report-result.md` from the repository root and output **only** the commit message from Section 3.

If `report-result.md` does not exist, run `progress-report.md` first to generate it.

## Formatting Rules

- Output **ONLY** the final commit message.
- Wrap the entire commit message inside a terminal-style code block.
- Do not include explanations, notes, or commentary outside the code block.

## Example

```bash
git commit -m "feat(auth): implement JWT refresh token rotation

- add refresh token rotation mechanism for improved session security
- refactor authentication middleware to validate token family lineage
- introduce Redis-backed token blacklist support
- update login flow to issue short-lived access tokens
- add unit tests for token expiration and replay attack scenarios"
```
