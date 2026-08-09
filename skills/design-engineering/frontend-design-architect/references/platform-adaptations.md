# Platform Adaptations

This document outlines the specific requirements for adapting designs to different platforms and screen sizes.

## Responsive Web

Ensure the interface adapts fluidly to the user's viewport.

- **Breakpoints:** Design for standard ranges (mobile, tablet, desktop) rather than specific device widths.
- **Fluidity:** Use relative units (rem, vw, %) for container sizing where appropriate, but rely on structural changes (e.g., collapsing sidebars, stacking columns) rather than purely fluid typography for app UIs.
- **Touch Targets:** Ensure interactive elements on touch devices are at least 44x44pt and adequately spaced to prevent misclicks.

## Native Mobile (iOS)

Respect the iOS human interface guidelines.

- **Navigation:** Use standard iOS navigation bars and tab bars. Do not mimic Android bottom navigation patterns.
- **Affordances:** Use standard iOS components (switches, action sheets, segmented controls) unless the brand dictates a completely custom interface.
- **Gestures:** Ensure edge-swipe to go back is preserved and never blocked by custom interactions.
- **Safe Areas:** Respect safe area insets for notches, dynamic islands, and the home indicator.

## Native Mobile (Android)

Respect Material Design 3 guidelines for Android applications.

- **Navigation:** Use the navigation bar (bottom, 3-5 destinations) for compact screens. Use a navigation rail or drawer for expanded screens.
- **Affordances:** Use standard Material components (floating action buttons, snackbars, standard dialogs). Do not force iOS patterns (like Cupertino switches) onto Android.
- **System Back:** Ensure the design respects the system-level back button/gesture.
- **Theming:** Express brand through Material Design's theming system (color roles, type scale, shape), not by fighting the structural components.
