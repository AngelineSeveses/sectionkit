import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 900,
  },
  test: {
    environment: 'node',
    // Section CSS is loaded with ?raw; Vitest must not stub CSS imports.
    css: { include: [/.+/] },
    include: ['src/**/*.test.{js,jsx}'],
  },
})
