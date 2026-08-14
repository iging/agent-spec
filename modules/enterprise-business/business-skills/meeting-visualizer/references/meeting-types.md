# Meeting Archetypes

Classification map for meeting-visualizer Step 3. Assign exactly one archetype. If none fit, mark Undetermined with a one-line rationale.

| Archetype | Signal | Dashboard Layout |
|-----------|--------|------------------|
| Brainstorm | Divergent idea generation; no owner assigned to proposals | Idea board: columns per theme, idea cards with sticky-note styling |
| Planning | Timeline, milestones, dependencies, owner assignments | Timeline view: phases as bands, milestones as markers |
| Sales | Prospect needs, objections, next-step commitments | Funnel view: stages, objection list, commitment callouts |
| 1:1 | Two-speaker ratio; feedback, priorities, career items | Dialogue view: alternating speaker columns, priority list |
| Retro | What went well, what went wrong, action owners | Three-column board: good / bad / actions |
| Discovery | Requirements gathering, problem exploration, open questions | Question map: problem tree, requirements list, open questions |
| Decision | Explicit choice made with rationale | Decision card: verdict, rationale, alternatives, dissent |
| Kickoff | Project start, roles, scope, first milestone | Scope panel: roles, scope box, first milestone callout |
| Status | Per-item progress reporting; ownership reporting only | Status grid: item rows, status cells, blocker flags |
| Undetermined | None of the above | Standard decision-item layout; keep minimal |

**Assignment rule:** Classify by dominant signal, not by the calendar title. A meeting titled "Planning" that only reports status is Status.

**Stop trigger:** If the transcript is a status-only ping under ~150 words total, do not render. Offer a plain-text recap via `meeting-notes`.