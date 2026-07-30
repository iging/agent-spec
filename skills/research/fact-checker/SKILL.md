---
name: fact-checker
description: >-
  Extract and verify every factual claim in a draft before it gets
  published, using web search against primary sources, and return a
  claim-by-claim verdict report plus a corrected version. Use this skill
  whenever the user asks to fact-check, verify, "make sure this is
  accurate", or review a piece before publishing or sending. ALSO use it
  proactively before delivering any content containing statistics, dates,
  prices, quotes, names, job titles, rankings, or superlatives (first,
  largest, only), including blog posts, newsletters, LinkedIn posts,
  reports, press releases, and presentations. Do NOT use for pure opinion
  pieces, fiction, or internal brainstorms the user isn't publishing.
---

# Fact Checker

One wrong number in a published piece costs more than a hundred right
ones earn. Readers who catch a single error discount everything else,
corrections travel slower than the original mistake, and in professional
contexts a bad stat can mean legal or reputational damage. This skill
exists because the failure mode is silent: wrong claims read exactly like
right ones. The only defense is checking each one on purpose.

A second reason this skill exists: text drafted from memory (yours or the
user's) inherits stale facts. A claim that was true in 2023 can be false
today. Treat "I remember this being true" as a hypothesis, never as a
verification.

## Workflow

### 1. Extract claims

Read the draft and pull out every checkable factual assertion. A claim is
checkable if a source could prove it right or wrong. Number each one and
keep the exact wording from the draft, because precision matters:
"the largest producer" and "one of the largest producers" are different
claims with different truth values.

Not claims (skip these): opinions, predictions, the user's personal
experiences, hedged generalities ("many people prefer..."), and genuinely
common knowledge (water boils at 100°C at sea level). When in doubt
whether something is common knowledge, treat it as a claim.

### 2. Triage by risk

Verify in this order, because these categories fail most often and cost
most when wrong:

1. **Numbers**: statistics, prices, percentages, dates, counts
2. **Quotes**: attributed statements (check wording AND attribution;
   misattributed real quotes are the most common quote failure)
3. **People and titles**: names, spellings, current roles. Job titles go
   stale fast; "CEO of X" claims are wrong surprisingly often.
4. **Superlatives and absolutes**: first, only, largest, never, always.
   These are falsified by a single counterexample, so they fail at the
   highest rate of any category.
5. **Medical, legal, and financial claims**: highest stakes; hold these
   to primary-source standard only.
6. **Names of products, studies, laws, organizations**: easy to garble,
   easy to check.

If the draft has more than ~25 claims, tell the user, verify the
high-risk tiers fully, and list the low-risk remainder as unchecked
rather than silently skipping them.

### 3. Verify against sources

Search for each claim. Source quality rules:

- **Primary beats secondary.** The company's filing, the study itself,
  the government dataset, the transcript. An aggregator citing a source
  is a pointer, not a verification; follow the pointer.
- **Check the date.** A 2021 source can only verify what was true in 2021. For anything that changes (prices, populations, market shares,
  job titles, records), require a recent source and note the as-of date.
- **Two independent sources for surprising claims.** If a claim is
  counterintuitive or damaging to someone, one source is not enough,
  and make sure the two sources aren't both citing the same origin.
- **A claim repeated everywhere is not therefore true.** Viral stats
  (the "we swallow 8 spiders a year" class) have thousands of citations
  and zero primary sources. If you cannot find the origin, that is a
  finding: mark it unverifiable.

### 4. Render verdicts

Use exactly these five verdicts, because the differences drive different
fixes:

- **CONFIRMED**: matches a reliable source. Cite it.
- **NEEDS UPDATE**: was true, isn't current. Provide the current figure
  and its as-of date.
- **IMPRECISE**: directionally right, wrong as written (wrong year,
  rounded too far, overstated superlative). Provide corrected wording.
- **UNVERIFIABLE**: no adequate source found either way. Do not treat
  as false; do recommend cutting or hedging it, since the user cannot
  defend it if challenged.
- **FALSE**: contradicted by reliable sources. Show what the source
  actually says.

### 5. Report, then repair

Return the report in this format:

```
## Fact-check report
Checked N claims: X confirmed, Y need changes, Z unverifiable.


1. "exact claim text" — CONFIRMED
   Source: [name + link], as of [date]
2. "exact claim text" — FALSE
   Source says: [what it actually says]
   Suggested fix: [replacement wording]
...
```

Then offer to apply the fixes and return a corrected draft. When
applying fixes, change only what the verdicts require; do not rewrite
voice or style (that's a different job, and mixing the two makes the
diff unreviewable).

## Judgment rules

**Never rubber-stamp.** If every claim in a stat-heavy piece comes back
CONFIRMED on the first pass, re-examine the two or three most surprising
ones. A fact-check that finds nothing should earn that result.

**"I couldn't verify it" is a respectable answer.** The failure mode to
avoid at all costs is asserting a verdict without a source. Every
CONFIRMED and every FALSE must carry a citation the user can click.

**Check what the draft says, not what it meant.** If the draft says
"studies show" (plural) and you found one study, that's IMPRECISE. If
it says "proven" and the source says "associated with", that's
IMPRECISE. Overclaiming is a factual error, not a style choice.

**If web search is unavailable**, do not simulate verification from
memory. Extract and triage the claims, mark which ones you believe are
correct with LOW/MEDIUM/HIGH confidence, clearly label that nothing was
verified against live sources, and recommend the user re-run when search
is available.

## Example

Draft sentence: "Since ChatGPT launched in 2023, OpenAI has grown to
over 100 million weekly users, making it the fastest-growing app in
history."

Extraction finds three claims: launch year, user count, superlative.
Typical result: launch year FALSE (November 2022), user count NEEDS
UPDATE (figure and as-of date from a current source), "fastest-growing
app in history" IMPRECISE (widely reported for a period, later
surpassed; suggest "one of the fastest-growing consumer apps ever" or
tie it to the specific record with dates). One sentence, three verdicts,
which is exactly why extraction must happen claim by claim rather than
sentence by sentence.
