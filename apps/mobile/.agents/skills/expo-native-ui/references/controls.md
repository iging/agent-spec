# Native Controls

> [!IMPORTANT]  
> **Always use Native iOS/Android controls.** They provide built-in haptics, OS-level accessibility, and automatically adapt their styling to the user's system preferences (like Dark Mode).

## Anti-Patterns (DO NOT DO THIS)

> [!WARNING]  
> **Never use the legacy React Native Picker.**
> It was removed from core React Native. Use `@react-native-picker/picker`.
>
> **Never try to build a custom Switch or Slider.**
> Do not recreate complex interactive components using `PanResponder` and `Animated`. Native `Switch` and `Slider` components have zero-latency touch tracking and system-standard hit slop that JS cannot replicate.

> [!CAUTION]
> **Never hardcode generic color palettes into Native Controls.**
> Avoid overriding default properties like `trackColor` unless absolutely dictated by branding. Native controls automatically adapt to system Dark Mode and high-contrast accessibility settings. Hardcoding colors will break these OS-level features.

## Switch

Use for binary on/off settings. Has built-in haptics out of the box.

```tsx
import { Switch } from "react-native";
import { useState } from "react";

function SettingRow() {
  const [enabled, setEnabled] = useState(false);

  return <Switch value={enabled} onValueChange={setEnabled} />;
}
```

## Segmented Control

Use for non-navigational tabs or mode selection.

> [!TIP]
> **Why not tabs?** Segmented controls are strictly for filtering the _current_ view's data, not for deep navigation. If tapping an option changes the entire screen's layout or pushes a route, use a Tab Navigator instead.

```tsx
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { useState } from "react";

function FilterBar() {
  const [index, setIndex] = useState(0);

  return (
    <SegmentedControl
      values={["All", "Active", "Done"]}
      selectedIndex={index}
      onChange={({ nativeEvent }) => setIndex(nativeEvent.selectedSegmentIndex)}
    />
  );
}
```

### Segmented Control Rules

- **Maximum 4 options** — If you have 5+, use a `<Picker>`.
- **Keep labels short** — 1 to 2 words max.

### With Icons (iOS 14+)

```tsx
<SegmentedControl
  values={[
    { label: "List", icon: "list.bullet" },
    { label: "Grid", icon: "square.grid.2x2" },
  ]}
  selectedIndex={index}
  onChange={({ nativeEvent }) => setIndex(nativeEvent.selectedSegmentIndex)}
/>
```

## Date/Time Picker

Compact pickers with popovers. Features built-in system haptics.

```tsx
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";

function DateSelector() {
  const [date, setDate] = useState(new Date());

  return (
    <DateTimePicker
      value={date}
      onChange={(event, selectedDate) => {
        if (selectedDate) setDate(selectedDate);
      }}
      mode="datetime"
    />
  );
}
```

### Display Styles

```tsx
// Compact inline (default - recommended for modern iOS)
<DateTimePicker value={date} mode="date" />

// Spinner wheel (Legacy iOS feel)
<DateTimePicker
  value={date}
  mode="date"
  display="spinner"
  style={{ width: 200, height: 150 }}
/>

// Full calendar
<DateTimePicker value={date} mode="date" display="inline" />
```

### Advanced Props

```tsx
// Force 15-minute intervals for cleaner scheduling
<DateTimePicker value={date} mode="time" minuteInterval={15} />

// Restrict bounds
<DateTimePicker
  value={date}
  mode="date"
  minimumDate={new Date(2020, 0, 1)}
  maximumDate={new Date(2030, 11, 31)}
/>
```

## TextInput

Native text input with various keyboard types.

> [!IMPORTANT]
> Always define the correct `keyboardType`. This ensures the OS shows the number pad for phone numbers and adds the "@" symbol for emails, drastically improving conversion rates.

```tsx
import { TextInput } from "react-native";

// Email
<TextInput keyboardType="email-address" autoCapitalize="none" />

// Phone
<TextInput keyboardType="phone-pad" />

// Number
<TextInput keyboardType="numeric" />

// Password
<TextInput secureTextEntry />

// Search
<TextInput
  returnKeyType="search"
  enablesReturnKeyAutomatically
/>
```

### Multiline Text Area

```tsx
<TextInput
  multiline
  numberOfLines={4}
  textAlignVertical="top" // Required for Android alignment
  style={{ minHeight: 100 }}
/>
```

## Picker (Wheel)

For selection from many options (5+ items).

```tsx
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";

function LanguagePicker() {
  const [selected, setSelected] = useState("js");

  return (
    <Picker selectedValue={selected} onValueChange={setSelected}>
      <Picker.Item label="JavaScript" value="js" />
      <Picker.Item label="TypeScript" value="ts" />
      <Picker.Item label="Python" value="py" />
    </Picker>
  );
}
```

## Overall Best Practices

- **Haptics**: `Switch` and `DateTimePicker` have built-in OS haptics — do not attach `expo-haptics` to their `onChange` events or you will trigger double-buzzing.
- **Accessibility**: Native controls have proper accessibility traits by default. Only add `accessibilityLabel` if the control's purpose isn't obvious from adjacent text.
- **Spacing**: Use consistent padding around controls (12-16pt minimum) to ensure they meet the Apple HIG hit-target size (44x44pt).
- **Labels**: Place descriptive text above or to the left of controls, never below them.
