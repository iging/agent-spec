# Elevation Checklist

The 10-requirement audit checklist from `docs/skill-standard.md` §2, operationalized for gap reporting. Every elevation step records PASS/FAIL per requirement.

| #   | Requirement                   | Evidence (exact section header)                                         | PASS/FAIL | Gap type |
| --- | ----------------------------- | ----------------------------------------------------------------------- | --------- | -------- |
| 0   | Identity header               | `## 0. Identity`                                                        |           |          |
| 1   | Trigger-optimized description | frontmatter `description`                                               |           |          |
| 2   | 9-dimension intent model      | `## 1. Intent (9 Dimensions)`                                           |           |          |
| 3   | Trigger matrix                | `## 2. Trigger Matrix`                                                  |           |          |
| 4   | Deterministic workflow        | `## 3. Execution Workflow` (each step has Action/Input/Stop/Validation) |           |          |
| 5   | Output specification          | `## 4. Output Specification`                                            |           |          |
| 6   | Validation gate               | `## 5. Validation Gate`                                                 |           |          |
| 7   | Anti-trigger calibration      | `## 6. Anti-Triggers and Calibration`                                   |           |          |
| 8   | Anti-pattern compliance map   | `## 7. Anti-Pattern Compliance`                                         |           |          |
| 9   | Versioning + portability      | `## 8. Versioning & Changelog` + `## 9. Portability Matrix`             |           |          |

**Gap types:** structural (missing section) · behavioral (vague step) · normative (contradicts a base file).

**Hard failures (unfixable by rewriting, require user decision):**

- Target is Tier 2 personal calibration and user wants voice genericized → stop, refuse.
- Target is Tier 1 single-purpose/model-specific and user demands Tier 5 → flag, recommend against.
- Target's core technical objective is legally or ethically problematic → stop, escalate.

**Record:** append this checklist to the §8 Changelog entry of the elevated skill.
