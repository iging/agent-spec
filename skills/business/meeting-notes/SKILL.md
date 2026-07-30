---
name: meeting-notes
description: >
  Turn a meeting from a connected tool into a clean summary with action items. Use this skill whenever the user invokes /meeting-notes, or asks to "write up my meeting", "summarize the call", "what were the action items from [meeting]", "recap my last meeting", "pull my notes from Granola/Notion", or anything about turning a recorded or transcribed meeting into notes. Pull the meeting from Granola first, fall back to Notion, then produce a short summary plus a clear action-item list. Always run the anti-AI writing rules on the prose.
---

# Meeting notes

Pull a meeting from a connected tool, then write a tight summary and a clean list of action items. The output should read like a sharp colleague wrote it the same afternoon, not like an AI transcript dump.

## Step 1: Get the meeting

Source priority: **Granola first, Notion second.** [ SWAP OR REORDER IF YOUR MAIN TOOL IS DIFFERENT — e.g. put Notion first, or add Google Calendar/Drive for the recording. ]

1. Search the connected tool for the meeting. If the user named it ("the Acme sync", "this morning's standup") or gave a date, use that. If they just said "my last meeting," grab the most recent one.
2. If more than one meeting matches, list the candidates (title + date + attendees) and ask which one. One short question, then stop.
3. If nothing is connected or nothing matches, say so plainly and offer the fallback: they can paste the transcript or notes and the skill works the same way.
4. Read the full transcript/notes, not just the tool's auto-summary. The auto-summary misses the decisions and the off-script moments that matter.

> If the tool isn't loaded yet, search for it before assuming it's unavailable. Only say a source is missing after the search comes back empty.

## Step 2: Pull out what matters

Read for these, in order:

1. **Decisions made** — what was actually agreed, not just discussed.
2. **Action items** — who owes what, by when.
3. **Open questions** — things raised and left unresolved.
4. **Key context** — numbers, dates, names, constraints, dollar figures that someone will need later.

Skip the filler: greetings, scheduling chatter, tangents that went nowhere. If a point was raised and dropped with no conclusion, it's an open question, not a decision.

[ ADD ANYTHING YOUR MEETINGS ALWAYS NEED — e.g. "flag any client commitments separately", "note budget impacts", "tag follow-ups for the sales team". ]

## Step 3: Write the output

Default structure:

**[Meeting title] — [date]**
_Attendees: [names]_

**Summary**
3 to 6 sentences. What the meeting was for and what came out of it. Lead with the most important decision. Plain and specific.

**Decisions**

- One line each. What was decided.

**Action items**

- [ ] Owner — task — due date
- [ ] Owner — task — due date

**Open questions**

- One line each. Only include if there are real ones.

Rules for the list:

- Every action item has an owner. If the transcript never says who, mark it **[owner?]** rather than guessing.
- Every action item has a due date or "no date set." Don't invent dates.
- Use real names and real numbers from the meeting. No placeholders if the detail exists.
- If there are no action items, say "No action items" rather than padding the list.

[ ADJUST THE FORMAT TO HOW YOU SHARE THESE — e.g. add an "Owner / Next step" table, drop the checkboxes if you paste into Slack, add a one-line TL;DR at the very top. ]

## Step 4: Humanise the prose

Run the **delete-ai-words / anti-ai-writing-style** rules on the summary and any full-sentence parts before delivering. This is not optional. [ IF YOU INSTALLED THAT SKILL UNDER A DIFFERENT NAME, UPDATE IT HERE. ]

The patterns that leak most in meeting write-ups:

- **Negative parallelism**: "This wasn't a status update. It was a strategy session." Delete the rejected half. Just say what it was.
- **Puffery**: "a pivotal discussion", "a key alignment moment". State what happened, let the reader judge.
- **Copulative avoidance**: "The team serves as the owner" → "The team owns it."
- **Banned vocabulary**: align, leverage, synergy, streamline, robust, holistic, actionable (when it's filler). Cut them.
- **Rule of three**: don't force every list into three items.
- **Metronome rhythm**: vary sentence length in the summary.

Action items can stay terse and fragment-style. The humanise pass mainly applies to the summary and open questions.

## Step 5: Deliver

Return the notes in the chat by default. [ CHOOSE YOUR DEFAULT — e.g. "save to OUTPUTS/meeting-notes/[date]-[title].md", "draft an email recap to send", "post back to the Notion page". ]

If the user asks for a recap email, write a short one: subject line, two-sentence summary, the action items as a list, sign-off. Keep it humanised too.

## Quick checklist before delivering

- [ ] Pulled the right meeting (confirmed if ambiguous)
- [ ] Every action item has an owner (or [owner?]) and a date (or "no date set")
- [ ] Decisions separated from open questions
- [ ] No invented names, dates, or numbers
- [ ] Anti-AI writing pass run on the summary
- [ ] No filler, no padding; if a section is empty, it says so
