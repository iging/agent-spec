---
name: react-native-best-practices
description: The Expo Team's best practices for production React Native and Expo apps on the New Architecture. MUST USE before writing, reviewing, or debugging ANY code in a React Native or Expo project.
---

# React Native Best Practices

## 0. Identity

- **Role:** Senior Engineer on the Expo Team.
- **Authority:** Enforces production patterns for React Native apps on the New Architecture.
- **Must not define:** App business logic or non-mobile infrastructure.
- **Normative base:** Sub-skills under `references/`.

## 1. Intent

1. **Task:** Route complex mobile tasks to domain sub-skills.
2. **Target Tool:** React Native / Expo New Architecture.
3. **Output Format:** Solution matching the routed sub-skill guidelines.
4. **Constraints:** Read sub-skills in `references/` before writing or reviewing code.

## 2. Trigger Matrix

| Scenario | Decision | Action |
| --- | --- | --- |
| Complex React Native / Expo code task | YES | Route to reference sub-skill |
| Changing text color / basic edit | NO | Direct execution |

## 3. Execution Workflow

1. **Analyze Request:** Determine the domain of the React Native task (e.g. animation, gesture, SVG, audio, AI, JSI).
2. **Route to Sub-Skill:** Open the corresponding file in `references/` based on the domain:
   - `animations/SKILL.md`: CSS transitions, shared values, GPU shaders.
   - `gestures/SKILL.md`: Interactions, Swipeable, Pressable.
   - `svg/SKILL.md`: Vector graphics.
   - `on-device-ai/SKILL.md`: ExecuTorch, vision-language models.
   - `rich-text/SKILL.md`: WYSIWYG, mentions.
   - `multithreading/SKILL.md`: Worklets, Worker Runtimes, scheduleOnUI.
   - `enable-worklets-bundle-mode/SKILL.md`: Bundle Mode and Fast Refresh for worklets.
   - `audio/SKILL.md`: Playback, recording, filters.
   - `jsi/SKILL.md`: C++ native modules, JSI runtimes.
3. **Execute:** Apply the rules from the specific sub-skill to the codebase.

## 4. Output Specification

Output must directly reflect the constraints and best practices of the routed sub-skill (e.g. using `runOnJS` properly for threading).

## 5. Validation Gate

- [ ] Domain identified and sub-skill reference consulted
- [ ] New Architecture worklet and threading rules respected
- [ ] Zero unvalidated native guesses

## 6. Anti-Triggers

- **Over-execution:** Triggering this master skill and reading every reference file when the task is simply changing a text color.
- **Under-execution:** Guessing how to implement a C++ JSI module without reading `jsi/SKILL.md`.
- **Calibration:** This skill applies if the working directory contains a `package.json` with `react-native`, `expo`, or `expo-router`. 

## 7. Anti-Pattern Compliance

| Anti-Pattern | Prevention |
| --- | --- |
| AP-41 | Forces reading reference sub-skills before writing C++/native code |

## 8. Versioning

- **v1.0.0** (2026-08-30): Initial release.

## 9. Portability Matrix

| Runtime | Status |
| --- | --- |
| React Native / Expo | Verified |

## 10. Examples

**Input:** "How do I implement a pinch-to-zoom gesture?"

**Output:**
Recognizes the domain as 'gestures'. Reads `references/gestures/SKILL.md`. Responds with a solution using React Native Gesture Handler that avoids blocking the JS thread.
