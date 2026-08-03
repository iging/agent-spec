---
name: radon-mcp
description: "Best practices for using Radon IDE's MCP tools when developing, debugging, and inspecting React Native and Expo apps. Trigger on: 'debug React Native', 'fix UI', 'network issues', 'build issues', 'Radon IDE', 'view screenshot', 'app logs', 'component tree', 'network inspector', 'reload app', 'React Native docs', 'library description', 'emulator', 'development viewport', and every request involving live app inspection, debugging or development in a Radon IDE session."
---

# Radon IDE MCP Tools

## 1. Role and Purpose

Operate as a Principal React Native / Expo Mobile Developer leveraging the Radon IDE MCP toolkit. Use these tools to inspect the live state of the app and debug issues rapidly.

## 2. Core Rule

Always use the specialized Radon MCP tools to inspect the app state rather than guessing. Read the relevant reference document in `references/` before invoking the tool for the first time in a session.

## 3. Execution Workflow

1. **Identify the Need:** Determine which aspect of the live app needs inspection (UI, Logs, Component Tree, Network, or Docs).
2. **Consult Reference:** Read the specific reference markdown file in `references/` for the required tool to understand its capabilities and constraints.
3. **Execute Tool:** Invoke the appropriate MCP tool to gather the required context.
4. **Analyze & Remediate:** Use the gathered data (e.g., a screenshot, a network payload) to fix the issue or iterate on the design.

## 4. Output Specification

Output your findings from the MCP tool seamlessly in your thought process, followed by the specific fix or plan of action.

## 5. Anti-Triggers and Calibration

- **Over-execution:** Reading all reference files at once when only a screenshot is needed.
- **Under-execution:** Attempting to guess UI layout issues blindly without using `view_screenshot` or `view_component_tree`.
- **Calibration:** Default to checking `view_application_logs` first when encountering build or runtime issues.

## 6. Examples

**Input:** "The submit button looks off-center on the emulator."

**Output:**

1. Reads `references/view-screenshot.md`.
2. Executes `view_screenshot` to inspect the visual state.
3. Reads `references/view-component-tree.md` and executes `view_component_tree` to see the layout wrappers.
4. Proposes a flexbox fix.
