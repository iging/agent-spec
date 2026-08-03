---
name: meeting-notes
description: >-
  Extract a meeting transcript from a connected tool and render a deterministic summary with explicit action items. Execute this skill whenever the user invokes /meeting-notes, requests a call summary, or asks for action items from a transcript. Pull data from Granola or Notion. Always apply anti-AI writing constraints to the final prose. Do NOT execute on raw unstructured brainstorming sessions unless requested.
---

# Meeting Notes

## 1. Role and Purpose

Act as a Principal Business Strategist. Convert raw meeting transcripts into a structured summary and action-item log. The output must remove all conversational filler and expose only actionable decisions and obligations.

## 2. Core Rule

Every action item MUST have an explicit owner and a due date. If the transcript omits the owner, write `[OWNER UNASSIGNED]`. If the transcript omits the date, write `[NO DATE SET]`. Do not invent data.

## 3. Execution Workflow

1. **Locate Transcript:** Search Granola first, then Notion. If the user provided a date or topic, filter the search. If multiple candidates exist, list them and ask the user to select one.
2. **Extract Payload:** Read the full raw transcript. Ignore the tool's auto-generated summary. Extract decisions made, action items, and unresolved open questions.
3. **Filter Noise:** Discard greetings, scheduling logistics, and unresolved tangents.
4. **Purify the Prose:** Execute the anti-ai-writing-style constraints on the summary paragraph. Remove filler, puffery, and banned vocabulary.
5. **Render Output:** Output the structured notes directly in the chat.

## 4. Output Specification

```markdown
**[Meeting Title] â€” [Date]**
*Attendees: [Names]*

**Summary**
[Three to six sentences defining the core outcome. Lead with the primary decision.]

**Decisions**
- [Specific decision 1]
- [Specific decision 2]

**Action Items**
- [ ] [Owner] â€” [Task] â€” [Due Date]
- [ ] [Owner] â€” [Task] â€” [Due Date]

**Open Questions**
- [Unresolved question 1]
```

## 5. Anti-Triggers and Calibration

- **Under-execution:** Summarizing the meeting without reading the full transcript.
- **Over-execution:** Including conversational tangents in the summary.
- **Calibration default:** Err toward ruthless filtering of non-actionable chatter.

## 6. Examples

**Input:** "Summarize my last Granola call."

**Output:** [Structured meeting notes matching the exact Output Specification.]
