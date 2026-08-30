---
name: validate-hierarchy
description: Validates instruction hierarchy, boundaries, and authority separation across spec/core/ files.
metadata:
  short-description: Validate core hierarchy & boundaries
---

Validates instruction hierarchy, boundaries, and authority separation across `spec/core/` files.

Checks to perform:

1. Verify `spec/core/` tier-4 files preserve Role/Authority headers.
2. Confirm no circular dependencies between `spec/core/` documents.
3. Ensure project templates in `spec/context/` retain placeholder markers.
4. Verify zero references to `spec/legacy/` files.
