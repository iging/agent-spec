---
name: prompt-auditor-rules
description: Meta-skill rules for prompt auditing and anti-pattern clearance.
version: 1.0.0
---

# Prompt Auditor Rules & Anti-Pattern Clearance

## 1. Meta Audit Rules

1. **Scope Boundaries:** Every prompt must declare explicit allowed and forbidden file paths (prevents AP-4, AP-26, AP-44).
2. **Stop Conditions:** Every prompt must specify explicit stop conditions and human review triggers (prevents AP-28, AP-45).
3. **Format Locks:** Prompts producing data must require structured JSON or explicit markdown templates (prevents AP-18, AP-24).
4. **Reasoning Alignment:** Prompts targeting reasoning models must omit explicit Chain of Thought directives (prevents AP-35).
