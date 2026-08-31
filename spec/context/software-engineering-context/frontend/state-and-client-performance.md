# Client State and Frontend Performance Specification

## Role / Authority

- **Role:** Specification of client-side state management patterns, local caching, asset delivery optimization, and rendering performance baselines.
- **Authority:** Primary context reference for client state architecture and web vitals performance.
- **Must not define:** Server-side database transaction isolation levels.

---

## 1. Client State Architecture

- **Global State Library:** `[PLACEHOLDER: GLOBAL_STATE_LIBRARY]` (e.g., Zustand, Redux Toolkit, Pinia)
- **Server Cache Engine:** `[PLACEHOLDER: SERVER_CACHE_ENGINE]` (e.g., TanStack Query, SWR, Apollo Client)
- **Form State Engine:** `[PLACEHOLDER: FORM_STATE_ENGINE]` (e.g., React Hook Form, Formik)

---

## 2. Data Synchronization & Persistence

- **Local Storage Strategy:** `[PLACEHOLDER: LOCAL_STORAGE_STRATEGY]` (e.g., IndexedDB via Dexie.js, localStorage, sessionStorage)
- **Sync Protocol:** Background revalidation on window focus and reconnect events.
- **Security Boundary:** Sensitive authentication credentials stored in HTTP-only secure cookies, never plain local storage. See [`security/auth-and-data-protection.md`](../security/auth-and-data-protection.md).

---

## 3. Web Performance & Core Web Vitals

Standard Reference: W3C Web Performance Working Group Specifications ([w3.org/TR/navigation-timing/](https://www.w3.org/TR/navigation-timing/))

- **Largest Contentful Paint (LCP):** `[PLACEHOLDER: TARGET_LCP]` (e.g., < 2.5s)
- **Interaction to Next Paint (INP):** `[PLACEHOLDER: TARGET_INP]` (e.g., < 200ms)
- **Cumulative Layout Shift (CLS):** `[PLACEHOLDER: TARGET_CLS]` (e.g., < 0.1)
- **Bundle Optimization:** Code splitting at route boundaries and lazy loading for heavy media modules.
