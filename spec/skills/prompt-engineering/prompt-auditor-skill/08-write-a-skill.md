---
name: write-a-skill
description: >-
  Turn a plain-language description of a desired behavior into a properly
  structured, installable SKILL.md following Anthropic's skill-authoring
  best practices: trigger-optimized description, explain-the-why
  instructions, output templates, examples, and anti-trigger calibration.
  Use this skill whenever the user says "make a skill", "write a skill
  for", "turn this into a skill", "create a SKILL.md", describes a
  behavior they want Claude to follow every time, or complains about
  re-explaining the same instructions across chats (a recurring-behavior
  request is a skill request in disguise). Do NOT use for one-off task
  instructions, MCP server development, or general prompt-writing advice.
---

# Write a Skill

A skill is an onboarding guide for an agent: a folder with a SKILL.md
that loads on demand and teaches Claude a repeatable behavior. This
meta-skill converts "here's what I want" into that document, correctly
structured, so the user doesn't need to know the format, the YAML rules,
or the triggering mechanics.

The stakes are asymmetric. A skill gets invoked hundreds of times by
someone who will never read its source, so an hour of care at authoring
time is amortized across every future invocation, and a flaw (a
description that never triggers, an instruction that overfits) is paid
on every one.

## Step 1: Extract the intent

From the user's description, and from the conversation itself if they
said "turn THIS into a skill" (mine the thread for the workflow, the
corrections they made, the output format they accepted), establish:

1. What behavior should the skill produce?
2. When should it fire: what would the user type?
3. When must it NOT fire: the near-miss cases?
4. What does a good output look like: is there a fixed format?
5. Does anything need to be deterministic (a script) rather than
   generated fresh each time?

Ask only for what's genuinely missing, 3-5 questions at most. The
questions about anti-triggers (#3) and output format (#4) are the ones
users never volunteer and always have opinions about.

## Step 2: Write the frontmatter

**Name**: lowercase, hyphens, max 64 chars, matching the folder name.
Verb phrases or clear nouns: `fact-checker`, `grill-me`, not
`my-cool-skill-v2`.

**Description**: this is the skill's entire interface for triggering.
Claude sees only the name + description when deciding whether to load
the skill, choosing among potentially 100+ of them. Build it from four
parts, in this order:

1. What it does, one sentence, concrete active verbs, third person.
2. Trigger contexts, written pushy, because Claude under-triggers
   skills by default: "Use this skill whenever the user mentions X, Y,
   asks to Z, or [implicit situation], even if they don't explicitly
   say [keyword]."
3. Proactive cases if any: "ALSO use when..." for situations where the
   user won't ask but the skill should apply.
4. Exclusions: "Do NOT use for..." naming the tempting near-misses.
   Over-triggering is what makes users uninstall skills, so the
   exclusions earn their space.

Keep it under 1024 characters. **Always write it as a YAML block scalar
(`description: >-`)**: a plain unquoted description containing a colon
followed by a space breaks YAML parsing, and this is the single most
common packaging failure.

## Step 3: Write the body

Target under 500 lines; under 150 is typical for behavior skills. Use
imperative voice. Structure:

```markdown
# Skill Name

[Opening: 1 short paragraph on WHY this skill exists — what failure
it prevents. This paragraph does real work: it's the rubric Claude
uses for every edge case the rest of the file doesn't cover.]

## Core rule
[The one non-negotiable, if there is one, stated plainly.]

## Workflow
[Numbered steps in execution order. For each step that could be done
lazily or wrongly, attach the reason it matters.]

## Output format
[If output has a fixed shape, show the exact template in a fenced
block. "Use this exact structure" + template beats paragraphs of
format description.]

## Calibration / When NOT to apply
[Both failure directions: what under-use looks like, what over-use
looks like, and which is worse for this skill. A rough threshold.]

## Example
[At least one realistic worked example: plausible messy input, the
skill's actual output. Examples anchor the abstractions.]
```
