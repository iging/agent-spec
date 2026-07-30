---
name: client-brief
description: >
  Build a pre-meeting brief on a prospect before a call. Use this skill whenever the user invokes /client-brief, or asks to "prep me for my call with [company/person]", "what do I need to know before this meeting", "build a brief on [prospect]", "research this client before we talk", or anything about getting ready for a sales or pitch conversation. Pull from connected tools (CRM, Notion, email, calendar), web research on the company and person, and anything the user pastes. Always run the anti-AI writing rules on the prose.
---

# Client brief

Build a sharp, one-page brief the user can read in the 10 minutes before a call. The goal is walking in knowing who they're talking to, what the prospect wants, where the leverage is, and how to open. Read like a colleague who did the homework, not a research dump.

## Step 1: Figure out who and what

Get the basics first. If the user already named the company and person, use that. If they pasted an email thread, pull names, titles, and context from it. If anything critical is missing (who's on the call, what the meeting is about), ask once, then proceed.

[ ADD YOUR DEAL CONTEXT — e.g. what you sell, your typical buyer (founders/CEOs/procurement), your price range. This tells the skill what to look for. ]

## Step 2: Gather from all three sources

Pull in this order, stop early if you have enough:

**1. Connected tools (check these first — the warmest data lives here):**

- CRM / Notion: past deals, notes, deal stage, prior contact. [ NAME YOUR CRM OR DEAL TRACKER. ]
- Email: search the thread for what they've already said about budget, timeline, priorities, objections.
- Calendar: who's actually invited, meeting length, any agenda in the invite.
- If a tool isn't loaded, search for it before assuming it's unavailable. Only skip it after the search comes back empty.

**2. Web research:**

- Company: size, funding stage, recent news, what they sell, who they sell to.
- The person: title, background, public statements, anything that signals their priorities.
- Industry context that affects their urgency to buy [ WHAT YOU SELL ].
- Any public signal about budget or spending.
- Note the date of what you find. Flag anything that might be stale.

**3. Pasted input:**

- If the user gave an email thread, transcript, or notes, read it carefully for tone, power dynamics, and what the other side has already revealed.
- Pasted context beats web research when they conflict. They know their deal better than the internet does.

Don't research forever. The point is a brief, not a dossier. If the connected tools and one pass of web search give you enough, stop.

## Step 3: Write the brief

Default structure, one page max:

**[Company] — [Person, title] — [meeting date]**
_Meeting: [what it's for] · [length] · [other attendees]_

**The 30-second read**
2 to 3 sentences. Who they are, what they probably want, the one thing to keep front of mind. Lead with what matters most.

**Who's on the other side**

- Person: role, what they care about, how they likely make decisions.
- Company: stage, size, recent moves that matter to this deal.

**What they want (and the interest underneath)**

- The stated ask, plus the real interest behind it where you can read it. [ TIE THIS TO YOUR OFFER — e.g. training vs full deployment vs retainer. ]

**Likely objections / friction**

- 2 to 4 specific ones, based on what you found. Not generic. For each, a one-line read on why they'll raise it.

**Leverage**

- What the user has going in (track record, referral, their urgency, your scarcity). Be honest about who needs this deal more.

**Open with this**

- A concrete first move: the tone, the framing, an actual line or question the user can say out loud.

**Unknowns to confirm on the call**

- The gaps the research couldn't fill. The things to ask early.

Rules:

- Use real names, numbers, and dates from your sources. No placeholders if the detail exists.
- If you couldn't find something, say "couldn't confirm" rather than guessing. A confident wrong fact in a brief is worse than a known gap.
- Be opinionated. If the deal looks weak, or one objection is the real risk, say so.

[ ADJUST FORMAT TO HOW YOU USE IT — e.g. add a "walk-away signal" line, a suggested price anchor, a one-line bull/bear call on whether this closes. ]

## Step 4: Humanise the prose

Run the **delete-ai-words / anti-ai-writing-style** rules on every full-sentence part before delivering. Not optional. [ UPDATE THE NAME IF YOUR HUMANISE SKILL IS CALLED SOMETHING ELSE. ]

Patterns that leak most in briefs:

- **Negative parallelism**: "This isn't a discovery call. It's a closing call." Delete the rejected half.
- **Puffery**: "a pivotal opportunity", "a key strategic account". State the facts, let the user judge.
- **Banned vocabulary**: leverage, align, synergy, robust, holistic, strategic (as filler). Cut them. "Leverage" becomes "use."
- **Copulative avoidance**: "The CEO serves as the decision-maker" → "The CEO decides."
- **Rule of three**: don't force every list to three items.

The bullet lists can stay terse. The humanise pass mainly applies to the 30-second read and the leverage/open sections.

## Step 5: Deliver

Return the brief in the chat by default. [ CHOOSE YOUR DEFAULT — e.g. "save to OUTPUTS/briefs/[company].md", "draft it as something I can drop into Notion". ]

If the user wants to go deeper after reading, point them to the negotiation skill to build a full strategy playbook for the same deal. [ UPDATE OR REMOVE IF YOU DON'T HAVE THAT SKILL. ]

## Quick checklist before delivering

- [ ] Confirmed who's on the call and what it's for
- [ ] Pulled from connected tools, not just web
- [ ] Pasted context took priority over web where they conflicted
- [ ] Real names/numbers/dates; gaps marked "couldn't confirm"
- [ ] An actual opening line the user can say
- [ ] Anti-AI writing pass run on the prose
- [ ] One page max, no padding
