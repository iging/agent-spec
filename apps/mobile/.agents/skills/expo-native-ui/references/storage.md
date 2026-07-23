# Storage Solutions

> [!IMPORTANT]  
> **Always match the storage solution to the data type.** Simple key-values go into `localStorage`, massive datasets/relational data go into `expo-sqlite`, and sensitive tokens go into `expo-secure-store`.

## Anti-Patterns (DO NOT DO THIS)

> [!WARNING]  
> **Never use `@react-native-async-storage/async-storage`.**
> It is extremely slow because it requires crossing the asynchronous JavaScript bridge for every single read and write. We use the synchronous `localStorage` polyfill backed by SQLite.
>
> ❌ `import AsyncStorage from '@react-native-async-storage/async-storage';` (BANNED)
> ✅ `import "expo-sqlite/localStorage/install";` (REQUIRED)

> [!CAUTION]
> **Never store sensitive data in `localStorage` or SQLite without encryption.**
> Passwords, API keys, and JWT authentication tokens MUST be stored using `expo-secure-store`, which encrypts the data using the OS Keychain / Keystore.

## Key-Value Storage (Fast, Synchronous)

Use the synchronous `localStorage` polyfill for key-value storage. It is incredibly fast because it is backed by SQLite via JSI, bypassing the async JS bridge.

```tsx
import "expo-sqlite/localStorage/install"; // Import once at the root of your app

// Simple get/set (Synchronous!)
localStorage.setItem("theme", "dark");
const theme = localStorage.getItem("theme");

// Store objects as JSON
localStorage.setItem("user", JSON.stringify({ name: "John", id: 1 }));
const user = JSON.parse(localStorage.getItem("user") ?? "{}");
```

## When to Use What

| Use Case                                             | Solution                |
| ---------------------------------------------------- | ----------------------- |
| Simple key-value (settings, preferences, small data) | `localStorage` polyfill |
| Large datasets, complex queries, relational data     | Full `expo-sqlite`      |
| Sensitive data (tokens, passwords, API keys)         | `expo-secure-store`     |

## Reactive Storage (Global State)

Unlike Redux or Zustand, reading from disk directly inside a React component won't trigger a re-render when the data changes elsewhere. Create a reactive storage utility using `useSyncExternalStore`:

```tsx
// utils/storage.ts
import "expo-sqlite/localStorage/install";

type Listener = () => void;
const listeners = new Map<string, Set<Listener>>();

export const storage = {
  get<T>(key: string, defaultValue: T): T {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
  },

  set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
    listeners.get(key)?.forEach((fn) => fn());
  },

  subscribe(key: string, listener: Listener): () => void {
    if (!listeners.has(key)) listeners.set(key, new Set());
    listeners.get(key)!.add(listener);
    return () => {
      listeners.get(key)?.delete(listener);
    };
  },
};
```

### React Hook for Storage

```tsx
// hooks/use-storage.ts
import { useSyncExternalStore } from "react";
import { storage } from "@/utils/storage";

export function useStorage<T>(
  key: string,
  defaultValue: T,
): [T, (value: T) => void] {
  // Automatically re-renders the component when `storage.set` is called for this key
  const value = useSyncExternalStore(
    (cb) => storage.subscribe(key, cb),
    () => storage.get(key, defaultValue),
  );

  return [value, (newValue: T) => storage.set(key, newValue)];
}
```

### Usage:

```tsx
function Settings() {
  const [theme, setTheme] = useStorage("theme", "light");

  return (
    <Switch
      value={theme === "dark"}
      onValueChange={(dark) => setTheme(dark ? "dark" : "light")}
    />
  );
}
```

## Full SQLite for Complex Data

For larger datasets or complex queries where mapping through JSON arrays in memory is too slow, use the full asynchronous `expo-sqlite` API:

```tsx
import * as SQLite from "expo-sqlite";

async function initializeDatabase() {
  // Opens or creates the DB
  const db = await SQLite.openDatabaseAsync("app.db");

  // Create table
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      date TEXT NOT NULL,
      location TEXT
    )
  `);

  // Prepared statement insert (prevents SQL injection)
  await db.runAsync("INSERT INTO events (title, date) VALUES (?, ?)", [
    "Meeting",
    "2024-01-15",
  ]);

  // Query returning typed array
  const events = await db.getAllAsync("SELECT * FROM events WHERE date > ?", [
    "2024-01-01",
  ]);

  return events;
}
```
