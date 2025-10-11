# Expo Development Guide - Complete Reference

## What is Expo?

Expo is a framework and platform built on top of React Native that simplifies mobile app development.

### Expo Provides:
- Pre-configured development environment
- Set of libraries and APIs for common features (camera, location, notifications, etc.)
- Tools for building, testing, and deploying apps
- Managed workflow that handles native code for you

---

## Expo Go App

**Expo Go** is a free mobile app (available on iOS and Android App Stores)

### What Expo Go Does:
- Test your app instantly during development
- Scan a QR code to load your app
- See live updates as you code
- Test without needing Xcode or Android Studio

### How It Works in Development:
1. Run `npx expo start` on your computer
2. Scan the QR code with Expo Go app on your phone
3. Your app loads instantly on your phone
4. Changes you make appear immediately (hot reload)

### Important Limitations:
- Expo Go only supports libraries included in the Expo SDK
- You cannot add custom native modules while using Expo Go
- Limited to pre-built Expo functionality

---

## What is "Ejecting"? (Now Called Prebuild)

**Important Note:** Expo no longer uses the term "eject." The modern term is **"prebuild"** or switching to a **"bare workflow"**.

### Before Prebuild (Managed Workflow):
- Expo handles all native code
- You only write JavaScript/TypeScript
- No `ios/` or `android/` folders in your project
- Limited to Expo's built-in libraries
- Use Expo Go for testing

### After Prebuild (Bare Workflow):
- Generates native `ios/` and `android/` folders
- You can add any native module or custom native code
- Full access to native Android and iOS code
- More flexibility, but more complexity
- Cannot use Expo Go anymore

### How to Prebuild:
```bash
npx expo prebuild
```

This command generates the native folders and you gain full control over native code.

---

## What is EAS (Expo Application Services)?

**EAS** is Expo's cloud service suite for building and deploying apps. It consists of three main services:

### 1. EAS Build
Cloud-based build service that builds your mobile apps

**Benefits:**
- Builds iOS and Android apps without needing a Mac or local Android setup
- Creates `.apk`, `.aab` (Android) and `.ipa` (iOS) files
- Runs builds on Expo's servers in the cloud
- No need for complex local setup

**How to Use EAS Build:**
```bash
# Install EAS CLI globally
npm install -g eas-cli

# Login to your Expo account
eas login

# Configure your project for EAS
eas build:configure

# Build for Android
eas build --platform android

# Build for iOS
eas build --platform ios

# Build for both platforms
eas build --platform all
```

**What Happens:**
1. Your code is uploaded to Expo's servers
2. Build happens in the cloud
3. You get a downloadable app file (.apk, .aab, or .ipa)

### 2. EAS Submit
Automatically submits your app to App Store and Google Play

**How to Use EAS Submit:**
```bash
# Submit to iOS App Store
eas submit --platform ios

# Submit to Google Play Store
eas submit --platform android
```

**What It Does:**
- Handles the deployment process automatically
- Uploads your app to app stores
- Manages app store credentials
- Simplifies the submission workflow

### 3. EAS Update
Push over-the-air JavaScript updates to published apps

**Benefits:**
- Users get updates without downloading from app stores
- Instant bug fixes and feature updates
- Only works for JavaScript changes (not native code changes)

**How to Use EAS Update:**
```bash
# Publish an update
eas update --branch production --message "Bug fixes"
```

**Important:** Only JavaScript/TypeScript changes can be pushed via EAS Update. Native code changes require a new app store build.

---

## Does EAS Work After Prebuild/Eject?

**YES! This is crucial to understand.**

EAS is designed to work with **BOTH** managed and bare workflows.

### After Prebuild, EAS Services Still Work:
- ✅ **EAS Build** still works (actually works better with custom native code)
- ✅ **EAS Submit** still works perfectly
- ✅ **EAS Update** still works for JavaScript updates
- ✅ You retain ALL EAS functionality

### The Difference:
**Before Prebuild:**
- EAS builds from your JavaScript code only
- Expo manages native code in the cloud

**After Prebuild:**
- EAS builds from your JavaScript code + native `ios/android` folders
- You have full control over native code
- Build process includes your custom native modifications

### What You Lose After Prebuild:
- ❌ Cannot use Expo Go app anymore
- ❌ Need to use development builds or local simulators
- ❌ More complex development setup required

### What You Gain After Prebuild:
- ✅ Full access to native code
- ✅ Can use any React Native library (even without Expo support)
- ✅ Can modify native Android/iOS code directly
- ✅ Complete flexibility and control

---

## Development Workflow Comparison

### Managed Workflow (Recommended for Most Apps)

**Flow:**
```
Write Code → Test in Expo Go → EAS Build → EAS Submit → Deploy
```

**Characteristics:**
- Fastest development experience
- Use Expo Go for instant testing
- Limited to Expo SDK libraries
- No native folder management
- Perfect for 80% of apps
- Easiest for beginners

**When to Use:**
- Building standard mobile apps
- Don't need custom native modules
- Want fastest development cycle
- Starting a new project

### Bare Workflow (After Prebuild)

**Flow:**
```
Write Code → Test on Development Build/Simulator → EAS Build → EAS Submit → Deploy
```

