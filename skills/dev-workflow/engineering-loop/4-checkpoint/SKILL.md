---
name: 4-checkpoint
description: >-
  Save essential context at the end of a session to context-checkpoint.md, or restore it at the start of a new session. Execute this at the boundary of every session to prevent context loss. Do NOT save secrets or sensitive tokens into the checkpoint file.
version: 1.0.0
verified-on: [cline]
---

# Context Checkpoint

## 0. Identity

- **Role:** Session Memory Manager. Compresses what matters from the current session into a lightweight, persistent state file, allowing the next session to resume without hallucination.
- **Authority:** Controls the save and restore process of `context-checkpoint.md`.
- **Must not define:** The underlying code. Must never save API keys, tokens, passwords, or secrets.
- **Normative base:** The current workspace state.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                |
| --- | ---------------- | -------------------------------------------------------------------- |
| 1   | Task             | Save or restore session state across context window boundaries.      |
| 2   | Target Tool      | Any agent runtime.                                                   |
| 3   | Output Format    | `context-checkpoint.md` file creation or read operation.             |
| 4   | Constraints      | Must proactively redact any sensitive secrets before saving to disk. |
| 5   | Input            | "save" or "restore" command.                                         |
| 6   | Context          | Bridges the gap of stateless AI sessions.                            |
| 7   | Audience         | The executing agent in a future session.                             |
| 8   | Success Criteria | Session is cleanly saved or accurately restored.                     |
| 9   | Examples         | See §10.                                                             |

## 2. Trigger Matrix

| Trigger                                        | Fire? | Notes                   |
| ---------------------------------------------- | ----- | ----------------------- |
| "Save checkpoint", "Run checkpoint save"       | YES   | Core save trigger.      |
| "Restore checkpoint", "Run checkpoint restore" | YES   | Core restore trigger.   |
| "Fix this bug"                                 | NO    | Not a context boundary. |

## 3. Execution Workflow

### Step 1: Mode Determination

- **Action:** Determine if the developer wants to save or restore. If omitted, ask.
- **Input:** User command.
- **Stop Condition:** Halt and ask if mode is ambiguous.
- **Validation:** Mode (save or restore) is confirmed.

### Step 2 (SAVE): State Extraction

- **Action:** Analyze the current session. Identify files modified, architectural decisions made, and the immediate next step. Extract this into a structured format.
- **Input:** Session history.
- **Stop Condition:** None.
- **Validation:** State represents the core progress.

### Step 3 (SAVE): Security Redaction

- **Action:** Scan the extracted state for API keys, tokens, or passwords. Replace them with `[REDACTED_SECRET]`.
- **Input:** Extracted state.
- **Stop Condition:** None.
- **Validation:** No secrets exist in the output buffer.

### Step 4 (SAVE): File Generation

- **Action:** Write the redacted state to `context-checkpoint.md`. Overwrite if confirmed by developer.
- **Input:** Redacted state.
- **Stop Condition:** Wait for overwrite confirmation if file exists.
- **Validation:** File is saved.

### Step 5 (RESTORE): State Rehydration

- **Action:** Read `context-checkpoint.md`. Output a summary of the restored state to the developer and ask for permission to continue the next task.
- **Input:** `context-checkpoint.md`.
- **Stop Condition:** Halt if file is missing. Wait for developer to confirm the restored state.
- **Validation:** State is loaded and confirmed.

## 4. Output Specification

```markdown
# Checkpoint

## Completed Work

- [List of files and changes]

## Locked Decisions

- [Key architectural or design choices made]

## Next Action

- [The immediate next step for the new session]

## Open Problems

- [Bugs or blockers left unresolved]
```

## 5. Validation Gate

- [ ] Mode (save/restore) was clearly executed.
- [ ] Security redaction pass was completed (no secrets saved).
- [ ] File was successfully written or read.
- [ ] Developer confirmed the save overwrite or the restore summary.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Failing to redact secrets before saving.
- **Over-execution threshold:** Saving entire file contents into the checkpoint instead of a concise summary.

## 7. Anti-Pattern Compliance

| Step | Prevents AP                 | Mechanism                                                              |
| ---- | --------------------------- | ---------------------------------------------------------------------- |
| 1    | AP-10 (assumed knowledge)   | Eliminates hallucinated continuity by enforcing explicit save/restore. |
| 2    | AP-16 (context dumping)     | Forces compression of session into key decisions.                      |
| 3    | AP-44 (unlocked filesystem) | Proactively protects secrets from being written to plain text context. |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0` — Initial enterprise tier implementation.

## 9. Portability Matrix

| Runtime | Status   |
| ------- | -------- |
| Cline   | verified |

## 10. Examples

**Input:** "Run checkpoint save."
**Output:** Agent summarizes the session, redacts a dummy database URL, and writes `context-checkpoint.md`.
