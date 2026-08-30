# Enhancement

This document provides guidelines for enhancing a design through motion, typography, color, and layout.

## Motion and Animation

Motion should convey state, hierarchy, and context. It must never be purely decorative.

- **Purposeful:** Use motion to guide attention, confirm actions, or explain relationships (e.g., expanding a card to a detail view).
- **Duration:** Keep UI transitions short (150-250ms). Users are in flow and should not wait for choreography.
- **Easing:** Use exponential ease-out for elements entering the screen. Use ease-in for elements leaving.
- **Accessibility:** Respect `prefers-reduced-motion`. Provide snap-cuts or crossfades as fallbacks for complex animations.

## Typography

Typography establishes hierarchy and brand voice.

- **Scale:** Use a mathematical type scale (e.g., 1.125 or 1.2 ratio) for consistent sizing.
- **Contrast:** Ensure clear visual distinction between headings and body text through size, weight, or family.
- **Line Length:** Keep body text between 65 and 75 characters per line for optimal readability.
- **Selection:** Avoid system display fonts for custom brands. Use workhorse sans-serifs for complex UIs, reserving expressive fonts for large headings on marketing surfaces.

## Color

Color strategies must align with the mode and brand constraints.

- **Restrained:** Neutrals plus one accent color. Use this for 'Operate' or 'Read' modes.
- **Committed:** One saturated color carries 30-60% of the surface.
- **Semantic:** Ensure red, green, and yellow are reserved strictly for destructive, success, and warning states, respectively.
- **Accessibility:** Verify contrast ratios (4.5:1 for standard text) across all colored surfaces.

## Layout and Spatial Rhythm

Space is a structural element, not just emptiness.

- **Proximity:** Group related elements closely to imply relationship.
- **Rhythm:** Use a consistent base unit (e.g., 4px or 8px) for all margins and padding.
- **Hierarchy:** Use macro white space to separate distinct sections of a page.
- **Alignment:** Ensure elements align to a defined grid or common axis to reduce cognitive noise.
