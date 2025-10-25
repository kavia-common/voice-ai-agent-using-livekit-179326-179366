# Voice AI WebUI (React)

This WebUI provides a responsive, accessible interface for a voice-enabled AI bot.
It includes session lifecycle controls, microphone mute/unmute, transcript display, and
placeholders for LiveKit and backend API calls.

## Quick Start

From this directory:

```bash
npm install
npm start
```

- The preview will open at http://localhost:3000
- No environment variables are required to run the UI in no-op mode
- Microphone permission may be requested when starting a session

## Environment Configuration

Copy `.env.example` to `.env` and configure as needed:

```
REACT_APP_LIVEKIT_URL=
REACT_APP_LIVEKIT_API_KEY=
REACT_APP_LIVEKIT_API_SECRET=
```

Notes:
- These values must be provided by the orchestrator or your deployment environment.
- Until these are set, LiveKit connection is a no-op and audio is not streamed to any backend.

## Features Now

- App layout with header, footer, theme toggle
- Session controls: Start/Stop, Mic Mute/Unmute
- Transcript log area with auto-scroll
- Accessible buttons and ARIA attributes
- Mobile-friendly responsive styles
- Service stubs: `services/livekitClient.ts`, `services/audioRecorder.ts`
- Hook: `hooks/useVoiceSession.ts` for session state and integration points

## Future Integration

- LiveKit: Replace `connectIfConfigured()` and add real connection logic.
- Backend APIs: Add calls for STT/TTS and AI responses.
- Auth: Integrate secure session management as required by the backend.

## Scripts

- `npm start` - Run dev server
- `npm run build` - Production build
- `npm test` - Run tests

