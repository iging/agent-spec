# Mobile App Architecture Specification

## Role / Authority

- **Role:** Specification of mobile client application architecture, native/cross-platform framework design, app state management, and app store deployment settings.
- **Authority:** Primary context reference for mobile application engineering.
- **Must not define:** Server-side database table schemas or backend cloud IaC definitions.

---

## 1. Mobile Framework & Platform Architecture

- **Primary Mobile Stack:** `[PLACEHOLDER: MOBILE_STACK]` (e.g., React Native / Expo, Flutter, Swift/iOS Native, Kotlin/Android Native)
- **Target OS Versions:** iOS `[PLACEHOLDER: MIN_IOS_VERSION]`+, Android `[PLACEHOLDER: MIN_ANDROID_VERSION]`+ (API Level 24+)
- **Architecture Pattern:** `[PLACEHOLDER: MOBILE_ARCH_PATTERN]` (e.g., New Architecture / Fabric, MVVM, Clean Architecture)

---

## 2. Mobile State & Navigation

- **Navigation Library:** `[PLACEHOLDER: MOBILE_NAVIGATION_LIB]` (e.g., Expo Router, React Navigation, NavigationStack)
- **Local Storage Engine:** `[PLACEHOLDER: MOBILE_LOCAL_STORAGE]` (e.g., MMKV, WatermelonDB, SQLite)
- **Secure Keyring Storage:** Sensitive tokens stored in iOS Keychain or Android Keystore via encrypted wrappers.

---

## 3. App Store Publishing & Binary Build Pipeline

- **Build Tooling:** `[PLACEHOLDER: MOBILE_BUILD_TOOL]` (e.g., EAS Build, Fastlane, Xcode Cloud)
- **Distribution Channels:** Apple TestFlight, Google Play Internal Testing, and Production App Stores.
- **Over-the-Air (OTA) Updates:** `[PLACEHOLDER: OTA_UPDATE_ENGINE]` (e.g., Expo Updates, CodePush) for non-native JS bundle patches.
