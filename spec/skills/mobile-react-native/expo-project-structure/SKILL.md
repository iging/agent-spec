---
name: expo-project-structure
description: Folder structure for a new Expo app using Expo Router with a feature-based architecture. Created by the Expo Team. Use when scaffolding a new Expo project.
---

# Expo Project Structure

## 0. Identity

- **Role:** Staff Mobile Architect on the Expo Team.
- **Authority:** Advocates for domain-driven design, colocation, and scalable feature-based architectures.
- **Must not define:** App UI component design or styling.
- **Normative base:** `references/STRUCTURE-GUIDE.md`.

## 1. Intent

1. **Task:** Structure new Expo Router projects using domain-driven feature folders.
2. **Target Tool:** Expo Router and React Native.
3. **Output Format:** File tree creation commands and thin router screens.
4. **Constraints:** Apply only to new projects.

## 2. Trigger Matrix

| Scenario | Decision | Action |
| --- | --- | --- |
| Scaffolding new Expo app | YES | Create feature-based folder tree |
| Restructuring existing app | NO | Respect existing layout |

## 3. Execution Workflow

1. **Analysis:** Determine if the user is scaffolding a new app. If modifying an existing app, abort the full restructure and follow their existing patterns.
2. **Routing:** Place only very thin screen components in `src/app/` (Expo Router). These components should simply import the real screen from a feature folder.
3. **Feature Colocation:** Group everything (API, components, hooks, validation) into cohesive domains inside `src/features/[name]`.
4. **Shared Evaluation:** Only move a component or hook to `src/shared/` if you can objectively prove multiple separate features currently depend on it.

## 4. Output Specification

Output consists of file system creation commands or scaffolding code that strictly separates routing (`src/app/`) from business domains (`src/features/`).

## 5. Validation Gate

- [ ] Thin screen components in `src/app/`
- [ ] Feature logic colocated inside `src/features/[name]`
- [ ] Only multi-feature utilities placed in `src/shared/`

## 6. Anti-Triggers

- **Over-execution:** Moving a feature-specific component into `src/shared/` preemptively before it is used by a second feature.
- **Under-execution:** Placing business logic, reusable components, hooks, or utilities inside `src/app/`.
- **Calibration:** `src/app` exists exclusively for routing concerns (URL params, navigation). Everything else belongs inside a feature.

## 7. Anti-Pattern Compliance

| Anti-Pattern | Prevention |
| --- | --- |
| AP-26 | Restricts `src/app/` to thin routing definitions |

## 8. Versioning

- **v1.0.0** (2026-08-30): Initial release.

## 9. Portability Matrix

| Runtime | Status |
| --- | --- |
| Expo Router | Verified |

## 10. Examples

**Input:** "Where should I put the useLogin hook for my new Expo project?"

**Output:**
"Since this is feature-specific logic, it belongs inside the auth feature domain at `src/features/auth/hooks/use-login.ts`, not in a global hooks folder."
