---
name: granola-meeting-os

description: Builds an interactive visual dashboard from a Granola meeting — pulls the transcript, classifies the meeting type (brainstorm, planning, sales call, 1:1, retro, customer interview, decision, kickoff, status), and renders a tailored dashboard. Brainstorms become idea boards, planning sessions become timelines, sales calls become visual one-pagers you can send to anyone who missed the meeting. Every dashboard surfaces decisions, action items, open questions, and the quotes that actually mattered. Use this skill whenever the user references a Granola meeting and wants it visualized, recapped, dashboarded, or one-pagered — including casual phrasings like "visualize my last call", "what happened in my Granola today", "recap the standup", or "build a board from my brainstorm". Reach for it even when the user doesn't say "dashboard" — if there's a Granola meeting and they want it rendered visually, this is the skill.
---

# Granola Meeting OS

Turn a Granola meeting into a visual dashboard — one polished enough to send to someone who missed it and have them walk away knowing what happened.

The skill has three jobs:

1. Get the right meeting out of Granola
2. Figure out what kind of meeting it was
3. Render a dashboard shaped around that kind

Step 1 and 2 are easy. Step 3 is where the work is — the dashboard needs to be distinctive, scannable, honest, and shareable.

## Workflow

### Step 1 — Pick the meeting

Default to most recent unless the user specifies otherwise.

- **Default / "my last meeting" / "the call I just had"**: `Granola:list_meetings` sorted desc, take the first.
- **By topic** ("the call with Marcus", "the GenDD review"): `Granola:query_granola_meetings` with the user's phrasing.
- **By date** ("yesterday's standup", "Monday's planning session"): `Granola:list_meetings` filtered to the time window.

If the reference is ambiguous (e.g., "the sales call" when there have been several recently), list 2-3 candidates with title + date and ask which one. Don't guess.

If Granola isn't reachable or returns nothing, offer to work from a pasted transcript or a Granola meeting URL instead. The rest of the workflow stays the same once the transcript is in hand.

### Step 2 — Pull the content

- `Granola:get_meeting_transcript` for the raw transcript with speaker turns.
- `Granola:get_meetings` for Granola's auto-generated notes.

Use both. The notes are a cleaner starting point for structured fields (action items Granola already pulled out). The transcript is essential for quotes — those have to be actual lines people said, not paraphrases.

### Step 3 — Classify the meeting type

Read `references/meeting-types.md` before deciding. It has signal patterns for every supported type plus the per-type extraction spec.

The supported types and their dashboards:

| Type                           | Dashboard shape                                                 |
| ------------------------------ | --------------------------------------------------------------- |
| Brainstorm / ideation          | Idea board — clustered cards grouped by theme                   |
| Planning session               | Timeline — milestones, owners, dependencies                     |
| Sales call / pitch             | Visual one-pager — prospect header, pains, proposal, next steps |
| 1:1                            | Scorecard — wins, blockers, asks, follow-ups                    |
| Retro                          | Three-column board — went well / didn't / try next              |
| Customer interview / discovery | Insight cards — jobs, pains, current solutions, opportunities   |
| Decision meeting               | Decision log — options weighed, rationale, owners               |
| Kickoff                        | Project canvas — goals, scope, team, timeline, risks            |
| Status update / standup        | Status grid — by person or workstream, RAG indicators           |
| Unknown / mixed                | Universal recap — decisions, actions, questions, quotes         |

If a meeting is genuinely hybrid (half status / half decision, or a brainstorm that turned into planning), pick the dominant mode and note the secondary character in the dashboard's intro line. Don't force a square peg.

### Step 4 — Extract the payload

Every dashboard surfaces these four, regardless of type:

- **Decisions** — what was actually decided, with one-line rationale. Skip "we'll think about it" non-decisions.
- **Action items** — owner, action, due date if mentioned. Skip vague "we should look into..." with no owner.
- **Open questions** — things genuinely left hanging. Not rhetorical questions.
- **Key quotes** — 3-6 real lines from the transcript that crystallize a moment: an insight, a commitment, an objection, a breakthrough. Attributed to the speaker. Lightly cleaned for filler ("um", "you know") but otherwise verbatim. If you can't quote, don't — a paraphrase pretending to be a quote is worse than no quote.

Each meeting type also has its own type-specific fields. See `references/meeting-types.md` for the per-type extraction spec and visual layout sketch.

### Step 5 — Render the dashboard

Read `references/dashboard-design.md` before writing HTML. It's the design system — color palettes per meeting type, typography, layout patterns, the patterns that signal "AI dashboard" and the ones that signal "hand-crafted."

Build a single self-contained HTML file at `/mnt/user-data/outputs/<meeting-slug>-dashboard.html`:

- Inline `<style>` only — no Tailwind CDN, no external stylesheets
- Inline `<script>` for any interactivity (collapse/expand sections, filter actions by owner, etc.)
- No images requiring network access
- Has to open and render correctly when downloaded and double-clicked

Then call `present_files` with the path.

## Quality bar

A good dashboard:

- Looks hand-crafted, not AI-templated
- Reads in 30 seconds for the top-line, 2 minutes for the full picture
- Has one dominant color, chosen for the meeting's mood (see design reference)
- Treats quotes as first-class — pulled into callouts with attribution, not buried in paragraphs
- Omits empty sections rather than showing "No decisions"
- Sits well on one desktop screen for the main view, with detail below the fold if needed
- Has no "AI" or "Claude" signature anywhere — feels like Matt built it

A bad dashboard:

- Generic gradients, stock icon sets
- Equal-weight everything (no typographic hierarchy)
- Paraphrased "quotes" no human said that way
- Emojis stuffed into section headers (acceptable only for playful types — retro, brainstorm)
- "Action items" that are actually rephrased status updates
- A footer that says "Generated by AI"

## When the transcript is too thin

If the transcript is under ~150 words, fragmentary, or just status pings ("Looks good." "Sounds good." "Done."), don't manufacture content. Say so plainly and offer one of:

1. Use Granola's generated notes instead (sometimes meatier than the transcript)
2. Bundle multiple related meetings into a thread-level dashboard
3. Skip the dashboard and write a short prose recap

Three real items beats ten padded ones.

## Output

End the turn with `present_files` pointing at the HTML file and a single line — "Here's the dashboard." Don't narrate what's in it; the dashboard speaks for itself. If Matt wants changes, he'll say so.
