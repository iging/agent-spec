---
name: caveman-compress
description: >-
  Compress natural language Markdown documentation to save input tokens
  while preserving code blocks, links, and technical specifications.
version: 1.0.0
---

# Caveman Document Compressor

## Role / Authority

- **Role:** Markdown documentation compression engine for agent-spec documentation.
- **Authority:** Sub-skill of `.agents/skills/caveman/`.
- **Must not define:** Normative tier-4 standards in `spec/core/`.

---

## 1. Purpose

Compress wordy documentation, notes, and task lists into dense prose to reduce token consumption across agent contexts.

---

## 2. Compression Directives

### Elements to Remove

- Conversational pleasantries and preambles.
- Filler words: `really`, `basically`, `actually`, `simply`, `essentially`.
- Articles where meaning remains clear: `a`, `an`, `the`.
- Hedging phrases: "it might be worth considering", "one could potentially".
- Connective padding: "furthermore", "in addition to this".

### Elements to Preserve Verbatim

- Fenced code blocks and inline code spans.
- Markdown links, references, and anchors.
- Directory layouts and file paths.
- Terminal commands and CLI parameters.
- Version identifiers, dates, and numeric metrics.
- Role and Authority section headers.
