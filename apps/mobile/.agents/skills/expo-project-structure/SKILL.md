---
name: expo-project-structure
description: Folder structure for a new Expo app using Expo Router with a feature-based architecture. Use when scaffolding a new Expo project or deciding where a file should live. For new projects only — never restructure an existing app to match.
---

# Expo Project Structure (Feature-Based)

## Role

Act as a **Staff Mobile Architect** who strongly advocates for domain-driven design, colocation, and scalable feature-based architectures in large React Native/Expo codebases.

## Trigger

Use this skill when scaffolding a new Expo project or deciding where a file should live. **Apply only to new projects.** If the app already has a layout, follow its existing conventions and leave files where they are. This is a starting point, not a migration guide.

## Workflow

1. **Analysis:** Determine if the user is scaffolding a new app or adding to an existing feature.
2. **Routing:** If they are adding a route, place a very thin screen component in `src/app/` that simply imports the real screen from a feature folder.
3. **Feature Colocation:** Group everything (API, components, hooks, validation) into a cohesive domain inside `src/features/[name]`.
4. **Shared Evaluation:** Only move something to `src/shared/` if you can objectively prove that _multiple_ separate features currently depend on it.

---

## Technical Reference Guide

A starting skeleton for a **new** Expo app using **Expo Router** with a **feature-based architecture**.

### Folder Structure

```text
├── assets/
├── scripts/
├── src/
│   ├── app/                          # Expo Router routes ONLY
│   │   ├── (auth)/
│   │   │   ├── login.tsx
│   │   │   └── register.tsx
│   │   ├── (tabs)/
│   │   │   ├── index.tsx
│   │   │   ├── profile.tsx
│   │   │   └── settings.tsx
│   │   ├── api/
│   │   │   ├── auth+api.ts
│   │   │   └── users+api.ts
│   │   ├── _layout.tsx
│   │   └── _layout.web.tsx
│   │
│   ├── features/
│   │   ├── auth/
│   │   │   ├── api/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── screens/
│   │   │   │   ├── login-screen.tsx
│   │   │   │   └── register-screen.tsx
│   │   │   ├── services/
│   │   │   ├── types.ts
│   │   │   ├── validation.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── profile/
│   │   │   ├── api/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── screens/
│   │   │   ├── services/
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   │
│   │   └── settings/
│   │       └── ...
│   │
│   ├── shared/
│   │   ├── components/
│   │   │   ├── button/
│   │   │   │   ├── index.tsx
│   │   │   │   └── icon.tsx
│   │   │   ├── modal.tsx
│   │   │   └── spinner.tsx
│   │   │
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── providers/
│   │   ├── theme/
│   │   ├── constants/
│   │   ├── types/
│   │   └── utils/
│   │       ├── format-date.ts
│   │       └── format-date.test.ts
│   │
│   ├── server/
│   │   ├── auth.ts
│   │   └── db.ts
│   │
│   └── env.ts
│
├── app.json
├── eas.json
└── package.json
```

### `src/app` — Routes Only

`src/app` exists exclusively for Expo Router.

Every file becomes a route.

**Never place business logic, reusable components, hooks, or utilities inside `app/`.**

Route files should remain very small:

```tsx
import { LoginScreen } from "@/features/auth";

export default function LoginRoute() {
  return <LoginScreen />;
}
```

Route files should only handle routing concerns:

- reading URL params
- navigation
- route configuration
- rendering the appropriate feature screen

Everything else belongs inside a feature.

---

### Feature Modules

Organize the application by **business feature**, not by file type.

Instead of:

```text
components/
hooks/
screens/
utils/
```

group everything together:

```text
features/
└── auth/
    ├── api/
    ├── components/
    ├── hooks/
    ├── screens/
    ├── services/
    ├── types.ts
    ├── validation.ts
    └── index.ts
```

A feature owns everything required for that domain.

Examples:

- Authentication
- Profile
- Dashboard
- Settings
- Notifications
- Chat

This makes large applications significantly easier to navigate because all related code lives together.

---

### Shared Code

Only place code in `shared/` when **multiple features depend on it**.

Good examples:

- Button
- Modal
- Theme
- API client
- Query client
- Date formatting
- Global providers

If code is used by only one feature, it belongs inside that feature instead.

---

### Components

Shared UI belongs in:

```text
shared/components/
```

Feature-specific UI belongs in:

```text
features/profile/components/
```

Do **not** move feature-specific components into shared simply because they are components.
A component becomes shared only after multiple features use it.

---

### Hooks

Feature-specific hooks:

```text
features/auth/hooks/
```

Shared hooks:

```text
shared/hooks/
```

Example:

```text
features/auth/hooks/use-login.ts
shared/hooks/use-theme.ts
```

---

### API Layer

Each feature owns its API functions.

```text
features/
└── auth/
    └── api/
        ├── login.ts
        ├── logout.ts
        └── refresh-token.ts
```

Avoid one massive global API folder.

---

### Services

Business logic belongs in services.

Example:

```text
features/profile/services/profile-service.ts
```

Services should contain logic, not UI.

---



### Server Code

Appending `+api` creates a server API route.

Keep shared backend logic inside:

```text
src/server/
```

Route handlers should remain thin and delegate work to server helpers.

---

### Platform-Specific Code

For larger platform differences:

```text
button.tsx
button.web.tsx
button.ios.tsx
button.android.tsx
```

Import without specifying the extension:

```ts
import { Button } from "@/shared/components/button";
```

Metro automatically resolves the correct file.

---

### Colocation

Colocate files whenever possible.

Example:

```text
features/profile/
├── components/
├── hooks/
├── api/
├── services/
├── types.ts
├── validation.ts
└── screens/
```

Everything related to the feature should live together.

Tests should live beside the code they test:

```text
format-date.ts
format-date.test.ts
```

Keep styles inside component files unless they become exceptionally large.

---

### Guiding Principles

- `app/` is for routing only.
- Organize by **feature**, not by file type.
- Keep related code together.
- Only move code into `shared/` when multiple features need it.
- Route files should remain thin.
- Features own their UI, business logic, hooks, API calls, validation, and types.
- Prefer barrel exports (`index.ts`) to simplify imports.
- Colocate tests with the files they test.
