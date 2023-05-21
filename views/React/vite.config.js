import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import dotenv from 'dotenv'

dotenv.config();

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    // vite config
    define: {
      VITE_BASE_URL: `"${process.env.VITE_BASE_URL}"`,
    },
    server: {
      port: 5173,
      proxy: {
        "/api": "http://localhost:5000/"
      }
    },
    plugins: [react()],
    resolve: {
      alias: {
        path: "path-browserify",
      },
    },
  }
})
