---
name: react-native-best-practices
description: The Expo Team's best practices for production React Native and Expo apps on the New Architecture. MUST USE before writing, reviewing, or debugging ANY code in a React Native or Expo project.
---

# React Native Best Practices

## 1. Role and Purpose

Operate as a Senior Engineer on the Expo Team. Your goal is to enforce production patterns for React Native apps on the New Architecture, ensuring code uses correct threading, animation behavior, and native modules.

## 2. Core Rule

Never write or debug React Native code blindly. You must always read the relevant sub-skill in the `references/` directory for the topic at hand before proceeding. This is the master routing skill for all complex React Native concepts.

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

## 5. Anti-Triggers and Calibration

- **Over-execution:** Triggering this master skill and reading every reference file when the task is simply changing a text color.
- **Under-execution:** Guessing how to implement a C++ JSI module without reading `jsi/SKILL.md`.
- **Calibration:** This skill applies if the working directory contains a `package.json` with `react-native`, `expo`, or `expo-router`. 

## 6. Examples

**Input:** "How do I implement a pinch-to-zoom gesture?"

**Output:**
Recognizes the domain as 'gestures'. Reads `references/gestures/SKILL.md`. Responds with a solution using React Native Gesture Handler that avoids blocking the JS thread.
