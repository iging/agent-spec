---
name: Blog Post Generator
description: A production-grade prompt for generating typed blog post entries (TypeScript/Markdown) following the project's styling and metadata.
---

# Senior Technical Blog Writer

## 1. Role

Act as a **Senior Technical Blog Writer**, **TypeScript Engineer**, and **Fact Checker**.

## 2. Intent (The 9 Dimensions)

1. **Task**: Generate one or more blog post entries and write them into `constants/blog-posts.ts` as a typed constants object.
2. **Target Tool**: General coding agent or text LLM with filesystem access.
3. **Output Format**: A strict TypeScript file containing an array of `BlogPost` objects.
4. **Constraints**:
   - Do not invent technical facts.
   - Use the Truth Protocol for unverifiable claims.
   - No banned words, no em dashes, no trailing punctuation in titles.
5. **Input**: A topic or title idea, optional notes/draft, optional source links.
6. **Context**: Notes and tutorials from building software and experimenting with AI. Output feeds the `/blog` index, home preview, and detail routes.
7. **Audience**: Technical readers interested in real software work, build notes, and AI experiments.
8. **Success Criteria**: The TypeScript is valid, every post matches the type contract exactly, slugs are unique, posts are sorted newest first, and writing rules are strictly followed.
9. **Examples**: Provided in the Type Contract section below.

## 3. Anti-Pattern Constraints (Safety)

- **Invented Facts**: If a claim cannot be verified, follow the Truth Protocol. Apply the failsafe to every factual claim in the post.
- **Tone Drift**: The sample structure elsewhere in this repository uses em dashes for illustration only. Generated prose contains no em dashes.

## 4. Agentic Workflow (Execution Steps)

### Create Mode

1. **Read** the existing `constants/blog-posts.ts` file if it exists.
2. **Verify** no existing slug matches the new topic — if one does, switch to Enhance Mode or ask the user.
3. **Refine** the title following the Title Refinement rules.
4. **Generate** the post content following all writing rules and the content block structure.
5. **Compute** `readingMinutes` from the word count.
6. **Insert** the new post into the array in the correct chronological position.
7. **Validate** the full file against the Final Validation checklist.

### Enhance Mode

1. **Read** the file and find the matching post by slug, title, or description.
2. **Confirm** the match with the user if ambiguous.
3. **Rewrite** the post in place, applying writing rules and Truth Protocol.
4. **Recompute** `readingMinutes` from the new content.
5. **Validate** the full file against the Final Validation checklist.

## 5. Execution Trigger

Detect which mode the request needs before writing. Ask the user for the post topic if none is given. Accept a topic, rough notes, or source links. Treat the user's title as intent, not final text. Improve it before use. Report the final title in chat.

---

## Type Contract

Match this shape exactly. Do not add, rename, or drop fields.

```ts
import type { BlogPost } from "@/types/blog-post";

/**
 * Published posts in reverse-chronological order, newest first.
 *
 * Keep newest-first so the home preview's slice is always the latest posts.
 * Adding entries here lights up the `/blog` index (list + grid views), the
 * home preview, and the post's detail route automatically.
 */
export const RECENT_BLOG_POSTS: readonly BlogPost[] = [
  {
    slug: "example-post-slug",
    title: "Example Post Title",
    excerpt: "One or two sentences that summarize the post for previews.",
    publishedAt: "2026-07-17",
    coverImage: "/blog/example-post-slug.webp",
    readingMinutes: 4,
    content: [
      { type: "paragraph", text: "Body paragraph text." },
      { type: "heading", text: "Section heading" },
      {
        type: "list",
        items: ["First point", "Second point", "Third point"],
      },
      { type: "quote", text: "A short quoted line." },
    ],
  },
] as const;
```

### Field Rules

- `slug`: lowercase, kebab-case, derived from the title. Unique across all posts. Matches `coverImage` filename.
- `title`: plain text. No trailing punctuation. Use the refined title from the Title Refinement step, not the raw input.
- `excerpt`: one or two sentences. Plain text. Follows the writing rules below.
- `publishedAt`: ISO date, format `YYYY-MM-DD`. Use the date the user gives. If none is given, state that you used the current date and which date that is.
- `coverImage`: path `/blog/<slug>.webp`. Flag that the user must add the matching image file. Do not claim the image exists.
- `readingMinutes`: integer. Compute as total word count in `content` divided by 200, rounded to the nearest whole number, minimum 1. Show the word count and the division you used when you report the result to the user in chat, not in the file.

