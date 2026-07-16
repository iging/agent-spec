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

## Comment Quality Principles

A comment is only worth writing if the code can't say it for itself, and only worth keeping if it stays true as the code changes. An inaccurate comment is worse than no comment — it actively misleads instead of just failing to help.

**Write these:**

- **Business-rule / rationale comments** — explain a decision the code can't express on its own (e.g. a hardcoded limit that exists for a business reason, not a technical one).
- **Translations** — turn a regex, bitwise flag, or non-intuitive formula into a plain-English statement of what it does.
- **Warnings** — flag something that looks safe to "clean up" but isn't (a slow test, a "redundant" instance that actually prevents a concurrency bug).
- **Amplification** — call out a detail that matters more than it looks (e.g. why an off-by-one exists).
- **TODOs** — only for work blocked by something outside your control (an upstream bug, a pending decision), with the reason stated. Not a substitute for finishing the cleanup now.
- **Public API docs** — for anything consumed outside the immediate codebase: what it does, inputs, outputs, failure modes, and a usage example.
- **License/copyright headers** — reference a standard license by name instead of inlining full legal text; keep them collapsible at the top of the file.

**Don't write these:**

- **Redundant/noise comments** that restate what the code already says, or exist only to satisfy a "every function needs a doc comment" rule.
- **Misleading comments** that are technically true but omit a case that changes the picture (e.g. claiming a discount is "premium only" when non-premium users get one too).
- **Comments that need their own comment** — if the reader still has to guess what "handles padding" refers to, the comment failed at its one job.
- **Comments about code you don't control** — never document a default, config value, or behavior that's actually decided somewhere else; the comment goes stale the moment that other file changes.
- **Commented-out code, author attributions, and changelog/journal comments** — version control already has this history; delete rather than accumulate dead code.
- **Apologies for structure** — closing-brace comments and section-divider comments are a symptom of a function or file that's too big or doing too much. Fix the structure; don't comment around it. (Exception: a framework-mandated boilerplate split with a clear, narrow benefit.)
- **Vague or oversized comments** — a mumbled "not sure if this works" helps no one (write a specific TODO instead); a multi-paragraph history lesson for a one-line function should just be deleted. Avoid HTML tags in comments — plain text reads the same in the editor and in rendered docs.

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