**Characteristics:**
- Need Xcode (Mac) or Android Studio
- Cannot use Expo Go anymore
- Full access to native code
- Can add any native module
- More complex setup
- For advanced customization

**When to Use:**
- Need specific native library not in Expo SDK
- Need to modify native code directly
- Integrating with existing native code
- Advanced customization requirements

---

## What to Do After Prebuild?

Since you cannot use Expo Go anymore after prebuilding, you have two main options:

### Option 1: Development Builds (Recommended)

Create a custom version of Expo Go that includes your native code.

**How to Create a Development Build:**
```bash
# Build a development version for Android
eas build --profile development --platform android

# Build a development version for iOS
eas build --profile development --platform ios
```

**What This Does:**
- Creates a custom app with your native code included
- Install this on your device
- Works like Expo Go but with your custom native modules
- Still get fast refresh and developer experience

**Benefits:**
- Similar experience to Expo Go
- Works on physical devices
- Includes your custom native code
- Team members can test easily

### Option 2: Local Simulators/Emulators

Run your app on local development tools.

**Commands:**
```bash
# Run on iOS simulator (requires Mac + Xcode)
npx expo run:ios

# Run on Android emulator (requires Android Studio)
npx expo run:android
```

**Requirements:**
- **iOS:** Mac computer with Xcode installed
- **Android:** Android Studio installed (works on Mac, Windows, Linux)

**Benefits:**
- Full debugging capabilities
- No cloud build needed for testing
- Faster iteration for native code changes

**Drawbacks:**
- Requires local setup
- Slower than Expo Go
- Need powerful computer

---

## My Recommendations

### For Beginners and Most Projects: Start with Managed Workflow

**DO:**
1. Start with managed workflow (don't prebuild initially)
2. Use Expo Go for testing during development
3. Use EAS Build to create production builds
4. Use EAS Submit to deploy to app stores
5. Stay in managed workflow as long as possible

**DON'T:**
- Don't prebuild/eject unless absolutely necessary
- Don't add custom native modules unless required
- Don't complicate your setup prematurely

### When to Prebuild (Use Bare Workflow):

**ONLY prebuild if you need to:**
- Use a specific native library not available in Expo SDK
- Modify native Android or iOS code directly
- Integrate with existing native codebase
- Use a React Native library that requires native configuration
- Need functionality not supported by Expo

### Important Principle:
**"Stay managed as long as possible, prebuild only when necessary"**

### Remember:
- Even after prebuild, ALL EAS services continue to work
- You're not losing EAS functionality
- You're only losing the convenience of Expo Go
- You gain complete native flexibility

---

## Common Commands Reference

### Initial Setup:
```bash
# Create new Expo project
npx create-expo-app my-app

# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login
```

### Development (Managed Workflow):
```bash
# Start development server
npx expo start

# Start and open on Android
npx expo start --android

# Start and open on iOS
npx expo start --ios
```

### Building with EAS:
```bash
# Configure EAS Build
eas build:configure

# Build for production
eas build --platform android
eas build --platform ios
eas build --platform all

# Build development version
eas build --profile development --platform android
```

### Submitting to Stores:
```bash
# Submit to app stores
eas submit --platform ios
eas submit --platform android
```

### Updates:
```bash
# Push JavaScript update
eas update --branch production --message "Your update message"
```

### Prebuild (When Needed):
```bash
# Generate native folders
npx expo prebuild

# Run on local simulators after prebuild
npx expo run:ios
npx expo run:android
```

---

## Decision Tree: Should You Prebuild?

### Ask Yourself:

**Question 1:** Do I need a library that requires custom native code?
- **NO** → Stay in managed workflow
- **YES** → Continue to Question 2

**Question 2:** Is there an Expo-compatible alternative?
- **YES** → Use the Expo alternative, stay managed
- **NO** → Continue to Question 3

**Question 3:** Can I wait for Expo to add this feature?
- **YES** → Stay managed, request feature from Expo
- **NO** → Prebuild to bare workflow

### 90% of apps can stay in managed workflow!

---

## Key Takeaways

1. **Expo** = Framework that makes React Native development easier
2. **Expo Go** = Testing app for development (managed workflow only)
3. **Prebuild** = Generate native code folders for full control
4. **EAS** = Cloud services for building, submitting, and updating apps
5. **EAS works with BOTH managed and bare workflows**
6. **Start managed, prebuild only when necessary**
7. **After prebuild, use development builds instead of Expo Go**

---

## Additional Resources

- Expo Documentation: https://docs.expo.dev
- EAS Documentation: https://docs.expo.dev/eas
- React Native Documentation: https://reactnative.dev
- Expo Forums: https://forums.expo.dev

---

## Questions to Consider Before Prebuilding

1. Have I exhausted all Expo SDK options?
2. Is the native functionality absolutely necessary?
3. Am I comfortable managing native code?
4. Do I have the tools installed (Xcode/Android Studio)?
5. Is my team ready for increased complexity?

If you answer "yes" to all these questions, then prebuild might be right for you.

---

**Last Updated:** October 2025
**Author's Note:** This guide is based on current Expo best practices. Always refer to official Expo documentation for the most up-to-date information.