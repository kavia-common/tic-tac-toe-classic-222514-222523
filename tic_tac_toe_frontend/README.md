# Tic Tac Toe Frontend

This is a minimal React + Vite + TypeScript app implementing a two-player Tic Tac Toe game (3x3 grid) with:
- Alternating turns
- Winner detection
- Draw detection
- Restart game

## Scripts

- npm start — starts the dev server on 0.0.0.0:3000
- npm run build — builds the app for production
- npm run preview — serves the production build on 0.0.0.0:3000

## Environment Variables

This project exposes environment variables prefixed with `REACT_APP_` to the client, following the variables already present in `.env`. Vite is configured with `envPrefix: "REACT_APP_"`.

Ensure the `.env` file exists at `tic_tac_toe_frontend/.env` (already present) and includes required vars if needed.

## Notes

- Port is set to 3000 to match the preview environment.
- No backend calls are required for the game; environment is displayed to validate proper loading.
