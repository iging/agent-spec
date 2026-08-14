# DESIGN — Design & Output Conventions (React Native / Expo)

> **Purpose:** Define visual/brand identity, React Native layout/component semantics, design tokens, and accessibility conventions for `apps/mobile/`. Grounded in `context/DESIGN.md` and aligned with Material 3 + Apple HIG standards.

_Last updated: 2026-07-22_

---

## 1. Brand Identity & Art Direction

- **Brand Voice:** Professional, modern, polished mobile experience.
- **Visual Aesthetic:** Modern, polished mobile app UI with native feel, responsive 4-pt grid scaling, and accessible component semantics.
- **Design Philosophy:** Native-first UX with platform-appropriate interactions (iOS/Android). Prioritize performance, accessibility, and fluid animations over visual complexity.

---

## 2. Color Palette & Semantic Tokens

- **Design Token Structure:** Centralized `palette` object supporting mirror light and dark theme maps for seamless theme switching.
- **Standard Semantic Token Keys:**
  - Base Surfaces: `background`, `foreground`, `surface`, `onSurface`
  - Brand Accent: `primary`, `onPrimary`, `muted`, `mutedForeground`, `border`
  - Semantic States: `success`, `warning`, `info`, `danger`

---

## 3. Theme Variants (Light / Dark / Custom)

- **Dark Mode Support:** Dynamic theme switching using Expo's `useColorScheme()` or theme provider. Maintain WCAG AA contrast targets across both light and dark palette variants.

---

## 4. Typography Scale & Font Stack

- **Font Stack:** Scalable font system matching platform standards (SF Pro on iOS, Roboto on Android).
- **Typography Ramp (`TypographyVariant`):** Role-based type scale (`caption`, `small`, `body`, `bodyLg`, `subtitle`, `title`, `display`, `hero`).
- **Legibility Standard:** Maintain line-heights around 1.4x–1.5x font size for body copy per Apple HIG & Google Material guidelines.
- **Typography Primitives:** Do not apply raw inline font styles across scattered `<Text>` elements. Encapsulate styling and semantics inside reusable design system primitives (e.g. `<Heading level={1}>`, `<Text variant="body">`, `<Text variant="caption">`).

---

## 5. Spacing, Grid & Layout System

- **Mandatory Responsive Sizing Utility (`apps/mobile/src/utils/styling.ts`):**
  All responsive spacing and dimension calculations MUST use `{ scale, verticalScale }` imported from `@/utils/styling` (`kebab-case` file naming). If this file does not exist, create it with this exact implementation:

  ```ts
  import { Dimensions, PixelRatio } from "react-native";

  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
    Dimensions.get("window");

  const [shortDimension, longDimension] =
    SCREEN_WIDTH < SCREEN_HEIGHT
      ? [SCREEN_WIDTH, SCREEN_HEIGHT]
      : [SCREEN_HEIGHT, SCREEN_WIDTH];

  const guidelineBaseWidth = 375;
  const guidelineBaseHeight = 812;

  export const scale = (size: number) =>
    Math.round(
      PixelRatio.roundToNearestPixel(
        (shortDimension / guidelineBaseWidth) * size,
      ),
    );

  export const verticalScale = (size: number) =>
    Math.round(
      PixelRatio.roundToNearestPixel(
        (longDimension / guidelineBaseHeight) * size,
      ),
    );
  ```

- **Responsive 4-pt Grid System (`scale` & `verticalScale`):**
  - **Reference Guideline Viewport:** Based on standard 375x812pt reference viewport (iPhone 12 / standard logical mobile width).
  - **Orientation-Stable Scaling:** Sort dimensions into `shortDimension` (width in portrait) and `longDimension` (height in portrait) so scaling stays stable during device rotation instead of jumping.
  - **Sub-Pixel Protection:** Use `PixelRatio.roundToNearestPixel` and `Math.round()` to prevent fractional sub-pixel rendering bugs and fuzzy borders on Android devices.
  - **Tablet & Foldable Capping (Moderate Scale):** Cap the scaling factor at `1.5x` on large tablets/foldables to prevent UI elements from becoming unnaturally oversized. 
  - **Large Screen Edge Case:** On wide foldables or landscape tablets (when `shortDimension > 600`), capping scale is not enough. The UI will look awkwardly stretched. In these cases, switch structural primitives: instead of a single full-width `<View>`, use a multi-column CSS grid (via NativeWind `grid-cols-2`) or enforce a `maxWidth: 600, alignSelf: 'center'` on the primary content container.
