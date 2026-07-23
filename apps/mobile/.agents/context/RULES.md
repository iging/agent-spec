# RULES — Mobile App Coding Rules (React Native / Expo)

> **Purpose:** Specify mobile-specific coding rules, architecture guidelines, and design principles. Tier-3 rules for `apps/mobile/` aligned with Expo SDK & React Native 2026 performance & security best practices.
> **Note:** This file extends the shared rules found in `../shared/SHARED_RULES.md`.

_Last updated: 2026-07-23_

---

## 1. Core Language & Architecture Defaults

- **Read Shared Rules First:** All principles in `../shared/SHARED_RULES.md` (TypeScript strictness, naming, SOLID, DRY/KISS, barrel files, and function design) apply here.
- **Performance Engine Default:** Use the Hermes JavaScript engine for all production builds. _Rationale: It significantly reduces startup time, memory consumption, and bundle size compared to JSC._
- **App Startup Optimization:** Use `expo-splash-screen` to control splash screen hide timing cleanly after resources and fonts load, preventing white-screen flashes.
- **Type-Safe Navigation Architecture:** Centralize screen navigators inside `apps/mobile/src/navigation/` or Expo Router file routes (`app/`). Strictly define type-safe navigation parameters (`NativeStackScreenProps` / `RootStackParamList`).
- **Environment Configuration:** Use `expo-constants` (`import Constants from 'expo-constants'`) for accessing environment variables and app config metadata via `Constants.expoConfig?.extra`.
- **Cross-Platform File Extensions:** Maximize shared code, using `Platform.select()` for small tweaks and `.ios.ts`, `.android.ts`, `.web.ts` file extensions for platform-specific API implementations.
- **Absolute Imports:** Always use path aliases configured in `tsconfig.json` (e.g., `import Button from '@/components/Button'`) rather than long relative paths (`../../../components/Button`).

---

## 2. State Management Rules

- **State Boundaries & Categorization:**
  - **Local UI State (`useState` / `useReducer`):** Modals, toggles, form inputs. Keep local to component or custom hooks unless multiple non-nested screens require it. Never over-globalize transient UI state.
  - **Server Cache State (TanStack Query):** API data fetching, caching, loading/error states, and automatic retry backoffs. Keep server data strictly out of global client stores. Never use SWR or Apollo.
  - **Global Client State (Zustand):** Auth session, theme, cart, global user settings. Organize into modular domain slices (`features/auth/store`) rather than a single monolithic store. Never use Redux.
  - **Form State (React Hook Form + Zod):** Use React Hook Form for managing input lifecycle and Zod for schema validation. Never store form state in Zustand or TanStack.
  - **Route / Navigation State (Expo Router):** Screen params, deep link parameters, active tab selection. Handle URL search params using Expo Router hooks.
- **Selective Subscriptions & Selectors:** Always use fine-grained selectors (e.g., `useStore(state => state.property)`) to prevent unnecessary re-renders when unrelated store properties change.
- **No Derived State Duplication:** Never store values that can be calculated on the fly from existing state (e.g., compute `items.length` dynamically).
- **Immutability:** Always create new object/array references when updating state. Never mutate state directly. For complex nested state updates in forms, consider `useReducer` with Immer.
- **Scoped Context API:** Use React Context only for low-frequency global values (e.g., Theme, Auth profile). Use focused contexts to avoid full screen re-renders.

---

## 3. Validation Strategy

- **Zod Runtime Schema Validation:** Use Zod (`zod`) schemas for parsing and validating runtime API response payloads, user form inputs, and navigation search parameters. _Rationale: TypeScript types are erased at runtime; Zod provides actual boundary protection._
- **Deep Linking & Route Validation:** Configure deep linking schemas early and validate route parameter types before executing screen transitions.
- **Platform Wrappers:** Wrap platform-specific native API calls behind platform abstractions (`.ios.ts`, `.android.ts`, or Expo module guards) to prevent crashes on unsupported platforms.

---

## 4. Error Handling & Security Practices

- **Zero JWT Tokens in `AsyncStorage`:** NEVER store JWTs, access tokens, API keys, or sensitive user PII in plain, unencrypted `AsyncStorage`. _Rationale: AsyncStorage writes in plain text to the device filesystem, making it easily extractable on rooted/jailbroken devices._
- **Hardware-Backed Secure Storage:** ALWAYS store sensitive authentication credentials using Expo `SecureStore` (`expo-secure-store`), iOS Keychain, or Android Keystore.
- **Production Crash Logging & Error Boundaries:** Integrate Sentry (`@sentry/react-native` / `expo-error-reporter`) for automated crash reporting. You MUST wrap the root application (and high-risk screens) in an `ErrorBoundary` to catch JavaScript thread errors and report them to the crash service, preventing silent app closures.
- **HTTPS & SSL Certificate Pinning:** Exclusively use HTTPS for network requests. Implement SSL certificate pinning for high-security banking/financial endpoints.
- **Biometric Security:** Integrate Face ID / Touch ID biometric authentication via `expo-local-authentication` for sensitive app actions.
- **Error Boundaries & Exceptions:** Wrap screen components in React Error Boundaries to prevent a single component crash from bringing down the entire app. Use early returns and `try/catch` for asynchronous operations.
- **Secret Management:** Store API keys and credentials strictly in environment variables / EAS Secrets / GitHub Secrets — never hardcode secrets in source code.

---

## 5. Testing & Verification Conventions

- **Test Placement:** Place Unit and Integration tests strictly adjacent to their source files inside the `features/` directory (e.g., `features/auth/hooks/use-login.test.ts`). Place all E2E tests in a top-level `e2e/` folder.
- **Tiered Mobile Testing Strategy:**
  - **Unit Tests (Jest):** Verify isolated utility functions, custom hooks, data transformations, and business logic.
  - **Integration Tests (React Native Testing Library + MSW):** Verify complete feature flows (UI + API). Use Mock Service Worker (MSW) to mock the backend responses for TanStack Query.
  - **End-to-End (E2E) Tests (Maestro):** Automate critical user paths (login, checkout) on real simulators using YAML-based Maestro tests. Prefer Maestro over Detox for standard Expo apps to reduce configuration overhead and flakiness.
- **Snapshot Testing:** Use snapshot tests sparingly for core atom components to catch unintended UI regressions. _Rationale: Overuse of snapshots leads to brittle tests and "update snapshot without looking" fatigue._
- **Expo Native Mocks:** Validate mock implementations for Expo native modules in Jest test setup files.

---

## 6. App Lifecycle & Distribution

- **Over-The-Air (OTA) Updates:** Use `expo-updates` for seamless bug fix OTA updates without requiring app store re-submissions.
- **CI/CD Automation:** Automate test suites, builds, and store submissions via EAS Build / EAS Submit and GitHub Actions pipelines.

---

## 7. Internationalization (i18n)

- **Localization:** Support multi-language translation and RTL layouts using `expo-localization` + `i18next`. Respect native accessibility font scaling.

---

## 8. Commit & PR Conventions

- **Workspace Progress Analysis:** When summarizing session progress or analyzing workspace changes, apply `prompts/01-progress-report.md` to produce a structured `report-result.md`.
- **Commit Message Generation:** Follow Conventional Commits formatted via `prompts/02-commit-message-generator.md` (`git commit -m` with human-readable generalized bullets).
- **PR Description Generation:** Generate pull request descriptions structured via `prompts/03-pr-description-generator.md` (Title, Summary, Changes, Testing, Risk/Rollback).
- **Branch Naming:** `feature/short-description`, `fix/issue-description`.
