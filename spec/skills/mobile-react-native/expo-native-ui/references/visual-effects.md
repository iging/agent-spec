# Visual Effects

> [!IMPORTANT]  
> **Always use `systemMaterial` tints for Blur Views.** This ensures the blur effect automatically adapts its styling when the user switches between Light Mode and Dark Mode.

## Anti-Patterns (DO NOT DO THIS)

> [!WARNING]  
> **Never nest `<BlurView>` components inside each other.**
> Rendering a blur requires the OS to capture the view hierarchy beneath it and run an expensive Gaussian blur shader. Nesting blurs exponentially degrades frame rates.

> [!CAUTION]
> **Never use legacy React Native `elevation` or `shadow*` props.**
> Use the modern CSS `boxShadow` prop (e.g., `boxShadow: "0 1px 2px rgba(0,0,0,0.1)"`), which correctly interprets web-standard shadows across platforms on the New Architecture.

## Backdrop Blur (`expo-blur`)

Use `expo-blur` to create frosted glass effects.

```tsx
import { BlurView } from "expo-blur";

<BlurView tint="systemMaterial" intensity={100} />;
```

### Tint Options

```tsx
// System materials (Automatically adapt to light/dark mode - REQUIRED)
<BlurView tint="systemMaterial" />
<BlurView tint="systemThinMaterial" />
<BlurView tint="systemUltraThinMaterial" />
<BlurView tint="systemThickMaterial" />
<BlurView tint="systemChromeMaterial" /> // Best for Bottom Tabs

// Basic tints (Avoid unless strictly required by design)
<BlurView tint="light" />
<BlurView tint="dark" />
```

### Rounded Corners on Blurs

> [!TIP]
> **Why `overflow: 'hidden'`?** `BlurView` does not respect `borderRadius` natively because it is drawing a texture. You must clip the bounds manually.

```tsx
<BlurView
  tint="systemMaterial"
  intensity={100}
  style={{
    borderRadius: 16,
    overflow: "hidden", // REQUIRED for rounded corners to work
  }}
/>
```

## Glass Effects (`expo-glass-effect` for iOS 26+)

Use `expo-glass-effect` for the new Apple "liquid glass" backdrops.

```tsx
import { GlassView } from "expo-glass-effect";

<GlassView style={{ borderRadius: 16, padding: 16 }}>
  <Text>Content inside glass</Text>
</GlassView>;
```

### Interactive Glass Buttons

Add `isInteractive` so the glass reacts to touches and press states correctly.

```tsx
import { GlassView } from "expo-glass-effect";
import { SymbolView } from "expo-symbols"; // Or lucide-react-native
import { colors } from "@/theme/colors";

function GlassButton({ icon, onPress }) {
  return (
    <GlassView isInteractive style={{ borderRadius: 50 }}>
      <Pressable style={{ padding: 12 }} onPress={onPress}>
        <SymbolView name={icon} tintColor={colors.label} size={24} />
      </Pressable>
    </GlassView>
  );
}
```

### Checking Availability & Fallbacks

Since `expo-glass-effect` relies on extremely modern OS APIs, you must provide a fallback for older devices or Android.

```tsx
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";
import { BlurView } from "expo-blur";

function AdaptiveGlass({ children, style }) {
  if (isLiquidGlassAvailable()) {
    return <GlassView style={style}>{children}</GlassView>;
  }

  // Fallback for Android and older iOS devices
  return (
    <BlurView
      tint="systemMaterial"
      intensity={80}
      style={[style, { overflow: "hidden" }]}
    >
      {children}
    </BlurView>
  );
}
```

## Sheet with Glass Background (Expo Router)

You can apply the liquid glass effect directly to the background of an Expo Router Modal Sheet:

```tsx
<Stack.Screen
  name="sheet"
  options={{
    presentation: "formSheet",
    sheetGrabberVisible: true,
    sheetAllowedDetents: [0.5, 1.0],
    contentStyle: { backgroundColor: "transparent" }, // Allows the glass to show through
  }}
/>
```
