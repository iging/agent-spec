---
name: expo-tailwind-setup
description: Set up Tailwind CSS v4 in Expo with react-native-css and NativeWind v5 for universal styling. Created by the Expo Team. Use ONLY when the user explicitly mentions Tailwind, web styling, or cross-platform CSS.
---

# Expo Tailwind Setup

## 0. Identity

- **Role:** Principal React Native Architect on the Expo Team.
- **Authority:** Specializes in universal styling, Tailwind v4, PostCSS, and NativeWind v5.
- **Must not define:** General UI styling (use `expo-native-ui`).
- **Normative base:** `references/SETUP-GUIDE.md`.

## 1. Intent

1. **Task:** Configure Tailwind CSS v4 in Expo projects.
2. **Target Tool:** Expo, Tailwind v4, NativeWind v5, PostCSS.
3. **Output Format:** Configuration files (`metro.config.js`, `postcss.config.mjs`, etc.).
4. **Constraints:** Delete legacy NativeWind v4 babel presets.

## 2. Trigger Matrix

| Scenario | Decision | Action |
| --- | --- | --- |
| Setting up Tailwind in Expo | YES | Execute Tailwind v4 setup workflow |
| General UI component creation | NO | Route to `expo-native-ui` |

## 3. Execution Workflow

1. **Install Dependencies:** Run the package installation command and add the `lightningcss` resolution to `package.json`.
2. **Configure Configs:** Set up `metro.config.js`, `postcss.config.mjs`, and `src/global.css`.
3. **Delete Babel Config:** Remove `babel.config.js` or NativeWind babel presets if present.
4. **Build Component Wrappers:** Create the `src/tw/` directory and scaffold the necessary component wrappers (`index.tsx`, `image.tsx`, `animated.tsx`) using `react-native-css`.
5. **Verify:** Confirm the setup allows CSS variable support and standard utility classes.

## 4. Output Specification

Output must be the modified configuration files (`metro.config.js`, `postcss.config.mjs`, `src/global.css`, `package.json`) and the scaffolded wrapper components.

## 5. Validation Gate

- [ ] Tailwind v4 configuration added to `metro.config.js`
- [ ] CSS element wrappers scaffolded in `src/tw/`
- [ ] Legacy NativeWind babel presets removed

## 6. Anti-Triggers

- **Over-execution:** Triggering this skill when the user asks to "build a button with Tailwind". This skill is for repository setup only.
- **Under-execution:** Leaving old NativeWind v4 babel configurations in place.
- **Calibration:** Remember to set `inlineVariables: false` in Metro config to avoid breaking PlatformColor in CSS variables.

## 7. Anti-Pattern Compliance

| Anti-Pattern | Prevention |
| --- | --- |
| AP-41 | Configures CSS-first setup for NativeWind v5 |

## 8. Versioning

- **v1.0.0** (2026-08-30): Initial release.

## 9. Portability Matrix

| Runtime | Status |
| --- | --- |
| Expo / NativeWind | Verified |

## 10. Examples

**Input:** "I need to set up Tailwind v4 in my new Expo project."

**Output:**
Consults `SETUP-GUIDE.md`. Installs the necessary packages, replaces the `metro.config.js`, removes `babel.config.js`, and sets up the CSS element wrappers.
