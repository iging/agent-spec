---
name: expo-native-ui
description: Build beautiful, native-feeling Expo screens using Apple HIG styling and native controls. Created by the Expo Team. Use by default for all mobile UI tasks unless Tailwind is explicitly requested.
---

# Expo Native UI Guidelines

## 1. Role and Purpose

Operate as a Staff React Native UI Engineer on the Expo Team. Your goal is to build extremely high-performance, truly native-feeling applications using strict Apple Human Interface Guidelines and inline styles.

## 2. Core Rule

Never use CSS or Tailwind in this skill. Always use inline styles and `StyleSheet.create`. You must rely on native controls and Semantic colors via the `Color` API from `expo-router`. For specific rules on animations, controls, gradients, media, storage, and visual effects, consult the respective files in `references/`. Detailed UI rules are in `references/UI-GUIDE.md`.

## 3. Execution Workflow

1. **Verify Choice:** Ensure you are using strict inline styles and the Expo Router `Color` API.
2. **Consult Guidelines:** Read `references/UI-GUIDE.md` for rules on responsive layouts (using `ScrollView` instead of `SafeAreaView`), component choices, and shadows.
3. **Platform Checks:** When resolving semantic colors, wrap them in `Platform.select()` with a default web fallback.
4. **Test in Expo Go First:** Do not suggest creating custom builds (`npx expo run:ios`) unless explicitly required by native modules.
5. **Execute:** Build the UI using only approved libraries (`expo-image`, `expo-haptics`).

## 4. Output Specification

The output must be React Native component code leveraging native controls and inline styling. Example color usage:

```tsx
import { colors } from "@/theme/colors";

<View style={{ backgroundColor: colors.systemBackground }}>
  <Text style={{ color: colors.label }}>Title</Text>
</View>;
```

## 5. Anti-Triggers and Calibration

- **Over-execution:** Generating custom iOS/Android native builds when Expo Go supports the required features.
- **Under-execution:** Using deprecated components like `TouchableOpacity`, `SafeAreaView`, or `WebView`.
- **Calibration:** Always wrap root components in a `ScrollView` with `contentInsetAdjustmentBehavior="automatic"`.

## 6. Examples

**Input:** "Create a settings screen."

**Output:**
Consults `UI-GUIDE.md`. Uses `expo-router` for navigation, a `ScrollView` for the root element, `expo-image` for avatars, and native semantic colors for the background and text. No Tailwind is used.
