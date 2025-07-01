import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom', // DOMをシミュレートする環境を指定
    setupFiles: './tests/setup.ts', // 各テストの前に実行するセットアップファイル
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Next.jsのエイリアスと合わせる
    },
  },
});