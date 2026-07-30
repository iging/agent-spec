# Animations (Reanimated v4)

> [!IMPORTANT]  
> **Always use Reanimated v4 for all animations.** It runs directly on the UI thread, bypassing the JavaScript bridge entirely for buttery-smooth 120fps performance.

## Anti-Patterns (DO NOT DO THIS)

> [!WARNING]  
> **Never use the built-in React Native `Animated` API.** 
> It is deprecated in this architecture, prone to JS thread dropping frames, and lacks the Declarative hooks required for modern components. 
> 
> ❌ `import { Animated } from 'react-native';` (BANNED)
> ✅ `import Animated from 'react-native-reanimated';` (REQUIRED)

> [!CAUTION]
> **Never pass dynamic `Color` or `PlatformColor` values into Reanimated styles.** 
> Reanimated runs on the UI thread and cannot dynamically resolve `PlatformColor` natively on the fly during an animation. Use static hex/rgba colors for animated styles.

## Entering and Exiting Animations

Use `Animated.View` with `entering` and `exiting` animations. Layout animations smoothly animate state changes (like items shifting in a list) automatically.

```tsx
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";

function App() {
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      layout={LinearTransition} // Smoothly animates layout shifts
    />
  );
}
```

## On-Scroll Animations

Create high-performance scroll animations using Reanimated's hooks. 

> [!TIP]
> **Why `interpolate`?** It maps a scroll offset (like `0` to `100` pixels) to a style value (like `opacity` `0` to `1`). Always use the `"clamp"` parameter to prevent values from exceeding your bounds when the user over-scrolls (rubber-banding).

```tsx
import Animated, {
  useAnimatedRef,
  useScrollViewOffset,
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";

function Page() {
  const ref = useAnimatedRef();
  const scroll = useScrollViewOffset(ref);

  const style = useAnimatedStyle(() => ({
    opacity: interpolate(
      scroll.value, 
      [0, 30], // Input: Scroll pixel offset
      [0, 1],  // Output: Opacity
      "clamp"  // Boundary constraint
    ),
  }));

  return (
    <Animated.ScrollView ref={ref}>
      <Animated.View style={style} />
    </Animated.ScrollView>
  );
}
```

## Common Animation Presets

### Entering Animations
- `FadeIn`, `FadeInUp`, `FadeInDown`, `FadeInLeft`, `FadeInRight`
- `SlideInUp`, `SlideInDown`, `SlideInLeft`, `SlideInRight`
- `ZoomIn`, `ZoomInUp`, `ZoomInDown`
- `BounceIn`, `BounceInUp`, `BounceInDown`

### Exiting Animations
- `FadeOut`, `FadeOutUp`, `FadeOutDown`, `FadeOutLeft`, `FadeOutRight`
- `SlideOutUp`, `SlideOutDown`, `SlideOutLeft`, `SlideOutRight`
- `ZoomOut`, `ZoomOutUp`, `ZoomOutDown`
- `BounceOut`, `BounceOutUp`, `BounceOutDown`

### Layout Animations
- `LinearTransition` — Smooth linear interpolation (Best default for lists)
- `SequencedTransition` — Sequenced property changes
- `FadingTransition` — Fade between states

## Customizing Animations

You can chain modifiers to fine-tune presets:

```tsx
<Animated.View
  entering={FadeInDown.duration(500).delay(200)}
  exiting={FadeOut.duration(300)}
/>
```

### Modifiers

```tsx
// Duration in milliseconds
FadeIn.duration(300);

// Delay before starting
FadeIn.delay(100);

// Spring physics (Preferred for natural movement)
FadeIn.springify();
FadeIn.springify().damping(15).stiffness(100);

// Chaining
FadeInDown.duration(400).delay(200).springify();
```

## Shared Value Animations

For imperative control over animations (e.g. triggering an animation on a button press):

```tsx
import {
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const offset = useSharedValue(0);

// Spring animation (Natural, physics-based)
offset.value = withSpring(100);

// Timing animation (Strict duration)
offset.value = withTiming(100, { duration: 300 });

// Use in styles
const style = useAnimatedStyle(() => ({
  transform: [{ translateX: offset.value }],
}));
```

## Gesture Animations

Combine with React Native Gesture Handler for interactive drag/swipe UIs:

```tsx
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

function DraggableBox() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY;
    })
    .onEnd(() => {
      // Snap back to origin on release
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    });

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.box, style]} />
    </GestureDetector>
  );
}
```

## Keyboard Animations

Animate UI elements (like chat inputs) smoothly alongside the keyboard:

```tsx
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from "react-native-reanimated";

function KeyboardAwareView() {
  const keyboard = useAnimatedKeyboard();

  const style = useAnimatedStyle(() => ({
    paddingBottom: keyboard.height.value,
  }));

  return <Animated.View style={style}>{/* content */}</Animated.View>;
}
```

## Staggered List Animations

Animate list items with escalating delays for a "cascade" effect:

```tsx
{
  items.map((item, index) => (
    <Animated.View
      key={item.id}
      entering={FadeInUp.delay(index * 50)} // 50ms stagger per item
      exiting={FadeOutUp}
    >
      <ListItem item={item} />
    </Animated.View>
  ));
}
```

## Best Practices

- **Avoid animating layout properties** (like `width`, `height`, `top`, `left`). These trigger expensive layout recalculations. Always prefer animating `transform` (e.g. `scale`, `translateX`) or `opacity`.
- **Keep it snappy:** Keep timing animations under 300ms for a responsive feel.
- **Prefer Springs:** Use `withSpring` or `.springify()` over linear timings for natural, organic movement.
- **Always add layout animations** (`layout={LinearTransition}`) when items are added/removed from lists to prevent jarring snaps.
