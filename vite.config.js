import { defineConfig } from 'vite'

// In development the API runs separately (server/dev.js); Vite forwards /api to it.
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: `http://localhost:${process.env.API_PORT || 3001}`,
        changeOrigin: true,
      },
    },
  },
})
