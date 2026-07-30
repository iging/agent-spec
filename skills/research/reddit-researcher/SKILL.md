---
name: reddit-researcher
description: "Deep research engine covering the last 30 days across 7 sources — Reddit, X/Twitter, YouTube, LinkedIn, Hacker News, Web, TechCrunch. Uses Apify actors. Synthesizes findings into grounded, cited reports with deduplication, relevance scoring, and cross-source signal detection."
argument-hint: "Claude vs GPT-4o, best AI coding tools, latest news on OpenAI"
license: MIT
user-invocable: true
---

# Reddit Researcher

Research ANY topic across Reddit, X/Twitter, YouTube, LinkedIn, Hacker News, the web, and TechCrunch. Surface what people are actually discussing, recommending, and debating right now — sourced from the last 30 days.

---

## 1. Methodology & Execution

This skill involves a massive, 7-step data pipeline including intent extraction, parallel agent scraping, relevance filtering, deduplication, scoring, and statistical synthesis.

To execute this skill, you MUST first read and follow the strict workflow defined in:
`skills/research/reddit-researcher/references/methodology.md`

Do NOT attempt to execute this skill without strictly following the methodology document.

---

## 2. Security & Permissions

**What this skill does:**

- Calls Apify actors (trudax/reddit-scraper-lite, apidojo/tweet-scraper, streamers/youtube-scraper, harvestapi/linkedin-post-search) via Apify MCP — requires Apify account and Apify MCP connected to Claude Code
- Queries the Algolia Hacker News Search API (hn.algolia.com) — free, no auth required
- Uses Claude's native WebSearch for web and TechCrunch results
- Uses Claude's native WebFetch to read full page/article content

**What this skill does NOT do:**

- Does not post, like, or modify content on any platform
- Does not access your Reddit, X, YouTube, or LinkedIn accounts
- Does not store or log any API keys
- Does not send data to any endpoint not listed above

**Estimated cost per run:** ~$0.10–$0.20 on Apify Starter plan ($29/month).

---

## 3. Requirements

This skill requires an **Apify account** with the Apify MCP server connected to Claude Code.

**Apify actors used:**

- trudax/reddit-scraper-lite — Reddit posts
- apidojo/tweet-scraper — X/Twitter posts
- streamers/youtube-scraper — YouTube videos
- harvestapi/linkedin-post-search — LinkedIn posts

**No API keys needed** for Hacker News (Algolia API is free) or Web/TechCrunch (Claude native WebSearch + WebFetch).

**Estimated cost per run:** ~$0.10–$0.20 on Apify Starter plan ($29/month).
