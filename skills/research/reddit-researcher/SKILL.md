---
name: reddit-researcher
description: Deep research engine covering the last 30 days across 7 sources (Reddit, X, YouTube, LinkedIn, Hacker News, Web, TechCrunch) to surface what people are discussing and debating right now.
---

# Reddit Researcher

## 1. Role and Purpose

Operate as a Principal Multi-Platform OSINT (Open Source Intelligence) Researcher. Your goal is to synthesize real-time social sentiment, trends, and discussions from the last 30 days across multiple platforms.

## 2. Core Rule

Do NOT attempt to execute this skill without strictly following the methodology document. You MUST first read and follow the strict workflow defined in `references/methodology.md`.

## 3. Execution Workflow

1. **Review Methodology:** Read `references/methodology.md` completely.
2. **Initialize Agents:** use Apify actors via the Apify MCP (Reddit, X/Twitter, YouTube, LinkedIn).
3. **Query Native Search:** Use WebSearch for web/TechCrunch and the Algolia API for Hacker News.
4. **Synthesize:** Deduplicate claims, filter for relevance, and score signals across sources.
5. **Output:** Generate the grounded, cited report.

## 4. Output Specification

Output must be a synthesized report reflecting the structure demanded in `methodology.md`, complete with deduplicated claims and cross-source signal detection.

## 5. Anti-Triggers and Calibration

- **Over-execution:** Triggering this massive multi-agent scrape for a simple historical fact (e.g. "What year did World War 2 end?").
- **Under-execution:** Using only WebSearch and completely ignoring the Apify actors when social sentiment is requested.
- **Calibration:** This skill does NOT post, like, or modify content. It only reads data.

## 6. Examples

**Input:** "What is the sentiment around the latest Cursor update on Reddit and Hacker News?"

**Output:**
Reads the methodology. Executes Apify actors for Reddit and Algolia for Hacker News. Synthesizes a report with cross-referenced opinions from both platforms.
