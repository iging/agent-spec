---
name: spec-reviewer
description: >-
  Audit, sanitize, refactor, and elevate third-party or reverse-engineered
  prompts and skills into original, Tier-5 enterprise specifications per
  docs/skill-standard.md. Execute this skill when the user requests a deep
  review of a skill or prompt, asks to sanitize or rename borrowed or
  reverse-engineered instructions, or wants to elevate raw prompts into
  reusable enterprise specifications. Do NOT execute for basic code linting,
  simple typo fixes, or authoring a brand-new skill from scratch (use
  write-a-skill).
version: 2.0.0
verified-on: [cline]
---

# Specification Reviewer and Enterprise Elevate

## 0. Identity

- **Role:** Elevation execution engine. Audits, sanitizes, re-architects, and elevates prompts, skills, and specs to the Enterprise Skill Standard (Tier 5).
- **Authority:** Normative for elevation execution. Owns the rewrite procedure.
- **Must not define:** The standard itself (`docs/skill-standard.md` owns that). New-skill authoring from scratch (`write-a-skill` owns that). IDE loading behavior (`runtime/` owns that).
- **Normative base:** `docs/skill-standard.md`; `docs/anti-patterns.md`; `skills/_template/SKILL.md`; `shared/writing/writing-rules.md`; local `references/anti-patterns.md` + `references/writing-rules.md`.
- **Anti-pattern gate:** This skill must never encode anti-patterns AP-1–AP-56. Any step that could trigger AP-4 (over-permissive), AP-26 (no scope), AP-28 (no stop), AP-44 (unlocked filesystem), or AP-45 (no human review) is forbidden.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                                                                                      |
| --- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Task             | Audit a target prompt/skill/spec and elevate it to a Tier-5 enterprise specification per `docs/skill-standard.md`.                                         |
| 2   | Target Tool      | Any agent runtime reading markdown skills: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API.                                                   |
| 3   | Output Format    | A Specification Transformation Audit report + a rewritten `SKILL.md` (+ `references/` files for complex domains).                                          |
| 4   | Constraints      | Only edit the designated target path. Never alter the technical objective. Never preserve third-party fingerprints. Bind every step to the normative base. |
| 5   | Input            | The user's target skill/prompt/spec, the designated output path, and the authoritative gates (anti-patterns, writing rules).                               |
| 6   | Context          | Prevents credit-killing anti-patterns and provenance/plagiarism risk from propagating into the skill pool.                                                 |
| 7   | Audience         | The elevating agent (executing this skill) and any downstream agent that consumes the elevated skill.                                                      |
| 8   | Success Criteria | All 10 requirements of `docs/skill-standard.md` §2 verified pass; AP compliance table complete; no third-party fingerprints remain.                        |
| 9   | Examples         | See §10.                                                                                                                                                   |

## 2. Trigger Matrix

| Trigger                                                       | Fire? | Notes                         |
| ------------------------------------------------------------- | ----- | ----------------------------- |
| "Deep review / audit this skill or prompt"                    | YES   | Core trigger.                 |
| "Sanitize or rename borrowed/reverse-engineered instructions" | YES   | Core trigger.                 |
| "Make this enterprise-grade / omnipotent / Tier-5"            | YES   | Core trigger.                 |
| Basic code linting or simple typo fixes                       | NO    | Not a specification task.     |
| "Write a brand-new skill"                                     | NO    | Route to `write-a-skill`.     |
| One-off task instruction (non-reusable)                       | NO    | Not reusable; do not elevate. |

## 3. Execution Workflow

### Step 1: Audit Against the Standard

- **Action:** Run the target through the 10-requirement checklist in `docs/skill-standard.md` §2. Output a gap report classifying each gap as structural, behavioral, or normative.
- **Input:** Target file(s); `docs/skill-standard.md`.
- **Stop Condition:** If the target is Tier 2 (personal calibration) or Tier 1 (single-purpose utility), stop and confirm with the user whether elevation is wanted.
- **Validation:** Every requirement has an explicit PASS/FAIL recorded. No partial labels.

### Step 2: Origin Sanitization and De-Attribution

- **Action:** Scan the source for third-party brand names, author phrases, hardcoded URLs, and distinct naming conventions. Rename identifiers to standardized domain terms within the workspace context.
- **Input:** Target file(s).
- **Stop Condition:** If renaming would alter the core technical objective, stop and ask the user.
- **Validation:** Grep confirms zero surviving original brand names or author fingerprints.

### Step 3: Logic Extraction and Native Re-Implementation

- **Action:** Extract the underlying functional intent. Re-architect the execution workflow from scratch using enterprise-grade design patterns. Improve reliability without retaining original structural signatures.
- **Input:** Sanitized content.
- **Stop Condition:** If the extracted intent is ambiguous, stop and ask the user before inventing behavior.
- **Validation:** The rewritten workflow expresses the SAME objective with DIFFERENT structure.

### Step 4: Anti-Pattern Audit

- **Action:** Cross-reference the instruction payload against `references/anti-patterns.md`. Remediate every detected pattern. Flag by number (AP-N).
- **Input:** Rewritten content; `references/anti-patterns.md`.
- **Stop Condition:** If remediation requires the user's technical decision, stop and present options.
- **Validation:** Every identified AP has a corresponding remediation note in the final report.