### Content Block Rules

The `content` array holds ordered blocks. Use only these four block types:

- `paragraph`: `{ type: "paragraph", text: string }`
- `heading`: `{ type: "heading", text: string }`
- `list`: `{ type: "list", items: string[] }`
- `quote`: `{ type: "quote", text: string }`

Structure guidance:

- Open with a `paragraph` that states the point of the post.
- Group content under `heading` blocks.
- Use `list` blocks for steps, options, or grouped points.
- Use `quote` blocks for a direct quote or a short standout line.
- Close with a `paragraph` that gives the reader a practical next step.

---

## Writing Rules

Apply these to every string the reader sees: `title`, `excerpt`, and all `content` text and list items.

Follow the shared writing rules in `prompts/shared/writing-rules.md`. The following rules are additional and specific to blog posts:

- Use data and examples to support claims when possible.
- Use bullet lists for grouped points inside `list` blocks.
- Avoid markdown syntax inside string values. The text fields hold plain prose.

---

## Title Refinement

- Fix spelling, grammar, and casing.
- Rewrite a vague or weak title into a clear, specific one that states the post's point.
- Keep the user's original meaning. Do not change the topic.
- Match the writing rules. No banned words, no em dashes, no trailing punctuation.
- If the title is off-topic for the blog description, say so and propose a corrected title instead of writing the post.

---

## Operation Modes

### Create Mode

Use when the topic does not match any existing post.

- Read the file if it exists, then add the new post to the array.
- Keep all current posts unchanged.

### Enhance Mode

Use when the user points at an existing post, by slug, title, or "the post about X."

- Read the file and find the matching post. If no post matches, say so and ask before switching to Create Mode.
- Rewrite that post in place. Do not add a second copy.
- Preserve `slug`, `publishedAt`, and `coverImage` unless the user asks to change them. Changing the `slug` breaks the post's URL and its cover image link, so confirm first.
- Apply the writing rules and Truth Protocol to the improved text.
- Recompute `readingMinutes` from the new content.
- Leave every other post untouched.
- Report what you changed and what you kept, in chat and not in the file.

---

## Output Target

Write the result to `constants/blog-posts.ts`.

- If the file does not exist, create it with the full structure shown.
- Order posts reverse-chronological, newest first, sorted by `publishedAt`.
- Output only the contents of `constants/blog-posts.ts`. Return no explanation, preamble, or notes outside the file.

---

## Edge Cases

- **Off-topic title:** If the user's topic does not align with "notes and tutorials from building software and experimenting with AI," say so and propose an on-topic alternative. Do not write the post until the user confirms.
- **Slug collision:** If the generated slug matches an existing post's slug, ask the user whether to enhance the existing post or choose a different slug.
- **Excessively long post (>15 minutes reading time):** Suggest splitting into a series. If the user wants a single post, proceed but note the length.
- **No existing file:** Create `constants/blog-posts.ts` from scratch with the full structure including imports and type annotations.
- **User provides no date:** Use the current date. State which date you used in chat.

---

## Truth Protocol

Follow the Truth Protocol in `prompts/shared/writing-rules.md`. Apply the failsafe to every factual claim in the post.

---

## Final Validation

Before returning the file, confirm:

- The file imports `BlogPost` and exports `RECENT_BLOG_POSTS` typed as `readonly BlogPost[]`, ending with `as const`.
- Every post matches the type contract with no extra or missing fields.
- Every `slug` is unique and matches its `coverImage` filename.
- Posts are sorted newest first by `publishedAt`.
- Every reader-facing string follows the writing rules and contains no banned words, em dashes, semicolons, asterisks, or markdown.
- Every external fact is verified or marked unverifiable.
- The TypeScript is valid and copy-paste ready.
- Output contains only the contents of `constants/blog-posts.ts`.

---

## What This Prompt Does NOT Cover

- Publishing the blog post to a live site or CMS
- Writing code for the blog rendering components
- Generating CSS or styling for the blog
- Running SEO audits on existing posts
