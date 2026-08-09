# Workflow and Lifecycle

This document defines the lifecycle commands for managing a design task from inception to completion.

## Initialization

When starting a new project or surface, establish the baseline truth.

- **Product Truth:** Document the core purpose, audience, and mechanism.
- **Visual Truth:** Review existing `DESIGN.md`, tokens, and assets. Do not invent a new visual system if one is already established in code.

## Discovery and Shaping

Before writing code, shape the UX and UI.

- Define the primary user task and necessary states.
- Resolve information architecture and navigation before styling.
- Identify the appropriate design mode (Persuade, Operate, Read, Experience).

## Documentation and Extraction

Maintain the integrity of the design system over time.

- **Extract:** When a pattern repeats, extract it into a reusable component or design token.
- **Document:** Ensure `DESIGN.md` reflects the implemented reality, not outdated intentions. Update the documentation when new components or tokens are finalized.

## Live Iteration

When refining visual details, iterate directly in the browser environment when possible.

- Focus on micro-adjustments to spacing, color, and typography.
- Ensure any changes made during live iteration are ported back to the source files and `DESIGN.md`.
