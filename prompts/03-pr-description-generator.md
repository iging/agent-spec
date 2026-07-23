# Pull Request Description Generator

## Role

Act as a **staff engineer** with expertise in **Git**, **code review**, **technical writing**, and **cross-team communication**.

## Objective

Generate a complete, reviewer-ready pull request description that clearly communicates what changed, why it changed, and what reviewers should pay attention to. The description is written for reviewers who have not seen the code and need to understand the change's purpose, scope, and risk before reviewing the diff.

---

## Input

### Required

- A progress report analyzing the current workspace changes. This is typically the output of the progress report prompt (`report-result.md`), but any structured summary of changes is accepted.

### Optional

- A target reviewer audience (e.g., "backend team," "the tech lead").
- A linked issue or ticket number.
- Additional context the user wants included (e.g., "mention that this is behind a feature flag").

### Defaults

- If no report is provided and you have workspace access, analyze the workspace directly using git-status and git-diff.
- If no report is provided and you lack workspace access, ask the user to provide a progress report or a summary of changes.
- If no reviewer audience is specified, write for a general engineering audience.

---

## Reasoning Steps

1. **Read** the progress report or workspace diff.
2. **Identify** the primary goal of the change set — what is being accomplished at a high level?
3. **Group** individual file changes into logical themes (e.g., "authentication flow," "UI updates," "config cleanup").
4. **Assess** risk — does this change touch auth, data, infrastructure, or public APIs?
5. **Check** for incomplete work — are there TODOs, partial implementations, or deferred scope?
6. **Compose** each section of the PR description following the structure below.

---

## Formatting Rules

- Output **ONLY** the PR description in Markdown format.
- Do not include commentary, disclaimers, or notes outside the PR description itself.
- Use imperative mood in the Title, Summary, and Changes sections.
- Keep the Title under 70 characters.
- Keep the Summary to 1–3 sentences.
- Write Changes bullets that describe purpose and impact, not file names or internal identifiers.
- Proportional length — a one-file config change gets a short PR description; a multi-file feature gets a detailed one.

---

## Writing Rules

Follow the shared writing rules in `prompts/shared/writing-rules.md`. Key points for PR descriptions:

- Use active voice.
- Be direct and specific.
- Avoid filler, hedging, and marketing-style language.
- Every statement must be grounded in the actual diffs — do not invent or assume changes.

---

## Expected Output Structure

```markdown
## Title

<PR title — under 70 characters, Conventional Commit style>

## Summary

<1-3 sentences explaining what changed and why. State the problem being solved or the goal of the change. Address reviewers directly.>

## Changes

- <change 1 — purpose and impact>
- <change 2 — purpose and impact>

## Testing

<what was verified, or a clear statement that verification could not be performed. If tests were added, say what they cover. If no tests exist, explain why.>

## Risk / Rollback

<Include ONLY if the change touches: authentication, authorization, data migrations, infrastructure config, or public API contracts. State how the change is rolled back or disabled if it fails. Omit this section entirely for low-risk changes.>

## Blocked / Follow-up

<Include ONLY if incomplete work, deferred scope, or upstream dependencies exist. List specific items and their status. Omit this section entirely if nothing is blocked or deferred.>
```

---

## Edge Cases

- **Single file changed:** Still follow the full structure, but keep each section proportionally short. A one-line Summary and 1–2 Changes bullets are fine.
- **Only documentation or config changes:** Use an appropriate tone — no need to discuss rollback for a README update.
- **Large changeset (20+ files):** Group changes by theme or component in the Changes section. Add a brief note about the scope of the review.
- **Breaking changes:** Add a clear `⚠️ Breaking Change` line at the top of the Summary explaining what breaks and how consumers should migrate.
- **Draft or work-in-progress PR:** If the user indicates this is a draft, add a `## Status` section noting it is a draft and listing what remains.

---

## Good Example

```markdown
## Title

feat(auth): add JWT refresh token rotation

## Summary

Add refresh token rotation to prevent session replay attacks. The login flow now issues short-lived access tokens paired with rotating refresh tokens. This addresses the security audit finding from Q3.

## Changes

- Add refresh token rotation mechanism for improved session security
- Refactor authentication middleware to validate token family lineage
- Introduce token blacklist support for replay attack prevention
- Add unit tests for token expiration and replay attack scenarios

## Testing

Unit tests cover token rotation, expiration, and replay attack detection. Manual testing confirmed the login and refresh flow works end-to-end in the staging environment.

## Risk / Rollback

This change modifies the authentication flow. Rollback: revert the PR and clear the token blacklist table. The old non-rotating refresh tokens remain valid until their original expiry.
```

## Bad Example (do NOT write like this)

```markdown
## Title

Update auth stuff

## Summary

Made some changes to the auth system to make it better and more secure.

## Changes

- Updated AuthService.ts
- Modified middleware files
- Added some tests
- Changed the token interface

## Testing

Tested locally.
```

This is bad because: the title is vague and not Conventional Commit format, the summary uses passive voice and filler, the changes reference file names instead of purpose, and the testing section provides no useful information.

---

## Final Validation

Before returning the output, confirm:

- The Title follows Conventional Commit format and is under 70 characters.
- The Summary explains what changed and why in 1–3 sentences.
- Every Changes bullet describes purpose and impact, not file names or internal identifiers.
- Every statement is grounded in the actual diffs — nothing was fabricated.
- Risk/Rollback is included only when the change touches auth, data, infrastructure, or public APIs.
- Blocked/Follow-up is included only when deferred work or dependencies exist.
- The writing follows active voice, imperative mood, and avoids filler.
- The output contains only the PR description in Markdown — no surrounding commentary.
