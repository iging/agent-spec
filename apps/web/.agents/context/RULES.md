# RULES — Web App Coding Rules

> **Purpose:** Specify web-specific coding rules, architecture guidelines, and design principles. Tier-3 rules for `apps/web/`.
> **Note:** This file extends the shared rules found in `../shared/SHARED_RULES.md`.

_Last updated: 2026-07-23_

---

## 1. Core Language & Architecture Defaults

- **Read Shared Rules First:** All principles in `../shared/SHARED_RULES.md` (TypeScript strictness, naming, SOLID, DRY/KISS, barrel files, and function design) apply here.
- **DOM & Event Handling:** Use React synthetic events. Do not mutate DOM nodes directly or access `document`/`window` during server-side rendering (SSR) lifecycle passes. *Rationale: Direct DOM mutation breaks React's virtual DOM reconciliation. Accessing window during SSR causes hydration mismatches and crashes on the server.*

---

## 2. State Management Rules

- **State Boundaries & Categorization:**
  - **Local UI State (`useState` / `useReducer`):** Modals, toggles, form inputs. Keep local to the component unless multiple non-nested components require it. Never over-globalize transient UI state.
  - **Server Cache State (TanStack Query / SWR):** API data fetching, caching, loading/error states. Keep server data strictly out of global client stores (Zustand / Redux).
  - **Global Client State (Zustand / Redux Toolkit):** Auth session, theme, cart, global preferences. Organize into modular domain slices (`features/auth/store`) rather than a single monolithic store. Normalize state objects using entity IDs.
  - **URL / Route State (`searchParams`):** Active filters, search queries, pagination, tab selection. *Rationale: Storing view state in the URL keeps the state shareable, bookmarkable, and preserves user context across reloads.*
- **Selective Subscriptions & Selectors:** Always use fine-grained selectors (e.g., `useStore(state => state.property)`) to prevent unnecessary re-renders when unrelated store properties change.
- **No Derived State Duplication:** Never store values that can be calculated on the fly from existing state.
- **Immutability:** Always create new object/array references when updating state. Never mutate state directly.
- **Scoped Context API:** Use React Context only for low-frequency global values (e.g., Theme, Auth profile). Use focused contexts to avoid full component tree re-renders.

---

## 3. Validation Strategy

- **Boundary Validation:** Validate all external inputs (API request bodies, URL params, form submissions) at system boundaries using schema validators (e.g., Zod). *Rationale: TypeScript types are erased at runtime; Zod provides actual boundary protection against malformed payloads.*
- **Typed Fetch Clients:** Standardize async API calls using typed wrapper functions (e.g., custom `fetchJson<T>()` utility, `ky`, or `ofetch`) with explicit error boundary and loading state handling.

---

## 4. Error Handling & Web Security Practices

- **Exceptions over Error Codes:** Use `try/catch` and keep error-handling logic separated from normal execution flow.
- **React Error Boundaries:** Wrap route-level and feature-level components in React Error Boundaries to prevent a single component crash from bringing down the entire page.
- **Zero-Trust Security & XSS:** Sanitize user inputs before rendering to prevent XSS attacks. Never use `dangerouslySetInnerHTML` with un-sanitized user content.
- **Browser Storage Security:** Never store sensitive tokens (JWTs) or user PII in unencrypted `localStorage` / `sessionStorage`. *Rationale: Local storage is accessible to any script running on the page, making it highly vulnerable to XSS attacks.*
- **Cookie Security:** Use secure, HTTP-only, SameSite=Strict cookies for authentication sessions.
- **Headers & CORS:** Ensure strict Content Security Policy (CSP) headers are set. Configure Cross-Origin Resource Sharing (CORS) to whitelist only known, trusted origins for API endpoints.
- **No Secrets in Code:** Never hardcode secret keys, API tokens, or credentials in source code. Load from environment variables (`process.env` / `.env`).

---

## 5. Testing & Verification Conventions

- **Test Placement:** Place unit tests adjacent to source files (e.g., `user-service.ts` → `user-service.test.ts`) or in a `__tests__/` directory.
- **Tiered Web Testing Strategy:**
  - **Unit Tests (Vitest / Jest):** Verify isolated utility functions, custom hooks, and business logic.
  - **Component & Integration Tests (React Testing Library):** Verify component rendering, prop handling, and user event interactions. Test behavior, not implementation details.
  - **Accessibility Testing (Axe):** Automate accessibility compliance checking in component tests.
  - **End-to-End (E2E) Tests (Playwright / Cypress):** Automate critical user paths (login, checkout, onboarding) running against a real browser instance.
  - **SSR Hydration:** Ensure components render identically on server and client to avoid hydration mismatch errors.

---

## 6. Commit & PR Conventions

- **Workspace Progress Analysis:** When summarizing session progress or analyzing workspace changes, apply `prompts/01-progress-report.md` to produce a structured `report-result.md`.
- **Commit Message Generation:** Follow Conventional Commits formatted via `prompts/02-commit-message-generator.md` (`git commit -m` with human-readable generalized bullets).
- **PR Description Generation:** Generate pull request descriptions structured via `prompts/03-pr-description-generator.md` (Title, Summary, Changes, Testing, Risk/Rollback).
- **Branch Naming:** `feature/short-description`, `fix/issue-description`.
