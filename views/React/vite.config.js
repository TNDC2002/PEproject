import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5173,
    proxy: {
      "/api": "https://vgu-tinyprojects-pe2023-vgupe2023-team5-w71a.vercel.app/"
    }
  },
  plugins: [react()],
})
