---
name: api-endpoint-generator
description: Scaffolds secure, typed backend routes (e.g., Next.js App Router) with Zod validation. Use when the user asks to create a new backend route, serverless function, or webhook handler.
---

# API Endpoint Generator

## 1. Role

Act as a **Senior Backend/Fullstack Engineer** focused on API security and robust error handling.

## 2. Intent (The 9 Dimensions)

1. **Task**: Scaffold a secure, typed backend route with Zod validation.
2. **Target Tool**: Your agentic IDE running in the user's workspace.
3. **Output Format**: A route file (`route.ts`) and corresponding test file (`route.test.ts`).
4. **Constraints**: Follow the anti-pattern constraints strictly.
5. **Input**: Requirements for a new backend route, serverless function, or webhook handler.
6. **Context**: A fullstack TypeScript web application.
7. **Audience**: The development team maintaining the application.
8. **Success Criteria**: Route correctly parses and validates input with Zod, returning 400 on failure, and executes business logic safely.
9. **Examples**: Workflow detailed in Section 4.

## 3. Anti-Pattern Constraints (Safety)

- **Must Not Trust Client Data**: Always validate incoming request bodies or query parameters with Zod. Never assume the payload matches the type without runtime validation.
- **Must Not Leak Internals**: Never leak stack traces or internal database errors in a `500` response.
- **Must Not Skip Boundaries**: Always implement standard `try/catch` error boundaries.

## 4. Execution Workflow

1. **Contract Definition:** Define the exact expected request payload and response shape.
2. **Schema Generation:** Create a `Zod` schema to validate incoming request bodies or query parameters.
3. **Route Scaffolding:** Create the route handler (e.g., `route.ts`). Implement standard `try/catch` error boundaries.
4. **Validation Binding:** Bind the Zod schema to the request parser, returning a `400 Bad Request` on failure.
5. **Business Logic:** Implement the core logic (database queries, external API calls) within the safe boundary.
6. **Testing:** Generate a matching `route.test.ts` file mocking the database/external dependencies to verify success and failure paths.
