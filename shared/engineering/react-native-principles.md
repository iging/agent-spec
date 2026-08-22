---
name: React Native Principles
description: Normative foundation for React Native and Expo apps covering architecture posture, platform boundaries, rendering discipline, list and image policies, storage security, and accessibility mapping.
---

# React Native Principles

> **Purpose:** Cross-cutting rules for any agent generating or modifying React Native or Expo code. Reference this file before writing mobile UI logic. Library deep-dives live in `modules/mobile-react-native/react-native-best-practices/` and are authoritative for Reanimated, Gesture Handler, SVG, Audio, JSI, and on-device AI specifics. Visual outcomes follow `ui-ux-principles.md`; token vocabulary follows `design-tokens.md`.

---

## 1. Architecture Posture

- **Expo First:** Build with the current Expo SDK (SDK 57 or later). Use config plugins and `app.json` for native configuration. Never hand-edit Gradle or Xcode project files when a config plugin exists.
- **New Architecture Mandatory:** Target SDK 55 or later where the New Architecture cannot be disabled. Never write code against the legacy architecture. It was frozen in June 2025 and is stripped from release builds since React Native 0.84.
- **Strict TypeScript API:** On React Native 0.87 or later, import only through the public Strict TypeScript API. Deep imports into `react-native` internals are BANNED.
- **Runtime:** Assume Hermes V1 as the JavaScript engine. Do not ship JSC compatibility shims or engine-detection branches.

---

## 2. Platform Boundary Rules

- **No Web APIs:** `window`, `document`, `localStorage`, `navigator.userAgent`, and CSS strings do not exist at runtime. Their use is BANNED. Use `Platform.OS`, `Platform.select`, `.ios.tsx`/`.android.tsx` file splits, and community storage packages instead.
- **Yoga Layout Differences:** Flexbox defaults differ from web. `flexDirection` defaults to `column`. Numbers in styles are density-independent pixels, never raw device pixels. Percentages refer to the parent dimension.
- **Platform Splits:** Isolate truly divergent behavior behind `Platform.select` or platform-suffixed files. Never branch on device model or user-agent sniffing.

---

## 3. Rendering Discipline

- **Core Components Only:** Compose screens from `View`, `Text`, `Image`, `ScrollView`, and `Pressable`. Never render raw text outside a `Text` node. Never use `div`, `span`, `img`, or `onClick` props.
- **StyleSheet Discipline:** Define styles with `StyleSheet.create` at module scope. Inline object literals in JSX create new references every render and defeat memoization on list rows.
- **Safe Areas:** Consume insets through `react-native-safe-area-context`. Hardcoded top or bottom paddings are BANNED because they break on notched devices and system bars.

---

## 4. List Policy

- **FlashList Default:** Any list longer than roughly one screen uses `@shopify/flash-list` with an accurate `estimatedItemSize`. It recycles views like native UICollectionView and RecyclerView instead of mounting everything.
- **No `key` Inside Recycled Items:** A changing `key` prop on a list item or its children defeats recycling and destroys the performance benefit. Use stable identity or the helper utilities provided by FlashList.
- **FlatList Tuning:** If FlatList remains for short or variable-height lists, set `getItemLayout` when row height is fixed, cap `windowSize`, and hoist `renderItem` out of JSX wrapped in `useCallback`.
- **ScrollView Limits:** `ScrollView` renders every child at mount. It is BANNED for unbounded data sets.

---

## 5. Image Policy

- **expo-image Default:** Use `expo-image` with explicit width and height, `contentFit`, and a `cachePolicy`. Its aggressive caching and memory management fix the flicker and OOM problems of the built-in `Image`.
- **Right-Size Sources:** Never load full-resolution assets into thumbnails. Serve pre-sized variants from the server or CDN. Oversized images cause out-of-memory crashes on low-end Android devices.

---

## 6. Interaction and Animation Threading

- **One Touch System:** Pick one gesture system per app. Inside scrollable lists use Gesture Handler buttons (`Touchable` or `RectButton`) whose highlight waits for the OS press confirmation. Mixing React Native touchables with Gesture Handler in one tree causes double-tap conflicts and is BANNED.
- **Off the JS Thread:** Every user-visible animation runs through Reanimated worklets or the native driver. Blocking the JavaScript thread with visible animations drops frames. Route to `modules/mobile-react-native/react-native-best-practices/references/animations/` for patterns.
- **Touch Targets:** Interactive elements meet the 44 by 44 point minimum defined in `ui-ux-principles.md`, including icon-only controls.

---

## 7. Storage and Secrets

- **Secrets:** Tokens, keys, and credentials live only in `expo-secure-store` (Keychain or Keystore backed). Plain `AsyncStorage` for secrets is BANNED.
- **State Persistence:** Prefer MMKV for synchronous high-frequency state and AsyncStorage for simple async persistence. Match the access pattern to the data volume.

---

## 8. Accessibility Mapping

- **Roles and Labels:** Every tappable element declares `accessibilityRole` (for example `button`, `header`, `link`) and `accessibilityLabel` when visible text is absent. These map to the same outcomes as the WCAG rules in `ui-ux-principles.md`.
- **Screen Reader Order:** Keep component order equal to visual and logical reading order. Screen readers traverse the component tree, not pixel positions.

---

## 9. Source Notes

Verified against primary sources on 2026-08:

- Expo documentation, "React Native's New Architecture": mandatory from SDK 55, legacy frozen June 2025.
- React Native 0.84 announcement (February 2026): Hermes V1 default, legacy components removed from builds.
- React Native 0.87 announcement (August 2026): Strict TypeScript API becomes the default JavaScript API.
- Shopify FlashList documentation: recycling model, `estimatedItemSize` requirement, and the `key`-prop performance warning.
