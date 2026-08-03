# Prompt Audit Framework

## The 10-Point Quality Rubric

Score each dimension 1–5 stars:

| #   | Dimension                  | What 5 Stars Looks Like                                                       | What 1 Star Looks Like                                                                       |
| --- | -------------------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| 1   | **Role Clarity**           | Role is specific, specialized, and appropriately scoped                       | Missing, vague ("Act as an AI"), or overpowered ("Act as everything")                        |
| 2   | **Objective Precision**    | Binary success criteria, measurable outcome                                   | "Make it good", no success criteria                                                          |
| 3   | **Input Specification**    | Required vs. optional inputs defined, formats specified                       | No input section, or assumes the AI magically knows what to work with                        |
| 4   | **Output Specification**   | Exact format, structure, length, and template provided                        | "Output the result" with no shape defined                                                    |
| 5   | **Constraints & Rules**    | Hard constraints separated from guidelines, edge cases covered                | No rules section, or rules mixed into prose                                                  |
| 6   | **Anti-Pattern Clearance** | Avoids all credit-killing patterns                                            | Contains vague verbs, missing context, implicit formats, unlocked scope                      |
| 7   | **Reusability**            | Works standalone when copied into another project, no hidden dependencies     | References files that don't exist, assumes repo-specific context                             |
| 8   | **Structural Consistency** | Follows the same section order and heading conventions as sibling files       | Completely different structure from every other file in its folder                           |
| 9   | **Completeness**           | All expected sections present for this file type                              | Missing critical sections (e.g., a skill without a Workflow, a prompt without Output Format) |
| 10  | **Authorship Neutrality**  | Fully generic — no traces of an original creator's personal brand or identity | Contains hardcoded names, personal URLs, creator-specific examples, or third-party voice     |

## File-Type-Specific Checks

**For Prompts:** Needs Role, Objective, Input, Output Format, Rules, and "What This Prompt Does NOT Cover".
**For Skills:** Needs YAML frontmatter, Core Rule, Workflow, Output Format, Calibration, and Example sections. Must match standard Tier-4 structure.
**For Core Spec Files:** Needs Role/Authority header, accurate cross-references, no scope bleed.

## Creator Remnant Scan

Scan every file for these creator remnants and neutralize them:
- **Hardcoded names** (e.g., "Created by @johndoe") -> Replace with generic placeholders or remove.
- **Personal URLs** -> Replace with generic domains or `[your-url]`.
- **Creator-specific examples** (e.g., "For my client Acme...") -> Generalize.
- **First-person voice** -> Switch to second-person imperative.
- **Branding language** -> Remove trademarked or marketing phrases.

## Cross-File Analysis

- **Duplicate Content:** Identify rules, output formats, or tool notes repeated across files. Propose extracting them to `shared/`.
- **Missing Shared References:** Identify knowledge that should exist globally but doesn't yet.
- **Structural Inconsistencies:** Flag files breaking conventions.
- **Cross-Reference Integrity:** Verify internal file links resolve.
