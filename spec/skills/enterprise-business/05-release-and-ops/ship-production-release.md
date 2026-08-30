---
name: ship-production-release
description: >-
  Prepare, validate, tag, and execute production software releases with pre-flight checks,
  changelog generation, and rollback contingency plans. Execute this skill whenever the
  user says "ship release", "prepare production release", "tag release vX.Y.Z", or
  "execute deployment release pipeline". Do NOT execute for unreviewed feature work.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline]
---

# Ship Production Release

## 0. Identity

- **Role:** Principal Release & Release Engineering Lead. Prepares, validates, tags, and executes production software releases with pre-flight checks, changelog generation, and rollback plans.
- **Authority:** Tier-5 Enterprise Skill. Governs release readiness validation, changelog compilation, version tagging, and production release sign-off.
- **Must not define:** Direct infrastructure provisioning or unauthorized secret key modifications.
- **Normative base:** `core/instruction-hierarchy.md`, `core/decision-framework.md`, `core/output-policy.md`, `shared/writing/writing-rules.md`.
- **Anti-pattern gate:** This skill must never encode anti-patterns AP-1–AP-56 from `docs/anti-patterns.md`. Any step that could violate AP-4 (over-permissive agent), AP-26 (no scope boundary), AP-28 (no stop condition), AP-44 (unlocked filesystem), or AP-45 (no human review trigger) is forbidden.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                                                   |
| --- | ---------------- | ----------------------------------------------------------------------------------------------------------------------- |
| 1   | Task             | Verify release readiness, compile release notes, validate passing CI builds, tag release, and create rollback strategy. |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API.                                     |
| 3   | Output Format    | Release summary report saved to `.context/releases/[version]-release-plan.md` and semantic version git tag.             |
| 4   | Constraints      | Must verify 100% green test suite. Must require explicit human approval before applying git tag or deploying.           |
| 5   | Input            | Target semantic version tag, release commits, open PR list, test execution logs, and rollback procedures.               |
| 6   | Context          | Prevents broken production releases, untagged deployments, and unrecoverable outage scenarios.                          |
| 7   | Audience         | Release engineers, SREs, developers, product managers, and engineering executives.                                      |
| 8   | Success Criteria | Release pre-flight checks pass green, changelog compiled, explicit approval received, release tagged.                   |
| 9   | Examples         | See Section 10.                                                                                                         |

## 2. Trigger Matrix

| Trigger                                               | Fire? | Notes                                                     |
| ----------------------------------------------------- | ----- | --------------------------------------------------------- |
| "Ship production release v2.4.0"                      | YES   | Primary trigger for release engineering.                  |
| "Prepare release notes and tag version"               | YES   | Release preparation request.                              |
| "Perform pre-flight checks for production deployment" | YES   | Pre-flight validation request.                            |
| "Design database schema migration"                    | NO    | Architecture task. Route to `design-system-architecture`. |
| "Audit frontend accessibility"                        | NO    | QA task. Route to `verify-accessibility-compliance`.      |

## 3. Execution Workflow

### Step 1: Pre-Flight Verification Gate

- **Action:** Run workspace build commands, type checkers, and test suites. Confirm that the main branch builds without warnings or errors and all tests pass green.
- **Input:** Target release commit on the main branch.
- **Stop Condition:** If any test fails or type check errors exist, abort the release workflow immediately and report blockers.
- **Validation:** Pre-flight status green confirmed.

### Step 2: Changelog Compilation & Artifact Drafting

- **Action:** Read commit messages and merged pull requests since the previous release tag. Categorize changes into Features (`feat`), Fixes (`fix`), Security (`sec`), and Breaking Changes (`breaking`).
- **Input:** Git commit log delta between previous tag and current HEAD.
- **Stop Condition:** If unreviewed breaking changes are detected without major version bump, flag for team review.
- **Validation:** Standardized markdown changelog drafted.

### Step 3: Rollback Strategy & Verification Specification

- **Action:** Document the explicit step-by-step rollback procedure (e.g., git revert commit hash, database migration rollback commands, container image rollback tags).
- **Input:** Application architecture context and release scope.
- **Stop Condition:** Require explicit rollback command sequence before finalizing the release plan.
- **Validation:** Rollback plan fully documented.