- **Horizontal Spacing (`horizontalSpacing`):** Scaled on X-axis (`none`: 0, `extraSmall`: 4, `small`: 8, `medium`: 12, `large`: 16 [standard page edge padding], `extraLarge`: 20, `extraExtraLarge`: 24, `huge`: 32, `extraHuge`: 40, `massive`: 48, `extraMassive`: 64, `hero`: 80, `extraHero`: 96).
- **Vertical Spacing (`verticalSpacing`):** Scaled on Y-axis to match vertical screen rhythm independently of width.
- **Structural Primitives & Containers:**
  - `<SafeAreaView>` / `useSafeAreaInsets()` (`react-native-safe-area-context`): Top-level screen wrappers to avoid notch, status bar, and home indicator overlap.
  - `<ScrollView>`: For small, scrollable content screens with static list items.
  - `<FlatList>` / `<FlashList>` / `<SectionList>`: For dynamic, virtualized data lists (see detailed rules below).
  - `<View>`: For structural layout blocks, rows, and card containers.
- **Core Component Selection & Best Practices:**
  - **Touches & Pressables:** ALWAYS use `<Pressable>` for interactive elements (`accessibilityRole="button"`). Avoid legacy touchables (`TouchableOpacity`, `TouchableHighlight`, `TouchableWithoutFeedback`, `TouchableNativeFeedback`) to ensure future-proof press state feedback, `hitSlop`, and cross-platform ripple support.
  - **Render Optimization & List Virtualization:** Wrap expensive list items in React Native `<FlatList>` or Shopify `<FlashList>` with `getItemLayout` or estimated item sizes to maintain smooth 60fps scrolling. Use `<SectionList>` for categorized data. Avoid wrapping large lists in vertical `<ScrollView>`s, and NEVER nest a vertical `<FlatList>` inside a vertical `<ScrollView>` (prevents scroll conflict crashes). Always provide `keyExtractor` and `<RefreshControl>` for pull-to-refresh.
  - **Notch & Safe Area Guards:** ALWAYS use `react-native-safe-area-context` (`SafeAreaProvider`, `<SafeAreaView>`, or `useSafeAreaInsets()`) instead of the basic React Native `<SafeAreaView>` to avoid Android notch and status bar bugs. Never hardcode static safe area paddings or margins.
  - **Keyboard Avoidance:** Wrap form screens in `<KeyboardAvoidingView>` with `behavior={Platform.OS === 'ios' ? 'padding' : 'height'}` so soft keyboards do not obscure `<TextInput>` fields.
  - **Images & Backgrounds:** Prefer `expo-image` or `<Image>` with explicit width/height styles and `contentFit` / `resizeMode`. Use `<ImageBackground>` ONLY when layering interactive child components over a background image.
  - **Modals & Overlays:** Use `<Modal>` with `animationType="slide"` or `"fade"`, providing `onRequestClose` for Android back-button handling.
  - **Typography & Inputs:** Wrap text in design system primitives (`<Text>`, `<Heading>`). Configure `<TextInput>` with `autoCapitalize="none"`, `autoCorrect={false}`, `placeholderTextColor`, and explicit `keyboardType`.
  - **Status Bar & Loading:** Use `expo-status-bar` for status bar styling. Use `<ActivityIndicator>` for inline loading spinners.
  - **Cross-Platform Drawer Navigation:** Avoid Android-only components like `DrawerLayoutAndroid`; use Expo Router or `@react-navigation/drawer` for cross-platform drawer navigation.

---

## 6. Border Radius, Elevation & Borders

- **Fixed Corner Radii (`cornerRadius`):** Plain pt values (non-scaling) so radii look identical on phones and tablets without distorting into ovals:
  - `none`: 0, `extraSmall`: 4, `small`: 8, `medium`: 12 (default for cards & buttons), `large`: 16, `extraLarge`: 20, `extraExtraLarge`: 24, `huge`: 28, `fullyRounded`: 9999 (pill buttons & avatars).
- **Borders & Dividers:** Defined via theme token `border`.

---

## 7. Shadows, Motion & Animations

