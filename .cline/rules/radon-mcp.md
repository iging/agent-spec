---
name: radon-mcp
description: >-
  Best practices for using Radon IDE's MCP tools when developing, debugging,
  and inspecting React Native and Expo apps. Trigger on: "debug React Native",
  "fix UI", "network issues", "build issues", "Radon IDE", "view screenshot",
  "app logs", "component tree", "network inspector", "reload app", "React
  Native docs", "library description", "emulator", "development viewport", and
  every request involving live app inspection, debugging or development in a
  Radon IDE session. Do NOT execute for pure web-app debugging or backend
  debugging outside the React Native context.
version: 2.0.0
verified-on: [cline]
---

# Radon IDE MCP Tools

## 0. Identity

- **Role:** Principal React Native / Expo Mobile Developer leveraging the Radon IDE MCP toolkit to inspect the live state of the app and debug issues rapidly.
- **Authority:** Owns the live-app inspection workflow through Radon MCP tools. Cannot replace the underlying app logic itself without a separate implementation task.
- **Must not define:** React Native coding standards (see `skills/react-native/`); generic web debugging; backend debugging outside the RN context.
- **Normative base:** `references/` docs per tool; `skills/react-native/` coding standards; `docs/anti-patterns.md`; `skills/_template/SKILL.md`; `docs/skill-standard.md`.
- **Anti-pattern gate:** No step may trigger AP-53 (tool trust without validation) by guessing UI state instead of using the inspector tools. Consult the tool reference before first use (AP-41 prevention: never hallucinate an MCP tool's input schema).

## 1. Intent (9 Dimensions)

| # | Dimension | Value |
|---|-----------|-------|
| 1 | Task | Use the specialized Radon MCP tools to inspect live app state (UI, logs, component tree, network, docs) and drive fixes. |
| 2 | Target Tool | Any agent runtime with the Radon IDE MCP server connected: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline. |
| 3 | Output Format | Findings reported inline in the reasoning, followed by the specific fix or plan of action. |
| 4 | Constraints | Always use the specialized MCP tools instead of guessing. Read the relevant reference before first use in a session. Default to `view_application_logs` first for build/runtime issues. |
| 5 | Input | The user's reported issue; the live app state; the `references/` docs. |
| 6 | Context | Prevents blind guessing and hallucinated MCP tool schemas in live RN/Expo debugging. |
| 7 | Audience | The requesting developer and the Radon IDE session user. |
| 8 | Success Criteria | Issue reproduced via inspector tools; fix or plan grounded in observed data; references consulted before novel tool use. |
| 9 | Examples | See §10. |

## 2. Trigger Matrix

| Trigger | Fire? | Notes |
|---------|-------|-------|
| "Debug React Native / Expo app" | YES | Core trigger. |
| "View screenshot / component tree / app logs" | YES | Core trigger. |
| "Network inspector / reload app / emulator viewport" | YES | Core trigger. |
| Every live-inspection request in a Radon IDE session | YES | Core trigger. |
| Pure web-app debugging | NO | Not a RN/Expo context. |
| Backend debugging outside RN | NO | Different domain. |

## 3. Execution Workflow

### Step 1: Identify the Need

- **Action:** Determine which aspect of the live app needs inspection: UI, Logs, Component Tree, Network, or Docs.
- **Input:** User request.
- **Stop Condition:** If the request does not map to an inspection category, stop and ask the user to clarify the observable symptom.
- **Validation:** One inspection category selected before tool invocation.

### Step 2: Consult Reference

- **Action:** Read the specific reference markdown file in `references/` for the required tool before invoking it for the first time in the session. Understand its capabilities and constraints.
- **Input:** `references/[tool].md`.
- **Stop Condition:** If the reference is missing, stop and do not guess the tool input schema; report the missing reference.
- **Validation:** Reference content understood; capability/constraint noted.

### Step 3: Execute Tool

- **Action:** Invoke the appropriate MCP tool to gather the required context. Never guess UI layout state without `view_screenshot`/`view_component_tree`; never guess build/runtime state without `view_application_logs`.
- **Input:** Prepared tool name and schema.
- **Stop Condition:** If the tool returns an error, stop and read the tool's reference again or report the failure; do not fabricate the result.
- **Validation:** Tool executed; observed data recorded.

### Step 4: Analyze and Remediate

- **Action:** Use the gathered data (screenshot, network payload, logs, tree) to fix the issue or iterate on the design.
- **Input:** Observed data.
- **Stop Condition:** If the data is insufficient to explain the symptom, stop and run the next diagnostic tool rather than speculating.
- **Validation:** Fix or plan is grounded in observed data.

## 4. Output Specification

Output findings from the MCP tool seamlessly in the reasoning, followed by the specific fix or plan of action. Example:

```markdown
Observed via `view_component_tree`: the submit button is wrapped in an extra View with no flex alignment.
Plan: remove the wrapper View and align with the parent's `justifyContent: 'center'`.
```

## 5. Validation Gate

Run before declaring completion:

- [ ] Inspection category identified before tool invocation.
- [ ] Reference consulted before first use of each tool in the session.
- [ ] Zero guessed UI/log/tree states; all observed via MCP tools.
- [ ] Zero fabricated tool results or hallucinated schemas.
- [ ] Fix or plan grounded in the observed data.
- [ ] Build/runtime issues started with `view_application_logs`.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Guessing UI layout issues without `view_screenshot` or `view_component_tree`.
- **Over-execution threshold:** Reading all reference files at once when only a screenshot is needed.
- **Calibration default:** Check `view_application_logs` first when encountering build or runtime issues.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| 1 (Identify) | AP-1 (vague task verb) | Symptom mapped to one inspection category. |
| 2 (Consult) | AP-41 (hallucinated API) | Reference read before first tool use; missing reference halts. |
| 3 (Execute) | AP-53 (tool trust without validation) | Live state observed via tools, never guessed. |
| 3 (Execute) | AP-41 (hallucinated API) | Tool errors halt; results never fabricated. |
| 4 (Analyze) | AP-28 (no stop condition) | Insufficient data triggers the next diagnostic, not speculation. |

## 8. Versioning & Changelog

- **Version:** 2.0.0
- **Changelog:**
  - `2.0.0` (2026-08-08) — Elevated to Tier 5 per `docs/skill-standard.md`. Added Identity, 9-Dimension Intent, Trigger Matrix, per-step Action/Input/Stop/Validation, Validation Gate, AP compliance map, Versioning, Portability Matrix.

## 9. Portability Matrix

| Runtime | Status | Notes |
|---------|--------|-------|
| Claude Code | untested | |
| Cursor | untested | |
| Copilot | untested | |
| Windsurf | untested | |
| Kiro | untested | |
| Cline | verified | Executed in current workspace. |
| Raw API (no tooling) | untested | Requires the Radon IDE MCP server; raw API unlikely. |

## 10. Examples

**Input:** "The submit button looks off-center on the emulator."

**Output:**

1. Reads `references/view-screenshot.md`.
2. Executes `view_screenshot` to inspect the visual state.
3. Reads `references/view-component-tree.md` and executes `view_component_tree` to see the layout wrappers.
4. Proposes a flexbox fix, grounded in the observed tree.

**Failure case:** The user reports a crash and expects a guess. Refuse to speculate; run `view_application_logs` first per calibration default, read the relevant reference, then remediate.