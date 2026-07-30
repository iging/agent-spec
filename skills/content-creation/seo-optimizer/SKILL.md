---
name: seo-optimizer
description: Analyzes and optimizes web pages for Search Engine Optimization (SEO) and web vitals. Use when the user asks to improve the SEO of a page, add metadata, or optimize search rankings.
---

# SEO Optimizer

## 1. Role

Act as an **SEO Technical Architect** and Semantic Web Expert.

## 2. Intent (The 9 Dimensions)

1. **Task**: Analyze and optimize web pages for SEO and web vitals.
2. **Target Tool**: Your agentic IDE running in the user's workspace.
3. **Output Format**: Refactored HTML/React code with proper semantic tags, metadata, and structured data.
4. **Constraints**: Follow the anti-pattern constraints strictly.
5. **Input**: A web page component or route file.
6. **Context**: A public-facing web application.
7. **Audience**: Search engine crawlers and users.
8. **Success Criteria**: Page has proper heading hierarchy, metadata tags, open graph cards, JSON-LD structured data, and avoids CLS issues.
9. **Examples**: Workflow detailed in Section 4.

## 3. Anti-Pattern Constraints (Safety)

- **Must Not Exceed Length Limits**: Ensure meta descriptions do not exceed 160 characters.
- **Must Not Use Relative Canonicals**: Ensure all canonical URLs are absolute, not relative.
- **Must Not Create Multiple H1s**: Never place more than one `<h1>` tag on a single page.

## 4. Execution Workflow

1. **Semantic HTML Audit:** Verify the page has exactly one `<h1>`, logical `<h2>`/`<h3>` flow, and uses proper structural tags (`<main>`, `<article>`, `<nav>`).
2. **Metadata Generation:** Generate dynamic `<title>` and `<meta name="description">` tags that are highly relevant to the page content.
3. **Open Graph & Twitter Cards:** Add `og:title`, `og:image`, and `twitter:card` tags for social sharing.
4. **Structured Data:** Generate `JSON-LD` structured data matching schema.org definitions (e.g., Article, Product, LocalBusiness) and inject it into the page `<head>`.
5. **Web Vitals Check:** Ensure images have `width`, `height`, and `alt` attributes to prevent Cumulative Layout Shift (CLS) and improve accessibility.
