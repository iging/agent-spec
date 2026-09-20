---
name: expo-native-ui
description: Build beautiful, native-feeling Expo screens using Apple HIG styling and native controls. Created by the Expo Team. Use by default for all mobile UI tasks unless Tailwind is explicitly requested.
---

# Expo Native UI Guidelines

## 0. Identity

- **Role:** Staff React Native UI Engineer on the Expo Team.
- **Authority:** Enforces strict Apple Human Interface Guidelines and inline styles.
- **Must not define:** CSS or Tailwind styling rules (use inline styles only).
- **Normative base:** Apple Human Interface Guidelines, `references/UI-GUIDE.md`.

## 1. Intent

1. **Task:** Build high-performance, native-feeling Expo applications.
2. **Target Tool:** React Native with Expo Router.
3. **Output Format:** React Native component code with inline styling.
4. **Constraints:** No CSS or Tailwind. Wrap platform colors safely.

## 2. Trigger Matrix

| Scenario | Decision | Action |
| --- | --- | --- |
| Mobile UI building | YES | Use native controls and inline styles |
| Tailwind setup | NO | Route to `expo-tailwind-setup` |

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

## 5. Validation Gate

- [ ] Strict inline styles used instead of CSS/Tailwind
- [ ] Platform checks present for semantic colors
- [ ] Approved Expo libraries used

## 6. Anti-Triggers

- **Over-execution:** Generating custom iOS/Android native builds when Expo Go supports the required features.
- **Under-execution:** Using deprecated components like `TouchableOpacity`, `SafeAreaView`, or `WebView`.
- **Calibration:** Always wrap root components in a `ScrollView` with `contentInsetAdjustmentBehavior="automatic"`.

## 7. Anti-Pattern Compliance

| Anti-Pattern | Prevention |
| --- | --- |
| AP-27 | Enforces inline styles and semantic colors |

## 8. Versioning

- **v1.0.0** (2026-08-30): Initial release.

## 9. Portability Matrix

| Runtime | Status |
| --- | --- |
| Expo / React Native | Verified |

## 10. Examples

**Input:** "Create a settings screen."

**Output:**
Consults `UI-GUIDE.md`. Uses `expo-router` for navigation, a `ScrollView` for the root element, `expo-image` for avatars, and native semantic colors for the background and text. No Tailwind is used.
