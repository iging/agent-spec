# Refinement

This document provides guidelines for refining and polishing an existing interface. Use these strategies when the foundational structure is correct but the execution needs adjustment.

## Polish

A polish pass addresses execution gaps between intention and code.

- **Alignment:** Ensure strict grid adherence. Check for off-by-one pixel errors in padding and margins.
- **Hierarchy:** Verify that primary, secondary, and tertiary elements are visually distinct.
- **Consistency:** Ensure identical components share the same styling. Fix divergent button radii, input heights, or font weights.
- **Browser Overrides:** Theme native browser elements (scrollbars, selection color) to match the palette.

## Adjusting Volume

Sometimes an interface is too loud or too quiet. Adjust the visual volume intentionally.

### Bolder (Amplifying)

Use when a design feels safe, bland, or lacks conviction.

- Increase the scale contrast between headings and body text.
- Deepen shadow offsets for stronger depth.
- Use a saturated brand color for large background regions rather than just small accents.
- Tighten negative space within components to increase density and impact.

### Quieter (Distilling)

Use when a design is overwhelming, noisy, or chaotic.

- Reduce color saturation on secondary elements.
- Remove borders and use background tints or white space to group elements.
- Soften shadow opacity and increase blur.
- Increase macro white space between major sections.
- Remove decorative kickers, gradient text, or unnecessary icons.

## Hardening

Hardening prepares a design for production edge cases.

- **Data Extremes:** Design for zero items, one item, and 1,000 items. Ensure long text truncates or wraps gracefully.
- **Internationalization (i18n):** Allow for 30% expansion in text length for localized strings. Avoid fixed-width containers for text.
- **Error States:** Ensure every form field and primary action has a defined error state with clear recovery instructions.
- **Loading States:** Provide skeleton screens or progressive loading indicators instead of blocking spinners.

## Onboarding and Empty States

First impressions matter. Do not leave empty states as blank screens.

- **Empty States:** Provide a clear illustration or icon, a concise explanation of what goes here, and a primary call-to-action to populate it.
- **Onboarding:** Use progressive disclosure. Guide the user through the first core task rather than showing a multi-screen tutorial modal.
