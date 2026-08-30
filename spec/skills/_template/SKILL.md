---
name: skill-name
description: A clear, trigger-optimized sentence describing what this skill does and when to invoke it.
---

# skill-name

## 0. Identity

- **Role:** [Defines the file's responsibility and scope]
- **Authority:** [Normative tier level and ownership boundaries]
- **Must not define:** [Clear boundaries of what this file does not own]
- **Normative base:** `core/decision-framework.md`

---

## 1. Intent (9 Dimensions)

| Dimension           | Specification |
| ------------------- | ------------- |
| Task Domain         | [Domain]      |
| Execution Level     | [Level]       |
| Input Format        | [Format]      |
| Output Format       | [Format]      |
| Constraints         | [Constraints] |
| Validation          | [Validation]  |
| Tone & Style        | [Style]       |
| Fallback Strategy   | [Fallback]    |
| Escalation Criteria | [Criteria]    |

---

## 2. Trigger Matrix

| Scenario     | Decision | Action      |
| ------------ | -------- | ----------- |
| [Scenario 1] | YES      | [Action]    |
| [Scenario 2] | NO       | [Exclusion] |

---

## 3. Execution Workflow

### Step 1: Initialization

- **Action:** Read configuration and inputs.
- **Input:** Task prompt and parameters.
- **Stop Condition:** Inputs validated.
- **Validation:** Confirm required fields are present.

### Step 2: Processing

- **Action:** Execute core skill logic.
- **Input:** Validated parameters.
- **Stop Condition:** Deliverable generated.
- **Validation:** Check output against schema.

---

## 4. Output Specification

- Deliverable format details.

---

## 5. Validation Gate

- [ ] All inputs validated
- [ ] Logic executed without side-effects
- [ ] Deliverable conforms to specification

---

## 6. Anti-Triggers

- Do NOT execute when input is incomplete.

---

## 7. Anti-Pattern Compliance

| Anti-Pattern | Prevention Mechanism |
| ------------ | -------------------- |
| AP-1         | Validated inputs     |

---

## 8. Versioning

- **v1.0.0** (2026-08-14): Initial enterprise template creation.

---

## 9. Portability Matrix

| Runtime | Status |
| ------- | ------ |
| All     | Passed |
