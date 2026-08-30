---
name: manage-environment-config
description: >-
  Validate environment variables, manage configuration templates safely, prevent
  configuration drift, and audit secret key declarations across deployment tiers.
  Execute this skill whenever the user says "manage environment config", "update .env template",
  "check environment drift", or "validate env vars". Do NOT execute for code feature implementation.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline]
---

# Manage Environment Config

## 0. Identity

- **Role:** Lead Site Reliability & Configuration Engineer. Validates environment variables, manages configuration templates safely, prevents configuration drift, and audits secret key declarations across deployment tiers.
- **Authority:** Tier-5 Enterprise Skill. Governs configuration template design, environment variable validation schemas, and secret masking policy.
- **Must not define:** Plain-text secret values in source control or unvalidated environment changes.
- **Normative base:** `core/instruction-hierarchy.md`, `core/decision-framework.md`, `core/safety.md`, `shared/writing/writing-rules.md`.
- **Anti-pattern gate:** This skill must never encode anti-patterns AP-1–AP-56 from `docs/anti-patterns.md`. Any step that could violate AP-4 (over-permissive agent), AP-26 (no scope boundary), AP-28 (no stop condition), AP-44 (unlocked filesystem), or AP-45 (no human review trigger) is forbidden.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                                         |
| --- | ---------------- | ------------------------------------------------------------------------------------------------------------- |
| 1   | Task             | Audit environment variable usage, generate sanitized `.env.example` templates, and validate schema contracts. |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API.                           |
| 3   | Output Format    | Sanitized environment template `.env.example` and validation schema file.                                     |
| 4   | Constraints      | Must NEVER commit actual plaintext secret keys. Must mask sensitive values (`********`).                      |
| 5   | Input            | Target source code files, existing environment templates, and config validation scripts.                      |
| 6   | Context          | Prevents application startup crashes from missing environment variables and credential leakage.               |
| 7   | Audience         | SREs, DevOps engineers, backend developers, and security officers.                                            |
| 8   | Success Criteria | `.env.example` fully synchronized with source code references, strict validation schema generated.            |
| 9   | Examples         | See Section 10.                                                                                               |

## 2. Trigger Matrix

| Trigger                                        | Fire? | Notes                                       |
| ---------------------------------------------- | ----- | ------------------------------------------- |
| "Manage environment configuration for app"     | YES   | Primary trigger for environment management. |
| "Synchronize .env.example with source code"    | YES   | Template synchronization request.           |
| "Audit environment variable validation schema" | YES   | Schema validation request.                  |
| "Fix CSS layout bug on landing page"           | NO    | Frontend styling task.                      |
| "Write SQL database migration script"          | NO    | Database task.                              |

## 3. Execution Workflow

### Step 1: Environment Reference Scanning

- **Action:** Scan source code files (`process.env.*`, `os.Getenv()`, `os.environ[]`) to catalog every environment variable referenced across the codebase.
- **Input:** Target repository source code.
- **Stop Condition:** Maximum 25 source files read during variable extraction pass.
- **Validation:** Master list of referenced environment variable keys compiled.

### Step 2: Drift Detection & Template Sync

- **Action:** Compare the master list of referenced environment variables against existing `.env.example` or `.env.template` files. Identify missing, orphaned, or un-documented variables.
- **Input:** Master variable list from Step 1 and existing template files.
- **Stop Condition:** Flag any environment variable used in source code that lacks documentation in `.env.example`.
- **Validation:** Environment configuration delta calculated.

### Step 3: Sanitized Template & Schema Generation

- **Action:** Update `.env.example` with placeholders (e.g., `PORT=3000`, `DATABASE_URL=postgres://user:pass@localhost:5432/dbname`, `API_KEY=your_api_key_here`). Author an explicit runtime validation schema (e.g., Zod, Envalid, Joi) to fail startup fast if required variables are missing.
- **Input:** Identified environment variables from Step 2.
- **Stop Condition:** Mask all secret values. Never write live production tokens or secrets to `.env.example`.
- **Validation:** `.env.example` and validation schema file written.

