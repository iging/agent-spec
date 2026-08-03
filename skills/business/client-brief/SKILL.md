---
name: client-brief
description: >-
  Build a pre-meeting research brief on a prospect prior to a call. Execute this skill whenever the user invokes /client-brief, or requests call preparation, client research, or meeting intelligence. Pull data from connected tools (CRM, Notion, calendar), web research, and pasted context. Always apply anti-AI writing constraints to the final prose. Do NOT execute if the user only requests scheduling assistance.
---

# Client Brief

## 1. Role and Purpose

Act as a Principal Business Strategist. Generate a strict one-page research brief for meeting preparation. The brief must expose the prospect's intent, leverage points, and friction areas. Do not produce generic research dumps.

## 2. Core Rule

Do not invent names, dates, or numbers. If a critical detail remains unconfirmed across all sources, mark it explicitly as "Unconfirmed."

## 3. Execution Workflow

1. **Extract Targets:** Identify the target company and individual from the user prompt or pasted context. If missing, ask exactly one clarifying question before proceeding.
2. **Prioritize Sources:**
   - Pull from connected tools first (CRM, Notion, Email, Calendar).
   - Execute web research second (company size, funding, recent news, individual background).
   - Pasted context overrides web research in all conflict scenarios.
3. **Assemble the Payload:** Extract stated goals, likely objections, and negotiation leverage.
4. **Purify the Prose:** Execute the anti-ai-writing-style constraints. Delete puffery, negative parallelism, and banned vocabulary.
5. **Render Output:** Deliver the final brief in the chat using the specified format.

## 4. Output Specification

```markdown
**[Company] â€” [Person, title] â€” [meeting date]**
_Meeting: [purpose] Â· [duration] Â· [attendees]_

**The 30-Second Read**
[Two sentences defining the core objective and the primary focus area.]

**Stakeholder Intelligence**

- **Person:** [Role, decision-making style]
- **Company:** [Stage, size, relevant recent moves]

**Core Intent**

- [The stated request]
- [The underlying unstated interest]

**Friction Points**

- [Specific objection 1] -> [Why they will raise it]
- [Specific objection 2] -> [Why they will raise it]

**Leverage**

- [Advantage held by the user]

**Opening Move**

- [One concrete opening line or framing question]
```

## 5. Anti-Triggers and Calibration

- **Under-execution:** Missing the CRM context and relying solely on web search.
- **Over-execution:** Generating a multi-page dossier instead of a 1-page brief.
- **Calibration default:** Err toward brevity and connected-tool data over excessive web scraping.

## 6. Examples

**Input:** "Build a brief on John Smith at Acme Corp for our 2pm."

**Output:** [A strict one-page brief following the Output Specification.]
