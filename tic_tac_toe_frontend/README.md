# Tic Tac Toe Frontend (React)

A simple, self-contained Tic Tac Toe game built with React. Two players can play on the same device with clear status messaging, winner/draw detection, and a restart button.

## Features
- 3x3 clickable grid
- Alternating turns (X then O)
- Winner and draw detection
- Disables moves after game ends
- Accessible status (aria-live), focus styles, and keyboard-friendly controls
- Responsive centered layout with light theme accents (primary #3b82f6, success #06b6d4)
- Optional light/dark theme toggle (no external dependencies)

## Getting Started
In the container directory:

- Install: `npm install`
- Run dev: `npm start` (opens http://localhost:3000)
- Build: `npm run build`
- Test: `npm test`

No environment variables are required for functionality. This app makes no backend or websocket calls.

## Notes
- Main components are in `src/App.js` and styles in `src/App.css`.
- Restart button resets the board and X always goes first.
- Winner cells are highlighted for visual clarity.
