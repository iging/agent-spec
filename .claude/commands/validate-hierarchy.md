---
name: validate-hierarchy
description: Validates instruction hierarchy, boundaries, and authority separation across core/ files.
metadata:
  short-description: Validate core hierarchy & boundaries
---

Validates instruction hierarchy, boundaries, and authority separation across `core/` files.

Checks to perform:

1. Verify `core/` tier-4 files preserve Role/Authority headers.
2. Confirm no circular dependencies between `core/` documents.
3. Ensure project templates in `context/` retain placeholder markers.
4. Verify zero references to `legacy/` files.
