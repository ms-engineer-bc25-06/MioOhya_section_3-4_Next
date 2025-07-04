import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    
    // ↓↓↓ この include 設定を追加します ↓↓↓
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],

    // exclude は念のため残しておいても良いです
    exclude: [
      'node_modules/',
      '**/dist/**',
      '.next/',
      'coverage/',
      '**/e2e/**',
      '**/tests-examples/**',
      '*.config.js',
      '*.config.ts',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: [
        'node_modules/',
        '.next/',
        'coverage/',
        '*.config.js',
        '*.config.ts',
      ],
    },
  },
})