### Step 4: Human Approval & Release Tag Execution

- **Action:** Write the release execution document to `.context/releases/[version]-release-plan.md`. Present the pre-flight results and prompt you for final explicit human confirmation before executing `git tag` or deployment commands.
- **Input:** Drafted changelog and rollback plan from Steps 2–3.
- **Stop Condition:** Pause for explicit human confirmation. Do NOT execute `git tag` or trigger production deployment without user sign-off.
- **Validation:** Release plan document saved and explicit sign-off received.

## 4. Output Specification

````markdown
# Production Release Plan: [vX.Y.Z]

- **Date:** [YYYY-MM-DD]
- **Release Lead:** [Principal Release & Release Engineering Lead]
- **Target Version:** `vX.Y.Z`
- **Release Plan Path:** `.context/releases/[version]-release-plan.md`
- **Pre-flight Status:** GREEN (All Tests & Builds Passed)

## 1. Release Changelog Summary

### Added Features (`feat`)

- `feat(auth)`: Support multi-factor authentication via TOTP (#102)

### Bug Fixes (`fix`)

- `fix(db)`: Resolve connection pool exhaustion under high concurrency (#108)

### Security Enhancements (`sec`)

- `sec(deps)`: Upgrade `jsonwebtoken` to version `9.0.0` (#114)

## 2. Step-by-Step Rollback Plan

1. **Trigger Condition:** Error rate exceeds 1% or latency p95 > 2.0s post-release.
2. **Git Revert:** Run `git revert -m 1 [release-commit-sha]`.
3. **Container Rollback:** Redeploy previous docker image tag `vX.Y.(Z-1)`.
4. **Database Rollback:** Execute `npm run db:migrate:down`.

## 3. Pre-Flight Verification Log

```bash
$ npm test && npm run build
PASS src/index.test.ts (3.2 s)
Build completed successfully. Zero errors.
```
````

## 4. Final Sign-off Gate

- [x] All automated tests pass green.
- [x] Changelog compiled and verified.
- [x] Rollback plan documented.
- [ ] Explicit human sign-off confirmed before tag execution.

```

## 5. Validation Gate

Run before declaring completion:

- [ ] Pre-flight build and test run verified green.
- [ ] Commit delta scanned and changelog categorized.
- [ ] Explicit rollback instructions documented.
- [ ] Release plan saved to `.context/releases/[version]-release-plan.md`.
- [ ] Explicit human approval received before executing release tag commands.
- [ ] Zero banned words or em dashes present in response text.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Tagging a release without running tests or documenting rollback procedures.
- **Over-execution threshold:** Executing production tags or deployments without waiting for explicit human confirmation.
- **Calibration default:** Err on the side of caution. Require explicit sign-off prior to tag creation.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| Step 1 | AP-3, AP-48 | Enforces green build and test baseline before release preparation. |
| Step 2 | AP-1, AP-42 | Categorizes commit history into structured changelog formats. |
| Step 3 | AP-28 | Enforces pre-documented rollback sequence prior to execution. |
| Step 4 | AP-45 | Pauses for mandatory human review and sign-off before tagging. |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0`: Initial clean-room implementation conforming to Tier-5 Enterprise SKILL standard.

## 9. Portability Matrix

| Runtime | Status | Notes |
|---------|--------|-------|
| Claude Code | verified | Direct execution using git tools. |
| Cursor | verified | Fully supported via workspace release manager. |
| Copilot | verified | Formatted for step-by-step release guidance. |
| Windsurf | verified | Fully compatible. |
| Kiro | verified | Fully compatible. |
| Cline | verified | Executed and verified in local workspace. |
| Raw API (no tooling) | verified | Generates valid release plan payloads. |

## 10. Examples

**Input:** "Prepare production release v1.2.0 for our backend service."

**Output:** Runs `npm test` and `npm run build`. Compiles commit delta into changelog. Formulates rollback plan. Saves `.context/releases/v1.2.0-release-plan.md`. Prompts: "Pre-flight checks passed. Please approve to execute `git tag v1.2.0`."

**Failure case:** User says "Push tag v1.2.0 directly to main even though 2 unit tests are failing." Refuses request due to failing pre-flight test gate.
```
