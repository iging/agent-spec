---
name: granola-meeting-os
description: >-
  Extract a Granola meeting transcript, classify the meeting type, and render a tailored interactive visual dashboard (HTML). Execute this skill whenever the user references a Granola meeting and requests it visualized, recapped, dashboarded, or one-pagered. Do NOT execute if the user only requests a plain-text summary; route to meeting-notes instead.
---

# Granola Meeting OS

## 1. Role and Purpose

Act as a Principal Business Strategist. Convert a raw meeting transcript into a distinctive, scannable, and shareable HTML dashboard. The output must expose decisions, action items, open questions, and verbatim quotes formatted according to the specific meeting archetype.

## 2. Core Rule

Generate a single self-contained HTML file using inline styles and scripts. Do not use external CSS frameworks (e.g., Tailwind CDN) or network-dependent assets. Do not invent verbatim quotes.

## 3. Execution Workflow

1. **Locate Target Meeting:** Query Granola for the most recent meeting or filter by the user's specific topic/date.
2. **Extract Payload:** Retrieve both the raw transcript (for verbatim quotes) and Granola's generated notes (for structured fields).
3. **Classify Meeting Type:** Map the transcript to one of the supported meeting archetypes (Brainstorm, Planning, Sales, 1:1, Retro, Discovery, Decision, Kickoff, Status). Refer to `references/meeting-types.md`.
4. **Assemble Core Data:** Extract the universal fields: Decisions (with rationale), Action Items (with owners), Open Questions, and Verbatim Quotes (attributed and unedited).
5. **Render Dashboard:** Generate the self-contained HTML file following the design constraints in `references/dashboard-design.md`. 
6. **Deliver Output:** Execute `present_files` to serve the HTML file. Output exactly one sentence in the chat: "Here is the dashboard."

## 4. Output Specification

The output must be a valid HTML5 document containing all CSS and JavaScript inline. The structure must adapt to the classified meeting type.

## 5. Anti-Triggers and Calibration

- **Under-execution:** Providing a text summary instead of an HTML dashboard.
- **Over-execution:** Generating a dashboard for a 150-word transcript consisting entirely of status pings.
- **Calibration default:** Err toward skipping the HTML render and offering a plain-text recap if the transcript lacks sufficient substance.

## 6. Examples

**Input:** "Visualize my last call with Marcus."

**Output:** [A self-contained HTML file rendered as a Timeline Dashboard, delivered via `present_files`.]
