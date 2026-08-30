---
name: writing-good-tests
description: Positive rules and discipline for test-driven development and falsifiable test design.
version: 1.0.0
---

# Writing Good Tests Reference Guide

## 1. Core Principles

Good tests protect against regressions and prove software behavior.

- **Rule 1: Falsifiability First.** A test must fail when production logic is incorrect.
- **Rule 2: Independent Expectations.** Derive expected test results independently of the implementation under test.
- **Rule 3: Avoid String-Presence Traps.** Test actual output behavior and schema, not raw string presence.
- **Rule 4: Avoid Change-Detector Traps.** Do not hardcode internal implementation details into assertions.
- **Rule 5: Zero Test-Only Production Code.** Production classes must never contain methods added solely for testing.
- **Rule 6: Isolate Side Effects.** Clean up test state, temp files, and environment variables after every test run.

## 2. Verification Check

Before accepting a test suite, run a intentional mutation check: modify a return value or condition in production code and confirm at least one test fails.
