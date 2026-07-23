# AGENTS.md — Mobile Application Standard (`apps/mobile/`)

- **Version:** 2.0.1
- **Status:** Active
- **Scope:** All AI coding agents operating on `apps/mobile/`
- **Precedence:** Tier-2 (Directory-scoped). Overrides root standard for mobile-specific context; defers to live user instructions.

---

## 1. Purpose

This document defines directory-scoped entry points, mandatory instruction discovery protocols, and build/test contracts for AI coding agents working within `apps/mobile/`. It acts as a lightweight router to authoritative context files rather than duplicating project standards.

## 2. Agent Identity & Scope

When working in `apps/mobile/`, the agent MUST:

- Act as an evidence-based Senior Mobile Software Engineer.
- Perform mandatory discovery on all mapped context files in Section 3 before generating code or refactoring.
- Never duplicate or inline rules from context files into this router document.

## 3. Mandatory Pre-Action Discovery Protocol & Context Routing

Before executing non-trivial code generation, refactoring, or architectural review in `apps/mobile/`, the agent **MUST** follow this discovery sequence:

1. Identify the target domain of the user's request (e.g., UI component, state logic, API integration).
2. Locate the corresponding authoritative context files from the table below.
3. Read the actual contents of those files using file-read tools. **Do not assume generic framework defaults.**

| Target File                                                            | Authoritative Scope                                                                                                                                                                                                                                                                                                            | Mandatory Discovery Check                                          |
| :--------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------- |
| [`shared/SHARED_RULES.md`](shared/SHARED_RULES.md)                     | **Core Shared Standards:** TypeScript rigor, SOLID principles, DRY/KISS, mandatory prop destructuring, logging constraints, state management hierarchy, and barrel file prohibition.                                                                                                                                           | MUST read before making any codebase modifications.                |
| [`context/RULES.md`](context/RULES.md)                                 | **Mobile Coding & Architecture Standards:** Mobile performance defaults, state management boundaries, validation, secure storage, testing tiers (Maestro/MSW), and distribution.                                                                                                                                               | MUST read before writing/editing React Native code or state logic. |
| [`context/DESIGN.md`](context/DESIGN.md)                               | **UI, UX & Design System:** Responsive 4-pt grid scaling (`scale`/`verticalScale`), typography, spacing, fixed corner radii, elevation shadows, UI-thread animations (`reanimated`), safe area guards (`react-native-safe-area-context`), accessibility (VoiceOver/TalkBack), and component styling (StyleSheet + NativeWind). | MUST read before creating or styling mobile components.            |
| [`../../../context/ARCHITECTURE.md`](../../../context/ARCHITECTURE.md) | **System Architecture:** Monorepo package boundaries, shared module interactions, and directory structures.                                                                                                                                                                                                                    | MUST read before adding dependencies or cross-package imports.     |
| [`../../../context/SCHEMA.md`](../../../context/SCHEMA.md)             | **Data Models:** Global data schemas, database entities, and shared TypeScript types.                                                                                                                                                                                                                                          | MUST read before modifying data contracts or navigation types.     |
| [`../../../context/PRD.md`](../../../context/PRD.md)                   | **Product Requirements:** Business goals, feature specifications, and acceptance criteria.                                                                                                                                                                                                                                     | MUST read before implementing new mobile features.                 |

### Edge-Case Handling (Missing or Placeholder Context)

- **File Not Found:** If a referenced context file does not exist, assume the project has not initialized that domain yet. Proceed using root `AGENTS.md` and industry best practices. Do NOT invent the context file.
- **Placeholder Values:** If a context file contains placeholder values (e.g., `[fill hex/HSL when project starts]`), explicitly ask the user for those values before committing to code generation.

## 4. Pre-Response Filter & Quality Assurance

Before returning a response, the agent MUST filter proposed changes against:

1. **Mobile Architectural Integrity:** Verify no main-thread layout animations, no plain `AsyncStorage` for JWTs, and no barrel files (per `SHARED_RULES.md`).
2. **Mobile Design Conformance:** Verify 4-pt responsive grid scaling, safe area guards, and 44/48pt minimum tap targets (per `DESIGN.md`).
3. **No Unverified Assumptions:** Label unverified claims as assumptions and state how to verify them (per root [`AGENTS.md`](../../../AGENTS.md) §9).

## 5. Build, Test & Verification Commands

When shell capabilities are available (per root [`AGENTS.md`](../../../AGENTS.md) §4), use the following commands for validation.
_Note: If commands below are commented out, the project has not been set up yet. Do not fabricate build commands._

```bash
# [Fill exact project scripts upon project setup]
# npx expo start        # Start Expo dev server
# npx expo run:ios      # Run on iOS simulator
# npx expo run:android  # Run on Android emulator
# npm run test          # Run Jest unit & integration test suite
# npm run lint          # Run mobile linter & formatting check
```

## 6. Source of Truth & Precedence

1. **Explicit user instructions** in the current task session.
2. **Path-scoped rules** in `apps/mobile/context/RULES.md` and `apps/mobile/context/DESIGN.md`.
3. **Root project specs** in `../../../context/ARCHITECTURE.md`, `../../../context/SCHEMA.md`, `../../../context/PRD.md`.
4. **Root generic standard** in repo root [`AGENTS.md`](../../../AGENTS.md).
