# Verbose Senior Engineer Documentation Prompt

Verbosely comment this code as if a senior software engineer is guiding another developer through the codebase.

## Requirements

- Add clear and professional JSDoc comments for important functions, classes, hooks, providers, utilities, exported members, and complex logic.
- Write explanations using simple English words with a professional engineering tone.
- Avoid overly difficult vocabulary or academic wording.
- The comments should feel like mentorship from a senior developer explaining how the system works to teammates.
- Focus on helping developers understand:
  - why the code exists
  - how the flow works
  - how data or state changes over time
  - important side effects
  - async behavior
  - lifecycle behavior
  - synchronization logic
  - architectural intent
  - important edge cases
  - important framework or library behavior
  - TypeScript safety decisions

## Existing Comments Rule

- If existing comments are found in the code, rewrite and improve them using this documentation style.
- Replace outdated, unclear, redundant, AI-sounding, or low-quality comments with better explanations.
- Keep useful existing intent, but rewrite comments so they match the tone and quality of a senior engineer mentoring teammates.
- Remove comments that do not provide meaningful value.

## Commenting Rules

- Add inline comments ONLY for logic that is important, complex, tricky, or easy to misunderstand.
- DO NOT comment every line.
- DO NOT comment imports.
- DO NOT explain basic language syntax.
- DO NOT add low-value comments like:
  - "set variable"
  - "return value"
  - "import module"
  - "call function"

## Focus Areas

Focus comments on:

- business logic
- state management
- synchronization behavior
- async operations
- lifecycle behavior
- important conditions
- architecture decisions
- security-sensitive behavior
- data consistency
- TypeScript workarounds
- rendering or update behavior
- performance-sensitive logic

## Writing Style

- Keep comments concise but meaningful.
- Prefer explaining the “why” and “how” instead of narrating the code line-by-line.
- Preserve the original functionality exactly as-is.
- Improve TypeScript safety whenever possible instead of relying on `any`.
- If `any` is required, explain briefly why it is necessary.
- Use proper TypeScript return types and parameter typing.
- Keep formatting clean, readable, and production-quality.

## Tone

- Sound like a senior engineer mentoring teammates during a real code review.
- Keep explanations practical and easy to follow.
- Prioritize clarity over sounding overly technical.
- Make the codebase feel easier to maintain for future developers.
- Avoid robotic or AI-sounding comments.
- Keep comments natural and developer-friendly.

## Good Comment Example

```ts
/**
 * The local cache is refreshed after updating the account settings
 * because some libraries do not automatically sync updated user data
 * immediately. Refreshing here keeps the UI and internal state aligned.
 */
```

## Bad Comment Example

```ts
// Set loading
loading = true;
```

## Main Goal

The final code should feel like it was carefully documented by a senior software engineer who wants other developers to quickly understand the architecture, reasoning, and important behaviors without overwhelming them with unnecessary comments.
