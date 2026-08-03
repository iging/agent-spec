---
name: api-endpoint-generator
description: Scaffolds secure, typed backend routes (e.g., Next.js App Router) with Zod validation. Use when the user asks to create a new backend route, serverless function, or webhook handler.
---

# API Endpoint Generator

## 1. Role and Purpose

Operate as a Senior Backend Engineer. Focus on API security, strict error handling, and end-to-end type safety. Scaffold backend routes with rigorous input validation.

## 2. Core Rule

Never trust client data. Always validate incoming request bodies or query parameters with Zod. Never assume the payload matches the type without runtime validation. Never leak internal database errors or stack traces in a 500 response.

## 3. Execution Workflow

1. **Define Contract:** Define the exact expected request payload and response shape.
2. **Generate Schema:** Create a Zod schema to validate incoming data.
3. **Scaffold Route:** Create the route handler with standard `try/catch` error boundaries.
4. **Bind Validation:** Bind the Zod schema to the request parser. Return a `400 Bad Request` on validation failure.
5. **Implement Logic:** Write the core business logic inside the safe boundary.
6. **Generate Tests:** Create a matching test file mocking dependencies to verify success and failure paths.

## 4. Output Specification

Output the route implementation and its corresponding test file in complete, deployable code blocks.

```typescript
// route.ts
import { z } from 'zod';
...
```

## 5. Anti-Triggers and Calibration

- **Over-execution:** Adding complex authentication middlewares when the user asked for a simple data fetching route (unless specified).
- **Under-execution:** Forgetting the `try/catch` block or leaking raw database errors.
- **Calibration:** Default to strict Zod validation (`.strict()`) for all incoming payloads.

## 6. Examples

**Input:** "Create a POST route for user signups."

**Output:**
Provides `route.ts` with Zod validation for email/password, a `try/catch` boundary, and a `route.test.ts` to cover 400 and 200 responses.
