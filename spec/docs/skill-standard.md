# Enterprise Skill Standard

_Last updated: 2026-08-08 · v1.0.0_

The canonical yardstick for elevating skills to enterprise, production-grade, cross-agent quality. Every skill in `skills/` must conform to this standard. `skills/_template/SKILL.md` is the executable embodiment of this document.

---

## 1. Role / Authority

- **Role:** Defines the minimum structural and behavioral requirements for every skill in this repository, and the repeatable pipeline for elevating skills to compliance.
- **Authority:** Normative for all `skills/` content. Supersedes ad-hoc skill formats.
- **Must not define:** Application code standards (see `shared/`). IDE loading behavior (see `runtime/`). Project-specific rules (see project `context/`).

---

## 2. Definition: Enterprise-Grade Skill

A skill is enterprise-grade if and only if it satisfies all nine requirements:

| #   | Requirement                          | Evidence in file                                                                            |
| --- | ------------------------------------ | ------------------------------------------------------------------------------------------- |
| 0   | **Identity header**                  | `## 0. Identity` with Role, Authority, Must-not-define, Normative base, Anti-pattern gate   |
| 1   | **Trigger-optimized description**    | Frontmatter `description` with concrete active-verb sentence + explicit exclusions          |
| 2   | **9-dimension intent model**         | `## 1. Intent (9 Dimensions)` table per `prompts/dev-workflow/agent-config-generator.md` §2 |
| 3   | **Trigger matrix**                   | `## 2. Trigger Matrix` table with explicit YES/NO decisions                                 |
| 4   | **Deterministic execution workflow** | `## 3. Execution Workflow` — every step has Action, Input, Stop Condition, Validation       |
| 5   | **Output specification**             | `## 4. Output Specification` — exact deliverable shape                                      |
| 6   | **Validation gate**                  | `## 5. Validation Gate` — deterministic checklist run before completion                     |
| 7   | **Anti-trigger calibration**         | `## 6. Anti-Triggers and Calibration` — under/over-execution thresholds + default           |
| 8   | **Anti-pattern compliance map**      | `## 7. Anti-Pattern Compliance` table mapping steps to AP-1–AP-56 prevention                |
| 9   | **Versioning + portability**         | `## 8. Versioning & Changelog` + `## 9. Portability Matrix`                                 |

A skill that fails any requirement is **not enterprise-grade**. It is a draft.

---

## 3. Maturity Tiers

| Tier | Name                       | Definition                                                                                        | Copyable to consumer projects?                                       |
| ---- | -------------------------- | ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| 5    | **Enterprise**             | Passes all 9 requirements + has a `references/` dir for complex domains + verified in ≥3 runtimes | Yes, unmodified                                                      |
| 4    | **Production-adjacent**    | Passes requirements 0–7; missing versioning/portability or references                             | Yes, after minor audit                                               |
| 3    | **Structured draft**       | Follows old `_template` (Role, Core Rule, Workflow, Output, Anti-Triggers)                        | Audit first; likely needs elevation                                  |
| 2    | **Personal calibration**   | Deliberately personal (voice, ADHD, social-media-specific)                                        | Copy as-is; personal data must be explicit config, never genericized |
| 1    | **Single-purpose utility** | Model-specific or external-API-bound (`creative/48`, `fable-prompter`, `deck-builder`)            | Flag; usually not worth elevating                                    |

**Elevation target:** Tier 5 for all skills that serve multiple projects. Tier 2 is a _deliberate_ classification, not a failure.

---

## 4. Normative Base Rules

- Skills must reference the governing files that constrain their domain. Do not duplicate rules that live in `core/`, `shared/`, or project `context/` — reference them.
- A skill **must not** contradict its normative base. If a conflict exists, the normative base wins and the skill must be corrected.
- Complex domains (audits, architecture, multi-step reviews) **must** split supporting material into `references/` sub-files instead of inflating `SKILL.md` past ~200 lines.

---

## 5. The Elevation Pipeline

Every skill elevation runs through this deterministic sequence. No step may be skipped.

1. **Audit:** Run the target skill against the 9-requirement checklist (Section 2). Output a gap report.
2. **Gap analysis:** Classify each gap as structural (missing section), behavioral (vague step), or normative (contradicts a base file).
3. **Rewrite:** Rewrite `SKILL.md` against `skills/_template/SKILL.md`. Add `references/` for complex domains. Bind every step to its normative base.
4. **Anti-pattern check:** Scan the rewritten skill against `docs/anti-patterns.md`. Any step that could trigger AP-4, AP-26, AP-28, AP-44, or AP-45 is rejected.
5. **Audit-verify:** Re-run the 9-requirement checklist. All items must pass. Record the result in `## 8. Versioning & Changelog`.

**Pipeline tools:**

- Execution engine: `skills/dev-workflow/spec-reviewer`
- Validation gate: `skills/dev-workflow/prompt-auditor`
- Authoring binder: `skills/dev-workflow/write-a-skill`

---

## 6. Portability Matrix Standard

Every Tier 5 skill declares its verified runtimes in frontmatter (`verified-on:`) and in `## 9. Portability Matrix`.

Known runtime identifiers:

- `claude-code`
- `cursor`
- `copilot`
- `windsurf`
- `kiro`
- `cline`
- `raw-api` (no tooling — model-agnostic markdown consumption)

**Rules:**

- `verified` means the skill's instructions were executed successfully in that runtime at least once, with no structural adaptation.
- `adapted` means the skill required runtime-specific changes (record specifics in Notes).
- `untested` is the default. A skill with all-`untested` rows is **not** Tier 5.
- Runtime-specific loading behavior lives in `runtime/`, not in the skill.

## 7. Verification

To confirm a skill is Tier 5:

1. Fill a copy of `skills/_template/SKILL.md` with the skill's name.
2. Compare section-by-section against the skill. Every `[PLACEHOLDER]` must be resolved.
3. Run the 9-requirement checklist.
4. Confirm the Anti-Pattern Compliance table is complete and mechanically accurate.

If steps 2–4 fail, the skill is not enterprise-grade.

---

## 8. Versioning

- Each skill versions itself (per root `AGENTS.md`: "skills/ are independent modules; each skill versions itself").
- Version bumps: `major` = breaking behavioral change; `minor` = new capability; `patch` = clarification.
- Every change records a `Changelog` entry dated and versioned.
