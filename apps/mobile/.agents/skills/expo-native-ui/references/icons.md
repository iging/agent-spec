# Icons (Lucide React Native)

React Native components for Lucide icons that work seamlessly across iOS and Android platforms. Built on top of `react-native-svg`, each icon renders as a native SVG component, providing consistent visual appearance and performance across mobile devices.

## What you can accomplish:

- Use icons as React Native components with platform-consistent rendering
- Build cross-platform mobile apps with scalable vector icons
- Create responsive interfaces that adapt to different screen densities
- Integrate with React Native's styling system and animation libraries
- Maintain consistent icon appearance across iOS and Android platforms

## Installation

First, ensure that you have `react-native-svg` installed. Then, install the package:

```bash
npx expo install react-native-svg
npm install lucide-react-native
```

## How to use

Each icon can be imported as a React component.

```tsx
import { Camera } from "lucide-react-native";

const App = () => {
  return <Camera color="red" size={48} />;
};

export default App;
```

### Props

| name                  | type      | default        |
| --------------------- | --------- | -------------- |
| `size`                | `number`  | `24`           |
| `color`               | `string`  | `currentColor` |
| `strokeWidth`         | `number`  | `2`            |
| `absoluteStrokeWidth` | `boolean` | `false`        |

### Applying props

To customize the appearance of an icon, you can pass custom properties as props directly to the component. The component accepts all SVG attributes as props, which allows flexible styling of the SVG elements.

```tsx
const App = () => {
  return <Camera fill="red" />;
};
```

## With Lucide Lab or custom icons

Lucide Lab is a collection of icons that are not part of the Lucide main library. They can be used by using the `Icon` component.

```tsx
import { Icon } from "lucide-react-native";
import { coconut } from "@lucide/lab";

const App = () => <Icon iconNode={coconut} />;
```

## Anti-Pattern: One generic icon component

It is possible to create one generic icon component to load icons, but it is **NOT recommended**.

> **WARNING**
> Importing all ES Modules via `import * as icons from 'lucide-react-native/icons'` will significantly increase the build size of the application, negatively affecting its performance due to lack of tree-shaking.

**DO NOT DO THIS:**

```tsx
import * as icons from "lucide-react-native/icons"; // TERRIBLE FOR PERFORMANCE

interface IconProps {
  name: keyof typeof icons;
  color?: string;
  size?: number;
}

const Icon = ({ name, color, size }: IconProps) => {
  const LucideIcon = icons[name];
  return <LucideIcon color={color} size={size} />;
};
```