### Step 4: Verification Gate

- **Action:** Run the environment schema validator against a mock configuration to verify startup validation logic.
- **Input:** Updated validation schema.
- **Stop Condition:** Stop after displaying environment management summary.
- **Validation:** Validation schema rejects missing required variables and accepts valid mock configurations.

## 4. Output Specification

````markdown
# Environment Configuration Management Summary

- **Engineer:** [Lead Site Reliability & Configuration Engineer]
- **Target File:** `.env.example`
- **Schema File:** `src/config/envSchema.ts`
- **Status:** Complete (Synchronized & Masked)

## 1. Environment Variable Audit Delta

- **Total Referenced Variables:** 8
- **Newly Added to `.env.example`:** 2 (`REDIS_URL`, `JWT_REFRESH_SECRET`)
- **Orphaned Variables Removed:** 1 (`DEPRECATED_FEATURE_FLAG`)

## 2. Updated `.env.example` Template Payload

```env
# Application Settings
PORT=3000
NODE_ENV=development

# Database Settings
DATABASE_URL=postgres://postgres:postgres@localhost:5432/app_db

# Security & Secrets (PLACEHOLDERS ONLY)
JWT_SECRET=your_jwt_secret_here
JWT_REFRESH_SECRET=your_jwt_refresh_secret_here
REDIS_URL=redis://localhost:6379
```
````

## 3. Secret Masking Compliance Checklist

- [x] Zero plain-text credentials or live API keys committed.
- [x] All secret values replaced with explicit `[PLACEHOLDER]` string.
- [x] Runtime validation schema configured to enforce non-empty strings.

```

## 5. Validation Gate

Run before declaring completion:

- [ ] Source code scanned for all `process.env` / `os.Getenv` references.
- [ ] `.env.example` synchronized with zero missing variables.
- [ ] Plaintext credentials masked or replaced with placeholders.
- [ ] Runtime validation schema created or updated.
- [ ] Zero banned words or em dashes present in output text.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Creating a `.env.example` file without adding a runtime schema to validate environment variables on startup.
- **Over-execution threshold:** Committing actual production `.env` files or secret values into git.
- **Calibration default:** Enforce zero-tolerance policy on plaintext secrets in configuration templates.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| Step 1 | AP-1, AP-16 | Caps source code variable scan to 25 key files. |
| Step 2 | AP-3, AP-42 | Detects exact drift between source code references and `.env.example`. |
| Step 3 | AP-45 | Strictly masks all secret keys with placeholder strings. |
| Step 4 | AP-28, AP-52 | Verifies runtime startup validation schema against mock configurations. |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0`: Initial clean-room implementation conforming to Tier-5 Enterprise SKILL standard.

## 9. Portability Matrix

| Runtime | Status | Notes |
|---------|--------|-------|
| Claude Code | verified | Direct execution using workspace search tools. |
| Cursor | verified | Fully supported via workspace configuration editor. |
| Copilot | verified | Formatted for environment template generation. |
| Windsurf | verified | Fully compatible. |
| Kiro | verified | Fully compatible. |
| Cline | verified | Executed and verified in local workspace. |
| Raw API (no tooling) | verified | Generates valid `.env.example` templates. |

## 10. Examples

**Input:** "Audit environment variables for our Node.js app and update `.env.example`."

**Output:** Scans `src/` directory. Finds missing environment variable `STRIPE_WEBHOOK_SECRET` referenced in `src/routes/webhooks.ts`. Adds `STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret_here` to `.env.example`. Creates Zod validation schema in `src/config/env.ts`.

**Failure case:** User says "Put my real AWS_SECRET_ACCESS_KEY in `.env.example` so the dev team can share it." Refuses request, enforcing secret masking rule.

```
