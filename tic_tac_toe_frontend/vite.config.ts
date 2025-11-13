import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// PUBLIC_INTERFACE
export default defineConfig(({ mode }) => {
  /**
   * Vite configuration for the Tic Tac Toe React app.
   * - Loads .env variables and exposes those with prefix REACT_APP_ to the client.
   * - Serves on configurable HOST/PORT via env, defaulting to 0.0.0.0:3000 for preview environments.
   */
  const env = loadEnv(mode, process.cwd(), 'REACT_APP_');

  // Allow container/platform to set HOST/PORT; default to 0.0.0.0:3000
  const host = process.env.HOST || '0.0.0.0';
  const port = Number(process.env.PORT || 3000);

  return {
    plugins: [react()],
    server: {
      host,
      port
    },
    preview: {
      host,
      port
    },
    envPrefix: 'REACT_APP_',
    define: {
      __APP_ENV__: env.REACT_APP_NODE_ENV ? JSON.stringify(env.REACT_APP_NODE_ENV) : JSON.stringify('development')
    }
  };
});
