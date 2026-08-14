---
name: Shared Next.js Principles
description: Reusable, deterministic Next.js and React architecture constraints for any prompt generating or modifying Next.js codebases.
---

# Shared Next.js Principles

> **Purpose:** Reusable, deterministic Next.js and React architecture constraints for any prompt generating or modifying Next.js codebases. Reference this file from your prompt to enforce strict architectural and performance standards.

---

## 1. Component Architecture and Rendering (Hard Rules)

Apply these rules strictly to all component generation to enforce performance and minimize client-side JavaScript.

- **Server Components Default:** All components MUST be React Server Components by default.
- **Client Component Constraints:** The `"use client"` directive is strictly regulated. You MAY ONLY use it if the component fundamentally requires:
  - React hooks (`useState`, `useEffect`, `useReducer`, `useContext`, `useRef`).
  - Browser APIs (e.g., `window`, `document`, `navigator`).
  - DOM Event listeners (e.g., `onClick`, `onChange`).
- **File Structure:** All Next.js projects MUST use the App Router (`app/` directory). The legacy Pages router (`pages/`) is strictly BANNED for new features.
- **Feature-First Architecture:** Place all code inside a `src/` directory. Group code by feature or domain (e.g., `src/features/auth`) rather than scattering files globally. The `app/` directory should strictly contain routing logic (`page.tsx`, `layout.tsx`).
- **Component Size:** Components must be small and modular. Never combine complex business logic, data fetching, and large UI trees into a single file. Break them into smaller reusable functions.
- **Serialization Boundary:** Data passed from a Server Component to a Client Component MUST be strictly serializable (JSON). Passing functions, Dates, or class instances as props is BANNED.
- **Async Request APIs (Next.js 16):** Page and layout props (`params`, `searchParams`) are asynchronous Promises. You MUST explicitly `await params` and `await searchParams` before accessing their properties. Synchronous access is strictly BANNED.

---

## 2. Data Fetching and State Management

- **Server-Side Fetching:** Data MUST be fetched on the server using `async/await` directly within Server Components.
- **Banned Fetching:** Do NOT use the `useEffect` hook for data fetching. It causes layout shifts and performance degradation.
- **Next.js 16 Caching & Dynamic I/O:** Dynamic data operations and fetches are uncached by default. You MUST explicitly opt-in using the `'use cache'` directive alongside `cacheLife()` and `cacheTag()` helpers for explicit cache control.
- **Async Request Context (Next.js 16):** Dynamic server utilities (`cookies()`, `headers()`, `draftMode()`) are asynchronous. You MUST explicitly `await cookies()` and `await headers()` in Server Components and Server Actions.
- **Server Actions & React 19 Action Hooks:** Use Server Actions for all form submissions and internal database mutations. In Client Components, integrate Server Actions using React 19 native hooks (`useActionState`, `useFormStatus`, `useOptimistic`). Reserve Route Handlers strictly for external public REST APIs or webhooks.
- **Suspense & Partial Prerendering (PPR):** Enforce granular `<Suspense>` boundaries around genuinely dynamic components (like a shopping cart) to maximize Partial Prerendering. Avoid wrapping entire pages in a single Suspense boundary.
- **State Granularity:** When managing state in Client Components, use granular states (multiple `useState` declarations) instead of a single monolithic state object to prevent unnecessary re-renders.
- **Global State:** The React Context API is permitted for lightweight global state. Third-party state management (like Redux) is BANNED unless explicitly requested by the user.

---

## 3. Asset and Performance Optimization

- **Image Optimization:** The standard HTML `<img>` tag is strictly BANNED. You MUST import and use the `next/image` component for all images.
- **Font Optimization:** Importing fonts from external CDNs is BANNED. You MUST use the built-in `next/font` module to self-host and optimize fonts.
- **Lazy Loading:** For heavy Client Components (like charts or rich text editors), use `next/dynamic` to lazy-load them and reduce the initial JavaScript bundle size.
- **Turbopack Readiness:** All custom configurations, imports, and modules MUST be fully compatible with Turbopack (the default bundler in Next.js 16 for dev and build). Webpack-only plugins or custom loaders are BANNED unless wrapped in explicit fallbacks.

---

## 4. Routing, SEO, and Middleware

- **Metadata API:** You MUST use the built-in Next.js Metadata API (e.g., `export const metadata = { ... }`) in `layout.tsx` or `page.tsx` for SEO and Open Graph tags. Do not use external libraries like `react-helmet`.
- **Forms and Navigation:** Standard HTML `<form>` tags are BANNED for mutations. Use the new `next/form` component for built-in client-side navigation and progressive enhancement.
- **Error and Loading States:** Every major route segment MUST include a `loading.tsx` and an `error.tsx` file to handle Suspense boundaries and prevent broken user experiences.
- **API Routes:** Reserve Route Handlers (`app/api/[route]/route.ts`) strictly for external public REST APIs or webhooks. Internal backend logic MUST use Server Actions.
- **Middleware:** Use `middleware.ts` at the project root for cross-cutting concerns like authentication checks, rate limiting, and redirects.

---

## 5. TypeScript Strictness

- **Type Safety:** All components, functions, and API routes MUST have strictly defined types or interfaces for their props, state, and return values.
- **Type Simplicity:** Do not create deeply nested, complex types causing readability issues. Break them down into smaller, composable interfaces.
- **Nullish Safety:** When dealing with potentially undefined or null values, use optional chaining (`?.`) and nullish coalescing (`??`) to prevent runtime crashes.

---

## 6. Security and Environment Variables

- **Client-Side Secrets:** NEVER expose API keys or secrets to the browser. Only variables explicitly safe for the client may be prefixed with `NEXT_PUBLIC_`.
- **Server-Side Secrets:** Database passwords, auth secrets, and private API keys MUST remain on the server and be accessed securely via `process.env` in Server Components or API Routes only.
