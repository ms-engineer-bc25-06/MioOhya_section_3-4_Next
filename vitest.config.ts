import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'], // ターミナルとHTMLでレポート出力
      // ↓ カバレッジ計測から除外するファイルを指定
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