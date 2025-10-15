# TinyPal Frontend (Expo)

Requirements:
- Node.js (16+ recommended)
- Expo CLI (optional, can use npx)

Run locally:

1. Install dependencies

   npm install

2. Start the Expo dev server (recommended to use tunnel or run on physical device)

   npm start

3. Ensure the backend is running on http://localhost:4000 (see `../backend`)

Notes about .apk:
- Building a standalone .apk requires configuring Android build credentials and using EAS Build or `expo run:android` with Android SDK. This repository provides the source; for the final APK you can run `eas build -p android` (requires Expo account and EAS configured). See Expo docs.
