# Conventional Commit Message Generator

I want you to act as a **professional software engineer** with expertise in **Git** and **Conventional Commit standards**.

Read `report-result.md` from the repository root and output **only** the commit message from Section 3.

If `report-result.md` does not exist, run `progress-report.md` first to generate it.

## Formatting Rules

- Output **ONLY** the final commit message.
- The output **MUST** be a complete, copy-paste-ready `git commit -m` command.
- Wrap the entire command inside a `bash` code block.
- Do **not** output just the message text — always include the `git commit -m "..."` wrapper.
- Do not include explanations, notes, or commentary outside the code block.

## Content Rules

- Bullet points must be **generalized and human-readable** — describe the purpose and impact of the change, not internal implementation details.
- **Do NOT** use specific file names, class names, variable names, function names, or internal identifiers in bullet points.
- Write bullets the way you'd explain the change to a teammate who hasn't seen the code — focus on _what_ was done and _why_ it matters.
- Keep the subject line concise and descriptive using imperative mood.

## Example

```bash
git commit -m "feat(auth): implement JWT refresh token rotation

- add refresh token rotation mechanism for improved session security
- refactor authentication middleware to validate token family lineage
- introduce token blacklist support for replay attack prevention
- update login flow to issue short-lived access tokens
- add unit tests for token expiration and replay attack scenarios"
```

## Bad Example (do NOT do this)

```bash
git commit -m "feat(auth): implement JWT refresh token rotation

- update AuthService.ts to add rotateToken() method
- modify src/middleware/validateToken.ts to check lineage
- add REDIS_URL to .env.example
- change UserLoginResponse interface in types/auth.d.ts"
```

This is bad because it uses file names and internal identifiers instead of describing the purpose of the changes.
