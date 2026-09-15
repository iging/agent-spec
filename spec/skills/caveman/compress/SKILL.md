---
name: caveman-compress
description: >-
  Compress natural language Markdown documents to reduce input token consumption.
version: 1.0.0
---

# Caveman Document Compressor

## 0. Identity

- **Role:** Markdown documentation compression engine under `spec/skills/caveman/`.
- **Authority:** Sub-skill of `spec/skills/caveman/`.
- **Must not define:** Normative tier-4 standards in `spec/core/`.
- **Normative base:** `core/instruction-hierarchy.md`, `shared/writing/writing-rules.md`.

---

## 1. Directives

### What to Strip

- Conversational pleasantries and preambles.
- Filler words: `really`, `basically`, `actually`, `simply`, `essentially`.
- Articles where meaning remains clear: `a`, `an`, `the`.
- Hedging phrases: "it might be worth considering", "one could potentially".
- Connective padding: "furthermore", "in addition to this".

### What to Keep Verbatim

- Fenced code blocks and inline code spans.
- URLs, relative links, and anchor tags.
- Directory trees and file paths.
- Terminal commands and CLI parameters.
- Numbers, units, dates, and version identifiers.
- Markdown headers and table structures.
