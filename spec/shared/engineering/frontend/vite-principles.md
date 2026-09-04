---
name: Shared Vite Principles
description: Reusable, deterministic Vite 6.x architecture constraints, Environment API guidelines, plugin pipeline ordering, SSR hydration, enterprise monorepo rules, and security controls.
---

# Shared Vite Principles

> **Purpose:** Reusable, deterministic Vite 6.x architecture constraints for any prompt generating or modifying Vite configurations, plugins, and SSR applications. Reference this file from your prompt to enforce strict bundler, plugin, and runtime standards.

---

## 1. Vite 6.x Core Architecture and Environment API (Hard Rules)

Apply these rules strictly to all Vite configurations, plugins, and SSR architecture patterns.

- **Vite 6 Environment API:** Use the Vite 6 Environment API (`environments` configuration option) when targeting multiple runtime environments (for example `client`, `ssr`, `edge`, or `worklet`). Do not rely on legacy top-level `ssr` overrides when building multi-environment applications.
- **Environment Isolation:** Define separate `resolve`, `plugins`, `build`, and `dev` configurations per environment key in `vite.config.ts`. Each environment executes inside its own module graph and `DevEnvironment` runner.
- **Explicit Target Declaration:** Always annotate `build.target` explicitly (for example `es2022` or `modules`). Do not leave target configurations implicit when compiling for modern ECMAScript standards.
- **Conditional Environment Checks:** Check runtime context using `import.meta.env.SSR` or the active Vite environment instance (`this.environment` inside plugin hooks) instead of sniffing global Node.js process variables.
- **TypeScript Config Alignment:** Set `moduleResolution: "bundler"` and `erasableSyntaxOnly: true` in `tsconfig.json`. Ensure `vite.config.ts` imports types explicitly using `import type { UserConfig, Plugin } from 'vite'`.

---

## 2. Plugin Pipeline and Lifecycle Ordering

- **Explicit Hook Ordering:** Always declare `enforce: 'pre'` or `enforce: 'post'` on custom Vite plugins. Place transformation plugins that preprocess raw files (such as MDX or custom DSLs) in `pre`. Place code generation or asset injection plugins in `post`.
- **Conditional Plugin Execution:** Use the `apply` property (`apply: 'serve'`, `apply: 'build'`, or a predicate function) to restrict plugins to specific execution phases. Do not run heavy build-only plugins during development.
- **Pure Transform Hooks:** The `transform` hook MUST be pure and idempotent. Do not mutate global plugin state or perform side effects inside `transform`. Return source code and sourcemaps in standard `{ code, map }` objects.
- **Dev Server Middleware:** Attach custom Node.js middleware in `configureServer` by returning a post-hook function `() => { server.middlewares.use(...) }` if the middleware must run after internal Vite middlewares.
- **Virtual Modules Protocol:** Prefix virtual module identifiers with `virtual:` (for example `virtual:my-module`). In `resolveId`, resolve virtual IDs with a leading null-byte prefix (`\0virtual:my-module`) to prevent downstream plugins or Rollup from attempting to load them from disk.

---

## 3. Module Resolution, Alias Hygiene, and Asset Pipeline

- **Dual Path Aliasing:** Every path alias declared in `vite.config.ts` (`resolve.alias`) MUST have a corresponding path mapping in `tsconfig.json` (`compilerOptions.paths`). Never declare path aliases in Vite without updating TypeScript configuration.
- **No Wildcard Catch-Alls:** Avoid root-level wildcard aliases (such as mapping `~` or `@` to the repository root) that conflict with scoped npm packages or `node_modules` paths. Restrict path aliases to explicit directories (for example `@/` mapping to `src/`).
- **Dynamic Import Hygiene:** Use `import.meta.glob` for dynamic batch imports instead of writing manual dynamic `import()` loops. Annotate glob imports explicitly (for example `import.meta.glob<{ default: Component }>('./pages/*.tsx', { eager: false })`).
- **Asset Import Typing:** Import static assets explicitly or use explicit URL suffix queries (`import logoUrl from './logo.svg?url'`). Use `?raw` for inline string contents and `?worker` for Web Worker instantiations.
- **Public Directory Boundaries:** Reserve the `public/` directory strictly for un-transformed assets served at the root path (such as `robots.txt` or `favicon.ico`). Do not import files from `public/` inside source code; reference them via absolute root paths.

---

## 4. SSR Hydration, Streaming, and Target Runtimes

