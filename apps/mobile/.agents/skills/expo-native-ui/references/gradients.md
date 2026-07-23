# CSS Gradients (New Architecture)

> [!IMPORTANT]  
> **New Architecture Only**: CSS gradients via `experimental_backgroundImage` require React Native's New Architecture (Fabric). They are not available in the old architecture or in the standard Expo Go app.

## Anti-Patterns (DO NOT DO THIS)

> [!WARNING]  
> **Never use `expo-linear-gradient`.** 
> It requires adding heavy native dependencies and React components just to draw a background. The New Architecture supports this natively at the C++ level via the `experimental_backgroundImage` style prop, which is drastically more performant.
> 
> ❌ `import { LinearGradient } from 'expo-linear-gradient';` (BANNED)
> ✅ `style={{ experimental_backgroundImage: 'linear-gradient(...)' }}` (REQUIRED)

> [!CAUTION]
> **Do not treat gradients as Objects.**
> Unlike older RN implementations, CSS gradients in Fabric are evaluated as pure strings. Do not attempt to pass an array of colors or object definitions.

## Linear Gradients

Define linear gradients using standard CSS syntax.

```tsx
// Top to bottom (Vertical)
<View style={{
  experimental_backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)'
}} />

// Left to right (Horizontal)
<View style={{
  experimental_backgroundImage: 'linear-gradient(to right, #ff0000 0%, #0000ff 100%)'
}} />

// Diagonal (Keywords)
<View style={{
  experimental_backgroundImage: 'linear-gradient(to bottom right, #ff0000 0%, #0000ff 100%)'
}} />

// Precise Angles (Degrees)
<View style={{
  experimental_backgroundImage: 'linear-gradient(135deg, transparent 0%, black 100%)'
}} />
```

## Radial Gradients

Radial gradients emanate from a center point outwards.

```tsx
// Circle at exact center
<View style={{
  experimental_backgroundImage: 'radial-gradient(circle at center, rgba(255, 0, 0, 1) 0%, rgba(0, 0, 255, 1) 100%)'
}} />

// Elliptical gradient
<View style={{
  experimental_backgroundImage: 'radial-gradient(ellipse at center, #fff 0%, #000 100%)'
}} />

// Offset positioning
<View style={{
  experimental_backgroundImage: 'radial-gradient(circle at top left, #ff0000 0%, transparent 70%)'
}} />
```

## Multiple Stacked Gradients

You can layer multiple gradients by comma-separating them. This is extremely useful for complex lighting effects or vignettes.

```tsx
<View
  style={{
    experimental_backgroundImage: `
      linear-gradient(to bottom, transparent 0%, black 100%),
      radial-gradient(circle at top right, rgba(255, 0, 0, 0.5) 0%, transparent 50%)
    `,
  }}
/>
```

## Common UI Patterns

### Image Overlay (Vignette)

Fade an image to black at the bottom so white text remains readable.

> [!TIP]
> **Why `inset: 0`?** Using `inset: 0` is a modern, concise replacement for `top: 0, left: 0, right: 0, bottom: 0`.

```tsx
<View style={{ position: "relative" }}>
  <Image source={{ uri: "..." }} style={{ width: "100%", height: 200 }} />
  <View
    style={{
      position: "absolute",
      inset: 0,
      experimental_backgroundImage:
        "linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 50%)",
    }}
  />
</View>
```

### Glossy Button

```tsx
<Pressable
  style={{
    experimental_backgroundImage:
      "linear-gradient(to bottom, #4CAF50 0%, #388E3C 100%)",
    padding: 16,
    borderRadius: 8,
  }}
>
  <Text style={{ color: "white", textAlign: "center" }}>Submit</Text>
</Pressable>
```

## Syntax Constraints
- Use `rgba()` for transparency gradients to avoid "gray out" interpolation bugs that can occur with `#hex`.
- The `transparent` keyword evaluates to `rgba(0,0,0,0)`.
- Always provide explicit color stop percentages (`0%`, `50%`, `100%`) for predictable rendering across different screen densities.
