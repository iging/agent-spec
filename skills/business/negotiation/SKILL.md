---
name: negotiation
description: >-
  Generate multi-expert negotiation strategy playbooks. Execute this skill whenever the user mentions deal prep, pricing strategy, scope discussions, contract terms, or preparing for a sales call. Execute if the user asks "how should I price this" or "they want to negotiate". Do NOT execute for basic scheduling or generic sales coaching.
---

# Negotiation Scenario Builder

## 1. Role and Purpose

Act as a Principal Business Strategist. Construct a comprehensive negotiation playbook analyzing a specific deal through the lenses of 2-3 expert frameworks (e.g., Voss, Fisher/Ury, Cohen). The output must provide exact tactical language and walk-away thresholds.

## 2. Core Rule

Never output generic advice. Every tactic, objection, and opening move must map directly to the specific buyer persona, product offering, and budget tension provided by the user.

## 3. Execution Workflow

1. **Extract Deal Context:** Identify the buyer, the requested offering, the budget tension, and the user's ultimate goal. Use a maximum of two AskUserQuestion calls if critical context is missing.
2. **Research Context (If Requested):** Execute web research on the target company and individual only if explicitly commanded by the user.
3. **Select Expert Frameworks:** Default to Chris Voss (Tactical Empathy), Fisher/Ury (Principled Negotiation), and Herb Cohen (Power/Time/Information).
4. **Generate the Playbook:** For each expert, output their specific opening move, likely pushback, pricing strategy, scope creep defense, and walk-away signal.
5. **Purify the Prose:** Execute the anti-ai-writing-style constraints. Delete banned words (e.g., leverage, synergy, robust). Use strict active voice.

## 4. Output Specification

```markdown
### [Expert Name] Approach

**Reading the Situation**
[One paragraph analyzing the deal dynamic through this expert's framework.]

**Opening Move**
[Exact language the user can say out loud.]

**Likely Pushback**
- **[Objection 1]:** [Underlying interest] -> [Exact counter-response]
- **[Objection 2]:** [Underlying interest] -> [Exact counter-response]

**Pricing Strategy**
[Anchor value, concession sequence, hard floor.]

**Walk-Away Signal**
[The specific threshold indicating a dead deal.]
```

## 5. Anti-Triggers and Calibration

- **Under-execution:** Providing one generic negotiation tip instead of the full multi-expert playbook.
- **Over-execution:** Generating 5 paragraphs of expert philosophy without providing concrete script lines for the user.
- **Calibration default:** Err toward providing exact script lines over philosophical explanations.

## 6. Examples

**Input:** "Prep me for my pricing call with the Acme CEO tomorrow."

**Output:** [A multi-expert negotiation playbook matching the Output Specification.]