- **Server-Only Module Guards:** Guard server-only logic (such as direct database queries or API private keys) against client bundling. Use environment separation or import guards to trigger build failures if server code leaks into the client graph.
- **Dev Module Execution:** Execute server code in development using Environment API runners (`environment.runner.import()`) or `vite.ssrLoadModule()`. Do not use Node.js `require()` or native ESM `import()` directly on raw source files in development.
- **Hydration Mismatch Prevention:** Components rendered on the server MUST output markup identical to the initial client render. Defer browser-specific DOM reads (`window`, `localStorage`, `document`) to client-only lifecycle hooks (`useEffect` in React, `onMounted` in Vue) or guard them behind client-side state checks.
- **HTML Transformation Pipeline:** Use `server.transformIndexHtml` during development to inject scripts, nonces, or dynamic head metadata into `index.html` on the server before sending HTML to the client.
- **Streaming Response Handlers:** Stream HTML responses using web standard streams (`ReadableStream`) or Node.js streams (`PassThrough`). Ensure head metadata and critical CSS links are flushed before body chunks stream to the browser.

---

## 5. Enterprise Monorepo and Pre-Bundling Optimization (`optimizeDeps`)

- **Dependency Pre-Bundling Control:** Explicitly configure `optimizeDeps.include` for deep module imports or dynamic packages that Vite fails to discover during initial scanning.
- **Workspace Package Isolation:** In monorepos containing linked local workspace packages, list pre-compiled CJS or external dependencies in `optimizeDeps.include`. Exclude local source packages using `optimizeDeps.exclude` when hot module replacement (HMR) across raw TypeScript packages is required.
- **Manual Chunk Strategy:** Avoid single massive vendor bundles. Configure `build.rollupOptions.output.manualChunks` or use a deterministic chunk splitting function to separate large framework dependencies (such as React, Vue, or Three.js) into isolated, cacheable chunks.
- **Circular Chunk Elimination:** Ensure manual chunk functions do not create circular module dependencies between generated chunks. Validate that output chunk groups load independently without runtime evaluation order errors.
- **CommonJS Interop:** Configure `build.commonjsOptions` explicitly when importing legacy CommonJS dependencies. Declare named export transformations in `commonjsOptions.transformMixedEsModules` if legacy packages mix `module.exports` with ES imports.

---

## 6. Security, CSP, and Production Hardening

- **Strict File System Access:** Keep `server.fs.strict: true` enabled in `vite.config.ts`. Explicitly restrict accessible workspace directories using `server.fs.allow` (for example `[searchForWorkspaceRoot(process.cwd())]`) to block arbitrary file reads outside the project root.
- **Environment Variable Prefixes:** Only expose safe client-side environment variables using the `VITE_` prefix (`envPrefix: 'VITE_'`). Server secrets, API tokens, and database credentials MUST NOT use the `VITE_` prefix and MUST NOT be referenced inside client source files.
- **Content Security Policy (CSP) Nonces:** Inject dynamic CSP nonces into script tags during server-side HTML rendering or HTML transformation passes. Avoid inline script execution without nonce verification.
- **Asset Hash Manifests:** Enable `build.manifest: true` to generate a production asset manifest (`.vite/manifest.json`). Server frameworks MUST map asset entrypoints using this manifest to ensure correct hashed asset URLs and preloading headers (`modulepreload`).
- **Production Source Maps:** Never deploy full inline sourcemaps to production web servers. Use `build.sourcemap: 'hidden'` when uploading sourcemaps to private error-tracking services without exposing source code to end users.

---

## 7. Anti-Patterns and Configuration Code Smells

- **Banned Node.js Globals in Client Code:** Referencing `process.env`, `__dirname`, or `__filename` directly in client source code is strictly BANNED. Use `import.meta.env` and `import.meta.url`.
- **Banned Direct Mutation of `config`:** Mutating the passed configuration object directly inside Vite plugin hooks is BANNED. Plugins MUST return a partial configuration object from the `config` hook.
- **Banned Unchecked Third-Party Plugins:** Importing unmaintained third-party plugins that override core Rollup hooks without sourcemap forwarding is BANNED.
- **Banned Synchronous File I/O in Transforms:** Using synchronous file reads (`fs.readFileSync`) inside `transform` or `resolveId` hooks is BANNED. Use asynchronous file system operations (`fs.promises` or Rollup context `this.addWatchFile`).
- **Banned Hardcoded Ports:** Hardcoding strict ports in production preview or dev configs without fallback options is BANNED. Use `server.port` alongside configurable environment overrides (`process.env.PORT`).