- **Material 3 & Apple Cross-Platform Elevation (`shadowElevation`):** 6-tier elevation maps supporting both Android `elevation` and iOS `shadowColor`/`shadowOffset`/`shadowOpacity`/`shadowRadius` props:
  - `flat` (elevation 0)
  - `raisedSubtly` (elevation 1, radius 2)
  - `raisedAsCard` (elevation 3, radius 6)
  - `raisedAsButton` (elevation 6, radius 12)
  - `floatingPanel` (elevation 8, radius 16)
  - `floatingDialog` (elevation 12, radius 24)
- **Animations & Gestures:** Execute UI thread animations and gestures using `react-native-reanimated` and `react-native-gesture-handler`. Do not run layout animations on the JS main thread.
- **Animation Duration Tokens:**
  - Fast: 150ms (micro-interactions, button press feedback)
  - Medium: 300ms (screen transitions, modals)
  - Slow: 500ms (complex layout shifts, page transitions)
- **Easing Curves:** Use `Easing.bezier(0.4, 0, 0.2, 1)` (Material standard) as default. Use `Easing.out(Easing.cubic)` for enter animations and `Easing.in(Easing.cubic)` for exit animations.

---

## 8. Accessibility Guidelines

- **Tap Target Sizes (`tapTargetSize`):**
  - Minimums: iOS 44pt (`iosMinimum`), Android 48pt (`androidMinimum`).
  - Recommended Default: 48pt (`recommended`) scaled via `scale()` to cover both Apple HIG and Google Material 3 guidelines.
  - Generous Targets: `comfortable` (56pt), `spacious` (72pt).
- **Conformance Target:** Mobile Accessibility Standards (iOS VoiceOver & Android TalkBack) + WCAG 2.2 AA.
- **Accessibility Roles (`accessibilityRole` / `role`):**
  - `accessibilityRole="header"` + `aria-level={1..6}` for screen and section headings.
  - `accessibilityRole="button"` for interactive touchables (`<Pressable>`).
  - `accessibilityRole="link"` for in-app or external URL navigation.
  - `accessibilityRole="image"` for visual assets paired with a descriptive `accessibilityLabel`.
  - `accessibilityRole="search"`, `"summary"`, `"menu"`, `"tab"`, `"alert"` for structured screen regions.
- **Labels & Hints:** Always provide `accessibilityLabel` for icon-only buttons and `accessibilityHint` for complex interactions.
- **Testing:** Test screens using iOS VoiceOver, Android TalkBack, and Expo accessibility tools.

---

## 9. Component Style Rules

- **Single Source of Truth (SSOT):** Centralized design tokens (e.g., `@/theme/tokens`) serve as the universal SSOT for both React Native `StyleSheet.create` and NativeWind (`tailwind.config.js`).
- **Pure `StyleSheet` Integration:** Import token objects directly into `StyleSheet.create` or compose style arrays (e.g., `style={[shadowElevation.raisedAsCard, { paddingHorizontal: horizontalSpacing.large, borderRadius: cornerRadius.medium }]}`).
- **NativeWind Integration:** Map token values (`cornerRadius`, `spacing`, `palette`) into `tailwind.config.js` theme extensions for `className` usage (`className="bg-surface rounded-medium p-large"`). Combine utility classes with shadow elevation objects via `style={shadowElevation.raisedAsCard}`.
- **Render Cycle Optimization:** Declare `StyleSheet.create` objects outside component render functions to maintain reference stability and avoid re-allocations on render.
- **Component State Matrix:**
  - **Buttons:** Primary/secondary/ghost variants with distinct pressed (`opacity: 0.7`), disabled (`opacity: 0.4`), and loading (`<ActivityIndicator>` replacing label) states.
  - **Form Inputs:** Consistent label placement, placeholder styling, error border + message pattern, and focus ring highlighting.
  - **Cards:** Elevation-based visual hierarchy using `shadowElevation` tokens with consistent `cornerRadius.medium` rounding.

---

## 10. Product Tour & Interaction Patterns

- **Toast Notifications:** Positioned at screen bottom-center with auto-dismiss (3–5s). Include swipe-to-dismiss gesture. Use `react-native-toast-message` or equivalent.
- **Modal Overlays:** Standardized modal overlays with `floatingPanel` and `floatingDialog` shadow elevations.
- **Onboarding / Product Tour:** Step-by-step tooltip overlays highlighting key features during first-time app launch.

---

## 11. Output Conventions (Non-UI Projects)

- N/A for Mobile UI App.
