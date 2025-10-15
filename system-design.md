# System Design: TinyPal Frontend Screens

Overview

This project implements two mobile screens (Did You Know and Flash Card) in React Native (Expo) and a Tinu bottom sheet component. The backend is a minimal Express mock that returns the expected JSON shapes so the frontend can be developed and tested offline.

Component Breakdown

- App.js: Navigation container and top-level state for Tinu bottom sheet visibility and context.
- src/screens/DidYouKnow.js: Fetches `/p13n_answers` and renders `dyk_cards` as a list. Provides an "Ask Tinu" button which opens the Tinu bottom sheet.
- src/screens/FlashCard.js: Fetches `/p13n_answers` and renders `flash_cards`. Cards are tappable to flip and reveal the back text. Also exposes Ask Tinu.
- src/components/TinuBottomSheet.js: Uses `@gorhom/bottom-sheet` to render a bottom sheet containing cards (from `/activate_tinu`), chips (options), and an input box labeled "Ask me Anything...". Input is local-only (chat API not available).

Data Flow

1. Screens call `/p13n_answers` with the provided request body to receive `dyk_cards` and `flash_cards`.
2. When user taps "Ask Tinu", frontend calls `/activate_tinu` to populate the bottom sheet with `cards` and `chips`.

Responsiveness

- Layouts use flexbox and percentage-based widths where appropriate.
- Text sizes use default scaling; for production consider `react-native-size-matters` or a responsive scale.

Extensibility

- Components are small and focused; state is kept local. For a larger app, introduce global state (Context or Redux) and extract API client utilities.

Testing and Build

- Frontend: run via Expo (`npm start`). For a production APK use EAS or `expo run:android` with Android SDK.
- Backend: run `node index.js`.

Notes

- This submission focuses on UI structure and API integration. The real API base URL was provided in the assignment; for local development this repo includes a mock backend.
