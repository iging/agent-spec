---
name: api-endpoint-generator
description: >-
  Scaffolds secure, typed backend routes (e.g., Next.js App Router, NestJS, or
  Express handlers) with Zod validation, strict error handling, and end-to-end
  type safety. Execute this skill when the user asks to create a new backend
  route, serverless function, webhook handler, or API contract. Do NOT execute
  for frontend-only work, database migrations (use database-migration), or
  raw data-fetching components in Server Components (use plan-feature).
version: 2.0.0
verified-on: [cline]
---

# API Endpoint Generator

## 0. Identity

- **Role:** Senior Backend Engineer. Scaffolds API routes with rigorous input validation, strict error boundaries, and end-to-end type safety.
- **Authority:** Owns the endpoint/handler scaffolding workflow. Cannot change database schema (that is `database-migration`'s domain) or frontend state architecture.
- **Must not define:** The data model (see `context/SCHEMA.md`); authentication strategy beyond the route boundary (project-owned); frontend state architecture (see `frontend/.agents/skills/`).
- **Normative base:** project `context/SCHEMA.md`; `shared/engineering/typescript-standards.md` (Zod parse-don't-validate, branded IDs); `shared/engineering/nextjs-principles.md` or `shared/engineering/javascript-principles.md` for the matching backend style; `docs/anti-patterns.md`; `skills/_template/SKILL.md`; `docs/skill-standard.md`.
- **Anti-pattern gate:** No step may trigger AP-53 (tool trust without validation) — never trust client payloads without runtime validation. No step may leak internal errors (AP-18). No step may hallucinate framework APIs (AP-41); bind to the actual backend framework in use.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                                                                                                              |
| --- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Task             | Scaffold a validated, typed backend route plus matching tests, following the project's contract first, schema second discipline.                                                   |
| 2   | Target Tool      | Any agent runtime reading markdown skills and executing code-generation tasks: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline.                                                |
| 3   | Output Format    | Route implementation and matching test file in complete, deployable code blocks.                                                                                                   |
| 4   | Constraints      | Never trust client data; always validate with Zod. Never leak internal database errors or stack traces. Default to `.strict()` schemas. Bind to the real framework in the project. |
| 5   | Input            | Endpoint request; existing contracts in `context/SCHEMA.md`; backend framework conventions.                                                                                        |
| 6   | Context          | Prevents injection, malformed-payload bugs, and stack-trace leakage in production APIs.                                                                                            |
| 7   | Audience         | The requesting developer and downstream agents that call or test the endpoint.                                                                                                     |
| 8   | Success Criteria | Route scaffolds with Zod validation; 400 on validation failure; no internal error leakage; tests cover success and failure paths.                                                  |
| 9   | Examples         | See §10.                                                                                                                                                                           |

## 2. Trigger Matrix

| Trigger                                       | Fire? | Notes                                                  |
| --------------------------------------------- | ----- | ------------------------------------------------------ |
| "Create a new route / endpoint / webhook"     | YES   | Core trigger.                                          |
| "Add API contract for [feature]"              | YES   | Core trigger.                                          |
| Server-side validation or error-boundary work | YES   | Core trigger.                                          |
| Frontend-only component work                  | NO    | Route to frontend skills.                              |
| Database schema change                        | NO    | Use `database-migration`.                              |
| Server Component data fetching                | NO    | Native fetch in Server Components; use `plan-feature`. |

## 3. Execution Workflow

### Step 1: Define Contract

- **Action:** Define the exact expected request payload, query parameters, and response shape against `context/SCHEMA.md` and the project's API conventions.
- **Input:** User request; `context/SCHEMA.md`.
- **Stop Condition:** If the contract contradicts `context/SCHEMA.md` or the framework conventions, stop and surface the contradiction.
- **Validation:** Contract recorded; request/response shapes explicit.

### Step 2: Generate Schema

- **Action:** Create a Zod schema to validate incoming data. Default to `.strict()`. Use `z.enum([...])` for unions and branded-ID types per `shared/engineering/typescript-standards.md`.
- **Input:** Defined contract.
- **Stop Condition:** If a schema field's type is ambiguous, stop and ask rather than invent it.
- **Validation:** Schema parses; reflects the contract exactly.

### Step 3: Scaffold Route

- **Action:** Create the route handler with standard `try/catch` error boundaries. Bind the Zod schema to the request parser; return `400 Bad Request` on validation failure. Never leak raw database errors in a 500 response.
- **Input:** Schema; framework conventions.
- **Stop Condition:** If the framework's route signature is unknown, stop and verify the framework files before scaffolding.
- **Validation:** Handler returns 400 on invalid payload; 500 sends a sanitized message only.

### Step 4: Implement Logic

- **Action:** Write the core business logic inside the safe boundary. Parse, don't validate: parse the payload with Zod at the boundary, then use the typed result in the domain model.
- **Input:** Scaffolded route; business requirements.
- **Stop Condition:** If the logic requires a decision not in the request (e.g., auth scope, idempotency), stop and ask.
- **Validation:** Logic lives inside the try/catch; no raw `any`; no untyped payload access.

### Step 5: Generate Tests

- **Action:** Create a matching test file mocking dependencies. Cover success paths and failure paths (400 validation, 500 error boundary).
- **Input:** Route implementation.
- **Stop Condition:** If the test runner or mocking library is unknown, stop and check the project's test setup.
- **Validation:** Tests run green; failure paths assert sanitized responses.

## 4. Output Specification

Complete, deployable code blocks:

```typescript
// route.ts
import { z } from 'zod';
import { parse, type InferOutput } from 'valibot'; // or the project's parse-don't-validate equivalent

const PayloadSchema = z.object({ ... }).strict(); // bind to project conventions
type Payload = z.infer<typeof PayloadSchema>;

// handler with try/catch boundary, 400 on validation failure, sanitized 500s
```

```typescript
// route.test.ts
// Exercises 200 success, 400 validation failure, and sanitized 500 paths
```

## 5. Validation Gate

Run before declaring completion:

- [ ] Contract defined and matches `context/SCHEMA.md`.
- [ ] Zod schema present and `.strict()` by default.
- [ ] 400 returned on validation failure; no untyped payload access.
- [ ] No raw database errors or stack traces leak in 500 responses.
- [ ] Tests cover success and failure paths; no framework API hallucinated.
- [ ] Branded IDs and union literals used per `shared/engineering/typescript-standards.md`.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Scaffolding a route without validation, forgetting the `try/catch`, or leaking raw database errors.
- **Over-execution threshold:** Adding complex authentication middlewares when the user asked for a simple data-fetching route without spec.
- **Calibration default:** Default to strict Zod validation (`.strict()`) for all incoming payloads.

## 7. Anti-Pattern Compliance

| Step         | Prevents AP                           | Mechanism                                                       |
| ------------ | ------------------------------------- | --------------------------------------------------------------- |
| 1 (Contract) | AP-42 (no target state)               | Contract defined before scaffolding.                            |
| 2 (Schema)   | AP-53 (tool trust without validation) | Runtime validation enforced for every incoming payload.         |
| 3 (Scaffold) | AP-18 (no error handling)             | try/catch boundary + sanitized 500s.                            |
| 3 (Scaffold) | AP-41 (hallucinated API)              | Framework signature verified before writing.                    |
| 4 (Logic)    | AP-2 (two tasks)                      | Business logic stays in the safe boundary; validation separate. |
| 5 (Tests)    | AP-3 (no success criteria)            | Success + failure paths asserted.                               |

## 8. Versioning & Changelog

- **Version:** 2.0.0
- **Changelog:**
  - `2.0.0` (2026-08-08) — Elevated to Tier 5 per `docs/skill-standard.md`. Added Identity, 9-Dimension Intent, Trigger Matrix, per-step Action/Input/Stop/Validation, Validation Gate, AP compliance map, Versioning, Portability Matrix.

## 9. Portability Matrix

| Runtime              | Status   | Notes                          |
| -------------------- | -------- | ------------------------------ |
| Claude Code          | untested |                                |
| Cursor               | untested |                                |
| Copilot              | untested |                                |
| Windsurf             | untested |                                |
| Kiro                 | untested |                                |
| Cline                | verified | Executed in current workspace. |
| Raw API (no tooling) | untested |                                |

## 10. Examples

**Input:** "Create a POST route for user signups."

**Output:** `route.ts` with Zod `.strict()` validation for email/password, a `try/catch` boundary, sanitized 500s, and `route.test.ts` covering 400 and 200 responses. No framework API invented; the handler binds to the project's actual router.

**Failure case:** The user says "skip validation, just return the payload". Refuse: it violates the core rule of never trusting client data (AP-53) and the project's parse-don't-validate discipline.