### Step 5: Reusability and Parameterization

- **Action:** Convert hardcoded inputs into parametric slots. Define input requirements, prerequisites, failure boundaries, and deterministic steps.
- **Input:** Rewritten content.
- **Stop Condition:** None. Parameterization never changes the objective.
- **Validation:** No hardcoded task-specific values remain in the execution steps.

### Step 6: Reference Extraction and Progressive Loading

- **Action:** Audit file length and context footprint. Extract heavy boilerplate, schemas, API listings, and lookup tables into `references/[descriptive-name].md`. Keep `SKILL.md` under ~200 lines.
- **Input:** Rewritten content.
- **Stop Condition:** If the domain is simple (<200 lines), omit this step.
- **Validation:** `SKILL.md` is under ~200 lines and every reference path is resolvable.

### Step 7: Prose Purification

- **Action:** Enforce `shared/writing/writing-rules.md` + `references/writing-rules.md`. Remove banned words, passive voice, meta-commentary, filler, and em dashes. Preserve a Spartan, deterministic voice.
- **Input:** All draft files.
- **Stop Condition:** None.
- **Validation:** No banned words or em dashes present.

### Step 8: Assembly and Validation Gate

- **Action:** Render the specification to the designated path. Run §5 Validation Gate. Record the result in the changelog.
- **Input:** All draft files; designated output path.
- **Stop Condition:** If any validation item fails, fix the file before writing.
- **Validation:** All §5 items pass; file written; changelog updated.

## 4. Output Specification

```markdown
# Specification Transformation Audit

- **Target Identifier:** [Elevated Skill Name]
- **Original Source Status:** Sanitized and Re-Architected
- **Anti-Patterns Resolved:** [AP numbers]
- **Tier:** 5 (Enterprise) — all requirements verified
- **Reusability Rating:** Production Grade / Modular

---

[Elevated SKILL.md content — conforms to skills/_template/SKILL.md]
```

## 5. Validation Gate

Run before declaring completion. All items must pass:

- [ ] All 10 requirements from `docs/skill-standard.md` §2 verified PASS.
- [ ] Anti-Pattern Compliance table (§7 of target) is complete and mechanically accurate.
- [ ] No third-party names, URLs, or author fingerprints survive.
- [ ] Every `references/` path resolves.
- [ ] `SKILL.md` is under ~200 lines.
- [ ] Changelog updated with version + date.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Superficial copy-editing that leaves third-party names, fingerprints, or anti-patterns intact.
- **Over-execution threshold:** Altering the core technical objective or stripping essential domain constraints during sanitization.
- **Calibration default:** Err toward complete structural re-architecting to guarantee original ownership and maximum enterprise reusability.

## 7. Anti-Pattern Compliance

| Step             | Prevents AP                            | Mechanism                                                                            |
| ---------------- | -------------------------------------- | ------------------------------------------------------------------------------------ |
| 1 (Audit)        | AP-3 (no success criteria)             | Gap report defines explicit pass criteria per requirement.                           |
| 2 (Sanitize)     | AP-11, AP-12 (forgotten/no context)    | De-attribution removes borrowed context.                                             |
| 3 (Re-implement) | AP-6 (build-the-whole-thing)           | Extraction scopes to functional intent, not whole sources.                           |
| 4 (AP audit)     | AP-1, AP-4, AP-26                      | Remediation step explicitly flags vague verbs, permissive scope, missing boundaries. |
| 5 (Parameterize) | AP-29, AP-42 (no target state)         | Parametric slots + defined prerequisites.                                            |
| 6 (References)   | AP-16, AP-31 (context dumping)         | Progressive loading caps SKILL.md size.                                              |
| 8 (Assembly)     | AP-28, AP-52 (no stop/circuit breaker) | Validation gate halts before write on failure.                                       |

## 8. Versioning & Changelog

- **Version:** 2.0.0
- **Changelog:**
  - `2.0.0` (2026-08-08) — Elevated to Tier 5 per `docs/skill-standard.md`. Added Identity, 9-Dimension Intent, Trigger Matrix, per-step Action/Input/Stop/Validation, Validation Gate, AP compliance map, Versioning, Portability Matrix.

## 9. Portability Matrix

| Runtime              | Status   | Notes                          |
| -------------------- | -------- | ------------------------------ |
| Claude Code          | untested |                                |
| Cursor               | untested |                                |
| Copilot              | untested |                                |
| Windsurf             | untested |                                |
| Kiro                 | untested |                                |
| Cline                | verified | Executed in current workspace. |
| Raw API (no tooling) | untested |                                |

## 10. Examples

**Input:** "I reverse-engineered `super-coder-v3` from another repo. Review it, rename the files, and elevate it into an enterprise skill."

**Output:** Specification Transformation Audit (per §4) + a Tier-5 `SKILL.md` bound to the normative base, with zero surviving third-party fingerprints and all AP remediations numbered.

**Failure case:** If the user wants to elevate a personal-calibration skill (Tier 2) but ALSO wants its personal voice preserved — refuse to genericize the voice and instead keep personal data as explicit configuration per `docs/skill-standard.md` §3.
