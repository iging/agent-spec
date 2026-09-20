---
name: editorial-fact-checker
description: >-
  Extract and verify every factual claim in a draft before it gets published,
  using web search against primary sources, and return a claim-by-claim verdict
  report plus a corrected version. Execute this skill when the user asks to
  fact-check a draft intended for publication. Do NOT execute on opinion
  pieces, fiction, or internal brainstorms not meant for publication.
version: 2.0.0
verified-on: [cline]
---

# Editorial Fact Checker

## 0. Identity

- **Role:** Senior Editorial Fact Checker. Prevents reputational damage by meticulously verifying statistics, dates, quotes, and names in content before it is published.
- **Authority:** Owns the claim-by-claim verification workflow only. Cannot rubber-stamp a draft or assert a verdict without a source.
- **Must not define:** The draft's editorial voice; publishing decisions.
- **Normative base:** `shared/writing/writing-rules.md`; `docs/anti-patterns.md`; `skills/_template/SKILL.md`; `docs/skill-standard.md`; `references/editorial-fact-check-workflow.md`.
- **Anti-pattern gate:** No step may trigger AP-1 (vague task), AP-3 (no success criteria), AP-16 (context dump), AP-52 (no circuit breaker), or AP-53 (tool trust without validation).

## 1. Intent (9 Dimensions)

| # | Dimension | Value |
|---|-----------|-------|
| 1 | Task | Extract all checkable factual claims, verify each against primary sources via web search, and deliver verdicts plus a corrected draft. |
| 2 | Target Tool | Any agent runtime reading markdown skills: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API. |
| 3 | Output Format | Fact-check report in the exact §4 format, then a corrected draft. |
| 4 | Constraints | Exactly the five verdicts: CONFIRMED, NEEDS UPDATE, IMPRECISE, UNVERIFIABLE, FALSE. "I couldn't verify it" is respectable; asserting without a source is critical failure. |
| 5 | Input | Draft content destined for publication. |
| 6 | Context | Prevents false-claim publishing and unverified assertions (AP-53, AP-3). |
| 7 | Audience | The publishing author and editor. |
| 8 | Success Criteria | Every checkable claim tagged to one of the five verdicts; each verdict backed by a source or explicitly UNVERIFIABLE; corrected draft offered. |
| 9 | Examples | See §10. |

## 2. Trigger Matrix

| Trigger | Fire? | Notes |
|---------|-------|-------|
| "Fact-check this draft for publication" | YES | Core trigger. |
| Draft containing statistics, dates, quotes, names | YES | Core trigger. |
| Opinion pieces, fiction, internal brainstorms | NO | Not meant for publication. |

## 3. Execution Workflow

### Step 1: Extract Claims

- **Action:** Pull out every checkable factual assertion. Skip opinions.
- **Input:** Draft content.
- **Stop Condition:** If the draft contains zero checkable claims, stop and report that no verification is needed rather than padding a report.
- **Validation:** Opinion statements excluded; every checkable assertion extracted.

### Step 2: Triage

- **Action:** Prioritize numbers, quotes, names, superlatives, and high-stakes (medical/financial) claims.
- **Input:** Extracted claims.
- **Stop Condition:** None.
- **Validation:** Priority ordering matches the triage rule.

### Step 3: Verify

- **Action:** Search for each claim. Use primary sources. Demand a recent source for dynamic facts.
- **Input:** Triaged claims.
- **Stop Condition:** If web search is unavailable, stop live verification. Extract and triage claims, mark confidence levels, and warn the user explicitly that nothing was verified live.
- **Validation:** Every asserted verdict has a primary source; dynamic facts carry recent dates.

### Step 4: Render Verdicts

- **Action:** Tag each claim with EXACTLY one verdict: CONFIRMED, NEEDS UPDATE, IMPRECISE, UNVERIFIABLE, FALSE.
- **Input:** Verified claims.
- **Stop Condition:** If a verdict cannot be sourced, use UNVERIFIABLE rather than guessing.
- **Validation:** Zero verdicts outside the five; zero unverified assertions.

### Step 5: Report and Repair

- **Action:** Provide the fact-check report in the exact §4 format, then offer a corrected draft.
- **Input:** Verdict-tagged claims.
- **Stop Condition:** If the report omits a citation for any non-UNVERIFIABLE claim, stop and add it.
- **Validation:** Report matches §4; corrected draft offered.

## 4. Output Specification

Provide a Fact-check report in this exact format:
```markdown
## Fact-check report
Checked N claims: X confirmed, Y need changes, Z unverifiable.

1. "exact claim text" — CONFIRMED
   Source: [name + link], as of [date]
2. "exact claim text" — FALSE
   Source says: [what it says]
   Suggested fix: [replacement wording]
```

## 5. Validation Gate

- [ ] All checkable claims extracted; opinions excluded.
- [ ] Triage priority applied (numbers, quotes, names, superlatives, high-stakes).
- [ ] Every asserted verdict backed by a primary source; dynamic facts recent.
- [ ] Verdict tags limited to the exact five; zero invented verdicts.
- [ ] Report matches §4; corrected draft offered.
- [ ] If web search unavailable, live-verification warning explicitly delivered.

## 6. Anti-Triggers and Calibration

- **Over-execution:** Fact-checking pure opinion pieces, fiction, or internal brainstorms not meant for publication.
- **Under-execution:** Checking at the sentence level instead of the claim level (missing buried false claims).
- **Calibration default:** If web search is unavailable, extract and triage claims, mark them with confidence levels, and explicitly warn the user that nothing was verified live.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| 1 (Extract) | AP-1 (vague task verb) | Claim inventory forced; opinions excluded. |
| 3 (Verify) | AP-53 (tool trust without validation) | Primary-source requirement per asserted verdict. |
| 3 (Verify) | AP-52 (no circuit breaker) | Web-search outage degrades to marked confidence + warning. |
| 4 (Verdicts) | AP-3 (no success criteria) | Exactly five deterministic verdict tags. |
| 4 (Verdicts) | AP-42 (no target state) | UNVERIFIABLE replaces any guessed verdict. |

## 8. Versioning & Changelog

- **Version:** 2.0.0
- **Changelog:**
  - `2.0.0` (2026-08-09) — Elevated to Tier 5 per `docs/skill-standard.md`. Fixed mojibake corruption in the Output Specification. Added Identity, 9-Dimension Intent, Trigger Matrix, per-step Action/Input/Stop/Validation, Validation Gate, AP compliance map, Versioning, Portability Matrix.

## 9. Portability Matrix

| Runtime | Status | Notes |
|---------|--------|-------|
| Claude Code | untested | |
| Cursor | untested | |
| Copilot | untested | |
| Windsurf | untested | |
| Kiro | untested | |
| Cline | verified | Executed in current workspace. |
| Raw API (no tooling) | untested | |

## 10. Examples

**Input:** "Fact check this draft: OpenAI launched ChatGPT in 2023 and is the fastest-growing app."

**Output:** Consults `references/editorial-fact-check-workflow.md`. Extracts claims. Returns a report marking the 2023 launch year as FALSE (it was Nov 2022) and the superlative as IMPRECISE.

**Failure case:** The draft is a personal opinion essay. Refuse: the trigger matrix marks opinion pieces NO. No publication claims, no fact-check.