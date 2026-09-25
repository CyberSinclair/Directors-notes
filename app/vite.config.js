import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.js'],
    // Playwright specs in e2e/ are run separately by `npm run test:e2e`.
    include: ['tests/**/*.test.{js,jsx}'],
    // Full-app tests render ~190 film cards, which is slow on CI runners.
    testTimeout: 20000,
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{js,jsx}'],
      exclude: ['src/main.jsx', 'src/data/**'],
      reporter: ['text', 'html', 'lcov'],
    },
  },
})
