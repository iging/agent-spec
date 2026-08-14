---
name: systematic-debugging-tools
description: Reference protocols for root cause investigation, bisection, and condition polling.
version: 1.0.0
---

# Systematic Debugging Tools & Protocols

## 1. Root Cause Tracing Protocol

1. **Reproduce:** Obtain a minimal, deterministic reproduction script.
2. **Isolate:** Trace stack traces backwards to the precise line where runtime state diverged.
3. **Hypothesize:** State a hypothesis and test it before modifying production code.
4. **Verify Fix:** Run the full test suite to prove the issue is resolved without regressions.

## 2. Test Pollution Bisection

When tests pass in isolation but fail in batch, use bisection to locate the polluting test file:

```bash
# Bisect test files to find state polluters
node scripts/bisect-tests.js --target=tests/failing.test.js
```

## 3. Condition Polling Protocol

Replace arbitrary sleep calls with condition polling:

```javascript
/**
 * Polls a condition until true or timeout.
 * @param {Function} predicate - Returns boolean.
 * @param {number} timeoutMs - Max timeout in milliseconds.
 * @returns {Promise<boolean>}
 */
async function waitForCondition(predicate, timeoutMs = 5000) {
  const startTime = Date.now();
  while (Date.now() - startTime < timeoutMs) {
    if (await predicate()) return true;
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  throw new Error("Condition timed out.");
}
```
