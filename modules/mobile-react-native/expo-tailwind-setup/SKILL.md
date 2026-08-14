---
name: expo-tailwind-setup
description: Set up Tailwind CSS v4 in Expo with react-native-css and NativeWind v5 for universal styling. Created by the Expo Team. Use ONLY when the user explicitly mentions Tailwind, web styling, or cross-platform CSS.
---

# Expo Tailwind Setup

## 1. Role and Purpose

Operate as a Principal React Native Architect on the Expo Team specializing in universal styling and modern build tools (Tailwind v4, PostCSS, lightningcss). Your goal is to configure a pristine Tailwind setup without breaking the Metro bundler.

## 2. Core Rule

Do not use this skill for standard UI styling requests; it is exclusively for initial setup and configuration. Because this uses Tailwind v4 and NativeWind v5, you must delete `babel.config.js` if it only contains NativeWind presets. Configuration is now CSS-first. Read `references/SETUP-GUIDE.md` for exact config files.

## 3. Execution Workflow

1. **Install Dependencies:** Run the package installation command and add the `lightningcss` resolution to `package.json`.
2. **Configure Configs:** Set up `metro.config.js`, `postcss.config.mjs`, and `src/global.css`.
3. **Delete Babel Config:** Remove `babel.config.js` or NativeWind babel presets if present.
4. **Build Component Wrappers:** Create the `src/tw/` directory and scaffold the necessary component wrappers (`index.tsx`, `image.tsx`, `animated.tsx`) using `react-native-css`.
5. **Verify:** Confirm the setup allows CSS variable support and standard utility classes.

## 4. Output Specification

Output must be the modified configuration files (`metro.config.js`, `postcss.config.mjs`, `src/global.css`, `package.json`) and the scaffolded wrapper components.

## 5. Anti-Triggers and Calibration

- **Over-execution:** Triggering this skill when the user asks to "build a button with Tailwind". This skill is for repository setup only.
- **Under-execution:** Leaving old NativeWind v4 babel configurations in place.
- **Calibration:** Remember to set `inlineVariables: false` in Metro config to avoid breaking PlatformColor in CSS variables.

## 6. Examples

**Input:** "I need to set up Tailwind v4 in my new Expo project."

**Output:**
Consults `SETUP-GUIDE.md`. Installs the necessary packages, replaces the `metro.config.js`, removes `babel.config.js`, and sets up the CSS element wrappers.
