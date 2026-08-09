# Core Principles

This document defines the foundational routing, workflow, and quality standards for frontend design tasks.

## Design Modes

Frontend design tasks fall into one of four modes. Determine the mode based on the requested surface and its primary goal.

- **Persuade:** The visitor must decide and act (e.g., landing pages, marketing, pricing). Design is the product. Focus on earning attention and clear calls to action.
- **Operate:** The visitor must complete a task (e.g., app UI, dashboards, admin panels). Focus on scanability, consistency, and native expectations.
- **Read:** The visitor must understand information (e.g., docs, guides, changelogs). Structure for comprehension and clear typography.
- **Experience:** The visitor explores the work itself (e.g., portfolios, galleries). Let the artifact lead; the interface recedes.

## Project Context and Routing

Before executing a design task, determine the current state of the project's visual identity.

1. **Review existing context:** Analyze `DESIGN.md`, tokens, components, and current assets.
2. **Determine the approach:**
   - **Established Identity:** Inherit the existing visual world. Do not invent a replacement unless explicitly requested.
   - **Incomplete Identity:** Preserve confirmed assets and recognizable traits, then expand the system.
   - **No Visual Authority (Greenfield):** Create a new visual world based on the product's mechanism, audience, and cultural context.
   - **Redesign:** Preserve product truth and constraints, but replace the old visual world entirely rather than polishing it.

## Quality Standards

Apply these checks to the built result during the inspection phase.

- **Contrast:** Maintain body and placeholder text at >=4.5:1, large text at >=3:1.
- **Depth:** Shadows must carry an offset and a soft blur. A zero-offset colored halo is decoration, not depth.
- **Spacing:** Group related items tightly and separate distinct items generously. Use more space above a heading than below it.
- **Typography:** Keep body measure at 65-75 characters. Ensure balanced headings and obvious scale steps.
- **Motion:** Apply exponential ease-out from an already-visible default. Convey state changes and feedback, not decoration.
- **States:** Implement hover, disabled, loading, error, and empty states.
- **Browser Defaults:** Theme native browser elements (text selection, scrollbars, focus rings) from the project palette.
- **Copy:** Use the product's own language. Ensure controls name their action clearly.

## Anti-Patterns

Avoid these common defaults unless explicitly required by the project brief:

- Gradient text for emphasis (use weight or size instead).
- Glass and blur used purely as decoration.
- Section numbers (01 / 02 / 03) when the sequence carries no structural meaning.
- Meaningless kickers or eyebrows above headings.
- Modals for tasks that do not require protected focus.
- Monospace fonts used as a visual costume for "technical" themes rather than for actual code or data.
- System display fonts (Arial Black, Impact) as the primary voice of a custom brand.
