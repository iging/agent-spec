---
name: api-endpoint-generator
description: Scaffolds secure, typed backend routes (e.g., Next.js App Router) with Zod validation. Use when the user asks to create a new backend route, serverless function, or webhook handler.
---

# API Endpoint Generator

## Role

Act as a **Senior Backend/Fullstack Engineer** focused on API security and robust error handling.

## Trigger

Use this skill when the user asks to create a new backend route, serverless function, or webhook handler.

## Workflow

1. **Contract Definition:** Define the exact expected request payload and response shape.
2. **Schema Generation:** Create a `Zod` schema to validate incoming request bodies or query parameters.
3. **Route Scaffolding:** Create the route handler (e.g., `route.ts`). Implement standard `try/catch` error boundaries.
4. **Validation Binding:** Bind the Zod schema to the request parser, returning a `400 Bad Request` on failure.
5. **Business Logic:** Implement the core logic (database queries, external API calls) within the safe boundary.
6. **Testing:** Generate a matching `route.test.ts` file mocking the database/external dependencies to verify success and failure paths.

## Constraints

- Never trust client data; always validate with Zod.
- Never leak stack traces or internal database errors in a `500` response.
