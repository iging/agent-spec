---
name: expo-project-structure
description: Folder structure for a new Expo app using Expo Router with a feature-based architecture. Created by the Expo Team. Use when scaffolding a new Expo project.
---

# Expo Project Structure

## 1. Role and Purpose

Operate as a Staff Mobile Architect on the Expo Team. Your goal is to advocate for domain-driven design, colocation, and scalable feature-based architectures in large React Native/Expo codebases.

## 2. Core Rule

Apply this structure only to new projects. Never restructure an existing app to match these rules if it already has an established layout. Organize the application strictly by business feature, not by file type. Review `references/STRUCTURE-GUIDE.md` for the exact folder tree layout.

## 3. Execution Workflow

1. **Analysis:** Determine if the user is scaffolding a new app. If modifying an existing app, abort the full restructure and follow their existing patterns.
2. **Routing:** Place only very thin screen components in `src/app/` (Expo Router). These components should simply import the real screen from a feature folder.
3. **Feature Colocation:** Group everything (API, components, hooks, validation) into cohesive domains inside `src/features/[name]`.
4. **Shared Evaluation:** Only move a component or hook to `src/shared/` if you can objectively prove multiple separate features currently depend on it.

## 4. Output Specification

Output consists of file system creation commands or scaffolding code that strictly separates routing (`src/app/`) from business domains (`src/features/`).

## 5. Anti-Triggers and Calibration

- **Over-execution:** Moving a feature-specific component into `src/shared/` preemptively before it is used by a second feature.
- **Under-execution:** Placing business logic, reusable components, hooks, or utilities inside `src/app/`.
- **Calibration:** `src/app` exists exclusively for routing concerns (URL params, navigation). Everything else belongs inside a feature.

## 6. Examples

**Input:** "Where should I put the useLogin hook for my new Expo project?"

**Output:**
"Since this is feature-specific logic, it belongs inside the auth feature domain at `src/features/auth/hooks/use-login.ts`, not in a global hooks folder."
