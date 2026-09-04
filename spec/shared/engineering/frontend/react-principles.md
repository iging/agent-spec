---
name: Shared React Principles
description: Reusable, deterministic React (React 19, Server Components, Hooks) architecture constraints, state colocation rules, performance guidelines, and security baselines.
---

# Shared React Principles

> **Purpose:** Reusable, deterministic React architecture constraints, component design principles, hook rules, performance optimizations, and accessibility standards for any prompt generating or modifying React codebases. Reference this file from your prompt to enforce strict React engineering standards.

---

## 1. Component Architecture and Rendering Boundaries (Hard Rules)

Apply these rules strictly to all React component creation and refactoring to optimize bundle size and maintain clear component boundaries.

- **Server Components Default:** All components MUST be React Server Components by default when working within App Router or Server Component architectures.
- **Client Component Directive:** The `'use client'` directive MUST be placed strictly at interactive leaf components. You MAY ONLY use it if the component fundamentally requires:
  - React state hooks (`useState`, `useReducer`, `useContext`, `useRef`).
  - React effect hooks (`useEffect`, `useLayoutEffect`).
  - DOM Event handlers (`onClick`, `onChange`, `onSubmit`).
  - Browser APIs (`window`, `document`, `localStorage`).
- **No Derivative State in `useEffect`:** Updating state derived from props or other state variables inside `useEffect` is strictly BANNED. Calculate derived values directly within the component body during rendering.
- **Component Granularity:** Keep components small, focused, and single-purpose. Extract complex presentation sub-trees into dedicated sub-components, and pull reusable business logic into custom hooks.
- **Props Serialization:** Data passed across Server-to-Client boundaries MUST be strictly serializable (JSON primitive types, plain objects, arrays). Passing functions, class instances, or Symbol objects across the boundary is strictly BANNED.

---

## 2. State Colocation and Data Fetching

- **State Colocation:** Keep state as close to where it is consumed as possible. Local UI state (such as modal visibility or dropdown toggles) MUST NOT be pushed into global state stores.
- **No `useEffect` Data Fetching:** Fetching data inside `useEffect` on component mount is strictly BANNED due to layout shifts and network waterfall cascades. Data MUST be fetched using Server Components, TanStack Query, or SWR.
- **React 19 Action Hooks:** Use React 19 native action hooks (`useActionState`, `useFormStatus`, `useOptimistic`) for form submissions, state transitions, and server action mutations in client components.
- **Context API Boundaries:** Wrap React Context providers closely around the subtree that consumes them rather than mounting all providers globally at the root layout.

---

## 3. Hook Mechanics and Rules of Hooks

- **Strict Rules of Hooks:** Hooks MUST ONLY be called at the top level of React function components or custom hooks. Calling hooks inside loops, conditions, or nested functions is strictly BANNED.
- **Custom Hook Naming:** Custom hooks MUST begin with the `use` prefix (e.g., `useAuth`, `useLocalStorage`).
- **Effect Dependency Completeness:** Every variable from component scope used inside a `useEffect` MUST be explicitly declared in its dependency array. Omitting dependencies or suppressing linter rules is strictly BANNED.

---

## 4. Performance and Memory Management

- **Stable List Keys:** Always provide a stable, unique `key` prop when mapping arrays to JSX elements. Using array indices as `key` props for dynamic, filterable, or re-orderable lists is strictly BANNED.
- **List Virtualization:** Render dynamic lists containing more than 100 items using virtualization libraries (`@tanstack/react-virtual` or `react-window`).
- **React Compiler & Memoization:** Trust the React Compiler for automated memoization where available. In non-compiler build setups, apply `React.memo`, `useMemo`, and `useCallback` explicitly around computational bottlenecks or memoized child trees.

---

## 5. Strict TypeScript Enforcement

- **No `any` Types:** All component props, state objects, event handlers, and hook return values MUST have explicit, non-`any` TypeScript types.
- **Component Props Naming & Extension:** Prop interfaces MUST be named `[ComponentName]Props`. Extend native HTML element attributes using `React.ComponentPropsWithoutRef<'button'>` to allow standard attributes.
- **Event Handler Typing:** Explicitly type DOM event handlers using React built-in event types (e.g., `React.ChangeEvent<HTMLInputElement>`, `React.FormEvent<HTMLFormElement>`).

---

## 6. Security and Accessibility (a11y)

- **Sanitize HTML Injection:** `dangerouslySetInnerHTML` is strictly BANNED unless the input is explicitly sanitized via DOMPurify or an equivalent security sanitizer.
- **Semantic HTML & ARIA:** Prefer native semantic HTML elements (`<button>`, `<nav>`, `<header>`, `<main>`) over generic `<div>` wrappers. Custom interactive elements (`<div>` with `onClick`) MUST include explicit keyboard handlers (`onKeyDown`), `tabIndex={0}`, and proper WAI-ARIA roles.
